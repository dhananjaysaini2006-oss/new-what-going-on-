import { Article, BookmarkItem } from '../types';

const BOOKMARKS_KEY = 'wgo-bookmarks';
const NEWSLETTER_KEY = 'wgo-newsletter-subscribed';
const READING_PREFS_KEY = 'wgo-reading-prefs';
const CUSTOM_ARTICLES_KEY = 'wgo-custom-published-articles';

export interface ReadingPrefs {
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  readingTheme: 'standard' | 'sepia' | 'focus';
}

export function getCustomArticles(): Article[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_ARTICLES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom articles', e);
    return [];
  }
}

export function saveCustomArticle(article: Article): Article[] {
  const current = getCustomArticles();
  const index = current.findIndex(a => a.id === article.id);
  let updated: Article[];
  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...article, updatedAt: new Date().toISOString() };
  } else {
    updated = [article, ...current];
  }
  try {
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving custom article locally', e);
  }
  return updated;
}

export function deleteCustomArticle(id: string): Article[] {
  const current = getCustomArticles();
  const updated = current.filter(a => a.id !== id);
  try {
    localStorage.setItem(CUSTOM_ARTICLES_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error deleting custom article locally', e);
  }
  return updated;
}

export function getBookmarks(): BookmarkItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(BOOKMARKS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading bookmarks', e);
    return [];
  }
}

export function saveBookmark(article: Article): BookmarkItem[] {
  const current = getBookmarks();
  if (current.some(b => b.id === article.id)) return current;
  
  const newItem: BookmarkItem = {
    id: article.id,
    title: article.title,
    category: article.category,
    savedAt: new Date().toISOString(),
    readingTime: article.readingTime,
    image: article.image,
    authorName: article.author.name
  };
  const updated = [newItem, ...current];
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error saving bookmark', e);
  }
  return updated;
}

export function removeBookmark(id: string): BookmarkItem[] {
  const current = getBookmarks();
  const updated = current.filter(b => b.id !== id);
  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error removing bookmark', e);
  }
  return updated;
}

export function isArticleBookmarked(id: string): boolean {
  const current = getBookmarks();
  return current.some(b => b.id === id);
}

export function clearAllBookmarks(): void {
  try {
    localStorage.removeItem(BOOKMARKS_KEY);
  } catch (e) {
    console.error('Error clearing bookmarks', e);
  }
}

export function isSubscribedToNewsletter(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(NEWSLETTER_KEY) === 'true';
}

export function setNewsletterSubscribed(email: string): void {
  try {
    localStorage.setItem(NEWSLETTER_KEY, 'true');
    localStorage.setItem('wgo-newsletter-email', email);
  } catch (e) {
    console.error('Error saving newsletter subscription', e);
  }
}

export function getReadingPreferences(): ReadingPrefs {
  const defaultPrefs: ReadingPrefs = { fontSize: 'base', readingTheme: 'standard' };
  if (typeof window === 'undefined') return defaultPrefs;
  try {
    const raw = localStorage.getItem(READING_PREFS_KEY);
    return raw ? { ...defaultPrefs, ...JSON.parse(raw) } : defaultPrefs;
  } catch {
    return defaultPrefs;
  }
}

export function saveReadingPreferences(prefs: ReadingPrefs): void {
  try {
    localStorage.setItem(READING_PREFS_KEY, JSON.stringify(prefs));
  } catch (e) {
    console.error('Error saving reading prefs', e);
  }
}

