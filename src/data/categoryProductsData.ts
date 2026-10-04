/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { syncDataToServer } from '../lib/storageSync';
import { SafeStorage } from '../lib/safeStorage';

export const DEFAULT_FURNITURE_PLACEHOLDER = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 800" width="100%" height="100%"><rect width="100%" height="100%" fill="%23f1f3f4"/></svg>`;

export interface GalleryProduct {
  id: string;
  name: string;
  code: string;
  category: string; // e.g. 'eca-home-office'
  categoryName: string;
  thumbnail: string;
  images: string[];
  dimensions: string;
  material: string;
  finish: string;
  priceRange: string;
  moq: string;
  leadTime: string;
  tags: string[];
  isHot?: boolean;
  isNew?: boolean;
  has3D?: boolean;
  hasCAD?: boolean;
  specifications: {
    label: string;
    value: string;
  }[];
  description: string;
}

/**
 * Catalog taxonomy supplied for the Home Office collection.
 *
 * These entries are kept separately from the product records so a category
 * can be visible in the filter before its first local product is uploaded.
 */
export const HOME_OFFICE_CATEGORY_CATALOG: Array<{ name: string; count: number }> = [
  { name: 'Adjustable Footrest', count: 1 },
  { name: 'Bookcase', count: 1 },
  { name: 'Cable Management', count: 1 },
  { name: 'Credenza / Storage Cabinet', count: 1 },
  { name: 'Desk Cart', count: 1 },
  { name: 'Desk Lamp', count: 1 },
  { name: 'Desk Mat', count: 1 },
  { name: 'Desk Organizer', count: 1 },
  { name: 'Desk Riser Shelf', count: 5 },
  { name: 'Desk Tray', count: 2 },
  { name: 'Executive Desk', count: 1 },
  { name: 'File Holders', count: 1 },
  { name: 'Flip-top storage desk', count: 3 },
  { name: 'Headphone Stand', count: 1 },
  { name: 'Home Office', count: 0 },
  { name: 'Keyboard Tray', count: 1 },
  { name: 'Laptop Riser', count: 2 },
  { name: 'Modular Wall Shelves', count: 1 },
  { name: 'Organization Deck', count: 6 },
  { name: 'Pegboard', count: 1 },
  { name: 'Printer Stand', count: 1 },
  { name: 'Secretary / Drop-front Desk', count: 1 },
  { name: 'Smart Standing Desks', count: 3 },
  { name: 'Standing Desk Converter', count: 1 },
  { name: 'Whiteboard / Corkboard', count: 1 },
  { name: 'Wrist Rest', count: 1 }
];

export const CATEGORY_PRODUCTS: Record<string, GalleryProduct[]> = {
  // 1. Ecommerce A - Home Office
  'eca-home-office': [
    {
      id: 'ho-01',
      name: 'Nordic ErgoDesk Pro - Bàn Làm Việc Nâng Hạ',
      code: 'HO-DK801',
      category: 'eca-home-office',
      categoryName: 'Home Office',
      thumbnail: 'https://i.postimg.cc/15G0TjqY/e85df6e90de9c51da07e9e7bc062b15b.jpg',
      images: [
        'https://i.postimg.cc/15G0TjqY/e85df6e90de9c51da07e9e7bc062b15b.jpg',
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1581291518655-9523c932edcf?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W1400 x D700 x H720-1180 mm',
      material: 'Mặt gỗ Sồi tự nhiên (FSC Oak) / Khung thép dập nguội',
      finish: 'Sơn tĩnh điện chống bám vân tay, Dầu lau hữu cơ',
      priceRange: '$52 - $75 FOB / 2.850.000₫',
      moq: '50 sản phẩm',
      leadTime: '20 - 30 ngày',
      tags: ['Bán chạy', 'Dual Motor', 'BIFMA Passed', 'Flat-pack'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Động cơ', value: 'Dual Motor êm ái < 45dB, nhớ 4 vị trí' },
        { label: 'Tải trọng', value: '120 kg an toàn' },
        { label: 'Quy cách đóng gói', value: '1 Thùng carton 5 lớp 1A (KD chuẩn E-commerce)' },
        { label: 'Trọng lượng (GW/NW)', value: '34.5 kg / 31.0 kg' }
      ],
      description: 'Dòng bàn nâng hạ thiết kế Scandinavian tối giản, tối ưu diện tích văn phòng tại gia. Đạt chứng chỉ độ bền BIFMA X5.5.'
    },
    {
      id: 'ho-02',
      name: 'AeroMesh Task Chair - Ghế Công Thái Học Lưới',
      code: 'HO-CH402',
      category: 'eca-home-office',
      categoryName: 'Home Office',
      thumbnail: 'https://i.postimg.cc/MHzNBQkg/2facd4f933c9f54f46952fb723ee30fc.jpg',
      images: [
        'https://i.postimg.cc/MHzNBQkg/2facd4f933c9f54f46952fb723ee30fc.jpg',
        'https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1589384267710-7a25be15f208?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W660 x D620 x H1160-1260 mm',
      material: 'Lưới Wintex Hàn Quốc chống giãn / Khung Nylon sợi thủy tinh',
      finish: 'Piston Class 4 mạ Chrome, Chân nhôm đúc áp lực',
      priceRange: '$38 - $58 FOB / 1.750.000₫',
      moq: '100 sản phẩm',
      leadTime: '15 - 25 ngày',
      tags: ['Công thái học', '3D Armrest', 'Lưới thoáng khí'],
      isNew: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Cơ chế ngả', value: 'Đồng bộ 3 nấc khóa (90° - 115° - 135°)' },
        { label: 'Tựa thắt lưng', value: 'Dynamic Lumbar Support tự chỉnh' },
        { label: 'Bánh xe', value: 'PU chống ồn, chống trầy sàn gỗ' }
      ],
      description: 'Ghế làm việc công thái học lưới toàn phần thoáng khí, hỗ trợ đắc lực cho lưng và cột sống khi ngồi làm việc liên tục.'
    },
    {
      id: 'ho-03',
      name: 'Modula Bookshelf - Kệ Sách Đa Năng Khung Thép',
      code: 'HO-SH103',
      category: 'eca-home-office',
      categoryName: 'Home Office',
      thumbnail: 'https://i.postimg.cc/cLJKm9Mn/0f5d7eb8c6d86da429eef9e2db7fd988.jpg',
      images: [
        'https://i.postimg.cc/cLJKm9Mn/0f5d7eb8c6d86da429eef9e2db7fd988.jpg',
        'https://images.unsplash.com/photo-1594692753232-a5d625d3039d?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1544457070-4cd773b4d71e?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W900 x D350 x H1800 mm',
      material: 'Gỗ công nghiệp MDF lõi xanh chống ẩm tiêu chuẩn E0 / Thép hộp',
      finish: 'Phủ Melamine vân gỗ Walnut sần tự nhiên / Khung đen nhám',
      priceRange: '$28 - $42 FOB / 1.150.000₫',
      moq: '80 sản phẩm',
      leadTime: '20 ngày',
      tags: ['Flat-pack', 'Dễ lắp ráp', '5 Tầng lưu trữ'],
      hasCAD: true,
      specifications: [
        { label: 'Số tầng', value: '5 tầng chịu tải 25kg/tầng' },
        { label: 'Thời gian lắp đặt', value: '15 phút với bộ tool đi kèm' }
      ],
      description: 'Kệ sách phong cách công nghiệp tối giản, đóng gói siêu mỏng giảm chi phí vận chuyển chặng cuối.'
    },
    {
      id: 'ho-04',
      name: 'DuoDesk Studio - Bàn Làm Việc 2 Chỗ Gấp Gọn',
      code: 'HO-DK904',
      category: 'eca-home-office',
      categoryName: 'Home Office',
      thumbnail: 'https://i.postimg.cc/nLyCnH89/6576d675efbd57733ebd7ea0f11057d4.jpg',
      images: [
        'https://i.postimg.cc/nLyCnH89/6576d675efbd57733ebd7ea0f11057d4.jpg',
        'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W1800 x D600 x H750 mm',
      material: 'Gỗ Tần Bì (Ash) tự nhiên / Chân sắt côn dập mỹ thuật',
      finish: 'Sơn PU gốc nước an toàn không mùi',
      priceRange: '$45 - $68 FOB / 2.100.000₫',
      moq: '60 sản phẩm',
      leadTime: '25 ngày',
      tags: ['Studio', 'Gỗ Tự Nhiên', 'Quản lý dây điện âm'],
      has3D: true,
      specifications: [
        { label: 'Khay quản lý dây cáp', value: 'Tích hợp máng thép giấu dây ngầm' },
        { label: 'Cổng cắm tích hợp', value: 'Hốc chờ ổ cắm Type-C và AC 220V' }
      ],
      description: 'Bàn làm việc đôi dành cho không gian nhỏ hoặc studio sáng tạo, thiết kế rãnh luồn dây thông minh.'
    }
  ],

  // 2. Ecommerce A - Home Fitness
  'eca-home-fitness': [
    {
      id: 'fit-01',
      name: 'Nordic Wood Dumbbell Rack - Kệ Tạ Gỗ Tự Nhiên',
      code: 'FIT-RK201',
      category: 'eca-home-fitness',
      categoryName: 'Home Fitness',
      thumbnail: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W850 x D400 x H780 mm',
      material: 'Gỗ Cao Su tự nhiên ghép thanh / Thép tấm 3mm',
      finish: 'Sơn phủ chống ẩm cao cấp, bọc đệm cao su bảo vệ tay cầm',
      priceRange: '$35 - $48 FOB / 1.450.000₫',
      moq: '50 sản phẩm',
      leadTime: '20 ngày',
      tags: ['Home Gym', 'Chịu lực 200kg', 'Gỗ Thân Thiện'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Sức chứa', value: '6 đôi tạ tay (1kg - 25kg) + khay để chuông Kettlebell' },
        { label: 'Tải trọng tối đa', value: '250 kg' }
      ],
      description: 'Kệ tạ thẩm mỹ phù hợp phòng khách hoặc căn hộ hiện đại, biến đồ tập thành món đồ trang trí nội thất.'
    },
    {
      id: 'fit-02',
      name: 'Zen Yoga Storage Tower - Kệ Thảm & Phụ Kiện Yoga',
      code: 'FIT-YG302',
      category: 'eca-home-fitness',
      categoryName: 'Home Fitness',
      thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W600 x D350 x H1400 mm',
      material: 'Gỗ Thông New Zealand / Vải Canvas dệt thô',
      finish: 'Màu gỗ tự nhiên mộc (Natural Oil Finish)',
      priceRange: '$26 - $36 FOB / 980.000₫',
      moq: '80 sản phẩm',
      leadTime: '15 ngày',
      tags: ['Yoga Studio', 'Eco-friendly', 'Gọn gàng'],
      specifications: [
        { label: 'Ngăn chứa', value: '4 ngăn cuộn thảm, 3 rổ đựng gạch tập và dây kháng lực' }
      ],
      description: 'Tháp lưu trữ đồ tập yoga thanh lịch, tạo cảm giác thiền định và thư thái cho góc tập tại gia.'
    },
    {
      id: 'fit-03',
      name: 'ErgoBench Plyo - Ghế Tập Đa Năng Bọc Da PU',
      code: 'FIT-BC103',
      category: 'eca-home-fitness',
      categoryName: 'Home Fitness',
      thumbnail: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W1200 x D380 x H460 mm',
      material: 'Mút định hình mật độ cao / Da PU kháng mồ hôi / Khung thép hộp',
      finish: 'Sơn tĩnh điện chống xước',
      priceRange: '$32 - $46 FOB / 1.350.000₫',
      moq: '70 sản phẩm',
      leadTime: '20 ngày',
      tags: ['Đa năng', 'Gập gọn', 'Kháng ẩm'],
      hasCAD: true,
      specifications: [
        { label: 'Tính năng', value: 'Gập phẳng cất dưới gầm giường khi không sử dụng' },
        { label: 'Tải trọng', value: '300 kg' }
      ],
      description: 'Ghế tập thể hình tại nhà có thể gập siêu mỏng chỉ 12cm, đệm mút cao cấp không xẹp lún.'
    }
  ],

  // 3. Ecommerce A - Wood Outdoor
  'eca-wood-outdoor': [
    {
      id: 'wo-01',
      name: 'TeakCraft 6-Seater Outdoor Dining Set',
      code: 'WO-DS501',
      category: 'eca-wood-outdoor',
      categoryName: 'Wood Outdoor',
      thumbnail: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1533779283484-84e14e4cb310?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Bàn: W1800 x D900 x H760 mm | Ghế: W580 x D620 x H880 mm',
      material: 'Gỗ Keo (Acacia) xuất khẩu xử lý sấy lò nhiệt chống nứt / Phụ kiện Inox 304',
      finish: 'Dầu Teak chuyên dụng ngoài trời kháng tia UV 3 năm',
      priceRange: '$110 - $165 FOB / 4.900.000₫ (Nguyên bộ)',
      moq: '30 bộ',
      leadTime: '30 - 40 ngày',
      tags: ['Sân Vườn', 'Kháng Nước', 'Xuất Châu Âu', 'FSC Certified'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Tiêu chuẩn gỗ', value: 'Gỗ Acacia FSC 100%, độ ẩm < 12%' },
        { label: 'Lỗ cắm dù', value: 'Lỗ luồn cán ô ngoài trời đường kính 50mm' },
        { label: 'Ghế', value: 'Ghế xếp chồng gọn gàng tiết kiệm diện tích' }
      ],
      description: 'Bộ bàn ăn ngoài trời 6 chỗ phong cách Rustic tinh tế, gỗ xẻ dày dặn chịu nắng mưa khắc nghiệt.'
    },
    {
      id: 'wo-02',
      name: 'Riviera Folding Garden Chair - Ghế Xếp Sân Vườn',
      code: 'WO-CH102',
      category: 'eca-wood-outdoor',
      categoryName: 'Wood Outdoor',
      thumbnail: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W520 x D580 x H890 mm',
      material: 'Gỗ Bạch Đàn (Eucalyptus) / Chốt thép mạ kẽm',
      finish: 'Sơn ngâm tẩm chống mối mọt nấm mốc',
      priceRange: '$18 - $26 FOB / 680.000₫',
      moq: '150 sản phẩm',
      leadTime: '20 ngày',
      tags: ['Gấp gọn', 'Ban công', 'Bán chạy Amazon'],
      hasCAD: true,
      specifications: [
        { label: 'Quy cách gấp', value: 'Dày chỉ 9cm sau khi gập' },
        { label: 'Tải trọng', value: '140 kg' }
      ],
      description: 'Mẫu ghế gấp kinh điển cho ban công và quán cafe sân vườn, thao tác gấp mở siêu nhanh trong 2 giây.'
    }
  ],

  // 4. Ecommerce A - Metal Outdoor
  'eca-metal-outdoor': [
    {
      id: 'mo-01',
      name: 'Verona Cast Aluminum Bistro Set - Bộ Bàn Tròn Ban Công',
      code: 'MO-BS201',
      category: 'eca-metal-outdoor',
      categoryName: 'Metal Outdoor',
      thumbnail: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Bàn: Ø650 x H720 mm | Ghế: W480 x D520 x H850 mm',
      material: 'Nhôm đúc nguyên khối chống rỉ sét 100%',
      finish: 'Sơn tĩnh điện vân đồng cổ (Antique Bronze Powder Coating)',
      priceRange: '$48 - $72 FOB / 2.250.000₫',
      moq: '50 bộ',
      leadTime: '25 ngày',
      tags: ['Nhôm đúc', 'Chống gỉ vĩnh viễn', 'Ban công'],
      isNew: true,
      has3D: true,
      specifications: [
        { label: 'Khả năng chịu thời tiết', value: 'Chịu sương muối ven biển tốt' },
        { label: 'Đóng gói', value: '1 bàn + 2 ghế trong 1 thùng Master Carton' }
      ],
      description: 'Bộ bàn ghế nhôm đúc phong cách Châu Âu lãng mạn, hoàn toàn không lo gỉ sét dù để ngoài trời mưa bão quanh năm.'
    }
  ],

  // 5. Ecommerce A - Concrete Outdoor
  'eca-concrete-outdoor': [
    {
      id: 'co-01',
      name: 'Brutalist Light-Concrete Table - Bàn Bê Tông Nhẹ Sợi GRC',
      code: 'CO-TB601',
      category: 'eca-concrete-outdoor',
      categoryName: 'Concrete Outdoor',
      thumbnail: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W1600 x D850 x H750 mm',
      material: 'Bê tông sợi thủy tinh GRC siêu nhẹ / Chân thép sơn mờ',
      finish: 'Phủ lớp Sealer Nano chống thấm ố cafe rượu vang',
      priceRange: '$85 - $125 FOB / 3.800.000₫',
      moq: '25 sản phẩm',
      leadTime: '30 ngày',
      tags: ['Bê tông nhẹ', 'Phong cách Brutalism', 'Chống thấm Nano'],
      isHot: true,
      has3D: true,
      specifications: [
        { label: 'Trọng lượng', value: 'Nhẹ hơn 60% so với bê tông đúc khối truyền thống' },
        { label: 'Tiêu chuẩn', value: 'Không bám rêu mốc, chống rạn nứt nhiệt' }
      ],
      description: 'Sự kết hợp hoàn hảo giữa vẻ đẹp mộc mạc của bê tông kiến trúc và công nghệ vật liệu sợi GRC hiện đại.'
    }
  ],

  // 6. Ecommerce A - Upholstery
  'eca-upholstery': [
    {
      id: 'up-01',
      name: 'CloudLounge 3-Seater Sofa - Sofa Văng 3 Chỗ Vải Nỉ',
      code: 'UP-SF701',
      category: 'eca-upholstery',
      categoryName: 'Upholstery',
      thumbnail: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W2100 x D880 x H820 mm',
      material: 'Khung gỗ Thông New Zealand sấy nhiệt / Lò xo túi độc lập / Đệm Foam D40',
      finish: 'Vải nỉ Bouclé sợi len cừu / Vải lanh dệt thô chống xước móng vuốt thú cưng',
      priceRange: '$120 - $180 FOB / 5.200.000₫',
      moq: '20 chiếc',
      leadTime: '25 - 35 ngày',
      tags: ['Bán chạy', 'Đệm lông vũ nhân tạo', 'Vỏ tháo giặt được', 'Khung bảo hành 5 năm'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Cấu trúc đệm', value: 'Foam D40 đàn hồi cao + 3 lớp gòn lông vũ nhân tạo êm ái' },
        { label: 'Vỏ bọc', value: 'Tháo rời dễ dàng vệ sinh giặt máy' },
        { label: 'Chứng chỉ vải', value: 'OEKO-TEX Standard 100 an toàn sức khỏe' }
      ],
      description: 'Sofa êm ái như mây với phong cách Japandi đương đại, cấu trúc nệm lò xo độc lập chuẩn xuất khẩu.'
    },
    {
      id: 'up-02',
      name: 'Milo Accent Armchair - Ghế Bành Thư Giãn',
      code: 'UP-AC302',
      category: 'eca-upholstery',
      categoryName: 'Upholstery',
      thumbnail: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W780 x D820 x H840 mm',
      material: 'Vỏ gỗ dán uốn nhiệt Plywood / Da nhân tạo nappa cao cấp',
      finish: 'Chân sắt thanh mảnh sơn đen mờ',
      priceRange: '$55 - $82 FOB / 2.350.000₫',
      moq: '40 chiếc',
      leadTime: '20 ngày',
      tags: ['Ghế đơn', 'Thư giãn', 'Da Nappa'],
      has3D: true,
      specifications: [
        { label: 'Góc tựa lưng', value: '105° chuẩn công thái học nghỉ ngơi' }
      ],
      description: 'Chiếc ghế điểm nhấn hoàn hảo cho góc đọc sách, phòng ngủ hoặc sảnh lễ tân văn phòng.'
    }
  ],

  // 7. Ecommerce B - Furniture sơn mài
  'ecb-son-mai': [
    {
      id: 'sm-01',
      name: 'Imperial Wave Lacquer Cabinet - Tủ Sơn Mài Sóng Nước Dát Vàng',
      code: 'SM-CB901',
      category: 'ecb-son-mai',
      categoryName: 'Furniture sơn mài',
      thumbnail: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W1500 x D450 x H850 mm',
      material: 'Cốt gỗ MDF chống ẩm tỷ trọng cao HDF / Sơn ta truyền thống / Dát lá vàng 24K',
      finish: 'Mài phẳng 18 lớp thủ công, bóng gương siêu sâu (High-Gloss Mirror Finish)',
      priceRange: '$450 - $750 FOB / 18.500.000₫',
      moq: '5 chiếc (Độc bản)',
      leadTime: '45 - 60 ngày',
      tags: ['Độc bản thủ công', 'Dát vàng 24K', 'Sơn Ta truyền thống', 'Limited Edition'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Quy trình sơn', value: '18 lớp sơn mài ủ ẩm thủ công kéo dài 60 ngày' },
        { label: 'Họa tiết', value: 'Khảm xà cừ và dát vàng theo kỹ thuật cung đình Huế' },
        { label: 'Phụ kiện', value: 'Bản lề giấu Blum đồng thau mạ vàng' }
      ],
      description: 'Kiệt tác nội thất sơn mài đương đại kết hợp tinh hoa thủ công mỹ nghệ Việt Nam với ngôn ngữ thiết kế sang trọng đẳng cấp thế giới.'
    },
    {
      id: 'sm-02',
      name: 'Eclipse Lacquer Coffee Table - Bàn Trà Sơn Mài Nguyệt Thực',
      code: 'SM-TB402',
      category: 'ecb-son-mai',
      categoryName: 'Furniture sơn mài',
      thumbnail: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Ø900 x H420 mm',
      material: 'Gỗ gõ đỏ nguyên khối / Sơn mài đen tuyền phối khảm vỏ trứng',
      finish: 'Bóng mờ Satin sang trọng',
      priceRange: '$220 - $350 FOB / 8.900.000₫',
      moq: '10 chiếc',
      leadTime: '35 ngày',
      tags: ['Khảm vỏ trứng', 'Nghệ thuật đương đại', 'Limited'],
      has3D: true,
      specifications: [
        { label: 'Kỹ thuật', value: 'Khảm vỏ trứng vịt thủ công tạo gradient trừu tượng' }
      ],
      description: 'Bàn trà tròn trung tâm phòng khách với bề mặt sơn mài khảm vỏ trứng tinh xảo, mỗi sản phẩm là một bản vân độc nhất.'
    }
  ],

  // 8. Ecommerce B - Bàn ăn Resin
  'ecb-resin': [
    {
      id: 'rs-01',
      name: 'Ocean River Live Edge Resin Dining Table - Bàn Ăn Gỗ Me Tây Resin Dòng Sông',
      code: 'RS-DT801',
      category: 'ecb-resin',
      categoryName: 'Bàn ăn Resin',
      thumbnail: 'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1530018607912-eff2daa1bac4?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'W2200 x D950 x H760 mm (Độ dày mặt 50mm)',
      material: 'Gỗ Me Tây nguyên tấm lâu năm tự nhiên / Keo Epoxy Resin quang học chống ố vàng',
      finish: 'Đánh bóng quang học độ trong suốt 99%, Dầu khoáng hữu cơ bảo vệ gỗ',
      priceRange: '$380 - $650 FOB / 16.200.000₫',
      moq: '5 bàn',
      leadTime: '30 - 45 ngày',
      tags: ['Live Edge Độc Bản', 'Resin Chống Ố', 'Chân Thép Nghệ Thuật', 'VIP Collection'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Độ trong suốt', value: 'Epoxy Resin Ultra-Clear kháng UV 10 năm không ngả vàng' },
        { label: 'Xử lý gỗ', value: 'Sấy lò chân không hút ẩm chuẩn xuất khẩu chống co ngót' },
        { label: 'Chân bàn', value: 'Khung chân thép chữ X sơn tĩnh điện mạ đồng' }
      ],
      description: 'Bàn ăn Resin dòng sông đại dương kết hợp cạnh gỗ tự nhiên uốn lượn, tôn vinh vẻ đẹp nguyên bản của thiên nhiên và nghệ thuật thủ công.'
    }
  ],

  // 9. Ecommerce B - Lamp
  'ecb-lamp': [
    {
      id: 'lp-01',
      name: 'Aura Sculptural Chandelier - Đèn Chùm Điêu Khắc Kim Loại',
      code: 'LP-CD301',
      category: 'ecb-lamp',
      categoryName: 'Lamp',
      thumbnail: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Ø1100 x H650 mm (Dây treo chỉnh đến 2000mm)',
      material: 'Đồng thau nguyên chất (Solid Brass) / Thủy tinh Murano thổi thủ công',
      finish: 'Mạ vàng xước mờ Brushed Gold',
      priceRange: '$180 - $320 FOB / 7.500.000₫',
      moq: '10 bộ',
      leadTime: '25 ngày',
      tags: ['Đồng thau', 'Thủy tinh thổi', 'Dimming 3 chế độ', 'Nghệ thuật chiếu sáng'],
      isNew: true,
      has3D: true,
      specifications: [
        { label: 'Nguồn sáng', value: 'LED COB 3000K ánh sáng ấm CRI > 95' },
        { label: 'Điều khiển', value: 'Hỗ trợ Triac / DALI / Smart Home App' }
      ],
      description: 'Đèn chùm điêu khắc hình học đương đại, điểm nhấn ánh sáng lộng lẫy cho không gian phòng khách và thông tầng biệt thự.'
    }
  ],

  // 10. OBM Global - B+Furniture
  'b2b-dist-platform': [
    {
      id: 'obm-f01',
      name: 'Oslo Modular Living & Dining Suite (OBM Collection 2026)',
      code: 'B2B-OSL01',
      category: 'b2b-dist-platform',
      categoryName: 'B+Furniture (OBM)',
      thumbnail: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Đầy đủ trọn bộ Dining + Living + Bedroom Module',
      material: 'Gỗ Sồi Trắng Bắc Mỹ (White Oak) / Phụ kiện bản lề giảm chấn Hettich',
      finish: 'Sơn PU gốc nước đạt chuẩn CARB P2 / TSCA Title VI xuất Mỹ',
      priceRange: 'Báo giá OEM/OBM theo container (FOB Cát Lái/Hải Phòng)',
      moq: '1x40HQ Container (Trộn 4-6 SKUs)',
      leadTime: '45 - 60 ngày',
      tags: ['OBM Trọn Gói', 'Đạt Chuẩn CARB-P2', 'Hồ Sơ CAD/BOM Sẵn Sàng', '3D Asset Sẵn'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Quy chuẩn đóng gói', value: 'ISTA 3A Drop Test Pass, Drop Safe cho E-commerce D2C' },
        { label: 'Hồ sơ kỹ thuật', value: 'File 2D CAD, 3D STEP/GLB, BOM định mức chi tiết có sẵn' },
        { label: 'Tùy biến thương hiệu', value: 'Hỗ trợ dập Logo kim loại, thiết kế thùng hộp carton theo brand' }
      ],
      description: 'Bộ giải pháp OBM nội thất gỗ cao cấp trọn gói cho các thương hiệu quốc tế và chuỗi bán lẻ. Thiết kế tối ưu cước vận chuyển biển CBM.'
    },
    {
      id: 'obm-f02',
      name: 'Kyoto Minimalist Bed Frame - Giường Ngủ Knock-Down',
      code: 'B2B-KYO02',
      category: 'b2b-dist-platform',
      categoryName: 'B+Furniture (OBM)',
      thumbnail: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'King: W1900 x L2150 x H980 mm | Queen: W1600 x L2150 x H980 mm',
      material: 'Gỗ Tần Bì (Ash) nguyên khối / Nan giường gỗ Bạch Dương đàn hồi',
      finish: 'Dầu lau hữu cơ màu Walnut ấm',
      priceRange: '$115 - $165 FOB',
      moq: '50 chiếc',
      leadTime: '30 ngày',
      tags: ['Knock-Down', 'Lắp ráp 10 phút', 'Xuất khẩu'],
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Kết cấu', value: 'Mộng khóa âm dương không dùng ốc vít mặt ngoài' }
      ],
      description: 'Giường ngủ lắp ghép thông minh tháo rời nhỏ gọn, chịu tải trọng tĩnh lên tới 500kg.'
    }
  ],

  // 11. OBM Global - B+Outdoor
  'b2b-showroom-kit': [
    {
      id: 'obm-o01',
      name: 'Santorini Resort Outdoor Lounge Set (All-Weather Rope & Teak)',
      code: 'B2B-OUT01',
      category: 'b2b-showroom-kit',
      categoryName: 'B+Outdoor (OBM)',
      thumbnail: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
      ],
      dimensions: 'Sofa 3 chỗ: W2100 x D850 x H780 mm | Bàn cafe: W1200 x D650 x H420 mm',
      material: 'Khung nhôm sơn tĩnh điện AkzoNobel / Dây thừng dệt tay Olefin kháng UV / Vải Sunbrella',
      finish: 'Đệm mút xốp thoát nước nhanh Quick-Dry Foam chống ẩm mốc',
      priceRange: 'Báo giá dự án B2B / Khách sạn & Resort',
      moq: '10 bộ',
      leadTime: '35 - 45 ngày',
      tags: ['Resort 5 Sao', 'Dây Thừng Dệt Tay', 'Vải Sunbrella', 'Quick-Dry Foam'],
      isHot: true,
      has3D: true,
      hasCAD: true,
      specifications: [
        { label: 'Vải bọc ngoài trời', value: 'Vải Sunbrella USA chống phai màu 5 năm dưới ánh nắng' },
        { label: 'Mút đệm', value: 'Quick-Dry Foam xốp tổ ong nước chảy qua không đọng' },
        { label: 'Dây đan', value: 'Dây dệt sợi Olefin chịu lực kéo 300N, chống mục nước muối' }
      ],
      description: 'Bộ sưu tập bàn ghế thư giãn ngoài trời sang trọng bậc nhất dành cho các dự án khách sạn, resort nghỉ dưỡng cao cấp ven biển.'
    }
  ],

  // 12. OBM Global - B+ON
  'b2b-bon-solution': []
};

// Fallback generic products for any category that might not have a specific preset
export const DEFAULT_CATEGORY_PRODUCTS: GalleryProduct[] = [
  {
    id: 'gen-01',
    name: 'Nordic Minimalist Armchair - Ghế Bành Scandinavia',
    code: 'GEN-AC01',
    category: 'general',
    categoryName: 'Sản phẩm tham khảo',
    thumbnail: 'https://images.unsplash.com/photo-1580481077191-4fb9831ea236?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077191-4fb9831ea236?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80'
    ],
    dimensions: 'W680 x D720 x H840 mm',
    material: 'Gỗ Sồi tự nhiên / Vải nỉ cao cấp dệt sợi gai',
    finish: 'Dầu lau hữu cơ mờ tự nhiên',
    priceRange: '$45 - $68 FOB',
    moq: '50 chiếc',
    leadTime: '20 - 25 ngày',
    tags: ['Thiết kế Bắc Âu', 'Đệm tháo rời', 'Gỗ Tự Nhiên'],
    isHot: true,
    has3D: true,
    hasCAD: true,
    specifications: [
      { label: 'Quy cách lắp ráp', value: 'Lắp ráp trong 5 phút với 4 bu lông chốt đáy' },
      { label: 'Đóng gói', value: 'Thùng carton 5 lớp dán tem thương hiệu' }
    ],
    description: 'Sản phẩm mẫu tham khảo với thiết kế đương đại, tỷ lệ chuẩn mực cho dây chuyền sản xuất OEM/OBM.'
  },
  {
    id: 'gen-02',
    name: 'Artisan Side Table - Bàn Trà Nhỏ Tinh Tế',
    code: 'GEN-ST02',
    category: 'general',
    categoryName: 'Sản phẩm tham khảo',
    thumbnail: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=80'
    ],
    dimensions: 'Ø500 x H520 mm',
    material: 'Gỗ Tần Bì / Chân kim loại sơn tĩnh điện',
    finish: 'Phủ sơn PU mờ chống trầy xước',
    priceRange: '$18 - $28 FOB',
    moq: '100 chiếc',
    leadTime: '15 - 20 ngày',
    tags: ['Bàn góc', 'Gọn nhẹ', 'Dễ vận chuyển'],
    hasCAD: true,
    specifications: [
      { label: 'Trọng lượng', value: '4.2 kg' }
    ],
    description: 'Bàn phụ trang trí linh hoạt cho phòng khách, phòng ngủ hoặc không gian cafe thương mại.'
  },
  {
    id: 'gen-03',
    name: 'Geometric Open Shelf - Kệ Trang Trí Hình Học',
    code: 'GEN-SH03',
    category: 'general',
    categoryName: 'Sản phẩm tham khảo',
    thumbnail: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1200&q=80'
    ],
    dimensions: 'W1000 x D300 x H1600 mm',
    material: 'Gỗ Công Nghiệp An Cường E1 / Thép định hình',
    finish: 'Melamine chống nước / Sơn tĩnh điện đen mờ',
    priceRange: '$35 - $52 FOB',
    moq: '60 chiếc',
    leadTime: '20 ngày',
    tags: ['Kệ trang trí', 'Hiện đại', 'Flat-pack'],
    has3D: true,
    specifications: [
      { label: 'Tải trọng', value: '15 kg mỗi đợt kệ' }
    ],
    description: 'Kệ trang trí hình học thoáng sáng, phân chia không gian hiệu quả mà không làm cản tầm nhìn.'
  }
];

export function getStoredCustomProducts(): Record<string, Partial<GalleryProduct>> {
  return SafeStorage.getJSON('monos_gallery_custom_products', {});
}

export function saveCustomProduct(updatedFields: Partial<GalleryProduct> & { id: string }): void {
  try {
    const current = getStoredCustomProducts();
    current[updatedFields.id] = {
      ...(current[updatedFields.id] || {}),
      ...updatedFields
    };
    SafeStorage.setJSON('monos_gallery_custom_products', current);
    syncDataToServer({ monos_gallery_custom_products: current });
  } catch (e) {
    console.error('Failed to save custom product', e);
  }
}

export function resetCustomProduct(productId: string): void {
  try {
    const current = getStoredCustomProducts();
    delete current[productId];
    SafeStorage.setJSON('monos_gallery_custom_products', current);
    syncDataToServer({ monos_gallery_custom_products: current });
  } catch (e) {
    console.error('Failed to reset custom product', e);
  }
}

export function getStoredAddedProducts(): Record<string, GalleryProduct[]> {
  return SafeStorage.getJSON('monos_gallery_added_products', {});
}

export function getStoredCustomSubcategories(serviceId: string): string[] {
  const all = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
  return all[serviceId] || [];
}

export function addCustomSubcategory(serviceId: string, categoryName: string): void {
  try {
    const clean = categoryName.trim();
    if (!clean) return;
    const all = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
    const existing = all[serviceId] || [];
    if (!existing.some(c => c.toLowerCase() === clean.toLowerCase())) {
      all[serviceId] = [...existing, clean];
      SafeStorage.setJSON('monos_gallery_custom_subcategories', all);
      syncDataToServer({ monos_gallery_custom_subcategories: all });
    }
  } catch (e) {
    console.error('Failed to add custom subcategory', e);
  }
}

export function getStoredCategoryRenames(serviceId?: string): Record<string, string> {
  const all = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_renames', {});
  return serviceId ? (all[serviceId] || {}) : (all as any);
}

export function getStoredCategoryCovers(serviceId?: string): Record<string, string> {
  const all = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
  return serviceId ? (all[serviceId] || {}) : (all as any);
}

export function setStoredCategoryCover(serviceId: string, categoryName: string, coverImageUrl: string): void {
  try {
    const clean = categoryName.trim().toLowerCase();
    if (!clean || !coverImageUrl) return;
    const all = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
    if (!all[serviceId]) {
      all[serviceId] = {};
    }
    all[serviceId][clean] = coverImageUrl;
    SafeStorage.setJSON('monos_gallery_category_covers', all);
    syncDataToServer({ monos_gallery_category_covers: all });
  } catch (e) {
    console.error('Failed to set stored category cover', e);
  }
}

export function getStoredDeletedProductIds(serviceId?: string): string[] | Record<string, string[]> {
  const all = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
  return serviceId ? (all[serviceId] || []) : (all as any);
}

export function getStoredDeletedCategories(serviceId?: string): string[] | Record<string, string[]> {
  const all = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_categories', {});
  return serviceId ? (all[serviceId] || []) : (all as any);
}

export function deleteCustomSubcategory(serviceId: string, categoryName: string): void {
  try {
    const clean = categoryName.trim().toLowerCase();
    if (!clean) return;
    
    // 1. Remove from custom subcategories list (both for this serviceId and any other serviceId matching this category)
    const all = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
    Object.keys(all).forEach(sId => {
      if (Array.isArray(all[sId])) {
        all[sId] = all[sId].filter(c => c.trim().toLowerCase() !== clean);
      }
    });
    SafeStorage.setJSON('monos_gallery_custom_subcategories', all);

    // 2. Add to deleted categories list for this service
    const allDeleted = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_categories', {});
    const existingDeleted = allDeleted[serviceId] || [];
    if (!existingDeleted.includes(clean)) {
      allDeleted[serviceId] = [...existingDeleted, clean];
      SafeStorage.setJSON('monos_deleted_categories', allDeleted);
    }

    // 3. Remove from category renames
    const allRenames = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_renames', {});
    if (allRenames[serviceId]) {
      delete allRenames[serviceId][clean];
      SafeStorage.setJSON('monos_gallery_category_renames', allRenames);
    }

    // 4. Remove from category covers
    const allCovers = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
    if (allCovers[serviceId]) {
      delete allCovers[serviceId][clean];
      SafeStorage.setJSON('monos_gallery_category_covers', allCovers);
    }

    // 5. Delete all added products under this category across all service buckets
    const addedMap = getStoredAddedProducts();
    Object.keys(addedMap).forEach(sId => {
      if (Array.isArray(addedMap[sId])) {
        addedMap[sId] = addedMap[sId].filter(p => (p.categoryName || '').trim().toLowerCase() !== clean);
      }
    });
    SafeStorage.setJSON('monos_gallery_added_products', addedMap);

    // 6. Also mark any default / base products matching this category as deleted
    const allDeletedIds = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
    const existingDeletedIds = new Set(allDeletedIds[serviceId] || []);
    
    // Check base products in default list
    const baseProds = CATEGORY_PRODUCTS[serviceId] || DEFAULT_CATEGORY_PRODUCTS;
    baseProds.forEach(p => {
      if ((p.categoryName || '').trim().toLowerCase() === clean) {
        existingDeletedIds.add(p.id);
      }
    });
    allDeletedIds[serviceId] = Array.from(existingDeletedIds);
    SafeStorage.setJSON('monos_deleted_product_ids', allDeletedIds);

    // 7. Clean up custom overrides
    const customOverrides = getStoredCustomProducts();
    let overridesChanged = false;
    Object.keys(customOverrides).forEach(id => {
      if (customOverrides[id]?.categoryName && customOverrides[id].categoryName!.trim().toLowerCase() === clean) {
        delete customOverrides[id];
        overridesChanged = true;
      }
    });
    if (overridesChanged) {
      SafeStorage.setJSON('monos_gallery_custom_products', customOverrides);
    }

    syncDataToServer({ 
      monos_gallery_custom_subcategories: all,
      monos_deleted_categories: allDeleted,
      monos_gallery_category_renames: allRenames,
      monos_gallery_category_covers: allCovers,
      monos_gallery_added_products: addedMap,
      monos_deleted_product_ids: allDeletedIds,
      monos_gallery_custom_products: customOverrides
    });
  } catch (e) {
    console.error('Failed to delete custom subcategory', e);
  }
}

export function renameCategory(serviceId: string, oldCategoryName: string, newCategoryName: string): void {
  try {
    const oldClean = oldCategoryName.trim();
    const newClean = newCategoryName.trim();
    if (!oldClean || !newClean || oldClean === newClean) return;

    // 1. Update in category renames mapping for this serviceId
    const allRenames = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_renames', {});
    if (!allRenames[serviceId]) {
      allRenames[serviceId] = {};
    }
    allRenames[serviceId][oldClean.toLowerCase()] = newClean;
    SafeStorage.setJSON('monos_gallery_category_renames', allRenames);

    // 2. Update custom subcategories list
    const allCats = SafeStorage.getJSON<Record<string, string[]>>('monos_gallery_custom_subcategories', {});
    const existingCats = allCats[serviceId] || [];
    
    let foundInCustom = false;
    const updatedCats = existingCats.map(c => {
      if (c.trim().toLowerCase() === oldClean.toLowerCase()) {
        foundInCustom = true;
        return newClean;
      }
      return c;
    });

    if (!foundInCustom) {
      updatedCats.push(newClean);
    }
    
    // De-duplicate case-insensitively keeping the newest name
    const uniqueMap = new Map<string, string>();
    updatedCats.forEach(c => {
      if (c.trim()) {
        uniqueMap.set(c.trim().toLowerCase(), c.trim());
      }
    });
    allCats[serviceId] = Array.from(uniqueMap.values());
    SafeStorage.setJSON('monos_gallery_custom_subcategories', allCats);

    // 3. Update all added products in this service/category
    const addedProductsMap = getStoredAddedProducts();
    let addedUpdated = false;
    Object.keys(addedProductsMap).forEach(catId => {
      if (Array.isArray(addedProductsMap[catId])) {
        addedProductsMap[catId] = addedProductsMap[catId].map(p => {
          if (p.categoryName && p.categoryName.trim().toLowerCase() === oldClean.toLowerCase()) {
            addedUpdated = true;
            return { ...p, categoryName: newClean };
          }
          return p;
        });
      }
    });
    if (addedUpdated) {
      SafeStorage.setJSON('monos_gallery_added_products', addedProductsMap);
    }

    // 4. Update base & override products
    const customOverrides = getStoredCustomProducts();
    const allProducts = getProductsForCategory(serviceId);
    let overridesUpdated = false;

    // Check all product overrides
    Object.keys(customOverrides).forEach(id => {
      if (customOverrides[id]?.categoryName && customOverrides[id].categoryName!.trim().toLowerCase() === oldClean.toLowerCase()) {
        customOverrides[id].categoryName = newClean;
        overridesUpdated = true;
      }
    });

    // Check all products for this category
    allProducts.forEach(p => {
      const currentCat = (p.categoryName || '').trim();
      if (currentCat.toLowerCase() === oldClean.toLowerCase()) {
        customOverrides[p.id] = {
          ...(customOverrides[p.id] || {}),
          id: p.id,
          categoryName: newClean
        };
        overridesUpdated = true;
      }
    });

    if (overridesUpdated) {
      SafeStorage.setJSON('monos_gallery_custom_products', customOverrides);
    }

    // 5. Update category cover mapping
    const allCovers = SafeStorage.getJSON<Record<string, Record<string, string>>>('monos_gallery_category_covers', {});
    if (allCovers[serviceId] && allCovers[serviceId][oldClean.toLowerCase()]) {
      const coverUrl = allCovers[serviceId][oldClean.toLowerCase()];
      delete allCovers[serviceId][oldClean.toLowerCase()];
      allCovers[serviceId][newClean.toLowerCase()] = coverUrl;
      SafeStorage.setJSON('monos_gallery_category_covers', allCovers);
    }

    syncDataToServer({
      monos_gallery_category_renames: allRenames,
      monos_gallery_custom_subcategories: allCats,
      monos_gallery_added_products: addedProductsMap,
      monos_gallery_custom_products: customOverrides,
      monos_gallery_category_covers: allCovers
    });
  } catch (e) {
    console.error('Failed to rename category', e);
  }
}

export function addNewProductToCategory(categoryId: string, product: GalleryProduct): void {
  try {
    const current = getStoredAddedProducts();
    if (!current[categoryId]) {
      current[categoryId] = [];
    }
    current[categoryId].unshift(product);
    SafeStorage.setJSON('monos_gallery_added_products', current);
    syncDataToServer({ monos_gallery_added_products: current });
  } catch (e) {
    console.error('Failed to add new product', e);
  }
}

export function addMultipleProductsToCategory(categoryId: string, products: GalleryProduct[]): void {
  try {
    if (!products || products.length === 0) return;
    const current = getStoredAddedProducts();
    if (!current[categoryId]) {
      current[categoryId] = [];
    }
    current[categoryId].unshift(...products);
    SafeStorage.setJSON('monos_gallery_added_products', current);
    syncDataToServer({ monos_gallery_added_products: current });
  } catch (e) {
    console.error('Failed to add multiple products', e);
  }
}

export function deleteProductFromCategory(categoryId: string, productId: string): void {
  try {
    // 1. Remove from added products
    const current = getStoredAddedProducts();
    if (current[categoryId]) {
      current[categoryId] = current[categoryId].filter(p => p.id !== productId);
      SafeStorage.setJSON('monos_gallery_added_products', current);
    }

    // 2. Add to deleted product IDs set for this category/service
    const allDeleted = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
    const list = allDeleted[categoryId] || [];
    if (!list.includes(productId)) {
      allDeleted[categoryId] = [...list, productId];
      SafeStorage.setJSON('monos_deleted_product_ids', allDeleted);
    }

    // 3. Remove from custom product overrides
    const customOverrides = getStoredCustomProducts();
    if (customOverrides[productId]) {
      delete customOverrides[productId];
      SafeStorage.setJSON('monos_gallery_custom_products', customOverrides);
    }

    syncDataToServer({ 
      monos_gallery_added_products: current,
      monos_deleted_product_ids: allDeleted,
      monos_gallery_custom_products: customOverrides
    });
  } catch (e) {
    console.error('Failed to delete product', e);
  }
}

// Helper to reset and restore all default catalog and subcategories
export function restoreDefaultCatalog(serviceId?: string): void {
  try {
    const allDeletedIds = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_product_ids', {});
    const allDeletedCats = SafeStorage.getJSON<Record<string, string[]>>('monos_deleted_categories', {});
    
    if (serviceId) {
      delete allDeletedIds[serviceId];
      delete allDeletedCats[serviceId];
    } else {
      SafeStorage.setJSON('monos_deleted_product_ids', {});
      SafeStorage.setJSON('monos_deleted_categories', {});
    }
    
    SafeStorage.setJSON('monos_deleted_product_ids', allDeletedIds);
    SafeStorage.setJSON('monos_deleted_categories', allDeletedCats);
    
    syncDataToServer({
      monos_deleted_product_ids: allDeletedIds,
      monos_deleted_categories: allDeletedCats
    });
  } catch (e) {
    console.error('Failed to restore default catalog', e);
  }
}

export function getProductsForCategory(categoryId: string): GalleryProduct[] {
  let baseProducts: GalleryProduct[] = [];

  // If specific list exists in map, return it (even if empty)
  if (categoryId in CATEGORY_PRODUCTS) {
    baseProducts = [...CATEGORY_PRODUCTS[categoryId]];
  } else {
    // Check prefix match or generate contextual items
    const found = Object.keys(CATEGORY_PRODUCTS).find(k => k !== categoryId && (categoryId.includes(k) || k.includes(categoryId)));
    if (found && CATEGORY_PRODUCTS[found] && CATEGORY_PRODUCTS[found].length > 0) {
      baseProducts = [...CATEGORY_PRODUCTS[found]];
    } else {
      baseProducts = [...DEFAULT_CATEGORY_PRODUCTS];
    }
  }

  // Prepend newly added products for this category and deduplicate with baseProducts
  const addedProductsMap = getStoredAddedProducts();
  const addedForThisCategory = addedProductsMap[categoryId] || [];
  const addedIds = new Set(addedForThisCategory.map(p => p.id));
  const deduplicatedBase = baseProducts.filter(p => !addedIds.has(p.id));
  const combined = [...addedForThisCategory, ...deduplicatedBase].filter(
    p => p.id !== 'obm-bon01' && !p.thumbnail?.includes('1505693314120-0d443867891c')
  );

  // Deleted product IDs and deleted categories
  const deletedIds = getStoredDeletedProductIds(categoryId) as unknown as string[];
  const deletedIdsSet = new Set(Array.isArray(deletedIds) ? deletedIds : []);
  
  const deletedCats = getStoredDeletedCategories(categoryId) as unknown as string[];
  const deletedCatsSet = new Set(Array.isArray(deletedCats) ? deletedCats.map(c => c.toLowerCase()) : []);

  // Filter out deleted products
  const activeProducts = combined.filter(p => !deletedIdsSet.has(p.id));

  // Merge with custom edited products in localStorage & renames
  const customOverrides = getStoredCustomProducts();
  const categoryRenames = getStoredCategoryRenames(categoryId) || {};

  return activeProducts.map(p => {
    let current = p;
    if (customOverrides[p.id]) {
      current = {
        ...p,
        ...customOverrides[p.id]
      };
    }
    const catLower = (current.categoryName || '').trim().toLowerCase();
    if (catLower && categoryRenames[catLower]) {
      current = {
        ...current,
        categoryName: categoryRenames[catLower]
      };
    }
    return current;
  }).filter(p => {
    const catLower = (p.categoryName || '').trim().toLowerCase();
    return !deletedCatsSet.has(catLower);
  });
}


