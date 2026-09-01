import React, { useState, useEffect, useCallback } from 'react';
import { GoogleNewsItem, GoogleNewsTopic, Article } from '../types';
import {
  Globe,
  Radio,
  RefreshCw,
  ExternalLink,
  Search,
  Bookmark,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  SlidersHorizontal,
  Flame,
  Newspaper,
  Compass,
} from 'lucide-react';

interface GoogleNewsFeedProps {
  onBookmarkGoogleNews?: (item: GoogleNewsItem) => void;
}

const TOPICS: { id: GoogleNewsTopic; label: string; icon: string }[] = [
  { id: 'TOP', label: 'Top Headlines', icon: '⚡' },
  { id: 'ALL_INDIAN_WIRES', label: 'All Indian Wires', icon: '🇮🇳' },
  { id: 'PTI_NEWS', label: 'PTI (Press Trust of India)', icon: '🏛️' },
  { id: 'ANI_NEWS', label: 'ANI News Agency', icon: '📡' },
  { id: 'NDTV_NEWS', label: 'NDTV 24x7', icon: '📺' },
  { id: 'ABP_NEWS', label: 'ABP News Live', icon: '🔴' },
  { id: 'INDIA_TODAY', label: 'India Today / Aaj Tak', icon: '🌟' },
  { id: 'THE_HINDU', label: 'The Hindu', icon: '📰' },
  { id: 'INDIAN_EXPRESS', label: 'The Indian Express', icon: '🗞️' },
  { id: 'TIMES_OF_INDIA', label: 'Times of India', icon: '🗞️' },
  { id: 'ECONOMIC_TIMES', label: 'The Economic Times', icon: '📊' },
  { id: 'MINT', label: 'Livemint', icon: '💼' },
  { id: 'NEWS18', label: 'News18', icon: '📡' },
  { id: 'ZEE_NEWS', label: 'Zee News', icon: '📺' },
  { id: 'BUSINESS_STANDARD', label: 'Business Standard', icon: '📈' },
  { id: 'NATIONAL', label: 'National & Policy', icon: '🏛️' },
  { id: 'BUSINESS', label: 'Markets & Sensex', icon: '📈' },
  { id: 'TECHNOLOGY', label: 'Tech & AI', icon: '⚡' },
  { id: 'CRICKET', label: 'Cricket & BCCI', icon: '🏏' },
  { id: 'POLITICS', label: 'Parliament & States', icon: '🗳️' },
  { id: 'SCIENCE', label: 'ISRO & Science', icon: '🔬' },
  { id: 'HEALTH', label: 'Health & Wellness', icon: '🩺' },
  { id: 'WORLD', label: 'Global Affairs', icon: '🌍' },
];

export const GoogleNewsFeed: React.FC<GoogleNewsFeedProps> = ({
  onBookmarkGoogleNews,
}) => {
  const [activeTopic, setActiveTopic] = useState<GoogleNewsTopic>('TOP');
  const [region, setRegion] = useState<string>('in');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [debouncedQuery, setDebouncedQuery] = useState<string>('');
  const [items, setItems] = useState<GoogleNewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState<boolean>(true);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());

  // Debounce search query
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 450);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  const fetchGoogleNews = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `/api/google-news?topic=${activeTopic}&region=${region}&_t=${Date.now()}`;
      if (debouncedQuery) {
        url = `/api/google-news?q=${encodeURIComponent(debouncedQuery)}&region=${region}&_t=${Date.now()}`;
      }

      const res = await fetch(url, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }
      const data = await res.json();
      if (data.status === 'ok' && Array.isArray(data.items)) {
        setItems(data.items);
        setLastRefreshed(new Date());
      } else {
        throw new Error(data.message || 'Failed to parse news feed');
      }
    } catch (err: any) {
      console.error('Google News fetch error:', err);
      setError(err.message || 'Unable to connect to Google News RSS stream.');
    } finally {
      setLoading(false);
    }
  }, [activeTopic, region, debouncedQuery]);

  // Initial fetch and on filter changes
  useEffect(() => {
    fetchGoogleNews();
  }, [fetchGoogleNews]);

  // Auto-refresh interval (every 3 mins if enabled and tab is active)
  useEffect(() => {
    if (!autoRefresh) return;
    const interval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        fetchGoogleNews();
      }
    }, 180000);
    return () => clearInterval(interval);
  }, [autoRefresh, fetchGoogleNews]);

  const handleSaveItem = (item: GoogleNewsItem) => {
    setSavedIds((prev) => new Set(prev).add(item.id));
    if (onBookmarkGoogleNews) {
      onBookmarkGoogleNews(item);
    }
  };

  const formatRelativeTime = (pubDateStr: string) => {
    try {
      const date = new Date(pubDateStr);
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / 60000);
      if (diffMinutes < 1) return 'Just now';
      if (diffMinutes < 60) return `${diffMinutes}m ago`;
      const diffHours = Math.floor(diffMinutes / 60);
      if (diffHours < 24) return `${diffHours}h ago`;
      return `${Math.floor(diffHours / 24)}d ago`;
    } catch {
      return 'Recently';
    }
  };

  return (
    <section id="google-news-live-wire" className="py-12 border-b border-[#E5E7EB] dark:border-[#222730] bg-[#F7F7F5] dark:bg-[#12151B] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-[#E5E7EB] dark:border-[#222730]">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#4285F4]/10 text-[#4285F4] dark:bg-[#4285F4]/20 border border-[#4285F4]/30">
                <Radio className="w-3.5 h-3.5 animate-pulse text-[#EA4335]" />
                Live Wire
              </span>
              <span className="text-xs font-medium text-[#71767B] dark:text-[#8E929A] flex items-center gap-1">
                Powered by Google News RSS Integration
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#111215] dark:text-[#F5F5F2] tracking-tight flex items-center gap-3">
              Google News Real-Time Wire
            </h2>
            <p className="text-sm text-[#5F6368] dark:text-[#A7AAB0] mt-1 max-w-2xl font-sans">
              Stream verified global dispatches from international newsrooms alongside our editorial coverage. Fully indexed and synchronized for Google News.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              id="google-news-refresh-btn"
              onClick={() => fetchGoogleNews()}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-[#D1D5DB] dark:border-[#2C313C] bg-white dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] hover:bg-[#F3F4F6] dark:hover:bg-[#252A34] transition-colors shadow-sm disabled:opacity-50"
              title="Refresh Google News feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#4285F4]' : ''}`} />
              <span>Refresh Wire</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar: Topics & Search */}
        <div className="pt-6 pb-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Topic Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {TOPICS.map((topic) => {
              const isActive = activeTopic === topic.id && !debouncedQuery;
              return (
                <button
                  key={topic.id}
                  id={`topic-pill-${topic.id}`}
                  onClick={() => {
                    setActiveTopic(topic.id);
                    setSearchQuery('');
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215] font-semibold shadow-sm'
                      : 'bg-white dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0] border border-[#E5E7EB] dark:border-[#2C313C] hover:border-[#9CA3AF] dark:hover:border-[#4B5563]'
                  }`}
                >
                  <span>{topic.icon}</span>
                  <span>{topic.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Input & Region Selector */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#71767B] pointer-events-none" />
              <input
                type="text"
                placeholder="Search Google News topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D1D5DB] dark:border-[#2C313C] text-[#111215] dark:text-[#F5F5F2] placeholder-[#9CA3AF] dark:placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#9CA3AF] hover:text-[#111215] dark:hover:text-white"
                >
                  ×
                </button>
              )}
            </div>

            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="px-2.5 py-1.5 text-xs rounded-lg bg-white dark:bg-[#1A1D24] border border-[#D1D5DB] dark:border-[#2C313C] text-[#111215] dark:text-[#F5F5F2] focus:outline-none focus:ring-1 focus:ring-[#4285F4]"
              aria-label="Filter country edition"
            >
              <option value="in">India Edition (Default)</option>
              <option value="us">US Edition</option>
              <option value="gb">UK Edition</option>
            </select>
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="flex items-center justify-between text-[11px] text-[#71767B] dark:text-[#8E929A] pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse"></span>
            <span>
              {debouncedQuery
                ? `Results for "${debouncedQuery}" from Google News`
                : `${items.length} verified dispatches in ${TOPICS.find((t) => t.id === activeTopic)?.label}`}
            </span>
          </div>
          <span>Updated {lastRefreshed.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
        </div>

        {/* Loading Skeletons */}
        {loading && items.length === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-[#E5E7EB] dark:border-[#222730] bg-white dark:bg-[#161920] animate-pulse space-y-3"
              >
                <div className="h-3 bg-[#E5E7EB] dark:bg-[#2C313C] rounded w-24"></div>
                <div className="h-5 bg-[#E5E7EB] dark:bg-[#2C313C] rounded w-full"></div>
                <div className="h-5 bg-[#E5E7EB] dark:bg-[#2C313C] rounded w-3/4"></div>
                <div className="h-3 bg-[#E5E7EB] dark:bg-[#2C313C] rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error Fallback */}
        {error && items.length === 0 && (
          <div className="p-8 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/20 text-center my-4">
            <p className="text-sm font-medium text-red-700 dark:text-red-400 mb-3">{error}</p>
            <button
              onClick={() => fetchGoogleNews()}
              className="px-4 py-2 text-xs font-semibold rounded-lg bg-red-600 hover:bg-red-700 text-white transition-colors"
            >
              Retry Live Stream
            </button>
          </div>
        )}

        {/* News Items Grid */}
        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item, idx) => {
              const isSaved = savedIds.has(item.id);

              return (
                <article
                  key={`${item.id}-${idx}`}
                  id={`google-news-card-${idx}`}
                  className="group flex flex-col justify-between p-5 rounded-xl border border-[#E5E7EB] dark:border-[#222730] bg-white dark:bg-[#161920] hover:border-[#CBD5E1] dark:hover:border-[#374151] hover:shadow-md transition-all"
                >
                  <div>
                    {/* Source Badge & Time */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-2 border-b border-[#F3F4F6] dark:border-[#1E232D]">
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E63946] uppercase tracking-wider">
                        <Newspaper className="w-3 h-3" />
                        {item.source}
                      </span>
                      <span className="text-[11px] text-[#71767B] dark:text-[#8E929A]">
                        {formatRelativeTime(item.pubDate)}
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="font-serif font-bold text-base sm:text-lg leading-snug text-[#111215] dark:text-[#F5F5F2] group-hover:text-[#E63946] dark:group-hover:text-[#E63946] transition-colors mb-2">
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus:outline-none"
                      >
                        {item.title}
                      </a>
                    </h3>

                    {/* Snippet / Summary */}
                    {item.snippet && (
                      <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] line-clamp-3 leading-relaxed font-sans mb-4">
                        {item.snippet}
                      </p>
                    )}
                  </div>

                  {/* Actions: Direct Link & Save */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#F3F4F6] dark:border-[#1E232D] text-xs">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#4285F4] hover:text-[#1A73E8] dark:hover:text-[#8AB4F8] transition-colors"
                    >
                      <span>Read on {item.source}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <button
                      onClick={() => handleSaveItem(item)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        isSaved
                          ? 'border-[#34A853] text-[#34A853] bg-[#34A853]/10'
                          : 'border-[#E5E7EB] dark:border-[#2C313C] text-[#71767B] hover:text-[#111215] dark:hover:text-white'
                      }`}
                      title={isSaved ? 'Saved to bookmarks' : 'Save article bookmark'}
                      aria-label="Bookmark this dispatch"
                    >
                      {isSaved ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
