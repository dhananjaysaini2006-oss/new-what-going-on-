import React, { useState, useEffect } from 'react';
import { CloudSun, Sun, Cloud, Moon, Globe, ChevronDown, Trophy, Flame, RefreshCw, Radio } from 'lucide-react';
import { DEMO_MARKETS, DEMO_WEATHER } from '../data/news-data';
import { EditionType } from '../types';
import { ThemeMode } from '../utils/theme';

interface HeaderUtilityProps {
  currentEdition: EditionType;
  onSelectEdition: (edition: EditionType) => void;
  theme?: ThemeMode;
  onToggleTheme?: () => void;
  onOpenQuiz?: () => void;
  onRefreshLiveNews?: () => void;
  isSyncingNews?: boolean;
  lastSyncedTime?: Date;
}

export const HeaderUtility: React.FC<HeaderUtilityProps> = ({
  currentEdition,
  onSelectEdition,
  theme = 'light',
  onToggleTheme = () => {},
  onOpenQuiz,
  onRefreshLiveNews,
  isSyncingNews = false,
  lastSyncedTime,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('New Delhi');
  const [showCityMenu, setShowCityMenu] = useState<boolean>(false);
  const [showEditionMenu, setShowEditionMenu] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const optionsDate: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      setCurrentDate(now.toLocaleDateString('en-US', optionsDate));
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const editions: EditionType[] = ['India', 'Global', 'Tech', 'Markets', 'Politics', 'Climate', 'Sports'];
  const weatherCities = Object.keys(DEMO_WEATHER);
  const activeWeather = DEMO_WEATHER[selectedCity] || DEMO_WEATHER['New Delhi'];

  const displayTemp = (celsius: number) => {
    if (tempUnit === 'F') {
      return `${Math.round((celsius * 9) / 5 + 32)}°F`;
    }
    return `${celsius}°C`;
  };

  return (
    <div className="border-b border-[#D9D9D5] dark:border-[#2E333D] bg-[#F4F4F0] dark:bg-[#14171D] text-xs text-[#5F6368] dark:text-[#A7AAB0] select-none transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Date, Live Clock & Edition */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 font-medium text-[#111215] dark:text-[#F5F5F2]">
            <span id="header-date">{currentDate}</span>
            <span className="text-[#D9D9D5] dark:text-[#2E333D]">•</span>
            <span id="header-clock" className="font-mono tabular-nums tracking-wider text-[#E63946]">
              {currentTime} IST
            </span>
          </div>

          <span className="hidden sm:inline text-[#D9D9D5] dark:text-[#2E333D]">|</span>

          {/* Edition Selector */}
          <div className="relative">
            <button
              id="edition-selector-btn"
              onClick={() => {
                setShowEditionMenu(!showEditionMenu);
                setShowCityMenu(false);
              }}
              className="flex items-center gap-1 font-semibold uppercase tracking-wider text-[#111215] dark:text-[#F5F5F2] hover:text-[#E63946] dark:hover:text-[#E63946] py-0.5 px-1.5 rounded transition-colors"
              aria-expanded={showEditionMenu}
              aria-label="Select edition"
            >
              <Globe className="w-3.5 h-3.5 text-[#E63946]" />
              <span>{currentEdition}</span>
              <ChevronDown className="w-3 h-3 ml-0.5" />
            </button>

            {showEditionMenu && (
              <div
                id="edition-dropdown"
                className="absolute left-0 mt-1 w-44 bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded-md shadow-xl py-1 z-50"
              >
                <div className="px-3 py-1 text-[10px] uppercase font-bold text-[#5F6368] dark:text-[#A7AAB0] border-b border-[#D9D9D5] dark:border-[#2E333D] mb-1">
                  Regional Edition
                </div>
                {editions.map((ed) => (
                  <button
                    key={ed}
                    onClick={() => {
                      onSelectEdition(ed);
                      setShowEditionMenu(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors flex items-center justify-between ${
                      currentEdition === ed ? 'font-bold text-[#E63946]' : 'text-[#111215] dark:text-[#F5F5F2]'
                    }`}
                  >
                    <span>{ed}</span>
                    {currentEdition === ed && <span className="w-1.5 h-1.5 rounded-full bg-[#E63946]"></span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center: Live Sync & Market Snapshot */}
        <div className="hidden lg:flex items-center gap-3 overflow-hidden">
          {onRefreshLiveNews && (
            <button
              id="header-live-sync-btn"
              onClick={onRefreshLiveNews}
              disabled={isSyncingNews}
              className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 font-bold text-[10px] uppercase tracking-wider border border-emerald-500/20 transition-all cursor-pointer"
              title="Click to fetch newest real-world articles from Google News / PTI wire"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <RefreshCw className={`w-3 h-3 ${isSyncingNews ? 'animate-spin' : ''}`} />
              <span>{isSyncingNews ? 'Syncing...' : 'Live Wire Active'}</span>
            </button>
          )}

          <span className="text-[10px] uppercase font-semibold text-[#5F6368] dark:text-[#A7AAB0] px-1.5 py-0.5 rounded bg-[#EAEAEA] dark:bg-[#202530]" title="Indicative Benchmark Indices (Delayed 15m)">
            Markets (15m)
          </span>
          <div className="flex items-center gap-4">
            {DEMO_MARKETS.slice(0, 2).map((item) => (
              <div key={item.symbol} className="flex items-center gap-1 font-mono text-[11px]">
                <span className="font-bold text-[#111215] dark:text-[#F5F5F2]">{item.name}</span>
                <span className="text-[#5F6368] dark:text-[#A7AAB0]">{item.value}</span>
                <span
                  className={`flex items-center font-semibold ${
                    item.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#E63946]'
                  }`}
                >
                  {item.isPositive ? '+' : ''}
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Refresh button on mobile, Daily Quiz, Weather & Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Quick Live Refresh for Mobile / Tablet */}
          {onRefreshLiveNews && (
            <button
              onClick={onRefreshLiveNews}
              disabled={isSyncingNews}
              className="lg:hidden inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]"
              title="Refresh Live News"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncingNews ? 'animate-spin' : ''}`} />
              <span>{isSyncingNews ? 'Syncing' : 'Live'}</span>
            </button>
          )}

          {/* Daily News Quiz Trigger */}
          {onOpenQuiz && (
            <button
              id="header-daily-quiz-btn"
              onClick={onOpenQuiz}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-400 font-bold text-[11px] transition-all"
              title="Test your current affairs pulse with today's 5-question Indian News Quiz"
            >
              <Flame className="w-3.5 h-3.5 fill-current text-amber-500" />
              <span className="hidden sm:inline">Daily Quiz</span>
              <span className="sm:hidden">Quiz</span>
            </button>
          )}

          <span className="hidden sm:inline text-[#D9D9D5] dark:text-[#2E333D]">|</span>

          {/* Weather Widget */}
          <div className="relative">
            <button
              id="weather-widget-btn"
              onClick={() => {
                setShowCityMenu(!showCityMenu);
                setShowEditionMenu(false);
              }}
              className="flex items-center gap-1.5 py-0.5 px-1.5 rounded hover:bg-white dark:hover:bg-[#1A1D24] text-[#111215] dark:text-[#F5F5F2] transition-colors"
              aria-label="Weather forecast"
            >
              {activeWeather.icon === 'Sun' ? (
                <Sun className="w-3.5 h-3.5 text-amber-500" />
              ) : activeWeather.icon === 'CloudSun' ? (
                <CloudSun className="w-3.5 h-3.5 text-amber-500" />
              ) : (
                <Cloud className="w-3.5 h-3.5 text-blue-400" />
              )}
              <span className="font-medium">{selectedCity}:</span>
              <span className="font-bold">{displayTemp(activeWeather.temp)}</span>
              <ChevronDown className="w-3 h-3 text-[#5F6368] dark:text-[#A7AAB0]" />
            </button>

            {showCityMenu && (
              <div
                id="weather-dropdown"
                className="absolute right-0 mt-1 w-56 bg-white dark:bg-[#1A1D24] border border-[#D9D9D5] dark:border-[#2E333D] rounded-md shadow-xl p-3 z-50 text-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-[#D9D9D5] dark:border-[#2E333D] mb-2">
                  <span className="text-[10px] uppercase font-bold text-[#5F6368] dark:text-[#A7AAB0]">
                    Met Service Feed
                  </span>
                  <button
                    onClick={() => setTempUnit(tempUnit === 'C' ? 'F' : 'C')}
                    className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#F4F4F0] dark:bg-[#252A34] text-[#E63946]"
                  >
                    Switch to °{tempUnit === 'C' ? 'F' : 'C'}
                  </button>
                </div>
                <div className="space-y-1">
                  {weatherCities.map((city) => {
                    const w = DEMO_WEATHER[city];
                    return (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setShowCityMenu(false);
                        }}
                        className={`w-full text-left p-1.5 rounded flex items-center justify-between hover:bg-[#F4F4F0] dark:hover:bg-[#252A34] transition-colors ${
                          selectedCity === city ? 'bg-[#FBFBF9] dark:bg-[#1F242D] font-bold text-[#E63946]' : ''
                        }`}
                      >
                        <div>
                          <span className="block text-[#111215] dark:text-[#F5F5F2]">{city}</span>
                          <span className="text-[10px] text-[#5F6368] dark:text-[#A7AAB0]">{w.condition}</span>
                        </div>
                        <span className="font-mono text-sm">{displayTemp(w.temp)}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <span className="text-[#D9D9D5] dark:text-[#2E333D]">|</span>

          {/* Theme Toggle Button */}
          <button
            id="theme-toggle-btn"
            onClick={onToggleTheme}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[#111215] dark:text-[#F5F5F2] hover:bg-white dark:hover:bg-[#1A1D24] transition-colors"
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline font-medium">Light</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-slate-700" />
                <span className="hidden sm:inline font-medium">Dark</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
