import React, { useState } from 'react';
import { BriefingItem, Article } from '../types';
import { Clock, ArrowUpRight, Zap, Filter, Radio } from 'lucide-react';

interface BriefingSectionProps {
  briefings?: BriefingItem[];
  articles?: Article[];
  onSelectArticleById: (id: string) => void;
}

export const BriefingSection: React.FC<BriefingSectionProps> = ({
  briefings = [],
  articles = [],
  onSelectArticleById,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Convert latest live articles to dynamic briefing items if articles are provided
  const liveBriefings: BriefingItem[] = (articles && articles.length > 0)
    ? articles.slice(0, 8).map((art, idx) => {
        let relTime = 'Just now';
        try {
          const diffMs = Date.now() - new Date(art.publishedAt).getTime();
          const mins = Math.max(1, Math.floor(diffMs / 60000));
          if (mins < 60) relTime = `${mins}m ago`;
          else {
            const hours = Math.floor(mins / 60);
            if (hours < 24) relTime = `${hours}h ago`;
            else relTime = `${Math.floor(hours / 24)}d ago`;
          }
        } catch {
          relTime = `${(idx + 1) * 12}m ago`;
        }

        return {
          id: `briefing-live-${art.id}`,
          timestamp: relTime,
          category: art.category || 'General',
          update: art.title,
          impact: (idx === 0 ? 'High' : idx === 1 ? 'Developing' : 'Standard') as 'High' | 'Developing' | 'Standard',
          articleId: art.id,
        };
      })
    : briefings;

  const itemsToDisplay = liveBriefings.length > 0 ? liveBriefings : briefings;

  const filteredBriefings =
    filterCategory === 'All'
      ? itemsToDisplay
      : itemsToDisplay.filter((b) => b.category.toLowerCase() === filterCategory.toLowerCase() || (filterCategory === 'India' && b.category === 'National'));

  const categories = ['All', 'India', 'Politics', 'AI & Tech', 'Business', 'Markets', 'Climate', 'Sports'];

  return (
    <section className="py-8 sm:py-10 bg-[#F4F4F0] dark:bg-[#14171D] border-b border-[#D9D9D5] dark:border-[#2E333D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#D9D9D5] dark:border-[#2E333D]">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#E63946] mb-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E63946] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#E63946]"></span>
              </span>
              <span>LIVE PULSE DISPATCH</span>
            </div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111215] dark:text-[#F5F5F2] tracking-tight">
              60-SECOND BRIEFING
            </h2>
            <p className="text-xs sm:text-sm text-[#5F6368] dark:text-[#A7AAB0] mt-0.5">
              Rapid intelligence stream, continuously updated from active global and national wires.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <span className="text-xs font-bold text-[#5F6368] dark:text-[#A7AAB0] mr-1 hidden sm:inline flex items-center gap-1">
              <Filter className="w-3 h-3" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                id={`briefing-filter-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-full font-medium transition-all ${
                  filterCategory === cat
                    ? 'bg-[#111215] text-[#FBFBF9] dark:bg-[#F5F5F2] dark:text-[#111215] font-bold'
                    : 'bg-white dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-[#F5F5F2] border border-[#D9D9D5] dark:border-[#2E333D]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Stream */}
        <div className="relative mt-8">
          {/* Vertical Timeline Guide Line */}
          <div className="hidden sm:block absolute top-0 bottom-0 left-[118px] w-px bg-[#D9D9D5] dark:bg-[#2E333D]"></div>

          <div className="space-y-4 sm:space-y-6">
            {filteredBriefings.map((item) => (
              <div
                key={item.id}
                id={`briefing-item-${item.id}`}
                className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 p-4 rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] hover:border-[#E63946] dark:hover:border-[#E63946] shadow-xs transition-all"
              >
                {/* Timestamp & Impact badge */}
                <div className="flex sm:flex-col items-center sm:items-start justify-between w-full sm:w-24 flex-shrink-0">
                  <span className="font-mono text-xs font-bold text-[#E63946] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.timestamp}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded mt-0.5 ${
                      item.impact === 'High'
                        ? 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300'
                        : item.impact === 'Developing'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {item.impact}
                  </span>
                </div>

                {/* Timeline node */}
                <div className="hidden sm:flex absolute left-[114px] w-2.5 h-2.5 rounded-full bg-white dark:bg-[#1A1D24] border-2 border-[#E63946] z-10 group-hover:scale-125 transition-transform"></div>

                {/* Content */}
                <div className="flex-1 min-w-0 sm:pl-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0]">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-[#111215] dark:text-[#F5F5F2] leading-relaxed">
                    {item.update}
                  </p>
                </div>

                {/* Action Link */}
                {item.articleId && (
                  <button
                    id={`briefing-read-${item.id}`}
                    onClick={() => onSelectArticleById(item.articleId!)}
                    className="flex-shrink-0 inline-flex items-center gap-1 text-xs font-bold text-[#E63946] hover:underline underline-offset-4 group-hover:translate-x-0.5 transition-transform cursor-pointer"
                    aria-label={`Read report about ${item.update}`}
                  >
                    <span>Read Report</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

