/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service, Company } from './types';
import { syncDataToServer } from './lib/storageSync';
import { SafeStorage } from './lib/safeStorage';

export const SERVICES: Service[] = [
  {
    id: 'design-rnd-center',
    name: 'Design - Rnd Center',
    description: 'Kế hoạch xây dựng Trung tâm R&D nội thất theo mô hình doanh nghiệp làm chủ đầu tư, tập trung làm chủ công nghệ và thương mại hóa sản phẩm.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'dự án',
    minimum: 1,
    step: 1,
    type: 'package',
    details: {
      overview: 'Xây dựng hệ sinh thái R&D tập trung vào việc biến ý tưởng thành sản phẩm thương mại, làm chủ thiết kế, vật liệu và quy trình sản xuất tối ưu.',
      items: [
        'Xác lập định hướng & Nghiên cứu tiền khả thi (0-5 tháng).',
        'Thiết kế mô hình & Thí điểm nhóm R&D nhỏ (5-14 tháng).',
        'Đầu tư cơ sở chính & Vận hành trung tâm (12-24 tháng).',
        'Mở rộng dịch vụ & Trưởng thành thương mại hóa (24-60 tháng).',
        'Xây dựng các khu chức năng: Xưởng prototype, Lab thử nghiệm, Thư viện vật liệu.',
        'Đào tạo đội ngũ nhân sự R&D chuyên trách (10-15 người).'
      ],
      outcomes: [
        'Mô hình trung tâm R&D vận hành hiệu quả (Nội bộ hoặc Mở).',
        'Lộ trình xây dựng và phát triển chi tiết trong 5 năm.',
        'Danh mục dự án thí điểm và chỉ tiêu tăng trưởng cụ thể.',
        'Làm chủ tài sản trí tuệ và năng lực cạnh tranh cốt lõi.'
      ]
    }
  },
  {
    id: '3d-interactive',
    name: '3D Interactive Sales',
    description: 'Giải pháp bán hàng sử dụng không gian và mô hình 3D để khách hàng trực tiếp khám phá, bố trí và tùy chỉnh sản phẩm nội thất trong bối cảnh thực tế.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'model',
    type: 'package',
    details: {
      overview: '3D Interactive Sales là giải pháp bán hàng sử dụng không gian và mô hình 3D để khách hàng trực tiếp khám phá, bố trí và tùy chỉnh sản phẩm nội thất trong bối cảnh thực tế. Giúp chuyển đổi từ "Bán từng sản phẩm nội thất" sang "Bán trọn vẹn giải pháp không gian sống".',
      items: [
        'Chọn không gian như phòng khách, phòng ngủ, phòng ăn.',
        'Kéo thả sản phẩm furniture vào không gian.',
        'Tùy chỉnh màu sắc, vật liệu, kích thước và kiểu dáng.',
        'Xem sản phẩm từ nhiều góc độ 360° & AR.',
        'Lưu lại thiết kế và nhận báo giá tự động.',
        'Gửi yêu cầu tư vấn hoặc đặt hàng.'
      ],
      outcomes: [
        'Tăng khả năng hình dung: khách hàng thấy sản phẩm trong không gian thực tế.',
        'Cá nhân hóa trải nghiệm: khách hàng tự thiết kế theo nhu cầu và sở thích.',
        'Tăng sự tự tin khi mua: giảm lo ngại về màu sắc, kích thước và sự phù hợp.',
        'Rút ngắn thời gian tư vấn: nhân viên dễ trình bày sản phẩm và phương án phối hợp.',
        'Tăng giá trị đơn hàng: bán theo bộ, theo phòng hoặc theo toàn bộ không gian.',
        'Tự động hóa quy trình bán hàng: từ lựa chọn, cấu hình đến báo giá và đặt hàng.',
        'Tạo lợi thế cạnh tranh: mang đến trải nghiệm mua sắm hiện đại và khác biệt.'
      ]
    }
  },
  {
    id: 'brand-design',
    name: 'Brand Design',
    description: 'Scope tạo dựng thương hiệu nội thất: 8 nhóm công việc (Nghiên cứu & định hướng, Nền tảng, Đặt tên, Nhận diện, Định hướng thiết kế sản phẩm, Bao bì & trải nghiệm, Điểm chạm thương hiệu, Kế hoạch ra mắt) chia thành 3 cấp độ (Cơ bản, Tiêu chuẩn, Toàn diện).',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'brand',
    type: 'package',
    details: {
      overview: 'Quy trình chuẩn mực 8 nhóm công việc xây dựng thương hiệu nội thất hoàn chỉnh, chia theo 3 cấp độ triển khai (Cơ bản, Tiêu chuẩn, Toàn diện).',
      items: [
        '1. Nghiên cứu và định hướng thương hiệu: Phân tích thị trường nội thất; Nghiên cứu đối thủ và khoảng trống thị trường; Xác định khách hàng mục tiêu; Phân tích xu hướng thiết kế, vật liệu và lối sống; Xác định phân khúc giá; Xây dựng định vị thương hiệu; Xác định lợi thế cạnh tranh và điểm khác biệt (Deliverables: Brand strategy, customer profile, positioning statement, brand direction).',
        '2. Xây dựng nền tảng thương hiệu: Tầm nhìn, sứ mệnh, giá trị cốt lõi; Tính cách thương hiệu; Lời hứa thương hiệu; Câu chuyện thương hiệu; Slogan hoặc tagline; Giọng điệu giao tiếp; Kiến trúc thương hiệu nếu có nhiều dòng sản phẩm (Deliverables: Brand platform và messaging framework).',
        '3. Đặt tên thương hiệu: Xây dựng tiêu chí đặt tên; Phát triển danh sách tên; Kiểm tra ý nghĩa, cách phát âm và khả năng mở rộng; Kiểm tra sơ bộ tên miền và mạng xã hội; Kiểm tra khả năng đăng ký nhãn hiệu (Deliverables: Tên thương hiệu chính, tên dòng sản phẩm, rationale của tên. Lưu ý: kiểm tra pháp lý chuyên sâu và đăng ký nhãn hiệu thường là hạng mục riêng).',
        '4. Thiết kế nhận diện thương hiệu: Logo và hệ thống logo; Quy chuẩn màu sắc; Typography; Hệ thống layout; Họa tiết, đường nét và graphic elements; Phong cách hình ảnh; Phong cách minh họa hoặc icon; Quy tắc sử dụng trên nền sáng, tối và các chất liệu khác nhau (Deliverables: Brand identity system và brand guideline).',
        '5. Định hướng thiết kế sản phẩm: Xây dựng design language cho furniture; Định hướng hình dáng, tỷ lệ và chi tiết; Lựa chọn vật liệu và hoàn thiện bề mặt; Định hướng màu sắc sản phẩm; Thiết kế collection hoặc product family; Xây dựng tên và mã sản phẩm; Phối hợp với designer/kỹ sư để phát triển prototype; Kiểm tra tính công năng, độ bền và khả năng sản xuất (Deliverables: Product design direction, collection concept, material board, prototype hoặc bản vẽ kỹ thuật. Phần chế tạo khuôn, kỹ thuật sản xuất, chứng nhận an toàn và kiểm định chất lượng có thể cần đội ngũ riêng).',
        '6. Thiết kế bao bì và trải nghiệm sản phẩm: Bao bì vận chuyển; Tem nhãn, tag sản phẩm; Hướng dẫn lắp ráp và bảo quản; Thẻ bảo hành; Certificate hoặc product story card; Thiết kế trải nghiệm mở hộp; Quy chuẩn đóng gói cho hàng cồng kềnh (Deliverables: Packaging system và các file artwork sản xuất).',
        '7. Thiết kế các điểm chạm thương hiệu: Website hoặc e-commerce; Catalog và lookbook; Social media template; Profile công ty; Name card, email signature; Signage showroom; Đồng phục hoặc vật phẩm thương hiệu; POSM, brochure và bảng thông tin sản phẩm; Nội dung mô tả sản phẩm (Deliverables: Digital guideline, sales materials, showroom materials và content framework).',
        '8. Kế hoạch ra mắt thương hiệu: Chiến lược launch; Concept và key visual cho bộ sưu tập đầu tiên; Kế hoạch chụp ảnh sản phẩm; Nội dung truyền thông; Kế hoạch social media; PR, KOL/KOC hoặc influencer; Sự kiện ra mắt/showroom opening; Kế hoạch bán hàng và phân phối; Bộ tài liệu dành cho đại lý hoặc đối tác (Deliverables: Launch concept, campaign direction, content plan và sales toolkit).'
      ],
      outcomes: [
        'Cơ bản: Nghiên cứu, định vị, đặt tên, logo và bộ nhận diện cơ bản.',
        'Tiêu chuẩn: Bao gồm toàn bộ phần cơ bản, cộng thêm chiến lược sản phẩm, bao bì, website, catalog và bộ nhận diện showroom.',
        'Toàn diện: Bao gồm chiến lược thương hiệu, phát triển collection, prototype, sản xuất, launch campaign, nội dung, showroom và triển khai thương mại.'
      ]
    }
  },
  {
    id: 'brand-marketing',
    name: 'Brand Marketing (AI Marketing Hub)',
    description: 'AI Brand & Product Marketing Hub – Nền tảng quản trị thương hiệu, nội dung đa kênh, quảng cáo và đo lường hiệu quả tập trung.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'brand',
    type: 'package',
    details: {
      overview: 'AI Brand & Product Marketing Hub là nền tảng quản lý marketing tập trung, giúp doanh nghiệp quản lý thương hiệu, sản phẩm, nội dung, website, mạng xã hội, email, quảng cáo và hiệu quả kinh doanh trên một hệ thống duy nhất.',
      items: [
        '1. Quản lý thương hiệu: Brand guideline, Logo, màu sắc, font, Tone of Voice, Core Message, Brand Lexicon & Template tài sản.',
        '2. Quản lý sản phẩm: SKU, giá, danh mục, thông số kỹ thuật, hình ảnh/video 3D, đối tượng mục tiêu, SEO & chính sách khuyến mãi.',
        '3. AI lập kế hoạch marketing: Gợi ý mục tiêu campaign, xây dựng Content Pillars, lập lịch nội dung, đề xuất kênh truyền thông & ngân sách.',
        '4. AI tạo nội dung: Bài viết Blog SEO, Caption Social, Kịch bản Video, Banner, Email Marketing & Ad Copy chuyển đổi đa định dạng.',
        '5. Quản lý và xuất bản: Content Calendar, quy trình duyệt nội bộ, tự động đăng Website, Facebook, TikTok, Instagram & Email.',
        '6. Quản lý quảng cáo: Thiết lập campaign, kết nối Meta Ads, Google Ads, TikTok Ads, cảnh báo hiệu quả & đề xuất ngân sách.',
        '7. Quản lý khách hàng: CRM & Lead Nurturing, phân nhóm khách hàng, theo dõi Customer Journey & AI chấm điểm Lead.',
        '8. Đo lường và tối ưu: Dashboard hợp nhất (Reach, CTR, CPL, CAC, ROAS), AI giải thích biến động & đề xuất hành động tối ưu.',
        '9. Quản trị hệ thống: Phân quyền vai trò, Audit Trail, kiểm duyệt Brand Safety, kiểm tra bản quyền & phê duyệt 2 lớp riêng biệt.'
      ],
      outcomes: [
        'Hệ thống AI Brand & Product Marketing Hub hoàn chỉnh vận hành trên một nền tảng tập trung duy nhất.',
        'Quy trình khép kín 8 bước: Từ nạp dữ liệu, AI lập kế hoạch, sinh content đa kênh đến duyệt, xuất bản và kích hoạt Paid Ads.',
        'Cơ chế phê duyệt con người 2 lớp (Human-in-the-loop) bảo đảm an toàn thương hiệu và kiểm soát ngân sách.',
        'Dashboard đo lường thời gian thực hợp nhất đa kênh cùng AI Insights tối ưu hóa ROAS liên tục.'
      ]
    }
  },
  {
    id: 'monosbase',
    name: 'Monosbase',
    description: 'Lõi chuẩn hóa dữ liệu và điều phối vòng đời sản phẩm (Furniture Product Data OS).',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    image: 'https://i.postimg.cc/VkKrCnNM/2.png',
    footerImage: 'https://i.postimg.cc/kGPBmyjq/3.png',
    details: {
      overview: 'Monosbase là Furniture Product Data OS — lõi chuẩn hóa dữ liệu và điều phối vòng đời sản phẩm cho doanh nghiệp nội thất cao cấp. Cung cấp một nguồn dữ liệu sản phẩm chuẩn duy nhất (Single Source of Truth) để ERP, CRM, 3D Engine, Sales, nhà máy và các bộ phận nội bộ cùng sử dụng.',
      items: [
        '01. Lõi Quản trị Dữ liệu Sản phẩm (Furniture PIM & Master Data Engine) - Chuẩn hóa SKU, thông số, 3D assets và quy cách đóng gói.',
        '02. Điều phối Vòng đời Sản phẩm & Duyệt mẫu (R&D & Spec Lifecycle PLM) - Quản trị từ Ý tưởng, CAD, Prototype đến kiểm định QC/BIFMA.',
        '03. Ma trận Vật liệu & Quản lý Định mức (Dynamic Material Matrix & BOM) - Thư viện vật tư số hóa kết nối BOM động và dự toán giá vốn.',
        '04. Cổng Kết nối B2B & Điều phối Đơn hàng (B2B RFQ, Quotation, SO & WO Pipeline) - Tự động hóa tạo báo giá, đơn hàng SO và lệnh sản xuất WO.',
        '05. Trung tâm Phân tích Chi phí P&L & Tích hợp ERP/CRM (P&L Analytics & Universal Sync Hub) - Theo dõi P&L thời gian thực, đồng bộ hai chiều.'
      ],
      outcomes: [
        'Một nguồn dữ liệu trung thực duy nhất (Single Source of Truth) cho toàn doanh nghiệp.',
        'Tự động hóa luồng thông tin liên phòng ban giữa Thiết kế, R&D, Bán hàng và Nhà máy.',
        'Loại bỏ 100% rủi ro sản xuất sai phiên bản và thất thoát giá vốn do dữ liệu rời rạc.',
        'Sẵn sàng tích hợp và đồng bộ hai chiều mượt mà với hệ thống ERP kho vận và CRM khách hàng.'
      ]
    }
  },
  {
    id: 'furniture-development',
    name: 'Furniture Design',
    description: 'Quy trình thiết kế và R&D sản phẩm nội thất chuyên sâu: Từ nghiên cứu thị trường, phát triển concept, R&D vật liệu đến tối ưu sản xuất và bàn giao hồ sơ kỹ thuật.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'collection',
    type: 'package',
    details: {
      overview: 'Trong ngành furniture, scope của Thiết kế phát triển sản phẩm và R&D bao gồm 9 nhóm công việc cốt lõi, đảm bảo sản phẩm đạt chuẩn thẩm mỹ, công năng và tối ưu chi phí sản xuất.',
      items: [
        '1. Nghiên cứu nhu cầu và định hướng sản phẩm (Thị trường, xu hướng, ergonomics).',
        '2. Thiết kế sản phẩm (Concept, 3D/CAD, Product Specification).',
        '3. R&D vật liệu và cấu tạo (Gỗ, kim loại, tối ưu tháo lắp, bền vững).',
        '4. Phát triển nguyên mẫu (Mock-up, Prototype, Golden sample).',
        '5. Kiểm tra và thử nghiệm (Độ bền, chịu tải, an toàn, tiêu chuẩn xuất khẩu).',
        '6. Tối ưu chi phí và khả năng sản xuất (Value engineering, BOM, DFM/DFA).',
        '7. Phát triển quy trình sản xuất (Hướng dẫn sản xuất, QC checklist, pilot production).',
        '8. Hồ sơ kỹ thuật và bàn giao (Bản vẽ 2D/3D, BOM, Assembly instruction).',
        '9. Bao bì, logistics và tính bền vững (Flat-pack, tối ưu vận chuyển, chứng nhận FSC/hóa chất).'
      ],
      outcomes: [
        'Bộ hồ sơ kỹ thuật sản xuất hoàn chỉnh (2D, 3D, BOM, Assembly Manual).',
        'Sản phẩm mẫu (Golden Sample) đạt chuẩn chất lượng và thẩm mỹ.',
        'Quy trình sản xuất và tiêu chuẩn kiểm soát chất lượng (QC Checklist).',
        'Giải pháp tối ưu giá vốn (Target Costing) và bao bì đóng gói.'
      ]
    }
  },
  {
    id: 'eca-home-office',
    name: 'Home Office',
    description: 'Bàn ghế, kệ sách làm việc tại nhà phân khúc đại chúng.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'Laptop'
  },
  {
    id: 'eca-home-fitness',
    name: 'Home Fitness',
    description: 'Thiết bị và nội thất tập luyện tại nhà.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'Dumbbell'
  },
  {
    id: 'eca-wood-outdoor',
    name: 'Wood Outdoor',
    description: 'Nội thất gỗ ngoài trời phân khúc phổ thông.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'TreePine'
  },
  {
    id: 'eca-metal-outdoor',
    name: 'Metal Outdoor',
    description: 'Nội thất kim loại ngoài trời phổ thông.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'Hammer'
  },
  {
    id: 'eca-concrete-outdoor',
    name: 'Concrete Outdoor',
    description: 'Sản phẩm bê tông nhẹ ngoài trời.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'Mountain'
  },
  {
    id: 'eca-upholstery',
    name: 'Upholstery',
    description: 'Sofa và đồ bọc nệm mass market.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce A - Mass Market',
    icon: 'Armchair'
  },
  {
    id: 'ecb-son-mai',
    name: 'Furniture sơn mài',
    description: 'Sản phẩm sơn mài cao cấp giới hạn.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Palette'
  },
  {
    id: 'ecb-resin',
    name: 'Bàn ăn Resin',
    description: 'Nội thất Resin nghệ thuật độc bản.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Waves'
  },
  {
    id: 'ecb-lamp',
    name: 'Lamp',
    description: 'Hệ thống đèn trang trí cao cấp.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Lamp'
  },
  {
    id: 'ecb-living-set',
    name: 'Limited Living Set',
    description: 'Bộ sưu tập phòng khách giới hạn.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Sofa'
  },
  {
    id: 'ecb-carving',
    name: 'Đồ gỗ chạm khắc',
    description: 'Sản phẩm gỗ thủ công mỹ nghệ.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Flower2'
  },
  {
    id: 'ecb-concrete-outdoor',
    name: 'Đồ Outdoor bê tông',
    description: 'Sản phẩm bê tông outdoor cao cấp.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'Mountain'
  },
  {
    id: 'ecb-wood-outdoor',
    name: 'Đồ gỗ outdoor',
    description: 'Nội thất gỗ ngoài trời cao cấp.',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    note: 'Ecommerce B - Limited Collection',
    icon: 'TreePine'
  },
  {
    id: 'bot-team',
    name: 'AI Management Platform',
    description: 'Nền tảng điều hành doanh nghiệp nội thất tích hợp các trợ lý AI chuyên biệt (Một hệ thống AI — Bốn Bot).',
    price: 10000000,
    currency: 'VNĐ',
    type: 'package',
    image: 'https://i.postimg.cc/VkKrCnNM/2.png',
    footerImage: 'https://i.postimg.cc/kGPBmyjq/3.png',
    note: 'Phí token hàng tháng tùy dung lượng',
    details: {
      overview: 'Đây là nền tảng điều hành doanh nghiệp nội thất có tích hợp các trợ lý AI chuyên biệt. Nền tảng trung tâm kết nối dữ liệu và quy trình từ thiết kế, báo giá, mua nguyên vật liệu, sản xuất, giao hàng đến lắp đặt và chăm sóc khách hàng. Một nền tảng trung tâm – nhiều trợ lý AI – vận hành toàn bộ chuỗi giá trị nội thất.',
      items: [
        'Bot CE/CEO (Chiến lược & Nội bộ): Nắm tình hình, phân tích số liệu, cảnh báo rủi ro trễ đơn và hỗ trợ ra quyết định.',
        'Bot Team (Thực thi & Nội bộ): Giao việc, phối hợp liên phòng ban, tổng hợp checklist và theo dõi tiến độ.',
        'Bot Khách hàng (Thực thi & Bên ngoài): Tư vấn sản phẩm 24/7, gợi ý mẫu mã, kích thước, màu sắc và chuyển đổi lead.',
        'Bot Nhà cung cấp (Chiến lược & Bên ngoài): Gửi RFQ tự động, so sánh giá vật tư, đặt hàng và quản lý giao nhận.',
        '4 Cấp độ hoạt động AI: Hiểu yêu cầu -> Tra cứu dữ liệu -> Đề xuất phương án -> Thực thi (Tạo việc/Cập nhật).'
      ],
      outcomes: [
        'Một nền tảng trung tâm – nhiều trợ lý AI – vận hành toàn bộ chuỗi giá trị nội thất.',
        'Loại bỏ 100% rủi ro sai lệch dữ liệu do sử dụng rời rạc Excel, tin nhắn Zalo.',
        'Tiết kiệm 80% thời gian trao đổi nội bộ giữa Kinh doanh, Thiết kế, Mua hàng và Xưởng sản xuất.',
        'Nâng cao trải nghiệm khách hàng với trợ lý tư vấn nội thất tự động 24/7.'
      ]
    }
  },
  {
    id: 'b2b-dist-platform',
    name: 'B+Furniture',
    description: 'Giải pháp thiết kế và phát triển sản phẩm nội thất chuyên sâu.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'system',
    type: 'package',
    details: {
      overview: 'Hệ thống quản lý và phát triển các dòng sản phẩm nội thất tập trung, tối ưu hóa quy trình từ bản vẽ đến sản xuất.',
      items: [
        'Thư viện thiết kế nội thất độc quyền.',
        'Quản lý vòng đời sản phẩm nội thất.',
        'Tối ưu hóa vật liệu và định mức sản xuất.',
        'Kết nối trực tiếp với các đơn vị sản xuất Pillar B.',
        'Công cụ giả lập 3D cho sản phẩm nội thất.',
        'Hỗ trợ kỹ thuật chuyên sâu về đồ gỗ.'
      ],
      outcomes: [
        'Chuẩn hóa quy trình thiết kế nội thất.',
        'Giảm 30% thời gian từ ý tưởng đến mẫu thực tế.',
        'Đảm bảo chất lượng sản xuất đồng nhất.',
        'Tăng khả năng cạnh tranh cho dòng sản phẩm nội thất.'
      ]
    }
  },
  {
    id: 'b2b-showroom-kit',
    name: 'B+Outdoor',
    description: 'Giải pháp phát triển dòng sản phẩm ngoại thất và không gian ngoài trời.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'kit',
    type: 'package',
    details: {
      overview: 'Bộ giải pháp chuyên biệt cho các dòng sản phẩm outdoor, chú trọng vào vật liệu bền bỉ và thiết kế thích ứng môi trường.',
      items: [
        'Nghiên cứu vật liệu ngoài trời chuyên dụng.',
        'Thiết kế sản phẩm outdoor theo xu hướng toàn cầu.',
        'Quy trình kiểm định độ bền vật liệu ngoài trời.',
        'Tích hợp giải pháp không gian xanh và ngoại thất.',
        'Thư viện mẫu sản phẩm Outdoor đa dạng.',
        'Tư vấn sản xuất với các đối tác Pillar C.'
      ],
      outcomes: [
        'Mở rộng danh mục sản phẩm sang phân khúc Outdoor.',
        'Tối ưu hóa độ bền và tính thẩm mỹ cho sản phẩm.',
        'Dẫn đầu xu hướng thiết kế không gian ngoài trời.',
        'Kết nối hiệu quả chuỗi cung ứng vật liệu Outdoor.'
      ]
    }
  },
  {
    id: 'b2b-bon-solution',
    name: 'B+ON',
    description: 'Giải pháp furniture dành cho dòng Residential cao cấp.',
    price: 10000000,
    currency: 'VNĐ',
    unit: 'solution',
    type: 'package',
    details: {
      overview: 'Hệ thống thiết kế và cung ứng furniture cao cấp chuyên biệt cho phân khúc Residential (biệt thự, căn hộ cao cấp, penthouse), kết hợp tinh tế giữa vật liệu tuyển chọn và nghệ thuật tạo dáng đương đại.',
      items: [
        'Bộ sưu tập furniture độc bản cho không gian Residential cao cấp.',
        'Tùy biến tinh xảo vật liệu CMF, da, vải và hoàn thiện bề mặt cao cấp.',
        'Thiết kế chi tiết công năng phù hợp chuẩn mực sống thượng lưu.',
        'Quy trình sản xuất chuẩn mực và kiểm soát chất lượng nghiêm ngặt.',
        'Tư vấn đồng bộ phong cách nội thất tổng thể cho không gian sống.',
        'Dịch vụ giao lắp và bảo hành bảo dưỡng trọn gói tiêu chuẩn cao cấp.'
      ],
      outcomes: [
        'Nâng tầm giá trị thẩm mỹ và đẳng cấp cho không gian Residential.',
        'Đảm bảo sự đồng bộ hoàn hảo từ thiết kế đến chất lượng hoàn thiện.',
        'Tối ưu hóa công năng và tiện nghi sống đỉnh cao cho gia chủ.',
        'Khẳng định dấu ấn kiến trúc và phong cách sống độc bản.'
      ]
    }
  }
];

export const COMPANIES: Company[] = [
  {
    id: 'ntc',
    name: 'NTC',
    description: 'Chuyên sản xuất đồ gỗ',
    type: 'Pillar B',
    developedCategories: ['Home Office', 'Dining Furniture', 'Bedroom Sets'],
    ecommercePackages: ['eca-home-office', 'eca-upholstery'],
    suggestedServices: ['design-rnd-center', 'monosbase'],
    allowedServices: SERVICES.map(s => s.id),
    serviceOverrides: {
      'monosbase': { name: 'Monosbase NTC', price: 10000000, currency: 'VNĐ' }
    }
  },
  {
    id: 'an-hoa-phat',
    name: 'An Hòa Phát',
    description: 'Chuyên sản xuất outdoor',
    type: 'Pillar B',
    developedCategories: ['Wood Outdoor', 'Metal Outdoor', 'Rope Furniture'],
    ecommercePackages: ['eca-wood-outdoor', 'eca-metal-outdoor'],
    suggestedServices: ['3d-interactive', 'brand-design'],
    allowedServices: SERVICES.map(s => s.id),
  },
  {
    id: 'usofa',
    name: 'Usofa',
    description: 'Chuyên sản xuất sofa',
    type: 'Pillar B',
    developedCategories: ['Upholstery', 'Living Room Sets', 'Recliners'],
    ecommercePackages: ['eca-upholstery', 'ecb-living-set'],
    suggestedServices: ['brand-marketing', '3d-interactive'],
    allowedServices: SERVICES.map(s => s.id),
  },
  {
    id: 'kim-cuong',
    name: 'Kim Cương',
    description: 'Chuyên furniture sơn mài',
    type: 'Pillar B',
    developedCategories: ['Furniture sơn mài', 'Decor Items', 'Limited Gifts'],
    ecommercePackages: ['ecb-son-mai', 'ecb-carving'],
    suggestedServices: ['brand-design', '3d-interactive'],
    allowedServices: SERVICES.map(s => s.id),
  },
  {
    id: 'lava',
    name: 'Lava',
    description: 'Chuyên sản xuất poly',
    type: 'Pillar B',
    developedCategories: ['Concrete Outdoor', 'Poly Furniture', 'Planters'],
    ecommercePackages: ['eca-concrete-outdoor'],
    suggestedServices: ['design-rnd-center', 'monosbase'],
    allowedServices: SERVICES.map(s => s.id),
    serviceOverrides: {
      'monosbase': { name: 'Monosbase Lava', price: 10000000, currency: 'VNĐ' }
    },
  },
  {
    id: 'dm-steel',
    name: 'ĐM Steel',
    description: 'Chuyên sản xuất kim loại',
    type: 'Pillar B',
    developedCategories: ['Metal Furniture', 'Industrial Shelving', 'Metal Decor'],
    ecommercePackages: ['eca-metal-outdoor'],
    suggestedServices: ['design-rnd-center', 'monosbase'],
    allowedServices: SERVICES.map(s => s.id),
    serviceOverrides: {
      'monosbase': { name: 'Monosbase ĐMS', price: 10000000, currency: 'VNĐ' }
    },
  },
  {
    id: 'den-xinh',
    name: 'Đèn Xinh',
    description: 'Chuyên sản xuất đèn',
    type: 'Pillar B',
    developedCategories: ['Lamp', 'Lighting Fixtures', 'Custom Lights'],
    ecommercePackages: ['ecb-lamp'],
    suggestedServices: ['brand-design', '3d-interactive'],
    allowedServices: SERVICES.map(s => s.id),
  },
  {
    id: 'hoang-thong',
    name: 'Hoàng Thông',
    description: 'Chuyên sản xuất nội thất',
    type: 'Pillar B',
    developedCategories: ['Upholstery', 'Wood Furniture', 'Customized items'],
    ecommercePackages: ['eca-upholstery', 'ecb-wood-outdoor'],
    suggestedServices: ['design-rnd-center', 'brand-marketing'],
    allowedServices: SERVICES.map(s => s.id),
  },
  {
    id: 'nha-xinh',
    name: 'Nhà Xinh',
    description: 'Bán lẻ furniture',
    type: 'Retail',
    allowedServices: SERVICES.map(s => s.id),
    serviceOverrides: {
      'monosbase': { name: 'Monosbase NX', price: 10000000, currency: 'VNĐ' }
    }
  },
  {
    id: 'citifurniture',
    name: 'Citifurniture',
    description: 'Bán lẻ furniture',
    type: 'Retail',
    allowedServices: SERVICES.map(s => s.id),
    serviceOverrides: {
      'monosbase': { name: 'Monosbase Citi', price: 10000000, currency: 'VNĐ' }
    },
  },
  {
    id: 'hmd',
    name: 'HMD',
    description: 'Thương mại điện tử',
    type: 'Pillar C',
    developedCategories: ['Home Office', 'Kitchenware', 'Tech Gadgets'],
    ecommercePackages: ['eca-home-office'],
    suggestedServices: ['bot-team', 'brand-marketing'],
    allowedServices: SERVICES.map(s => s.id)
  }
];

export const USD_TO_VND = 25450;

// Storage helper for custom categories created by user
export function getStoredCustomCategories(): Service[] {
  return SafeStorage.getJSON('monos_custom_categories', []);
}

export function saveCustomCategory(category: Service): void {
  try {
    const current = getStoredCustomCategories();
    const existingIndex = current.findIndex(c => c.id === category.id);
    if (existingIndex >= 0) {
      current[existingIndex] = category;
    } else {
      current.push(category);
    }
    SafeStorage.setJSON('monos_custom_categories', current);
    syncDataToServer({ monos_custom_categories: current });
  } catch (e) {
    console.error('Failed to save custom category', e);
  }
}

export function deleteCustomCategory(categoryId: string): void {
  try {
    const current = getStoredCustomCategories();
    const filtered = current.filter(c => c.id !== categoryId);
    SafeStorage.setJSON('monos_custom_categories', filtered);
    syncDataToServer({ monos_custom_categories: filtered });
  } catch (e) {
    console.error('Failed to delete custom category', e);
  }
}
