import { CURATED_CURRENT_AFFAIRS_DATA, CURRENT_AFFAIRS_TOPICS } from '../config/sources.js';
import { speechService } from '../services/speechService.js';

export class CurrentAffairsComponent {
  constructor() {
    this.activeTopic = 'all';
    this.currentAffairsList = [...CURATED_CURRENT_AFFAIRS_DATA];
  }

  render() {
    const container = document.getElementById('main-news-feed');
    if (!container) return;

    const filtered = this.activeTopic === 'all' 
      ? this.currentAffairsList 
      : this.currentAffairsList.filter(item => item.category === this.activeTopic);

    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });

    container.innerHTML = `
      <div class="ca-hub-container">
        <!-- Hero Intelligence Banner -->
        <div class="ca-hero-banner">
          <div class="ca-banner-header">
            <span class="ca-badge">⭐ Daily Intelligence Briefing</span>
            <span class="ca-banner-date">${formattedDate}</span>
          </div>
          <h2 class="ca-banner-title">Current Affairs & Strategic Analysis</h2>
          <p class="ca-banner-desc">
            Structured daily briefings, policy breakdowns, geopolitical treaties, and competitive exam intelligence curated in high-yield formats.
          </p>
        </div>

        <!-- Subtabs -->
        <div class="ca-subtabs" id="ca-subtabs-wrap">
          ${CURRENT_AFFAIRS_TOPICS.map(topic => `
            <button class="ca-subtab-btn ${this.activeTopic === topic.id ? 'active' : ''}" data-topic="${topic.id}">
              ${topic.label}
            </button>
          `).join('')}
        </div>

        <!-- Briefing Cards -->
        <div class="ca-cards-list" style="display: flex; flex-direction: column; gap: 20px;">
          ${filtered.map(item => `
            <div class="ca-card" data-id="${item.id}">
              <div class="ca-card-top">
                <span class="ca-category-pill ca-cat-${item.category}">
                  ${item.category.toUpperCase()}
                </span>
                <span style="font-size: 0.775rem; color: var(--text-muted); font-family: var(--font-mono);">${item.date}</span>
              </div>

              <h3 class="ca-title">${item.title}</h3>

              <!-- 4-Box Structured Matrix -->
              <div class="ca-analysis-grid">
                <div class="ca-analysis-box">
                  <div class="ca-box-label label-what">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
                    What Happened
                  </div>
                  <div class="ca-box-text">${item.what}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-why">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    Why It Matters
                  </div>
                  <div class="ca-box-text">${item.why}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-impact">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                    Impact & Significance
                  </div>
                  <div class="ca-box-text">${item.impact}</div>
                </div>

                <div class="ca-analysis-box">
                  <div class="ca-box-label label-facts">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    Key Stakeholders
                  </div>
                  <div class="ca-box-text">${item.who}</div>
                </div>
              </div>

              <div class="ca-card-footer">
                <button class="audio-player-pill" data-action="speak-ca" data-id="${item.id}" title="Listen to Briefing">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
                  <span>Listen Audio Note</span>
                </button>

                <button class="btn-manual-refresh" data-action="copy-ca" data-id="${item.id}" title="Copy Note">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  Copy Briefing
                </button>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Daily Interactive Quiz Section -->
        <div class="ca-quiz-section">
          <div class="ca-quiz-header">
            <h3 style="font-family: var(--font-serif); font-size: 1.3rem;">🧠 Daily Current Affairs Knowledge Check</h3>
            <span class="badge badge-source">${filtered.length} Flashcards</span>
          </div>

          <div class="quiz-cards-container">
            ${filtered.map((item, idx) => `
              <div class="quiz-card" id="quiz-card-${item.id}">
                <div style="font-size: 0.75rem; color: var(--accent-amber); font-weight: 700; margin-bottom: 6px;">QUESTION 0${idx + 1}</div>
                <div class="quiz-question">${item.quiz.question}</div>
                
                <div style="display: flex; flex-direction: column; gap: 8px; margin-bottom: 12px;">
                  ${item.quiz.options.map((opt, oIdx) => `
                    <button class="quiz-option-btn" data-ca-id="${item.id}" data-opt-idx="${oIdx}" style="text-align: left; padding: 8px 12px; background: var(--bg-secondary); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); font-size: 0.85rem; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast);">
                      ${String.fromCharCode(65 + oIdx)}. ${opt}
                    </button>
                  `).join('')}
                </div>

                <div class="quiz-answer" id="quiz-ans-${item.id}">
                  <strong>Correct Answer: Option ${String.fromCharCode(65 + item.quiz.correct)} (${item.quiz.options[item.quiz.correct]})</strong>
                  <p style="margin-top: 4px; font-size: 0.825rem; color: var(--text-secondary);">${item.quiz.explanation}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;

    this.attachEventListeners();
  }

  attachEventListeners() {
    // Subtab filters
    const subtabs = document.querySelectorAll('.ca-subtab-btn');
    subtabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.activeTopic = tab.getAttribute('data-topic');
        this.render();
      });
    });

    // Speak action
    const speakBtns = document.querySelectorAll('[data-action="speak-ca"]');
    speakBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = this.currentAffairsList.find(c => c.id === id);
        if (item) {
          speechService.speakArticle({
            id: item.id,
            source: 'Current Affairs Intelligence',
            title: item.title,
            snippet: `${item.what}. Significance: ${item.impact}`
          });
        }
      });
    });

    // Copy action
    const copyBtns = document.querySelectorAll('[data-action="copy-ca"]');
    copyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const item = this.currentAffairsList.find(c => c.id === id);
        if (item) {
          const text = `*Current Affairs: ${item.title}*\n\n• What: ${item.what}\n• Why: ${item.why}\n• Impact: ${item.impact}\n• Stakeholders: ${item.who}`;
          navigator.clipboard.writeText(text);
          btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Copied!`;
          setTimeout(() => {
            btn.innerHTML = `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy Briefing`;
          }, 2000);
        }
      });
    });

    // Quiz options click
    const optionBtns = document.querySelectorAll('.quiz-option-btn');
    optionBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const caId = btn.getAttribute('data-ca-id');
        const optIdx = parseInt(btn.getAttribute('data-opt-idx'), 10);
        const item = this.currentAffairsList.find(c => c.id === caId);
        const ansEl = document.getElementById(`quiz-ans-${caId}`);

        if (item && ansEl) {
          ansEl.classList.add('show');
          if (optIdx === item.quiz.correct) {
            btn.style.borderColor = '#10b981';
            btn.style.background = 'rgba(16, 185, 129, 0.2)';
            btn.style.color = '#34d399';
          } else {
            btn.style.borderColor = '#ef4444';
            btn.style.background = 'rgba(239, 68, 68, 0.2)';
            btn.style.color = '#f87171';
          }
        }
      });
    });
  }
}
