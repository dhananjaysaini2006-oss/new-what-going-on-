import { firebaseService } from '../services/firebaseService.js';

export class AuthModalComponent {
  constructor(onAuthSuccessCallback) {
    this.onAuthSuccessCallback = onAuthSuccessCallback;
    this.modalEl = null;
    this.isOpen = false;
    this.currentTab = 'signin'; // 'signin' or 'signup'
  }

  init() {
    this.injectModalHtml();
    this.attachEventListeners();
  }

  injectModalHtml() {
    const existing = document.getElementById('auth-modal-overlay');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'auth-modal-overlay';
    modal.className = 'auth-modal-overlay';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-hidden', 'true');

    modal.innerHTML = `
      <div class="auth-modal-container">
        <!-- Header -->
        <div class="auth-modal-header">
          <div>
            <span class="badge" style="background: var(--accent-emerald); color: #fff; font-size: 0.7rem; letter-spacing: 0.06em;">✓ SECURE SIGN IN</span>
            <h2 style="font-family: var(--font-serif); font-size: 1.45rem; color: var(--text-primary); margin: 4px 0 0;">
              What's Going On — Membership
            </h2>
          </div>
          <button id="btn-close-auth-modal" class="btn-close-modal" title="Close">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <!-- Tab Toggle Bar -->
        <div class="auth-tabs">
          <button type="button" class="auth-tab-btn active" data-tab="signin" id="tab-auth-signin">
            Sign In
          </button>
          <button type="button" class="auth-tab-btn" data-tab="signup" id="tab-auth-signup">
            Create Reader Account
          </button>
        </div>

        <!-- Feedback Alert Box -->
        <div id="auth-alert-box" class="auth-alert" style="display: none;"></div>

        <!-- Form Body -->
        <form id="auth-form" class="auth-modal-body">
          <!-- Name Field (Sign Up Only) -->
          <div class="publish-form-group" id="group-auth-name" style="display: none;">
            <label class="publish-label">Full Name</label>
            <input type="text" id="auth-name" class="publish-input" placeholder="Your full name" />
          </div>

          <!-- Email Field -->
          <div class="publish-form-group">
            <label class="publish-label">Email Address *</label>
            <input type="email" id="auth-email" class="publish-input" placeholder="name@example.com" required />
          </div>

          <!-- Password Field -->
          <div class="publish-form-group">
            <label class="publish-label">Password *</label>
            <input type="password" id="auth-password" class="publish-input" placeholder="Min. 8 characters" required />
          </div>

          <!-- Submit Button -->
          <div style="margin-top: 10px;">
            <button type="submit" id="btn-auth-submit" class="btn-publish-submit" style="width: 100%; justify-content: center; padding: 12px;">
              <span id="auth-submit-text">Sign In to Newsroom</span>
            </button>
          </div>
        </form>

        <div class="auth-modal-footer-note">
          <span>Protected by Firebase Authentication & Secure Session Engine.</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  attachEventListeners() {
    if (!this.modalEl) return;

    // Close buttons
    const btnClose = this.modalEl.querySelector('#btn-close-auth-modal');
    if (btnClose) btnClose.addEventListener('click', () => this.close());

    // Backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) this.close();
    });

    // Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) this.close();
    });

    // Tabs
    const tabSignin = this.modalEl.querySelector('#tab-auth-signin');
    const tabSignup = this.modalEl.querySelector('#tab-auth-signup');

    if (tabSignin) tabSignin.addEventListener('click', () => this.switchTab('signin'));
    if (tabSignup) tabSignup.addEventListener('click', () => this.switchTab('signup'));

    // Submit form
    const form = this.modalEl.querySelector('#auth-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        this.handleSubmit();
      });
    }
  }

  switchTab(tab) {
    this.currentTab = tab;
    const tabSignin = this.modalEl.querySelector('#tab-auth-signin');
    const tabSignup = this.modalEl.querySelector('#tab-auth-signup');
    const groupName = this.modalEl.querySelector('#group-auth-name');
    const submitText = this.modalEl.querySelector('#auth-submit-text');
    const alertBox = this.modalEl.querySelector('#auth-alert-box');

    if (alertBox) alertBox.style.display = 'none';

    if (tab === 'signin') {
      tabSignin.classList.add('active');
      tabSignup.classList.remove('active');
      groupName.style.display = 'none';
      submitText.textContent = 'Sign In to Newsroom';
    } else {
      tabSignup.classList.add('active');
      tabSignin.classList.remove('active');
      groupName.style.display = 'flex';
      submitText.textContent = 'Create Reader Account';
    }
  }

  showAlert(message, type = 'error') {
    const box = this.modalEl.querySelector('#auth-alert-box');
    if (box) {
      box.textContent = message;
      box.className = `auth-alert ${type}`;
      box.style.display = 'block';
    }
  }

  open(defaultTab = 'signin') {
    if (!this.modalEl) this.injectModalHtml();
    this.isOpen = true;
    this.modalEl.classList.add('active');
    this.modalEl.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    this.switchTab(defaultTab);
  }

  close() {
    if (!this.modalEl) return;
    this.isOpen = false;
    this.modalEl.classList.remove('active');
    this.modalEl.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  async handleSubmit() {
    const email = this.modalEl.querySelector('#auth-email').value.trim();
    const password = this.modalEl.querySelector('#auth-password').value.trim();
    const name = this.modalEl.querySelector('#auth-name').value.trim();
    const submitBtn = this.modalEl.querySelector('#btn-auth-submit');
    const submitText = this.modalEl.querySelector('#auth-submit-text');

    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.75';
    if (submitText) {
      submitText.textContent = this.currentTab === 'signin' ? 'Signing in...' : 'Creating account...';
    }

    try {
      let user = null;
      if (this.currentTab === 'signin') {
        user = await firebaseService.signIn(email, password);
      } else {
        user = await firebaseService.signUp(email, password, name);
      }

      this.showAlert(`Welcome, ${user.displayName || user.email}! ✓`, 'success');
      setTimeout(() => {
        this.close();
        if (this.onAuthSuccessCallback) {
          this.onAuthSuccessCallback(user);
        }
      }, 600);
    } catch (err) {
      this.showAlert(err.message || 'Authentication failed. Please try again.', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.style.opacity = '1';
      if (submitText) {
        submitText.textContent = this.currentTab === 'signin' ? 'Sign In to Newsroom' : 'Create Reader Account';
      }
    }
  }
}
