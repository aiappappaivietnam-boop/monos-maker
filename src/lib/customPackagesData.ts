/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomPackage } from '../types';
import { syncDataToServer } from './storageSync';
import { SafeStorage } from './safeStorage';

const STORAGE_KEY = 'monos_custom_packages_data';

// Default starter custom packages for companies (e.g. HMD, NTC) if none exist yet
const INITIAL_DEMO_CUSTOM_PACKAGES: CustomPackage[] = [
  {
    id: 'cpkg-hmd-smart-office',
    companyId: 'hmd',
    name: 'B+Smart Office Bespoke Solution',
    tag: 'Bespoke Custom',
    description: 'Bộ giải pháp phát triển dòng bàn nâng hạ thông minh tích hợp ray đi dây âm, khay ổ cắm đa năng và sạc không dây thiết kế độc quyền cho HMD.',
    type: 'package',
    price: 15000000,
    currency: 'VNĐ',
    icon: 'Laptop',
    items: [
      'Khảo sát & phân tích xu hướng thiết kế bàn công thái học năm 2026',
      'Thiết kế 3D CAD/CAM chi tiết & bộ hồ sơ kỹ thuật sản xuất',
      'Phát triển 2 bộ khung kim loại tùy biến cho mặt bàn uốn cong',
      'Tích hợp ray quản lý dây cáp và cổng sạc USB-C PD chuẩn quốc tế',
      'Bộ catalogue bán hàng và render phối cảnh studio 4K'
    ],
    outcomes: [
      'Bàn giao toàn bộ quyền sở hữu trí tuệ bản vẽ kỹ thuật',
      'Định hình phân khúc sản phẩm cao cấp mới cho HMD'
    ],
    note: 'Áp dụng cho đợt triển khai OBM Q4/2026',
    createdAt: new Date().toISOString()
  },
  {
    id: 'cpkg-hmd-ecom-pack',
    companyId: 'hmd',
    name: 'B+Ecom Fast-Track Packaging Kit',
    tag: 'E-commerce Mass',
    description: 'Quy chuẩn đóng gói flat-pack tối ưu diện tích container vận chuyển xuất khẩu và trải nghiệm unboxing theo chuẩn Amazon ISTA-3A.',
    type: 'per_unit',
    unit: 'SKU',
    price: 2500000,
    currency: 'VNĐ',
    icon: 'Box',
    items: [
      'Phân tích kích thước thùng carton theo tỉ lệ nén thể tích 1:3',
      'Thiết kế xốp bảo vệ định hình chống va đập góc cạnh',
      'Soạn thảo sách hướng dẫn lắp ráp 3D (Assembly Manual) kèm mã QR video',
      'Kiểm định độ bền rơi tự do và rung lắc'
    ],
    outcomes: [
      'Giảm 25% chi phí logistics và thể tích đóng thùng',
      'Hạn chế tỉ lệ đổi trả do trầy xước dưới 0.5%'
    ],
    note: 'Thiết kế riêng theo dây chuyền đóng gói của HMD',
    createdAt: new Date().toISOString()
  }
];

export function getStoredCustomPackages(companyId?: string): CustomPackage[] {
  try {
    const all = SafeStorage.getJSON<CustomPackage[]>(STORAGE_KEY, INITIAL_DEMO_CUSTOM_PACKAGES);
    if (!SafeStorage.getItem(STORAGE_KEY)) {
      SafeStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DEMO_CUSTOM_PACKAGES));
    }
    
    if (companyId) {
      return all.filter(p => p.companyId === companyId);
    }
    return all;
  } catch (error) {
    console.error('Error reading custom packages from storage:', error);
    return companyId ? INITIAL_DEMO_CUSTOM_PACKAGES.filter(p => p.companyId === companyId) : INITIAL_DEMO_CUSTOM_PACKAGES;
  }
}

export function saveCustomPackage(pkg: CustomPackage): CustomPackage[] {
  try {
    const all = getStoredCustomPackages();
    const existingIndex = all.findIndex(p => p.id === pkg.id);
    let updated: CustomPackage[];
    
    if (existingIndex >= 0) {
      updated = [...all];
      updated[existingIndex] = {
        ...pkg,
        updatedAt: new Date().toISOString()
      };
    } else {
      updated = [
        ...all,
        {
          ...pkg,
          createdAt: pkg.createdAt || new Date().toISOString()
        }
      ];
    }
    
    SafeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    syncDataToServer({ [STORAGE_KEY]: updated });
    return updated;
  } catch (error) {
    console.error('Error saving custom package:', error);
    return [];
  }
}

export function deleteCustomPackage(id: string): CustomPackage[] {
  try {
    const all = getStoredCustomPackages();
    const updated = all.filter(p => p.id !== id);
    SafeStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    syncDataToServer({ [STORAGE_KEY]: updated });
    return updated;
  } catch (error) {
    console.error('Error deleting custom package:', error);
    return [];
  }
}

// Preset Templates for quick creation by admin
export const CUSTOM_PACKAGE_TEMPLATES = [
  {
    name: 'Gói Thiết kế Sản phẩm Bespoke Cao Cấp',
    tag: 'Bespoke Custom',
    description: 'Nghiên cứu, tạo dáng công nghiệp 3D và hoàn thiện hồ sơ sản xuất cho dòng sản phẩm nội thất đặc thù.',
    type: 'package' as const,
    price: 18000000,
    currency: 'VNĐ' as const,
    icon: 'Sparkles',
    items: [
      'Phân tích định vị thương hiệu và khách hàng mục tiêu',
      'Phát triển 3 Concept thiết kế tạo dáng 3D độc quyền',
      'Dựng bản vẽ kỹ thuật chi tiết 2D CAD & thông số gia công',
      'Chọn mẫu vật liệu, màu sắc và phụ kiện cơ khí cao cấp',
      'Render hình ảnh 3D chân thực 4K bối cảnh không gian sống'
    ],
    outcomes: [
      'Bàn giao toàn bộ file 3D CAD/STEP và bản vẽ sản xuất',
      'Độc quyền mẫu mã không trùng lặp trên thị trường'
    ]
  },
  {
    name: 'Gói Tiêu Chuẩn Hóa Đóng Gói E-commerce & Flat-pack',
    tag: 'E-commerce Mass',
    description: 'Thiết kế hệ thống bao bì, đóng gói phẳng (Flat-pack) đạt tiêu chuẩn vận chuyển xuất khẩu quốc tế.',
    type: 'per_unit' as const,
    unit: 'SKU',
    price: 3000000,
    currency: 'VNĐ' as const,
    icon: 'Box',
    items: [
      'Tối ưu kích thước bao bì giảm chi phí thể tích CBM',
      'Quy chuẩn xốp đệm góc chống va đập tiêu chuẩn ISTA',
      'Thiết kế nhãn barcode, hộp carton và tem xuất khẩu',
      'Bộ tài liệu hướng dẫn lắp ráp trực quan kèm mã QR'
    ],
    outcomes: [
      'Tiết kiệm đến 30% chi phí kho bãi và logistics',
      'Nâng cao trải nghiệm khui thùng và lắp ráp của người mua'
    ]
  },
  {
    name: 'Gói Số Hóa 3D Interactive & AR Visualizer',
    tag: 'Digital Twin / 3D',
    description: 'Dựng mô hình 3D tương tác đa góc nhìn 360 độ và tích hợp thực tế tăng cường AR trên website bán hàng.',
    type: 'per_unit' as const,
    unit: 'Model 3D',
    price: 1500000,
    currency: 'VNĐ' as const,
    icon: 'Boxes',
    items: [
      'Scan hoặc dựng lại hình học 3D chi tiết chuẩn tỷ lệ thực',
      'Xử lý chất liệu PBR siêu thực (gỗ, da, kim loại, vải)',
      'Tối ưu file dung lượng nhẹ load dưới 1 giây trên mobile',
      'Tích hợp công cụ đổi màu vật liệu và chế độ xem AR'
    ],
    outcomes: [
      'Tăng 40% tỷ lệ chuyển đổi đơn hàng online',
      'Khách hàng tự tin mua sắm nhờ trải nghiệm AR trực quan'
    ]
  },
  {
    name: 'Gói Phát Triển Bộ Sưu Tập OBM Toàn Diện',
    tag: 'OBM Collection',
    description: 'Giải pháp trọn gói từ ý tưởng, thiết kế đồng bộ, thử nghiệm mẫu thực tế đến đóng gói phân phối.',
    type: 'package' as const,
    price: 35000000,
    currency: 'VNĐ' as const,
    icon: 'Layers',
    items: [
      'Nghiên cứu thị trường và lập Moodboard định hướng bộ sưu tập',
      'Thiết kế đồng bộ từ 4-8 sản phẩm cùng ngôn ngữ thiết kế',
      'Giám sát tạo mẫu thực tế (Prototype) tại xưởng gia công',
      'Bộ tài liệu Marketing, Catalogue, Lookbook & Video giới thiệu',
      'Tư vấn chiến lược giá và kênh phân phối B2B'
    ],
    outcomes: [
      'Sở hữu bộ sưu tập nội thất hoàn chỉnh sẵn sàng thương mại hóa',
      'Rút ngắn 50% thời gian từ ý tưởng đến ra mắt thị trường'
    ]
  }
];
