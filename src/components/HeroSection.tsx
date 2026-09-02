import React from 'react';
import { Article } from '../types';
import { Clock, Bookmark, ArrowRight, Sparkles, Share2 } from 'lucide-react';

interface HeroSectionProps {
  mainArticle: Article;
  supportingArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onShare: (article: Article) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  mainArticle,
  supportingArticles,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
}) => {
  if (!mainArticle) return null;

  return (
    <section className="py-6 sm:py-8 border-b border-[#D9D9D5] dark:border-[#2E333D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Lead Story (Left 8 columns on desktop) */}
          <div className="lg:col-span-8 group">
            <div className="relative overflow-hidden rounded-md bg-[#EAEAEA] dark:bg-[#1A1D24] aspect-[16/9] mb-5 border border-[#D9D9D5] dark:border-[#2E333D]">
              <img
                src={mainArticle.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
                alt={mainArticle.title}
                className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 ease-out"
                loading="eager"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-3 py-1 bg-[#E63946] text-white text-xs font-black uppercase tracking-wider rounded shadow-md">
                  Lead Dispatch
                </span>
                <span className="px-2.5 py-1 bg-black/75 backdrop-blur-md text-white text-xs font-semibold uppercase tracking-wider rounded">
                  {mainArticle.category}
                </span>
              </div>
              {mainArticle.imageCredit && (
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-xs text-[10px] text-white/90 rounded">
                  {mainArticle.imageCredit}
                </span>
              )}
            </div>

            {/* Category & Meta */}
            <div className="flex items-center justify-between gap-4 mb-2.5">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase text-[#E63946]">
                <span>{mainArticle.category}</span>
                <span className="text-[#D9D9D5] dark:text-[#2E333D]">•</span>
                <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {mainArticle.readingTime} min read
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id={`hero-bookmark-${mainArticle.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleBookmark(mainArticle);
                  }}
                  className={`p-1.5 rounded hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors ${
                    isBookmarked(mainArticle.id) ? 'text-[#E63946]' : 'text-[#5F6368] dark:text-[#A7AAB0]'
                  }`}
                  aria-label="Bookmark article"
                  title="Save article"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(mainArticle.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  id={`hero-share-${mainArticle.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare(mainArticle);
                  }}
                  className="p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors"
                  aria-label="Share article"
                  title="Share article"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Headline */}
            <h2
              id={`hero-title-${mainArticle.id}`}
              onClick={() => onSelectArticle(mainArticle)}
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight sm:leading-tight md:leading-tight text-[#111215] dark:text-[#F5F5F2] hover:text-[#E63946] dark:hover:text-[#E63946] cursor-pointer transition-colors mb-3"
            >
              {mainArticle.title}
            </h2>

            {/* Subtitle / Summary */}
            <p className="text-sm sm:text-base text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed mb-4 max-w-3xl">
              {mainArticle.summary}
            </p>

            {/* Author & Read Action */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-[#D9D9D5] dark:border-[#2E333D]">
              <div className="flex items-center gap-3">
                <img
                  src={mainArticle.author.avatar}
                  alt={mainArticle.author.name}
                  className="w-9 h-9 rounded-full object-cover border border-[#D9D9D5] dark:border-[#2E333D]"
                />
                <div>
                  <div className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2]">
                    {mainArticle.author.name}
                  </div>
                  <div className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">
                    {mainArticle.author.role} {mainArticle.author.location ? `• ${mainArticle.author.location}` : ''}
                  </div>
                </div>
              </div>

              <button
                id="hero-read-full-btn"
                onClick={() => onSelectArticle(mainArticle)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111215] dark:bg-[#F5F5F2] text-[#FBFBF9] dark:text-[#111215] text-xs font-bold uppercase tracking-wider rounded hover:bg-[#E63946] dark:hover:bg-[#E63946] dark:hover:text-white transition-all shadow-xs"
              >
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Supporting Stories Sidebar (Right 4 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-6 lg:border-l lg:border-[#D9D9D5] lg:dark:border-[#2E333D] lg:pl-8">
            <div className="flex items-center justify-between pb-2 border-b-2 border-[#111215] dark:border-[#F5F5F2]">
              <h3 className="font-sans text-xs font-bold tracking-widest uppercase text-[#111215] dark:text-[#F5F5F2] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E63946]" />
                Top Analytical Dispatches
              </h3>
            </div>

            <div className="divide-y divide-[#D9D9D5] dark:divide-[#2E333D]">
              {supportingArticles.map((art, idx) => (
                <article key={art.id} className="py-4 first:pt-0 last:pb-0 group">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#E63946] mb-1.5">
                    <span>{art.category}</span>
                    <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {art.readingTime} min
                    </span>
                  </div>

                  {idx === 0 && (
                    <div
                      onClick={() => onSelectArticle(art)}
                      className="relative overflow-hidden rounded mb-3 cursor-pointer aspect-[16/10] bg-[#EAEAEA] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D]"
                    >
                      <img
                        src={art.image || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80'}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  )}

                  <h4
                    id={`supporting-title-${art.id}`}
                    onClick={() => onSelectArticle(art)}
                    className="font-serif font-bold text-lg leading-snug text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] dark:group-hover:text-[#E63946] cursor-pointer transition-colors mb-1.5"
                  >
                    {art.title}
                  </h4>

                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] line-clamp-2 leading-relaxed mb-2.5">
                    {art.summary}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">
                    <span className="font-medium text-[#111215] dark:text-[#F5F5F2]">{art.author.name}</span>
                    <button
                      id={`supporting-bookmark-${art.id}`}
                      onClick={() => onToggleBookmark(art)}
                      className={`hover:text-[#E63946] transition-colors p-1 ${
                        isBookmarked(art.id) ? 'text-[#E63946]' : ''
                      }`}
                      aria-label="Save article"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isBookmarked(art.id) ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
