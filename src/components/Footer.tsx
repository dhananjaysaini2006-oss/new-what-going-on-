import React from 'react';
import { CategoryType } from '../types';
import { ArrowUp, Shield, Rss } from 'lucide-react';

interface FooterProps {
  onSelectCategory: (cat: CategoryType) => void;
  onOpenNewsletter: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenNewsletter }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections: { label: string; cat: CategoryType }[] = [
    { label: 'World News', cat: 'World' },
    { label: 'India Dispatch', cat: 'India' },
    { label: 'Politics & Governance', cat: 'Politics' },
    { label: 'AI & Advanced Tech', cat: 'AI & Tech' },
    { label: 'Business & Enterprise', cat: 'Business' },
    { label: 'Financial Markets', cat: 'Markets' },
    { label: 'Climate & Oceans', cat: 'Climate' },
    { label: 'Science & Frontiers', cat: 'Science' },
    { label: 'Culture & Living', cat: 'Culture' },
    { label: 'Global Sports', cat: 'Sports' },
    { label: 'Opinion & Columns', cat: 'Opinion' },
  ];

  return (
    <footer className="bg-[#111215] text-[#F5F5F2] pt-14 pb-10 border-t border-[#2E333D] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Masthead in Footer */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <div>
            <h2 className="font-display font-black text-3xl tracking-tight text-white">
              WHAT’S GOING ON
            </h2>
            <p className="text-xs uppercase tracking-[0.3em] text-[#B7A58A] mt-1">
              The Pulse of India & Global Reality
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenNewsletter}
              className="px-3.5 py-2 rounded bg-[#E63946] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#C92A37] transition-colors"
            >
              Subscribe to Daily Edition
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3 py-2 rounded border border-white/20 text-xs font-semibold text-white hover:bg-white/10 hover:border-white transition-all"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4-column link directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10 border-b border-white/10 text-xs">
          {/* Col 1: Editorial Sections */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[11px] border-b border-white/10 pb-1.5">
              News Desks
            </h3>
            <ul className="space-y-2 text-[#A7AAB0]">
              {sections.slice(0, 6).map((s) => (
                <li key={s.cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(s.cat);
                      scrollToTop();
                    }}
                    className="hover:text-[#E63946] transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: More Sections */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[11px] border-b border-white/10 pb-1.5">
              Features & Analysis
            </h3>
            <ul className="space-y-2 text-[#A7AAB0]">
              {sections.slice(6).map((s) => (
                <li key={s.cat}>
                  <button
                    onClick={() => {
                      onSelectCategory(s.cat);
                      scrollToTop();
                    }}
                    className="hover:text-[#E63946] transition-colors text-left"
                  >
                    {s.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Editorial Standards & Trust */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[11px] border-b border-white/10 pb-1.5">
              Editorial Standards
            </h3>
            <ul className="space-y-2 text-[#A7AAB0]">
              <li><span className="hover:text-white transition-colors">Independent Journalism Charter</span></li>
              <li><span className="hover:text-white transition-colors">Verification & Fact-Checking</span></li>
              <li><span className="hover:text-white transition-colors">Corrections Policy</span></li>
              <li><span className="hover:text-white transition-colors">Conflict of Interest Disclosures</span></li>
              <li><span className="hover:text-white transition-colors">Ethics Guidelines</span></li>
            </ul>
          </div>

          {/* Col 4: Feeds & Discovery */}
          <div className="space-y-3">
            <h3 className="font-bold uppercase tracking-wider text-white text-[11px] border-b border-white/10 pb-1.5">
              Syndication & Feeds
            </h3>
            <ul className="space-y-2 text-[#A7AAB0]">
              <li>
                <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Rss className="w-3 h-3 text-[#E63946]" /> RSS 2.0 Newsfeed
                </a>
              </li>
              <li>
                <a href="/sitemap-news.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Google News XML Sitemap
                </a>
              </li>
              <li>
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Robots.txt Directives
                </a>
              </li>
              <li><span className="hover:text-white transition-colors">Syndication & Licensing</span></li>
              <li><span className="hover:text-white transition-colors">Privacy Policy & Terms</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Ethics Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#5F6368]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#B7A58A]" />
            <span>© 2026 What’s Going On. All rights reserved. Professional Newsroom & Editorial.</span>
          </div>

          <div className="flex items-center gap-4 text-[#A7AAB0]">
            <a href="/rss.xml" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
              <Rss className="w-3 h-3 text-[#E63946]" /> RSS
            </a>
            <a
              href="/publisher/login"
              onClick={(e) => {
                e.preventDefault();
                window.history.pushState({}, '', '/publisher/login');
                window.dispatchEvent(new PopStateEvent('popstate'));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-[#4E5460] hover:text-[#A7AAB0] text-[11px] transition-colors"
            >
              Staff Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
