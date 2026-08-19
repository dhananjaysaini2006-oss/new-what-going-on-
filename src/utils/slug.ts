/**
 * SEO-friendly slug generator and URL resolver for articles.
 */

export function generateSlug(title: string, idSuffix?: string): string {
  if (!title) return idSuffix || `article-${Date.now()}`;
  
  let base = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // remove special chars
    .trim()
    .replace(/\s+/g, '-') // spaces to dashes
    .replace(/-+/g, '-') // collapse consecutive dashes
    .slice(0, 75); // max length

  // Trim trailing hyphen
  base = base.replace(/-+$/, '');

  if (idSuffix && !base.includes(idSuffix)) {
    return `${base}-${idSuffix}`;
  }

  return base || `article-${Date.now()}`;
}

export function getArticlePath(article: { slug?: string; id: string }): string {
  if (article.slug) {
    return `/article/${article.slug}`;
  }
  return `/article/${article.id}`;
}
