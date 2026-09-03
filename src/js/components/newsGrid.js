import { cacheService } from '../services/cacheService.js';
import { speechService } from '../services/speechService.js';
import { CATEGORIES } from '../config/sources.js';

export class NewsGridComponent {
  constructor(onArticleClickCallback, onBookmarkToggleCallback) {
    this.onArticleClickCallback = onArticleClickCallback;
    this.onBookmarkToggleCallback = onBookmarkToggleCallback;
    this.viewMode = cacheService.getViewMode(); // 'grid' or 'compact'
  }

  setViewMode(mode) {
    this.viewMode = mode;
    cacheService.setViewMode(mode);
  }

  formatTimeAgo(dateStr) {
    try {
      const date = new Date(dateStr);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / (1000 * 60));
      
      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      const diffDays = Math.floor(diffHours / 24);
      return `${diffDays}d ago`;
    } catch (e) {
      return 'Recently';
    }
  }

  render(articles, options = {}) {
    const feedContainer = document.getElementById('main-news-feed');
    if (!feedContainer) return;

    const { category = 'all', searchQuery = '', sourceFilter = 'all' } = options;

    if (!articles || articles.length === 0) {
      const isBookmarks = options.category === 'saved';
      feedContainer.innerHTML = isBookmarks
        ? `<div class="empty-state-premium">
            <div class="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </div>
            <h3>Your reading list is empty</h3>
            <p>Tap the <strong>bookmark icon</strong> on any article or story card to save it here for later reading.</p>
            <button class="empty-state-cta" onclick="document.querySelector('.cat-tab[data-category=all]')?.click()">
              Browse All News &rarr;
            </button>
          </div>`
        : `<div class="empty-state-premium">
            <div class="empty-state-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <h3>No articles found</h3>
            <p>Try adjusting your search query or selecting a different news wire filter.</p>
            <button class="empty-state-cta" onclick="document.querySelector('.cat-tab[data-category=all]')?.click()">
              Back to Front Page &rarr;
            </button>
          </div>`;
      return;
    }

    // =========================================================================
    // HOMEPAGE SPECIALIZED VIEW (FOCUS ON ALL NEWS)
    // =========================================================================
    if (category === CATEGORIES.ALL && !searchQuery && sourceFilter === 'all') {
      this.renderHomeAllNews(articles, feedContainer);
      return;
    }

    // =========================================================================
    // STANDARD CATEGORY / FILTERED VIEW
    // =========================================================================
    const isHeroVisible = (!searchQuery && articles.length > 0);
    const heroArticle = isHeroVisible ? articles[0] : null;
    const gridArticles = isHeroVisible ? articles.slice(1) : articles;

    const heroHtml = heroArticle ? this.buildHeroCardHtml(heroArticle) : '';
    const gridHtml = this.buildArticlesGridHtml(gridArticles);
    const marketDashboardHtml = (category === CATEGORIES.BUSINESS && !searchQuery) ? this.buildMarketIndicesDashboardHtml() : '';

    let sectionTitle = 'Latest Stories';
    if (searchQuery) sectionTitle = `Search Results: "${searchQuery}"`;
    else if (category === CATEGORIES.INDIA_POLITICS) sectionTitle = '🏛️ Indian Politics & National Governance';
    else if (category === CATEGORIES.INDIA) sectionTitle = '🇮🇳 Indian Media Wires';
    else if (category === CATEGORIES.WORLD) sectionTitle = '🌍 Global News Wires & International';
    else if (category === CATEGORIES.BUSINESS) sectionTitle = '📊 Global & Indian Business Wire';
    else if (category === CATEGORIES.GOOGLE_NEWS) sectionTitle = '🌐 Google News Live Wire';
    else if (category === CATEGORIES.SAVED) sectionTitle = '🔖 Saved Bookmarks';
    else sectionTitle = `${category.toUpperCase()} Wire`;

    feedContainer.innerHTML = `
      ${marketDashboardHtml}
      <div class="section-heading-wrap">
        <h2 class="section-title">
          <span>${sectionTitle}</span>
          <span class="section-count">${articles.length} Stories</span>
        </h2>
      </div>
      ${heroHtml}
      ${gridHtml}
    `;

    this.attachCardEventListeners(articles);
  }

  buildMarketIndicesDashboardHtml() {
    const indices = [
      { name: 'BSE SENSEX', country: '🇮🇳 India (BSE)', val: '81,450.20', change: '+0.42% (+340.50 pts)', isUp: true },
      { name: 'NSE NIFTY 50', country: '🇮🇳 India (NSE)', val: '24,870.50', change: '+0.38% (+95.10 pts)', isUp: true },
      { name: 'NIFTY BANK', country: '🇮🇳 India Banking', val: '51,280.15', change: '+0.55% (+280.20 pts)', isUp: true },
      { name: 'NASDAQ 100', country: '🇺🇸 US Tech', val: '19,740.10', change: '+0.64% (+125.80 pts)', isUp: true },
      { name: 'S&P 500', country: '🇺🇸 US Large Cap', val: '5,640.20', change: '+0.32% (+18.10 pts)', isUp: true },
      { name: 'DOW JONES', country: '🇺🇸 US Industrial', val: '41,210.00', change: '-0.12% (-50.40 pts)', isUp: false },
      { name: 'FTSE 100', country: '🇬🇧 London UK', val: '8,360.50', change: '+0.22% (+18.40 pts)', isUp: true },
      { name: 'NIKKEI 225', country: '🇯🇵 Tokyo Japan', val: '38,720.00', change: '+0.75% (+290.00 pts)', isUp: true },
      { name: 'USD / INR', country: '💱 Foreign Exchange', val: '₹83.85', change: '-0.05% Rupee Firm', isUp: true },
      { name: 'BRENT CRUDE', country: '🛢️ Global Energy', val: '$78.20 / bbl', change: '-0.85% (-$0.67)', isUp: false },
      { name: 'GOLD 24K', country: '🪙 Bullion (10g INR)', val: '₹72,450', change: '+0.30% (+₹220)', isUp: true },
      { name: 'BITCOIN', country: '⚡ Digital Asset (USD)', val: '$64,820', change: '+1.85% (+$1,180)', isUp: true }
    ];

    return `
      <div class="market-dashboard-banner animate-fade-in">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; margin-bottom: 20px;">
          <div>
            <div style="font-size: 0.775rem; text-transform: uppercase; font-weight: 700; letter-spacing: 0.08em; color: var(--accent-cyan); margin-bottom: 4px;">
              Financial Intelligence Terminal
            </div>
            <h2 style="font-family: var(--font-serif); font-size: 1.6rem; color: var(--text-primary); margin: 0;">
              Global & Indian Market Indices
            </h2>
          </div>
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-category">INDICATIVE DATA</span>
            <span class="badge badge-category">SENTIMENT: BULLISH (+0.45%)</span>
          </div>
        </div>

        <div class="market-dashboard-grid">
          ${indices.map(idx => `
            <div class="market-index-card">
              <div class="market-index-top">
                <span class="market-index-name">${idx.name}</span>
                <span class="market-index-country">${idx.country}</span>
              </div>
              <div class="market-index-val">${idx.val}</div>
              <div class="market-index-change ${idx.isUp ? 'market-change-up' : 'market-change-down'}">
                ${idx.isUp ? '▲' : '▼'} ${idx.change}
              </div>
            </div>
          `).join('')}
        </div>
        <div class="market-indicative-note">* Data shown is indicative / illustrative only. Not financial advice.</div>
      </div>
    `;
  }

  /**
   * Home Page view with comprehensive focus on ALL NEWS (National, Global, Tech, Economy, Science)
   */
  renderHomeAllNews(articles, feedContainer) {
    const leadArticle = articles[0]; // #1 Top breaking story across all beats
    const wireArticles = articles.slice(1, 5); // 4 breaking wire stories across all beats
    
    // Group articles for broadsheet sections
    const nationalArticles = articles.filter(a => a.region === 'india' || a.category === CATEGORIES.INDIA || a.category === CATEGORIES.INDIA_POLITICS);
    const globalArticles = articles.filter(a => a.region === 'global' || a.category === CATEGORIES.WORLD || a.category === CATEGORIES.GOOGLE_NEWS);
    const economyArticles = articles.filter(a => a.category === CATEGORIES.BUSINESS);
    const techArticles = articles.filter(a => a.category === CATEGORIES.TECH || a.category === CATEGORIES.SCIENCE);

    // Front page curated mix (diverse top stories across beats)
    const frontPageMix = articles.slice(5, 13);

    const datelinePrefix = leadArticle.region === 'india' ? 'NEW DELHI —' : (leadArticle.region === 'global' ? 'GLOBAL WIRE —' : 'DISPATCH —');

    feedContainer.innerHTML = `
      <!-- THE HINDU SIGNATURE 3-COLUMN BROADSHEET TOP FOLD (ALL NEWS FOCUS) -->
      <section class="hindu-top-fold animate-fade-in" id="hindu-top">
        <!-- Column 1: Main Lead Story (Left) -->
        <div class="hindu-lead-col" data-id="${leadArticle.id}">
          <div class="hindu-lead-image-wrap">
            <img src="${leadArticle.image}" alt="${leadArticle.title}" class="hindu-lead-img" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80'" />
            <div class="hindu-lead-badges">
              <span class="badge badge-live">● TOP LEAD STORY</span>
              <span class="badge badge-source">${leadArticle.source}</span>
            </div>
          </div>
          
          <div class="hindu-lead-tag">
            <span>${(leadArticle.category || 'ALL NEWS').toUpperCase()}</span>
            <span style="color: var(--text-muted); font-weight: 500;">• ${this.formatTimeAgo(leadArticle.pubDate)}</span>
          </div>

          <h1 class="hindu-lead-title" data-action="open-article">${leadArticle.title}</h1>

          <p class="hindu-dateline-snippet">
            <span class="hindu-dateline">${datelinePrefix}</span>
            ${leadArticle.snippet}
          </p>

          ${leadArticle.keyPoints && leadArticle.keyPoints.length > 0 ? `
            <div class="modal-key-points" style="margin: 4px 0 12px; padding: 14px 18px;">
              <h4 style="font-size: 0.8rem; margin-bottom: 8px; color: var(--text-primary); text-transform: uppercase; letter-spacing: 0.05em;">
                ⭐ Core Intelligence Takeaways:
              </h4>
              <ul style="margin: 0; padding-left: 18px; font-size: 0.9rem; color: var(--text-secondary); line-height: 1.55;">
                ${leadArticle.keyPoints.slice(0, 2).map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <div class="hindu-lead-footer">
            <button class="audio-player-pill" data-action="speak-article" title="Listen Audio">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen</span>
              <div class="audio-waveform">
                <div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div>
              </div>
            </button>

            <div style="display: flex; gap: 8px;">
              <button class="btn-card-action ${cacheService.isBookmarked(leadArticle.id, leadArticle.link) ? 'bookmarked' : ''}" data-action="bookmark" title="Bookmark">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${cacheService.isBookmarked(leadArticle.id, leadArticle.link) ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Column 2: Top Stories Right Now (Middle Wire Across All Beats) -->
        <div class="hindu-wire-col">
          <div class="hindu-col-header">
            <h3>Top Stories Right Now</h3>
            <span class="badge badge-live" style="font-size: 0.65rem; padding: 2px 6px;">ALL BEATS</span>
          </div>

          ${wireArticles.map(art => `
            <article class="hindu-wire-item" data-id="${art.id}">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span class="hindu-wire-tag">${(art.category || 'GENERAL').toUpperCase()}</span>
                <span style="font-size: 0.725rem; color: var(--text-muted); font-family: var(--font-mono);">${this.formatTimeAgo(art.pubDate)}</span>
              </div>
              <h4 class="hindu-wire-headline" data-action="open-article">${art.title}</h4>
              <div class="hindu-wire-meta">
                <span style="font-weight: 700; color: var(--accent-cyan);">${art.source}</span>
                <span style="color: var(--text-muted);">•</span>
                <span style="color: var(--text-muted);">${art.readTime || '2 min read'}</span>
              </div>
            </article>
          `).join('')}
        </div>

        <!-- Column 3: The Editorial Desk & In-Depth Analysis (Right) -->
        <div class="hindu-editorial-col">
          <div class="hindu-col-header">
            <h3>Editorial & Perspectives</h3>
            <span style="font-size: 0.75rem; color: var(--text-muted); font-family: var(--font-serif); font-style: italic;">The Hindu Broadsheet</span>
          </div>

          <div class="hindu-editorial-box">
            <span class="hindu-editorial-badge">THE EDITORIAL</span>
            <article class="hindu-op-card" data-action="open-article" data-id="${leadArticle.id}">
              <h4 class="hindu-op-title">"Global Trade Alignments & The New Multilateral Order"</h4>
              <span class="hindu-op-byline">By The Editorial Board • Broadsheet Special</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-top: 6px;">
                Examining shifting supply corridors, sovereign manufacturing policies, and geopolitical trade dialogues across emerging economies.
              </p>
            </article>

            <article class="hindu-op-card" style="margin-top: 6px;">
              <h4 class="hindu-op-title">"Technological Sovereignty: AI Governance, Fabs & Strategic Growth"</h4>
              <span class="hindu-op-byline">By Science & Technology Editor</span>
              <p style="font-size: 0.875rem; color: var(--text-secondary); line-height: 1.55; margin-top: 6px;">
                How deep tech investments and digital infrastructure are transforming public governance and industrial competitiveness.
              </p>
            </article>
          </div>
        </div>
      </section>

      <!-- SECTION 1: ALL NEWS FRONT PAGE WIRE -->
      <section class="hindu-section-band">
        <div class="hindu-section-bar">
          <h2 class="hindu-section-title">
            <span>Front Page All-News Wire</span>
          </h2>
          <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${articles.length} Stories</span>
        </div>
        ${this.buildArticlesGridHtml(frontPageMix)}
      </section>

      <!-- SECTION 2: INDIA & NATIONAL NEWS WIRE -->
      ${nationalArticles.length > 0 ? `
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🇮🇳 India & National Governance Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${nationalArticles.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(nationalArticles.slice(0, 4))}
        </section>
      ` : ''}

      <!-- SECTION 3: WORLD & GLOBAL DIPLOMATIC WIRES -->
      ${globalArticles.length > 0 ? `
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🌍 World & Global Affairs Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${globalArticles.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(globalArticles.slice(0, 4))}
        </section>
      ` : ''}

      <!-- SECTION 4: BUSINESS, ECONOMY & MARKETS WIRE -->
      ${economyArticles.length > 0 ? `
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>📈 Business, Economy & Markets Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${economyArticles.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(economyArticles.slice(0, 4))}
        </section>
      ` : ''}

      <!-- SECTION 5: TECHNOLOGY, AI & SCIENCE WIRE -->
      ${techArticles.length > 0 ? `
        <section class="hindu-section-band">
          <div class="hindu-section-bar">
            <h2 class="hindu-section-title">
              <span>🤖 Technology, Science & Space Wire</span>
            </h2>
            <span style="font-size: 0.8rem; font-weight: 700; color: var(--text-muted);">${techArticles.length} Stories</span>
          </div>
          ${this.buildArticlesGridHtml(techArticles.slice(0, 4))}
        </section>
      ` : ''}
    `;

    this.attachCardEventListeners(articles);
  }

  buildHeroCardHtml(heroArticle, customBadgeText = 'LIVE LEAD STORY') {
    const isBookmarked = cacheService.isBookmarked(heroArticle.id, heroArticle.link);
    const isIndian = heroArticle.region === 'india' || heroArticle.isPolitics;

    return `
      <div class="hero-story-card animate-fade-in" data-id="${heroArticle.id}">
        <div class="hero-image-wrap">
          <img src="${heroArticle.image}" alt="${heroArticle.title}" class="hero-img" loading="eager" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
          <div class="hero-image-badges">
            <span class="badge ${isIndian ? 'badge-live' : 'badge-source'}">${customBadgeText}</span>
            <span class="badge badge-category">${heroArticle.source}</span>
          </div>
        </div>
        <div class="hero-content">
          <div class="hero-meta-top">
            <span class="badge badge-category">${heroArticle.isPolitics ? '🏛️ INDIAN POLITICS' : (heroArticle.category || 'NEWS').toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">• ${this.formatTimeAgo(heroArticle.pubDate)}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted);">• ${heroArticle.readTime || '3 min read'}</span>
          </div>

          <h2 class="hero-title" data-action="open-article">${heroArticle.title}</h2>
          <p class="hero-excerpt">${heroArticle.snippet}</p>

          <div class="hero-footer">
            <button class="audio-player-pill" data-action="speak-article" title="Listen to summary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen Audio</span>
              <div class="audio-waveform">
                <div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div><div class="audio-bar"></div>
              </div>
            </button>

            <div class="hero-actions">
              <button class="btn-card-action ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" title="Bookmark article">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
              </button>
              <button class="btn-card-action" data-action="share" title="Share article">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  buildArticlesGridHtml(articlesList) {
    if (this.viewMode === 'grid') {
      return `
        <div class="news-grid-cards">
          ${articlesList.map(art => {
            const isBookmarked = cacheService.isBookmarked(art.id, art.link);
            return `
              <article class="article-card animate-fade-in" data-id="${art.id}">
                <div class="card-thumb-wrap">
                  <img src="${art.image}" alt="${art.title}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
                  <div class="card-category-overlay">
                    <span class="badge ${art.isPolitics ? 'badge-live' : 'badge-category'}">${art.isPolitics ? '🏛️ POLITICS' : art.category}</span>
                  </div>
                </div>
                <div class="card-body">
                  <div class="card-meta-row">
                    <span style="font-weight: 700; color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.75rem;">${art.source}</span>
                    <span>${this.formatTimeAgo(art.pubDate)}</span>
                  </div>

                  <h3 class="card-title" data-action="open-article">${art.title}</h3>
                  <p class="card-snippet">${art.snippet}</p>

                  <div class="card-footer">
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${art.readTime || '2 min read'}</span>
                    <div class="card-actions-group">
                      <button class="btn-card-action" data-action="speak-article" title="Listen Audio">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      </button>
                      <button class="btn-card-action ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" title="Save bookmark">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            `;
          }).join('')}
        </div>
      `;
    } else {
      // Compact List View
      return `
        <div class="compact-list-layout">
          ${articlesList.map(art => {
            const isBookmarked = cacheService.isBookmarked(art.id, art.link);
            return `
              <div class="compact-item animate-fade-in" data-id="${art.id}">
                <div class="compact-thumb">
                  <img src="${art.image}" alt="${art.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80'" />
                </div>
                <div>
                  <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; font-size: 0.775rem;">
                    <span style="color: var(--accent-cyan); font-weight: 700;">${art.source}</span>
                    <span style="color: var(--text-muted);">• ${this.formatTimeAgo(art.pubDate)}</span>
                    <span class="badge ${art.isPolitics ? 'badge-live' : 'badge-category'}" style="font-size: 0.65rem; padding: 2px 6px;">${art.isPolitics ? 'POLITICS' : art.category}</span>
                  </div>
                  <h3 class="compact-title" data-action="open-article">${art.title}</h3>
                </div>
                <div style="display: flex; align-items: center; gap: 6px;">
                  <button class="btn-card-action ${isBookmarked ? 'bookmarked' : ''}" data-action="bookmark" title="Bookmark">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }
  }

  attachCardEventListeners(articles) {
    const feedContainer = document.getElementById('main-news-feed');
    if (!feedContainer) return;

    // Delegated click handling
    feedContainer.addEventListener('click', (e) => {
      const targetAction = e.target.closest('[data-action]');
      const cardEl = e.target.closest('[data-id]');
      if (!cardEl) return;

      const articleId = cardEl.getAttribute('data-id');
      const article = articles.find(a => a.id === articleId);
      if (!article) return;

      if (targetAction) {
        const action = targetAction.getAttribute('data-action');
        if (action === 'open-article') {
          if (this.onArticleClickCallback) this.onArticleClickCallback(article);
        } else if (action === 'bookmark') {
          const isNowBookmarked = cacheService.toggleBookmark(article);
          targetAction.classList.toggle('bookmarked', isNowBookmarked);
          const svg = targetAction.querySelector('svg');
          if (svg) svg.setAttribute('fill', isNowBookmarked ? 'currentColor' : 'none');
          if (this.onBookmarkToggleCallback) this.onBookmarkToggleCallback(article, isNowBookmarked);
        } else if (action === 'speak-article') {
          speechService.speakArticle(article);
        } else if (action === 'share') {
          if (navigator.share) {
            navigator.share({
              title: article.title,
              text: article.snippet,
              url: article.link || window.location.href
            }).catch(() => {});
          } else {
            navigator.clipboard.writeText(article.link || window.location.href);
            alert('Article link copied to clipboard!');
          }
        }
      } else {
        // Clicking card body opens article
        if (!e.target.closest('button')) {
          if (this.onArticleClickCallback) this.onArticleClickCallback(article);
        }
      }
    });
  }
}
