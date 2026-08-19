export interface QuizQuestion {
  id: number;
  category: 'National' | 'Economy' | 'ISRO & Tech' | 'Sports' | 'Environment';
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  sourceContext: string;
}

export interface QuizStreakState {
  currentStreak: number;
  highestStreak: number;
  lastPlayedDate: string; // YYYY-MM-DD
  totalQuizzesTaken: number;
  totalCorrectAnswers: number;
  history: {
    date: string;
    score: number;
    total: number;
  }[];
}

export const DAILY_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    category: 'ISRO & Tech',
    question: 'Which indigenous robotic astronaut humanoid was developed by ISRO for uncrewed Gaganyaan test flights?',
    options: ['Vyommitra', 'Pragyan-2', 'Vajra', 'GaganBot'],
    correctAnswerIndex: 0,
    explanation: 'Vyommitra is ISRO\'s half-humanoid robotic system engineered to simulate human crew functions and monitor environmental capsule parameters during test orbital missions.',
    sourceContext: 'ISRO Human Space Flight Centre (HSFC) Gazette',
  },
  {
    id: 2,
    category: 'Economy',
    question: 'India\'s Unified Payments Interface (UPI) recently achieved cross-border linkage with which international real-time payment network?',
    options: ['PayNow (Singapore)', 'SEPA (Eurozone)', 'Pix (Brazil)', 'PromptPay (Thailand)'],
    correctAnswerIndex: 0,
    explanation: 'The landmark India-Singapore linkage between UPI and PayNow enables lightning-fast, cost-effective cross-border person-to-person (P2P) remittances between both nations.',
    sourceContext: 'Reserve Bank of India (RBI) International Remittance Brief',
  },
  {
    id: 3,
    category: 'Environment',
    question: 'What is India’s official target year to achieve "Net Zero" carbon emissions announced at COP summits?',
    options: ['2047', '2050', '2070', '2030'],
    correctAnswerIndex: 2,
    explanation: 'India has pledged to reach Net Zero greenhouse gas emissions by 2070, alongside installing 500 GW of non-fossil electricity capacity by 2030.',
    sourceContext: 'Ministry of New & Renewable Energy (MNRE)',
  },
  {
    id: 4,
    category: 'Sports',
    question: 'Who became the youngest Indian chess grandmaster to challenge for the World Chess Championship after winning the FIDE Candidates Tournament?',
    options: ['R Praggnanandhaa', 'D Gukesh', 'Arjun Erigaisi', 'Vidit Gujrathi'],
    correctAnswerIndex: 1,
    explanation: 'Dommaraju Gukesh created history by winning the FIDE Candidates Tournament in Toronto, becoming the youngest challenger in modern chess history.',
    sourceContext: 'FIDE International Chess Federation',
  },
  {
    id: 5,
    category: 'National',
    question: 'What is the name of India\'s dedicated high-speed optical fiber infrastructure mission aiming to connect all 250,000+ Gram Panchayats?',
    options: ['BharatNet', 'Digital Gaon', 'Pradhan Mantri Gram Sadak', 'Samarth Bharat'],
    correctAnswerIndex: 0,
    explanation: 'BharatNet is one of the world\'s largest rural telecom projects, delivering gigabit broadband access across rural local governance bodies in India.',
    sourceContext: 'Department of Telecommunications (DoT)',
  },
];

const QUIZ_STORAGE_KEY = 'wgo_daily_quiz_streak_v1';

export function getQuizStreak(): QuizStreakState {
  try {
    const raw = localStorage.getItem(QUIZ_STORAGE_KEY);
    if (!raw) {
      return {
        currentStreak: 0,
        highestStreak: 0,
        lastPlayedDate: '',
        totalQuizzesTaken: 0,
        totalCorrectAnswers: 0,
        history: [],
      };
    }
    return JSON.parse(raw);
  } catch {
    return {
      currentStreak: 0,
      highestStreak: 0,
      lastPlayedDate: '',
      totalQuizzesTaken: 0,
      totalCorrectAnswers: 0,
      history: [],
    };
  }
}

export function saveQuizResult(score: number, total: number): QuizStreakState {
  const current = getQuizStreak();
  const todayStr = new Date().toISOString().slice(0, 10);

  // Check if played yesterday to increment streak
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().slice(0, 10);

  let newStreak = current.currentStreak;

  if (current.lastPlayedDate === todayStr) {
    // Already played today, maintain streak
  } else if (current.lastPlayedDate === yesterdayStr) {
    newStreak += 1;
  } else if (current.lastPlayedDate === '') {
    newStreak = 1;
  } else {
    // Streak was broken
    newStreak = 1;
  }

  const highestStreak = Math.max(current.highestStreak, newStreak);

  const updated: QuizStreakState = {
    currentStreak: newStreak,
    highestStreak,
    lastPlayedDate: todayStr,
    totalQuizzesTaken: current.totalQuizzesTaken + 1,
    totalCorrectAnswers: current.totalCorrectAnswers + score,
    history: [
      { date: todayStr, score, total },
      ...current.history.slice(0, 14), // keep last 14 sessions
    ],
  };

  try {
    localStorage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save quiz streak:', e);
  }

  return updated;
}
