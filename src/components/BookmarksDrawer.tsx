import React from 'react';
import { BookmarkItem, Article } from '../types';
import { Bookmark, X, Trash2, Clock, ArrowRight, BookOpen } from 'lucide-react';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarks: BookmarkItem[];
  articles: Article[];
  onSelectArticleById: (id: string) => void;
  onRemoveBookmark: (id: string) => void;
  onClearAll: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarks,
  articles,
  onSelectArticleById,
  onRemoveBookmark,
  onClearAll,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="bookmarks-drawer-overlay"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        id="bookmarks-drawer-panel"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-[#FBFBF9] dark:bg-[#14171D] h-full shadow-2xl flex flex-col border-l border-[#D9D9D5] dark:border-[#2E333D] transition-all transform animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between bg-white dark:bg-[#1A1D24]">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#E63946] fill-current" />
            <h3 className="font-display font-bold text-lg text-[#111215] dark:text-[#F5F5F2]">
              Reading List & Saved
            </h3>
            <span className="px-2 py-0.5 bg-[#E63946] text-white text-[11px] font-bold rounded-full">
              {bookmarks.length}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#5F6368] hover:text-[#111215] dark:text-[#A7AAB0] dark:hover:text-white rounded transition-colors"
            aria-label="Close bookmarks drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Clear All action if items exist */}
        {bookmarks.length > 0 && (
          <div className="px-4 py-2 bg-[#F4F4F0] dark:bg-[#1F242D] border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between text-xs">
            <span className="text-[#5F6368] dark:text-[#A7AAB0]">Saved locally on your device</span>
            <button
              onClick={onClearAll}
              className="text-[#E63946] hover:underline font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All
            </button>
          </div>
        )}

        {/* Bookmarks List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {bookmarks.length === 0 ? (
            <div className="py-20 text-center text-[#5F6368] dark:text-[#A7AAB0]">
              <BookOpen className="w-12 h-12 mx-auto text-[#B7A58A] mb-3 opacity-50" />
              <p className="text-sm font-bold text-[#111215] dark:text-[#F5F5F2]">No articles bookmarked yet</p>
              <p className="text-xs mt-1 max-w-xs mx-auto">
                Click the bookmark icon on any headline to save dispatches for offline review.
              </p>
            </div>
          ) : (
            bookmarks.map((item) => (
              <div
                key={item.id}
                id={`bookmark-drawer-item-${item.id}`}
                className="p-3 bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded-lg shadow-xs hover:border-[#E63946] transition-all flex items-start gap-3 group"
              >
                <div
                  onClick={() => {
                    onSelectArticleById(item.id);
                    onClose();
                  }}
                  className="w-16 h-16 rounded overflow-hidden flex-shrink-0 cursor-pointer bg-[#EAEAEA]"
                >
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase text-[#E63946] mb-1">
                    <span>{item.category}</span>
                    <span className="text-[#5F6368] dark:text-[#A7AAB0] font-normal lowercase flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      {item.readingTime} min
                    </span>
                  </div>

                  <h4
                    onClick={() => {
                      onSelectArticleById(item.id);
                      onClose();
                    }}
                    className="font-serif font-bold text-sm text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] cursor-pointer line-clamp-2 leading-snug mb-1 transition-colors"
                  >
                    {item.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-[#5F6368] dark:text-[#A7AAB0] pt-1">
                    <span>By {item.authorName}</span>
                    <button
                      onClick={() => onRemoveBookmark(item.id)}
                      className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-1"
                      title="Remove from saved"
                      aria-label="Remove bookmark"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#D9D9D5] dark:border-[#2E333D] bg-white dark:bg-[#1A1D24] text-center">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-[#111215] dark:bg-[#F5F5F2] text-[#FBFBF9] dark:text-[#111215] font-bold text-xs uppercase tracking-wider rounded hover:bg-[#E63946] dark:hover:bg-[#E63946] dark:hover:text-white transition-colors"
          >
            Close List
          </button>
        </div>
      </div>
    </div>
  );
};
