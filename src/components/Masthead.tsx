import React from 'react';
import { Search, Bookmark, Mail, Menu, Sparkles, PenTool } from 'lucide-react';
import { EditionType } from '../types';

interface MastheadProps {
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenNewsletter: () => void;
  onOpenMobileMenu: () => void;
  bookmarkCount: number;
  currentEdition: EditionType;
}

export const Masthead: React.FC<MastheadProps> = ({
  onOpenSearch,
  onOpenBookmarks,
  onOpenNewsletter,
  onOpenMobileMenu,
  bookmarkCount,
  currentEdition,
}) => {
  return (
    <header className="border-b border-[#D9D9D5] dark:border-[#2E333D] bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors py-4 sm:py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left: Mobile Menu & Edition Badge */}
          <div className="flex items-center gap-3 flex-1">
            <button
              id="mobile-menu-btn"
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#EFEFEA] dark:bg-[#1C2028] text-[11px] font-semibold text-[#5F6368] dark:text-[#A7AAB0] uppercase tracking-wider">
              <span>{currentEdition} Edition</span>
            </span>
          </div>

          {/* Center Brand Identity */}
          <div className="flex-2 text-center">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group focus:outline-none"
              aria-label="What's Going On Homepage"
            >
              <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-[#111215] dark:text-[#F5F5F2] transition-colors group-hover:opacity-90">
                WHAT’S GOING ON
              </h1>
              <p className="mt-1 font-sans-ui text-[11px] sm:text-xs md:text-sm font-semibold tracking-[0.25em] sm:tracking-[0.35em] text-[#5F6368] dark:text-[#A7AAB0] uppercase">
                The Pulse of India & Global Reality
              </p>
            </a>
          </div>

          {/* Right Action Elements: Reader-only actions */}
          <div className="flex items-center justify-end gap-2 sm:gap-3 flex-1">
            {/* Search Button */}
            <button
              id="masthead-search-btn"
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-medium text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-all"
              aria-label="Search articles"
            >
              <Search className="w-3.5 h-3.5 text-[#5F6368] dark:text-[#A7AAB0]" />
              <span className="hidden md:inline">Search</span>
              <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-[#EAEAEA] dark:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0] rounded border border-[#D9D9D5] dark:border-[#2E333D]">
                ⌘K
              </kbd>
            </button>

            {/* Bookmarks Drawer Trigger */}
            <button
              id="masthead-bookmarks-btn"
              onClick={onOpenBookmarks}
              className="relative p-2 rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-all"
              aria-label={`View ${bookmarkCount} saved bookmarks`}
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span
                  id="bookmark-badge-count"
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E63946] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Newsletter Subscribe Trigger */}
            <button
              id="masthead-subscribe-btn"
              onClick={onOpenNewsletter}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#111215] dark:bg-[#F5F5F2] text-[#FBFBF9] dark:text-[#111215] text-xs font-bold uppercase tracking-wider rounded-md hover:bg-[#E63946] dark:hover:bg-[#E63946] dark:hover:text-white transition-all shadow-sm"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Daily Edition</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
