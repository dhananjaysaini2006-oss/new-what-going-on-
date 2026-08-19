import React, { useState } from 'react';
import { VisualStory, Article } from '../types';
import { Camera, Maximize2, X, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface VisualJournalismProps {
  stories: VisualStory[];
  articles: Article[];
  onSelectArticleById?: (id: string) => void;
}

export const VisualJournalism: React.FC<VisualJournalismProps> = ({ stories, articles, onSelectArticleById }) => {
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number>(0);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const activeStory = stories[selectedStoryIndex] || stories[0];
  if (!activeStory) return null;

  const currentImage = activeStory.images[activeImageIndex] || activeStory.images[0];

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % activeStory.images.length);
  };

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev - 1 + activeStory.images.length) % activeStory.images.length);
  };

  return (
    <section className="py-10 sm:py-14 border-b border-[#D9D9D5] dark:border-[#2E333D] bg-[#FBFBF9] dark:bg-[#0F1115] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-[#111215] dark:border-[#F5F5F2] mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#E63946] flex items-center gap-1.5 mb-1">
              <Camera className="w-3.5 h-3.5" />
              PHOTO ESSAY & DOCUMENTARY
            </span>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#111215] dark:text-[#F5F5F2]">
              VISUAL JOURNALISM
            </h2>
          </div>

          {/* Story Selector Tabs if multiple */}
          {stories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {stories.map((s, idx) => (
                <button
                  key={s.id}
                  id={`vis-tab-${s.id}`}
                  onClick={() => {
                    setSelectedStoryIndex(idx);
                    setActiveImageIndex(0);
                  }}
                  className={`text-xs px-3 py-1.5 rounded-md font-semibold transition-all whitespace-nowrap ${
                    selectedStoryIndex === idx
                      ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215]'
                      : 'bg-[#F4F4F0] dark:bg-[#1A1D24] text-[#5F6368] dark:text-[#A7AAB0]'
                  }`}
                >
                  {s.location}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Visual Story Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Visual Carousel (8 cols) */}
          <div className="lg:col-span-8">
            <div className="relative rounded-lg overflow-hidden bg-black aspect-[16/10] border border-[#D9D9D5] dark:border-[#2E333D] group">
              <img
                src={currentImage.url || 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80'}
                alt={currentImage.caption}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80';
                }}
              />

              {/* Lightbox Trigger */}
              <button
                id="open-lightbox-btn"
                onClick={() => setLightboxOpen(true)}
                className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-black/80 text-white rounded-md backdrop-blur-xs transition-colors"
                aria-label="Expand image to fullscreen"
                title="Fullscreen view"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                aria-label="Previous photograph"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                aria-label="Next photograph"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image slide index counter */}
              <div className="absolute bottom-3 right-3 px-2.5 py-1 bg-black/70 backdrop-blur-xs text-white text-xs font-mono rounded">
                {activeImageIndex + 1} / {activeStory.images.length}
              </div>
            </div>

            {/* Image Caption & Credit */}
            <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#5F6368] dark:text-[#A7AAB0]">
              <p className="italic">{currentImage.caption}</p>
              <span className="font-semibold text-[#111215] dark:text-[#F5F5F2] flex-shrink-0">
                Photo: {currentImage.credit}
              </span>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 mt-4 overflow-x-auto no-scrollbar pb-1">
              {activeStory.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative flex-shrink-0 w-20 h-14 rounded overflow-hidden border-2 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#E63946] scale-102 shadow-md'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Story Narrative / Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4 lg:border-l lg:border-[#D9D9D5] lg:dark:border-[#2E333D] lg:pl-8">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E63946]">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeStory.location}</span>
            </div>

            <h3 className="font-serif font-bold text-2xl text-[#111215] dark:text-[#F5F5F2] leading-tight">
              {activeStory.title}
            </h3>

            <p className="text-xs font-medium text-[#5F6368] dark:text-[#A7AAB0]">
              {activeStory.subtitle}
            </p>

            <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed">
              {activeStory.description}
            </p>

            <div className="pt-4 border-t border-[#D9D9D5] dark:border-[#2E333D]">
              <div className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2]">
                Photography by {activeStory.photographer}
              </div>
              <div className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0] mt-0.5">
                Special assignment for What's Going On Visual Editions
              </div>

              {activeStory.articleId && onSelectArticleById && (
                <button
                  onClick={() => onSelectArticleById(activeStory.articleId!)}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#E63946] hover:underline underline-offset-4"
                >
                  <span>Read Complete Photo Essay Article</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          id="visual-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-center justify-between text-white pb-4 border-b border-white/20">
            <div>
              <h4 className="text-sm font-bold">{activeStory.title}</h4>
              <p className="text-xs text-white/70">{activeStory.location} • Photo by {currentImage.credit}</p>
            </div>
            <button
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
              aria-label="Close fullscreen view"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center py-4">
            <img
              src={currentImage.url}
              alt={currentImage.caption}
              className="max-h-full max-w-full object-contain rounded-md shadow-2xl"
            />

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center text-xs text-white/80 max-w-2xl mx-auto pt-2">
            <p>{currentImage.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
};
