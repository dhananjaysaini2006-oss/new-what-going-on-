import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import {
  generateArticleTLDR,
  generateELI5Explanation,
  generateFactDossier,
  translateArticleToIndic,
  INDIC_LANGUAGES,
  IndicLanguage,
  ArticleTLDR,
  FactDossier,
  TranslatedContent,
} from '../utils/ai';
import {
  Sparkles,
  Zap,
  Globe,
  HelpCircle,
  FileCheck2,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Copy,
  Check,
  Languages,
  Clock,
  ShieldCheck,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AIArticleInsightsProps {
  article: Article;
  onNotify?: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
}

type TabType = 'tldr' | 'translation' | 'eli5' | 'dossier';

export const AIArticleInsights: React.FC<AIArticleInsightsProps> = ({ article, onNotify }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<TabType>('tldr');
  
  // State for AI generation results
  const [tldr, setTldr] = useState<ArticleTLDR | null>(null);
  const [loadingTldr, setLoadingTldr] = useState<boolean>(false);

  const [selectedLang, setSelectedLang] = useState<IndicLanguage>('hi');
  const [translation, setTranslation] = useState<TranslatedContent | null>(null);
  const [loadingTranslation, setLoadingTranslation] = useState<boolean>(false);

  const [eli5, setEli5] = useState<string | null>(null);
  const [loadingEli5, setLoadingEli5] = useState<boolean>(false);

  const [dossier, setDossier] = useState<FactDossier | null>(null);
  const [loadingDossier, setLoadingDossier] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  // Load TLDR automatically on mount or article change
  useEffect(() => {
    let isMounted = true;
    async function loadInitialTLDR() {
      setLoadingTldr(true);
      try {
        const res = await generateArticleTLDR(article);
        if (isMounted) setTldr(res);
      } catch (err) {
        console.error('Failed to generate TLDR:', err);
      } finally {
        if (isMounted) setLoadingTldr(false);
      }
    }

    loadInitialTLDR();
    // Reset other tab states on article switch
    setTranslation(null);
    setEli5(null);
    setDossier(null);

    return () => {
      isMounted = false;
    };
  }, [article]);

  // Lazy load tab contents when selected
  useEffect(() => {
    if (activeTab === 'translation' && !translation && !loadingTranslation) {
      handleTranslate(selectedLang);
    } else if (activeTab === 'eli5' && !eli5 && !loadingEli5) {
      handleLoadELI5();
    } else if (activeTab === 'dossier' && !dossier && !loadingDossier) {
      handleLoadDossier();
    }
  }, [activeTab]);

  const handleTranslate = async (lang: IndicLanguage) => {
    setSelectedLang(lang);
    setLoadingTranslation(true);
    try {
      const res = await translateArticleToIndic(article, lang);
      setTranslation(res);
    } catch (err) {
      console.error('Translation error:', err);
    } finally {
      setLoadingTranslation(false);
    }
  };

  const handleLoadELI5 = async () => {
    setLoadingEli5(true);
    try {
      const res = await generateELI5Explanation(article);
      setEli5(res);
    } catch (err) {
      console.error('ELI5 generation error:', err);
    } finally {
      setLoadingEli5(false);
    }
  };

  const handleLoadDossier = async () => {
    setLoadingDossier(true);
    try {
      const res = await generateFactDossier(article);
      setDossier(res);
    } catch (err) {
      console.error('Fact dossier error:', err);
    } finally {
      setLoadingDossier(false);
    }
  };

  const handleCopyInsight = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      onNotify?.('Copied to Clipboard', 'AI editorial insight copied successfully.', 'success');
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="my-8 rounded-xl border border-[#D9D9D5] dark:border-[#2E333D] bg-white dark:bg-[#14171D] shadow-sm overflow-hidden transition-all">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-[#F4F4F0] via-[#FAF9F5] to-[#F4F4F0] dark:from-[#171B22] dark:via-[#1A1E27] dark:to-[#171B22] border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#E63946]/10 dark:bg-[#E63946]/20 border border-[#E63946]/30 flex items-center justify-center text-[#E63946]">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-black uppercase tracking-wider text-[#111215] dark:text-[#F5F5F2]">
                AI Editorial Intelligence Suite
              </h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E63946] text-white uppercase tracking-widest">
                Real-Time
              </span>
            </div>
            <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
              Automated executive summary, Indic regional translation, ELI5 explanation & factual verification
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-lg border border-[#D9D9D5] dark:border-[#2E333D] hover:bg-[#EAEAEA] dark:hover:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0] transition-colors"
          title={isExpanded ? 'Collapse AI Suite' : 'Expand AI Suite'}
          aria-expanded={isExpanded}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable Body */}
      {isExpanded && (
        <div className="p-4 sm:p-6 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 border-b border-[#D9D9D5] dark:border-[#2E333D]">
            <button
              onClick={() => setActiveTab('tldr')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'tldr'
                  ? 'border-[#E63946] text-[#E63946] bg-[#F4F4F0] dark:bg-[#1A1D24]'
                  : 'border-transparent text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>3-Bullet Takeaways</span>
            </button>

            <button
              onClick={() => setActiveTab('translation')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'translation'
                  ? 'border-[#E63946] text-[#E63946] bg-[#F4F4F0] dark:bg-[#1A1D24]'
                  : 'border-transparent text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white'
              }`}
            >
              <Languages className="w-3.5 h-3.5" />
              <span>Indic Translation</span>
            </button>

            <button
              onClick={() => setActiveTab('eli5')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'eli5'
                  ? 'border-[#E63946] text-[#E63946] bg-[#F4F4F0] dark:bg-[#1A1D24]'
                  : 'border-transparent text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Explain Like I’m 5</span>
            </button>

            <button
              onClick={() => setActiveTab('dossier')}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                activeTab === 'dossier'
                  ? 'border-[#E63946] text-[#E63946] bg-[#F4F4F0] dark:bg-[#1A1D24]'
                  : 'border-transparent text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white'
              }`}
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Fact Dossier & Timeline</span>
            </button>
          </div>

          {/* TAB 1: 3-BULLET TL;DR */}
          {activeTab === 'tldr' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#E63946]" />
                  Executive 60-Second Briefing
                </span>
                {tldr && (
                  <button
                    onClick={() => handleCopyInsight(tldr.takeaways.join('\n• '))}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#E63946] transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy TL;DR'}</span>
                  </button>
                )}
              </div>

              {loadingTldr ? (
                <div className="p-6 text-center space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#E63946] mx-auto" />
                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                    Synthesizing core takeaways from editorial transcript...
                  </p>
                </div>
              ) : tldr ? (
                <div className="space-y-3">
                  <ul className="space-y-2.5">
                    {tldr.takeaways.map((point, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 p-3 rounded-lg bg-[#F8F8F6] dark:bg-[#1A1E27] border border-[#EAEAE6] dark:border-[#2A303C] text-xs sm:text-sm text-[#111215] dark:text-[#F5F5F2] leading-relaxed"
                      >
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#E63946] text-white text-[11px] font-bold flex items-center justify-center mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {tldr.keyFigureOrStat && (
                    <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-between gap-3 text-xs text-emerald-900 dark:text-emerald-300">
                      <span className="font-bold flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        Verified Data Anchor:
                      </span>
                      <span className="font-mono font-bold text-right">{tldr.keyFigureOrStat}</span>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 2: INDIC TRANSLATION */}
          {activeTab === 'translation' && (
            <div className="space-y-4">
              {/* Language Selector Dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D]">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#E63946]" />
                  <span className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2]">
                    Select Regional Language:
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedLang}
                    onChange={(e) => handleTranslate(e.target.value as IndicLanguage)}
                    className="px-3 py-1.5 text-xs font-bold rounded-md bg-white dark:bg-[#0F1115] border border-[#D9D9D5] dark:border-[#2E333D] text-[#111215] dark:text-[#F5F5F2] focus:outline-none focus:border-[#E63946]"
                  >
                    {INDIC_LANGUAGES.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.name} ({lang.nativeName})
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleTranslate(selectedLang)}
                    disabled={loadingTranslation}
                    className="p-1.5 rounded-md bg-white dark:bg-[#0F1115] border border-[#D9D9D5] dark:border-[#2E333D] hover:text-[#E63946] text-[#5F6368] dark:text-[#A7AAB0]"
                    title="Refresh translation"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loadingTranslation ? 'animate-spin text-[#E63946]' : ''}`} />
                  </button>
                </div>
              </div>

              {loadingTranslation ? (
                <div className="p-6 text-center space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-[#E63946] mx-auto" />
                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                    Translating into regional dialect with localized syntax...
                  </p>
                </div>
              ) : translation ? (
                <div className="space-y-4 p-4 rounded-lg bg-[#F8F8F6] dark:bg-[#1A1E27] border border-[#EAEAE6] dark:border-[#2A303C]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#E63946] block mb-1">
                      {translation.languageName} Translated Headline
                    </span>
                    <h4 className="font-serif font-bold text-base sm:text-lg text-[#111215] dark:text-[#F5F5F2]">
                      {translation.title}
                    </h4>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5F6368] dark:text-[#A7AAB0] leading-relaxed">
                    {translation.summary}
                  </p>

                  {translation.translatedTakeaways.length > 0 && (
                    <div className="pt-2 border-t border-[#D9D9D5] dark:border-[#2E333D] space-y-2">
                      <span className="text-[11px] uppercase font-bold text-[#111215] dark:text-[#F5F5F2] block">
                        मुख्य बिंदु (Key Highlights)
                      </span>
                      <ul className="space-y-1.5 text-xs text-[#111215] dark:text-[#F5F5F2]">
                        {translation.translatedTakeaways.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-[#E63946] font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {translation.keyQuote && (
                    <blockquote className="p-3 rounded bg-white dark:bg-[#0F1115] border-l-2 border-[#E63946] text-xs italic text-[#111215] dark:text-[#F5F5F2]">
                      {translation.keyQuote}
                    </blockquote>
                  )}
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 3: EXPLAIN LIKE I'M 5 (ELI5) */}
          {activeTab === 'eli5' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-500" />
                  Simplified Conceptual Analogy
                </span>
                {eli5 && (
                  <button
                    onClick={() => handleCopyInsight(eli5)}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#E63946] transition-colors"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy Explanation'}</span>
                  </button>
                )}
              </div>

              {loadingEli5 ? (
                <div className="p-6 text-center space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-amber-500 mx-auto" />
                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                    Converting policy jargon into everyday analogies...
                  </p>
                </div>
              ) : eli5 ? (
                <div className="p-4 sm:p-5 rounded-lg bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed space-y-3">
                  <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-400 text-xs uppercase tracking-wider">
                    <span>💡 The Simple Picture:</span>
                  </div>
                  <p className="whitespace-pre-line font-serif">{eli5}</p>
                </div>
              ) : null}
            </div>
          )}

          {/* TAB 4: FACT DOSSIER & TIMELINE */}
          {activeTab === 'dossier' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#5F6368] dark:text-[#A7AAB0] flex items-center gap-1.5">
                  <FileCheck2 className="w-3.5 h-3.5 text-blue-500" />
                  Factual Context & Sequence of Events
                </span>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  Verified Dispatch
                </span>
              </div>

              {loadingDossier ? (
                <div className="p-6 text-center space-y-2">
                  <RefreshCw className="w-5 h-5 animate-spin text-blue-500 mx-auto" />
                  <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
                    Compiling timeline milestones and statutory records...
                  </p>
                </div>
              ) : dossier ? (
                <div className="space-y-4">
                  {/* Entity Tags */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2]">
                      Key Stakeholders:
                    </span>
                    {dossier.keyEntities.map((ent, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] text-[11px] text-[#111215] dark:text-[#F5F5F2]"
                      >
                        <strong className="font-semibold">{ent.name}</strong>{' '}
                        <span className="text-[#5F6368] dark:text-[#A7AAB0]">({ent.role})</span>
                      </span>
                    ))}
                  </div>

                  {/* Timeline */}
                  <div className="space-y-3 pt-2">
                    <span className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2] block">
                      Chronological Milestone Path:
                    </span>
                    <div className="relative pl-4 border-l-2 border-[#E63946] space-y-3">
                      {dossier.timeline.map((item, idx) => (
                        <div key={idx} className="relative">
                          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#E63946] ring-4 ring-white dark:ring-[#14171D]"></div>
                          <div className="text-xs">
                            <span className="font-mono font-bold text-[#E63946]">{item.dateOrPhase}</span>
                            <h5 className="font-bold text-[#111215] dark:text-[#F5F5F2]">{item.headline}</h5>
                            <p className="text-[#5F6368] dark:text-[#A7AAB0] mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-2.5 rounded bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] text-[11px] text-[#5F6368] dark:text-[#A7AAB0] flex items-center justify-between">
                    <span>Source: {dossier.verifiedSource}</span>
                    <span className="font-mono text-emerald-500">Editorial Audit Passed</span>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
