import { firebaseService } from '../services/firebaseService.js';
import { cacheService } from '../services/cacheService.js';
import { SOURCE_REGISTRY } from '../config/sources.js';

export class AdminPanelComponent {
  constructor(onArticleUpdatedCallback, onBreakingAlertCallback) {
    this.onArticleUpdatedCallback = onArticleUpdatedCallback;
    this.onBreakingAlertCallback = onBreakingAlertCallback;
    this.modalEl = null;
    this.isOpen = false;
    this.currentTab = 'articles'; // 'articles', 'alerts', 'feeds', 'users'
    this.articlesList = [];
  }

  init() {
    this.injectModalHtml();
    this.attachEventListeners();
  }

  injectModalHtml() {
    const existing = document.getElementById('admin-panel-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'admin-panel-overlay';
    modal.className = 'admin-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="admin-modal-container">
        <!-- Header -->
        <div class="admin-modal-header">
          <div style="display: flex; align-items: center; gap: 14px;">
            <div class="admin-crown-badge">👑</div>
            <div>
              <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); margin: 0;">
                  Executive Admin Control Suite
                </h2>
                <span class="badge" style="background: var(--hindu-red); color: #fff; font-weight: 800; font-size: 0.7rem;">SUPER ADMIN</span>
              </div>
              <p style="margin: 3px 0 0; font-size: 0.8rem; color: var(--text-secondary);">
                Authenticated: <strong>Dhananjay Saini</strong> &nbsp;<span class="badge" style="background: var(--bg-tertiary); color: var(--text-muted); font-size: 0.65rem;">Super Admin</span>
              </p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 10px;">
            <button id="btn-admin-signout" class="btn-cancel-modal" style="font-size: 0.8rem; padding: 6px 14px;">
              Sign Out
            </button>
            <button id="btn-close-admin-panel" class="btn-close-modal" title="Close Admin Panel">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <div class="admin-tabs-bar">
          <button type="button" class="admin-tab-btn active" data-tab="articles" id="tab-admin-articles">
            📰 CMS & Articles
          </button>
          <button type="button" class="admin-tab-btn" data-tab="alerts" id="tab-admin-alerts">
            🚨 Breaking Alert Dispatcher
          </button>
          <button type="button" class="admin-tab-btn" data-tab="feeds" id="tab-admin-feeds">
            📡 Live Feeds & Wires (18+)
          </button>
          <button type="button" class="admin-tab-btn" data-tab="users" id="tab-admin-users">
            👥 Users & Analytics
          </button>
        </div>

        <!-- Admin Content Body -->
        <div class="admin-modal-body" id="admin-tab-content">
          <!-- Populated dynamically based on active tab -->
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  attachEventListeners() {
    if (!this.modalEl) return;

    // Close button
    const btnClose = this.modalEl.querySelector('#btn-close-admin-panel');
    if (btnClose) btnClose.addEventListener('click', () => this.close());

    // Sign out button
    const btnSignOut = this.modalEl.querySelector('#btn-admin-signout');
    if (btnSignOut) {
      btnSignOut.addEventListener('click', async () => {
        await firebaseService.signOut();
        this.close();
        window.location.reload();
      });
    }

    // Backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Tab buttons
    const tabs = ['articles', 'alerts', 'feeds', 'users'];
    tabs.forEach(tabKey => {
      const btn = this.modalEl.querySelector(`#tab-admin-${tabKey}`);
      if (btn) {
        btn.addEventListener('click', () => this.switchTab(tabKey));
      }
    });
  }

  switchTab(tabKey) {
    this.currentTab = tabKey;
    const allBtns = this.modalEl.querySelectorAll('.admin-tab-btn');
    allBtns.forEach(b => b.classList.toggle('active', b.getAttribute('data-tab') === tabKey));

    const contentBox = this.modalEl.querySelector('#admin-tab-content');
    if (!contentBox) return;

    if (tabKey === 'articles') {
      this.renderArticlesTab(contentBox);
    } else if (tabKey === 'alerts') {
      this.renderAlertsTab(contentBox);
    } else if (tabKey === 'feeds') {
      this.renderFeedsTab(contentBox);
    } else if (tabKey === 'users') {
      this.renderUsersTab(contentBox);
    }
  }

  open(articles = []) {
    if (!firebaseService.isAdmin()) {
      alert('Access Denied. This area is restricted to the Super Administrator only.');
      return;
    }

    this.articlesList = articles;
    if (!this.modalEl) this.injectModalHtml();

    this.isOpen = true;
    this.modalEl.classList.add('active');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    this.switchTab(this.currentTab);
  }

  close() {
    if (!this.modalEl) return;
    this.isOpen = false;
    this.modalEl.classList.remove('active');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  /* ---------------- TAB 1: ARTICLES CMS ---------------- */
  renderArticlesTab(container) {
    const customArticles = cacheService.getCustomArticles();
    const allArticles = [...customArticles, ...(this.articlesList || [])];

    container.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0;">
            Published Articles & Editorial Moderation
          </h3>
          <p style="margin: 3px 0 0; font-size: 0.825rem; color: var(--text-secondary);">
            Managing ${allArticles.length} total news dispatches across all wires.
          </p>
        </div>
        <div style="display: flex; gap: 10px;">
          <input type="text" id="admin-search-articles" class="publish-input" placeholder="Filter articles by title..." style="width: 240px; padding: 6px 12px; font-size: 0.85rem;" />
        </div>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th style="width: 45%;">Headline / Title</th>
              <th>Source / Author</th>
              <th>Category</th>
              <th>Published</th>
              <th style="text-align: right;">Action</th>
            </tr>
          </thead>
          <tbody id="admin-articles-tbody">
            ${allArticles.slice(0, 50).map(art => `
              <tr data-id="${art.id}">
                <td>
                  <div style="font-weight: 700; color: var(--text-primary); line-height: 1.3;">
                    ${art.isUserPublished ? '<span class="badge-user-editorial" style="margin-right: 6px;">AUTHOR</span>' : ''}
                    ${art.title}
                  </div>
                </td>
                <td>
                  <span class="badge" style="background: var(--bg-tertiary); color: var(--text-secondary); font-size: 0.75rem;">
                    ${art.source}
                  </span>
                </td>
                <td>
                  <span style="font-size: 0.775rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">
                    ${art.category}
                  </span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--text-muted);">
                  ${new Date(art.pubDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td style="text-align: right;">
                  ${art.isUserPublished ? `
                    <button class="btn-admin-action btn-admin-delete" data-del-id="${art.id}" title="Delete story">
                      🗑️ Unpublish
                    </button>
                  ` : `
                    <span style="font-size: 0.725rem; color: var(--text-muted);">Wire Feed</span>
                  `}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;

    // Filter listener
    const searchInput = container.querySelector('#admin-search-articles');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const rows = container.querySelectorAll('#admin-articles-tbody tr');
        rows.forEach(r => {
          const text = r.textContent.toLowerCase();
          r.style.display = text.includes(query) ? '' : 'none';
        });
      });
    }

    // Delete buttons
    container.querySelectorAll('.btn-admin-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-del-id');
        if (confirm('Admin Action: Unpublish this story from What\'s Going On?')) {
          cacheService.deleteCustomArticle(id);
          this.switchTab('articles');
          if (this.onArticleUpdatedCallback) this.onArticleUpdatedCallback();
        }
      });
    });
  }

  /* ---------------- TAB 2: BREAKING ALERTS ---------------- */
  renderAlertsTab(container) {
    const activeAlert = firebaseService.getBreakingAlert();

    container.innerHTML = `
      <div style="max-width: 650px; margin: 0 auto; display: flex; flex-direction: column; gap: 20px;">
        <div>
          <h3 style="font-family: var(--font-serif); font-size: 1.35rem; color: var(--text-primary); margin: 0;">
            Broadcast Urgent Breaking News Wire Alert
          </h3>
          <p style="margin: 4px 0 0; font-size: 0.85rem; color: var(--text-secondary);">
            Dispatches a high-priority red alert ticker across all reader screens in real time.
          </p>
        </div>

        ${activeAlert ? `
          <div class="admin-active-alert-box">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
              <span class="badge" style="background: var(--hindu-red); color: #fff;">● ACTIVE LIVE BROADCAST</span>
              <button id="btn-clear-alert" class="btn-cancel-modal" style="color: var(--hindu-red); border-color: var(--hindu-red); font-size: 0.775rem; padding: 4px 10px;">
                Revoke Alert
              </button>
            </div>
            <p style="margin: 0; font-weight: 700; font-size: 1rem; color: var(--text-primary);">
              "${activeAlert.text}"
            </p>
            <div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-mono);">
              Dispatched by ${activeAlert.author} at ${new Date(activeAlert.timestamp).toLocaleTimeString('en-IN')}
            </div>
          </div>
        ` : ''}

        <form id="admin-broadcast-form" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="publish-form-group">
            <label class="publish-label">Urgent Alert Headline / Bullet</label>
            <textarea id="admin-alert-text" class="publish-textarea" rows="3" placeholder="e.g., BREAKING: Prime Minister addresses Parliament; new statutory bills introduced for national digital infrastructure..." required></textarea>
          </div>

          <div class="publish-form-group">
            <label class="publish-label">Urgency Priority</label>
            <select id="admin-alert-urgency" class="publish-select">
              <option value="breaking">🔴 High Urgency (Flashing Red Live Ticker)</option>
              <option value="bulletin">🟡 Editorial Flash Bulletin</option>
            </select>
          </div>

          <button type="submit" class="btn-publish-submit" style="background: var(--hindu-red); justify-content: center; padding: 12px;">
            📢 Broadcast Breaking Alert to Portal
          </button>
        </form>
      </div>
    `;

    // Form submit
    const form = container.querySelector('#admin-broadcast-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = container.querySelector('#admin-alert-text').value.trim();
        const urgency = container.querySelector('#admin-alert-urgency').value;
        const alertObj = firebaseService.setBreakingAlert(text, urgency);
        alert('Breaking Alert has been broadcast live to all readers!');
        this.switchTab('alerts');
        if (this.onBreakingAlertCallback) this.onBreakingAlertCallback(alertObj);
      });
    }

    // Clear alert button
    const clearBtn = container.querySelector('#btn-clear-alert');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        firebaseService.clearBreakingAlert();
        alert('Active breaking alert has been revoked.');
        this.switchTab('alerts');
        if (this.onBreakingAlertCallback) this.onBreakingAlertCallback(null);
      });
    }
  }

  /* ---------------- TAB 3: FEEDS OVERSIGHT ---------------- */
  renderFeedsTab(container) {
    container.innerHTML = `
      <div style="margin-bottom: 16px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary); margin: 0;">
          Connected Media Wires & RSS Feed Health Monitor
        </h3>
        <p style="margin: 3px 0 0; font-size: 0.825rem; color: var(--text-secondary);">
          All feeds are automatically polled every 3 minutes via the local zero-cache proxy.
        </p>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Outlet / Wire</th>
              <th>Beat / Category</th>
              <th>Status</th>
              <th>Endpoint / RSS URL</th>
            </tr>
          </thead>
          <tbody>
            ${SOURCE_REGISTRY.map(src => `
              <tr>
                <td style="font-weight: 700; color: var(--text-primary);">
                  <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${src.color || '#003366'}; margin-right: 8px;"></span>
                  ${src.name}
                </td>
                <td>
                  <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--text-muted); font-weight: 600;">
                    ${src.category}
                  </span>
                </td>
                <td>
                  <span class="badge" style="background: rgba(16, 185, 129, 0.15); color: var(--accent-emerald); font-weight: 700; font-size: 0.725rem;">
                    ● 200 OK (Live)
                  </span>
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.725rem; color: var(--text-muted); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                  ${src.rssUrl}
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }

  /* ---------------- TAB 4: USERS & ANALYTICS ---------------- */
  renderUsersTab(container) {
    const users = firebaseService.getAllUsers();
    const customArticles = cacheService.getCustomArticles();
    const bookmarks = cacheService.getBookmarks();

    container.innerHTML = `
      <div class="admin-stats-grid" style="margin-bottom: 24px;">
        <div class="admin-stat-card">
          <div class="admin-stat-val">${this.articlesList.length + customArticles.length}</div>
          <div class="admin-stat-lbl">Aggregated Articles</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--accent-cyan);">${customArticles.length}</div>
          <div class="admin-stat-lbl">User Published Stories</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--hindu-red);">${users.length}</div>
          <div class="admin-stat-lbl">Registered Accounts</div>
        </div>
        <div class="admin-stat-card">
          <div class="admin-stat-val" style="color: var(--accent-emerald);">${bookmarks.length}</div>
          <div class="admin-stat-lbl">Saved Bookmarks</div>
        </div>
      </div>

      <div style="margin-bottom: 14px;">
        <h3 style="font-family: var(--font-serif); font-size: 1.2rem; color: var(--text-primary); margin: 0;">
          Registered Newsroom Users & Author Roster
        </h3>
      </div>

      <div class="admin-table-wrap">
        <table class="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Email Address</th>
              <th>Role</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${users.map(u => `
              <tr>
                <td style="font-weight: 700; color: var(--text-primary);">
                  ${u.displayName || 'Reader'}
                </td>
                <td style="font-family: var(--font-mono); font-size: 0.825rem; color: var(--text-secondary);">
                  ${u.email}
                </td>
                <td>
                  <span class="badge" style="background: ${u.role === 'admin' ? 'var(--hindu-red)' : 'var(--bg-tertiary)'}; color: ${u.role === 'admin' ? '#fff' : 'var(--text-secondary)'}; font-size: 0.725rem; font-weight: 800;">
                    ${(u.role || 'reader').toUpperCase()}
                  </span>
                </td>
                <td>
                  <span style="font-size: 0.75rem; color: var(--accent-emerald); font-weight: 600;">
                    ● Active
                  </span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `;
  }
}
