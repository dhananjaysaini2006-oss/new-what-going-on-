import React, { useState, useEffect, useRef } from 'react';
import { Article, CategoryType } from '../types';
import { Search, X, Clock, ArrowRight, CornerDownLeft, Sparkles } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      setQuery('');
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();

  const results = articles.filter((article) => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const inTitle = article.title.toLowerCase().includes(normalizedQuery);
    const inSummary = article.summary.toLowerCase().includes(normalizedQuery);
    const inAuthor = article.author.name.toLowerCase().includes(normalizedQuery);
    const inTags = article.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
    const inContent = article.content.some((p) => p.toLowerCase().includes(normalizedQuery));

    return inTitle || inSummary || inAuthor || inTags || inContent;
  });

  const categories = ['All', 'World', 'India', 'Politics', 'AI & Tech', 'Business', 'Markets', 'Climate', 'Science', 'Culture', 'Sports', 'Opinion'];

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} className="bg-amber-200 dark:bg-amber-900/60 dark:text-amber-100 px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div
      id="search-modal-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 md:p-12 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        id="search-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded-xl shadow-2xl overflow-hidden flex flex-col my-auto transition-all"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#E63946] flex-shrink-0" />
          <input
            ref={inputRef}
            id="search-query-input"
            type="text"
            placeholder="Search headlines, authors, topics, or full investigative texts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-base sm:text-lg text-[#111215] dark:text-[#F5F5F2] outline-none placeholder:text-[#5F6368] dark:placeholder:text-[#A7AAB0]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded text-[#5F6368] hover:text-[#111215] dark:text-[#A7AAB0] dark:hover:text-white"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold bg-[#F4F4F0] dark:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0] rounded border border-[#D9D9D5] dark:border-[#2E333D] hover:bg-[#EAEAEA]"
          >
            ESC
          </button>
        </div>

        {/* Category Filters inside Search */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#FBFBF9] dark:bg-[#14171D] border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] font-bold uppercase text-[#5F6368] dark:text-[#A7AAB0] mr-1 flex-shrink-0">
            Topic:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215] font-bold'
                  : 'bg-white dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0] border border-[#D9D9D5] dark:border-[#2E333D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Metadata Bar */}
        <div className="px-4 sm:px-6 py-2 text-xs font-semibold text-[#5F6368] dark:text-[#A7AAB0] bg-white dark:bg-[#1A1D24] border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between">
          <span>
            Showing <strong className="text-[#111215] dark:text-[#F5F5F2]">{results.length}</strong> matching{' '}
            {results.length === 1 ? 'article' : 'articles'}
          </span>
          {query && (
            <span className="text-[11px]">
              Query: <em className="text-[#E63946]">"{query}"</em>
            </span>
          )}
        </div>

        {/* Search Results List */}
        <div className="max-h-[60vh] overflow-y-auto divide-y divide-[#D9D9D5] dark:divide-[#2E333D] p-2 sm:p-4">
          {results.length === 0 ? (
            <div className="py-12 text-center text-[#5F6368] dark:text-[#A7AAB0]">
              <Sparkles className="w-8 h-8 mx-auto text-[#B7A58A] mb-2 opacity-50" />
              <p className="text-sm font-bold text-[#111215] dark:text-[#F5F5F2]">No matching dispatches found</p>
              <p className="text-xs mt-1">Try refining your search terms or selecting 'All' sections.</p>
            </div>
          ) : (
            results.map((art) => (
              <div
                key={art.id}
                id={`search-result-${art.id}`}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="p-3 sm:p-4 hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] rounded-lg cursor-pointer transition-colors flex items-start gap-4 group"
              >
                <div className="w-20 h-16 sm:w-24 sm:h-18 rounded overflow-hidden flex-shrink-0 bg-[#EAEAEA] dark:bg-[#14171D]">
                  <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase text-[#E63946] mb-1">
                    <span>{art.category}</span>
                    <span className="text-[#D9D9D5] dark:text-[#2E333D]">•</span>
                    <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {art.readingTime} min read
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] transition-colors leading-snug mb-1">
                    {highlightText(art.title, query)}
                  </h4>

                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] line-clamp-2 leading-relaxed">
                    {highlightText(art.summary, query)}
                  </p>

                  <div className="flex items-center gap-2 mt-2 text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">
                    <span>By {highlightText(art.author.name, query)}</span>
                  </div>
                </div>

                <div className="self-center hidden sm:block text-[#5F6368] group-hover:text-[#E63946] group-hover:translate-x-1 transition-all">
                  <CornerDownLeft className="w-4 h-4" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
