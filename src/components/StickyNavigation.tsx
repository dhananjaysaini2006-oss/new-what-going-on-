import React from 'react';
import { CategoryType } from '../types';
import { Search, Bookmark, Sun, Moon, Flame } from 'lucide-react';
import { ThemeMode } from '../utils/theme';

interface StickyNavigationProps {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  bookmarkCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onOpenQuiz?: () => void;
}

export const StickyNavigation: React.FC<StickyNavigationProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenBookmarks,
  bookmarkCount,
  theme,
  onToggleTheme,
  onOpenQuiz,
}) => {
  return (
    <nav className="sticky top-0 z-40 bg-[#FBFBF9]/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-[#D9D9D5] dark:border-[#2E333D] transition-colors shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4 h-12">
          {/* Horizontally scrollable category list */}
          <div className="flex-1 overflow-x-auto no-scrollbar py-2">
            <ul className="flex items-center gap-1 sm:gap-2 whitespace-nowrap text-xs font-semibold uppercase tracking-wider">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <li key={cat}>
                    <button
                      id={`nav-category-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      onClick={() => onSelectCategory(cat)}
                      className={`relative px-3 py-1.5 rounded-full transition-all duration-200 ${
                        isActive
                          ? 'bg-[#111215] text-[#FBFBF9] dark:bg-[#F5F5F2] dark:text-[#111215] shadow-xs'
                          : 'text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24]'
                      }`}
                    >
                      <span>{cat === 'All' ? 'Front Page' : cat}</span>
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-0.5 bg-[#E63946] rounded-full sm:hidden"></span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick utility triggers on the sticky bar */}
          <div className="flex items-center gap-1.5 sm:gap-2 border-l border-[#D9D9D5] dark:border-[#2E333D] pl-2 sm:pl-3 flex-shrink-0">
            {/* Daily Quiz Shortcut */}
            {onOpenQuiz && (
              <button
                id="sticky-quiz-btn"
                onClick={onOpenQuiz}
                className="p-1.5 rounded text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                aria-label="Daily News Quiz"
                title="Play Daily Indian News Quiz"
              >
                <Flame className="w-4 h-4 fill-current" />
              </button>
            )}

            <button
              id="sticky-search-btn"
              onClick={onOpenSearch}
              className="p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors"
              aria-label="Search"
              title="Search articles (⌘K)"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              id="sticky-bookmarks-btn"
              onClick={onOpenBookmarks}
              className="relative p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors"
              aria-label="Saved Articles"
              title="Saved Articles"
            >
              <Bookmark className="w-4 h-4" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#E63946] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              id="sticky-theme-btn"
              onClick={onToggleTheme}
              className="p-1.5 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors"
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

