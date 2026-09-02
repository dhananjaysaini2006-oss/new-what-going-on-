import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Shield,
  Layers,
  ChevronRight,
} from 'lucide-react';

export interface MarketIndexData {
  symbol: string;
  name: string;
  value: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
  high: string;
  low: string;
  sparkline: number[]; // 8-10 points for SVG mini chart
}

export interface StockMover {
  symbol: string;
  name: string;
  price: string;
  change: string;
  percent: string;
  volume: string;
  isPositive: boolean;
}

export interface SectorPerformance {
  name: string;
  changePercent: string;
  isPositive: boolean;
}

const INDICES_DATA: MarketIndexData[] = [
  {
    symbol: 'BSE_SENSEX',
    name: 'BSE Sensex',
    value: '79,842.10',
    change: '+384.20',
    changePercent: '+0.48%',
    isPositive: true,
    high: '80,012.45',
    low: '79,420.10',
    sparkline: [79420, 79510, 79650, 79610, 79780, 79720, 79842],
  },
  {
    symbol: 'NIFTY_50',
    name: 'Nifty 50',
    value: '24,285.35',
    change: '+118.60',
    changePercent: '+0.49%',
    isPositive: true,
    high: '24,330.00',
    low: '24,140.20',
    sparkline: [24140, 24190, 24220, 24200, 24260, 24240, 24285],
  },
  {
    symbol: 'NIFTY_BANK',
    name: 'Bank Nifty',
    value: '51,320.80',
    change: '-95.40',
    changePercent: '-0.19%',
    isPositive: false,
    high: '51,680.10',
    low: '51,190.40',
    sparkline: [51680, 51540, 51420, 51480, 51310, 51380, 51320],
  },
  {
    symbol: 'USD_INR',
    name: 'USD / INR',
    value: '83.94',
    change: '+0.04',
    changePercent: '+0.05%',
    isPositive: false,
    high: '84.02',
    low: '83.88',
    sparkline: [83.88, 83.90, 83.91, 83.93, 83.92, 83.95, 83.94],
  },
  {
    symbol: 'MCX_GOLD',
    name: 'Gold (10g / 24K)',
    value: '₹71,850',
    change: '+320.00',
    changePercent: '+0.45%',
    isPositive: true,
    high: '₹72,100',
    low: '₹71,500',
    sparkline: [71500, 71620, 71700, 71680, 71790, 71810, 71850],
  },
];

const TOP_GAINERS: StockMover[] = [
  { symbol: 'TATASTEEL', name: 'Tata Steel', price: '₹158.40', change: '+5.60', percent: '+3.66%', volume: '14.2M', isPositive: true },
  { symbol: 'INFY', name: 'Infosys Ltd', price: '₹1,864.20', change: '+44.10', percent: '+2.42%', volume: '8.1M', isPositive: true },
  { symbol: 'RELIANCE', name: 'Reliance Ind.', price: '₹3,025.00', change: '+42.50', percent: '+1.42%', volume: '5.9M', isPositive: true },
  { symbol: 'HDFCBANK', name: 'HDFC Bank', price: '₹1,652.80', change: '+18.30', percent: '+1.12%', volume: '9.4M', isPositive: true },
];

const TOP_LOSERS: StockMover[] = [
  { symbol: 'MARUTI', name: 'Maruti Suzuki', price: '₹12,180.00', change: '-240.00', percent: '-1.93%', volume: '980K', isPositive: false },
  { symbol: 'BAJFINANCE', name: 'Bajaj Finance', price: '₹6,840.50', change: '-95.20', percent: '-1.37%', volume: '1.4M', isPositive: false },
  { symbol: 'SUNPHARMA', name: 'Sun Pharma', price: '₹1,710.10', change: '-14.80', percent: '-0.86%', volume: '2.1M', isPositive: false },
];

const SECTORS: SectorPerformance[] = [
  { name: 'Nifty IT', changePercent: '+1.84%', isPositive: true },
  { name: 'Nifty Metal', changePercent: '+1.42%', isPositive: true },
  { name: 'Nifty FMCG', changePercent: '+0.31%', isPositive: true },
  { name: 'Nifty Energy', changePercent: '+0.65%', isPositive: true },
  { name: 'Nifty Auto', changePercent: '-0.88%', isPositive: false },
  { name: 'Nifty Realty', changePercent: '-0.42%', isPositive: false },
];

export const MarketPulseWidget: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'indices' | 'movers' | 'sectors'>('indices');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<string>('BSE_SENSEX');

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // Render SVG Sparkline
  const renderSparkline = (points: number[], isPositive: boolean) => {
    if (!points || points.length === 0) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 80;
    const height = 28;

    const coords = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    });

    const pathString = `M ${coords.join(' L ')}`;
    const strokeColor = isPositive ? '#10B981' : '#E63946';

    return (
      <svg width={width} height={height} className="overflow-visible">
        <path
          d={pathString}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="rounded-2xl border border-[#D9D9D5] dark:border-[#2E333D] bg-white dark:bg-[#14171D] shadow-sm overflow-hidden transition-all my-8">
      {/* Header */}
      <div className="p-4 sm:p-5 bg-[#F4F4F0] dark:bg-[#1A1D24] border-b border-[#D9D9D5] dark:border-[#2E333D] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-sm uppercase tracking-wider text-[#111215] dark:text-[#F5F5F2]">
                Interactive Financial Markets Pulse
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#EAEAEA] dark:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0]">
                NSE / BSE Daily Benchmark Snapshot
              </span>
            </div>
            <p className="text-xs text-[#5F6368] dark:text-[#A7AAB0]">
              Indicative market benchmarks, session sparklines, and sector momentum data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab buttons */}
          <div className="flex items-center p-1 rounded-lg bg-white dark:bg-[#0F1115] border border-[#D9D9D5] dark:border-[#2E333D] text-xs font-bold">
            <button
              onClick={() => setActiveTab('indices')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'indices'
                  ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215]'
                  : 'text-[#5F6368] dark:text-[#A7AAB0]'
              }`}
            >
              Benchmark Indices
            </button>
            <button
              onClick={() => setActiveTab('movers')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'movers'
                  ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215]'
                  : 'text-[#5F6368] dark:text-[#A7AAB0]'
              }`}
            >
              Top Movers
            </button>
            <button
              onClick={() => setActiveTab('sectors')}
              className={`px-3 py-1 rounded-md transition-all ${
                activeTab === 'sectors'
                  ? 'bg-[#111215] text-white dark:bg-[#F5F5F2] dark:text-[#111215]'
                  : 'text-[#5F6368] dark:text-[#A7AAB0]'
              }`}
            >
              Sectors
            </button>
          </div>

          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg border border-[#D9D9D5] dark:border-[#2E333D] hover:bg-white dark:hover:bg-[#252A34] text-[#5F6368] dark:text-[#A7AAB0] transition-colors"
            title="Refresh market feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-emerald-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Tab Views */}
      <div className="p-4 sm:p-6">
        {activeTab === 'indices' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {INDICES_DATA.map((idx) => {
              const isSelected = selectedIndex === idx.symbol;
              return (
                <div
                  key={idx.symbol}
                  onClick={() => setSelectedIndex(idx.symbol)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-[#E63946] bg-[#FBFBF9] dark:bg-[#1A1E27] ring-1 ring-[#E63946]/50 shadow-sm'
                      : 'border-[#EAEAE6] dark:border-[#2A303C] bg-[#FAFAF8] dark:bg-[#14171D] hover:border-[#D9D9D5] dark:hover:border-[#3E4554]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-xs text-[#111215] dark:text-[#F5F5F2] truncate">
                      {idx.name}
                    </span>
                    <span
                      className={`inline-flex items-center text-[11px] font-bold ${
                        idx.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#E63946]'
                      }`}
                    >
                      {idx.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                      {idx.changePercent}
                    </span>
                  </div>

                  <div className="font-mono font-black text-lg text-[#111215] dark:text-[#F5F5F2] tracking-tight">
                    {idx.value}
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#EAEAE6] dark:border-[#2A303C]">
                    <span className="text-[10px] text-[#5F6368] dark:text-[#A7AAB0] font-mono">
                      {idx.change}
                    </span>
                    <div className="pl-2">
                      {renderSparkline(idx.sparkline, idx.isPositive)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {activeTab === 'movers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Gainers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#D9D9D5] dark:border-[#2E333D]">
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  Top Nifty Gainers
                </span>
                <span className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">Today's Volume</span>
              </div>
              <div className="space-y-2">
                {TOP_GAINERS.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-3 rounded-lg bg-[#F8F8F6] dark:bg-[#1A1E27] border border-[#EAEAE6] dark:border-[#2A303C] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#111215] dark:text-[#F5F5F2] block">
                        {stock.name} ({stock.symbol})
                      </span>
                      <span className="text-[10px] text-[#5F6368] dark:text-[#A7AAB0]">
                        Vol: {stock.volume}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#111215] dark:text-[#F5F5F2] block">
                        {stock.price}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                        {stock.percent} ({stock.change})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Losers */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-[#D9D9D5] dark:border-[#2E333D]">
                <span className="font-bold text-xs uppercase tracking-wider text-[#E63946] flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  Top Nifty Drags
                </span>
                <span className="text-[11px] text-[#5F6368] dark:text-[#A7AAB0]">Today's Volume</span>
              </div>
              <div className="space-y-2">
                {TOP_LOSERS.map((stock) => (
                  <div
                    key={stock.symbol}
                    className="p-3 rounded-lg bg-[#F8F8F6] dark:bg-[#1A1E27] border border-[#EAEAE6] dark:border-[#2A303C] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-[#111215] dark:text-[#F5F5F2] block">
                        {stock.name} ({stock.symbol})
                      </span>
                      <span className="text-[10px] text-[#5F6368] dark:text-[#A7AAB0]">
                        Vol: {stock.volume}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#111215] dark:text-[#F5F5F2] block">
                        {stock.price}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[#E63946]">
                        {stock.percent} ({stock.change})
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'sectors' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {SECTORS.map((sec) => (
              <div
                key={sec.name}
                className="p-3.5 rounded-xl bg-[#F8F8F6] dark:bg-[#1A1E27] border border-[#EAEAE6] dark:border-[#2A303C] text-center space-y-1"
              >
                <span className="text-xs font-bold text-[#111215] dark:text-[#F5F5F2] block truncate">
                  {sec.name}
                </span>
                <span
                  className={`font-mono text-sm font-black flex items-center justify-center gap-0.5 ${
                    sec.isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-[#E63946]'
                  }`}
                >
                  {sec.isPositive ? '+' : ''}
                  {sec.changePercent}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
