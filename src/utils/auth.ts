import { Article, ArticleStatus, PublisherStats, PublisherUser } from '../types';

export async function loginPublisher(email: string, passkeyOrPassword: string): Promise<{ success: boolean; user?: PublisherUser; error?: string }> {
  try {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email: email.trim(), password: passkeyOrPassword.trim() }),
    });

    const data = await res.json();
    if (!res.ok || !data.user) {
      return { success: false, error: data.message || 'Invalid email or password.' };
    }

    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err.message || 'Network error during login' };
  }
}

export async function checkPublisherSession(): Promise<{ authenticated: boolean; user?: PublisherUser }> {
  try {
    const res = await fetch('/api/auth/session', {
      credentials: 'include',
      headers: { 'Cache-Control': 'no-cache' },
    });

    if (!res.ok) {
      return { authenticated: false };
    }

    const data = await res.json();
    if (data.authenticated && data.user) {
      return { authenticated: true, user: data.user };
    }
    return { authenticated: false };
  } catch {
    return { authenticated: false };
  }
}

export async function logoutPublisher(): Promise<void> {
  try {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch {
    // ignore
  }
}

// Publisher APIs (Protected by Server-Side HTTP-Only Session Cookie)
export async function apiFetchPublisherArticles(params?: { status?: string; search?: string; category?: string }): Promise<Article[]> {
  const query = new URLSearchParams();
  if (params?.status) query.set('status', params.status);
  if (params?.search) query.set('q', params.search);
  if (params?.category) query.set('category', params.category);

  const res = await fetch(`/api/publisher/articles?${query.toString()}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch publisher articles: ${res.statusText}`);
  }
  const data = await res.json();
  return data.articles || [];
}

export async function apiCreatePublisherArticle(article: Partial<Article>): Promise<Article> {
  const res = await fetch('/api/publisher/articles', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to create article: ${res.statusText}`);
  }
  const data = await res.json();
  return data.article;
}

export async function apiUpdatePublisherArticle(id: string, article: Partial<Article>): Promise<Article> {
  const res = await fetch(`/api/publisher/articles/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update article: ${res.statusText}`);
  }
  const data = await res.json();
  return data.article;
}

export async function apiDeletePublisherArticle(id: string): Promise<boolean> {
  const res = await fetch(`/api/publisher/articles/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to delete article`);
  }
  return true;
}

export async function apiUpdateArticleStatus(id: string, status: ArticleStatus, scheduledAt?: string): Promise<Article> {
  const res = await fetch(`/api/publisher/articles/${id}/status`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status, scheduledAt }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || `Failed to update article status`);
  }
  const data = await res.json();
  return data.article;
}

export async function apiFetchPublisherStats(): Promise<PublisherStats> {
  const res = await fetch('/api/publisher/stats', {
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch publisher statistics');
  }
  return res.json();
}

// Public API methods
export async function apiFetchPublicArticles(params?: { category?: string; search?: string; limit?: number }): Promise<Article[]> {
  const query = new URLSearchParams();
  if (params?.category && params.category !== 'All') query.set('category', params.category);
  if (params?.search) query.set('q', params.search);
  if (params?.limit) query.set('limit', String(params.limit));
  query.set('_t', String(Date.now()));

  const res = await fetch(`/api/articles?${query.toString()}`, {
    cache: 'no-store',
    headers: {
      'Cache-Control': 'no-cache',
    },
  });
  if (!res.ok) {
    throw new Error(`Failed to load articles (${res.status})`);
  }
  const data = await res.json();
  return data.articles || [];
}

export async function apiFetchPublicArticle(slugOrId: string): Promise<Article | null> {
  const res = await fetch(`/api/articles/${encodeURIComponent(slugOrId)}?_t=${Date.now()}`, {
    cache: 'no-store',
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load article (${res.status})`);
  const data = await res.json();
  return data.article || null;
}

export async function apiSyncLiveNews(): Promise<{ count: number; articles: Article[]; lastUpdated: string }> {
  const res = await fetch(`/api/sync-live-news?_t=${Date.now()}`, {
    method: 'POST',
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to synchronize live news (${res.status})`);
  const data = await res.json();
  return data;
}

export async function apiGetLiveStatus(): Promise<{ totalArticles: number; liveArticlesCount: number; lastUpdated: string; isSyncing: boolean }> {
  const res = await fetch(`/api/live-status?_t=${Date.now()}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`Failed to fetch live status (${res.status})`);
  return res.json();
}

