export type CategoryType =
  | 'All'
  | 'Google News'
  | 'World'
  | 'India'
  | 'Politics'
  | 'AI & Tech'
  | 'Business'
  | 'Markets'
  | 'Climate'
  | 'Science'
  | 'Culture'
  | 'Sports'
  | 'Opinion'
  | 'In-Depth';


export type EditionType =
  | 'Global'
  | 'US'
  | 'India'
  | 'Tech'
  | 'Markets'
  | 'Culture'
  | 'Climate'
  | 'AI'
  | 'Business'
  | 'Politics'
  | 'Science'
  | 'Sports';

export type ArticleStatus = 'published' | 'draft' | 'scheduled' | 'archived';

export interface Author {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  location?: string;
}

export interface Article {
  id: string;
  slug?: string;
  category: CategoryType;
  title: string;
  subtitle?: string;
  summary: string;
  content: string[]; // array of paragraphs for rich layout
  pullQuote?: string;
  author: Author;
  status?: ArticleStatus;
  publishedAt: string; // ISO date string
  scheduledAt?: string; // ISO date string if scheduled
  createdAt?: string; // ISO date string
  updatedAt?: string;
  readingTime: number; // in minutes
  tags: string[];
  image: string;
  imageCaption?: string;
  imageCredit?: string;
  featured?: boolean;
  isBreaking?: boolean;
  isInvestigative?: boolean;
  isOpinion?: boolean;
  isVisual?: boolean;
  isLiveFeed?: boolean;
  sourceUrl?: string;
  sourceName?: string;
  edition?: EditionType[];
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
}

export interface PublisherUser {
  id: string;
  name: string;
  email: string;
  role: 'Editor-in-Chief' | 'Senior Editor' | 'Staff Writer' | 'Desk Reporter';
  avatar: string;
}

export interface PublisherStats {
  total: number;
  published: number;
  drafts: number;
  scheduled: number;
  archived: number;
}

export interface BriefingItem {
  id: string;
  timestamp: string;
  category: CategoryType;
  update: string;
  impact: 'High' | 'Medium' | 'Developing';
  articleId?: string;
}

export interface MarketItem {
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  region: string;
}

export interface WeatherData {
  city: string;
  condition: string;
  temp: number;
  high: number;
  low: number;
  humidity: number;
  icon: string;
}

export interface Columnist {
  id: string;
  name: string;
  role: string;
  avatar: string;
  headline: string;
  excerpt: string;
  articleId: string;
  category: string;
}

export interface VisualStory {
  id: string;
  title: string;
  subtitle: string;
  photographer: string;
  location: string;
  coverImage: string;
  images: {
    url: string;
    caption: string;
    credit: string;
  }[];
  description: string;
  articleId?: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'success' | 'warning';
}

export interface BookmarkItem {
  id: string;
  title: string;
  category: CategoryType;
  savedAt: string;
  readingTime: number;
  image: string;
  authorName: string;
}

export interface GoogleNewsItem {
  id: string;
  title: string;
  link: string;
  pubDate: string;
  source: string;
  snippet: string;
  topic?: string;
  image?: string;
  publishedRelative?: string;
}

export type GoogleNewsTopic =
  | 'TOP'
  | 'ALL_INDIAN_WIRES'
  | 'PTI_NEWS'
  | 'ANI_NEWS'
  | 'NDTV_NEWS'
  | 'ABP_NEWS'
  | 'INDIA_TODAY'
  | 'THE_HINDU'
  | 'INDIAN_EXPRESS'
  | 'TIMES_OF_INDIA'
  | 'ECONOMIC_TIMES'
  | 'HINDUSTAN_TIMES'
  | 'NEWS18'
  | 'ZEE_NEWS'
  | 'MINT'
  | 'BUSINESS_STANDARD'
  | 'INDIA'
  | 'NATIONAL'
  | 'POLITICS'
  | 'BUSINESS'
  | 'TECHNOLOGY'
  | 'CRICKET'
  | 'SCIENCE'
  | 'HEALTH'
  | 'SPORTS'
  | 'ENTERTAINMENT'
  | 'WORLD';

