/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// In-memory cache to guarantee data availability even if localStorage throws QuotaExceededError
const memoryStore: Record<string, string> = {};

export const SafeStorage = {
  getItem(key: string): string | null {
    // 1. Try memory cache first
    if (key in memoryStore) {
      return memoryStore[key];
    }
    // 2. Try localStorage
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const val = window.localStorage.getItem(key);
        if (val !== null) {
          memoryStore[key] = val;
          return val;
        }
      }
    } catch (e) {
      console.warn(`[SafeStorage] read error for key "${key}":`, e);
    }
    return null;
  },

  setItem(key: string, value: string): void {
    // 1. Always update memory store
    memoryStore[key] = value;

    // 2. Try localStorage safely
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem(key, value);
      }
    } catch (e) {
      console.warn(`[SafeStorage] localStorage quota exceeded or error for key "${key}". Maintained in memory & server sync.`, e);
    }
  },

  removeItem(key: string): void {
    delete memoryStore[key];
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.removeItem(key);
      }
    } catch (e) {
      console.warn(`[SafeStorage] remove error for key "${key}":`, e);
    }
  },

  getJSON<T = any>(key: string, fallback: T): T {
    const raw = this.getItem(key);
    if (!raw) return fallback;
    try {
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn(`[SafeStorage] parse error for key "${key}":`, e);
      return fallback;
    }
  },

  setJSON(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      this.setItem(key, serialized);
    } catch (e) {
      console.error(`[SafeStorage] serialization error for key "${key}":`, e);
    }
  },

  // Hydrate memoryStore from an object (e.g. from server API)
  hydrate(data: Record<string, any>): void {
    if (!data || typeof data !== 'object') return;
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined && v !== null) {
        const serialized = typeof v === 'string' ? v : JSON.stringify(v);
        this.setItem(k, serialized);
      }
    });
  }
};
