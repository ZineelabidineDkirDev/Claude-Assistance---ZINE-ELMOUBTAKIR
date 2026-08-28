export interface StoredProgress {
  slide: number;
  updatedAt: number;
}

const STORAGE_PREFIX = 'c4d_progress_day_';
const THEME_KEY = 'zayn_theme_mode';

export function readTheme(): 'dark' | 'light' {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    return raw === 'light' ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

export function saveTheme(theme: 'dark' | 'light'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // Ignore
  }
}

export function readProgress(day: number): number | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${day}`);
    if (!raw) return null;
    const data = JSON.parse(raw);
    return typeof data.slide === 'number' ? data.slide : null;
  } catch {
    return null;
  }
}

export function saveProgress(day: number, slide: number): void {
  try {
    localStorage.setItem(
      `${STORAGE_PREFIX}${day}`,
      JSON.stringify({
        slide,
        updatedAt: Date.now(),
      })
    );
  } catch {
    // Ignore localStorage errors
  }
}

export function getAllProgress(): Record<number, number> {
  const result: Record<number, number> = {};
  for (let i = 1; i <= 5; i++) {
    const p = readProgress(i);
    if (p !== null) {
      result[i] = p;
    }
  }
  return result;
}
