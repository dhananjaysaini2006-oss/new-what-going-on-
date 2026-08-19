import React, { useState, useEffect, useCallback } from 'react';
import { Article, CategoryType, EditionType, BookmarkItem, PublisherUser } from './types';
import {
  ARTICLES,
  VISUAL_STORIES,
  COLUMNISTS,
  BRIEFING_ITEMS,
  BREAKING_NEWS,
  MARKET_TICKERS,
  WEATHER_REPORTS,
} from './data/news-data';
import { getInitialTheme, toggleThemeMode, applyTheme, ThemeMode } from './utils/theme';
import {
  getBookmarks,
  saveBookmark,
  removeBookmark,
  clearAllBookmarks,
  isArticleBookmarked,
} from './utils/storage';
import { checkPublisherSession, apiFetchPublicArticles, apiSyncLiveNews } from './utils/auth';

// UI Components
import { HeaderUtility } from './components/HeaderUtility';
import { Masthead } from './components/Masthead';
import { BreakingTicker } from './components/BreakingTicker';
import { StickyNavigation } from './components/StickyNavigation';
import { HeroSection } from './components/HeroSection';
import { BriefingSection } from './components/BriefingSection';
import { CategoryFeed } from './components/CategoryFeed';
import { InvestigativeSpotlight } from './components/InvestigativeSpotlight';
import { VisualJournalism } from './components/VisualJournalism';
import { OpinionSection } from './components/OpinionSection';
import { NewsletterCTA } from './components/NewsletterCTA';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { MobileMenu } from './components/MobileMenu';
import { ArticleView } from './components/ArticleView';
import { ToastContainer, ToastMessage } from './components/ToastContainer';
import { GoogleNewsFeed } from './components/GoogleNewsFeed';
import { GoogleNewsItem } from './types';
import { MarketPulseWidget } from './components/MarketPulseWidget';
import { DailyNewsQuizModal } from './components/DailyNewsQuizModal';

// Publisher Portal Components
import { PublisherLogin } from './components/publisher/PublisherLogin';
import { PublisherDashboard } from './components/publisher/PublisherDashboard';

type AppRoute = 'public' | 'publisher_login' | 'publisher_dashboard';

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(() => getInitialTheme());
  const [currentEdition, setCurrentEdition] = useState<EditionType>('India');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);

  // Dynamic public articles fetched from backend API with fallback
  const [publicArticles, setPublicArticles] = useState<Article[]>(ARTICLES);
  const [loadingArticles, setLoadingArticles] = useState<boolean>(false);
  const [isSyncingNews, setIsSyncingNews] = useState<boolean>(false);
  const [lastSyncedTime, setLastSyncedTime] = useState<Date>(new Date());

  // Authentication & Routing State
  const [route, setRoute] = useState<AppRoute>('public');
  const [publisherUser, setPublisherUser] = useState<PublisherUser | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(true);

  // Sync theme with HTML document root
  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // Modals & Drawers
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [bookmarksOpen, setBookmarksOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [quizOpen, setQuizOpen] = useState<boolean>(false);

  // Bookmarks state
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>(() => getBookmarks());

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (title: string, message: string, type: 'info' | 'success' | 'warning' = 'info') => {
    const newToast: ToastMessage = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      message,
      type,
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Fetch verified public articles from server with real-time wire fallback
  const loadPublicArticles = useCallback(async () => {
    try {
      setLoadingArticles(true);
      const serverArticles = await apiFetchPublicArticles();
      if (serverArticles && serverArticles.length > 0) {
        setPublicArticles(serverArticles);
        setLastSyncedTime(new Date());
      } else {
        // Trigger immediate live news sync if server has 0 articles
        const syncResult = await apiSyncLiveNews();
        if (syncResult && syncResult.articles && syncResult.articles.length > 0) {
          setPublicArticles(syncResult.articles);
          setLastSyncedTime(new Date());
        }
      }
    } catch {
      // Graceful fallback to client dynamic articles if offline
    } finally {
      setLoadingArticles(false);
    }
  }, []);

  // Explicit sync of live news feeds
  const handleRefreshLiveNews = useCallback(async () => {
    try {
      setIsSyncingNews(true);
      const result = await apiSyncLiveNews();
      if (result && result.articles && result.articles.length > 0) {
        setPublicArticles(result.articles);
        setLastSyncedTime(new Date());
        addToast(
          'Live Wire Synchronized',
          `Front page updated with ${result.articles.length} real-time dispatches from verified Indian & global news feeds.`,
          'success'
        );
      } else {
        await loadPublicArticles();
        addToast('News Wire Checked', 'Front page updated with latest dispatches.', 'info');
      }
    } catch {
      await loadPublicArticles();
      addToast('Wire Refreshed', 'Front page dispatches refreshed.', 'info');
    } finally {
      setIsSyncingNews(false);
    }
  }, [loadPublicArticles]);

  useEffect(() => {
    // Initial fetch of public articles
    loadPublicArticles();

    // Trigger an immediate live news sync from Indian news wires so published site gets the latest dispatches instantly
    apiSyncLiveNews().then((res) => {
      if (res && res.articles && res.articles.length > 0) {
        setPublicArticles(res.articles);
        setLastSyncedTime(new Date());
      }
    }).catch(() => {
      // Gracefully continue with cached/fetched articles
    });
    
    // Auto-refresh news every 30 seconds
    const interval = setInterval(() => {
      loadPublicArticles();
    }, 30000);

    // Immediate update when mobile user switches back to browser tab or wakes screen
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        loadPublicArticles();
      }
    };

    const handleFocus = () => {
      loadPublicArticles();
    };

    const handleOnline = () => {
      loadPublicArticles();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('online', handleOnline);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('online', handleOnline);
    };
  }, [loadPublicArticles]);

  // Initial Auth Check
  useEffect(() => {
    async function verifyAuth() {
      setCheckingAuth(true);
      const session = await checkPublisherSession();
      if (session.authenticated && session.user) {
        setPublisherUser(session.user);
      } else {
        setPublisherUser(null);
      }
      setCheckingAuth(false);
    }
    verifyAuth();
  }, []);

  // Browser Path & Hash Route Synchronization
  useEffect(() => {
    const syncRouteFromLocation = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;

      if (pathname.startsWith('/publisher/login')) {
        setRoute('publisher_login');
        return;
      }

      if (pathname.startsWith('/publisher')) {
        setRoute(publisherUser ? 'publisher_dashboard' : 'publisher_login');
        return;
      }

      setRoute('public');

      // Check article hash #article/:id or #article/:slug
      if (hash.startsWith('#article/')) {
        const identifier = hash.replace('#article/', '');
        const found = publicArticles.find((a) => a.id === identifier || a.slug === identifier);
        if (found) {
          setCurrentArticle(found);
          document.title = `${found.seoTitle || found.title} | What’s Going On`;
          return;
        }
      }

      setCurrentArticle(null);
      document.title = "What’s Going On — The Pulse of India & Global Reality";
    };

    syncRouteFromLocation();
    window.addEventListener('popstate', syncRouteFromLocation);
    window.addEventListener('hashchange', syncRouteFromLocation);
    return () => {
      window.removeEventListener('popstate', syncRouteFromLocation);
      window.removeEventListener('hashchange', syncRouteFromLocation);
    };
  }, [publisherUser, publicArticles]);

  // Navigation Helpers
  const navigateTo = (newRoute: AppRoute, urlPath: string) => {
    window.history.pushState({}, '', urlPath);
    setRoute(newRoute);
    if (newRoute === 'public') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNavigateHome = () => {
    setCurrentArticle(null);
    window.location.hash = '';
    navigateTo('public', '/');
  };

  const handleNavigatePublisher = () => {
    if (publisherUser) {
      navigateTo('publisher_dashboard', '/publisher');
    } else {
      navigateTo('publisher_login', '/publisher/login');
    }
  };

  const handleLoginSuccess = (user: PublisherUser) => {
    setPublisherUser(user);
    navigateTo('publisher_dashboard', '/publisher');
    addToast('Access Granted', `Welcome back, ${user.name}.`, 'success');
  };

  const handleLogoutSuccess = () => {
    setPublisherUser(null);
    navigateTo('public', '/');
  };

  // Keyboard shortcut Ctrl+K / Cmd+K for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleTheme = () => {
    const next = toggleThemeMode(theme);
    setTheme(next);
    addToast('Theme Updated', `Switched to ${next === 'dark' ? 'Dark Evening' : 'Light Editorial'} edition.`, 'info');
  };

  const handleSelectArticle = (article: Article) => {
    setCurrentArticle(article);
    window.location.hash = `#article/${article.slug || article.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleById = (id: string) => {
    const found = publicArticles.find((a) => a.id === id || a.slug === id);
    if (found) {
      handleSelectArticle(found);
    } else {
      addToast('Dispatch Not Found', 'Could not locate the requested article.', 'warning');
    }
  };

  const handleBackToFrontPage = () => {
    setCurrentArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleBookmark = (article: Article) => {
    if (isArticleBookmarked(article.id)) {
      removeBookmark(article.id);
      setBookmarks(getBookmarks());
      addToast('Bookmark Removed', `"${article.title}" removed from reading list.`, 'info');
    } else {
      saveBookmark(article);
      setBookmarks(getBookmarks());
      addToast('Article Saved', `"${article.title}" saved to your reading list.`, 'success');
    }
  };

  const handleRemoveBookmark = (id: string) => {
    removeBookmark(id);
    setBookmarks(getBookmarks());
    addToast('Bookmark Removed', 'Article removed from reading list.', 'info');
  };

  const handleClearAllBookmarks = () => {
    clearAllBookmarks();
    setBookmarks([]);
    addToast('Reading List Cleared', 'All saved bookmarks have been removed.', 'info');
  };

  const handleShareArticle = (article: Article) => {
    const shareUrl = `${window.location.origin}/#article/${article.slug || article.id}`;
    if (navigator.share) {
      navigator
        .share({
          title: article.title,
          text: article.summary,
          url: shareUrl,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      addToast('Link Copied', `Direct link to "${article.title}" copied to clipboard.`, 'success');
    }
  };

  const handleBookmarkGoogleNews = (item: GoogleNewsItem) => {
    const articleAdapted: Article = {
      id: item.id,
      title: item.title,
      subtitle: item.source,
      summary: item.snippet || item.title,
      category: (item.topic as CategoryType) || 'World',
      publishedAt: item.pubDate || new Date().toISOString(),
      readingTime: 2,
      image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      imageCaption: `Google News syndicated report via ${item.source}`,
      author: {
        name: item.source,
        role: 'Google News Syndicate',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        bio: 'Syndicated global correspondent contributing via Google News.',
      },
      content: [
        item.snippet || item.title,
        `Original dispatch syndicated from ${item.source} through Google News RSS 2.0.`,
        `Read full source coverage at: ${item.link}`,
      ],
      tags: ['Google News', item.source, item.topic || 'General'],
    };

    if (isArticleBookmarked(item.id)) {
      removeBookmark(item.id);
      setBookmarks(getBookmarks());
      addToast('Bookmark Removed', `"${item.title.slice(0, 40)}..." removed.`, 'info');
    } else {
      saveBookmark(articleAdapted);
      setBookmarks(getBookmarks());
      addToast('Story Saved', `"${item.title.slice(0, 40)}..." added to reading list.`, 'success');
    }
  };

  const handleOpenNewsletter = () => {
    const el = document.getElementById('newsletter-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const categories: CategoryType[] = [
    'All',
    'India',
    'Google News',
    'Politics',
    'AI & Tech',
    'Business',
    'Markets',
    'Sports',
    'Climate',
    'Science',
    'Culture',
    'Opinion',
    'In-Depth',
    'World',
  ];

  // Lead editorial story: Always feature the newest published / synced live dispatch
  const mainLeadArticle = publicArticles[0] || ARTICLES[0];
  const supportingLeadArticles = publicArticles.slice(1, 3);
  const investigativeArticle = publicArticles.find((a) => a.isInvestigative) || publicArticles[3] || publicArticles[0];
  const breakingPool = publicArticles.slice(0, 10);

  // Related articles for article view
  const getRelatedArticles = (article: Article) => {
    if (!article) return [];
    const articleTags = article.tags || [];
    return publicArticles
      .filter(
        (a) =>
          a.id !== article.id &&
          (a.category === article.category || (a.tags || []).some((t) => articleTags.includes(t)))
      )
      .slice(0, 3);
  };

  // ROUTE 1: Publisher Login Route
  if (route === 'publisher_login') {
    return (
      <>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        <PublisherLogin
          onLoginSuccess={handleLoginSuccess}
          onNavigateHome={handleNavigateHome}
        />
      </>
    );
  }

  // ROUTE 2: Protected Publisher Dashboard
  if (route === 'publisher_dashboard' && publisherUser) {
    return (
      <>
        <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
        <PublisherDashboard
          user={publisherUser}
          onLogout={handleLogoutSuccess}
          onNavigateHome={handleNavigateHome}
          onPreviewArticle={handleSelectArticle}
          onNotify={addToast}
        />
      </>
    );
  }

  // ROUTE 3: Public Reader Portal
  return (
    <div className="min-h-screen bg-[#FBFBF9] dark:bg-[#0F1115] text-[#111215] dark:text-[#F5F5F2] font-sans antialiased selection:bg-[#E63946] selection:text-white transition-colors">
      {/* Toast Notification Layer */}
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />

      {/* If reading an article, show Full Article View */}
      {currentArticle ? (
        <ArticleView
          article={currentArticle}
          relatedArticles={getRelatedArticles(currentArticle)}
          onBack={handleBackToFrontPage}
          onSelectArticle={handleSelectArticle}
          onToggleBookmark={handleToggleBookmark}
          isBookmarked={isArticleBookmarked(currentArticle.id)}
          onNotify={addToast}
        />
      ) : (
        /* Front Page Layout */
        <>
          {/* Top Utility Bar */}
          <HeaderUtility
            currentEdition={currentEdition}
            onSelectEdition={setCurrentEdition}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenQuiz={() => setQuizOpen(true)}
            onRefreshLiveNews={handleRefreshLiveNews}
            isSyncingNews={isSyncingNews}
            lastSyncedTime={lastSyncedTime}
          />

          {/* Primary Editorial Masthead */}
          <Masthead
            currentEdition={currentEdition}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenBookmarks={() => setBookmarksOpen(true)}
            onOpenNewsletter={handleOpenNewsletter}
            onOpenMobileMenu={() => setMobileMenuOpen(true)}
            bookmarkCount={bookmarks.length}
          />

          {/* Breaking News Live Strip */}
          <BreakingTicker
            articles={breakingPool.length > 0 ? breakingPool : BREAKING_NEWS}
            onSelectArticle={handleSelectArticle}
          />

          {/* Sticky Navigation Bar */}
          <StickyNavigation
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onOpenSearch={() => setSearchOpen(true)}
            onOpenBookmarks={() => setBookmarksOpen(true)}
            bookmarkCount={bookmarks.length}
            theme={theme}
            onToggleTheme={handleToggleTheme}
            onOpenQuiz={() => setQuizOpen(true)}
          />

          {/* Main Content Sections */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Show Lead Hero Section only when Front Page ("All") is active */}
            {selectedCategory === 'All' && (
              <>
                <HeroSection
                  mainArticle={mainLeadArticle}
                  supportingArticles={supportingLeadArticles}
                  onSelectArticle={handleSelectArticle}
                  onToggleBookmark={handleToggleBookmark}
                  isBookmarked={isArticleBookmarked}
                  onShare={handleShareArticle}
                />

                {/* 60-Second Briefing Stream */}
                <BriefingSection
                  briefings={BRIEFING_ITEMS}
                  articles={publicArticles}
                  onSelectArticleById={handleSelectArticleById}
                />
              </>
            )}

            {/* Financial Markets Pulse Widget */}
            {(selectedCategory === 'All' || selectedCategory === 'Markets' || selectedCategory === 'Business') && (
              <MarketPulseWidget />
            )}

            {/* Google News Live Wire & Syndication Section */}
            {(selectedCategory === 'All' || selectedCategory === 'Google News') && (
              <GoogleNewsFeed
                onBookmarkGoogleNews={handleBookmarkGoogleNews}
              />
            )}

            {/* Continuous Category & Wire Feed */}
            {selectedCategory !== 'Google News' && (
              <CategoryFeed
                articles={publicArticles}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                onSelectArticle={handleSelectArticle}
                onToggleBookmark={handleToggleBookmark}
                isBookmarked={isArticleBookmarked}
                onShare={handleShareArticle}
              />
            )}

            {/* Special Investigation Spotlight */}
            <InvestigativeSpotlight
              article={investigativeArticle}
              onSelectArticle={handleSelectArticle}
              onToggleBookmark={handleToggleBookmark}
              isBookmarked={isArticleBookmarked}
              onShare={handleShareArticle}
            />

            {/* Visual Journalism & Photo Essays */}
            <VisualJournalism
              stories={VISUAL_STORIES}
              articles={publicArticles}
              onSelectArticleById={handleSelectArticleById}
            />

            {/* Editorial Opinion Columns */}
            <OpinionSection
              columnists={COLUMNISTS}
              articles={publicArticles}
              onSelectArticleById={handleSelectArticleById}
            />

            {/* The Morning Pulse Newsletter CTA */}
            <NewsletterCTA onNotify={addToast} />
          </main>

          {/* Editorial Footer with Staff Portal Access */}
          <Footer
            onSelectCategory={setSelectedCategory}
            onOpenNewsletter={handleOpenNewsletter}
            onOpenPublisherHub={handleNavigatePublisher}
          />
        </>
      )}

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        articles={publicArticles}
        onSelectArticle={handleSelectArticle}
      />

      <BookmarksDrawer
        isOpen={bookmarksOpen}
        onClose={() => setBookmarksOpen(false)}
        bookmarks={bookmarks}
        articles={publicArticles}
        onSelectArticleById={handleSelectArticleById}
        onRemoveBookmark={handleRemoveBookmark}
        onClearAll={handleClearAllBookmarks}
      />

      <DailyNewsQuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        onNotify={addToast}
      />

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        currentEdition={currentEdition}
        onSelectEdition={setCurrentEdition}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenBookmarks={() => setBookmarksOpen(true)}
        onOpenNewsletter={handleOpenNewsletter}
        bookmarkCount={bookmarks.length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onRefreshLiveNews={handleRefreshLiveNews}
        isSyncingNews={isSyncingNews}
        lastSyncedTime={lastSyncedTime}
      />
    </div>
  );
}
