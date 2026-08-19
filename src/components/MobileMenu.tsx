import React from 'react';
import { CategoryType, EditionType } from '../types';
import { X, Search, Bookmark, Mail, Sun, Moon, Globe, ChevronRight } from 'lucide-react';
import { ThemeMode } from '../utils/theme';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (cat: CategoryType) => void;
  currentEdition: EditionType;
  onSelectEdition: (edition: EditionType) => void;
  onOpenSearch: () => void;
  onOpenBookmarks: () => void;
  onOpenNewsletter: () => void;
  bookmarkCount: number;
  theme: ThemeMode;
  onToggleTheme: () => void;
  onRefreshLiveNews?: () => void;
  isSyncingNews?: boolean;
  lastSyncedTime?: Date;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
  currentEdition,
  onSelectEdition,
  onOpenSearch,
  onOpenBookmarks,
  onOpenNewsletter,
  bookmarkCount,
  theme,
  onToggleTheme,
  onRefreshLiveNews,
  isSyncingNews = false,
  lastSyncedTime,
}) => {
  if (!isOpen) return null;

  const editions: EditionType[] = ['India', 'Global', 'Tech', 'Markets', 'Politics', 'Climate', 'Sports'];

  return (
    <div
      id="mobile-menu-overlay"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="mobile-menu-drawer"
        onClick={(e) => e.stopPropagation()}
        className="w-4/5 max-w-sm bg-[#FBFBF9] dark:bg-[#14171D] h-full shadow-2xl flex flex-col border-r border-[#D9D9D5] dark:border-[#2E333D] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-4 border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between bg-white dark:bg-[#1A1D24]">
          <div>
            <h3 className="font-display font-bold text-lg text-[#111215] dark:text-[#F5F5F2]">
              WHAT’S GOING ON
            </h3>
            <p className="text-[10px] uppercase tracking-widest text-[#5F6368] dark:text-[#A7AAB0]">
              The Pulse of India & Global Reality
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#5F6368] hover:text-[#111215] dark:text-[#A7AAB0] dark:hover:text-white"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Shortcuts */}
        <div className="p-4 grid grid-cols-2 gap-2 bg-[#F4F4F0] dark:bg-[#1F242D] border-b border-[#D9D9D5] dark:border-[#2E333D]">
          <button
            onClick={() => {
              onClose();
              onOpenSearch();
            }}
            className="flex items-center gap-2 p-2.5 bg-white dark:bg-[#1A1D24] rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-semibold text-[#111215] dark:text-[#F5F5F2]"
          >
            <Search className="w-4 h-4 text-[#E63946]" />
            <span>Search</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onOpenBookmarks();
            }}
            className="flex items-center justify-between p-2.5 bg-white dark:bg-[#1A1D24] rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-semibold text-[#111215] dark:text-[#F5F5F2]"
          >
            <div className="flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-[#E63946]" />
              <span>Saved</span>
            </div>
            {bookmarkCount > 0 && (
              <span className="px-1.5 py-0.5 bg-[#E63946] text-white text-[10px] rounded-full font-bold">
                {bookmarkCount}
              </span>
            )}
          </button>
        </div>

        {/* Live News Sync Button in Mobile Drawer */}
        {onRefreshLiveNews && (
          <div className="px-4 py-2.5 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                {isSyncingNews ? 'Syncing Dispatches...' : 'Live Wire Active'}
              </span>
            </div>
            <button
              onClick={() => {
                onRefreshLiveNews();
              }}
              disabled={isSyncingNews}
              className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1 shadow-xs"
            >
              <span>Refresh</span>
            </button>
          </div>
        )}

        {/* Category List */}
        <div className="flex-1 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] mb-2 px-2">
            Editorial Desks
          </div>
          <ul className="space-y-1">
            {categories.map((cat) => (
              <li key={cat}>
                <button
                  onClick={() => {
                    onSelectCategory(cat);
                    onClose();
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm font-semibold flex items-center justify-between transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#E63946] text-white'
                      : 'text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24]'
                  }`}
                >
                  <span>{cat === 'All' ? 'Front Page' : cat}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              </li>
            ))}
          </ul>

          {/* Regional Edition Section */}
          <div className="mt-6 pt-4 border-t border-[#D9D9D5] dark:border-[#2E333D]">
            <div className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] mb-2 px-2 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-[#E63946]" />
              <span>Regional Editions</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {editions.map((ed) => (
                <button
                  key={ed}
                  onClick={() => onSelectEdition(ed)}
                  className={`px-2.5 py-1.5 rounded text-xs text-left font-medium transition-colors ${
                    currentEdition === ed
                      ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215] font-bold'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0] border border-[#D9D9D5] dark:border-[#2E333D]'
                  }`}
                >
                  {ed} Edition
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#D9D9D5] dark:border-[#2E333D] bg-white dark:bg-[#1A1D24] space-y-2">
          <button
            onClick={() => {
              onClose();
              onOpenNewsletter();
            }}
            className="w-full py-2.5 bg-[#E63946] text-white font-bold text-xs uppercase tracking-wider rounded-md flex items-center justify-center gap-2 shadow-sm"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Subscribe to Morning Brief</span>
          </button>

          <button
            onClick={onToggleTheme}
            className="w-full py-2 bg-[#F4F4F0] dark:bg-[#252A34] text-[#111215] dark:text-[#F5F5F2] font-semibold text-xs rounded-md flex items-center justify-center gap-2"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            <span>Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode</span>
          </button>
        </div>
      </div>
    </div>
  );
};
