import { cacheService } from '../services/cacheService.js';
import { CATEGORIES } from '../config/sources.js';
import { firebaseService } from '../services/firebaseService.js';

export class PublishModalComponent {
  constructor(onArticlePublishedCallback) {
    this.onArticlePublishedCallback = onArticlePublishedCallback;
    this.modalEl = null;
    this.isOpen = false;
    this.editingArticleId = null;

    this.presetImages = [
      {
        label: '🏛️ Parliament & Central Vista',
        url: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80'
      },
      {
        label: '⚖️ Supreme Court & Justice',
        url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80'
      },
      {
        label: '🪙 Indian Rupee & RBI',
        url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=1200&auto=format&fit=crop&q=80'
      },
      {
        label: '🚀 ISRO Space Rocket',
        url: 'https://images.unsplash.com/photo-1517976487508-59a5a0da23b2?w=1200&auto=format&fit=crop&q=80'
      },
      {
        label: '🤖 Semiconductors & AI',
        url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80'
      },
      {
        label: '🌍 Global Summit & Diplomacy',
        url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=1200&auto=format&fit=crop&q=80'
      }
    ];

    this.selectedImageUrl = this.presetImages[0].url;
  }

  init() {
    this.injectModalHtml();
    this.attachEventListeners();
  }

  injectModalHtml() {
    const existing = document.getElementById('publish-studio-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'publish-studio-modal';
    modal.className = 'publish-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="publish-modal-container">
        <!-- Header -->
        <div class="publish-modal-header">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span class="badge badge-live" style="background: var(--hindu-navy); color: #fff;">EDITORIAL CMS</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.55rem; color: var(--text-primary); margin: 0;">
              Publish News Story or Editorial
            </h2>
          </div>
          <button id="btn-close-publish-modal" class="btn-close-modal" title="Close Editorial Studio">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Form Body -->
        <form id="publish-studio-form" class="publish-modal-body">
          <!-- Headline -->
          <div class="publish-form-group">
            <label class="publish-label">Headline / Title *</label>
            <input type="text" id="pub-headline" class="publish-input" placeholder="e.g., Union Cabinet Approves Landmark Statutory Reforms for Infrastructure & Clean Energy" required />
          </div>

          <!-- Byline & Dateline Grid -->
          <div class="publish-form-grid-2">
            <div class="publish-form-group">
              <label class="publish-label">Author / Byline</label>
              <input type="text" id="pub-byline" class="publish-input" placeholder="e.g., What's Going On Bureau / Special Correspondent" value="What's Going On Editorial Desk" />
            </div>

            <div class="publish-form-group">
              <label class="publish-label">Dateline Prefix</label>
              <select id="pub-dateline" class="publish-select">
                <option value="NEW DELHI —">NEW DELHI —</option>
                <option value="MUMBAI —">MUMBAI —</option>
                <option value="BENGALURU —">BENGALURU —</option>
                <option value="CHENNAI —">CHENNAI —</option>
                <option value="KOLKATA —">KOLKATA —</option>
                <option value="WASHINGTON —">WASHINGTON —</option>
                <option value="LONDON —">LONDON —</option>
                <option value="GLOBAL WIRE —">GLOBAL WIRE —</option>
              </select>
            </div>
          </div>

          <!-- Category & Read Time -->
          <div class="publish-form-grid-2">
            <div class="publish-form-group">
              <label class="publish-label">Beat / Category *</label>
              <select id="pub-category" class="publish-select">
                <option value="${CATEGORIES.INDIA_POLITICS}">🏛️ Indian Politics & Governance</option>
                <option value="${CATEGORIES.INDIA}">🇮🇳 India National News</option>
                <option value="${CATEGORIES.WORLD}">🌍 World & Global Affairs</option>
                <option value="${CATEGORIES.BUSINESS}">📈 Business, Economy & Markets</option>
                <option value="${CATEGORIES.TECH}">🤖 Technology & AI</option>
                <option value="${CATEGORIES.SCIENCE}">🚀 Science & Space</option>
                <option value="opinion">✒️ Editorial & Opinion</option>
              </select>
            </div>

            <div class="publish-form-group">
              <label class="publish-label">Estimated Read Time</label>
              <input type="text" id="pub-readtime" class="publish-input" placeholder="e.g. 3 min read" value="3 min read" />
            </div>
          </div>

          <!-- Featured Image -->
          <div class="publish-form-group">
            <label class="publish-label">Featured Photojournalist Image</label>
            <div class="preset-photo-pills" id="pub-photo-presets">
              ${this.presetImages.map((p, idx) => `
                <button type="button" class="preset-photo-btn ${idx === 0 ? 'active' : ''}" data-url="${p.url}">
                  ${p.label}
                </button>
              `).join('')}
            </div>
            <input type="url" id="pub-custom-image-url" class="publish-input" style="margin-top: 8px;" placeholder="Or paste custom image URL (https://...)" value="${this.presetImages[0].url}" />
            <div class="publish-image-preview-wrap" style="margin-top: 10px;">
              <img id="pub-image-preview" src="${this.presetImages[0].url}" alt="Preview" class="publish-image-preview" />
            </div>
          </div>

          <!-- Lead Excerpt -->
          <div class="publish-form-group">
            <label class="publish-label">Executive Lead Summary (1-2 sentences) *</label>
            <textarea id="pub-excerpt" class="publish-textarea" rows="2" placeholder="Brief summary displayed on front-page card..." required></textarea>
          </div>

          <!-- Full Article Content -->
          <div class="publish-form-group">
            <label class="publish-label">Full Article Story Narrative *</label>
            <textarea id="pub-content" class="publish-textarea" rows="7" placeholder="Write full news article or analysis story (paragraphs separated by blank lines)..." required></textarea>
          </div>

          <!-- Key Takeaways -->
          <div class="publish-form-group">
            <label class="publish-label">Core Takeaways (One per line)</label>
            <textarea id="pub-keypoints" class="publish-textarea" rows="3" placeholder="Key Point 1&#10;Key Point 2&#10;Key Point 3"></textarea>
          </div>

          <!-- Footer Actions -->
          <div class="publish-modal-footer">
            <button type="button" id="btn-cancel-publish" class="btn-cancel-modal">
              Cancel
            </button>
            <button type="submit" id="btn-submit-publish" class="btn-publish-submit">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              <span>Publish to What's Going On</span>
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  attachEventListeners() {
    if (!this.modalEl) return;

    // Close buttons
    const btnClose = this.modalEl.querySelector('#btn-close-publish-modal');
    const btnCancel = this.modalEl.querySelector('#btn-cancel-publish');
    if (btnClose) btnClose.addEventListener('click', () => this.close());
    if (btnCancel) btnCancel.addEventListener('click', () => this.close());

    // Backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Preset Photo Selector
    const presetBtns = this.modalEl.querySelectorAll('.preset-photo-btn');
    const customUrlInput = this.modalEl.querySelector('#pub-custom-image-url');
    const previewImg = this.modalEl.querySelector('#pub-image-preview');

    presetBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const url = btn.getAttribute('data-url');
        this.selectedImageUrl = url;
        if (customUrlInput) customUrlInput.value = url;
        if (previewImg) previewImg.src = url;
      });
    });

    if (customUrlInput) {
      customUrlInput.addEventListener('input', () => {
        presetBtns.forEach(b => b.classList.remove('active'));
        this.selectedImageUrl = customUrlInput.value.trim();
        if (previewImg) previewImg.src = this.selectedImageUrl;
      });
    }

    // Form submit
    const form = this.modalEl.querySelector('#publish-studio-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  open(existingArticle = null) {
    if (!firebaseService.isAdmin()) {
      alert('Access Restricted: Only the Admin (dhananjaysaini2006@gmail.com) has permission to write and publish news stories.');
      return;
    }

    if (!this.modalEl) this.injectModalHtml();

    this.isOpen = true;
    this.modalEl.classList.add('active');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // Populate form if editing
    if (existingArticle) {
      this.editingArticleId = existingArticle.id;
      this.modalEl.querySelector('#pub-headline').value = existingArticle.title || '';
      this.modalEl.querySelector('#pub-byline').value = existingArticle.source || '';
      this.modalEl.querySelector('#pub-category').value = existingArticle.category || CATEGORIES.INDIA_POLITICS;
      this.modalEl.querySelector('#pub-excerpt').value = existingArticle.snippet || '';
      this.modalEl.querySelector('#pub-content').value = existingArticle.content || '';
      this.modalEl.querySelector('#pub-custom-image-url').value = existingArticle.image || '';
      this.modalEl.querySelector('#pub-image-preview').src = existingArticle.image || '';
      if (existingArticle.keyPoints) {
        this.modalEl.querySelector('#pub-keypoints').value = existingArticle.keyPoints.join('\n');
      }
    } else {
      this.editingArticleId = null;
    }
  }

  close() {
    if (!this.modalEl) return;
    this.isOpen = false;
    this.modalEl.classList.remove('active');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  handleSubmit() {
    const headline = this.modalEl.querySelector('#pub-headline').value.trim();
    const byline = this.modalEl.querySelector('#pub-byline').value.trim() || "What's Going On Editorial";
    const dateline = this.modalEl.querySelector('#pub-dateline').value;
    const category = this.modalEl.querySelector('#pub-category').value;
    const readTime = this.modalEl.querySelector('#pub-readtime').value.trim() || '3 min read';
    const imageUrl = this.selectedImageUrl || this.presetImages[0].url;
    const excerpt = this.modalEl.querySelector('#pub-excerpt').value.trim();
    const content = this.modalEl.querySelector('#pub-content').value.trim();
    const keyPointsRaw = this.modalEl.querySelector('#pub-keypoints').value.trim();

    const keyPoints = keyPointsRaw ? keyPointsRaw.split('\n').map(p => p.trim()).filter(Boolean) : [
      'Comprehensive on-the-ground intelligence and editorial assessment.',
      'Analysis corroborated by verified primary sources and statutory records.',
      'Implications reviewed by What\'s Going On editorial desk.'
    ];

    const articleObj = {
      id: this.editingArticleId || ('user-art-' + Date.now()),
      title: headline,
      source: byline,
      sourceId: 'user-published',
      category: category,
      region: category === CATEGORIES.WORLD ? 'global' : 'india',
      isPolitics: category === CATEGORIES.INDIA_POLITICS || category === CATEGORIES.INDIA,
      isUserPublished: true,
      link: '#user-story-' + Date.now(),
      image: imageUrl,
      pubDate: new Date().toISOString(),
      snippet: `${dateline} ${excerpt}`,
      content: content,
      keyPoints: keyPoints,
      readTime: readTime
    };

    cacheService.saveCustomArticle(articleObj);

    this.close();

    // Reset form
    this.modalEl.querySelector('#publish-studio-form').reset();

    // Trigger callback to re-render front page
    if (this.onArticlePublishedCallback) {
      this.onArticlePublishedCallback(articleObj);
    }
  }
}
