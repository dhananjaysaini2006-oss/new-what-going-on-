import React, { useState } from 'react';
import {
  Globe,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  RefreshCw,
  Rss,
  FileCode,
  ShieldCheck,
  Search,
  Sparkles,
  Copy,
  Check,
  Send,
} from 'lucide-react';

interface GoogleNewsIndexingHubProps {
  isOpen: boolean;
  onClose: () => void;
  publishedCount: number;
}

export const GoogleNewsIndexingHub: React.FC<GoogleNewsIndexingHubProps> = ({
  isOpen,
  onClose,
  publishedCount,
}) => {
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isPinging, setIsPinging] = useState<boolean>(false);
  const [pingSuccess, setPingSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handlePingGoogle = async () => {
    setIsPinging(true);
    setPingSuccess(false);
    // Simulate real Google Search Console sitemap ping
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setPingSuccess(true);
      setTimeout(() => setPingSuccess(false), 4000);
    } finally {
      setIsPinging(false);
    }
  };

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://whatsgoingon.news';

  return (
    <div
      id="google-news-indexing-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="google-news-indexing-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#14171D] border border-[#2E333D] text-[#F5F5F2] w-full max-w-3xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#2E333D] flex items-center justify-between bg-[#1A1D24]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
                Google News Publisher & SEO Command Center
              </h2>
              <span className="text-xs text-[#A7AAB0]">
                Live RSS 2.0 Syndication, NewsArticle Schema & Sitemap Indexing
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A7AAB0] hover:text-white hover:bg-[#252A34]"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-6 flex-1 text-xs">
          {/* Status Banner */}
          <div className="p-4 rounded-lg bg-emerald-950/30 border border-emerald-800 flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-emerald-300 text-sm">
                Google News Indexing Pipeline Active
              </h4>
              <p className="text-emerald-200/80 mt-1 leading-relaxed">
                Your newsroom publishes structured <code className="bg-emerald-950 px-1 py-0.5 rounded">NewsArticle</code> JSON-LD schemas and hosts dynamic Google News compliant XML feeds. Drafts and scheduled articles are strictly filtered out until release.
              </p>
            </div>
          </div>

          {/* Quick Endpoints */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-3">
              Production Feeds & Manifests
            </h3>

            <div className="space-y-3">
              {/* News Sitemap */}
              <div className="p-3.5 rounded-lg bg-[#0F1115] border border-[#2E333D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <FileCode className="w-5 h-5 text-[#4285F4] flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-white block">Google News XML Sitemap</span>
                    <span className="text-[11px] text-[#A7AAB0] font-mono truncate block">
                      {origin}/sitemap-news.xml
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="/sitemap-news.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-[#1A1D24] text-[#A7AAB0] hover:text-white border border-[#2E333D] hover:border-[#4285F4]"
                    title="View XML in new tab"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(`${origin}/sitemap-news.xml`, 'sitemap')}
                    className="p-2 rounded bg-[#1A1D24] text-[#A7AAB0] hover:text-white border border-[#2E333D]"
                    title="Copy URL"
                  >
                    {copiedUrl === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* RSS 2.0 */}
              <div className="p-3.5 rounded-lg bg-[#0F1115] border border-[#2E333D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <Rss className="w-5 h-5 text-[#EA4335] flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-white block">Google News Syndicated RSS 2.0</span>
                    <span className="text-[11px] text-[#A7AAB0] font-mono truncate block">
                      {origin}/rss.xml
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="/rss.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-[#1A1D24] text-[#A7AAB0] hover:text-white border border-[#2E333D] hover:border-[#EA4335]"
                    title="View RSS feed"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopy(`${origin}/rss.xml`, 'rss')}
                    className="p-2 rounded bg-[#1A1D24] text-[#A7AAB0] hover:text-white border border-[#2E333D]"
                    title="Copy URL"
                  >
                    {copiedUrl === 'rss' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Robots.txt */}
              <div className="p-3.5 rounded-lg bg-[#0F1115] border border-[#2E333D] flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 overflow-hidden">
                  <ShieldCheck className="w-5 h-5 text-[#34A853] flex-shrink-0" />
                  <div className="truncate">
                    <span className="font-bold text-white block">Crawler Directives (robots.txt)</span>
                    <span className="text-[11px] text-[#A7AAB0] font-mono truncate block">
                      {origin}/robots.txt
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <a
                    href="/robots.txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded bg-[#1A1D24] text-[#A7AAB0] hover:text-white border border-[#2E333D]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Google Publisher Center & Search Console Submission Hub */}
          <div className="p-4 rounded-lg bg-[#0F1115] border border-[#2E333D]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="font-bold text-white text-sm">Google Search Console & Publisher Center</h4>
                <p className="text-[#A7AAB0] text-xs mt-0.5">
                  Submit your verified sitemap URL to Google Search Console to guarantee live indexing of your {publishedCount} published stories.
                </p>
              </div>
              <a
                href="https://search.google.com/search-console"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-[#4285F4] hover:bg-[#3367D6] text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors flex-shrink-0"
              >
                <span>Open Search Console</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Publisher Center Best Practices Checklist */}
          <div className="p-4 rounded-lg bg-[#0F1115] border border-[#2E333D] space-y-2.5">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              Google News Editorial Compliance Checklist
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-[#A7AAB0]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Original journalism with transparent bylines</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>ISO-8601 publication timestamps</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Structured schema NewsArticle JSON-LD</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Clean canonical URL slug routing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#2E333D] bg-[#1A1D24] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#E63946] text-white font-bold text-xs hover:bg-[#C92A37]"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
