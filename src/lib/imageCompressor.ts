/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Compresses an image File or Data URL to optimized JPEG format
 * Max dimensions: 1400px, Quality: 0.82
 * Typical size reduction: 5MB -> 90KB - 160KB (97% reduction)
 */
export async function compressImageDataUrl(dataUrl: string, maxWidth = 1400, maxHeight = 1400, quality = 0.82): Promise<string> {
  // If it's a remote URL or SVG, no canvas compression needed
  if (!dataUrl.startsWith('data:image/')) {
    return dataUrl;
  }

  // If already small SVG or short data url, return directly
  if (dataUrl.startsWith('data:image/svg') || dataUrl.length < 50000) {
    return dataUrl;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      let width = img.width;
      let height = img.height;

      // Scale down if exceeding max bounds
      if (width > maxWidth || height > maxHeight) {
        if (width > height) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        } else {
          width = Math.round((width * maxHeight) / height);
          height = maxHeight;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(dataUrl);
        return;
      }

      // Draw with white background for transparency fallback
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      try {
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      } catch (err) {
        console.warn('Image compression fallback:', err);
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

/**
 * Compress an uploaded File object directly to a base64 Data URL
 */
export async function compressImageFile(file: File, maxWidth = 1400, maxHeight = 1400, quality = 0.82): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      const rawDataUrl = e.target?.result as string;
      if (!rawDataUrl) {
        reject(new Error('Cannot read file'));
        return;
      }
      try {
        const compressed = await compressImageDataUrl(rawDataUrl, maxWidth, maxHeight, quality);
        resolve(compressed);
      } catch (err) {
        resolve(rawDataUrl);
      }
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}
