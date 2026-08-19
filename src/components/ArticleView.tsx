import React, { useState, useEffect, useRef } from 'react';
import { Article } from '../types';
import {
  ArrowLeft,
  Bookmark,
  Share2,
  Sparkles,
  Clock,
  Calendar,
  User,
  Check,
  Twitter,
  Linkedin,
  Copy,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Type,
  Sun,
  Eye,
  ExternalLink,
  Radio,
} from 'lucide-react';
import { getReadingPreferences, saveReadingPreferences, ReadingPrefs } from '../utils/storage';
import { AIArticleInsights } from './AIArticleInsights';

interface ArticleViewProps {
  article: Article;
  relatedArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onToggleBookmark: (article: Article) => void;
  isBookmarked: boolean;
  onNotify: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  relatedArticles,
  onBack,
  onSelectArticle,
  onToggleBookmark,
  isBookmarked,
  onNotify,
}) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [readingPrefs, setReadingPrefs] = useState<ReadingPrefs>(() => getReadingPreferences());
  const [copied, setCopied] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track scroll progress for reading bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [article.id]);

  // Dynamically update page title, meta description, and Google News NewsArticle JSON-LD schema
  useEffect(() => {
    document.title = `${article.seoTitle || article.title} | What’s Going On`;
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', article.seoDescription || article.summary);

    const scriptId = 'google-news-article-schema';
    let existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      existingScript = document.createElement('script');
      existingScript.id = scriptId;
      existingScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(existingScript);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: article.seoTitle || article.title,
      description: article.seoDescription || article.summary,
      image: [article.image],
      datePublished: article.publishedAt,
      dateModified: article.updatedAt || article.publishedAt,
      author: [
        {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role,
          url: `${window.location.origin}/#author/${encodeURIComponent(article.author.name)}`,
        },
      ],
      publisher: {
        '@type': 'NewsMediaOrganization',
        name: "What's Going On",
        url: window.location.origin,
        logo: {
          '@type': 'ImageObject',
          url: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
        },
      },
      articleSection: article.category,
      keywords: (article.tags || []).join(', '),
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${window.location.origin}/#article/${article.id}`,
      },
      articleBody: Array.isArray(article.content) ? article.content.join('\n\n') : article.summary,
    };

    existingScript.textContent = JSON.stringify(schemaData);

    return () => {
      const s = document.getElementById(scriptId);
      if (s) s.remove();
    };
  }, [article]);

  const updateFontSize = (size: 'sm' | 'base' | 'lg' | 'xl') => {
    const newPrefs = { ...readingPrefs, fontSize: size };
    setReadingPrefs(newPrefs);
    saveReadingPreferences(newPrefs);
  };

  const updateReadingTheme = (theme: 'standard' | 'sepia' | 'focus') => {
    const newPrefs = { ...readingPrefs, readingTheme: theme };
    setReadingPrefs(newPrefs);
    saveReadingPreferences(newPrefs);
  };

  const copyArticleLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      onNotify('Link Copied', 'Article link copied to clipboard.', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareToTwitter = () => {
    const text = encodeURIComponent(`"${article.title}" — via What's Going On News`);
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
  };

  const shareToLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const fontSizeClasses = {
    sm: 'text-sm sm:text-base leading-relaxed',
    base: 'text-base sm:text-lg leading-relaxed',
    lg: 'text-lg sm:text-xl leading-relaxed',
    xl: 'text-xl sm:text-2xl leading-loose',
  }[readingPrefs.fontSize];

  const themeClasses = {
    standard: 'bg-[#FBFBF9] dark:bg-[#0F1115] text-[#111215] dark:text-[#F5F5F2]',
    sepia: 'bg-[#F4ECD8] text-[#433422] border-[#E2D4B7]',
    focus: 'bg-[#0A0C10] text-[#E1E4EA] border-[#1C2028]',
  }[readingPrefs.readingTheme];

  const formatDate = (isoString: string) => {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`min-h-screen transition-colors ${themeClasses}`}>
      {/* Sticky Scroll Progress Bar at the absolute top */}
      <div className="fixed top-0 left-0 right-0 h-1.5 bg-black/10 dark:bg-white/10 z-50">
        <div
          id="reading-progress-bar"
          className="h-full bg-[#E63946] transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Top Article Navigation & Reading Tools Bar */}
      <nav className="sticky top-1.5 z-40 bg-[#FBFBF9]/95 dark:bg-[#0F1115]/95 backdrop-blur-md border-b border-[#D9D9D5] dark:border-[#2E333D] py-3">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
          <button
            id="article-back-btn"
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#111215] dark:text-[#F5F5F2] hover:text-[#E63946] dark:hover:text-[#E63946] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Front Page</span>
          </button>

          {/* Reading Mode Customization & Actions */}
          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center gap-1 bg-[#F4F4F0] dark:bg-[#1A1D24] p-1 rounded-md border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-bold">
              <button
                onClick={() => updateFontSize('sm')}
                className={`px-1.5 py-0.5 rounded ${
                  readingPrefs.fontSize === 'sm' ? 'bg-white dark:bg-[#2E333D] shadow-xs' : 'text-[#5F6368]'
                }`}
                title="Small Font"
              >
                A-
              </button>
              <button
                onClick={() => updateFontSize('base')}
                className={`px-1.5 py-0.5 rounded ${
                  readingPrefs.fontSize === 'base' ? 'bg-white dark:bg-[#2E333D] shadow-xs' : 'text-[#5F6368]'
                }`}
                title="Medium Font (Default)"
              >
                A
              </button>
              <button
                onClick={() => updateFontSize('lg')}
                className={`px-1.5 py-0.5 rounded ${
                  readingPrefs.fontSize === 'lg' ? 'bg-white dark:bg-[#2E333D] shadow-xs' : 'text-[#5F6368]'
                }`}
                title="Large Font"
              >
                A+
              </button>
            </div>

            {/* Reading Background Color Modes */}
            <div className="hidden md:flex items-center gap-1 bg-[#F4F4F0] dark:bg-[#1A1D24] p-1 rounded-md border border-[#D9D9D5] dark:border-[#2E333D]">
              <button
                onClick={() => updateReadingTheme('standard')}
                className={`w-5 h-5 rounded-full border ${
                  readingPrefs.readingTheme === 'standard' ? 'border-[#E63946] ring-1 ring-[#E63946]' : 'border-gray-300'
                } bg-[#FBFBF9]`}
                title="Standard Theme"
              ></button>
              <button
                onClick={() => updateReadingTheme('sepia')}
                className={`w-5 h-5 rounded-full border ${
                  readingPrefs.readingTheme === 'sepia' ? 'border-[#E63946] ring-1 ring-[#E63946]' : 'border-[#D4C3A3]'
                } bg-[#F4ECD8]`}
                title="Comfort Sepia Theme"
              ></button>
              <button
                onClick={() => updateReadingTheme('focus')}
                className={`w-5 h-5 rounded-full border ${
                  readingPrefs.readingTheme === 'focus' ? 'border-[#E63946] ring-1 ring-[#E63946]' : 'border-gray-600'
                } bg-[#0A0C10]`}
                title="Dark Focus Mode"
              ></button>
            </div>

            {/* Bookmark */}
            <button
              id="article-bookmark-toggle-btn"
              onClick={() => onToggleBookmark(article)}
              className={`p-2 rounded border border-[#D9D9D5] dark:border-[#2E333D] hover:bg-[#F4F4F0] dark:hover:bg-[#1A1D24] transition-colors ${
                isBookmarked ? 'text-[#E63946]' : 'text-[#5F6368] dark:text-[#A7AAB0]'
              }`}
              aria-label="Bookmark article"
              title={isBookmarked ? 'Remove Bookmark' : 'Save Bookmark'}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Article Main Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Breadcrumb Hierarchy */}
        <div className="flex items-center gap-2 text-xs text-[#5F6368] dark:text-[#A7AAB0] mb-4 uppercase font-semibold tracking-wider">
          <button onClick={onBack} className="hover:text-[#E63946]">Home</button>
          <ChevronRight className="w-3 h-3 text-[#D9D9D5]" />
          <span className="text-[#E63946]">{article.category}</span>
          <ChevronRight className="w-3 h-3 text-[#D9D9D5]" />
          <span className="truncate max-w-[200px]">{article.tags[0] || 'Dispatch'}</span>
        </div>

        {/* Category & Reading Time Badge */}
        <div className="flex items-center gap-3 mb-4">
          <span className="px-3 py-1 bg-[#E63946] text-white text-xs font-black uppercase tracking-widest rounded">
            {article.category}
          </span>
          <span className="text-xs font-semibold text-[#5F6368] dark:text-[#A7AAB0] flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {article.readingTime} MIN READ
          </span>
        </div>

        {/* Title */}
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#111215] dark:text-[#F5F5F2] leading-tight sm:leading-tight md:leading-tight mb-4">
          {article.title}
        </h1>

        {/* Subtitle */}
        {article.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed mb-6">
            {article.subtitle}
          </p>
        )}

        {/* Author Byline and Publication Timestamp */}
        <div className="py-4 border-y border-[#D9D9D5] dark:border-[#2E333D] flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover border border-[#D9D9D5] dark:border-[#2E333D]"
            />
            <div>
              <div className="text-sm font-bold text-[#111215] dark:text-[#F5F5F2]">
                By {article.author.name}
              </div>
              <div className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                {article.author.role} {article.author.location ? `• ${article.author.location}` : ''}
              </div>
            </div>
          </div>

          <div className="text-right text-xs text-[#5F6368] dark:text-[#A7AAB0]">
            <div className="flex items-center gap-1 font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>Published {formatDate(article.publishedAt)}</span>
            </div>
            {article.updatedAt && (
              <div className="text-[11px] text-[#E63946] mt-0.5">
                Updated {formatDate(article.updatedAt)}
              </div>
            )}
          </div>
        </div>

        {/* Real-time Wire Syndicate Banner (if live syndicated) */}
        {(article.isLiveFeed || article.sourceUrl) && (
          <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 dark:bg-emerald-950/30 border border-emerald-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <div>
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider block">
                  Verified Real-Time Dispatch • {article.sourceName || 'Press Wire'}
                </span>
                <span className="text-[11px] text-emerald-700 dark:text-emerald-400">
                  Syndicated through automated editorial feed & continuously updated.
                </span>
              </div>
            </div>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors self-start sm:self-auto flex-shrink-0"
              >
                <span>Read on {article.sourceName || 'Source'}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        )}

        {/* AI Editorial Intelligence Suite */}
        <AIArticleInsights article={article} onNotify={onNotify} />

        {/* Hero Image */}
        <div className="mb-8 rounded-lg overflow-hidden border border-[#D9D9D5] dark:border-[#2E333D] bg-black">
          <img
            src={article.image}
            alt={article.title}
            className="w-full aspect-[16/9] object-cover"
          />
          {article.imageCaption && (
            <div className="p-3 bg-[#F4F4F0] dark:bg-[#1A1D24] text-xs text-[#5F6368] dark:text-[#A7AAB0] flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>{article.imageCaption}</span>
              {article.imageCredit && (
                <span className="font-semibold text-[#111215] dark:text-[#F5F5F2]">
                  Credit: {article.imageCredit}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Social Share Bar */}
        <div className="flex items-center justify-between py-3 border-b border-[#D9D9D5] dark:border-[#2E333D] mb-8 text-xs font-semibold text-[#5F6368] dark:text-[#A7AAB0]">
          <span>Share this dispatch:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={copyArticleLink}
              className="flex items-center gap-1 px-3 py-1.5 rounded bg-[#F4F4F0] dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] hover:bg-[#EAEAEA] transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Link'}</span>
            </button>
            <button
              onClick={shareToTwitter}
              className="p-1.5 rounded bg-[#F4F4F0] dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] hover:text-[#1DA1F2] transition-colors"
              aria-label="Share to X"
            >
              <Twitter className="w-4 h-4" />
            </button>
            <button
              onClick={shareToLinkedIn}
              className="p-1.5 rounded bg-[#F4F4F0] dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] hover:text-[#0A66C2] transition-colors"
              aria-label="Share to LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Body Content */}
        <div ref={contentRef} className={`space-y-6 font-serif-body ${fontSizeClasses}`}>
          {article.content.map((paragraph, idx) => {
            const isFirst = idx === 0;
            return (
              <p
                key={idx}
                className={`${
                  isFirst ? 'drop-cap font-normal' : ''
                } text-[#111215] dark:text-[#F5F5F2] leading-relaxed tracking-normal`}
              >
                {paragraph}
              </p>
            );
          })}

          {/* Pull quote if available */}
          {article.pullQuote && (
            <figure className="my-8 sm:my-10 p-6 sm:p-8 bg-[#F4F4F0] dark:bg-[#1A1D24] border-l-4 border-[#E63946] rounded-r-lg">
              <blockquote className="font-serif italic text-xl sm:text-2xl text-[#111215] dark:text-[#F5F5F2] leading-snug">
                "{article.pullQuote}"
              </blockquote>
              <figcaption className="text-xs font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] mt-3">
                — {article.author.name}, {article.author.role}
              </figcaption>
            </figure>
          )}

          {/* Extended editorial paragraphs to simulate profound journalistic depth */}
          <p className="text-[#111215] dark:text-[#F5F5F2]">
            As international observers scrutinize the downstream ramifications, several regulatory bodies have initiated bilateral consultations to harmonize audit guidelines. The coming fiscal quarters will serve as the primary testbed for whether these newly implemented standards can resist commercial friction and regional divergence.
          </p>

          <p className="text-[#111215] dark:text-[#F5F5F2]">
            For the editorial bureau in Geneva and New York, our correspondents will maintain continuous monitoring as implementation protocols roll out across port authorities, laboratory benchmarks, and regional administrative corridors.
          </p>
        </div>

        {/* Article Tags */}
        <div className="mt-10 pt-6 border-t border-[#D9D9D5] dark:border-[#2E333D] flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#5F6368] dark:text-[#A7AAB0] mr-2">
            Dispatches Filed Under:
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded text-xs font-medium text-[#111215] dark:text-[#F5F5F2]"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Box */}
        <div className="mt-10 p-6 bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded-lg flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <img
            src={article.author.avatar}
            alt={article.author.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-[#B7A58A]"
          />
          <div>
            <h4 className="text-base font-bold text-[#111215] dark:text-[#F5F5F2]">
              About {article.author.name}
            </h4>
            <p className="text-xs text-[#E63946] font-semibold mb-1">
              {article.author.role} • {article.author.location}
            </p>
            <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed">
              {article.author.bio}
            </p>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-14 pt-8 border-t-2 border-[#111215] dark:border-[#F5F5F2]">
            <h3 className="font-display font-bold text-2xl text-[#111215] dark:text-[#F5F5F2] mb-6">
              RELATED EDITORIAL DISPATCHES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="group cursor-pointer bg-white dark:bg-[#1A1D24] p-4 rounded-lg border border-[#D9D9D5] dark:border-[#2E333D] hover:border-[#E63946] shadow-xs transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/10] rounded overflow-hidden mb-3 bg-[#EAEAEA] dark:bg-[#14171D]">
                      <img
                        src={rel.image}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <span className="text-[10px] font-bold uppercase text-[#E63946] block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-serif font-bold text-sm text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] line-clamp-2 leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0] mt-3 flex items-center justify-between">
                    <span>{rel.readingTime} min read</span>
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
