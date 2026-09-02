const STORAGE_KEYS = {
  BOOKMARKS: 'wgo_bookmarks_v1',
  THEME: 'wgo_theme_v1',
  REFRESH_INTERVAL: 'wgo_interval_v1',
  VIEW_MODE: 'wgo_view_mode_v1',
  CACHED_ARTICLES: 'wgo_cached_articles_v1',
  READ_HISTORY: 'wgo_read_history_v1'
};

class CacheService {
  constructor() {
    this.bookmarks = this.loadBookmarks();
    this.readHistory = this.loadReadHistory();
  }

  // --- BOOKMARKS ---
  loadBookmarks() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Failed to load bookmarks from localStorage', e);
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(this.bookmarks));
    } catch (e) {
      console.warn('Failed to save bookmarks', e);
    }
  }

  toggleBookmark(article) {
    const index = this.bookmarks.findIndex(b => b.id === article.id || b.link === article.link);
    if (index >= 0) {
      this.bookmarks.splice(index, 1);
      this.saveBookmarks();
      return false; // Removed
    } else {
      this.bookmarks.unshift({
        ...article,
        savedAt: new Date().toISOString()
      });
      this.saveBookmarks();
      return true; // Added
    }
  }

  isBookmarked(articleId, link) {
    return this.bookmarks.some(b => b.id === articleId || (link && b.link === link));
  }

  getBookmarks() {
    return [...this.bookmarks];
  }

  // --- PREFERENCES ---
  getTheme() {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
  }

  setTheme(theme) {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  }

  getRefreshInterval() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.REFRESH_INTERVAL) || '180', 10); // 180s = 3 mins
  }

  setRefreshInterval(seconds) {
    localStorage.setItem(STORAGE_KEYS.REFRESH_INTERVAL, seconds.toString());
  }

  getViewMode() {
    return localStorage.getItem(STORAGE_KEYS.VIEW_MODE) || 'grid';
  }

  setViewMode(mode) {
    localStorage.setItem(STORAGE_KEYS.VIEW_MODE, mode);
  }

  // --- ARTICLE CACHE ---
  getCachedArticles() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CACHED_ARTICLES);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  }

  setCachedArticles(articles) {
    try {
      localStorage.setItem(STORAGE_KEYS.CACHED_ARTICLES, JSON.stringify(articles.slice(0, 100)));
    } catch (e) {
      console.warn('Failed to cache articles', e);
    }
  }

  // --- READ HISTORY ---
  loadReadHistory() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.READ_HISTORY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  markAsRead(articleId) {
    if (!this.readHistory) this.readHistory = this.loadReadHistory();
    if (!this.readHistory.includes(articleId)) {
      this.readHistory.push(articleId);
      if (this.readHistory.length > 200) this.readHistory.shift();
      try {
        localStorage.setItem(STORAGE_KEYS.READ_HISTORY, JSON.stringify(this.readHistory));
      } catch (e) {}
    }
  }

  // --- USER PUBLISHED ARTICLES ---
  getCustomArticles() {
    try {
      const data = localStorage.getItem('wgo_user_articles_v1');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  saveCustomArticle(article) {
    const articles = this.getCustomArticles();
    const updated = [article, ...articles.filter(a => a.id !== article.id)];
    try {
      localStorage.setItem('wgo_user_articles_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to save custom article', e);
    }
    return updated;
  }

  deleteCustomArticle(articleId) {
    const articles = this.getCustomArticles();
    const updated = articles.filter(a => a.id !== articleId);
    try {
      localStorage.setItem('wgo_user_articles_v1', JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to delete custom article', e);
    }
    return updated;
  }
}

export const cacheService = new CacheService();
