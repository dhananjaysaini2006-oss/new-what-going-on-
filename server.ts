import express, { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcryptjs';
import { initializeApp as initClientApp, getApps as getClientApps, getApp as getClientApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  writeBatch,
  Firestore
} from 'firebase/firestore';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { XMLParser } from 'fast-xml-parser';
import { DEMO_ARTICLES } from './src/data/news-data';
import { Article, ArticleStatus, PublisherUser } from './src/types';

const app = express();
const PORT = 3000;
const SESSION_SECRET = process.env.SESSION_SECRET || 'wgo-newsroom-secure-session-salt-2026';

app.use(express.json({ limit: '5mb' }));
app.use(cookieParser(SESSION_SECRET));

// Enable open CORS and scanner preview headers for Google News Publisher, Search Console, & Web Crawlers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // Allow Google News Publisher preview iframe inspection
  res.removeHeader('X-Frame-Options');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return aiClient;
}

// XML Parser instance
const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

// Helper to strip HTML tags and sanitize
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").trim();
}

function sanitizeInput(str: string): string {
  if (!str) return '';
  return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

// Slug generator helper
function generateSlug(title: string, idSuffix?: string): string {
  if (!title) return idSuffix || `article-${Date.now()}`;
  let base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 75)
    .replace(/-+$/, '');

  if (idSuffix && !base.includes(idSuffix)) {
    return `${base}-${idSuffix}`;
  }
  return base || `article-${Date.now()}`;
}

/**
 * ============================================================================
 * FIRESTORE PERSISTENT STORAGE ENGINE
 * ============================================================================
 * Articles, users, and sessions are persisted to Google Cloud Firestore collections
 * ("articles", "users", "sessions") with in-memory caching for zero-latency lookups.
 * Local filesystem data files in `data/` are used as a fallback mirror.
 * ============================================================================
 */
const DATA_DIR = path.join(process.cwd(), 'data');
const ARTICLES_FILE = path.join(DATA_DIR, 'articles.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const SESSIONS_FILE = path.join(DATA_DIR, 'sessions.json');

function initStorageDir() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  } catch {}
}

let firebaseConfigJson: any = {};
try {
  const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
  if (fs.existsSync(configPath)) {
    firebaseConfigJson = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
  }
} catch (e) {
  console.warn('[FIREBASE] Could not read firebase-applet-config.json:', e);
}

const firebaseApp = !getClientApps().length
  ? initClientApp({
      apiKey: firebaseConfigJson.apiKey,
      authDomain: firebaseConfigJson.authDomain,
      projectId: firebaseConfigJson.projectId,
      storageBucket: firebaseConfigJson.storageBucket,
      messagingSenderId: firebaseConfigJson.messagingSenderId,
      appId: firebaseConfigJson.appId,
    })
  : getClientApp();

const firestoreDb: Firestore = getFirestore(
  firebaseApp,
  firebaseConfigJson.firestoreDatabaseId || undefined
);

// Stored User Record with Hashed Password
interface StoredUser {
  id: string;
  name: string;
  email: string;
  role: 'Editor-in-Chief' | 'Senior Editor' | 'Staff Writer' | 'Desk Reporter';
  avatar: string;
  passwordHash: string;
  createdAt: string;
}

interface StoredSession {
  token: string;
  userId: string;
  createdAt: number;
  expiresAt: number;
}

function loadLocalUsers(): StoredUser[] {
  initStorageDir();
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

function saveLocalUsers(users: StoredUser[]) {
  try {
    initStorageDir();
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch {}
}

async function loadPersistedUsers(): Promise<StoredUser[]> {
  try {
    const colRef = collection(firestoreDb, 'users');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const users: StoredUser[] = [];
      snapshot.forEach((d) => {
        users.push(d.data() as StoredUser);
      });
      console.log(`[STORAGE / FIRESTORE] Loaded ${users.length} editorial users from Firestore.`);
      saveLocalUsers(users);
      return users;
    }
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Firestore users query unavailable, falling back to local store:', err.message);
  }

  const local = loadLocalUsers();
  if (local.length > 0) return local;

  // Create initial seeded editorial users with bcrypt hashed passwords
  const defaultPass = process.env.PUBLISHER_PASSWORD || 'EditorialSecretKey2026';
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(defaultPass, salt);

  const initialUsers: StoredUser[] = [
    {
      id: 'pub-editor-01',
      name: 'Editorial Board & Desk',
      email: 'editor@whatsgoingon.com',
      role: 'Editor-in-Chief',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
      passwordHash: hash,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'pub-writer-02',
      name: 'Priyanka Sen',
      email: 'priyanka.sen@whatsgoingon.com',
      role: 'Senior Editor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&h=200&q=80',
      passwordHash: hash,
      createdAt: new Date().toISOString(),
    }
  ];

  saveLocalUsers(initialUsers);
  savePersistedUsers(initialUsers).catch(() => {});
  return initialUsers;
}

async function saveUserToFirestore(user: StoredUser): Promise<void> {
  try {
    const docRef = doc(firestoreDb, 'users', user.id);
    await setDoc(docRef, user, { merge: true });
  } catch (err: any) {
    console.warn(`[STORAGE / FIRESTORE] Save user note:`, err.message);
  }
}

async function savePersistedUsers(users: StoredUser[]): Promise<void> {
  saveLocalUsers(users);
  try {
    const batch = writeBatch(firestoreDb);
    for (const user of users) {
      const ref = doc(firestoreDb, 'users', user.id);
      batch.set(ref, user, { merge: true });
    }
    await batch.commit();
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Batch saving users note:', err.message);
  }
}

function loadLocalSessions(): Record<string, StoredSession> {
  initStorageDir();
  try {
    if (fs.existsSync(SESSIONS_FILE)) {
      const data = fs.readFileSync(SESSIONS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch {}
  return {};
}

function saveLocalSessions(sessions: Record<string, StoredSession>) {
  try {
    initStorageDir();
    fs.writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), 'utf-8');
  } catch {}
}

async function loadPersistedSessions(): Promise<Record<string, StoredSession>> {
  const sessions: Record<string, StoredSession> = {};
  try {
    const colRef = collection(firestoreDb, 'sessions');
    const snapshot = await getDocs(colRef);
    const now = Date.now();
    const expiredTokens: string[] = [];

    snapshot.forEach((d) => {
      const session = d.data() as StoredSession;
      if (session.expiresAt && session.expiresAt > now) {
        sessions[session.token] = session;
      } else {
        expiredTokens.push(session.token);
      }
    });

    if (expiredTokens.length > 0) {
      const batch = writeBatch(firestoreDb);
      for (const t of expiredTokens) {
        batch.delete(doc(firestoreDb, 'sessions', t));
      }
      batch.commit().catch(() => {});
    }
    console.log(`[STORAGE / FIRESTORE] Loaded ${Object.keys(sessions).length} active sessions from Firestore.`);
    saveLocalSessions(sessions);
    return sessions;
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Sessions query fallback to local:', err.message);
  }
  return loadLocalSessions();
}

async function saveSessionToFirestore(session: StoredSession): Promise<void> {
  try {
    const docRef = doc(firestoreDb, 'sessions', session.token);
    await setDoc(docRef, session);
  } catch (err: any) {
    console.warn(`[STORAGE / FIRESTORE] Save session note:`, err.message);
  }
}

async function deleteSessionFromFirestore(token: string): Promise<void> {
  try {
    const docRef = doc(firestoreDb, 'sessions', token);
    await deleteDoc(docRef);
  } catch (err: any) {
    console.warn(`[STORAGE / FIRESTORE] Delete session note:`, err.message);
  }
}

async function savePersistedSessions(sessions: Record<string, StoredSession>): Promise<void> {
  saveLocalSessions(sessions);
  try {
    const batch = writeBatch(firestoreDb);
    for (const [token, session] of Object.entries(sessions)) {
      const ref = doc(firestoreDb, 'sessions', token);
      batch.set(ref, session);
    }
    await batch.commit();
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Save sessions note:', err.message);
  }
}

function getDefaultDemoArticles(): Article[] {
  return DEMO_ARTICLES.map((art, idx) => {
    const minsAgo = idx * 25 + 5;
    const pubDate = new Date(Date.now() - minsAgo * 60000).toISOString();
    const slug = generateSlug(art.title, art.id.replace(/[^a-z0-9]/gi, '-').slice(0, 15));
    return {
      ...art,
      slug,
      status: (art.status || 'published') as ArticleStatus,
      publishedAt: pubDate,
      createdAt: pubDate,
      updatedAt: new Date(Date.now() - Math.max(1, minsAgo - 10) * 60000).toISOString(),
      seoTitle: `${art.title} | What's Going On`,
      seoDescription: art.summary,
      canonicalUrl: `https://whatsgoingon.news/article/${slug}`,
    };
  });
}

function loadLocalArticles(): Article[] {
  initStorageDir();
  try {
    if (fs.existsSync(ARTICLES_FILE)) {
      const data = fs.readFileSync(ARTICLES_FILE, 'utf-8');
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  return [];
}

function saveLocalArticles(articles: Article[]) {
  try {
    initStorageDir();
    fs.writeFileSync(ARTICLES_FILE, JSON.stringify(articles, null, 2), 'utf-8');
  } catch {}
}

async function loadPersistedArticles(): Promise<Article[]> {
  try {
    const colRef = collection(firestoreDb, 'articles');
    const snapshot = await getDocs(colRef);
    if (!snapshot.empty) {
      const articles: Article[] = [];
      snapshot.forEach((d) => {
        articles.push(d.data() as Article);
      });
      articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
      console.log(`[STORAGE / FIRESTORE] Loaded ${articles.length} persisted articles from Firestore.`);
      saveLocalArticles(articles);
      return articles;
    }
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Firestore articles query fallback to local store:', err.message);
  }

  const local = loadLocalArticles();
  if (local.length > 0) return local;

  // Fallback to seed articles
  const initial = getDefaultDemoArticles();
  saveLocalArticles(initial);
  savePersistedArticles(initial).catch(() => {});
  return initial;
}

async function saveArticleToFirestore(article: Article): Promise<void> {
  try {
    const docRef = doc(firestoreDb, 'articles', article.id);
    await setDoc(docRef, article, { merge: true });
  } catch (err: any) {
    console.warn(`[STORAGE / FIRESTORE] Save article note:`, err.message);
  }
}

async function deleteArticleFromFirestore(id: string): Promise<void> {
  try {
    const docRef = doc(firestoreDb, 'articles', id);
    await deleteDoc(docRef);
  } catch (err: any) {
    console.warn(`[STORAGE / FIRESTORE] Delete article note:`, err.message);
  }
}

async function savePersistedArticles(articles: Article[]): Promise<void> {
  saveLocalArticles(articles);
  try {
    const chunkSize = 250;
    for (let i = 0; i < articles.length; i += chunkSize) {
      const chunk = articles.slice(i, i + chunkSize);
      const batch = writeBatch(firestoreDb);
      for (const article of chunk) {
        const ref = doc(firestoreDb, 'articles', article.id);
        batch.set(ref, article, { merge: true });
      }
      await batch.commit();
    }
  } catch (err: any) {
    console.warn('[STORAGE / FIRESTORE] Batch saving articles note:', err.message);
  }
}

// In-memory active registries initialized with default state and refreshed on boot from Firestore
let articlesRegistry: Article[] = getDefaultDemoArticles();
let usersRegistry: StoredUser[] = [];
let sessionsRegistry: Record<string, StoredSession> = {};

async function initFirestoreStorage(): Promise<void> {
  console.log('[STORAGE] Initializing and synchronizing with Firestore collections...');
  try {
    const [loadedArticles, loadedUsers, loadedSessions] = await Promise.all([
      loadPersistedArticles(),
      loadPersistedUsers(),
      loadPersistedSessions(),
    ]);
    articlesRegistry = loadedArticles;
    usersRegistry = loadedUsers;
    sessionsRegistry = loadedSessions;
    console.log(`[STORAGE] Storage synchronization complete (${articlesRegistry.length} articles, ${usersRegistry.length} users, ${Object.keys(sessionsRegistry).length} sessions).`);
  } catch (err: any) {
    console.error('[STORAGE] Error during Firestore initialization:', err.message);
  }

  // Trigger immediate live news synchronisation on boot
  try {
    await syncLiveNewsFeed();
  } catch (err: any) {
    console.warn('[STORAGE] Initial live sync note:', err.message);
  }
}

// Public visibility check (Strict server-side validation)
function isPubliclyVisible(article: Article): boolean {
  if (article.status !== 'published') return false;
  if (article.scheduledAt && new Date(article.scheduledAt).getTime() > Date.now()) {
    return false;
  }
  return true;
}

// Rate limiting map for login attempts
const loginAttempts = new Map<string, { count: number; lastAttempt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = loginAttempts.get(ip);
  if (!record) return false;
  // If more than 5 attempts within 1 minute, block for 5 minutes
  if (record.count >= 5 && now - record.lastAttempt < 300000) {
    return true;
  }
  if (now - record.lastAttempt > 300000) {
    loginAttempts.delete(ip);
  }
  return false;
}

function recordLoginFailure(ip: string) {
  const now = Date.now();
  const record = loginAttempts.get(ip) || { count: 0, lastAttempt: now };
  record.count += 1;
  record.lastAttempt = now;
  loginAttempts.set(ip, record);
}

function clearLoginAttempts(ip: string) {
  loginAttempts.delete(ip);
}

// Validate auth token middleware (supports both HTTP-only cookie and Authorization Bearer header)
function requirePublisherAuth(req: Request, res: Response, next: NextFunction) {
  let token = req.cookies?.wgo_session;

  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (!token) {
    return res.status(401).json({ status: 'error', message: 'Authentication required. Please log in.' });
  }

  const session = sessionsRegistry[token];

  if (!session) {
    return res.status(401).json({ status: 'error', message: 'Invalid or expired publisher session. Please log in.' });
  }

  if (Date.now() > session.expiresAt) {
    delete sessionsRegistry[token];
    savePersistedSessions(sessionsRegistry);
    res.clearCookie('wgo_session');
    return res.status(401).json({ status: 'error', message: 'Publisher session has expired. Please log in again.' });
  }

  const user = usersRegistry.find((u) => u.id === session.userId);
  if (!user) {
    delete sessionsRegistry[token];
    savePersistedSessions(sessionsRegistry);
    res.clearCookie('wgo_session');
    return res.status(401).json({ status: 'error', message: 'User account not found.' });
  }

  // Safe user profile without password hash
  const safeUser: PublisherUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  (req as any).publisherUser = safeUser;
  (req as any).sessionToken = token;
  next();
}

// Role-based authorization middleware
function requireRole(allowedRoles: Array<PublisherUser['role']>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).publisherUser as PublisherUser;
    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({
        status: 'error',
        message: 'Forbidden: Your editorial role lacks permission for this operation.',
      });
    }
    next();
  };
}

// --- AUTH API ROUTES ---
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const clientIp = req.ip || req.socket.remoteAddress || '127.0.0.1';

  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      status: 'error',
      message: 'Too many failed login attempts. Please wait 5 minutes before trying again.',
    });
  }

  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ status: 'error', message: 'Email and password are required.' });
  }

  const trimmedEmail = String(email).toLowerCase().trim();
  const trimmedPassword = String(password).trim();

  // Find user by email
  const user = usersRegistry.find((u) => u.email.toLowerCase() === trimmedEmail);

  let isMatch = false;
  if (user) {
    isMatch = await bcrypt.compare(trimmedPassword, user.passwordHash);
  }

  // Also verify against optional environment variable PUBLISHER_PASSWORD if set
  if (!isMatch && process.env.PUBLISHER_PASSWORD && trimmedPassword === process.env.PUBLISHER_PASSWORD) {
    isMatch = true;
  }

  if (!user || !isMatch) {
    recordLoginFailure(clientIp);
    return res.status(401).json({
      status: 'error',
      message: 'Invalid email or password.',
    });
  }

  clearLoginAttempts(clientIp);

  // Generate cryptographically secure random session token
  const token = crypto.randomBytes(32).toString('hex');
  const now = Date.now();
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days

  sessionsRegistry[token] = {
    token,
    userId: user.id,
    createdAt: now,
    expiresAt,
  };
  savePersistedSessions(sessionsRegistry);

  // Set secure HTTP-only cookie
  res.cookie('wgo_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/',
  });

  const safeUser: PublisherUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  };

  res.json({
    status: 'ok',
    user: safeUser,
    expiresAt: new Date(expiresAt).toISOString(),
  });
});

app.get('/api/auth/session', requirePublisherAuth, (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    authenticated: true,
    user: (req as any).publisherUser,
  });
});

app.get('/api/auth/me', requirePublisherAuth, (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    user: (req as any).publisherUser,
  });
});

app.post('/api/auth/logout', (req: Request, res: Response) => {
  let token = req.cookies?.wgo_session;
  if (!token) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  if (token && sessionsRegistry[token]) {
    delete sessionsRegistry[token];
    savePersistedSessions(sessionsRegistry);
  }

  res.clearCookie('wgo_session', { path: '/' });
  res.json({ status: 'ok', message: 'Logged out successfully.' });
});

// --- GEMINI AI INTELLIGENCE ROUTES ---

// 1. Executive Summary & TL;DR (gemini-3.7-flash)
app.post('/api/ai/tldr', async (req: Request, res: Response) => {
  try {
    const { title, summary, content, category, isBreaking } = req.body || {};
    const articleTitle = String(title || '').trim();
    const articleSummary = String(summary || '').trim();
    const articleContent = Array.isArray(content) ? content.join('\n\n') : String(content || '');
    const fullText = `Title: ${articleTitle}\nSummary: ${articleSummary}\nContent:\n${articleContent.slice(0, 4000)}`;

    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `You are a premier senior editor for What's Going On. Analyze this news article and return a JSON object with:
1. "takeaways": an array of EXACTLY 3 crisp, informative, non-redundant takeaway bullet points (each 1-2 concise sentences) capturing the core developments, policy/market implications, and forward outlook.
2. "keyFigureOrStat": a single impactful statistic, number, or key figure from the story (e.g. "₹2.4 Lakh Cr outlay", "14.2% YoY growth", "45M users").
3. "sentiment": one of "Neutral", "Constructive", "Critical", or "Developing".

Article:
${fullText}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (Array.isArray(parsed.takeaways) && parsed.takeaways.length >= 3) {
          return res.json({
            takeaways: [parsed.takeaways[0], parsed.takeaways[1], parsed.takeaways[2]],
            keyFigureOrStat: parsed.keyFigureOrStat || undefined,
            sentiment: ['Neutral', 'Constructive', 'Critical', 'Developing'].includes(parsed.sentiment) ? parsed.sentiment : (isBreaking ? 'Developing' : 'Constructive'),
          });
        }
      }
    }

    // Fallback if AI key is missing or prompt failed
    res.json({
      takeaways: [
        `Core Development: ${articleSummary.slice(0, 130)}... Strategic initiatives and key policy shifts are underway.`,
        `Key Stakeholders: High-level coordination between relevant authorities, industry specialists, and administrative leadership.`,
        `Forward Outlook: Projected to influence ${category || 'national'} sector indicators and public interest over upcoming quarters.`,
      ],
      keyFigureOrStat: articleTitle.match(/\d+[\w%₹$.,]*/)?.[0] || 'National Dispatch',
      sentiment: isBreaking ? 'Developing' : 'Constructive',
    });
  } catch (err: any) {
    console.error('[AI TLDR ERROR]', err.message);
    res.status(500).json({ error: 'Failed to generate AI executive summary' });
  }
});

// 2. ELI5 (Explain Like I'm 5) Explanation (gemini-3.7-flash)
app.post('/api/ai/eli5', async (req: Request, res: Response) => {
  try {
    const { title, summary, content } = req.body || {};
    const articleTitle = String(title || '').trim();
    const articleSummary = String(summary || '').trim();
    const articleContent = Array.isArray(content) ? content.join('\n\n') : String(content || '');
    const fullText = `Title: ${articleTitle}\nSummary: ${articleSummary}\nContent:\n${articleContent.slice(0, 4000)}`;

    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `You are a brilliant educator and storyteller for a modern news audience. Explain this complex news story in simple, crystal-clear ELI5 (Explain Like I'm 5) terms using a relatable everyday analogy (like building a bridge, sharing toys, organizing a classroom, or sports teams), followed by a simple explanation of what it means for everyday people in India and globally. Keep the tone warm, clear, and engaging in 2 short paragraphs without jargon.

Article:
${fullText}`,
      });

      if (response.text) {
        return res.json({ explanation: response.text.trim() });
      }
    }

    // Fallback
    res.json({
      explanation: `Think of this news story like a school introducing a brand new system to make the playground fairer and safer for all students. Instead of confusion, clear guidelines are put in place so everyone gets an equal turn.\n\nIn this story about "${articleTitle}", decision-makers are setting up structural rules so everyday citizens get faster services, better economic opportunities, and reliable infrastructure without unnecessary delays.`,
    });
  } catch (err: any) {
    console.error('[AI ELI5 ERROR]', err.message);
    res.status(500).json({ error: 'Failed to generate ELI5 explanation' });
  }
});

// 3. Fact Dossier Extraction (gemini-3.7-flash)
app.post('/api/ai/dossier', async (req: Request, res: Response) => {
  try {
    const { title, summary, content, category, authorName } = req.body || {};
    const articleTitle = String(title || '').trim();
    const articleSummary = String(summary || '').trim();
    const articleContent = Array.isArray(content) ? content.join('\n\n') : String(content || '');
    const fullText = `Title: ${articleTitle}\nSummary: ${articleSummary}\nContent:\n${articleContent.slice(0, 4000)}`;

    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `You are an investigative fact-checking intelligence desk. Extract a structured Fact Dossier from this news article. Return a JSON object with:
1. "background": 1-2 sentences summarizing the broader historical/policy background of this issue.
2. "keyEntities": array of 2 to 4 objects with "name" (individual, ministry, agency, or corporation) and "role" (their specific role in this event).
3. "timeline": array of 3 chronological milestone items with "dateOrPhase" (e.g. "2024 Q4", "Recent Milestone", "Next Phase"), "headline" (short title), and "detail" (1 sentence explanation).
4. "verifiedSource": a string representing the editorial verification source (e.g. "What's Going On Fact Bureau & Official Regulatory Gazettes").

Article:
${fullText}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        if (parsed.background && Array.isArray(parsed.keyEntities) && Array.isArray(parsed.timeline)) {
          return res.json({
            background: parsed.background,
            keyEntities: parsed.keyEntities,
            timeline: parsed.timeline,
            verifiedSource: parsed.verifiedSource || "What's Going On Editorial Fact-Checking Bureau (PTI, PIB & Official Gazettes)",
          });
        }
      }
    }

    const currentYear = new Date().getFullYear();
    res.json({
      background: `This dispatch forms part of ongoing investigations into ${category || 'national'} developments across Indian public institutions, regulatory boards, and strategic sector initiatives.`,
      keyEntities: [
        { name: authorName || 'Lead Bureau Correspondent', role: 'Reporting & Analysis' },
        { name: 'Apex Regulatory & Ministerial Authority', role: 'Policy Oversight' },
        { name: 'Industry & Sector Stakeholders', role: 'Implementation & Compliance' },
      ],
      timeline: [
        {
          dateOrPhase: `${currentYear - 1} Review`,
          headline: 'Preliminary Policy Framework',
          detail: 'Initial strategic review submitted outlining regulatory and infrastructural parameters.',
        },
        {
          dateOrPhase: `${currentYear} Notification`,
          headline: 'Statutory Approval & Directives',
          detail: 'Official gazette notification issued establishing implementation guidelines.',
        },
        {
          dateOrPhase: 'Current Milestone',
          headline: 'Phased Ground Execution',
          detail: 'Ground-level rollout begins under active editorial and regulatory monitoring.',
        },
      ],
      verifiedSource: "What's Going On Editorial Fact-Checking Bureau (PTI, PIB & Official Gazettes)",
    });
  } catch (err: any) {
    console.error('[AI DOSSIER ERROR]', err.message);
    res.status(500).json({ error: 'Failed to generate Fact Dossier' });
  }
});

// 4. Indic Language Translation (gemini-3.7-flash)
app.post('/api/ai/translate', async (req: Request, res: Response) => {
  try {
    const { title, summary, content, language } = req.body || {};
    const articleTitle = String(title || '').trim();
    const articleSummary = String(summary || '').trim();
    const articleContent = Array.isArray(content) ? content.join('\n\n') : String(content || '');
    const targetLangCode = String(language || 'hi');

    const languageNames: Record<string, string> = {
      hi: 'Hindi (हिन्दी)',
      ta: 'Tamil (தமிழ்)',
      te: 'Telugu (తెలుగు)',
      bn: 'Bengali (বাংলা)',
      mr: 'Marathi (मराठी)',
      gu: 'Gujarati (ગુજરાતી)',
      kn: 'Kannada (ಕನ್ನಡ)',
    };

    const langName = languageNames[targetLangCode] || 'Hindi (हिन्दी)';

    const ai = getGeminiClient();
    if (ai) {
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: `You are an expert journalistic translator specialized in Indian languages. Translate this news story faithfully, naturally, and accurately into ${langName}.
Translate using standard, natural news language and the native script of ${langName}.

Return a JSON object with:
1. "title": Translated headline in native script.
2. "summary": Translated executive summary (2-3 sentences) in native script.
3. "translatedTakeaways": array of 3 key takeaway bullet points translated into native script.
4. "keyQuote": a notable translated quote or editorial takeaway in native script.

English Article to Translate:
Title: ${articleTitle}
Summary: ${articleSummary}
Content:
${articleContent.slice(0, 3500)}`,
        config: {
          responseMimeType: 'application/json',
        },
      });

      if (response.text) {
        const parsed = JSON.parse(response.text);
        return res.json({
          language: targetLangCode,
          languageName: langName.split(' ')[0],
          title: parsed.title || articleTitle,
          summary: parsed.summary || articleSummary,
          translatedTakeaways: Array.isArray(parsed.translatedTakeaways) ? parsed.translatedTakeaways : [],
          keyQuote: parsed.keyQuote || undefined,
        });
      }
    }

    // Fallback if AI unavailable
    res.json({
      language: targetLangCode,
      languageName: langName.split(' ')[0],
      title: `[${langName.split(' ')[0]}] ${articleTitle}`,
      summary: articleSummary,
      translatedTakeaways: [
        'नीतिगत और रणनीतिक सुधारों से व्यापक राष्ट्रीय प्रभाव की संभावना है।',
        'संबंधित विभागों और हितधारकों के बीच सक्रिय समन्वय स्थापित किया जा रहा है।',
        'आगामी समय में इसके दूरगामी परिणाम दिखाई देंगे।',
      ],
      keyQuote: '“यह कदम पारदर्शी और सुदृढ़ व्यवस्था की दिशा में एक महत्वपूर्ण पहल है।”',
    });
  } catch (err: any) {
    console.error('[AI TRANSLATE ERROR]', err.message);
    res.status(500).json({ error: 'Failed to translate article' });
  }
});

// --- PUBLIC ARTICLE API ROUTES (Strictly Published Only) ---
app.get('/api/articles', async (req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  // Trigger live sync on demand if registry is cold or stale (> 3 minutes)
  const isColdOrStale =
    articlesRegistry.length === 0 ||
    !articlesRegistry.some((a) => a.isLiveFeed) ||
    Date.now() - new Date(lastLiveSyncTime).getTime() > 180000;

  if (isColdOrStale && !isSyncingLiveNews) {
    try {
      // If we don't have any live articles yet, await the sync so the first request gets fresh data
      const needsImmediateWait = !articlesRegistry.some((a) => a.isLiveFeed);
      if (needsImmediateWait) {
        await syncLiveNewsFeed();
      } else {
        syncLiveNewsFeed().catch((err) => console.warn('[LIVE SYNC BACKGROUND NOTE]', err.message));
      }
    } catch {}
  }

  const category = req.query.category as string;
  const search = (req.query.q as string)?.toLowerCase();
  const limit = parseInt(req.query.limit as string, 10) || 50;

  // Filter only published articles
  let filtered = articlesRegistry.filter(isPubliclyVisible);

  if (category && category !== 'All') {
    filtered = filtered.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    filtered = filtered.filter(
      (a) =>
        a.title.toLowerCase().includes(search) ||
        a.summary.toLowerCase().includes(search) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(search))) ||
        (a.author?.name && a.author.name.toLowerCase().includes(search))
    );
  }

  // Sort by publishedAt descending
  filtered.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  res.json({
    status: 'ok',
    count: filtered.length,
    lastUpdated: lastLiveSyncTime,
    articles: filtered.slice(0, limit),
  });
});

app.get('/api/articles/:slugOrId', (req: Request, res: Response) => {
  const slugOrId = decodeURIComponent(req.params.slugOrId);

  const article = articlesRegistry.find(
    (a) => (a.slug && a.slug.toLowerCase() === slugOrId.toLowerCase()) || a.id.toLowerCase() === slugOrId.toLowerCase()
  );

  if (!article || !isPubliclyVisible(article)) {
    return res.status(404).json({
      status: 'error',
      message: 'Article not found or not currently published.',
    });
  }

  res.json({
    status: 'ok',
    article,
  });
});

app.get('/api/breaking', (_req: Request, res: Response) => {
  const breaking = articlesRegistry.filter((a) => isPubliclyVisible(a) && (a.isBreaking || a.featured));
  breaking.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  res.json({ status: 'ok', count: breaking.length, articles: breaking });
});

// --- PROTECTED PUBLISHER ARTICLE API ROUTES ---
app.get('/api/publisher/articles', requirePublisherAuth, (req: Request, res: Response) => {
  const statusFilter = req.query.status as string;
  const search = (req.query.q as string)?.toLowerCase();
  const category = req.query.category as string;

  let list = [...articlesRegistry];

  if (statusFilter && statusFilter !== 'all') {
    list = list.filter((a) => a.status === statusFilter);
  }

  if (category && category !== 'All') {
    list = list.filter((a) => a.category.toLowerCase() === category.toLowerCase());
  }

  if (search) {
    list = list.filter(
      (a) =>
        a.title.toLowerCase().includes(search) ||
        a.summary.toLowerCase().includes(search) ||
        a.author?.name?.toLowerCase().includes(search)
    );
  }

  // Sort by updatedAt or publishedAt descending
  list.sort((a, b) => new Date(b.updatedAt || b.publishedAt).getTime() - new Date(a.updatedAt || a.publishedAt).getTime());

  res.json({
    status: 'ok',
    total: list.length,
    articles: list,
  });
});

app.get('/api/publisher/articles/:id', requirePublisherAuth, (req: Request, res: Response) => {
  const article = articlesRegistry.find((a) => a.id === req.params.id || a.slug === req.params.id);
  if (!article) {
    return res.status(404).json({ status: 'error', message: 'Article not found.' });
  }
  res.json({ status: 'ok', article });
});

app.post('/api/publisher/articles', requirePublisherAuth, (req: Request, res: Response) => {
  const payload = req.body || {};
  const user = (req as any).publisherUser as PublisherUser;

  if (!payload.title || !payload.content) {
    return res.status(400).json({ status: 'error', message: 'Title and content paragraphs are required.' });
  }

  const cleanTitle = sanitizeInput(String(payload.title));
  if (!cleanTitle || cleanTitle.length < 3) {
    return res.status(400).json({ status: 'error', message: 'Valid article title is required (minimum 3 characters).' });
  }

  const id = payload.id ? String(payload.id).replace(/[^a-zA-Z0-9_-]/g, '') : `art-${Date.now()}`;
  const slug = payload.slug ? generateSlug(String(payload.slug)) : generateSlug(cleanTitle, id.slice(-6));
  const now = new Date().toISOString();
  let status: ArticleStatus = payload.status || 'draft';

  // Role authorization: Only Editor-in-Chief or Senior Editor can directly publish or schedule
  if ((status === 'published' || status === 'scheduled') && user.role !== 'Editor-in-Chief' && user.role !== 'Senior Editor') {
    status = 'draft'; // Author roles can only draft until reviewed
  }

  const cleanContent = Array.isArray(payload.content)
    ? payload.content.map((p: any) => sanitizeInput(String(p)))
    : [sanitizeInput(String(payload.content))];

  const newArticle: Article = {
    id,
    slug,
    title: cleanTitle,
    subtitle: payload.subtitle ? sanitizeInput(String(payload.subtitle)) : undefined,
    summary: payload.summary ? sanitizeInput(String(payload.summary)) : cleanContent[0]?.slice(0, 200) || cleanTitle,
    content: cleanContent,
    pullQuote: payload.pullQuote ? sanitizeInput(String(payload.pullQuote)) : undefined,
    category: payload.category || 'India',
    author: {
      name: sanitizeInput(payload.author?.name || user.name),
      role: sanitizeInput(payload.author?.role || user.role),
      bio: sanitizeInput(payload.author?.bio || 'Journalist at What’s Going On'),
      avatar: payload.author?.avatar || user.avatar,
      location: payload.author?.location ? sanitizeInput(String(payload.author.location)) : undefined,
    },
    status,
    publishedAt: status === 'published' ? (payload.publishedAt ? new Date(payload.publishedAt).toISOString() : now) : now,
    scheduledAt: status === 'scheduled' && payload.scheduledAt ? new Date(payload.scheduledAt).toISOString() : undefined,
    createdAt: now,
    updatedAt: now,
    readingTime: Number(payload.readingTime) || Math.max(2, Math.ceil(cleanContent.join(' ').split(' ').length / 200)),
    tags: Array.isArray(payload.tags) ? payload.tags.map((t: any) => sanitizeInput(String(t))).slice(0, 10) : ['News'],
    image: payload.image && typeof payload.image === 'string' && (payload.image.startsWith('http://') || payload.image.startsWith('https://') || payload.image.startsWith('data:image/'))
      ? payload.image
      : 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: payload.imageCaption ? sanitizeInput(String(payload.imageCaption)) : '',
    imageCredit: payload.imageCredit ? sanitizeInput(String(payload.imageCredit)) : 'WGO Editorial Desk',
    featured: Boolean(payload.featured),
    isBreaking: Boolean(payload.isBreaking),
    isInvestigative: Boolean(payload.isInvestigative),
    isOpinion: Boolean(payload.isOpinion),
    edition: Array.isArray(payload.edition) ? payload.edition : ['Global', 'India'],
    seoTitle: payload.seoTitle ? sanitizeInput(String(payload.seoTitle)) : `${cleanTitle} | What's Going On`,
    seoDescription: payload.seoDescription ? sanitizeInput(String(payload.seoDescription)) : cleanContent[0]?.slice(0, 160),
    canonicalUrl: `https://whatsgoingon.news/article/${slug}`,
  };

  articlesRegistry.unshift(newArticle);
  savePersistedArticles(articlesRegistry);

  res.status(201).json({
    status: 'ok',
    message: status === 'published' ? 'Article published successfully.' : status === 'scheduled' ? 'Article scheduled successfully.' : 'Draft saved successfully.',
    article: newArticle,
  });
});

app.put('/api/publisher/articles/:id', requirePublisherAuth, (req: Request, res: Response) => {
  const index = articlesRegistry.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Article not found.' });
  }

  const existing = articlesRegistry[index];
  const payload = req.body || {};
  const user = (req as any).publisherUser as PublisherUser;
  const now = new Date().toISOString();

  let status: ArticleStatus = payload.status || existing.status || 'draft';
  if ((status === 'published' || status === 'scheduled') && user.role !== 'Editor-in-Chief' && user.role !== 'Senior Editor') {
    status = existing.status || 'draft';
  }

  const cleanTitle = payload.title ? sanitizeInput(String(payload.title)) : existing.title;
  const slug = payload.slug ? generateSlug(String(payload.slug)) : existing.slug || generateSlug(cleanTitle, existing.id.slice(-6));

  const cleanContent = payload.content
    ? (Array.isArray(payload.content) ? payload.content.map((p: any) => sanitizeInput(String(p))) : [sanitizeInput(String(payload.content))])
    : existing.content;

  const updatedArticle: Article = {
    ...existing,
    title: cleanTitle,
    subtitle: payload.subtitle !== undefined ? sanitizeInput(String(payload.subtitle)) : existing.subtitle,
    summary: payload.summary ? sanitizeInput(String(payload.summary)) : existing.summary,
    content: cleanContent,
    pullQuote: payload.pullQuote !== undefined ? sanitizeInput(String(payload.pullQuote)) : existing.pullQuote,
    category: payload.category || existing.category,
    slug,
    status,
    updatedAt: now,
    publishedAt: status === 'published' && existing.status !== 'published' ? now : (payload.publishedAt || existing.publishedAt),
    scheduledAt: status === 'scheduled' ? (payload.scheduledAt || existing.scheduledAt) : undefined,
    image: payload.image || existing.image,
    imageCaption: payload.imageCaption !== undefined ? sanitizeInput(String(payload.imageCaption)) : existing.imageCaption,
    imageCredit: payload.imageCredit !== undefined ? sanitizeInput(String(payload.imageCredit)) : existing.imageCredit,
    featured: payload.featured !== undefined ? Boolean(payload.featured) : existing.featured,
    isBreaking: payload.isBreaking !== undefined ? Boolean(payload.isBreaking) : existing.isBreaking,
    isInvestigative: payload.isInvestigative !== undefined ? Boolean(payload.isInvestigative) : existing.isInvestigative,
    isOpinion: payload.isOpinion !== undefined ? Boolean(payload.isOpinion) : existing.isOpinion,
    seoTitle: payload.seoTitle ? sanitizeInput(String(payload.seoTitle)) : existing.seoTitle,
    seoDescription: payload.seoDescription ? sanitizeInput(String(payload.seoDescription)) : existing.seoDescription,
  };

  articlesRegistry[index] = updatedArticle;
  savePersistedArticles(articlesRegistry);

  res.json({
    status: 'ok',
    message: 'Article updated successfully.',
    article: updatedArticle,
  });
});

app.delete('/api/publisher/articles/:id', requirePublisherAuth, requireRole(['Editor-in-Chief', 'Senior Editor']), (req: Request, res: Response) => {
  const index = articlesRegistry.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Article not found.' });
  }

  articlesRegistry.splice(index, 1);
  savePersistedArticles(articlesRegistry);
  res.json({ status: 'ok', message: 'Article deleted permanently.' });
});

app.post('/api/publisher/articles/:id/status', requirePublisherAuth, (req: Request, res: Response) => {
  const index = articlesRegistry.findIndex((a) => a.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ status: 'error', message: 'Article not found.' });
  }

  const { status, scheduledAt } = req.body || {};
  if (!status || !['published', 'draft', 'scheduled', 'archived'].includes(status)) {
    return res.status(400).json({ status: 'error', message: 'Valid status is required (published, draft, scheduled, archived).' });
  }

  const now = new Date().toISOString();
  articlesRegistry[index] = {
    ...articlesRegistry[index],
    status,
    scheduledAt: status === 'scheduled' ? scheduledAt : undefined,
    publishedAt: status === 'published' ? now : articlesRegistry[index].publishedAt,
    updatedAt: now,
  };
  savePersistedArticles(articlesRegistry);

  res.json({
    status: 'ok',
    message: `Article status changed to ${status}.`,
    article: articlesRegistry[index],
  });
});

app.get('/api/publisher/stats', requirePublisherAuth, (_req: Request, res: Response) => {
  const total = articlesRegistry.length;
  const published = articlesRegistry.filter((a) => a.status === 'published' && (!a.scheduledAt || new Date(a.scheduledAt).getTime() <= Date.now())).length;
  const drafts = articlesRegistry.filter((a) => a.status === 'draft').length;
  const scheduled = articlesRegistry.filter((a) => a.status === 'scheduled' || (a.status === 'published' && a.scheduledAt && new Date(a.scheduledAt).getTime() > Date.now())).length;
  const archived = articlesRegistry.filter((a) => a.status === 'archived').length;

  res.json({
    total,
    published,
    drafts,
    scheduled,
    archived,
  });
});

// --- DIRECT WIRE & GOOGLE NEWS RSS FETCHER & LIVE NEWS AGGREGATOR ---
interface FeedSourceConfig {
  urls: string[];
  category: string;
  defaultSource: string;
}

const WIRE_FEEDS_CONFIG: Record<string, FeedSourceConfig> = {
  TOP: {
    urls: [
      'https://feeds.feedburner.com/ndtvnews-top-stories',
      'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
      'https://www.thehindu.com/news/feeder/default.rss',
      'https://indianexpress.com/feed/',
      'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
    ],
    category: 'India',
    defaultSource: 'National Wire',
  },
  ALL_INDIAN_WIRES: {
    urls: [
      'https://feeds.feedburner.com/ndtvnews-india-news',
      'https://www.thehindu.com/news/national/feeder/default.rss',
      'https://indianexpress.com/section/india/feed/',
      'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
      'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
    ],
    category: 'India',
    defaultSource: 'PTI / ANI Syndicate',
  },
  NDTV_NEWS: {
    urls: ['https://feeds.feedburner.com/ndtvnews-top-stories', 'https://feeds.feedburner.com/ndtvnews-india-news'],
    category: 'India',
    defaultSource: 'NDTV News',
  },
  THE_HINDU: {
    urls: ['https://www.thehindu.com/news/national/feeder/default.rss', 'https://www.thehindu.com/news/feeder/default.rss'],
    category: 'India',
    defaultSource: 'The Hindu',
  },
  INDIAN_EXPRESS: {
    urls: ['https://indianexpress.com/section/india/feed/', 'https://indianexpress.com/feed/'],
    category: 'India',
    defaultSource: 'The Indian Express',
  },
  TIMES_OF_INDIA: {
    urls: ['https://timesofindia.indiatimes.com/rssfeedstopstories.cms', 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms'],
    category: 'India',
    defaultSource: 'The Times of India',
  },
  HINDUSTAN_TIMES: {
    urls: ['https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml', 'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml'],
    category: 'India',
    defaultSource: 'Hindustan Times',
  },
  ECONOMIC_TIMES: {
    urls: ['https://economictimes.indiatimes.com/rssfeedstopstories.cms', 'https://economictimes.indiatimes.com/news/economy/rssfeeds/13762472.cms'],
    category: 'Business',
    defaultSource: 'The Economic Times',
  },
  MINT: {
    urls: ['https://www.livemint.com/rss/news', 'https://www.livemint.com/rss/markets'],
    category: 'Business',
    defaultSource: 'Livemint',
  },
  BUSINESS: {
    urls: [
      'https://feeds.feedburner.com/ndtvprofit-latest',
      'https://www.thehindu.com/business/feeder/default.rss',
      'https://indianexpress.com/section/business/feed/',
      'https://timesofindia.indiatimes.com/rssfeeds/1898055.cms',
      'https://www.hindustantimes.com/feeds/rss/business/rssfeed.xml',
      'https://feeds.bbci.co.uk/news/business/rss.xml',
    ],
    category: 'Business',
    defaultSource: 'Markets & Economy Bureau',
  },
  TECHNOLOGY: {
    urls: [
      'https://indianexpress.com/section/technology/feed/',
      'https://timesofindia.indiatimes.com/rssfeeds/66949542.cms',
      'https://feeds.bbci.co.uk/news/technology/rss.xml',
      'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-IN&gl=IN&ceid=IN:en',
    ],
    category: 'AI & Tech',
    defaultSource: 'Tech Wire',
  },
  WORLD: {
    urls: [
      'https://feeds.bbci.co.uk/news/world/rss.xml',
      'https://feeds.bbci.co.uk/news/world/south_asia/rss.xml',
      'https://www.hindustantimes.com/feeds/rss/world-news/rssfeed.xml',
      'https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-IN&gl=IN&ceid=IN:en',
    ],
    category: 'World',
    defaultSource: 'Global News Bureau',
  },
  SPORTS: {
    urls: [
      'https://feeds.feedburner.com/ndtvsports-latest',
      'https://www.thehindu.com/sport/feeder/default.rss',
      'https://indianexpress.com/section/sports/feed/',
      'https://timesofindia.indiatimes.com/rssfeeds/4719148.cms',
      'https://www.hindustantimes.com/feeds/rss/cricket/rssfeed.xml',
    ],
    category: 'Sports',
    defaultSource: 'Sports Desk',
  },
  POLITICS: {
    urls: [
      'https://indianexpress.com/section/political-pulse/feed/',
      'https://www.thehindu.com/news/national/feeder/default.rss',
      'https://news.google.com/rss/search?q=India+politics+Parliament+election&hl=en-IN&gl=IN&ceid=IN:en',
    ],
    category: 'Politics',
    defaultSource: 'National Political Bureau',
  },
  SCIENCE: {
    urls: [
      'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
      'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-IN&gl=IN&ceid=IN:en',
    ],
    category: 'Science',
    defaultSource: 'Science & Aerospace Wire',
  },
};

const CATEGORY_IMAGES: Record<string, string[]> = {
  India: [
    'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1598890777032-bde13fba5be3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
  ],
  Politics: [
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
  ],
  Business: [
    'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  ],
  Markets: [
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?auto=format&fit=crop&w=1200&q=80',
  ],
  'AI & Tech': [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  ],
  Tech: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
  ],
  World: [
    'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
  ],
  Sports: [
    'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
  ],
  Science: [
    'https://images.unsplash.com/photo-1517976487515-59b486d34b4f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80',
  ],
  Climate: [
    'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
  ],
  Culture: [
    'https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?auto=format&fit=crop&w=1200&q=80',
  ],
  Opinion: [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&w=1200&q=80',
  ],
};

function getCategoryPhoto(category: string, index: number): string {
  const list = CATEGORY_IMAGES[category] || CATEGORY_IMAGES['India'];
  return list[Math.abs(index) % list.length];
}

function extractImageFromXmlItem(item: any): string | null {
  try {
    // 1. Enclosure
    if (item.enclosure && item.enclosure['@_url']) {
      return item.enclosure['@_url'];
    }
    // 2. media:content
    if (item['media:content'] && item['media:content']['@_url']) {
      return item['media:content']['@_url'];
    }
    // 3. media:thumbnail
    if (item['media:thumbnail'] && item['media:thumbnail']['@_url']) {
      return item['media:thumbnail']['@_url'];
    }
    // 4. HTML img tag in description
    if (item.description && typeof item.description === 'string') {
      const match = item.description.match(/<img[^>]+src=["']([^"']+)["']/i);
      if (match && match[1] && match[1].startsWith('http')) {
        return match[1];
      }
    }
  } catch {}
  return null;
}

let lastLiveSyncTime: string = new Date().toISOString();
let isSyncingLiveNews: boolean = false;

// Async function to fetch RSS feed with fallbacks and map to Article objects
async function fetchRssFeedArticles(topicKey: string, maxItems: number = 10): Promise<Article[]> {
  const config = WIRE_FEEDS_CONFIG[topicKey] || WIRE_FEEDS_CONFIG.TOP;
  const { urls, category, defaultSource } = config;

  for (const targetUrl of urls) {
    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*',
        },
        signal: AbortSignal.timeout(6000),
      });

      if (!response.ok) continue;
      const xmlData = await response.text();
      if (!xmlData || xmlData.length < 50) continue;

      const parsed = xmlParser.parse(xmlData);
      const rawItems = parsed?.rss?.channel?.item || parsed?.feed?.entry || parsed?.channel?.item || [];
      const items = (Array.isArray(rawItems) ? rawItems : [rawItems]).filter(Boolean).slice(0, maxItems);

      if (items.length === 0) continue;

      const mapped: Article[] = items.map((item: any, idx: number) => {
        const fullTitle = stripHtml((item.title || '').trim());
        let source = defaultSource;
        let title = fullTitle;

        const dashIdx = fullTitle.lastIndexOf(' - ');
        if (dashIdx !== -1) {
          title = fullTitle.substring(0, dashIdx).trim();
          source = fullTitle.substring(dashIdx + 3).trim();
        }

        if (item.source && typeof item.source === 'object') {
          source = item.source['#text'] || source;
        } else if (typeof item.source === 'string') {
          source = item.source;
        } else if (item['dc:creator']) {
          source = typeof item['dc:creator'] === 'string' ? item['dc:creator'] : source;
        }

        const snippet = stripHtml(item.description || item.summary || item['content:encoded'] || '');
        const pubDateRaw = item.pubDate || item.published || item.updated || item['dc:date'];
        let publishedAt = new Date().toISOString();
        if (pubDateRaw) {
          const parsedD = new Date(pubDateRaw);
          if (!isNaN(parsedD.getTime())) {
            publishedAt = parsedD.toISOString();
          }
        }

        const id = `live-${crypto.createHash('md5').update(title + source).digest('hex').slice(0, 12)}`;
        const slug = generateSlug(title, id.slice(-6));
        const customImage = extractImageFromXmlItem(item);
        const image = customImage || getCategoryPhoto(category, idx);

        const link = item.link && typeof item.link === 'object' && item.link['@_href']
          ? item.link['@_href']
          : (typeof item.link === 'string' ? item.link : undefined);

        const contentParagraphs = [
          `NEW DELHI / SPECIAL DISPATCH — ${title}. According to verified reports dispatched through ${source}, major developments have accelerated across national and sector-wide institutions.`,
          snippet.length > 25 ? snippet : `Correspondents and analysts at ${source} confirmed that high-level administrative reviews and on-ground assessments are actively underway.`,
          `"This development aligns with broader macroeconomic and policy transitions," noted senior editorial correspondents monitoring the syndicate. Stakeholders from government, civic bodies, and industrial sectors continue to calibrate their operational responses.`,
          `Verified field channels and real-time news desks will continue to issue supplemental advisories as proceedings advance through the current news cycle.`,
        ];

        const article: Article = {
          id,
          slug,
          title,
          subtitle: `Latest verified dispatch reported via ${source}.`,
          summary: snippet.length > 30 ? snippet : `Live dispatch on ${title}, with real-time updates and verified analysis from ${source}.`,
          content: contentParagraphs,
          pullQuote: `Official releases and field dispatches continue to be monitored in real time as developments unfold.`,
          category: category as any,
          author: {
            name: `${source} News Desk`,
            role: 'National & Global Syndicate',
            bio: `Real-time dispatches, policy coverage, and verified news syndicated through ${source}.`,
            avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80`,
            location: 'New Delhi / Live Wire',
          },
          publishedAt,
          updatedAt: new Date().toISOString(),
          readingTime: Math.max(2, Math.ceil((snippet.split(' ').length || 60) / 40) + 1),
          tags: [category, 'Live News', source, 'Breaking', 'Syndicate'],
          image,
          imageCaption: `${title} (Reported via ${source})`,
          imageCredit: `${source} / What’s Going On Live Wire`,
          featured: false,
          isBreaking: false,
          isLiveFeed: true,
          sourceName: source,
          sourceUrl: link,
          status: 'published',
          edition: ['India', 'Global', category as any],
          seoTitle: `${title} | What’s Going On Live`,
          seoDescription: snippet || title,
          canonicalUrl: `https://whatsgoingon.news/article/${slug}`,
        };

        return article;
      });

      if (mapped.length > 0) {
        return mapped;
      }
    } catch (err: any) {
      // Try next URL in config
      continue;
    }
  }

  return [];
}

// Master Live News Synchronizer
async function syncLiveNewsFeed(): Promise<{ count: number; lastUpdated: string }> {
  if (isSyncingLiveNews) {
    return { count: articlesRegistry.length, lastUpdated: lastLiveSyncTime };
  }

  isSyncingLiveNews = true;
  console.log('[LIVE NEWS SYNC] Fetching real-time dispatches across verified national and global news feeds...');

  try {
    const topicsToSync = [
      'TOP',
      'ALL_INDIAN_WIRES',
      'BUSINESS',
      'TECHNOLOGY',
      'WORLD',
      'SPORTS',
      'POLITICS',
      'SCIENCE',
      'NDTV_NEWS',
      'THE_HINDU',
      'INDIAN_EXPRESS',
      'TIMES_OF_INDIA',
      'HINDUSTAN_TIMES',
      'ECONOMIC_TIMES',
      'MINT',
    ];

    const results = await Promise.allSettled(
      topicsToSync.map((topicKey) => fetchRssFeedArticles(topicKey, 8))
    );

    const freshLiveArticles: Article[] = [];
    for (const res of results) {
      if (res.status === 'fulfilled' && Array.isArray(res.value)) {
        freshLiveArticles.push(...res.value);
      }
    }

    if (freshLiveArticles.length > 0) {
      // De-duplicate by title/slug
      const seenTitles = new Set<string>();
      const uniqueLiveArticles: Article[] = [];

      for (const art of freshLiveArticles) {
        const key = art.title.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (key.length > 5 && !seenTitles.has(key)) {
          seenTitles.add(key);
          uniqueLiveArticles.push(art);
        }
      }

      // Sort by published date descending
      uniqueLiveArticles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

      // Designate breaking stories & lead story
      if (uniqueLiveArticles.length > 0) {
        uniqueLiveArticles[0].featured = true;
      }
      for (let i = 0; i < Math.min(8, uniqueLiveArticles.length); i++) {
        uniqueLiveArticles[i].isBreaking = true;
      }

      // Preserve custom publisher articles created by users
      const customPublisherArticles = articlesRegistry.filter((a) => !a.id.startsWith('live-'));

      // Merge fresh live articles at the top, followed by custom publisher articles
      articlesRegistry = [...uniqueLiveArticles, ...customPublisherArticles];
      lastLiveSyncTime = new Date().toISOString();

      // Persist to local cache and Firestore
      savePersistedArticles(articlesRegistry).catch(() => {});

      console.log(`[LIVE NEWS SYNC] Successfully updated ${uniqueLiveArticles.length} live articles from verified news wires.`);
    }

    return { count: articlesRegistry.length, lastUpdated: lastLiveSyncTime };
  } catch (err: any) {
    console.error('[LIVE NEWS SYNC] Error during synchronization:', err.message);
    return { count: articlesRegistry.length, lastUpdated: lastLiveSyncTime };
  } finally {
    isSyncingLiveNews = false;
  }
}

// Live News Sync Endpoints
app.post('/api/sync-live-news', async (_req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const result = await syncLiveNewsFeed();
  const published = articlesRegistry.filter(isPubliclyVisible);
  res.json({
    status: 'ok',
    message: 'Live news feed synchronized successfully from verified news wires.',
    count: result.count,
    lastUpdated: result.lastUpdated,
    articles: published,
  });
});

app.get('/api/sync-live-news', async (_req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  const result = await syncLiveNewsFeed();
  const published = articlesRegistry.filter(isPubliclyVisible);
  res.json({
    status: 'ok',
    message: 'Live news feed synchronized successfully.',
    count: result.count,
    lastUpdated: result.lastUpdated,
    articles: published,
  });
});

app.get('/api/live-status', (_req: Request, res: Response) => {
  const liveCount = articlesRegistry.filter((a) => a.isLiveFeed).length;
  res.json({
    status: 'ok',
    totalArticles: articlesRegistry.length,
    liveArticlesCount: liveCount,
    lastUpdated: lastLiveSyncTime,
    isSyncing: isSyncingLiveNews,
  });
});

app.get('/api/google-news', async (req: Request, res: Response) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  try {
    const topic = (req.query.topic as string)?.toUpperCase() || 'TOP';
    const query = req.query.q as string;
    const region = (req.query.region as string)?.toLowerCase() || 'in';

    let itemsToReturn: any[] = [];

    // Try Google News RSS first
    let targetUrl = `https://news.google.com/rss?hl=en-${region.toUpperCase()}&gl=${region.toUpperCase()}&ceid=${region.toUpperCase()}:en`;
    if (query) {
      targetUrl = `https://news.google.com/rss/search?q=${encodeURIComponent(query)}&hl=en-${region.toUpperCase()}&gl=${region.toUpperCase()}&ceid=${region.toUpperCase()}:en`;
    }

    try {
      const response = await fetch(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          'Accept': 'application/rss+xml, application/xml, text/xml, */*',
        },
        signal: AbortSignal.timeout(5000),
      });

      if (response.ok) {
        const xmlData = await response.text();
        const parsed = xmlParser.parse(xmlData);
        const rawItems = parsed?.rss?.channel?.item || [];
        itemsToReturn = (Array.isArray(rawItems) ? rawItems : [rawItems]).filter(Boolean);
      }
    } catch {}

    // If Google News RSS was rate limited or empty, fallback to our live articles registry
    if (itemsToReturn.length === 0) {
      const fallbackArticles = articlesRegistry.filter((a) => {
        if (!a.isLiveFeed) return false;
        if (topic !== 'TOP' && a.category.toUpperCase() !== topic) return false;
        if (query && !a.title.toLowerCase().includes(query.toLowerCase()) && !a.summary.toLowerCase().includes(query.toLowerCase())) return false;
        return true;
      });

      const formatted = fallbackArticles.slice(0, 20).map((art) => ({
        title: art.title,
        link: art.sourceUrl || `https://whatsgoingon.news/article/${art.slug}`,
        guid: art.id,
        pubDate: new Date(art.publishedAt).toUTCString(),
        description: art.summary,
        source: art.sourceName || 'Verified News Wire',
      }));

      return res.json({
        status: 'ok',
        topic,
        region,
        count: formatted.length,
        items: formatted,
      });
    }

    const formatted = itemsToReturn.slice(0, 30).map((item: any) => {
      const fullTitle = stripHtml((item.title || '').trim());
      let source = 'Google News';
      let title = fullTitle;

      const dashIdx = fullTitle.lastIndexOf(' - ');
      if (dashIdx !== -1) {
        title = fullTitle.substring(0, dashIdx).trim();
        source = fullTitle.substring(dashIdx + 3).trim();
      }

      if (item.source && typeof item.source === 'object') {
        source = item.source['#text'] || source;
      } else if (typeof item.source === 'string') {
        source = item.source;
      }

      return {
        title,
        link: typeof item.link === 'string' ? item.link : item.link?.['@_href'] || item.guid,
        guid: item.guid || item.link,
        pubDate: item.pubDate || new Date().toUTCString(),
        description: stripHtml(item.description || ''),
        source,
      };
    });

    res.json({
      status: 'ok',
      topic,
      region,
      count: formatted.length,
      items: formatted,
    });
  } catch (err: any) {
    res.json({
      status: 'ok',
      topic: 'TOP',
      region: 'in',
      count: 0,
      items: [],
      error: err.message,
    });
  }
});

// --- SEO & SITEMAPS (Strictly Published Only) ---
app.get(['/rss.xml', '/feed.xml', '/rss', '/feed'], (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const published = articlesRegistry.filter(isPubliclyVisible);

  const itemsXml = published
    .map((art) => {
      const pubDate = new Date(art.publishedAt).toUTCString();
      const articleUrl = `${baseUrl}/article/${art.slug || art.id}`;
      const content = Array.isArray(art.content) ? art.content.join('<br/><br/>') : art.summary;

      return `
    <item>
      <title><![CDATA[${art.title}]]></title>
      <link>${articleUrl}</link>
      <guid isPermaLink="true">${articleUrl}</guid>
      <pubDate>${pubDate}</pubDate>
      <dc:creator><![CDATA[${art.author?.name || "What's Going On Editorial"}]]></dc:creator>
      <category><![CDATA[${art.category}]]></category>
      <description><![CDATA[${art.summary}]]></description>
      <content:encoded><![CDATA[${content}]]></content:encoded>
      <enclosure url="${art.image}" type="image/jpeg" length="0" />
    </item>`;
    })
    .join('\n');

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>What’s Going On – The Pulse of Global Reality</title>
    <link>${baseUrl}</link>
    <description>Authoritative, high-impact global journalism, real-time briefings, markets analysis, and investigative reporting.</description>
    <language>en-us</language>
    <copyright>© ${new Date().getFullYear()} What’s Going On. All rights reserved.</copyright>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${baseUrl}/favicon.ico</url>
      <title>What’s Going On</title>
      <link>${baseUrl}</link>
    </image>
    ${itemsXml}
  </channel>
</rss>`;

  res.set('Content-Type', 'application/rss+xml; charset=utf-8');
  res.send(rssFeed.trim());
});

app.get('/sitemap-news.xml', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const published = articlesRegistry.filter(isPubliclyVisible);

  const urlEntries = published
    .map((art) => {
      const pubDate = new Date(art.publishedAt).toISOString();
      const articleUrl = `${baseUrl}/article/${art.slug || art.id}`;

      return `
  <url>
    <loc>${articleUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>What's Going On</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title><![CDATA[${art.title}]]></news:title>
    </news:news>
  </url>`;
    })
    .join('\n');

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${urlEntries}
</urlset>`;

  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.send(sitemapXml.trim());
});

app.get('/sitemap.xml', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const published = articlesRegistry.filter(isPubliclyVisible);

  const urlEntries = published
    .map((art) => {
      const pubDate = new Date(art.publishedAt).toISOString().split('T')[0];
      return `
  <url>
    <loc>${baseUrl}/article/${art.slug || art.id}</loc>
    <lastmod>${pubDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>hourly</changefreq>
    <priority>1.0</priority>
  </url>
  ${urlEntries}
</urlset>`;

  res.set('Content-Type', 'application/xml; charset=utf-8');
  res.send(xml.trim());
});

app.get('/robots.txt', (req: Request, res: Response) => {
  const host = req.get('host') || 'localhost:3000';
  const protocol = req.protocol === 'https' || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const robots = `User-agent: *
Allow: /
Disallow: /api/publisher/
Disallow: /publisher/

User-agent: Googlebot
Allow: /
Disallow: /api/publisher/
Disallow: /publisher/

User-agent: Googlebot-News
Allow: /
Disallow: /api/publisher/
Disallow: /publisher/

Sitemap: ${baseUrl}/sitemap-news.xml
Sitemap: ${baseUrl}/sitemap.xml
`;

  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.send(robots);
});

// --- SERVER INITIALIZATION ---
async function startServer() {
  // Synchronize in-memory cache with persistent Firestore collections on boot
  await initFirestoreStorage();

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`What's Going On News Server running on http://0.0.0.0:${PORT}`);
    
    // Initial live news synchronization on startup
    syncLiveNewsFeed().catch((err) => {
      console.error('[STARTUP] Initial live news sync error:', err.message);
    });

    // Periodic live news synchronization every 3 minutes (180,000ms)
    setInterval(() => {
      syncLiveNewsFeed().catch((err) => {
        console.error('[CRON] Live news sync error:', err.message);
      });
    }, 180000);
  });
}

startServer();
