/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SafeStorage } from './safeStorage';

export interface AppStoredData {
  furniture_os_partners?: any[];
  monos_custom_categories?: any[];
  monos_pinned_partner_ids?: string[];
  monos_custom_packages_data?: any[];
  monos_gallery_added_products?: Record<string, any[]>;
  monos_gallery_custom_products?: Record<string, any>;
  monos_gallery_custom_subcategories?: Record<string, string[]>;
  monos_gallery_category_renames?: Record<string, Record<string, string>>;
  monos_gallery_category_covers?: Record<string, Record<string, string>>;
  monos_deleted_product_ids?: Record<string, string[]>;
  monos_deleted_categories?: Record<string, string[]>;
  furniture_os_selections?: Record<string, any>;
  monos_quotations?: any[];
  selected_company_id?: string;
  _lastUpdated?: string;
}

type SyncStatusListener = (status: 'idle' | 'saving' | 'saved' | 'error', lastSavedTime?: string) => void;
const syncListeners = new Set<SyncStatusListener>();

let currentStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';
let lastSavedTimestamp: string = '';
let debounceTimer: any = null;
let isInitialLoaded = false;

export function subscribeToSyncStatus(listener: SyncStatusListener) {
  syncListeners.add(listener);
  listener(currentStatus, lastSavedTimestamp);
  return () => {
    syncListeners.delete(listener);
  };
}

function notifySyncStatus(status: 'idle' | 'saving' | 'saved' | 'error', time?: string) {
  currentStatus = status;
  if (time) lastSavedTimestamp = time;
  syncListeners.forEach(fn => fn(status, lastSavedTimestamp));
}

// Fetch all persistent data from the server
export async function fetchServerData(): Promise<AppStoredData | null> {
  try {
    const res = await fetch('/api/app-data');
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const json = await res.json();
    if (json.success && json.data) {
      const data = json.data as AppStoredData;
      
      // Hydrate SafeStorage in memory and storage
      SafeStorage.hydrate(data);

      isInitialLoaded = true;
      if (data._lastUpdated) {
        notifySyncStatus('saved', new Date(data._lastUpdated).toLocaleTimeString('vi-VN'));
      } else {
        notifySyncStatus('saved', new Date().toLocaleTimeString('vi-VN'));
      }
      return data;
    }
  } catch (err) {
    console.warn('Could not fetch server data, using cached local data:', err);
  }
  isInitialLoaded = true;
  return null;
}

// Push data update to the server with debounce
export function syncDataToServer(partialData: Partial<AppStoredData>) {
  // Update safe storage immediately (memory + local)
  Object.entries(partialData).forEach(([key, value]) => {
    if (value !== undefined) {
      if (typeof value === 'string') {
        SafeStorage.setItem(key, value);
      } else {
        SafeStorage.setJSON(key, value);
      }
    }
  });

  notifySyncStatus('saving');

  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(async () => {
    try {
      // Gather full state safely
      const fullPayload: AppStoredData = {
        furniture_os_partners: SafeStorage.getJSON('furniture_os_partners', undefined),
        monos_custom_categories: SafeStorage.getJSON('monos_custom_categories', undefined),
        monos_pinned_partner_ids: SafeStorage.getJSON('monos_pinned_partner_ids', undefined),
        monos_gallery_added_products: SafeStorage.getJSON('monos_gallery_added_products', undefined),
        monos_gallery_custom_products: SafeStorage.getJSON('monos_gallery_custom_products', undefined),
        monos_gallery_custom_subcategories: SafeStorage.getJSON('monos_gallery_custom_subcategories', undefined),
        monos_gallery_category_renames: SafeStorage.getJSON('monos_gallery_category_renames', undefined),
        monos_gallery_category_covers: SafeStorage.getJSON('monos_gallery_category_covers', undefined),
        monos_deleted_product_ids: SafeStorage.getJSON('monos_deleted_product_ids', undefined),
        monos_deleted_categories: SafeStorage.getJSON('monos_deleted_categories', undefined),
        furniture_os_selections: SafeStorage.getJSON('furniture_os_selections', undefined),
        monos_quotations: SafeStorage.getJSON('monos_quotations', undefined),
        selected_company_id: SafeStorage.getItem('selected_company_id') || undefined,
        ...partialData
      };

      const res = await fetch('/api/app-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullPayload)
      });

      if (!res.ok) throw new Error(`Save failed with status ${res.status}`);
      const result = await res.json();
      const timeStr = result.timestamp ? new Date(result.timestamp).toLocaleTimeString('vi-VN') : new Date().toLocaleTimeString('vi-VN');
      notifySyncStatus('saved', timeStr);
    } catch (err) {
      console.error('Failed to sync data to server:', err);
      notifySyncStatus('error');
    }
  }, 400);
}

// Export all application data as a JSON file download
export function exportAppDataToFile() {
  const data: AppStoredData = {
    furniture_os_partners: SafeStorage.getJSON('furniture_os_partners', undefined),
    monos_custom_categories: SafeStorage.getJSON('monos_custom_categories', undefined),
    monos_pinned_partner_ids: SafeStorage.getJSON('monos_pinned_partner_ids', undefined),
    monos_gallery_added_products: SafeStorage.getJSON('monos_gallery_added_products', undefined),
    monos_gallery_custom_products: SafeStorage.getJSON('monos_gallery_custom_products', undefined),
    monos_gallery_custom_subcategories: SafeStorage.getJSON('monos_gallery_custom_subcategories', undefined),
    monos_gallery_category_renames: SafeStorage.getJSON('monos_gallery_category_renames', undefined),
    monos_gallery_category_covers: SafeStorage.getJSON('monos_gallery_category_covers', undefined),
    monos_deleted_product_ids: SafeStorage.getJSON('monos_deleted_product_ids', undefined),
    monos_deleted_categories: SafeStorage.getJSON('monos_deleted_categories', undefined),
    furniture_os_selections: SafeStorage.getJSON('furniture_os_selections', undefined),
    monos_quotations: SafeStorage.getJSON('monos_quotations', undefined),
    selected_company_id: SafeStorage.getItem('selected_company_id') || 'ntc',
    _lastUpdated: new Date().toISOString()
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `furniture_os_backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import data from a JSON file and save to server
export async function importAppDataFromFile(file: File): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text) as AppStoredData;

        if (parsed && typeof parsed === 'object') {
          SafeStorage.hydrate(parsed);
          syncDataToServer(parsed);
          resolve(true);
        } else {
          reject(new Error('File không hợp lệ'));
        }
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(new Error('Lỗi khi đọc file'));
    reader.readAsText(file);
  });
}
