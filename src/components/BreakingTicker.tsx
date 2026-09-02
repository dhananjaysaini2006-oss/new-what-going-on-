import React, { useState } from 'react';
import { Play, Pause, AlertCircle, ExternalLink } from 'lucide-react';
import { Article } from '../types';

interface BreakingTickerProps {
  articles?: Article[];
  items?: Article[];
  onSelectArticle?: (article: Article) => void;
}

export const BreakingTicker: React.FC<BreakingTickerProps> = ({ articles, items, onSelectArticle }) => {
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Curate breaking and high priority items safely
  const sourceList = articles || items || [];
  const tickerItems = (sourceList || []).slice(0, 8);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div
      className="border-b border-[#D9D9D5] dark:border-[#2E333D] bg-[#FFF5F5] dark:bg-[#1A1114] text-[#111215] dark:text-[#F5F5F2] overflow-hidden select-none transition-colors"
      role="region"
      aria-label="Breaking News Ticker"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-10">
        {/* Left Badge */}
        <div className="flex items-center gap-2 flex-shrink-0 z-10 pr-3 border-r border-[#E63946]/20 bg-[#FFF5F5] dark:bg-[#1A1114]">
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 bg-[#E63946] text-white text-[11px] font-black uppercase tracking-widest rounded shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
            BREAKING
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] uppercase font-bold text-[#E63946] tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></span>
            LIVE WIRE
          </span>
        </div>

        {/* Scrolling News Ticker */}
        <div
          className="flex-1 overflow-hidden relative mx-3"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`animate-ticker flex items-center gap-8 ${isPaused ? 'ticker-paused' : ''}`}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
          >
            {/* Duplicated list for seamless infinite loop */}
            {[...tickerItems, ...tickerItems].map((art, idx) => (
              <button
                key={`${art.id}-${idx}`}
                id={`ticker-item-${art.id}-${idx}`}
                onClick={() => onSelectArticle?.(art)}
                className="flex items-center gap-2 text-xs font-medium text-[#111215] dark:text-[#F5F5F2] hover:text-[#E63946] dark:hover:text-[#E63946] focus:outline-none focus:text-[#E63946] whitespace-nowrap transition-colors text-left"
              >
                <span className="font-bold text-[#E63946] bg-[#E63946]/10 px-1.5 py-0.5 rounded text-[10px]">
                  {art.sourceName || art.category}
                </span>
                <span className="underline decoration-dotted decoration-[#D9D9D5] hover:decoration-[#E63946] underline-offset-2">
                  {art.title}
                </span>
                <span className="text-[#D9D9D5] dark:text-[#2E333D] ml-2">///</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right Pause/Play Accessible Control */}
        <div className="flex-shrink-0 z-10 pl-2">
          <button
            id="ticker-toggle-pause-btn"
            onClick={togglePause}
            className="p-1 rounded text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            aria-label={isPaused ? 'Play breaking news ticker' : 'Pause breaking news ticker'}
            title={isPaused ? 'Resume Ticker' : 'Pause Ticker'}
          >
            {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
};
