// Storage utility for managing localStorage and sessionStorage
export class StorageManager {
  private storage: Storage;

  constructor(storage: 'local' | 'session' = 'local') {
    this.storage = storage === 'local' ? localStorage : sessionStorage;
  }

  set<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      this.storage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Failed to set storage item ${key}:`, error);
    }
  }

  get<T>(key: string, defaultValue?: T): T | null {
    try {
      const item = this.storage.getItem(key);
      if (item === null) {
        return defaultValue || null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Failed to get storage item ${key}:`, error);
      return defaultValue || null;
    }
  }

  remove(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error(`Failed to remove storage item ${key}:`, error);
    }
  }

  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('Failed to clear storage:', error);
    }
  }

  has(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }

  keys(): string[] {
    return Object.keys(this.storage);
  }

  size(): number {
    return this.storage.length;
  }
}

// Pre-configured instances
export const localStorage = new StorageManager('local');
export const sessionStorage = new StorageManager('session');

// Convenience functions for common use cases
export const storage = {
  // Theme management
  getTheme: () => localStorage.get<'light' | 'dark' | 'system'>('theme', 'system'),
  setTheme: (theme: 'light' | 'dark' | 'system') => localStorage.set('theme', theme),

  // Language preferences
  getLanguage: () => localStorage.get<'en' | 'es' | 'fr' | 'de'>('language', 'en'),
  setLanguage: (language: 'en' | 'es' | 'fr' | 'de') => localStorage.set('language', language),

  // User preferences
  getUserPreferences: () => localStorage.get('userPreferences', {}),
  setUserPreferences: (preferences: any) => localStorage.set('userPreferences', preferences),

  // Cache management
  getCache: (key: string) => localStorage.get(key),
  setCache: (key: string, value: any, ttl?: number) => {
    const cacheEntry = {
      data: value,
      timestamp: Date.now(),
      ttl: ttl || 5 * 60 * 1000, // Default 5 minutes
    };
    localStorage.set(key, cacheEntry);
  },

  // Clear expired cache entries
  clearExpiredCache: () => {
    const keys = localStorage.keys();
    const now = Date.now();

    keys.forEach(key => {
      if (key.startsWith('cache_')) {
        const entry = localStorage.get(key);
        if (entry && entry.timestamp && (now - entry.timestamp) > entry.ttl) {
          localStorage.remove(key);
        }
      }
    });
  },
}; 