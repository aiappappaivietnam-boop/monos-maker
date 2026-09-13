/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SafeStorage } from './safeStorage';
import { syncDataToServer } from './storageSync';
import { 
  GalleryProduct, 
  getStoredAddedProducts, 
  getStoredCustomProducts, 
  getStoredCustomSubcategories, 
  getStoredCategoryRenames, 
  getStoredCategoryCovers,
  getStoredDeletedProductIds,
  getStoredDeletedCategories,
  getProductsForCategory
} from '../data/categoryProductsData';

export interface AlbumCatalogPackage {
  schemaVersion: '2.0';
  exportType: 'monos_album_catalog_package';
  exportDate: string;
  serviceId?: string;
  serviceName?: string;
  summary: {
    totalAlbums: number;
    totalProducts: number;
    exportTimestamp: number;
  };
  data: {
    addedProducts: Record<string, GalleryProduct[]>;
    customProducts: Record<string, Partial<GalleryProduct>>;
    customSubcategories: Record<string, string[]>;
    categoryRenames: Record<string, Record<string, string>>;
    categoryCovers: Record<string, Record<string, string>>;
    deletedProductIds: Record<string, string[]>;
    deletedCategories: Record<string, string[]>;
    productsSnapshot?: GalleryProduct[];
  };
}

/**
 * Exports all album data (or specific service albums) to a downloadable .json file
 */
export function exportAlbumCatalogPackage(
  serviceId?: string,
  serviceName?: string,
  currentProducts?: GalleryProduct[]
): void {
  const addedProducts = getStoredAddedProducts();
  const customProducts = getStoredCustomProducts();
  const customSubcategories = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
  const categoryRenames = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_renames', {});
  const categoryCovers = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
  const deletedProductIds = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
  const deletedCategories = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_categories', {});

  const effectiveProducts = currentProducts || (serviceId ? getProductsForCategory(serviceId) : []);
  
  // Calculate unique categories
  const categoriesSet = new Set<string>();
  effectiveProducts.forEach(p => {
    if (p.categoryName) categoriesSet.add(p.categoryName.trim());
  });
  if (serviceId && customSubcategories[serviceId]) {
    customSubcategories[serviceId].forEach(c => categoriesSet.add(c.trim()));
  }

  const pkg: AlbumCatalogPackage = {
    schemaVersion: '2.0',
    exportType: 'monos_album_catalog_package',
    exportDate: new Date().toISOString(),
    serviceId: serviceId || 'all',
    serviceName: serviceName || 'Toan_bo_Album_Thu_vien',
    summary: {
      totalAlbums: categoriesSet.size || 1,
      totalProducts: effectiveProducts.length,
      exportTimestamp: Date.now()
    },
    data: {
      addedProducts,
      customProducts,
      customSubcategories,
      categoryRenames,
      categoryCovers,
      deletedProductIds,
      deletedCategories,
      productsSnapshot: effectiveProducts
    }
  };

  const safeTitle = (serviceName || 'Album_Catalog')
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_');
  const dateStr = new Date().toISOString().slice(0, 10);
  const filename = `${safeTitle}_${dateStr}.json`;

  const blob = new Blob([JSON.stringify(pkg, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Imports album data from an uploaded JSON file into SafeStorage & Server
 */
export async function importAlbumCatalogPackage(
  file: File,
  currentServiceId = 'service-1'
): Promise<{ success: boolean; albumsCount: number; productsCount: number; message: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = (e.target?.result as string) || '';
        if (!text.trim()) {
          throw new Error('File rỗng hoặc không thể đọc nội dung.');
        }

        let parsed: any;
        try {
          parsed = JSON.parse(text);
        } catch (jsonErr) {
          throw new Error('File không đúng định dạng JSON hợp lệ.');
        }

        const currentAdded = getStoredAddedProducts();
        const currentCustom = getStoredCustomProducts();
        const currentCats = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
        const currentRenames = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_renames', {});
        const currentCovers = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
        const currentDeletedIds = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
        const currentDeletedCats = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_categories', {});

        // Helper to normalize any incoming item to GalleryProduct
        const normalizeProduct = (item: any, idx: number, fallbackCat: string, targetSvc: string): GalleryProduct => {
          if (typeof item === 'string') {
            // String URL
            return {
              id: `${targetSvc}-imported-${Date.now()}-${idx}`,
              name: `Mẫu thiết kế #${idx + 1}`,
              code: `ITM-${Math.floor(100 + Math.random() * 900)}`,
              category: targetSvc,
              categoryName: fallbackCat || 'Album Nhập',
              thumbnail: item,
              images: [item],
              dimensions: 'Theo tiêu chuẩn sản xuất',
              material: 'Gỗ / Kim loại cao cấp',
              finish: 'Sơn phủ hoàn thiện chuẩn xuất khẩu',
              priceRange: 'Liên hệ báo giá',
              moq: '50 PCS',
              leadTime: '30 - 45 ngày',
              tags: ['Mẫu mới'],
              specifications: [],
              description: 'Mẫu thiết kế nhập từ file catalog.'
            };
          }

          const rawThumb = item.thumbnail || item.image || item.imageUrl || item.img || item.photo || item.picture || item.url || '';
          const rawImages = Array.isArray(item.images) && item.images.length > 0 
            ? item.images 
            : (rawThumb ? [rawThumb] : []);
          const thumb = rawThumb || (rawImages.length > 0 ? rawImages[0] : '');

          const catName = item.categoryName || item.category_name || item.category || item.subCategory || item.group || item.album || fallbackCat || 'Album Nhập';

          return {
            id: item.id ? String(item.id) : `${targetSvc}-imported-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 6)}`,
            name: item.name || item.title || item.productName || item.label || `Mẫu thiết kế #${idx + 1}`,
            code: item.code || item.sku || item.itemCode || `ITM-${Math.floor(100 + Math.random() * 900)}`,
            category: item.category || targetSvc,
            categoryName: catName.trim(),
            thumbnail: thumb,
            images: rawImages.length > 0 ? rawImages : (thumb ? [thumb] : []),
            dimensions: item.dimensions || item.size || item.dimension || 'Theo tiêu chuẩn sản xuất',
            material: item.material || item.materials || 'Gỗ / Kim loại cao cấp',
            finish: item.finish || item.coating || 'Sơn phủ hoàn thiện chuẩn xuất khẩu',
            priceRange: item.priceRange || item.price || item.cost || 'Liên hệ báo giá',
            moq: item.moq || item.minimumOrder || '50 PCS',
            leadTime: item.leadTime || item.deliveryTime || '30 - 45 ngày',
            tags: Array.isArray(item.tags) ? item.tags : (item.tag ? [item.tag] : ['Mới']),
            specifications: Array.isArray(item.specifications) ? item.specifications : [],
            description: item.description || item.desc || item.note || 'Mẫu thiết kế nhập từ file catalog.',
            hasCAD: Boolean(item.hasCAD || item.cadUrl),
            has3D: Boolean(item.has3D || item.model3DUrl)
          };
        };

        // Helper to unmark deleted category and deleted product IDs
        const unmarkDeleted = (targetSvc: string, categoryNames: string[], productIds: string[]) => {
          // Unmark categories
          const lowerCatSet = new Set(categoryNames.map(c => c.trim().toLowerCase()).filter(Boolean));
          [targetSvc, currentServiceId, 'all'].forEach(sId => {
            if (currentDeletedCats[sId]) {
              currentDeletedCats[sId] = currentDeletedCats[sId].filter(c => !lowerCatSet.has(c.trim().toLowerCase()));
            }
          });

          // Unmark product IDs
          const idSet = new Set(productIds.filter(Boolean));
          [targetSvc, currentServiceId, 'all'].forEach(sId => {
            if (currentDeletedIds[sId]) {
              currentDeletedIds[sId] = currentDeletedIds[sId].filter(id => !idSet.has(id));
            }
          });
        };

        // Case 1: Standard Monos Album Catalog Package
        if (
          (parsed.exportType === 'monos_album_catalog_package' || parsed.schemaVersion === '2.0') && 
          parsed.data
        ) {
          const incomingData = parsed.data;
          const targetSvc = parsed.serviceId && parsed.serviceId !== 'all' ? parsed.serviceId : currentServiceId;

          const importedCategories = new Set<string>();
          const importedProductIds = new Set<string>();

          // Merge addedProducts dictionary
          const mergedAdded = { ...currentAdded };
          if (incomingData.addedProducts && typeof incomingData.addedProducts === 'object') {
            Object.entries(incomingData.addedProducts).forEach(([svcId, prods]) => {
              if (Array.isArray(prods)) {
                const effectiveSvc = svcId === 'all' ? currentServiceId : svcId;
                const existing = mergedAdded[effectiveSvc] || [];
                const updatedList = [...existing];
                
                prods.forEach((p: any, idx: number) => {
                  const norm = normalizeProduct(p, idx, 'Album Nhập', effectiveSvc);
                  importedCategories.add(norm.categoryName);
                  importedProductIds.add(norm.id);
                  const existingIdx = updatedList.findIndex(item => item.id === norm.id);
                  if (existingIdx >= 0) {
                    updatedList[existingIdx] = norm;
                  } else {
                    updatedList.unshift(norm);
                  }
                });
                mergedAdded[effectiveSvc] = updatedList;
              }
            });
          }

          // If productsSnapshot is present, ensure they are also injected to targetSvc & currentServiceId
          if (Array.isArray(incomingData.productsSnapshot) && incomingData.productsSnapshot.length > 0) {
            const listForCurrent = mergedAdded[currentServiceId] || [];
            const updatedCurrentList = [...listForCurrent];

            incomingData.productsSnapshot.forEach((p: any, idx: number) => {
              const norm = normalizeProduct(p, idx, 'Album Nhập', currentServiceId);
              importedCategories.add(norm.categoryName);
              importedProductIds.add(norm.id);
              const existingIdx = updatedCurrentList.findIndex(item => item.id === norm.id);
              if (existingIdx >= 0) {
                updatedCurrentList[existingIdx] = norm;
              } else {
                updatedCurrentList.unshift(norm);
              }
            });
            mergedAdded[currentServiceId] = updatedCurrentList;

            if (targetSvc !== currentServiceId) {
              const listForTarget = mergedAdded[targetSvc] || [];
              const updatedTargetList = [...listForTarget];
              incomingData.productsSnapshot.forEach((p: any, idx: number) => {
                const norm = normalizeProduct(p, idx, 'Album Nhập', targetSvc);
                const existingIdx = updatedTargetList.findIndex(item => item.id === norm.id);
                if (existingIdx >= 0) {
                  updatedTargetList[existingIdx] = norm;
                } else {
                  updatedTargetList.unshift(norm);
                }
              });
              mergedAdded[targetSvc] = updatedTargetList;
            }
          }

          // Merge custom product overrides
          const mergedCustom = { ...currentCustom, ...(incomingData.customProducts || {}) };

          // Merge custom subcategories
          const mergedCats = { ...currentCats };
          if (incomingData.customSubcategories && typeof incomingData.customSubcategories === 'object') {
            Object.entries(incomingData.customSubcategories).forEach(([svcId, cats]) => {
              if (Array.isArray(cats)) {
                const effectiveSvc = svcId === 'all' ? currentServiceId : svcId;
                const existing = mergedCats[effectiveSvc] || [];
                const combined = new Set([...existing, ...cats.map(c => String(c).trim()).filter(Boolean)]);
                mergedCats[effectiveSvc] = Array.from(combined);
              }
            });
          }

          // Register all discovered category names into current service
          const currentSvcCats = new Set(mergedCats[currentServiceId] || []);
          importedCategories.forEach(cat => {
            if (cat && cat !== 'ALL') currentSvcCats.add(cat);
          });
          mergedCats[currentServiceId] = Array.from(currentSvcCats);

          // Merge category renames
          const mergedRenames = { ...currentRenames };
          if (incomingData.categoryRenames) {
            Object.entries(incomingData.categoryRenames).forEach(([svcId, renames]) => {
              mergedRenames[svcId] = { ...(mergedRenames[svcId] || {}), ...(renames as Record<string, string>) };
            });
          }

          // Merge covers
          const mergedCovers = { ...currentCovers };
          if (incomingData.categoryCovers) {
            Object.entries(incomingData.categoryCovers).forEach(([svcId, covers]) => {
              mergedCovers[svcId] = { ...(mergedCovers[svcId] || {}), ...(covers as Record<string, string>) };
            });
          }

          // Automatically assign covers for imported albums if missing
          const currentAddedProds = mergedAdded[currentServiceId] || [];
          currentAddedProds.forEach(p => {
            const catKey = (p.categoryName || '').trim().toLowerCase();
            if (catKey && p.thumbnail) {
              if (!mergedCovers[currentServiceId]) mergedCovers[currentServiceId] = {};
              if (!mergedCovers[currentServiceId][catKey]) {
                mergedCovers[currentServiceId][catKey] = p.thumbnail;
              }
            }
          });

          // Unmark deleted categories and products so they show up immediately
          unmarkDeleted(targetSvc, Array.from(importedCategories), Array.from(importedProductIds));

          // Save to SafeStorage
          SafeStorage.setJSON('monos_gallery_added_products', mergedAdded);
          SafeStorage.setJSON('monos_gallery_custom_products', mergedCustom);
          SafeStorage.setJSON('monos_gallery_custom_subcategories', mergedCats);
          SafeStorage.setJSON('monos_gallery_category_renames', mergedRenames);
          SafeStorage.setJSON('monos_gallery_category_covers', mergedCovers);
          SafeStorage.setJSON('monos_deleted_product_ids', currentDeletedIds);
          SafeStorage.setJSON('monos_deleted_categories', currentDeletedCats);

          // Sync to server
          syncDataToServer({
            monos_gallery_added_products: mergedAdded,
            monos_gallery_custom_products: mergedCustom,
            monos_gallery_custom_subcategories: mergedCats,
            monos_gallery_category_renames: mergedRenames,
            monos_gallery_category_covers: mergedCovers,
            monos_deleted_product_ids: currentDeletedIds,
            monos_deleted_categories: currentDeletedCats
          });

          const totalProds = importedProductIds.size || (incomingData.productsSnapshot?.length ?? 0);
          const totalAlbs = importedCategories.size || Object.keys(mergedCats[currentServiceId] || {}).length || 1;

          resolve({
            success: true,
            albumsCount: totalAlbs,
            productsCount: totalProds,
            message: `Đã nạp thành công dữ liệu Album (${totalAlbs} album, ${totalProds} sản phẩm)!`
          });
          return;
        }

        // Case 2: Full System Backup File
        if (parsed.furniture_os_partners || parsed.monos_gallery_added_products || parsed.monos_custom_categories) {
          SafeStorage.hydrate(parsed);
          syncDataToServer(parsed);
          resolve({
            success: true,
            albumsCount: Object.keys(parsed.monos_gallery_custom_subcategories || {}).length || 1,
            productsCount: Object.keys(parsed.monos_gallery_custom_products || {}).length || 1,
            message: 'Đã nạp và khôi phục toàn bộ dữ liệu hệ thống & album thành công!'
          });
          return;
        }

        // Case 3: Objects with array properties: { products: [...] } or { items: [...] } or { data: [...] } or { albums: [...] }
        let productArray: any[] = [];
        let defaultAlbumName = 'Album Nhập Khẩu';

        if (Array.isArray(parsed)) {
          productArray = parsed;
        } else if (Array.isArray(parsed.products)) {
          productArray = parsed.products;
          if (parsed.serviceName || parsed.albumName || parsed.categoryName) {
            defaultAlbumName = parsed.serviceName || parsed.albumName || parsed.categoryName;
          }
        } else if (Array.isArray(parsed.items)) {
          productArray = parsed.items;
        } else if (Array.isArray(parsed.data)) {
          productArray = parsed.data;
        } else if (Array.isArray(parsed.albums)) {
          // Flatten albums with items
          parsed.albums.forEach((alb: any) => {
            const albTitle = alb.name || alb.title || alb.categoryName || defaultAlbumName;
            const albItems = Array.isArray(alb.items) ? alb.items : (Array.isArray(alb.products) ? alb.products : []);
            albItems.forEach((itm: any) => {
              if (typeof itm === 'object') {
                productArray.push({ ...itm, categoryName: albTitle });
              } else if (typeof itm === 'string') {
                productArray.push({ thumbnail: itm, categoryName: albTitle });
              }
            });
          });
        } else if (typeof parsed === 'object' && parsed !== null) {
          // Check if object keys are category names mapping to array of items
          // e.g. { "Phòng khách": [ ... ], "Phòng ngủ": [ ... ] }
          const keys = Object.keys(parsed);
          let foundCategoryDict = false;
          keys.forEach(key => {
            if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
              foundCategoryDict = true;
              parsed[key].forEach((itm: any) => {
                if (typeof itm === 'object') {
                  productArray.push({ ...itm, categoryName: key });
                } else if (typeof itm === 'string') {
                  productArray.push({ thumbnail: itm, categoryName: key });
                }
              });
            }
          });
          if (!foundCategoryDict && (parsed.thumbnail || parsed.image || parsed.name || parsed.title)) {
            productArray = [parsed];
          }
        }

        if (productArray.length > 0) {
          const targetSvc = currentServiceId;
          const mergedAdded = { ...currentAdded };
          const existingList = mergedAdded[targetSvc] || [];
          const updatedList = [...existingList];

          const importedCategories = new Set<string>();
          const importedProductIds = new Set<string>();

          productArray.forEach((item, idx) => {
            const norm = normalizeProduct(item, idx, defaultAlbumName, targetSvc);
            importedCategories.add(norm.categoryName);
            importedProductIds.add(norm.id);

            const existingIdx = updatedList.findIndex(p => p.id === norm.id);
            if (existingIdx >= 0) {
              updatedList[existingIdx] = norm;
            } else {
              updatedList.unshift(norm);
            }
          });

          mergedAdded[targetSvc] = updatedList;

          // Register categories into custom subcategories
          const mergedCats = { ...currentCats };
          const catsSet = new Set(mergedCats[targetSvc] || []);
          importedCategories.forEach(c => {
            if (c && c !== 'ALL') catsSet.add(c);
          });
          mergedCats[targetSvc] = Array.from(catsSet);

          // Update covers
          const mergedCovers = { ...currentCovers };
          if (!mergedCovers[targetSvc]) mergedCovers[targetSvc] = {};
          updatedList.forEach(p => {
            const catKey = (p.categoryName || '').trim().toLowerCase();
            if (catKey && p.thumbnail && !mergedCovers[targetSvc][catKey]) {
              mergedCovers[targetSvc][catKey] = p.thumbnail;
            }
          });

          // Unmark any deleted categories / products
          unmarkDeleted(targetSvc, Array.from(importedCategories), Array.from(importedProductIds));

          SafeStorage.setJSON('monos_gallery_added_products', mergedAdded);
          SafeStorage.setJSON('monos_gallery_custom_subcategories', mergedCats);
          SafeStorage.setJSON('monos_gallery_category_covers', mergedCovers);
          SafeStorage.setJSON('monos_deleted_product_ids', currentDeletedIds);
          SafeStorage.setJSON('monos_deleted_categories', currentDeletedCats);

          syncDataToServer({
            monos_gallery_added_products: mergedAdded,
            monos_gallery_custom_subcategories: mergedCats,
            monos_gallery_category_covers: mergedCovers,
            monos_deleted_product_ids: currentDeletedIds,
            monos_deleted_categories: currentDeletedCats
          });

          resolve({
            success: true,
            albumsCount: importedCategories.size,
            productsCount: productArray.length,
            message: `Đã nạp thành công ${productArray.length} sản phẩm (${importedCategories.size} album) từ file JSON!`
          });
          return;
        }

        throw new Error('Định dạng file không phù hợp. Vui lòng chọn file JSON chứa danh sách sản phẩm hoặc Album hợp lệ.');
      } catch (err: any) {
        console.error('Import error:', err);
        reject(new Error(err.message || 'Lỗi khi xử lý file JSON.'));
      }
    };
    reader.onerror = () => reject(new Error('Lỗi khi đọc file từ máy tính.'));
    reader.readAsText(file);
  });
}
