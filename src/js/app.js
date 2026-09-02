import '../styles/main.css';
import '../styles/layout.css';
import '../styles/components.css';
import '../styles/current-affairs.css';

import { SOURCE_REGISTRY, CATEGORIES } from './config/sources.js';
import { rssService } from './services/rssService.js';
import { cacheService } from './services/cacheService.js';
import { speechService } from './services/speechService.js';

import { HeaderComponent } from './components/header.js';
import { TickerComponent } from './components/ticker.js';
import { NewsGridComponent } from './components/newsGrid.js';
import { CurrentAffairsComponent } from './components/currentAffairs.js';
import { ArticleModalComponent } from './components/articleModal.js';
import { PublishModalComponent } from './components/publishModal.js';
import { AuthModalComponent } from './components/authModal.js';
import { AdminPanelComponent } from './components/adminPanel.js';
import { firebaseService } from './services/firebaseService.js';

class NewsApp {
  constructor() {
    this.articles = [];
    this.currentCategory = CATEGORIES.ALL;
    this.searchQuery = '';
    this.selectedSource = 'all';
    this.isLoading = false;

    // Components
    this.header = null;
    this.ticker = null;
    this.newsGrid = null;
    this.currentAffairs = null;
    this.modal = null;
    this.publishModal = null;
    this.authModal = null;
    this.adminPanel = null;
  }

  async init() {
    this.applyTheme(cacheService.getTheme());
    this.initComponents();
    this.renderCategoryNavigation();
    
    // Initial fetch
    await this.fetchNews(false);

    // Back-to-top button
    this.initBackToTop();
  }

  applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    cacheService.setTheme(theme);
    
    const sunIcon = document.getElementById('theme-icon-sun');
    if (sunIcon) {
      if (theme === 'light') {
        sunIcon.innerHTML = `<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>`;
      } else {
        sunIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
      }
    }
  }

  toggleTheme() {
    const current = cacheService.getTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    this.applyTheme(next);
  }

  initComponents() {
    // Auth Modal
    this.authModal = new AuthModalComponent((user) => {
      this.showToast(`✨ Welcome to What's Going On, ${user.displayName || user.email}!`, 'success');
    });
    this.authModal.init();

    // Admin Panel
    this.adminPanel = new AdminPanelComponent(
      () => {
        this.renderActiveView();
        this.showToast('Article moderation updated.', 'info');
      },
      (alertObj) => {
        this.handleBreakingAlert(alertObj);
      }
    );
    this.adminPanel.init();

    // Publish Studio Modal
    this.publishModal = new PublishModalComponent((publishedArticle) => {
      this.articles = [publishedArticle, ...this.articles.filter(a => a.id !== publishedArticle.id)];
      this.ticker.render(this.articles);
      this.renderActiveView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      this.showToast('🎉 Your article has been published live to What\'s Going On!', 'success');
    });
    this.publishModal.init();

    // Header
    this.header = new HeaderComponent(
      (isAuto) => this.fetchNews(isAuto),
      (query) => this.handleSearch(query),
      () => this.toggleTheme(),
      (interval) => this.handleIntervalChange(interval),
      () => this.publishModal.open(),
      (tab) => this.authModal.open(tab),
      () => this.adminPanel.open(this.articles)
    );
    this.header.init();

    // Listen to Firebase Auth state
    firebaseService.onAuthStateChanged((user) => {
      this.header.updateUserAuthState(user);
    });

    // Check breaking alert on load
    const activeAlert = firebaseService.getBreakingAlert();
    if (activeAlert) this.handleBreakingAlert(activeAlert);

    // Modal
    this.modal = new ArticleModalComponent((article, isBookmarked) => {
      this.header.updateBookmarkBadge();
    });

    // Ticker
    this.ticker = new TickerComponent((article) => {
      this.modal.open(article);
    });

    // News Grid
    this.newsGrid = new NewsGridComponent(
      (article) => this.modal.open(article),
      (article, isBookmarked) => {
        this.header.updateBookmarkBadge();
        if (this.currentCategory === CATEGORIES.SAVED) {
          this.renderActiveView();
        }
      }
    );

    // Current Affairs
    this.currentAffairs = new CurrentAffairsComponent();

    // Attach bookmark button click
    const bookmarkViewBtn = document.getElementById('btn-bookmarks-view');
    if (bookmarkViewBtn) {
      bookmarkViewBtn.addEventListener('click', () => {
        this.setCategory(CATEGORIES.SAVED);
      });
    }

    // View Mode Toggle buttons
    const btnGrid = document.getElementById('btn-view-grid');
    const btnList = document.getElementById('btn-view-list');
    if (btnGrid && btnList) {
      btnGrid.addEventListener('click', () => {
        btnGrid.classList.add('active');
        btnList.classList.remove('active');
        this.newsGrid.setViewMode('grid');
        this.renderActiveView();
      });
      btnList.addEventListener('click', () => {
        btnList.classList.add('active');
        btnGrid.classList.remove('active');
        this.newsGrid.setViewMode('compact');
        this.renderActiveView();
      });
    }
  }

  renderCategoryNavigation() {
    const tabsContainer = document.getElementById('category-tabs-nav');
    const sourceSelect = document.getElementById('select-source-filter');

    const categoriesList = [
      { id: CATEGORIES.ALL, label: '⚡ All News (Front Page)' },
      { id: CATEGORIES.INDIA_POLITICS, label: '🏛️ Indian Politics & Governance' },
      { id: CATEGORIES.INDIA, label: '🇮🇳 India Media Wires' },
      { id: CATEGORIES.WORLD, label: '🌍 Global News Wires' },
      { id: CATEGORIES.BUSINESS, label: '📊 Market Indices & Economy' },
      { id: CATEGORIES.GOOGLE_NEWS, label: '🌐 Google News' },
      { id: CATEGORIES.CURRENT_AFFAIRS, label: '⭐ Current Affairs Hub', highlight: true },
      { id: CATEGORIES.TECH, label: '🤖 Tech & AI' },
      { id: CATEGORIES.SCIENCE, label: '🚀 Science & Defense' },
      { id: CATEGORIES.SAVED, label: '🔖 Saved Stories' }
    ];

    if (tabsContainer) {
      tabsContainer.innerHTML = categoriesList.map(cat => `
        <button class="cat-tab ${cat.id === this.currentCategory ? 'active' : ''} ${cat.highlight ? 'highlight-ca' : ''}" data-category="${cat.id}">
          ${cat.label}
        </button>
      `).join('');

      tabsContainer.addEventListener('click', (e) => {
        const btn = e.target.closest('.cat-tab');
        if (btn) {
          const catId = btn.getAttribute('data-category');
          this.setCategory(catId);
        }
      });
    }

    if (sourceSelect) {
      sourceSelect.innerHTML = `
        <option value="all">All Outlets & Wires</option>
        <optgroup label="Indian Politics & National Wires">
          ${SOURCE_REGISTRY.filter(s => s.region === 'india').map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
        </optgroup>
        <optgroup label="Global News Wires & International">
          ${SOURCE_REGISTRY.filter(s => s.region === 'global').map(s => `<option value="${s.id}">${s.name}</option>`).join('')}
        </optgroup>
      `;

      sourceSelect.addEventListener('change', (e) => {
        this.selectedSource = e.target.value;
        this.renderActiveView();
      });
    }
  }


  setCategory(categoryId) {
    this.currentCategory = categoryId;
    this.searchQuery = '';
    const searchInput = document.getElementById('global-search-input');
    if (searchInput) searchInput.value = '';

    // Update nav active class
    const tabs = document.querySelectorAll('.cat-tab');
    tabs.forEach(tab => {
      tab.classList.toggle('active', tab.getAttribute('data-category') === categoryId);
    });

    this.renderActiveView();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  handleSearch(query) {
    this.searchQuery = query.toLowerCase();
    this.renderActiveView();
  }

  handleIntervalChange(interval) {
    this.showToast(`Auto-update set to every ${Math.round(interval / 60)} minute(s)`, 'info');
  }

  initBackToTop() {
    // Inject button into DOM
    const btn = document.createElement('button');
    btn.id = 'btn-back-to-top';
    btn.title = 'Back to top';
    btn.setAttribute('aria-label', 'Back to top');
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });
  }

  handleBreakingAlert(alertObj) {
    const existingBanner = document.getElementById('admin-breaking-alert-banner');
    if (existingBanner) existingBanner.remove();

    if (!alertObj) return;

    const banner = document.createElement('div');
    banner.id = 'admin-breaking-alert-banner';
    banner.className = 'admin-breaking-alert-banner';
    banner.innerHTML = `
      <div class="breaking-banner-inner">
        <span class="breaking-banner-tag">
          🔴 BREAKING BROADCAST
        </span>
        <span class="breaking-banner-text">${alertObj.text}</span>
        <button id="btn-close-alert-banner" class="breaking-banner-close" title="Dismiss banner">&times;</button>
      </div>
    `;

    document.body.prepend(banner);
    const closeBtn = banner.querySelector('#btn-close-alert-banner');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => banner.remove());
    }
  }

  async fetchNews(isAutoUpdate = false) {
    if (this.isLoading) return;
    this.isLoading = true;

    const btnRefresh = document.getElementById('btn-header-refresh');
    if (btnRefresh) btnRefresh.classList.add('spinning');

    if (!isAutoUpdate) {
      this.renderLoadingSkeleton();
    }

    try {
      const fetched = await rssService.fetchAllFeeds();
      this.articles = fetched;

      // Cache articles for faster reload on next visit
      cacheService.setCachedArticles(this.articles);

      // Update Ticker
      this.ticker.render(this.articles);

      // Render view
      this.renderActiveView();

      // Update last sync time indicator in header
      if (this.header) {
        this.header.updateLastSyncTime(new Date());
      }

      if (isAutoUpdate) {
        const timeNow = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
        this.showToast(`🔄 Auto-refreshed: ${this.articles.length} news stories synchronized at ${timeNow}`, 'success');
      }
    } catch (err) {
      console.error('Error fetching feeds:', err);
      this.showToast('Notice: Using synchronized offline intelligence feeds.', 'info');
    } finally {
      this.isLoading = false;
      if (btnRefresh) {
        setTimeout(() => btnRefresh.classList.remove('spinning'), 700);
      }
    }
  }

  renderLoadingSkeleton() {
    const feed = document.getElementById('main-news-feed');
    if (!feed) return;

    feed.innerHTML = `
      <div style="display: flex; flex-direction: column; gap: 24px;">
        <div class="skeleton" style="height: 380px; width: 100%; border-radius: var(--radius-lg);"></div>
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px;">
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
          <div class="skeleton" style="height: 280px; border-radius: var(--radius-md);"></div>
        </div>
      </div>
    `;
  }

  renderActiveView() {
    const feed = document.getElementById('main-news-feed');
    if (!feed) return;

    // Smooth fade-out before content swap
    feed.classList.add('fading');

    setTimeout(() => {
      feed.classList.remove('fading');
      this._doRenderActiveView();
    }, 150);
  }

  _doRenderActiveView() {
    if (this.currentCategory === CATEGORIES.CURRENT_AFFAIRS) {
      this.currentAffairs.render();
      return;
    }

    let filtered = [...this.articles];

    // Category filter
    if (this.currentCategory === CATEGORIES.SAVED) {
      filtered = cacheService.getBookmarks();
    } else if (this.currentCategory !== CATEGORIES.ALL) {
      filtered = filtered.filter(a => a.category === this.currentCategory);
    }

    // Source filter
    if (this.selectedSource !== 'all') {
      filtered = filtered.filter(a => a.sourceId === this.selectedSource);
    }

    // Search query filter
    if (this.searchQuery) {
      filtered = filtered.filter(a => 
        (a.title && a.title.toLowerCase().includes(this.searchQuery)) ||
        (a.snippet && a.snippet.toLowerCase().includes(this.searchQuery)) ||
        (a.source && a.source.toLowerCase().includes(this.searchQuery))
      );
    }

    this.newsGrid.render(filtered, {
      category: this.currentCategory,
      searchQuery: this.searchQuery,
      sourceFilter: this.selectedSource
    });
  }

  showToast(message, type = 'info') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }

    const iconPath = type === 'success'
      ? '<polyline points="20 6 9 17 4 12"></polyline>' // check mark
      : type === 'error'
        ? '<line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>' // X
        : '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line>'; // info

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        ${iconPath}
      </svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }
}

// Instantiate app upon DOM readiness
document.addEventListener('DOMContentLoaded', () => {
  const app = new NewsApp();
  app.init();
});
