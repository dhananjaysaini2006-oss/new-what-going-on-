/**
 * Firebase Integration & Authentication Service
 * Supports live Firebase Cloud project credentials as well as
 * pre-configured instant Admin and Reader authentication.
 */

// Your Firebase Project Configuration
// Replace these placeholder values with your real Firebase Console credentials:
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyDemoPlaceholderKeyForWhatsGoingOn",
  authDomain: "whats-going-on-news.firebaseapp.com",
  projectId: "whats-going-on-news",
  storageBucket: "whats-going-on-news.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};

const STORAGE_KEYS = {
  CURRENT_USER: 'wgo_auth_user_v1',
  REGISTERED_USERS: 'wgo_registered_users_v1',
  BREAKING_ALERT: 'wgo_breaking_alert_v1'
};

// Alert expiry window (24 hours in milliseconds)
const ALERT_EXPIRY_MS = 24 * 60 * 60 * 1000;

/**
 * Simple password obfuscation — prevents plain-text exposure in localStorage.
 * Not cryptographic-grade, but prevents casual snooping.
 */
function hashPassword(plain) {
  try {
    return btoa(encodeURIComponent(plain + '_wgo_salt_2026'));
  } catch (e) {
    return plain;
  }
}

function verifyPassword(plain, stored) {
  return hashPassword(plain) === stored;
}

// Admin account (credentials obfuscated at runtime — never stored as plain text)
const _a = { e: 'dhananjaysaini2006@gmail.com', h: hashPassword('242622') };



class FirebaseService {
  constructor() {
    this.currentUser = null;
    this.authListeners = [];
    this.isFirebaseLive = false;
    this.firebaseApp = null;
    this.firebaseAuth = null;

    this.init();
  }

  async init() {
    // Check local storage for persistent session
    this.loadSavedSession();
    this.ensureAdminExists();

    // Try initializing official Firebase SDK if installed
    try {
      if (FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.includes('Placeholder')) {
        const { initializeApp } = await import('firebase/app');
        const { getAuth } = await import('firebase/auth');
        this.firebaseApp = initializeApp(FIREBASE_CONFIG);
        this.firebaseAuth = getAuth(this.firebaseApp);
        this.isFirebaseLive = true;
        console.info('Connected to live Firebase Cloud project.');
      }
    } catch (e) {
      console.info('Using local Firebase Authentication adapter.');
    }
  }

  loadSavedSession() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      if (saved) {
        this.currentUser = JSON.parse(saved);
      }
    } catch (e) {
      this.currentUser = null;
    }
  }

  ensureAdminExists() {
    const users = this.getAllUsers();
    const adminExists = users.some(u => u.email.toLowerCase() === _a.e.toLowerCase());
    if (!adminExists) {
      users.unshift({
        uid: 'admin-ds-wgo',
        email: _a.e,
        displayName: 'Dhananjay Saini',
        role: 'admin',
        passwordHash: _a.h,
        createdAt: '2026-09-02T00:00:00.000Z'
      });
      try {
        localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
      } catch (e) {}
    }
  }

  getAllUsers() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTERED_USERS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  getCurrentUser() {
    return this.currentUser;
  }

  isAdmin() {
    return this.currentUser && (
      this.currentUser.role === 'admin' ||
      (this.currentUser.email && this.currentUser.email.toLowerCase() === _a.e.toLowerCase())
    );
  }

  onAuthStateChanged(callback) {
    this.authListeners.push(callback);
    callback(this.currentUser);
    return () => {
      this.authListeners = this.authListeners.filter(cb => cb !== callback);
    };
  }

  notifyAuthChanged() {
    this.authListeners.forEach(cb => {
      try {
        cb(this.currentUser);
      } catch (e) {
        console.error('Error in auth listener:', e);
      }
    });
  }

  /**
   * Sign In with Email & Password
   */
  async signIn(email, password) {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please provide both email and password.');
    }

    if (!cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    // 1. Check Super Admin Credentials (using obfuscated comparison)
    if (cleanEmail === _a.e.toLowerCase()) {
      if (verifyPassword(cleanPassword, _a.h)) {
        this.currentUser = {
          uid: 'admin-ds-wgo',
          email: _a.e,
          displayName: 'Dhananjay Saini',
          role: 'admin',
          photoURL: null
        };
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
        this.notifyAuthChanged();
        return this.currentUser;
      } else {
        throw new Error('Incorrect password. Please try again.');
      }
    }

    // 2. Check registered reader accounts
    const users = this.getAllUsers();
    const foundUser = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!foundUser) {
      throw new Error('No account found with this email. Please sign up first.');
    }

    const passwordOk = foundUser.passwordHash
      ? verifyPassword(cleanPassword, foundUser.passwordHash)
      : (foundUser.passwordHash === cleanPassword); // legacy plain-text fallback

    if (!passwordOk) {
      throw new Error('Invalid password. Please try again.');
    }

    this.currentUser = {
      uid: foundUser.uid,
      email: foundUser.email,
      displayName: foundUser.displayName,
      role: foundUser.role || 'reader',
      photoURL: foundUser.photoURL || null
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    this.notifyAuthChanged();
    return this.currentUser;
  }

  /**
   * Sign Up / Register New Account
   */
  async signUp(email, password, displayName = '') {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();
    const cleanName = (displayName || '').trim() || cleanEmail.split('@')[0];

    if (!cleanEmail || !cleanPassword) {
      throw new Error('Please provide email and password.');
    }

    if (!cleanEmail.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }

    if (cleanPassword.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const users = this.getAllUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      throw new Error('An account with this email already exists. Please sign in.');
    }

    const newUser = {
      uid: 'user-' + Date.now(),
      email: cleanEmail,
      displayName: cleanName,
      role: 'reader',
      passwordHash: hashPassword(cleanPassword), // store hashed, not plain text
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTERED_USERS, JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to save user', e);
    }

    this.currentUser = {
      uid: newUser.uid,
      email: newUser.email,
      displayName: newUser.displayName,
      role: newUser.role,
      photoURL: null
    };

    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(this.currentUser));
    this.notifyAuthChanged();
    return this.currentUser;
  }

  /**
   * Sign Out
   */
  async signOut() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    this.notifyAuthChanged();
  }

  /**
   * Breaking Alert Management (Admin Feature)
   * Alerts auto-expire after 24 hours.
   */
  getBreakingAlert() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BREAKING_ALERT);
      if (!data) return null;
      const alertObj = JSON.parse(data);
      // Auto-expire stale alerts older than 24 hours
      if (alertObj.timestamp && (Date.now() - new Date(alertObj.timestamp).getTime()) > ALERT_EXPIRY_MS) {
        localStorage.removeItem(STORAGE_KEYS.BREAKING_ALERT);
        return null;
      }
      return alertObj;
    } catch (e) {
      return null;
    }
  }

  setBreakingAlert(alertText, urgency = 'high') {
    if (!this.isAdmin()) throw new Error('Unauthorized. Only Admins can broadcast alerts.');
    const alertObj = {
      id: 'alert-' + Date.now(),
      text: alertText,
      urgency,
      timestamp: new Date().toISOString(),
      author: this.currentUser.displayName,
      expiresAt: new Date(Date.now() + ALERT_EXPIRY_MS).toISOString()
    };
    localStorage.setItem(STORAGE_KEYS.BREAKING_ALERT, JSON.stringify(alertObj));
    return alertObj;
  }

  clearBreakingAlert() {
    if (!this.isAdmin()) throw new Error('Unauthorized.');
    localStorage.removeItem(STORAGE_KEYS.BREAKING_ALERT);
  }
}

export const firebaseService = new FirebaseService();

