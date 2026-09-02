import { cacheService } from '../services/cacheService.js';

export class HeaderComponent {
  constructor(onRefreshCallback, onSearchCallback, onThemeToggleCallback, onIntervalChangeCallback, onPublishClickCallback, onAuthClickCallback, onAdminClickCallback) {
    this.onRefreshCallback = onRefreshCallback;
    this.onSearchCallback = onSearchCallback;
    this.onThemeToggleCallback = onThemeToggleCallback;
    this.onIntervalChangeCallback = onIntervalChangeCallback;
    this.onPublishClickCallback = onPublishClickCallback;
    this.onAuthClickCallback = onAuthClickCallback;
    this.onAdminClickCallback = onAdminClickCallback;
    this.remainingSeconds = cacheService.getRefreshInterval(); // default 180s (3 min)
    this.totalSeconds = this.remainingSeconds;
    this.countdownTimer = null;
    this.clockTimer = null;
  }

  init() {
    this.renderHeader();
    this.startLiveClock();
    this.startCountdown();
    this.attachEventListeners();
    this.updateBookmarkBadge();
    this.initMobileDrawer();
  }

  renderHeader() {
    const topBar = document.getElementById('top-utility-bar');
    const mainHeader = document.getElementById('main-header');

    if (topBar) {
      topBar.innerHTML = `
        <div class="top-bar-inner">
          <div class="top-bar-left" style="display: flex; align-items: center; gap: 14px;">
            <div class="live-time-display" style="display: flex; align-items: center; gap: 8px; font-size: 0.8rem; font-family: var(--font-sans);">
              <span style="font-weight: 700; color: var(--text-primary);" id="current-clock-date">Loading date...</span>
              <span style="color: var(--text-muted);">|</span>
              <span style="color: var(--text-secondary);">New Delhi Edition</span>
              <span style="color: var(--text-muted);">|</span>
              <a href="#hindu-top" style="color: var(--hindu-red); font-weight: 700; text-decoration: none; font-size: 0.775rem; letter-spacing: 0.05em;">e-Paper</a>
              <span style="color: var(--text-muted);">|</span>
              <div id="topbar-auth-pill" style="display: inline-flex; align-items: center;"></div>
              <span style="color: var(--text-muted);">|</span>
              <span class="badge badge-live" style="font-size: 0.675rem; padding: 2px 6px;">● LIVE WIRE</span>
            </div>
          </div>

          <div class="top-bar-right" style="display: flex; align-items: center; gap: 16px;">
            <div class="weather-snippet" style="display: flex; align-items: center; gap: 6px; font-size: 0.775rem; color: var(--text-secondary);">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" stroke-width="2">
                <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
              <span><strong>New Delhi</strong> 28°C</span>
            </div>

            <div style="display: flex; align-items: center; gap: 6px; font-size: 0.725rem; font-family: var(--font-mono); color: var(--accent-emerald);">
              <span style="display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: var(--accent-emerald); box-shadow: 0 0 6px var(--accent-emerald);"></span>
              <span id="last-sync-time">Synced: Just now</span>
            </div>

            <div class="refresh-countdown-widget" title="Auto-synchronizes news every 3 minutes">
              <svg class="countdown-progress-circle" viewBox="0 0 20 20">
                <circle class="circle-bg" cx="10" cy="10" r="7"></circle>
                <circle id="countdown-circle-bar" class="circle-progress" cx="10" cy="10" r="7"></circle>
              </svg>
              <span style="font-size: 0.725rem; color: var(--text-muted); font-weight: 600;">NEXT SYNC:</span>
              <span class="refresh-text" id="countdown-text" style="font-family: var(--font-mono); font-weight: 700; color: var(--text-primary);">03:00</span>
              <button id="btn-header-refresh" class="btn-manual-refresh" title="Synchronize News Now">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                </svg>
                Sync
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (mainHeader) {
      mainHeader.innerHTML = `
        <div class="header-container">
          <div class="header-left">
            <div style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-sans); text-transform: uppercase; letter-spacing: 0.05em;">
              <strong>National Edition</strong> • Multi-Wire
            </div>
          </div>

          <div class="brand-center">
            <div class="brand-title-wrap" id="btn-brand-home">
              <h1 class="brand-title">
                WHAT'S GOING ON
              </h1>
            </div>
            <div class="brand-tagline">
              India's National Real-Time Editorial &amp; Intelligence Broadsheet
            </div>
          </div>

          <div class="header-right">
            <div class="search-box-wrapper header-search-desktop">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="global-search-input" class="search-input" placeholder="Search stories, topics..." />
              <span class="search-kbd">/</span>
            </div>

            <!-- User Auth & Admin Panel Widget -->
            <div id="header-auth-container" class="header-auth-desktop">
              <!-- Dynamically populated by updateUserAuthState -->
            </div>

            <!-- Write & Publish Story Button (Admin only: hidden by default) -->
            <button id="btn-open-publish-modal" class="action-btn header-publish-desktop" title="Write &amp; Publish News Story" style="display: none; align-items: center; gap: 6px; padding: 6px 14px; border-radius: var(--radius-sm); background: var(--hindu-navy); color: #ffffff; font-size: 0.775rem; font-weight: 800; border: 1px solid var(--hindu-navy); cursor: pointer; text-transform: uppercase; letter-spacing: 0.04em;">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
              <span>✍️ Write Story</span>
            </button>

            <button id="btn-bookmarks-view" class="action-btn" title="Saved Bookmarks">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
              <span id="header-bookmark-badge" class="bookmark-counter-badge" style="display: none;">0</span>
            </button>

            <button id="btn-theme-toggle" class="action-btn" title="Toggle Light/Dark Theme">
              <svg id="theme-icon-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </button>

            <!-- Hamburger: Mobile only -->
            <button id="btn-hamburger" class="action-btn btn-hamburger" title="Navigation Menu" aria-label="Open navigation menu">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
                <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
              </svg>
            </button>
          </div>

          <!-- Mobile Full-Width Search Row -->
          <div class="mobile-search-bar">
            <div class="search-box-wrapper mobile-search-wrapper">
              <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input type="text" id="mobile-search-input" class="search-input" placeholder="Search live news, topics, beats..." />
              <button type="button" id="mobile-search-clear" class="mobile-search-clear" style="display:none;" aria-label="Clear search">✕</button>
            </div>
          </div>
        </div>
      `;
    }
  }

  initMobileDrawer() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const overlay = document.getElementById('mobile-drawer-overlay');
    const closeBtn = document.getElementById('btn-mobile-drawer-close');
    const hamburger = document.getElementById('btn-hamburger');
    const drawerCats = document.getElementById('mobile-drawer-categories');

    const openDrawer = () => {
      if (drawer) drawer.classList.add('open');
      if (overlay) overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    };
    const closeDrawer = () => {
      if (drawer) drawer.classList.remove('open');
      if (overlay) overlay.style.display = 'none';
      document.body.style.overflow = '';
    };

    if (hamburger) hamburger.addEventListener('click', openDrawer);
    if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Populate category links
    const categories = [
      { id: 'all', label: '⚡ All News (Front Page)' },
      { id: 'india-politics', label: '🏛️ Indian Politics' },
      { id: 'india', label: '🇮🇳 India Wire' },
      { id: 'world', label: '🌍 Global Wire' },
      { id: 'business', label: '📊 Markets & Economy' },
      { id: 'google-news', label: '🌐 Google News' },
      { id: 'current-affairs', label: '⭐ Current Affairs Hub' },
      { id: 'tech', label: '🤖 Tech & AI' },
      { id: 'science', label: '🚀 Science & Defense' },
      { id: 'saved', label: '🔖 Saved Stories' },
    ];

    if (drawerCats) {
      drawerCats.innerHTML = categories.map(cat => `
        <button
          class="mobile-drawer-cat-btn"
          data-cat="${cat.id}"
        >${cat.label}</button>
      `).join('');

      drawerCats.querySelectorAll('.mobile-drawer-cat-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const desktopTab = document.querySelector(`.cat-tab[data-category="${btn.dataset.cat}"]`);
          if (desktopTab) desktopTab.click();
          
          drawerCats.querySelectorAll('.mobile-drawer-cat-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          closeDrawer();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    }
  }

  startLiveClock() {
    const updateTime = () => {
      const now = new Date();
      const timeEl = document.getElementById('current-clock-time');
      const dateEl = document.getElementById('current-clock-date');
      
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString('en-IN', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        });
      }
      
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });
      }
    };

    updateTime();
    this.clockTimer = setInterval(updateTime, 1000);
  }

  startCountdown() {
    if (this.countdownTimer) clearInterval(this.countdownTimer);

    this.totalSeconds = cacheService.getRefreshInterval(); // default 180s (3 minutes)
    this.remainingSeconds = this.totalSeconds;
    this.nextRefreshTime = Date.now() + this.totalSeconds * 1000;

    const circleBar = document.getElementById('countdown-circle-bar');
    const textEl = document.getElementById('countdown-text');
    const perimeter = 2 * Math.PI * 7; // ~44px

    if (circleBar) {
      circleBar.style.strokeDasharray = `${perimeter}`;
    }

    const updateDisplay = () => {
      const now = Date.now();
      const diffMs = this.nextRefreshTime - now;
      const secsRemaining = Math.max(0, Math.ceil(diffMs / 1000));
      this.remainingSeconds = secsRemaining;

      const mins = Math.floor(this.remainingSeconds / 60);
      const secs = this.remainingSeconds % 60;
      if (textEl) {
        textEl.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      }

      if (circleBar) {
        const fraction = Math.min(1, Math.max(0, this.remainingSeconds / this.totalSeconds));
        const offset = perimeter * (1 - fraction);
        circleBar.style.strokeDashoffset = `${offset}`;
      }

      if (secsRemaining <= 0) {
        this.resetCountdown();
        if (textEl) textEl.textContent = 'Syncing...';
        if (this.onRefreshCallback) {
          this.onRefreshCallback(true);
        }
      }
    };

    updateDisplay();

    this.countdownTimer = setInterval(updateDisplay, 1000);

    // Keep active even if user minimizes window or switches tabs
    if (!this.visibilityListenerAttached) {
      this.visibilityListenerAttached = true;
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          updateDisplay();
        }
      });
    }
  }

  resetCountdown() {
    this.totalSeconds = cacheService.getRefreshInterval();
    this.remainingSeconds = this.totalSeconds;
    this.nextRefreshTime = Date.now() + this.totalSeconds * 1000;
  }

  updateLastSyncTime(date = new Date()) {
    const el = document.getElementById('last-sync-time');
    if (el) {
      const timeStr = date.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      el.textContent = `Synced: ${timeStr}`;
    }
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('header-bookmark-badge');
    const count = cacheService.getBookmarks().length;
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  updateUserAuthState(user) {
    const headerContainer = document.getElementById('header-auth-container');
    const topbarPill = document.getElementById('topbar-auth-pill');
    const publishBtn = document.getElementById('btn-open-publish-modal');

    const isAdmin = user && (user.role === 'admin' || (user.email && user.email.toLowerCase() === 'dhananjaysaini2006@gmail.com'));

    // RESTRICTED: Admin can see 'Write Story', regular users and guests CANNOT see it.
    if (publishBtn) {
      publishBtn.style.display = isAdmin ? 'inline-flex' : 'none';
    }

    if (!user) {
      // --- LOGGED OUT STATE ---
      if (topbarPill) {
        topbarPill.innerHTML = `
          <div style="display: inline-flex; align-items: center; gap: 4px; font-size: 0.775rem; font-family: var(--font-sans);">
            <button id="btn-topbar-signin" class="btn-text-auth" style="background: none; border: none; padding: 0; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.775rem;">Sign in</button>
            <span style="color: var(--text-muted); font-size: 0.7rem;">/</span>
            <button id="btn-topbar-signup" class="btn-text-auth" style="background: none; border: none; padding: 0; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.775rem;">Sign up</button>
          </div>
        `;
        const btnTopIn = topbarPill.querySelector('#btn-topbar-signin');
        if (btnTopIn) {
          btnTopIn.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.onAuthClickCallback) this.onAuthClickCallback('signin');
          });
        }
        const btnTopUp = topbarPill.querySelector('#btn-topbar-signup');
        if (btnTopUp) {
          btnTopUp.addEventListener('click', (e) => {
            e.preventDefault();
            if (this.onAuthClickCallback) this.onAuthClickCallback('signup');
          });
        }
      }

      if (headerContainer) {
        headerContainer.innerHTML = `
          <div class="auth-minimal-links" style="display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-sans); font-size: 0.8rem; font-weight: 700;">
            <button id="btn-header-signin" class="btn-text-auth" style="background: none; border: none; padding: 2px 4px; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.8rem; transition: color 0.15s ease;">
              Sign in
            </button>
            <span style="color: var(--text-muted); font-weight: 400; font-size: 0.75rem;">/</span>
            <button id="btn-header-signup" class="btn-text-auth" style="background: none; border: none; padding: 2px 4px; color: var(--text-primary); cursor: pointer; font-weight: 700; font-size: 0.8rem; transition: color 0.15s ease;">
              Sign up
            </button>
          </div>
        `;
        const btnIn = headerContainer.querySelector('#btn-header-signin');
        if (btnIn) {
          btnIn.addEventListener('click', () => {
            if (this.onAuthClickCallback) this.onAuthClickCallback('signin');
          });
        }
        const btnUp = headerContainer.querySelector('#btn-header-signup');
        if (btnUp) {
          btnUp.addEventListener('click', () => {
            if (this.onAuthClickCallback) this.onAuthClickCallback('signup');
          });
        }
      }
    } else {
      // --- LOGGED IN STATE ---
      if (topbarPill) {
        topbarPill.innerHTML = `
          <span style="color: var(--text-primary); font-weight: 800; font-size: 0.775rem; display: inline-flex; align-items: center; gap: 4px;">
            ${isAdmin ? '👑 Dhananjay' : `👤 ${(user.displayName || user.email).split(' ')[0]}`}
          </span>
        `;
      }

      if (headerContainer) {
        headerContainer.innerHTML = `
          ${isAdmin ? `
            <button id="btn-header-admin-panel" class="btn-premium-admin" title="Open Executive Admin Suite">
              <span class="admin-pulse-dot"></span>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Admin Suite</span>
            </button>
          ` : ''}

          <div class="user-auth-capsule">
            <div class="user-avatar-badge ${isAdmin ? 'admin-glow' : ''}">
              ${isAdmin ? '👑' : '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
            </div>
            <div class="user-info-col">
              <div class="user-name-line">${user.displayName || user.email.split('@')[0]}</div>
              <div class="user-role-badge ${isAdmin ? 'role-admin' : 'role-reader'}">${isAdmin ? 'SUPER ADMIN' : 'READER'}</div>
            </div>
            <button id="btn-header-signout" class="btn-premium-signout" title="Sign Out from Newsroom">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        `;

        const adminBtn = headerContainer.querySelector('#btn-header-admin-panel');
        if (adminBtn) {
          adminBtn.addEventListener('click', () => {
            if (this.onAdminClickCallback) this.onAdminClickCallback();
          });
        }

        const signOutBtn = headerContainer.querySelector('#btn-header-signout');
        if (signOutBtn) {
          signOutBtn.addEventListener('click', async () => {
            const { firebaseService } = await import('../services/firebaseService.js');
            await firebaseService.signOut();
          });
        }
      }
    }

    // --- Mobile Drawer Auth State Synchronization ---
    const drawerAuth = document.getElementById('mobile-drawer-auth');
    if (drawerAuth) {
      if (!user) {
        drawerAuth.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <button id="btn-drawer-signin" class="btn-drawer-auth-primary">Sign In to Newsroom</button>
            <button id="btn-drawer-signup" class="btn-drawer-auth-secondary">Create Free Account</button>
          </div>
        `;
        drawerAuth.querySelector('#btn-drawer-signin')?.addEventListener('click', () => {
          document.getElementById('mobile-nav-drawer')?.classList.remove('open');
          const ov = document.getElementById('mobile-drawer-overlay');
          if (ov) ov.style.display = 'none';
          document.body.style.overflow = '';
          if (this.onAuthClickCallback) this.onAuthClickCallback('signin');
        });
        drawerAuth.querySelector('#btn-drawer-signup')?.addEventListener('click', () => {
          document.getElementById('mobile-nav-drawer')?.classList.remove('open');
          const ov = document.getElementById('mobile-drawer-overlay');
          if (ov) ov.style.display = 'none';
          document.body.style.overflow = '';
          if (this.onAuthClickCallback) this.onAuthClickCallback('signup');
        });
      } else {
        drawerAuth.innerHTML = `
          <div style="display: flex; flex-direction: column; gap: 10px; width: 100%;">
            <div style="display: flex; align-items: center; gap: 10px;">
              <div class="user-avatar-badge ${isAdmin ? 'admin-glow' : ''}">
                ${isAdmin ? '👑' : '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>'}
              </div>
              <div>
                <div style="font-weight: 700; color: var(--text-primary); font-size: 0.9rem;">${user.displayName || user.email.split('@')[0]}</div>
                <div class="user-role-badge ${isAdmin ? 'role-admin' : 'role-reader'}" style="display: inline-block;">${isAdmin ? 'SUPER ADMIN' : 'READER'}</div>
              </div>
            </div>
            ${isAdmin ? `
              <button id="btn-drawer-write" class="btn-drawer-admin-action">✍️ Write &amp; Publish Story</button>
              <button id="btn-drawer-admin" class="btn-drawer-admin-action">🛡️ Executive Admin Suite</button>
            ` : ''}
            <button id="btn-drawer-signout" class="btn-drawer-signout">Sign Out</button>
          </div>
        `;
        if (isAdmin) {
          drawerAuth.querySelector('#btn-drawer-write')?.addEventListener('click', () => {
            document.getElementById('mobile-nav-drawer')?.classList.remove('open');
            const ov = document.getElementById('mobile-drawer-overlay');
            if (ov) ov.style.display = 'none';
            document.body.style.overflow = '';
            if (this.onPublishClickCallback) this.onPublishClickCallback();
          });
          drawerAuth.querySelector('#btn-drawer-admin')?.addEventListener('click', () => {
            document.getElementById('mobile-nav-drawer')?.classList.remove('open');
            const ov = document.getElementById('mobile-drawer-overlay');
            if (ov) ov.style.display = 'none';
            document.body.style.overflow = '';
            if (this.onAdminClickCallback) this.onAdminClickCallback();
          });
        }
        drawerAuth.querySelector('#btn-drawer-signout')?.addEventListener('click', async () => {
          document.getElementById('mobile-nav-drawer')?.classList.remove('open');
          const ov = document.getElementById('mobile-drawer-overlay');
          if (ov) ov.style.display = 'none';
          document.body.style.overflow = '';
          const { firebaseService } = await import('../services/firebaseService.js');
          await firebaseService.signOut();
        });
      }
    }
  }

  attachEventListeners() {
    // Refresh button
    const btnRefresh = document.getElementById('btn-header-refresh');
    if (btnRefresh) {
      btnRefresh.addEventListener('click', () => {
        btnRefresh.classList.add('spinning');
        this.resetCountdown();
        if (this.onRefreshCallback) {
          this.onRefreshCallback(false).finally(() => {
            setTimeout(() => btnRefresh.classList.remove('spinning'), 600);
          });
        }
      });
    }

    // Interval selector
    const intervalSelect = document.getElementById('select-refresh-interval');
    if (intervalSelect) {
      intervalSelect.value = cacheService.getRefreshInterval().toString();
      intervalSelect.addEventListener('change', (e) => {
        const newInterval = parseInt(e.target.value, 10);
        cacheService.setRefreshInterval(newInterval);
        this.startCountdown();
        if (this.onIntervalChangeCallback) this.onIntervalChangeCallback(newInterval);
      });
    }

    // Desktop search input
    const searchInput = document.getElementById('global-search-input');
    const mobileSearchInput = document.getElementById('mobile-search-input');
    const mobileSearchClear = document.getElementById('mobile-search-clear');

    if (searchInput) {
      let debounceTimer = null;
      searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (mobileSearchInput && mobileSearchInput.value !== val) {
          mobileSearchInput.value = val;
          if (mobileSearchClear) mobileSearchClear.style.display = val ? 'inline-flex' : 'none';
        }
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
          if (this.onSearchCallback) this.onSearchCallback(val.trim());
        }, 250);
      });

      // Keyboard shortcut '/'
      window.addEventListener('keydown', (e) => {
        if (e.key === '/' && document.activeElement !== searchInput && document.activeElement !== mobileSearchInput) {
          e.preventDefault();
          if (window.innerWidth <= 900 && mobileSearchInput) {
            mobileSearchInput.focus();
          } else {
            searchInput.focus();
          }
        }
      });
    }

    // Mobile full-width search input
    if (mobileSearchInput) {
      let mobileDebounce = null;
      mobileSearchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        if (mobileSearchClear) {
          mobileSearchClear.style.display = val.length > 0 ? 'inline-flex' : 'none';
        }
        if (searchInput && searchInput.value !== val) {
          searchInput.value = val;
        }
        clearTimeout(mobileDebounce);
        mobileDebounce = setTimeout(() => {
          if (this.onSearchCallback) this.onSearchCallback(val.trim());
        }, 250);
      });

      if (mobileSearchClear) {
        mobileSearchClear.addEventListener('click', () => {
          mobileSearchInput.value = '';
          mobileSearchClear.style.display = 'none';
          if (searchInput) searchInput.value = '';
          if (this.onSearchCallback) this.onSearchCallback('');
        });
      }
    }

    // Brand click returns to home
    const brandHome = document.getElementById('btn-brand-home');
    if (brandHome) {
      brandHome.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        if (mobileSearchInput) mobileSearchInput.value = '';
        if (mobileSearchClear) mobileSearchClear.style.display = 'none';
        if (this.onSearchCallback) this.onSearchCallback('');
        const allTab = document.querySelector('.cat-tab[data-category="all"]');
        if (allTab) allTab.click();
      });
    }

    // Write & Publish Story button
    const publishBtn = document.getElementById('btn-open-publish-modal');
    if (publishBtn) {
      publishBtn.addEventListener('click', () => {
        if (this.onPublishClickCallback) this.onPublishClickCallback();
      });
    }

    // Theme toggle
    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        if (this.onThemeToggleCallback) this.onThemeToggleCallback();
      });
    }
  }
}
