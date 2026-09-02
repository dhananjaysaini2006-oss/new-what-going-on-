export class TickerComponent {
  constructor(onArticleClickCallback) {
    this.onArticleClickCallback = onArticleClickCallback;
    this.articles = [];
  }

  render(articles) {
    this.articles = articles || [];
    const container = document.getElementById('breaking-news-ticker-container');
    if (!container) return;

    if (this.articles.length === 0) {
      container.style.display = 'none';
      return;
    }

    container.style.display = 'block';
    
    // Select top 10 articles for marquee
    const tickerArticles = this.articles.slice(0, 10);
    
    // Duplicate the list to create a seamless infinite marquee loop
    const fullList = [...tickerArticles, ...tickerArticles];

    const itemsHtml = fullList.map((art, idx) => `
      <div class="ticker-item" data-id="${art.id}" data-idx="${idx % tickerArticles.length}">
        <span class="dot"></span>
        <span class="source-tag">[${art.source}]</span>
        <span class="title-text">${art.title}</span>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="ticker-bar">
        <div class="ticker-label">
          <span class="badge-live"></span>
          BREAKING
        </div>
        <div class="ticker-track-wrap">
          <div class="ticker-marquee" id="ticker-marquee-element">
            ${itemsHtml}
          </div>
        </div>
      </div>
    `;

    // Attach click handlers
    const itemEls = container.querySelectorAll('.ticker-item');
    itemEls.forEach(el => {
      el.addEventListener('click', () => {
        const articleId = el.getAttribute('data-id');
        const targetArticle = this.articles.find(a => a.id === articleId) || this.articles[0];
        if (this.onArticleClickCallback && targetArticle) {
          this.onArticleClickCallback(targetArticle);
        }
      });
    });
  }
}
