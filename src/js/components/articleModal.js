import { cacheService } from '../services/cacheService.js';
import { speechService } from '../services/speechService.js';

export class ArticleModalComponent {
  constructor(onBookmarkToggleCallback) {
    this.onBookmarkToggleCallback = onBookmarkToggleCallback;
    this.currentArticle = null;
    this.fontSize = 17; // px
    this.init();
  }

  init() {
    this.renderModalContainer();
    this.attachGlobalListeners();
  }

  renderModalContainer() {
    let modalOverlay = document.getElementById('article-reader-modal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'article-reader-modal';
      modalOverlay.className = 'modal-overlay';
      document.body.appendChild(modalOverlay);
    }
  }

  open(article) {
    this.currentArticle = article;
    cacheService.markAsRead(article.id);

    const modalOverlay = document.getElementById('article-reader-modal');
    if (!modalOverlay) return;

    const isBookmarked = cacheService.isBookmarked(article.id, article.link);

    // Format content into paragraphs
    const contentText = article.content || article.snippet || '';
    const paragraphs = contentText.split('\n\n').filter(p => p.trim().length > 0);

    modalOverlay.innerHTML = `
      <div class="reader-modal-container" role="dialog" aria-modal="true">
        <!-- Reading Progress Bar -->
        <div id="modal-read-progress-bar" style="position: absolute; top: 0; left: 0; height: 3px; width: 0%; background: linear-gradient(90deg, var(--hindu-red), var(--accent-cyan)); border-radius: 0; transition: width 0.1s linear; z-index: 10;"></div>

        <!-- Top Action Bar -->
        <div class="modal-top-bar">
          <div class="modal-controls-left">
            <span class="badge badge-source">${article.source}</span>
            <span style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-mono);">• ${article.readTime || '3 min read'}</span>
            
            <div class="font-size-adjuster" title="Adjust Font Size">
              <button id="modal-font-dec">A-</button>
              <button id="modal-font-inc">A+</button>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="modal-audio-btn" class="audio-player-pill" title="Listen Audio Summary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
              <span>Listen</span>
            </button>

            <button id="modal-bookmark-btn" class="action-btn ${isBookmarked ? 'bookmarked' : ''}" title="Bookmark Article">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="${isBookmarked ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>

            <button id="modal-close-btn" class="action-btn" title="Close (Esc)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Scrollable Article Reader Body -->
        <div class="modal-scroll-content">
          <div class="modal-article-meta">
            <span class="badge ${article.isPolitics ? 'badge-live' : 'badge-category'}">${article.isPolitics ? '🏛️ INDIAN POLITICS' : article.category.toUpperCase()}</span>
            <span style="font-size: 0.8rem; color: var(--text-muted); font-family: var(--font-mono);">
              Published: ${new Date(article.pubDate).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
            </span>
          </div>

          <h1 class="modal-article-title">${article.title}</h1>

          ${article.image ? `
            <div class="modal-image-wrap">
              <img src="${article.image}" alt="${article.title}" class="modal-img" onerror="this.src='https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80'" />
            </div>
          ` : ''}

          <!-- Key Takeaways & Fact Points Box -->
          ${article.keyPoints && article.keyPoints.length > 0 ? `
            <div class="modal-key-points">
              <h4 style="display: flex; align-items: center; gap: 8px;">
                <span>⭐ Key Intelligence Points</span>
              </h4>
              <ul>
                ${article.keyPoints.map(pt => `<li>${pt}</li>`).join('')}
              </ul>
            </div>
          ` : ''}

          <!-- Substantive News Story (Half News Core Briefing) -->
          <div class="modal-article-body" id="modal-article-body-text" style="font-size: ${this.fontSize}px;">
            <div style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.08em; color: var(--accent-cyan); font-weight: 700; margin-bottom: 12px; display: flex; align-items: center; gap: 6px;">
              <span class="badge-live"></span>
              Core Story Briefing
            </div>

            ${paragraphs.map(p => `<p>${p}</p>`).join('')}
          </div>

          <!-- Author or Origin Card -->
          ${article.isUserPublished ? `
            <div style="background: rgba(0, 51, 102, 0.08); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 20px 24px; margin-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px;">
              <div>
                <span class="badge-user-editorial">AUTHOR EXCLUSIVE</span>
                <p style="margin: 6px 0 0; font-size: 0.875rem; color: var(--text-secondary);">
                  This article was written and published directly by you on What's Going On.
                </p>
              </div>
              <button id="modal-delete-user-article-btn" class="btn-cancel-modal" style="color: var(--hindu-red); border-color: var(--hindu-red); font-weight: 700;">
                🗑️ Unpublish / Delete Story
              </button>
            </div>
          ` : `
            <!-- Read Full Complete Story at Origin Publisher Card -->
            <div style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.08) 0%, rgba(59, 130, 246, 0.1) 100%); border: 1px solid var(--border-medium); border-radius: var(--radius-md); padding: 24px; margin-top: 24px; display: flex; flex-direction: column; gap: 14px; text-align: center; align-items: center;">
              <div style="font-size: 0.8rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-cyan);">
                Read More on Original Publisher
              </div>
              <h4 style="font-family: var(--font-serif); font-size: 1.25rem; color: var(--text-primary);">
                Want to read the complete in-depth coverage?
              </h4>
              <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 540px; margin: 0 auto;">
                You have read the essential news summary on What's Going On. For the complete full story, investigative records, and live broadcast, continue directly to <strong>${article.source}</strong>.
              </p>
              <a href="${article.link || '#'}" target="_blank" rel="noopener noreferrer" style="display: inline-flex; align-items: center; gap: 8px; background: var(--accent-cyan); color: #000; font-weight: 700; padding: 12px 24px; border-radius: var(--radius-full); text-decoration: none; font-size: 0.9rem; transition: transform var(--transition-fast);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
                <span>Read Full Complete Story on ${article.source}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </a>
            </div>
          `}
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <button id="modal-copy-link-btn" class="btn-manual-refresh" title="Copy article link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
              </svg>
              Copy Link
            </button>
            <button id="modal-whatsapp-btn" class="btn-manual-refresh" title="Share this article">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
              </svg>
              Share
            </button>
          </div>

          <a href="${article.link || '#'}" target="_blank" rel="noopener noreferrer" class="badge badge-source" style="font-size: 0.8rem; padding: 6px 14px; text-decoration: none;">
            Direct Source Link: ${article.source} ↗
          </a>
        </div>
      </div>
    `;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    this.attachModalEvents(article);

    // Activate reading progress bar on scroll
    const scrollEl = modalOverlay.querySelector('.modal-scroll-content');
    const progressBar = document.getElementById('modal-read-progress-bar');
    if (scrollEl && progressBar) {
      scrollEl.addEventListener('scroll', () => {
        const scrolled = scrollEl.scrollTop;
        const total = scrollEl.scrollHeight - scrollEl.clientHeight;
        const pct = total > 0 ? Math.min(100, (scrolled / total) * 100) : 0;
        progressBar.style.width = pct + '%';
      }, { passive: true });
    }
  }

  close() {
    const modalOverlay = document.getElementById('article-reader-modal');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  attachModalEvents(article) {
    const closeBtn = document.getElementById('modal-close-btn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.close());

    // Font size adjustments
    const bodyText = document.getElementById('modal-article-body-text');
    const incBtn = document.getElementById('modal-font-inc');
    const decBtn = document.getElementById('modal-font-dec');

    if (incBtn && bodyText) {
      incBtn.addEventListener('click', () => {
        if (this.fontSize < 24) {
          this.fontSize += 1.5;
          bodyText.style.fontSize = `${this.fontSize}px`;
        }
      });
    }

    if (decBtn && bodyText) {
      decBtn.addEventListener('click', () => {
        if (this.fontSize > 14) {
          this.fontSize -= 1.5;
          bodyText.style.fontSize = `${this.fontSize}px`;
        }
      });
    }

    // Audio button
    const audioBtn = document.getElementById('modal-audio-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        speechService.speakArticle(article);
      });
    }

    // Bookmark button
    const bookmarkBtn = document.getElementById('modal-bookmark-btn');
    if (bookmarkBtn) {
      bookmarkBtn.addEventListener('click', () => {
        const isNowBookmarked = cacheService.toggleBookmark(article);
        bookmarkBtn.classList.toggle('bookmarked', isNowBookmarked);
        const svg = bookmarkBtn.querySelector('svg');
        if (svg) svg.setAttribute('fill', isNowBookmarked ? 'currentColor' : 'none');
        if (this.onBookmarkToggleCallback) this.onBookmarkToggleCallback(article, isNowBookmarked);
      });
    }

    // Copy link
    const copyBtn = document.getElementById('modal-copy-link-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(article.link || window.location.href);
        copyBtn.textContent = 'Copied!';
        setTimeout(() => { copyBtn.textContent = 'Copy Link'; }, 2000);
      });
    }

    // Share button (Web Share API / clipboard fallback)
    const shareBtn = document.getElementById('modal-whatsapp-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', async () => {
        const shareData = {
          title: article.title,
          text: article.snippet || article.title,
          url: article.link || window.location.href
        };
        try {
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            await navigator.clipboard.writeText(article.link || window.location.href);
            const origHtml = shareBtn.innerHTML;
            shareBtn.textContent = 'Link Copied!';
            setTimeout(() => { shareBtn.innerHTML = origHtml; }, 2000);
          }
        } catch (e) { /* user cancelled */ }
      });
    }

    // Delete user published article
    const deleteUserBtn = document.getElementById('modal-delete-user-article-btn');
    if (deleteUserBtn) {
      deleteUserBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to unpublish this story from What\'s Going On?')) {
          cacheService.deleteCustomArticle(article.id);
          this.close();
          window.location.reload();
        }
      });
    }
  }

  attachGlobalListeners() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.close();
    });

    const modalOverlay = document.getElementById('article-reader-modal');
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) this.close();
      });
    }
  }
}
