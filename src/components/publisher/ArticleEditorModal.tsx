import React, { useState, useEffect } from 'react';
import { Article, ArticleStatus, CategoryType } from '../../types';
import {
  X,
  Save,
  CheckCircle2,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  Globe,
  Tag,
  Clock,
  AlertCircle,
  FileText,
  Eye,
  Flame,
  Shield,
  Layers,
} from 'lucide-react';
import { generateSlug } from '../../utils/slug';

interface ArticleEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  articleToEdit: Article | null;
  onSave: (articleData: Partial<Article>) => Promise<void>;
}

const CATEGORIES: CategoryType[] = [
  'World',
  'India',
  'Politics',
  'AI & Tech',
  'Business',
  'Markets',
  'Climate',
  'Science',
  'Culture',
  'Sports',
  'Opinion',
  'In-Depth',
];

export const ArticleEditorModal: React.FC<ArticleEditorModalProps> = ({
  isOpen,
  onClose,
  articleToEdit,
  onSave,
}) => {
  const [title, setTitle] = useState<string>('');
  const [subtitle, setSubtitle] = useState<string>('');
  const [slug, setSlug] = useState<string>('');
  const [summary, setSummary] = useState<string>('');
  const [category, setCategory] = useState<CategoryType>('India');
  const [status, setStatus] = useState<ArticleStatus>('published');
  const [scheduledAt, setScheduledAt] = useState<string>('');
  const [readingTime, setReadingTime] = useState<number>(4);
  const [image, setImage] = useState<string>('');
  const [imageCaption, setImageCaption] = useState<string>('');
  const [imageCredit, setImageCredit] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('Editorial Bureau');
  const [authorRole, setAuthorRole] = useState<string>('Senior Correspondent');
  const [authorLocation, setAuthorLocation] = useState<string>('New Delhi');
  const [authorAvatar, setAuthorAvatar] = useState<string>('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
  const [authorBio, setAuthorBio] = useState<string>('Reporting on national governance, geopolitics, and socio-economic transformation.');
  const [contentBody, setContentBody] = useState<string>('');
  const [pullQuote, setPullQuote] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [isBreaking, setIsBreaking] = useState<boolean>(false);
  const [featured, setFeatured] = useState<boolean>(false);
  const [isInvestigative, setIsInvestigative] = useState<boolean>(false);
  
  // SEO fields
  const [seoTitle, setSeoTitle] = useState<string>('');
  const [seoDescription, setSeoDescription] = useState<string>('');
  
  const [activeTab, setActiveTab] = useState<'content' | 'media' | 'seo' | 'publishing'>('content');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (articleToEdit) {
      setTitle(articleToEdit.title || '');
      setSubtitle(articleToEdit.subtitle || '');
      setSlug(articleToEdit.slug || generateSlug(articleToEdit.title || ''));
      setSummary(articleToEdit.summary || '');
      setCategory(articleToEdit.category || 'India');
      setStatus(articleToEdit.status || 'published');
      setScheduledAt(articleToEdit.scheduledAt ? articleToEdit.scheduledAt.slice(0, 16) : '');
      setReadingTime(articleToEdit.readingTime || 4);
      setImage(articleToEdit.image || '');
      setImageCaption(articleToEdit.imageCaption || '');
      setImageCredit(articleToEdit.imageCredit || '');
      setAuthorName(articleToEdit.author?.name || 'Editorial Bureau');
      setAuthorRole(articleToEdit.author?.role || 'Correspondent');
      setAuthorLocation(articleToEdit.author?.location || 'New Delhi');
      setAuthorAvatar(articleToEdit.author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
      setAuthorBio(articleToEdit.author?.bio || '');
      setContentBody(Array.isArray(articleToEdit.content) ? articleToEdit.content.join('\n\n') : '');
      setPullQuote(articleToEdit.pullQuote || '');
      setTagsInput(Array.isArray(articleToEdit.tags) ? articleToEdit.tags.join(', ') : '');
      setIsBreaking(!!articleToEdit.isBreaking);
      setFeatured(!!articleToEdit.featured);
      setIsInvestigative(!!articleToEdit.isInvestigative);
      setSeoTitle(articleToEdit.seoTitle || articleToEdit.title || '');
      setSeoDescription(articleToEdit.seoDescription || articleToEdit.summary || '');
    } else {
      // Default new article template
      setTitle('');
      setSubtitle('');
      setSlug('');
      setSummary('');
      setCategory('India');
      setStatus('published');
      setScheduledAt('');
      setReadingTime(4);
      setImage('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80');
      setImageCaption('Dispatches from What’s Going On newsroom.');
      setImageCredit('Newsroom Photo / What’s Going On');
      setAuthorName('Editorial Bureau');
      setAuthorRole('Senior Correspondent');
      setAuthorLocation('New Delhi');
      setAuthorAvatar('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80');
      setAuthorBio('Reporting on national governance, geopolitics, and socioeconomic change.');
      setContentBody('Enter the primary dispatch coverage here. Separate paragraphs with a blank line.');
      setPullQuote('');
      setTagsInput('India, Governance, Breaking News');
      setIsBreaking(false);
      setFeatured(false);
      setIsInvestigative(false);
      setSeoTitle('');
      setSeoDescription('');
    }
    setErrorMessage(null);
  }, [articleToEdit, isOpen]);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!articleToEdit) {
      setSlug(generateSlug(val));
      if (!seoTitle) setSeoTitle(val);
    }
  };

  const handleSummaryChange = (val: string) => {
    setSummary(val);
    if (!seoDescription) setSeoDescription(val);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Article headline title is required.');
      setActiveTab('content');
      return;
    }

    if (!summary.trim()) {
      setErrorMessage('Article lead summary is required.');
      setActiveTab('content');
      return;
    }

    if (status === 'scheduled' && !scheduledAt) {
      setErrorMessage('Please select a scheduled publication date and time.');
      setActiveTab('publishing');
      return;
    }

    const paragraphs = contentBody
      .split('\n\n')
      .map((p) => p.trim())
      .filter(Boolean);

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const articlePayload: Partial<Article> = {
      ...(articleToEdit ? { id: articleToEdit.id } : {}),
      title: title.trim(),
      subtitle: subtitle.trim(),
      slug: slug.trim() || generateSlug(title),
      summary: summary.trim(),
      category,
      status,
      scheduledAt: status === 'scheduled' ? new Date(scheduledAt).toISOString() : undefined,
      readingTime: Number(readingTime) || 3,
      image: image.trim() || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80',
      imageCaption: imageCaption.trim(),
      imageCredit: imageCredit.trim(),
      author: {
        name: authorName.trim() || 'Staff Bureau',
        role: authorRole.trim() || 'Correspondent',
        location: authorLocation.trim(),
        avatar: authorAvatar.trim() || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        bio: authorBio.trim(),
      },
      content: paragraphs.length > 0 ? paragraphs : [summary.trim()],
      pullQuote: pullQuote.trim() || undefined,
      tags: tags.length > 0 ? tags : [category],
      isBreaking,
      featured,
      isInvestigative,
      seoTitle: seoTitle.trim() || title.trim(),
      seoDescription: seoDescription.trim() || summary.trim(),
    };

    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await onSave(articlePayload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save article.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      id="article-editor-modal-overlay"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="article-editor-modal-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#14171D] border border-[#2E333D] text-[#F5F5F2] w-full max-w-4xl max-h-[92vh] rounded-xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#2E333D] flex items-center justify-between bg-[#1A1D24]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#E63946] flex items-center justify-center text-white font-bold text-sm">
              ✍️
            </div>
            <div>
              <h2 className="font-display font-bold text-lg text-white">
                {articleToEdit ? `Edit Dispatch: ${articleToEdit.title.slice(0, 40)}...` : 'Compose New Newsroom Dispatch'}
              </h2>
              <span className="text-xs text-[#A7AAB0]">
                Editorial CMS & Google News Publishing Suite
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#A7AAB0] hover:text-white hover:bg-[#252A34] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-[#2E333D] bg-[#111215] text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('content')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'content'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-[#A7AAB0] hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Story & Content</span>
          </button>
          <button
            onClick={() => setActiveTab('media')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'media'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-[#A7AAB0] hover:text-white'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Photo & Journalism Media</span>
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'seo'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-[#A7AAB0] hover:text-white'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Google News & SEO Schema</span>
          </button>
          <button
            onClick={() => setActiveTab('publishing')}
            className={`pb-2.5 px-3 border-b-2 transition-all flex items-center gap-1.5 ${
              activeTab === 'publishing'
                ? 'border-[#E63946] text-[#E63946]'
                : 'border-transparent text-[#A7AAB0] hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Publishing & Status ({status.toUpperCase()})</span>
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-xs text-red-300 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* TAB 1: STORY & CONTENT */}
          {activeTab === 'content' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  Headline Title <span className="text-[#E63946]">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. India Unveils Nationwide Clean Hydrogen Corridors in Renewable Pivot"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Sub-headline / Dek (Optional)
                  </label>
                  <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Short complementary kicker"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Category Desk <span className="text-[#E63946]">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as CategoryType)}
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white focus:outline-none focus:border-[#E63946]"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  Lead Summary / Snippet <span className="text-[#E63946]">*</span>
                </label>
                <textarea
                  value={summary}
                  onChange={(e) => handleSummaryChange(e.target.value)}
                  rows={2}
                  placeholder="2-3 sentence overview rendered in headlines, wire streams, and RSS feeds"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  Full Dispatch Body (Paragraphs separated by blank line)
                </label>
                <textarea
                  value={contentBody}
                  onChange={(e) => setContentBody(e.target.value)}
                  rows={8}
                  placeholder="Draft your complete journalistic story here..."
                  className="w-full p-3 text-xs sm:text-sm font-serif-body rounded-lg bg-[#0F1115] border border-[#2E333D] text-[#F5F5F2] placeholder-[#5F6368] focus:outline-none focus:border-[#E63946] leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Pull Quote (Optional)
                  </label>
                  <input
                    type="text"
                    value={pullQuote}
                    onChange={(e) => setPullQuote(e.target.value)}
                    placeholder="Striking quote for pullout block"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Tags (Comma-separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Energy, Policy, Renewable, India"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  />
                </div>
              </div>

              {/* Author & Correspondent Details */}
              <div className="pt-4 border-t border-[#2E333D]">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                  Author & Bylines
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#A7AAB0] mb-1">Author Name</label>
                    <input
                      type="text"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-[#0F1115] border border-[#2E333D] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A7AAB0] mb-1">Role / Beat</label>
                    <input
                      type="text"
                      value={authorRole}
                      onChange={(e) => setAuthorRole(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-[#0F1115] border border-[#2E333D] text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#A7AAB0] mb-1">Bureau Location</label>
                    <input
                      type="text"
                      value={authorLocation}
                      onChange={(e) => setAuthorLocation(e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs rounded bg-[#0F1115] border border-[#2E333D] text-white"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PHOTO & JOURNALISM MEDIA */}
          {activeTab === 'media' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  Headline Photograph URL
                </label>
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                />
              </div>

              {/* Image Preview Container */}
              {image && (
                <div className="relative rounded-lg overflow-hidden border border-[#2E333D] aspect-[16/9] max-h-56 bg-[#0F1115]">
                  <img
                    src={image}
                    alt="Article Lead Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white">
                    <span className="font-bold">{imageCaption || 'Caption preview'}</span>
                    {imageCredit && <span className="block text-[10px] text-gray-300">Photo: {imageCredit}</span>}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Image Caption
                  </label>
                  <input
                    type="text"
                    value={imageCaption}
                    onChange={(e) => setImageCaption(e.target.value)}
                    placeholder="Descriptive journalistic caption"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                    Photographer / Agency Credit
                  </label>
                  <input
                    type="text"
                    value={imageCredit}
                    onChange={(e) => setImageCredit(e.target.value)}
                    placeholder="e.g. PTI / Reuters / Staff"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: GOOGLE NEWS & SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  URL Slug (Canonical Permastructure)
                </label>
                <div className="flex items-center rounded-lg bg-[#0F1115] border border-[#2E333D] px-3 py-2 text-xs text-[#A7AAB0]">
                  <span className="text-[#5F6368] mr-1">/article/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="flex-1 bg-transparent text-white focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setSlug(generateSlug(title))}
                    className="text-[11px] font-bold text-[#E63946] hover:underline"
                  >
                    Auto
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  SEO Title (Recommended under 65 chars)
                </label>
                <input
                  type="text"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'Search title'}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                />
                <span className="text-[10px] text-[#5F6368] mt-1 block">
                  {seoTitle.length}/65 characters
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-1.5">
                  SEO Meta Description (Under 160 chars)
                </label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  rows={2}
                  placeholder={summary || 'Search meta snippet'}
                  className="w-full px-3 py-2 text-xs rounded-lg bg-[#0F1115] border border-[#2E333D] text-white placeholder-[#5F6368] focus:outline-none focus:border-[#E63946]"
                />
                <span className="text-[10px] text-[#5F6368] mt-1 block">
                  {seoDescription.length}/160 characters
                </span>
              </div>

              {/* SERP Search Preview */}
              <div className="p-4 rounded-lg bg-[#0F1115] border border-[#2E333D] space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#B7A58A] block mb-1">
                  Google Search & News Preview
                </span>
                <span className="text-xs text-blue-400 font-medium block truncate hover:underline cursor-pointer">
                  {seoTitle || title || 'Headline Preview'} | What’s Going On
                </span>
                <span className="text-[11px] text-emerald-400 font-mono block">
                  https://whatsgoingon.news/article/{slug || 'headline-slug'}
                </span>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {seoDescription || summary || 'Article summary rendered on search engines and syndicated feeds.'}
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: PUBLISHING & STATUS */}
          {activeTab === 'publishing' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#A7AAB0] mb-2">
                  Publication Status <span className="text-[#E63946]">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { val: 'published', label: 'Published Live', desc: 'Immediately visible to all readers', color: 'border-emerald-600 bg-emerald-950/20 text-emerald-300' },
                    { val: 'draft', label: 'Newsroom Draft', desc: 'Hidden from readers and sitemaps', color: 'border-amber-600 bg-amber-950/20 text-amber-300' },
                    { val: 'scheduled', label: 'Schedule Post', desc: 'Auto-publishes at chosen time', color: 'border-blue-600 bg-blue-950/20 text-blue-300' },
                    { val: 'archived', label: 'Archived Story', desc: 'Preserved but removed from main feed', color: 'border-gray-600 bg-gray-900/30 text-gray-300' },
                  ].map((opt) => (
                    <label
                      key={opt.val}
                      className={`p-3 rounded-lg border cursor-pointer transition-all ${
                        status === opt.val
                          ? `${opt.color} ring-1 ring-white/20 font-bold`
                          : 'border-[#2E333D] bg-[#0F1115] text-[#A7AAB0] hover:border-gray-500'
                      }`}
                    >
                      <input
                        type="radio"
                        name="status"
                        value={opt.val}
                        checked={status === opt.val}
                        onChange={() => setStatus(opt.val as ArticleStatus)}
                        className="sr-only"
                      />
                      <span className="block text-xs mb-0.5">{opt.label}</span>
                      <span className="block text-[10px] opacity-70 font-normal leading-tight">
                        {opt.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Scheduled Date/Time Input */}
              {status === 'scheduled' && (
                <div className="p-4 rounded-lg bg-blue-950/30 border border-blue-800 space-y-2">
                  <label className="block text-xs font-bold text-blue-300 flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Scheduled Release Date & Time (UTC/IST)</span>
                  </label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded bg-[#0F1115] border border-blue-700 text-white focus:outline-none"
                    required
                  />
                  <p className="text-[11px] text-blue-200">
                    Draft will remain strictly hidden from readers until the scheduled timestamp is reached.
                  </p>
                </div>
              )}

              {/* Editorial Placement Flags */}
              <div className="pt-4 border-t border-[#2E333D]">
                <span className="text-xs font-bold uppercase tracking-wider text-white block mb-3">
                  Front Page & Editorial Flags
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <label className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0F1115] border border-[#2E333D] cursor-pointer hover:border-gray-500">
                    <input
                      type="checkbox"
                      checked={isBreaking}
                      onChange={(e) => setIsBreaking(e.target.checked)}
                      className="rounded bg-[#14171D] border-[#2E333D] text-[#E63946] focus:ring-[#E63946]"
                    />
                    <div>
                      <span className="font-bold text-white block">Breaking Banner</span>
                      <span className="text-[10px] text-[#A7AAB0]">Flash in live red ticker</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0F1115] border border-[#2E333D] cursor-pointer hover:border-gray-500">
                    <input
                      type="checkbox"
                      checked={featured}
                      onChange={(e) => setFeatured(e.target.checked)}
                      className="rounded bg-[#14171D] border-[#2E333D] text-[#E63946] focus:ring-[#E63946]"
                    />
                    <div>
                      <span className="font-bold text-white block">Featured Lead Story</span>
                      <span className="text-[10px] text-[#A7AAB0]">Anchor top hero slot</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-2.5 p-3 rounded-lg bg-[#0F1115] border border-[#2E333D] cursor-pointer hover:border-gray-500">
                    <input
                      type="checkbox"
                      checked={isInvestigative}
                      onChange={(e) => setIsInvestigative(e.target.checked)}
                      className="rounded bg-[#14171D] border-[#2E333D] text-[#E63946] focus:ring-[#E63946]"
                    />
                    <div>
                      <span className="font-bold text-white block">Investigative Special</span>
                      <span className="text-[10px] text-[#A7AAB0]">Deep analytical spotlight</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[#2E333D] flex items-center justify-between bg-[#1A1D24]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#A7AAB0] hover:text-white rounded-lg border border-[#2E333D] hover:bg-[#252A34] transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="px-5 py-2 rounded-lg bg-[#E63946] hover:bg-[#C92A37] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>
                {isSubmitting
                  ? 'Saving...'
                  : status === 'published'
                  ? 'Publish Dispatch Now'
                  : status === 'scheduled'
                  ? 'Schedule Dispatch'
                  : 'Save Story'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
