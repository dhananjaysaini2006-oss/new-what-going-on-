import React, { useState, useEffect } from 'react';
import {
  DAILY_QUIZ_QUESTIONS,
  QuizQuestion,
  getQuizStreak,
  saveQuizResult,
  QuizStreakState,
} from '../data/quiz-data';
import {
  X,
  Flame,
  Award,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Share2,
  RotateCcw,
  ChevronRight,
  Sparkles,
  Trophy,
  Copy,
  Check,
  Zap,
} from 'lucide-react';

interface DailyNewsQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify?: (title: string, message: string, type?: 'info' | 'success' | 'warning') => void;
}

export const DailyNewsQuizModal: React.FC<DailyNewsQuizModalProps> = ({
  isOpen,
  onClose,
  onNotify,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [streakState, setStreakState] = useState<QuizStreakState>(() => getQuizStreak());
  const [copiedReport, setCopiedReport] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setStreakState(getQuizStreak());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentQ: QuizQuestion = DAILY_QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = DAILY_QUIZ_QUESTIONS.length;

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    setUserAnswers((prev) => [...prev, selectedOption]);
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Complete quiz
      const finalAnswers = [...userAnswers];
      let correctCount = 0;
      DAILY_QUIZ_QUESTIONS.forEach((q, i) => {
        if (finalAnswers[i] === q.correctAnswerIndex) {
          correctCount++;
        }
      });
      const updatedStreak = saveQuizResult(correctCount, totalQuestions);
      setStreakState(updatedStreak);
      setIsQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setUserAnswers([]);
    setIsQuizComplete(false);
  };

  const calculateScore = () => {
    let score = 0;
    DAILY_QUIZ_QUESTIONS.forEach((q, i) => {
      if (userAnswers[i] === q.correctAnswerIndex) score++;
    });
    return score;
  };

  const generateReportCardText = () => {
    const score = calculateScore();
    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    
    let boxes = '';
    DAILY_QUIZ_QUESTIONS.forEach((q, i) => {
      boxes += userAnswers[i] === q.correctAnswerIndex ? '🟩' : '🟥';
    });

    return `🇮🇳 What’s Going On — Daily Indian Current Affairs Quiz (${dateStr})\nScore: ${score}/${totalQuestions} ${boxes}\n🔥 Active Streak: ${streakState.currentStreak} Day(s)\nTest your news pulse: ${window.location.origin}`;
  };

  const handleCopyReportCard = () => {
    const text = generateReportCardText();
    navigator.clipboard.writeText(text).then(() => {
      setCopiedReport(true);
      onNotify?.('Report Card Copied', 'Share your quiz score with colleagues and friends!', 'success');
      setTimeout(() => setCopiedReport(false), 2500);
    });
  };

  const score = calculateScore();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-[#14171D] border border-[#D9D9D5] dark:border-[#2E333D] rounded-2xl max-w-xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-[#F4F4F0] dark:bg-[#1A1D24] border-b border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E63946] text-white flex items-center justify-center font-black shadow-sm">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-black text-base text-[#111215] dark:text-[#F5F5F2]">
                  Daily Indian News Quiz
                </h3>
                <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400">
                  <Flame className="w-3 h-3 fill-current" />
                  {streakState.currentStreak} Day Streak
                </span>
              </div>
              <p className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">
                5 daily current affairs, economy, ISRO, and sports questions
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[#D9D9D5] dark:border-[#2E333D] hover:bg-[#EAEAEA] dark:hover:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quiz Progress Bar */}
        {!isQuizComplete && (
          <div className="h-1.5 bg-[#EAEAE6] dark:bg-[#202530] w-full">
            <div
              className="h-full bg-[#E63946] transition-all duration-300"
              style={{ width: `${((currentIndex + (isAnswerSubmitted ? 1 : 0)) / totalQuestions) * 100}%` }}
            ></div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {!isQuizComplete ? (
            <>
              {/* Question Meta & Tag */}
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-1 rounded bg-[#EAEAEA] dark:bg-[#202530] font-bold text-[#111215] dark:text-[#F5F5F2] uppercase tracking-wider text-[10px]">
                  {currentQ.category}
                </span>
                <span className="font-mono text-[#5F6368] dark:text-[#A7AAB0] font-semibold">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>

              {/* Question Headline */}
              <h4 className="font-serif font-bold text-lg sm:text-xl text-[#111215] dark:text-[#F5F5F2] leading-snug">
                {currentQ.question}
              </h4>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  let buttonStyle = 'border-[#D9D9D5] dark:border-[#2E333D] bg-[#FBFBF9] dark:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] hover:border-[#E63946]';
                  
                  if (selectedOption === optIdx && !isAnswerSubmitted) {
                    buttonStyle = 'border-[#E63946] bg-[#E63946]/5 dark:bg-[#E63946]/10 text-[#E63946] font-bold ring-1 ring-[#E63946]';
                  }

                  if (isAnswerSubmitted) {
                    if (optIdx === currentQ.correctAnswerIndex) {
                      buttonStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-1 ring-emerald-600';
                    } else if (selectedOption === optIdx) {
                      buttonStyle = 'border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 line-through';
                    } else {
                      buttonStyle = 'opacity-50 border-[#D9D9D5] dark:border-[#2E333D] bg-[#FBFBF9] dark:bg-[#1A1D24]';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(optIdx)}
                      disabled={isAnswerSubmitted}
                      className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center font-bold text-[11px]">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {isAnswerSubmitted && optIdx === currentQ.correctAnswerIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      )}
                      {isAnswerSubmitted && selectedOption === optIdx && optIdx !== currentQ.correctAnswerIndex && (
                        <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Explanation Box when submitted */}
              {isAnswerSubmitted && (
                <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-xs space-y-1.5 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-bold text-blue-900 dark:text-blue-300">
                    <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                    <span>Editorial Context & Gazette Verification:</span>
                  </div>
                  <p className="text-blue-950 dark:text-blue-200 leading-relaxed">
                    {currentQ.explanation}
                  </p>
                  <span className="text-[10px] text-blue-700 dark:text-blue-400 block pt-1 font-mono">
                    Source: {currentQ.sourceContext}
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed View / Shareable Report Card */
            <div className="text-center space-y-6 py-2">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h4 className="font-display font-black text-2xl text-[#111215] dark:text-[#F5F5F2]">
                  {score === totalQuestions
                    ? '🎉 Perfect News Pulse!'
                    : score >= 3
                    ? '👏 Sharp Editorial Acumen!'
                    : '📚 Keep Following The News!'}
                </h4>
                <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0] mt-1">
                  You scored <strong className="text-[#111215] dark:text-white font-bold">{score} out of {totalQuestions}</strong> on today’s national current affairs.
                </p>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-xl bg-[#F4F4F0] dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D]">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5F6368] dark:text-[#A7AAB0] block">
                    Current Streak
                  </span>
                  <span className="font-display font-black text-xl text-amber-500 flex items-center justify-center gap-1">
                    <Flame className="w-4 h-4 fill-current" />
                    {streakState.currentStreak}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5F6368] dark:text-[#A7AAB0] block">
                    Total Taken
                  </span>
                  <span className="font-display font-black text-xl text-[#111215] dark:text-[#F5F5F2]">
                    {streakState.totalQuizzesTaken}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#5F6368] dark:text-[#A7AAB0] block">
                    Accuracy
                  </span>
                  <span className="font-display font-black text-xl text-emerald-500">
                    {Math.round((score / totalQuestions) * 100)}%
                  </span>
                </div>
              </div>

              {/* Shareable Card Preview */}
              <div className="p-4 rounded-xl bg-[#0F1115] text-[#F5F5F2] border border-[#2E333D] text-left font-mono text-xs space-y-2">
                <div className="flex items-center justify-between text-[11px] text-[#A7AAB0] border-b border-[#2E333D] pb-1">
                  <span>REPORT CARD PREVIEW</span>
                  <span>DAILY EDITION</span>
                </div>
                <p className="whitespace-pre-line text-[11px] text-gray-300">
                  {generateReportCardText()}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-[#F4F4F0] dark:bg-[#1A1D24] border-t border-[#D9D9D5] dark:border-[#2E333D] flex items-center justify-between gap-3">
          {!isQuizComplete ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-[#5F6368] dark:text-[#A7AAB0] hover:text-[#111215] dark:hover:text-white"
              >
                Close
              </button>

              {!isAnswerSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  className="px-5 py-2.5 rounded-xl bg-[#E63946] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#C92A37] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  Confirm Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#111215] dark:bg-white text-white dark:text-[#111215] font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
                >
                  <span>{currentIndex + 1 < totalQuestions ? 'Next Question' : 'View Results'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </>
          ) : (
            <div className="flex items-center justify-between w-full gap-3">
              <button
                onClick={handleRestartQuiz}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-semibold text-[#111215] dark:text-[#F5F5F2] hover:bg-white dark:hover:bg-[#252A34] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>

              <button
                onClick={handleCopyReportCard}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E63946] hover:bg-[#C92A37] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md"
              >
                {copiedReport ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedReport ? 'Copied to Clipboard!' : 'Share Report Card'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
