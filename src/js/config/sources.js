export const CATEGORIES = {
  ALL: 'all',
  INDIA_POLITICS: 'india-politics',
  INDIA: 'india',
  WORLD: 'world',
  GOOGLE_NEWS: 'google-news',
  CURRENT_AFFAIRS: 'current-affairs',
  BUSINESS: 'business',
  TECH: 'tech',
  SCIENCE: 'science',
  SAVED: 'saved',
  PUBLISHED: 'published'
};

export const SOURCE_REGISTRY = [
  // ==========================================
  // INDIAN NEWS WIRES, CHANNELS & PORTALS
  // ==========================================
  {
    id: 'abp-news',
    name: 'ABP News (ABP Live Wire)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/search?q=source:%22ABP+News%22+OR+source:%22ABP+Live%22&hl=en-IN&gl=IN&ceid=IN:en',
    color: '#ff0033',
    isPolitics: true
  },
  {
    id: 'news18-india',
    name: 'News18 (National & Politics Wire)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://www.news18.com/rss/politics.xml',
    color: '#16a34a',
    isPolitics: true
  },
  {
    id: 'ndtv-india',
    name: 'NDTV National Wire',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://feeds.feedburner.com/ndtvnews-india-news',
    color: '#e50914',
    isPolitics: true
  },
  {
    id: 'ndtv-top',
    name: 'NDTV 24x7 (Top Stories)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://feeds.feedburner.com/ndtvnews-top-stories',
    color: '#e50914'
  },
  {
    id: 'times-of-india-national',
    name: 'The Times of India (National & Politics)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://timesofindia.indiatimes.com/rssfeeds/-2128936835.cms',
    color: '#dc2626',
    isPolitics: true
  },
  {
    id: 'times-of-india-top',
    name: 'The Times of India (Top Stories)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://timesofindia.indiatimes.com/rssfeedstopstories.cms',
    color: '#dc2626'
  },
  {
    id: 'livemint-politics',
    name: 'Mint (Policy & Governance)',
    category: CATEGORIES.INDIA_POLITICS,
    region: 'india',
    rssUrl: 'https://www.livemint.com/rss/politics',
    color: '#f97316',
    isPolitics: true
  },
  {
    id: 'livemint-economy',
    name: 'Mint (Markets & Economy)',
    category: CATEGORIES.BUSINESS,
    region: 'india',
    rssUrl: 'https://www.livemint.com/rss/economy',
    color: '#ea580c'
  },
  {
    id: 'the-hindu-national',
    name: 'The Hindu (National & Politics)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://www.thehindu.com/news/national/feeder/default.rss',
    color: '#1e3a8a',
    isPolitics: true
  },
  {
    id: 'indian-express-politics',
    name: 'The Indian Express (Political Pulse)',
    category: CATEGORIES.INDIA_POLITICS,
    region: 'india',
    rssUrl: 'https://indianexpress.com/section/political-pulse/feed/',
    color: '#b91c1c',
    isPolitics: true
  },
  {
    id: 'indian-express-india',
    name: 'The Indian Express (National Wire)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://indianexpress.com/feed/',
    color: '#b91c1c'
  },
  {
    id: 'hindustan-times',
    name: 'Hindustan Times (India News)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://www.hindustantimes.com/feeds/rss/india-news/rssfeed.xml',
    color: '#0284c7',
    isPolitics: true
  },
  {
    id: 'india-today',
    name: 'India Today News Wire',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/search?q=source:%22India+Today%22&hl=en-IN&gl=IN&ceid=IN:en',
    color: '#e11d48',
    isPolitics: true
  },
  {
    id: 'zee-news',
    name: 'Zee News India Wire',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://zeenews.india.com/rss/india-national-news.xml',
    color: '#7c3aed',
    isPolitics: true
  },
  {
    id: 'ani-news',
    name: 'ANI News Agency Wire',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/search?q=source:%22ANI+News%22&hl=en-IN&gl=IN&ceid=IN:en',
    color: '#0891b2',
    isPolitics: true
  },
  {
    id: 'google-india-politics',
    name: 'Google News (India Politics & Parliament)',
    category: CATEGORIES.INDIA_POLITICS,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/search?q=Indian+politics+parliament+cabinet+elections&hl=en-IN&gl=IN&ceid=IN:en',
    color: '#f59e0b',
    isPolitics: true
  },
  {
    id: 'google-india',
    name: 'Google News India (National)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/headlines/section/topic/NATION?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#EA4335'
  },
  {
    id: 'business-standard',
    name: 'Business Standard India',
    category: CATEGORIES.BUSINESS,
    region: 'india',
    rssUrl: 'https://news.google.com/rss/search?q=source:%22Business+Standard%22&hl=en-IN&gl=IN&ceid=IN:en',
    color: '#2563eb'
  },
  {
    id: 'financial-express',
    name: 'The Financial Express India',
    category: CATEGORIES.BUSINESS,
    region: 'india',
    rssUrl: 'https://www.financialexpress.com/feed/',
    color: '#059669'
  },
  {
    id: 'bbc-india',
    name: 'BBC News (India Desk)',
    category: CATEGORIES.INDIA,
    region: 'india',
    rssUrl: 'http://feeds.bbci.co.uk/news/world/asia/india/rss.xml',
    color: '#bb1919'
  },

  // ==========================================
  // GLOBAL NEWS WIRES & INTERNATIONAL MEDIA
  // ==========================================
  {
    id: 'reuters-world',
    name: 'Reuters World Wire',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/search?q=source:Reuters&hl=en-US&gl=US&ceid=US:en',
    color: '#ff8000'
  },
  {
    id: 'ap-world',
    name: 'Associated Press (AP News)',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/search?q=source:%22Associated+Press%22&hl=en-US&gl=US&ceid=US:en',
    color: '#e11d48'
  },
  {
    id: 'bbc-world',
    name: 'BBC World News',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'http://feeds.bbci.co.uk/news/world/rss.xml',
    color: '#bb1919'
  },
  {
    id: 'al-jazeera',
    name: 'Al Jazeera English Wire',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://www.aljazeera.com/xml/rss/all.xml',
    color: '#ea580c'
  },
  {
    id: 'the-guardian',
    name: 'The Guardian World',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://www.theguardian.com/world/rss',
    color: '#052962'
  },
  {
    id: 'cnn-world',
    name: 'CNN International',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'http://rss.cnn.com/rss/edition.rss',
    color: '#cc0000'
  },
  {
    id: 'france24-world',
    name: 'France 24 Global Wire',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://www.france24.com/en/rss',
    color: '#00a3e0'
  },
  {
    id: 'dw-world',
    name: 'Deutsche Welle (DW World)',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://rss.dw.com/rdf/rss-en-all',
    color: '#004f9f'
  },
  {
    id: 'google-top',
    name: 'Google News (Top Stories)',
    category: CATEGORIES.GOOGLE_NEWS,
    region: 'global',
    rssUrl: 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#4285F4'
  },
  {
    id: 'google-world',
    name: 'Google News World',
    category: CATEGORIES.WORLD,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/headlines/section/topic/WORLD?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#34A853'
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch Wire',
    category: CATEGORIES.TECH,
    region: 'global',
    rssUrl: 'https://techcrunch.com/feed/',
    color: '#00a562'
  },
  {
    id: 'google-tech',
    name: 'Google News Technology',
    category: CATEGORIES.TECH,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/headlines/section/topic/TECHNOLOGY?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#FBBC05'
  },
  {
    id: 'google-business',
    name: 'Google News Business',
    category: CATEGORIES.BUSINESS,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/headlines/section/topic/BUSINESS?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#00f0ff'
  },
  {
    id: 'google-science',
    name: 'Google News Science',
    category: CATEGORIES.SCIENCE,
    region: 'global',
    rssUrl: 'https://news.google.com/rss/headlines/section/topic/SCIENCE?hl=en-IN&gl=IN&ceid=IN:en',
    color: '#10b981'
  }
];

export const CURRENT_AFFAIRS_TOPICS = [
  { id: 'all', label: 'All Briefings' },
  { id: 'national', label: 'Indian Politics & Governance' },
  { id: 'international', label: 'International & Treaties' },
  { id: 'economy', label: 'Indian Economy & Banking' },
  { id: 'defense', label: 'Defense & ISRO Space' },
  { id: 'awards', label: 'Awards & Appointments' }
];

export const CURATED_CURRENT_AFFAIRS_DATA = [
  {
    id: 'ca-1',
    category: 'national',
    title: 'Parliament Winter Session: Key Bills on Digital Governance & Election Reforms Introduced',
    date: 'Today, 08:30 AM',
    timestamp: Date.now() - 1000 * 60 * 35,
    who: 'Parliament of India, Ministry of Law & Justice, Election Commission',
    what: 'Comprehensive statutory reforms introduced in Lok Sabha focusing on electoral transparency and unified digital civil registries.',
    why: 'Streamlining voter roll verification and establishing statutory guardrails for national public digital platforms.',
    impact: 'Strengthens constitutional transparency and modernizes voting registration protocols across 28 states and UTs.',
    quiz: {
      question: 'Which constitutional body conducts and oversees General and State Assembly elections in India?',
      options: ['Law Commission', 'Election Commission of India (ECI)', 'NITI Aayog', 'Ministry of Home Affairs'],
      correct: 1,
      explanation: 'Under Article 324 of the Indian Constitution, the Election Commission of India exercises superintendence over elections.'
    }
  },
  {
    id: 'ca-2',
    category: 'international',
    title: 'India-EU Strategic Trade & Security Partnership Summit Concludes in New Delhi',
    date: 'Today, 07:15 AM',
    timestamp: Date.now() - 1000 * 60 * 75,
    who: 'Ministry of External Affairs (MEA) & European Commission Leadership',
    what: 'Framework agreement advancing Free Trade Agreement (FTA) negotiations, critical raw materials supply, and clean hydrogen tech transfer.',
    why: 'Bolstering bilateral supply chains, reducing tariff barriers, and strengthening maritime security cooperation.',
    impact: 'Expands market access for Indian manufactured goods and accelerates European green technology investments in India.',
    quiz: {
      question: 'Where was the latest India-EU Strategic Partnership Summit hosted?',
      options: ['Brussels', 'New Delhi', 'Geneva', 'Berlin'],
      correct: 1,
      explanation: 'The strategic negotiations and ministerial summits were hosted in New Delhi.'
    }
  },
  {
    id: 'ca-3',
    category: 'economy',
    title: 'Reserve Bank of India (RBI) Monetary Policy Committee (MPC) Review',
    date: 'Today, 06:45 AM',
    timestamp: Date.now() - 1000 * 60 * 110,
    who: 'Reserve Bank of India (RBI) Governor & Monetary Policy Committee',
    what: 'Key interest rates aligned with durable 4% inflation targets while projecting a robust 7.2% GDP expansion for the fiscal year.',
    why: 'Balancing sustained high economic growth with food and global commodity price stability.',
    impact: 'Anchors sovereign bond yields, sustains credit expansion for private capex, and maintains rupee foreign exchange stability.',
    quiz: {
      question: 'How many members comprise the Reserve Bank of India\'s Monetary Policy Committee (MPC)?',
      options: ['3 members', '5 members', '6 members (3 RBI + 3 External)', '8 members'],
      correct: 2,
      explanation: 'The MPC consists of 6 members: 3 from the RBI including the Governor, and 3 external members nominated by the Government of India.'
    }
  },
  {
    id: 'ca-4',
    category: 'defense',
    title: 'ISRO & DRDO Successfully Complete Autonomous Reusable Launch Vehicle (RLV) Landing',
    date: 'Yesterday, 18:20 PM',
    timestamp: Date.now() - 1000 * 60 * 240,
    who: 'Indian Space Research Organisation (ISRO) & DRDO',
    what: 'Autonomous pin-point landing test of the Reusable Launch Vehicle Technology Demonstrator (RLV-TD) under challenging crosswinds.',
    why: 'Drastically cutting space launch costs for future satellite deployments and crewed missions.',
    impact: 'Paves the way for India\'s orbital re-entry flights and two-stage-to-orbit reusable systems.',
    quiz: {
      question: 'What is the core strategic benefit of Reusable Launch Vehicle (RLV) technology?',
      options: ['Elimination of propellant needs', 'Substantial reduction in cost per kilogram to orbit', 'Deep sea communication', 'Replacing ground-based radar'],
      correct: 1,
      explanation: 'Reusability significantly reduces payload launch expenses per kilogram into low Earth orbit.'
    }
  },
  {
    id: 'ca-5',
    category: 'awards',
    title: 'Bharat Ratna and National Civilian Honours Announced for Distinguished Public Service',
    date: 'Today, 05:00 AM',
    timestamp: Date.now() - 1000 * 60 * 160,
    who: 'President of India & Ministry of Home Affairs',
    what: 'Honouring visionary statesmen, grassroots social pioneers, and scientific icons for nation-building contributions.',
    why: 'Recognizing lifetime public service and inspirational societal leadership.',
    impact: 'Inspires national youth toward civic excellence and grassroots nation-building.',
    quiz: {
      question: 'What is the highest civilian award conferred by the Republic of India?',
      options: ['Padma Vibhushan', 'Bharat Ratna', 'Param Vir Chakra', 'Padma Bhushan'],
      correct: 1,
      explanation: 'Bharat Ratna is India\'s highest civilian honor, instituted in 1954.'
    }
  }
];

export const INITIAL_FEATURED_ARTICLES = [
  {
    id: 'feat-1',
    title: 'Parliament & National Governance: Union Cabinet Clears Landmark Infrastructure & Policy Bills',
    source: 'The Hindu',
    sourceId: 'the-hindu-national',
    category: 'india-politics',
    region: 'india',
    isPolitics: true,
    link: 'https://www.thehindu.com',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=1200&auto=format&fit=crop&q=80',
    pubDate: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    snippet: 'Strategic approvals for high-impact national connectivity, semiconductor manufacturing, and public sector modernization ratified in New Delhi.',
    content: 'In a major legislative push, the Union Cabinet in New Delhi has given statutory clearance to multiple landmark bills aimed at boosting domestic manufacturing, upgrading freight corridors, and expanding national digital infrastructure.',
    keyPoints: [
      'Multi-crore capital investment approved for strategic highway and freight corridors.',
      'Sovereign incentives for domestic high-technology and electronics manufacturing.',
      'Bipartisan consultation initiated for parliamentary committee reviews.'
    ],
    readTime: '3 min read'
  },
  {
    id: 'feat-2',
    title: 'Supreme Court of India Constitution Bench Delivers Landmark Verdict on Federal Governance',
    source: 'The Indian Express',
    sourceId: 'indian-express-politics',
    category: 'india-politics',
    region: 'india',
    isPolitics: true,
    link: 'https://indianexpress.com',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop&q=80',
    pubDate: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    snippet: 'A five-judge Constitution bench reinforces cooperative federalism principles regarding Union and State legislative jurisdiction.',
    content: 'In a significant constitutional jurisprudence development, the Supreme Court of India reaffirmed the doctrine of cooperative federalism, clarifying the legislative powers of state assemblies and union authorities in matters of civic governance.',
    keyPoints: [
      'Upholds constitutional balance between Union and State executive powers.',
      'Reinforces institutional autonomy and harmonious federal administration.',
      'Establishes clear operational precedents for state civil administration.'
    ],
    readTime: '4 min read'
  },
  {
    id: 'feat-3',
    title: 'India Advances Semiconductor Ecosystem with New Mega-Fab Approvals & Global Tech Tie-ups',
    source: 'Mint',
    sourceId: 'livemint-economy',
    category: 'india',
    region: 'india',
    isPolitics: false,
    link: 'https://www.livemint.com',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&auto=format&fit=crop&q=80',
    pubDate: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    snippet: 'Strategic approvals for silicon fabs and compound semiconductor packaging facilities mark a major leap toward global supply chain resilience.',
    content: 'India is rapidly establishing its presence in the global microelectronics race with construction commencing on three new commercial semiconductor fabrication facilities in Gujarat and Assam.',
    keyPoints: [
      'Multi-billion dollar capital expenditure approved for commercial silicon wafer fabs.',
      'Emphasis on 28nm and specialized automotive semiconductor packaging.',
      'Partnerships forged with top global foundry leaders and technical universities.'
    ],
    readTime: '3 min read'
  }
];
