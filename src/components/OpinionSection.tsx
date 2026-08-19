import React from 'react';
import { Columnist, Article } from '../types';
import { Quote, ArrowRight } from 'lucide-react';

interface OpinionSectionProps {
  columnists: Columnist[];
  articles: Article[];
  onSelectArticleById: (id: string) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({ columnists, articles, onSelectArticleById }) => {
  return (
    <section className="py-10 sm:py-14 border-b border-[#D9D9D5] dark:border-[#2E333D] bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b-2 border-[#111215] dark:border-[#F5F5F2] mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B7A58A] flex items-center gap-1.5 mb-1">
              <Quote className="w-3.5 h-3.5 fill-current" />
              VOICES & PERSPECTIVES
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111215] dark:text-[#F5F5F2]">
              OPINION & ANALYSIS
            </h2>
          </div>
        </div>

        {/* 4-column Grid for Columnists */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {columnists.map((col) => (
            <div
              key={col.id}
              id={`columnist-card-${col.id}`}
              onClick={() => onSelectArticleById(col.articleId)}
              className="p-5 rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] hover:border-[#B7A58A] dark:hover:border-[#B7A58A] flex flex-col justify-between cursor-pointer group shadow-xs transition-all"
            >
              <div>
                {/* Columnist Portrait & Role */}
                <div className="flex items-center gap-3 mb-4">
                  <img
                    src={col.avatar}
                    alt={col.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#B7A58A] shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] transition-colors">
                      {col.name}
                    </h4>
                    <p className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0] leading-tight">
                      {col.role}
                    </p>
                  </div>
                </div>

                <div className="text-[10px] font-bold uppercase tracking-wider text-[#B7A58A] mb-2">
                  {col.category}
                </div>

                {/* Headline in Serif */}
                <h3 className="font-serif italic font-bold text-base text-[#111215] dark:text-[#F5F5F2] leading-snug mb-3 group-hover:text-[#E63946] transition-colors">
                  "{col.headline}"
                </h3>

                <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed line-clamp-3">
                  {col.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between text-xs font-bold text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946]">
                <span>Read Column</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
