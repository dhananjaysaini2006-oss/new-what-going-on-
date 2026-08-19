import React from 'react';
import { Article, CategoryType } from '../types';
import { Bookmark, Clock, ArrowRight, Share2, Compass, PenTool, Sparkles } from 'lucide-react';

interface CategoryFeedProps {
  articles: Article[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onShare: (article: Article) => void;
}

export const CategoryFeed: React.FC<CategoryFeedProps> = ({
  articles,
  selectedCategory,
  onSelectCategory,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
}) => {
  const categories: CategoryType[] = [
    'All',
    'Google News',
    'World',
    'India',
    'Politics',
    'AI & Tech',
    'Business',
    'Markets',
    'Climate',
    'Science',
    'Culture',
    'Sports',
    'Opinion',
    'In-Depth',
  ];

  const filteredArticles =
    selectedCategory === 'All'
      ? articles
      : articles.filter((a) => {
          if (selectedCategory === 'In-Depth') return a.isInvestigative || a.category === 'In-Depth';
          return a.category === selectedCategory;
        });

  return (
    <section className="py-8 sm:py-12 border-b border-[#D9D9D5] dark:border-[#2E333D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading & Category Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b-2 border-[#111215] dark:border-[#F5F5F2] mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946]">Continuous Wire</span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111215] dark:text-[#F5F5F2]">
              LATEST DISPATCHES & EDITORIAL STREAM
            </h2>
          </div>

          {/* Interactive filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {categories.slice(0, 7).map((cat) => (
              <button
                key={cat}
                id={`feed-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => onSelectCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#E63946] text-white shadow-xs'
                    : 'bg-[#F4F4F0] dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2]'
                }`}
              >
                {cat === 'All' ? 'All Sections' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 ? (
          <div className="py-16 text-center bg-[#F4F4F0] dark:bg-[#14171D] rounded-lg border border-dashed border-[#D9D9D5] dark:border-[#2E333D]">
            <Compass className="w-10 h-10 mx-auto text-[#5F6368] dark:text-[#A7AAB0] mb-3 opacity-50" />
            <h3 className="text-lg font-bold text-[#111215] dark:text-[#F5F5F2]">No dispatches in this section yet</h3>
            <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] mt-1 max-w-sm mx-auto">
              Check back shortly as our regional newsrooms file developing coverage.
            </p>
            <button
              onClick={() => onSelectCategory('All')}
              className="mt-4 px-4 py-2 text-xs font-bold uppercase bg-[#111215] dark:bg-[#F5F5F2] text-[#FBFBF9] dark:text-[#111215] rounded hover:bg-[#E63946] transition-colors"
            >
              Return to Front Page
            </button>
          </div>
        ) : (
          /* Editorial Asymmetric Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article, index) => {
              const isLarge = index === 0 && selectedCategory === 'All';
              const isCompact = index > 4;

              if (isLarge) {
                return (
                  <article
                    key={article.id}
                    id={`article-card-${article.id}`}
                    className="md:col-span-2 lg:col-span-2 group rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] overflow-hidden flex flex-col md:flex-row shadow-xs hover:border-[#E63946] dark:hover:border-[#E63946] transition-all"
                  >
                    <div
                      onClick={() => onSelectArticle(article)}
                      className="md:w-1/2 aspect-[16/10] md:aspect-auto overflow-hidden cursor-pointer relative bg-[#EAEAEA] dark:bg-[#14171D]"
                    >
                      <img
                        src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                        }}
                      />
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#E63946] text-white text-[11px] font-black uppercase rounded">
                        Featured Lead
                      </span>
                    </div>

                    <div className="p-6 md:w-1/2 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-xs font-semibold uppercase text-[#E63946] mb-2">
                          <span>{article.category}</span>
                          <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readingTime} min read
                          </span>
                        </div>

                        <h3
                          onClick={() => onSelectArticle(article)}
                          className="font-serif font-bold text-xl sm:text-2xl leading-snug text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] dark:group-hover:text-[#E63946] cursor-pointer transition-colors mb-3"
                        >
                          {article.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-[#5F6368] dark:text-[#A7AAB0] line-clamp-3 leading-relaxed mb-4">
                          {article.summary}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-[#D9D9D5] dark:border-[#2E333D]">
                        <div className="flex items-center gap-2">
                          <img
                            src={article.author.avatar}
                            alt={article.author.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <span className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2] block">
                              {article.author.name}
                            </span>
                            <span className="text-[10px] text-[#5F6368] dark:text-[#A7AAB0]">
                              {article.author.role}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onToggleBookmark(article)}
                            className={`p-1.5 rounded hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors ${
                              isBookmarked(article.id) ? 'text-[#E63946]' : 'text-[#5F6368] dark:text-[#A7AAB0]'
                            }`}
                            aria-label="Save bookmark"
                          >
                            <Bookmark className={`w-4 h-4 ${isBookmarked(article.id) ? 'fill-current' : ''}`} />
                          </button>
                          <button
                            onClick={() => onShare(article)}
                            className="p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors"
                            aria-label="Share story"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              }

              if (isCompact) {
                return (
                  <article
                    key={article.id}
                    id={`article-card-${article.id}`}
                    className="p-5 rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] hover:border-[#E63946] dark:hover:border-[#E63946] transition-all flex flex-col justify-between group shadow-xs"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-[#E63946] mb-2">
                        <span>{article.category}</span>
                        <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {article.readingTime} min
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectArticle(article)}
                        className="font-serif font-bold text-base leading-snug text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] dark:group-hover:text-[#E63946] cursor-pointer transition-colors mb-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] line-clamp-2 leading-relaxed mb-3">
                        {article.summary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-[#D9D9D5] dark:border-[#2E333D] text-xs">
                      <span className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">{article.author.name}</span>
                      <button
                        onClick={() => onToggleBookmark(article)}
                        className={`p-1 rounded hover:text-[#E63946] transition-colors ${
                          isBookmarked(article.id) ? 'text-[#E63946]' : 'text-[#5F6368] dark:text-[#A7AAB0]'
                        }`}
                        aria-label="Save bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </article>
                );
              }

              // Standard Medium Card
              return (
                <article
                  key={article.id}
                  id={`article-card-${article.id}`}
                  className="rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] overflow-hidden flex flex-col justify-between group shadow-xs hover:border-[#E63946] dark:hover:border-[#E63946] transition-all"
                >
                  <div>
                    <div
                      onClick={() => onSelectArticle(article)}
                      className="aspect-[16/10] overflow-hidden cursor-pointer bg-[#EAEAEA] dark:bg-[#14171D]"
                    >
                      <img
                        src={article.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase text-[#E63946] mb-2">
                        <span>{article.category}</span>
                        <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                          <Clock className="w-2.5 h-2.5" />
                          {article.readingTime} min
                        </span>
                      </div>

                      <h3
                        onClick={() => onSelectArticle(article)}
                        className="font-serif font-bold text-lg leading-snug text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] dark:group-hover:text-[#E63946] cursor-pointer transition-colors mb-2"
                      >
                        {article.title}
                      </h3>

                      <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] line-clamp-3 leading-relaxed">
                        {article.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-[#111215] dark:text-[#F5F5F2]">
                      {article.author.name}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onToggleBookmark(article)}
                        className={`p-1.5 rounded hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors ${
                          isBookmarked(article.id) ? 'text-[#E63946]' : 'text-[#5F6368] dark:text-[#A7AAB0]'
                        }`}
                        aria-label="Save bookmark"
                      >
                        <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(article.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => onShare(article)}
                        className="p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors"
                        aria-label="Share"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
