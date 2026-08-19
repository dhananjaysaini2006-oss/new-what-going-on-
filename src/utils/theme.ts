export type ThemeMode = 'light' | 'dark';

export function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light';
  const saved = localStorage.getItem('wgo-theme');
  if (saved === 'dark' || saved === 'light') return saved;
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: ThemeMode): void {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  try {
    localStorage.setItem('wgo-theme', theme);
  } catch (e) {
    console.warn('Unable to persist theme to localStorage', e);
  }
}

export function toggleThemeMode(currentTheme?: ThemeMode): ThemeMode {
  const current = currentTheme || (document.documentElement.classList.contains('dark') ? 'dark' : getInitialTheme());
  const next: ThemeMode = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}
