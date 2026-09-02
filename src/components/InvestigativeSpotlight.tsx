import React from 'react';
import { Article } from '../types';
import { ShieldAlert, ArrowRight, FileText, Bookmark, Share2 } from 'lucide-react';

interface InvestigativeSpotlightProps {
  article: Article;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (article: Article) => void;
  isBookmarked: (id: string) => boolean;
  onShare: (article: Article) => void;
}

export const InvestigativeSpotlight: React.FC<InvestigativeSpotlightProps> = ({
  article,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onShare,
}) => {
  if (!article) return null;

  return (
    <section className="py-12 bg-[#111215] text-[#F5F5F2] border-b border-[#2E333D] relative overflow-hidden transition-colors">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E63946]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <span className="flex items-center gap-1.5 px-3 py-1 bg-[#E63946] text-white text-xs font-black uppercase tracking-widest rounded shadow-md">
            <ShieldAlert className="w-3.5 h-3.5" />
            SPECIAL INVESTIGATION
          </span>
          <span className="text-xs text-[#B7A58A] font-semibold tracking-wider uppercase">
            Four-Month Cross-Border Inquiry
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text & Findings (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h2
              onClick={() => onSelectArticle(article)}
              className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white hover:text-[#E63946] cursor-pointer transition-colors"
            >
              {article.title}
            </h2>

            {article.subtitle && (
              <p className="text-sm sm:text-base text-[#B7A58A] font-medium leading-relaxed">
                {article.subtitle}
              </p>
            )}

            <p className="text-sm text-[#A7AAB0] leading-relaxed line-clamp-4">
              {article.summary}
            </p>

            {article.pullQuote && (
              <blockquote className="border-l-2 border-[#E63946] pl-4 py-1 italic font-serif text-sm sm:text-base text-[#F5F5F2]/90">
                "{article.pullQuote}"
              </blockquote>
            )}

            {/* Investigative Metadata and Action */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[#B7A58A]/30"
                />
                <div>
                  <div className="text-xs font-bold text-white">{article.author.name}</div>
                  <div className="text-[11px] text-[#A7AAB0]">{article.author.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onToggleBookmark(article)}
                  className={`p-2 rounded border border-white/20 hover:bg-white/10 transition-colors ${
                    isBookmarked(article.id) ? 'text-[#E63946] border-[#E63946]' : 'text-white'
                  }`}
                  aria-label="Bookmark investigation"
                  title="Bookmark investigation"
                >
                  <Bookmark className={`w-4 h-4 ${isBookmarked(article.id) ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onShare(article)}
                  className="p-2 rounded border border-white/20 text-white hover:bg-white/10 transition-colors"
                  aria-label="Share investigation"
                  title="Share investigation"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onSelectArticle(article)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#E63946] text-white text-xs font-bold uppercase tracking-wider rounded hover:bg-[#c92a37] transition-all shadow-lg"
                >
                  <span>Read Full Dossier</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Photographic Visual (5 cols) */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onSelectArticle(article)}
              className="relative rounded-lg overflow-hidden border border-white/10 aspect-[4/3] cursor-pointer group shadow-2xl"
            >
              <img
                src={article.image || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80'}
                alt={article.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              {article.imageCaption && (
                <div className="absolute bottom-3 left-3 right-3 text-xs text-white/90">
                  <p className="line-clamp-2">{article.imageCaption}</p>
                  {article.imageCredit && (
                    <span className="text-[10px] text-[#B7A58A] mt-0.5 block">{article.imageCredit}</span>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
