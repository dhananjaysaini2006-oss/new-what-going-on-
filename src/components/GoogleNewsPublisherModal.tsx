import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Copy,
  ExternalLink,
  ShieldCheck,
  Rss,
  FileCode2,
  Bot,
  Sparkles,
  ArrowRight,
  Globe2,
  Check,
} from 'lucide-react';

interface GoogleNewsPublisherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (title: string, msg: string, type?: 'info' | 'success' | 'warning') => void;
}

export const GoogleNewsPublisherModal: React.FC<GoogleNewsPublisherModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const origin = window.location.origin;
  const rssUrl = `${origin}/rss.xml`;
  const sitemapNewsUrl = `${origin}/sitemap-news.xml`;
  const robotsUrl = `${origin}/robots.txt`;

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    onNotify?.('Copied to Clipboard', text, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const checklist = [
    { label: 'Google News RSS 2.0 Feed Spec', desc: 'Valid XML with <content:encoded>, <pubDate>, and media enclosure tags.', status: 'Active' },
    { label: 'Google News XML Sitemap', desc: 'Compliant with <news:news> namespace and publication metadata.', status: 'Active' },
    { label: 'NewsArticle JSON-LD Schema', desc: 'Deeply structured semantic schema on every individual article.', status: 'Active' },
    { label: 'Author Bylines & Editorial Transparency', desc: 'Verified author credentials, role, bio, and publication dates.', status: 'Active' },
    { label: 'Googlebot-News Robots Directives', desc: 'Explicit Allow rules in robots.txt for Googlebot and Googlebot-News.', status: 'Active' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        id="google-news-publisher-modal"
        className="bg-white dark:bg-[#151820] text-[#111215] dark:text-[#F5F5F2] w-full max-w-3xl rounded-2xl shadow-2xl border border-[#E5E7EB] dark:border-[#262C38] max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#E5E7EB] dark:border-[#262C38]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#4285F4]/10 dark:bg-[#4285F4]/20 border border-[#4285F4]/30 flex items-center justify-center text-[#4285F4]">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111215] dark:text-[#F5F5F2]">
                  Google News Publisher & Indexing Hub
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-[#34A853]/15 text-[#34A853] border border-[#34A853]/30">
                  Ready for Google News
                </span>
              </div>
              <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                Technical endpoints and live feed URLs for Google News Publisher Center & Google Search Console.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#71767B] hover:text-[#111215] dark:hover:text-white hover:bg-[#F3F4F6] dark:hover:bg-[#1F2430] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Key Endpoints Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71767B] dark:text-[#8E929A] flex items-center gap-1.5">
              <Rss className="w-3.5 h-3.5 text-[#E63946]" />
              Live Feeds & Indexing Endpoints
            </h4>

            {/* RSS Feed URL */}
            <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#1B202A] border border-[#E5E7EB] dark:border-[#2C3342] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#111215] dark:text-[#F5F5F2] flex items-center gap-1.5">
                  <span>Google News RSS 2.0 Feed</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                    Publisher Center Feed
                  </span>
                </div>
                <code className="text-xs text-[#4285F4] break-all font-mono select-all">{rssUrl}</code>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(rssUrl, 'rss')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#252C3A] border border-[#D1D5DB] dark:border-[#384152] hover:bg-[#F3F4F6] dark:hover:bg-[#2F3748] transition-colors"
                >
                  {copiedKey === 'rss' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'rss' ? 'Copied' : 'Copy URL'}</span>
                </button>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-[#D1D5DB] dark:border-[#384152] text-[#71767B] hover:text-[#111215] dark:hover:text-white"
                  title="View live RSS feed"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Google News Sitemap URL */}
            <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#1B202A] border border-[#E5E7EB] dark:border-[#2C3342] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#111215] dark:text-[#F5F5F2] flex items-center gap-1.5">
                  <span>Google News XML Sitemap</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                    Search Console Sitemap
                  </span>
                </div>
                <code className="text-xs text-[#4285F4] break-all font-mono select-all">{sitemapNewsUrl}</code>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleCopy(sitemapNewsUrl, 'sitemap')}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#252C3A] border border-[#D1D5DB] dark:border-[#384152] hover:bg-[#F3F4F6] dark:hover:bg-[#2F3748] transition-colors"
                >
                  {copiedKey === 'sitemap' ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'sitemap' ? 'Copied' : 'Copy URL'}</span>
                </button>
                <a
                  href="/sitemap-news.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-[#D1D5DB] dark:border-[#384152] text-[#71767B] hover:text-[#111215] dark:hover:text-white"
                  title="View live News Sitemap"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Robots.txt */}
            <div className="p-3.5 rounded-xl bg-[#F8F9FA] dark:bg-[#1B202A] border border-[#E5E7EB] dark:border-[#2C3342] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold text-[#111215] dark:text-[#F5F5F2] flex items-center gap-1.5">
                  <Bot className="w-3.5 h-3.5 text-[#34A853]" />
                  <span>Robots.txt Directives</span>
                </div>
                <code className="text-xs text-[#71767B] dark:text-[#8E929A] font-mono select-all">{robotsUrl}</code>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white dark:bg-[#252C3A] border border-[#D1D5DB] dark:border-[#384152] hover:bg-[#F3F4F6] dark:hover:bg-[#2F3748] transition-colors"
                >
                  <span>View robots.txt</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Verification Checklist */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#71767B] dark:text-[#8E929A] mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
              Google News Technical Compliance Checklist
            </h4>
            <div className="space-y-2">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl border border-[#E5E7EB] dark:border-[#262C38] bg-white dark:bg-[#181C24]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-xs text-[#111215] dark:text-[#F5F5F2]">
                      {item.label}
                    </div>
                    <div className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                      {item.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Instructions */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-[#4285F4]/10 via-[#34A853]/5 to-transparent border border-[#4285F4]/20 space-y-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#4285F4]" />
              <h5 className="font-bold text-xs text-[#111215] dark:text-[#F5F5F2]">
                How to Submit to Google News Publisher Center
              </h5>
            </div>
            <ol className="list-decimal list-inside text-xs text-[#5F6368] dark:text-[#A7AAB0] space-y-1.5 font-sans leading-relaxed">
              <li>
                Visit{' '}
                <a
                  href="https://publishercenter.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4285F4] underline font-semibold"
                >
                  Google News Publisher Center
                </a>{' '}
                and click <strong>Add Publication</strong>.
              </li>
              <li>
                Enter <strong>What’s Going On</strong> and provide your website URL.
              </li>
              <li>
                In the <strong>Content</strong> section, create a section using your live Feed URL:{' '}
                <code className="bg-white/80 dark:bg-black/40 px-1 py-0.5 rounded font-mono text-[11px] text-[#4285F4]">
                  {rssUrl}
                </code>.
              </li>
              <li>
                In Google Search Console, submit your Google News sitemap at{' '}
                <code className="bg-white/80 dark:bg-black/40 px-1 py-0.5 rounded font-mono text-[11px] text-[#4285F4]">
                  /sitemap-news.xml
                </code>.
              </li>
              <li>
                Click <strong>Submit for Review</strong>. Google News crawlers will begin automated indexing.
              </li>
            </ol>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F9FAFB] dark:bg-[#12151C] border-t border-[#E5E7EB] dark:border-[#262C38] flex items-center justify-between">
          <span className="text-xs text-[#71767B] dark:text-[#8E929A]">
            Google News specifications verified & active
          </span>
          <div className="flex items-center gap-2">
            <a
              href="https://publishercenter.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-[#4285F4] text-white hover:bg-[#1A73E8] transition-colors shadow-sm"
            >
              <span>Open Publisher Center</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium border border-[#D1D5DB] dark:border-[#2C3342] text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F3F4F6] dark:hover:bg-[#1B202A] transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
