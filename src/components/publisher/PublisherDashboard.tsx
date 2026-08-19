import React, { useState, useEffect, useCallback } from 'react';
import { Article, ArticleStatus, CategoryType, PublisherUser, PublisherStats } from '../../types';
import {
  apiFetchPublisherArticles,
  apiCreatePublisherArticle,
  apiUpdatePublisherArticle,
  apiDeletePublisherArticle,
  apiUpdateArticleStatus,
  apiFetchPublisherStats,
  logoutPublisher,
} from '../../utils/auth';
import {
  Plus,
  Search,
  RefreshCw,
  LogOut,
  ExternalLink,
  Edit3,
  Trash2,
  Globe,
  Clock,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Eye,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  Sparkles,
  Archive,
  ArrowUpRight,
} from 'lucide-react';
import { ArticleEditorModal } from './ArticleEditorModal';
import { GoogleNewsIndexingHub } from './GoogleNewsIndexingHub';

interface PublisherDashboardProps {
  user: PublisherUser;
  onLogout: () => void;
  onNavigateHome: () => void;
  onPreviewArticle?: (article: Article) => void;
  onNotify: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const PublisherDashboard: React.FC<PublisherDashboardProps> = ({
  user,
  onLogout,
  onNavigateHome,
  onPreviewArticle,
  onNotify,
}) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [stats, setStats] = useState<PublisherStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [articleToEdit, setArticleToEdit] = useState<Article | null>(null);
  const [indexingHubOpen, setIndexingHubOpen] = useState<boolean>(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchArticlesAndStats = useCallback(async () => {
    setLoading(true);
    try {
      const [fetchedArticles, fetchedStats] = await Promise.all([
        apiFetchPublisherArticles({
          status: statusFilter !== 'all' ? statusFilter : undefined,
          category: categoryFilter !== 'all' ? categoryFilter : undefined,
          search: searchQuery.trim() || undefined,
        }),
        apiFetchPublisherStats().catch(() => null),
      ]);
      setArticles(fetchedArticles);
      if (fetchedStats) {
        setStats(fetchedStats);
      }
    } catch (err: any) {
      console.error('Failed to load publisher data:', err);
      onNotify('Error Loading Feed', err.message || 'Could not fetch articles registry', 'warning');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, searchQuery, onNotify]);

  useEffect(() => {
    fetchArticlesAndStats();
  }, [fetchArticlesAndStats]);

  const handleOpenCreateModal = () => {
    setArticleToEdit(null);
    setEditorOpen(true);
  };

  const handleOpenEditModal = (article: Article) => {
    setArticleToEdit(article);
    setEditorOpen(true);
  };

  const handleSaveArticle = async (articleData: Partial<Article>) => {
    if (articleData.id) {
      // Update existing
      const updated = await apiUpdatePublisherArticle(articleData.id, articleData);
      onNotify('Article Updated', `"${updated.title}" successfully updated.`, 'success');
    } else {
      // Create new
      const created = await apiCreatePublisherArticle(articleData);
      onNotify('Article Published', `"${created.title}" added to newsroom registry.`, 'success');
    }
    await fetchArticlesAndStats();
  };

  const handleDeleteArticle = async (id: string) => {
    try {
      await apiDeletePublisherArticle(id);
      onNotify('Article Deleted', 'Story permanently removed from newsroom registry.', 'info');
      setDeleteConfirmId(null);
      await fetchArticlesAndStats();
    } catch (err: any) {
      onNotify('Delete Failed', err.message || 'Could not delete story', 'warning');
    }
  };

  const handleQuickStatusChange = async (article: Article, nextStatus: ArticleStatus) => {
    try {
      let scheduledAt: string | undefined = undefined;
      if (nextStatus === 'scheduled') {
        const d = new Date();
        d.setHours(d.getHours() + 2);
        scheduledAt = d.toISOString();
      }

      await apiUpdateArticleStatus(article.id, nextStatus, scheduledAt);
      onNotify('Status Changed', `"${article.title.slice(0, 30)}..." marked as ${nextStatus.toUpperCase()}.`, 'success');
      await fetchArticlesAndStats();
    } catch (err: any) {
      onNotify('Status Update Failed', err.message || 'Error updating status', 'warning');
    }
  };

  const handleLogoutClick = async () => {
    await logoutPublisher();
    onLogout();
    onNotify('Logged Out', 'Publisher session closed securely.', 'info');
  };

  // Status Badge UI Helper
  const renderStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-950/40 border border-emerald-700 text-emerald-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Published Live
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-950/40 border border-amber-700 text-amber-400">
            <Clock className="w-3 h-3" />
            Draft
          </span>
        );
      case 'scheduled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-blue-950/40 border border-blue-700 text-blue-400">
            <Calendar className="w-3 h-3" />
            Scheduled
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-gray-900 border border-gray-700 text-gray-400">
            <Archive className="w-3 h-3" />
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F5F5F2] flex flex-col font-sans">
      {/* Top Newsroom Header */}
      <header className="border-b border-[#2E333D] bg-[#14171D] sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Portal Label */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#E63946] flex items-center justify-center text-white font-bold text-lg shadow-sm">
              W
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-lg tracking-tight text-white">
                  WHAT’S GOING ON
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#E63946]/20 border border-[#E63946]/40 text-[#E63946]">
                  Publisher Suite
                </span>
              </div>
              <span className="text-[10px] text-[#A7AAB0] block">
                Editorial Control Room & Google News RSS Dispatcher
              </span>
            </div>
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#A7AAB0] hover:text-white rounded-lg border border-[#2E333D] hover:bg-[#1A1D24] transition-colors"
              title="Return to the public reader website"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Public Live Site</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>

            <button
              id="publisher-google-news-hub-btn"
              onClick={() => setIndexingHubOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#4285F4]/10 hover:bg-[#4285F4]/20 border border-[#4285F4]/30 text-[#4285F4] transition-colors"
              title="Open Google News sitemaps and indexation tool"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Google News Hub</span>
            </button>

            <button
              id="publisher-create-article-btn"
              onClick={handleOpenCreateModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#E63946] hover:bg-[#C92A37] text-white transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Compose Story</span>
            </button>

            {/* User Avatar & Logout */}
            <div className="flex items-center gap-2 pl-2 border-l border-[#2E333D]">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-[#2E333D]"
              />
              <div className="hidden lg:block text-left">
                <span className="text-xs font-bold text-white block leading-tight">
                  {user.name}
                </span>
                <span className="text-[10px] text-[#A7AAB0] block capitalize">
                  {user.role}
                </span>
              </div>
              <button
                id="publisher-logout-btn"
                onClick={handleLogoutClick}
                className="p-1.5 rounded-lg text-[#A7AAB0] hover:text-red-400 hover:bg-[#1A1D24] transition-colors"
                title="Log out of newsroom workstation"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Dashboard Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#14171D] border border-[#2E333D] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#A7AAB0] block mb-1">
                Published Live
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-emerald-400">
                {stats?.published ?? articles.filter((a) => a.status === 'published').length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-950/40 border border-emerald-800 text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#14171D] border border-[#2E333D] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#A7AAB0] block mb-1">
                Editorial Drafts
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-amber-400">
                {stats?.drafts ?? articles.filter((a) => a.status === 'draft').length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-amber-950/40 border border-amber-800 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#14171D] border border-[#2E333D] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#A7AAB0] block mb-1">
                Scheduled Posts
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-blue-400">
                {stats?.scheduled ?? articles.filter((a) => a.status === 'scheduled').length}
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-800 text-blue-400 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
          </div>

          <div className="p-5 rounded-xl bg-[#14171D] border border-[#2E333D] flex items-center justify-between">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-[#A7AAB0] block mb-1">
                Google News Sitemaps
              </span>
              <span className="font-display font-black text-2xl sm:text-3xl text-[#4285F4]">
                Active
              </span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-[#4285F4]/10 border border-[#4285F4]/30 text-[#4285F4] flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="p-4 rounded-xl bg-[#14171D] border border-[#2E333D] flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
            {[
              { id: 'all', label: 'All Articles' },
              { id: 'published', label: 'Published' },
              { id: 'draft', label: 'Drafts' },
              { id: 'scheduled', label: 'Scheduled' },
              { id: 'archived', label: 'Archived' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  statusFilter === tab.id
                    ? 'bg-[#E63946] text-white'
                    : 'bg-[#0F1115] text-[#A7AAB0] hover:text-white border border-[#2E333D]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Category Filter */}
          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-[#5F6368] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search headlines or slugs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
              />
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-1.5 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white focus:outline-none focus:border-[#E63946]"
            >
              <option value="all">All Desks</option>
              <option value="India">India</option>
              <option value="World">World</option>
              <option value="Business">Business</option>
              <option value="AI & Tech">AI & Tech</option>
              <option value="Politics">Politics</option>
              <option value="Climate">Climate</option>
              <option value="Science">Science</option>
              <option value="Sports">Sports</option>
              <option value="Culture">Culture</option>
              <option value="Opinion">Opinion</option>
              <option value="In-Depth">In-Depth</option>
            </select>

            <button
              onClick={() => fetchArticlesAndStats()}
              disabled={loading}
              className="p-2 rounded-lg bg-[#0F1115] border border-[#2E333D] text-[#A7AAB0] hover:text-white hover:bg-[#1A1D24] transition-colors disabled:opacity-50"
              title="Refresh stories"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-[#E63946]' : ''}`} />
            </button>
          </div>
        </div>

        {/* Articles Table / List */}
        <div className="bg-[#14171D] border border-[#2E333D] rounded-xl overflow-hidden shadow-md">
          <div className="p-4 sm:p-5 border-b border-[#2E333D] flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-white flex items-center gap-2">
              <span>Newsroom Dispatches</span>
              <span className="text-xs font-normal text-[#A7AAB0]">({articles.length} stories)</span>
            </h3>
            <span className="text-xs text-[#A7AAB0]">
              Click on an article to modify headlines, content, or schedule release times.
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-xs text-[#A7AAB0] space-y-3">
              <RefreshCw className="w-6 h-6 animate-spin text-[#E63946] mx-auto" />
              <p>Synchronizing newsroom registry with editorial server...</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="p-12 text-center text-xs text-[#A7AAB0] space-y-3">
              <FileText className="w-8 h-8 mx-auto text-[#5F6368]" />
              <h4 className="text-sm font-bold text-white">No dispatches match the selected filter</h4>
              <p>Compose a new dispatch or change filter parameters.</p>
              <button
                onClick={handleOpenCreateModal}
                className="mt-2 px-4 py-2 rounded-lg bg-[#E63946] text-white font-bold text-xs"
              >
                Compose Story Now
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#A7AAB0]">
                <thead className="bg-[#0F1115] text-[11px] uppercase tracking-wider font-bold text-[#5F6368] border-b border-[#2E333D]">
                  <tr>
                    <th className="py-3 px-4">Headline & Lead</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Author / Desk</th>
                    <th className="py-3 px-4">Timeline</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2E333D]">
                  {articles.map((article) => (
                    <tr
                      key={article.id}
                      className="hover:bg-[#1A1D24] transition-colors group"
                    >
                      {/* Headline & Thumbnail */}
                      <td className="py-3.5 px-4 max-w-sm">
                        <div className="flex items-start gap-3">
                          <img
                            src={article.image}
                            alt=""
                            className="w-12 h-12 rounded object-cover flex-shrink-0 bg-[#0F1115] border border-[#2E333D]"
                          />
                          <div className="truncate">
                            <h4
                              onClick={() => handleOpenEditModal(article)}
                              className="font-serif font-bold text-sm text-white hover:text-[#E63946] cursor-pointer truncate mb-0.5"
                            >
                              {article.title}
                            </h4>
                            <p className="text-[11px] text-[#A7AAB0] line-clamp-1">
                              {article.summary}
                            </p>
                            <span className="text-[10px] text-[#5F6368] font-mono block mt-0.5">
                              /article/{article.slug || article.id}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-[#0F1115] border border-[#2E333D] text-white">
                          {article.category}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        {renderStatusBadge(article.status || 'published')}
                      </td>

                      {/* Author */}
                      <td className="py-3.5 px-4">
                        <span className="text-white font-medium block">
                          {article.author.name}
                        </span>
                        <span className="text-[10px] text-[#5F6368]">
                          {article.author.role}
                        </span>
                      </td>

                      {/* Timeline / Scheduled date */}
                      <td className="py-3.5 px-4 text-[11px]">
                        {article.status === 'scheduled' && article.scheduledAt ? (
                          <div className="text-blue-400">
                            <span className="font-bold block">Scheduled for:</span>
                            <span>{new Date(article.scheduledAt).toLocaleString()}</span>
                          </div>
                        ) : (
                          <div>
                            <span className="text-[#5F6368] block">Published:</span>
                            <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Edit */}
                          <button
                            onClick={() => handleOpenEditModal(article)}
                            className="p-1.5 rounded bg-[#0F1115] hover:bg-[#252A34] text-[#A7AAB0] hover:text-white border border-[#2E333D] transition-colors"
                            title="Edit full story"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          {/* Quick Toggle Status Dropdown */}
                          <div className="relative group/status">
                            <button
                              className="p-1.5 rounded bg-[#0F1115] hover:bg-[#252A34] text-[#A7AAB0] hover:text-white border border-[#2E333D] transition-colors flex items-center gap-1 text-[11px]"
                              title="Change status"
                            >
                              <Layers className="w-3.5 h-3.5" />
                            </button>
                            <div className="absolute right-0 top-full mt-1 w-36 bg-[#14171D] border border-[#2E333D] rounded-lg shadow-xl p-1 hidden group-hover/status:block z-40 text-left">
                              {article.status !== 'published' && (
                                <button
                                  onClick={() => handleQuickStatusChange(article, 'published')}
                                  className="w-full px-2 py-1 text-[11px] text-emerald-400 hover:bg-[#1A1D24] rounded text-left"
                                >
                                  ✓ Publish Live
                                </button>
                              )}
                              {article.status !== 'draft' && (
                                <button
                                  onClick={() => handleQuickStatusChange(article, 'draft')}
                                  className="w-full px-2 py-1 text-[11px] text-amber-400 hover:bg-[#1A1D24] rounded text-left"
                                >
                                  ✎ Move to Draft
                                </button>
                              )}
                              {article.status !== 'scheduled' && (
                                <button
                                  onClick={() => handleQuickStatusChange(article, 'scheduled')}
                                  className="w-full px-2 py-1 text-[11px] text-blue-400 hover:bg-[#1A1D24] rounded text-left"
                                >
                                  ⏱ Schedule (2h)
                                </button>
                              )}
                              {article.status !== 'archived' && (
                                <button
                                  onClick={() => handleQuickStatusChange(article, 'archived')}
                                  className="w-full px-2 py-1 text-[11px] text-gray-400 hover:bg-[#1A1D24] rounded text-left"
                                >
                                  📁 Archive Story
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Delete */}
                          <button
                            onClick={() => setDeleteConfirmId(article.id)}
                            className="p-1.5 rounded bg-[#0F1115] hover:bg-red-950/40 text-[#A7AAB0] hover:text-red-400 border border-[#2E333D] hover:border-red-800 transition-colors"
                            title="Delete article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#14171D] border border-red-900 rounded-xl p-6 max-w-sm w-full shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-red-950/50 border border-red-800 text-red-400 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-white text-base">Permanently Delete Dispatch?</h3>
            <p className="text-xs text-[#A7AAB0]">
              This will remove the story from both public feeds and internal registries.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-lg bg-[#0F1115] border border-[#2E333D] text-xs font-semibold text-[#A7AAB0] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteArticle(deleteConfirmId)}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white uppercase tracking-wider"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Article Editor Modal */}
      <ArticleEditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        articleToEdit={articleToEdit}
        onSave={handleSaveArticle}
      />

      {/* Google News Indexing Hub Modal */}
      <GoogleNewsIndexingHub
        isOpen={indexingHubOpen}
        onClose={() => setIndexingHubOpen(false)}
        publishedCount={articles.filter((a) => a.status === 'published').length}
      />
    </div>
  );
};
