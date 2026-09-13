import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Enable JSON body parsing with large limit for image data
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Storage file path
const STORAGE_DIR = path.join(process.cwd(), 'storage');
const STORAGE_FILE = path.join(STORAGE_DIR, 'app_data.json');
const STORAGE_BACKUP_FILE = path.join(STORAGE_DIR, 'app_data_backup.json');

// Ensure storage directory exists
if (!fs.existsSync(STORAGE_DIR)) {
  fs.mkdirSync(STORAGE_DIR, { recursive: true });
}

// Helper to read storage data safely
function readStorageData() {
  try {
    if (fs.existsSync(STORAGE_FILE)) {
      const raw = fs.readFileSync(STORAGE_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('Error reading storage file, checking backup:', err);
    try {
      if (fs.existsSync(STORAGE_BACKUP_FILE)) {
        const raw = fs.readFileSync(STORAGE_BACKUP_FILE, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error('Error reading backup file:', e);
    }
  }
  return {};
}

// Helper to write storage data safely with backup
function writeStorageData(data: any) {
  try {
    const serialized = JSON.stringify(data, null, 2);
    // Write backup first if main exists
    if (fs.existsSync(STORAGE_FILE)) {
      try {
        fs.copyFileSync(STORAGE_FILE, STORAGE_BACKUP_FILE);
      } catch (e) {
        // ignore backup copy failure
      }
    }
    fs.writeFileSync(STORAGE_FILE, serialized, 'utf-8');
    return true;
  } catch (err) {
    console.error('Error writing storage file:', err);
    return false;
  }
}

// API Routes FIRST
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all stored application data
app.get('/api/app-data', (req, res) => {
  try {
    const data = readStorageData();
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST to save/merge application data
app.post('/api/app-data', (req, res) => {
  try {
    const incomingData = req.body;
    if (!incomingData || typeof incomingData !== 'object') {
      return res.status(400).json({ success: false, error: 'Invalid data format' });
    }

    const currentData = readStorageData();
    
    // Deep merge for specific record/dictionary keys
    const mergedData: any = {
      ...currentData,
      ...incomingData,
      _lastUpdated: new Date().toISOString()
    };

    // For dictionary map fields, merge gracefully so we don't wipe out keys from different tabs
    const dictionaryFields = [
      'monos_gallery_added_products',
      'monos_gallery_custom_products',
      'monos_gallery_custom_subcategories',
      'monos_gallery_category_renames',
      'monos_gallery_category_covers',
      'monos_deleted_product_ids',
      'monos_deleted_categories'
    ];

    dictionaryFields.forEach((field) => {
      if (incomingData[field] && typeof incomingData[field] === 'object' && !Array.isArray(incomingData[field])) {
        mergedData[field] = {
          ...(currentData[field] || {}),
          ...incomingData[field]
        };
      }
    });

    // If incoming data has deleteKeys or null values, clean them up
    if (Array.isArray(incomingData._deleteKeys)) {
      incomingData._deleteKeys.forEach((k: string) => {
        delete mergedData[k];
      });
      delete mergedData._deleteKeys;
    }

    Object.keys(mergedData).forEach(k => {
      if (mergedData[k] === null || mergedData[k] === undefined) {
        delete mergedData[k];
      }
    });

    const success = writeStorageData(mergedData);
    if (success) {
      res.json({ success: true, message: 'Dữ liệu đã được lưu thành công trên máy chủ', timestamp: mergedData._lastUpdated });
    } else {
      res.status(500).json({ success: false, error: 'Không thể ghi file dữ liệu' });
    }
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// POST to reset data
app.post('/api/app-data/reset', (req, res) => {
  try {
    writeStorageData({});
    res.json({ success: true, message: 'Đã đặt lại dữ liệu về mặc định' });
  } catch (err: any) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Start server with Vite or Static
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
