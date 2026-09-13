/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Service } from '../types';
import { getProductsForCategory } from '../data/categoryProductsData';

export interface ScopeExportOptions {
  companyName?: string;
  customTitle?: string;
  customSubtitle?: string;
}

/**
 * Returns structured HTML content for any given service module
 */
export function getServiceScopeHtml(service: Service): { title: string; subtitle: string; bodyHtml: string } {
  let title = service.name;
  let subtitle = service.description || 'Quy chuẩn phạm vi triển khai dịch vụ, tiêu chuẩn kỹ thuật bàn giao và phân định trách nhiệm thực hiện.';
  let bodyHtml = '';

  // 1. FURNITURE DESIGN & R&D (furniture-development)
  if (service.id === 'furniture-development') {
    title = 'Thiết Kế & Phát Triển Sản Phẩm Nội Thất (Furniture Design & Product R&D)';
    subtitle = 'Quy chuẩn 9 nhóm công việc cốt lõi từ nghiên cứu thị trường, kiểu dáng CMF, kỹ thuật kết cấu, BOM đến bàn giao sản xuất hàng loạt.';
    bodyHtml = `
      <div class="section-title">1. TỔNG QUAN PHẠM VI 9 NHÓM CỐT LÕI (9 CORE R&D GROUPS)</div>
      <p class="section-intro">Scope công việc Thiết kế & R&D nội thất được cấu trúc theo 9 nhóm chuyên môn từ khảo sát thị trường đến bàn giao sản xuất hàng loạt:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 220px;">Hạng mục chuyên môn</th>
            <th>Phạm vi chi tiết & Nhiệm vụ triển khai</th>
            <th style="width: 200px;">Sản phẩm bàn giao (Deliverables)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Nghiên cứu nhu cầu & Định hướng sản phẩm</strong><div class="sub-en">Market Research & Persona</div></td>
            <td>
              <ul class="task-list">
                <li>Nghiên cứu thị trường, đối thủ, xu hướng nội thất quốc tế.</li>
                <li>Phân tích khách hàng mục tiêu, phân khúc giá và kênh bán hàng.</li>
                <li>Xác định concept, công năng, phong cách, kích thước và mức giá mục tiêu (Target Price).</li>
                <li>Tham khảo tiêu chuẩn thiết kế, ergonomics và yêu cầu an toàn sử dụng.</li>
              </ul>
            </td>
            <td><span class="tag">Báo cáo thị trường</span><br/><span class="tag">Product Brief</span><br/><span class="tag">Bản chuẩn Ergonomics</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Thiết kế sản phẩm & Dựng hình 3D</strong><div class="sub-en">Product Design, Styling & CMF</div></td>
            <td>
              <ul class="task-list">
                <li>Phát triển concept, phác thảo sketch, bảng cảm xúc moodboard.</li>
                <li>Thiết kế kiểu dáng, tỷ lệ, công năng và trải nghiệm sử dụng.</li>
                <li>Thiết kế màu sắc, vật liệu, bề mặt (CMF), upholstery và phụ kiện.</li>
                <li>Dựng 3D/CAD và xây dựng product specification chi tiết.</li>
              </ul>
            </td>
            <td><span class="tag">Concept Sketches</span><br/><span class="tag">3D CAD / Render</span><br/><span class="tag">Product Spec Sheet</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>R&D Vật liệu & Cấu tạo</strong><div class="sub-en">Materials & Joint Engineering</div></td>
            <td>
              <ul class="task-list">
                <li>Lựa chọn vật liệu chính: gỗ tự nhiên, gỗ công nghiệp, kim loại, đệm mút, vải/da, kính, đá.</li>
                <li>Nghiên cứu phụ kiện: bản lề, ray trượt, khớp nối, ốc cam, tay nắm.</li>
                <li>Thiết kế cấu tạo, liên kết, khả năng chịu lực và độ ổn định kết cấu.</li>
                <li>Tối ưu quy cách vật liệu để giảm hao hụt trong quá trình cưa cắt gia công.</li>
              </ul>
            </td>
            <td><span class="tag">Material Board</span><br/><span class="tag">Sơ đồ kết cấu liên kết</span><br/><span class="tag">Báo cáo tối ưu hao hụt</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Thiết kế cơ khí & Bản vẽ sản xuất</strong><div class="sub-en">Shop Drawings & Production CAD</div></td>
            <td>
              <ul class="task-list">
                <li>Bản vẽ 2D kỹ thuật tổng thể và các hình chiếu mặt cắt chi tiết.</li>
                <li>Bản vẽ chi tiết từng cấu kiện (part drawing) phục vụ gia công CNC.</li>
                <li>Bản vẽ lắp ráp (assembly drawing) và sơ đồ đánh số phụ kiện.</li>
                <li>Quy định dung sai, tiêu chuẩn hoàn thiện bề mặt và hướng dẫn gia công.</li>
              </ul>
            </td>
            <td><span class="tag">Shop Drawing 2D/3D</span><br/><span class="tag">Bản vẽ part CNC</span><br/><span class="tag">Assembly Drawing</span></td>
          </tr>
          <tr>
            <td class="center font-bold">05</td>
            <td><strong>BOM & Dự toán giá thành</strong><div class="sub-en">Bill of Materials & Costing</div></td>
            <td>
              <ul class="task-list">
                <li>Bóc tách danh mục vật tư chi tiết (BOM - Bill of Materials).</li>
                <li>Tính định mức nguyên vật liệu, phụ kiện, sơn phủ và vật tư phụ.</li>
                <li>Ước tính chi phí gia công, nhân công và chi phí hoàn thiện.</li>
                <li>Đề xuất phương án tối ưu giá thành (Value Engineering) phù hợp target cost.</li>
              </ul>
            </td>
            <td><span class="tag">Bảng BOM chi tiết</span><br/><span class="tag">Bảng phân tích Costing</span><br/><span class="tag">Đề xuất Value Engineering</span></td>
          </tr>
          <tr>
            <td class="center font-bold">06</td>
            <td><strong>Làm mẫu thử & Đánh giá (Prototype)</strong><div class="sub-en">Prototyping & Form Review</div></td>
            <td>
              <ul class="task-list">
                <li>Làm mockup kiểm tra tỷ lệ, kiểu dáng và ergonomics thực tế.</li>
                <li>Sản xuất mẫu prototype lần 1 để đánh giá cấu tạo, lắp ráp và thẩm mỹ.</li>
                <li>Kiểm tra độ êm, độ thoải mái, độ võng và độ vững chắc kết cấu.</li>
                <li>Ghi nhận lỗi, hiệu chỉnh bản vẽ và làm mẫu hoàn thiện (Golden Sample).</li>
              </ul>
            </td>
            <td><span class="tag">Mẫu Mockup tỷ lệ</span><br/><span class="tag">Biên bản đánh giá mẫu</span><br/><span class="tag">Golden Sample ký duyệt</span></td>
          </tr>
          <tr>
            <td class="center font-bold">07</td>
            <td><strong>Thiết kế bao bì & Đóng gói</strong><div class="sub-en">Packaging & Knock-Down (KD)</div></td>
            <td>
              <ul class="task-list">
                <li>Thiết kế phương án đóng gói: Knock-Down (KD) hoặc đóng gói nguyên khối (Assembled).</li>
                <li>Thiết kế thùng carton, xốp bảo vệ, chống sốc góc và màng bọc.</li>
                <li>Tối ưu kích thước đóng gói để tăng số lượng xếp cont (CBM Optimization).</li>
                <li>Soạn tài liệu hướng dẫn lắp ráp (Assembly Instruction - AI) và tem nhãn barcode.</li>
              </ul>
            </td>
            <td><span class="tag">Quy cách đóng gói CBM</span><br/><span class="tag">Tài liệu hướng dẫn AI</span><br/><span class="tag">Artwork tem thùng/barcode</span></td>
          </tr>
          <tr>
            <td class="center font-bold">08</td>
            <td><strong>Thử nghiệm & Tiêu chuẩn xuất khẩu</strong><div class="sub-en">Testing & Compliance Standards</div></td>
            <td>
              <ul class="task-list">
                <li>Kiểm tra độ bền kết cấu, khả năng chịu tải trọng và độ mỏi vật liệu.</li>
                <li>Thử nghiệm rơi thùng carton (Drop Test theo tiêu chuẩn ISTA).</li>
                <li>Đối chiếu tiêu chuẩn quốc tế: BIFMA (Mỹ), EN (Châu Âu), JIS (Nhật Bản).</li>
                <li>Kiểm tra hàm lượng phát thải Formaldehyde (CARB P2, EPA), chống cháy (TB117).</li>
              </ul>
            </td>
            <td><span class="tag">Báo cáo Test nội bộ</span><br/><span class="tag">Biên bản Drop Test ISTA</span><br/><span class="tag">Chứng nhận tiêu chuẩn</span></td>
          </tr>
          <tr>
            <td class="center font-bold">09</td>
            <td><strong>Bàn giao & Chuẩn bị sản xuất hàng loạt</strong><div class="sub-en">Handover & Mass Production SOP</div></td>
            <td>
              <ul class="task-list">
                <li>Bàn giao bộ tài liệu kỹ thuật hoàn chỉnh (Master Technical Package).</li>
                <li>Xây dựng quy trình lắp ráp, hướng dẫn kiểm tra chất lượng (QC Checklist).</li>
                <li>Thiết kế dưỡng, gá lắp (jigs & fixtures) nếu cần cho dây chuyền.</li>
                <li>Hỗ trợ kỹ thuật cho xưởng trong đợt chạy thử đầu tiên (Pilot Run).</li>
              </ul>
            </td>
            <td><span class="tag">Master Tech Package</span><br/><span class="tag">QC Checklist & SOP</span><br/><span class="tag">Bản vẽ Jig / Fixture</span></td>
          </tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 30px;">2. PHÂN ĐỊNH VAI TRÒ NHÂN SỰ CHUYÊN TRÁCH</div>
      <div class="role-grid">
        <div class="role-card">
          <div class="role-title">Product Designer (Nhà thiết kế sản phẩm)</div>
          <div class="role-desc">Chủ trì ý tưởng, kiểu dáng, tỷ lệ, thẩm mỹ, màu sắc, vật liệu (CMF) và trải nghiệm người dùng.</div>
        </div>
        <div class="role-card">
          <div class="role-title">R&D / Structural Engineer (Kỹ sư R&D)</div>
          <div class="role-desc">Chủ trì kết cấu, liên kết, bản vẽ kỹ thuật gia công, kiểm soát độ bền và tiêu chuẩn kỹ thuật xuất khẩu.</div>
        </div>
        <div class="role-card">
          <div class="role-title">Sample Maker / Prototyping (Thợ mẫu)</div>
          <div class="role-desc">Hiện thực hóa bản vẽ thành sản phẩm thực tế, kiểm tra tính khả thi gia công và lắp ráp tại xưởng.</div>
        </div>
        <div class="role-card">
          <div class="role-title">Costing & BOM Specialist (Chuyên viên định mức)</div>
          <div class="role-desc">Bóc tách vật tư, tính toán chi phí, phân tích hao hụt và đề xuất tối ưu hóa giá vốn.</div>
        </div>
      </div>
    `;
  }

  // 2. DESIGN & R&D CENTER (design-rnd-center)
  else if (service.id === 'design-rnd-center') {
    title = 'Kế Hoạch Xây Dựng Trung Tâm R&D Nội Thất (Design & R&D Center Plan)';
    subtitle = 'Lộ trình 7 giai đoạn triển khai và quy hoạch 7 phân khu chức năng (1.500 - 2.000 m²) chuẩn hóa năng lực tự chủ thiết kế.';
    bodyHtml = `
      <div class="section-title">1. LỘ TRÌNH 7 GIAI ĐOẠN XÂY DỰNG TRUNG TÂM R&D (ROADMAP)</div>
      <p class="section-intro">Kế hoạch kiến trúc và thiết lập Trung tâm R&D chuyên nghiệp theo mô hình chuẩn hóa doanh nghiệp nội thất:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 70px; text-align: center;">Giai đoạn</th>
            <th style="width: 180px;">Tên giai đoạn & Thời gian</th>
            <th>Nội dung công việc cốt lõi</th>
            <th style="width: 180px;">Sản phẩm bàn giao</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">STAGE 01</td>
            <td><strong>Chiến lược & Định hướng R&D</strong><div class="sub-en">Tháng 0–2</div></td>
            <td>Xác định mục tiêu cốt lõi, danh mục sản phẩm trọng tâm, phân khúc xuất khẩu, dự toán ngân sách Capex/Opex và chỉ định nhân sự chủ trì.</td>
            <td><span class="tag">Bản định hướng chiến lược</span><br/><span class="tag">Dự toán ngân sách</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 02</td>
            <td><strong>Mô hình & Quy hoạch 7 Phân khu</strong><div class="sub-en">Tháng 2–4</div></td>
            <td>Quy hoạch mặt bằng 1.500–2.000m² bao gồm: Studio thiết kế, Xưởng mẫu Prototype, Lab thử nghiệm độ bền, Thư viện CMF/Vật liệu, Phòng CAD/CAM, Showroom kỹ thuật, Văn phòng điều hành.</td>
            <td><span class="tag">Mặt bằng layout 2D/3D</span><br/><span class="tag">Quy hoạch phân khu</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 03</td>
            <td><strong>Cơ cấu Tổ chức & Tuyển dụng</strong><div class="sub-en">Tháng 3–6</div></td>
            <td>Xây dựng sơ đồ tổ chức, tuyển dụng 10–15 nhân sự chủ chốt (Giám đốc R&D, Lead Designer, Kỹ sư kết cấu, Chuyên viên BOM, Thợ mẫu tay nghề cao).</td>
            <td><span class="tag">Sơ đồ tổ chức JD/KPI</span><br/><span class="tag">Đội ngũ nòng cốt</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 04</td>
            <td><strong>Đầu tư Máy móc & Thiết bị</strong><div class="sub-en">Tháng 4–8</div></td>
            <td>Mua sắm và lắp đặt hệ thống máy móc xưởng mẫu: CNC 5 trục, máy cưa bàn trượt, máy dán cạnh, máy ép chân không, phòng sơn sấy, máy đo kiểm và in 3D công nghiệp.</td>
            <td><span class="tag">Danh mục máy móc</span><br/><span class="tag">Biên bản nghiệm thu lắp đặt</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 05</td>
            <td><strong>Xây dựng Quy trình & Phần mềm</strong><div class="sub-en">Tháng 6–10</div></td>
            <td>Số hóa quy trình vận hành SOP, triển khai hệ thống quản trị dữ liệu Monosbase, chuẩn hóa biểu mẫu BOM, thư viện linh kiện CAD và quy trình kiểm duyệt chất lượng.</td>
            <td><span class="tag">Bộ quy trình SOP</span><br/><span class="tag">Hệ thống Monosbase OS</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 06</td>
            <td><strong>Vận hành Thử nghiệm & Thí điểm</strong><div class="sub-en">Tháng 8–12</div></td>
            <td>Triển khai 2–3 bộ sưu tập (Collections) thí điểm, đánh giá thời gian ra mẫu, tỷ lệ sai hỏng và hiệu chỉnh sự phối hợp giữa R&D và Nhà máy sản xuất.</td>
            <td><span class="tag">2-3 Bộ sưu tập thí điểm</span><br/><span class="tag">Báo cáo đánh giá hiệu năng</span></td>
          </tr>
          <tr>
            <td class="center font-bold">STAGE 07</td>
            <td><strong>Vận hành Chính thức & Đánh giá</strong><div class="sub-en">Sau 12 tháng</div></td>
            <td>Bàn giao toàn diện quy trình, định kỳ ra mắt 20–30 SKUs mới mỗi quý, bảo hộ tài sản trí tuệ và hỗ trợ kỹ thuật mở rộng thị trường quốc tế.</td>
            <td><span class="tag">Bàn giao vận hành tự chủ</span><br/><span class="tag">Kế hoạch R&D năm tiếp theo</span></td>
          </tr>
        </tbody>
      </table>

      <div class="section-title" style="margin-top: 30px;">2. QUY HOẠCH 7 PHÂN KHU CHỨC NĂNG (1.500 - 2.000 m²)</div>
      <div class="role-grid">
        <div class="role-card">
          <div class="role-title">1. Design Studio & Concept Lab (150 m²)</div>
          <div class="role-desc">Không gian sáng tạo, phác thảo concept, dựng 3D, họp brainstorm và trải nghiệm moodboard.</div>
        </div>
        <div class="role-card">
          <div class="role-title">2. Thư viện Vật liệu CMF Library (100 m²)</div>
          <div class="role-desc">Lưu trữ hơn 1.000+ mẫu gỗ, veneer, đá, kim loại, da, vải, sơn và phụ kiện ngũ kim đạt chuẩn.</div>
        </div>
        <div class="role-card">
          <div class="role-title">3. Xưởng làm mẫu Prototype (800 - 1.000 m²)</div>
          <div class="role-desc">Trang bị CNC, cưa cắt, dán cạnh, gia công kim loại, phòng bọc đệm và phòng sơn mẫu chuyên biệt.</div>
        </div>
        <div class="role-card">
          <div class="role-title">4. Phòng Kiểm định & Thử nghiệm Testing Lab (150 m²)</div>
          <div class="role-desc">Hệ thống máy kiểm tra độ võng, lực kéo, độ nén, độ mỏi và thử nghiệm thả rơi Drop Test ISTA.</div>
        </div>
        <div class="role-card">
          <div class="role-title">5. Phòng Kỹ thuật & CAD/CAM Data (100 m²)</div>
          <div class="role-desc">Nơi xuất bản vẽ shop drawing, nesting vật liệu, lập trình CNC và bóc tách định mức BOM.</div>
        </div>
        <div class="role-card">
          <div class="role-title">6. Showroom Kỹ thuật & Trưng bày Mẫu (250 m²)</div>
          <div class="role-desc">Trưng bày Golden Samples, kiểm tra tỷ lệ ánh sáng, thẩm mỹ và đón tiếp đối tác/khách hàng.</div>
        </div>
      </div>
    `;
  }

  // 3. BRAND DESIGN (brand-design)
  else if (service.id === 'brand-design') {
    title = 'Scope Tạo Dựng Thương Hiệu Nội Thất Mới (Furniture Brand Design)';
    subtitle = 'Hệ thống quy chuẩn 8 nhóm hạng mục xây dựng bản sắc, định vị, hệ thống nhận diện và câu chuyện thương hiệu nội thất quốc tế.';
    bodyHtml = `
      <div class="section-title">1. PHẠM VI 8 NHÓM CÔNG VIỆC XÂY DỰNG THƯƠNG HIỆU NỘI THẤT</div>
      <p class="section-intro">Hệ thống quy chuẩn 8 nhóm hạng mục xây dựng bản sắc và tài sản thương hiệu nội thất chuẩn mực:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 200px;">Hạng mục thương hiệu</th>
            <th>Nội dung chi tiết & Nhiệm vụ</th>
            <th style="width: 200px;">Sản phẩm bàn giao</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Nghiên cứu & Định hướng</strong><div class="sub-en">Brand Strategy & Direction</div></td>
            <td>Phân tích thị trường nội thất, nghiên cứu đối thủ, xác định khách hàng mục tiêu, phân khúc giá và định vị thương hiệu cốt lõi.</td>
            <td><span class="tag">Brand Strategy Report</span><br/><span class="tag">Positioning Statement</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Nền tảng thương hiệu</strong><div class="sub-en">Brand Platform & Story</div></td>
            <td>Xây dựng tầm nhìn, sứ mệnh, giá trị cốt lõi, cá tính thương hiệu, lời hứa thương hiệu, câu chuyện thương hiệu và giọng điệu giao tiếp.</td>
            <td><span class="tag">Brand Platform</span><br/><span class="tag">Messaging Framework</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>Đặt tên thương hiệu (Naming)</strong><div class="sub-en">Brand & Collection Naming</div></td>
            <td>Sáng tạo danh sách tên thương hiệu chính, tên các dòng sản phẩm (Collection), kiểm tra sơ bộ âm điệu, tên miền và khả năng bảo hộ.</td>
            <td><span class="tag">Tên thương hiệu & Rationale</span><br/><span class="tag">Tên dòng sản phẩm</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Hệ thống nhận diện thị giác</strong><div class="sub-en">Visual Identity System</div></td>
            <td>Thiết kế Logo, bảng màu quy chuẩn, kiểu chữ Typography, hệ thống đồ họa bổ trợ (Graphic Elements), phong cách hình ảnh và cẩm nang Brand Guideline.</td>
            <td><span class="tag">Bộ File Logo Vector</span><br/><span class="tag">Brand Guideline PDF</span></td>
          </tr>
          <tr>
            <td class="center font-bold">05</td>
            <td><strong>Định hướng thiết kế sản phẩm</strong><div class="sub-en">Product Design Language</div></td>
            <td>Xác lập ngôn ngữ thiết kế đặc trưng, bảng mẫu CMF (màu sắc/vật liệu/bề mặt), tỷ lệ kiểu dáng và định hướng bộ sưu tập.</td>
            <td><span class="tag">Design Language Guide</span><br/><span class="tag">Material & CMF Board</span></td>
          </tr>
          <tr>
            <td class="center font-bold">06</td>
            <td><strong>Bao bì & Trải nghiệm sản phẩm</strong><div class="sub-en">Packaging & Unboxing</div></td>
            <td>Thiết kế thùng carton, tem nhãn tag mác, sách hướng dẫn lắp ráp bảo quản, phiếu bảo hành và trải nghiệm mở hộp tinh tế.</td>
            <td><span class="tag">File in ấn bao bì</span><br/><span class="tag">Tag mác & Thẻ bảo hành</span></td>
          </tr>
          <tr>
            <td class="center font-bold">07</td>
            <td><strong>Điểm chạm & Tài liệu bán hàng</strong><div class="sub-en">Brand Touchpoints & Sales Kit</div></td>
            <td>Thiết kế Catalog sản phẩm, Lookbook, Website giao diện, ấn phẩm văn phòng, biển hiệu showroom và POSM hỗ trợ đại lý.</td>
            <td><span class="tag">Catalog & Lookbook in ấn</span><br/><span class="tag">Giao diện Website & POSM</span></td>
          </tr>
          <tr>
            <td class="center font-bold">08</td>
            <td><strong>Kế hoạch ra mắt (Launch Plan)</strong><div class="sub-en">Go-To-Market & Campaign</div></td>
            <td>Xây dựng concept ra mắt bộ sưu tập đầu tiên, kế hoạch truyền thông social, bộ ảnh lookbook và tài liệu truyền thông.</td>
            <td><span class="tag">Launch Campaign Concept</span><br/><span class="tag">Sales Toolkit cho đại lý</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // 4. BRAND MARKETING (brand-marketing)
  else if (service.id === 'brand-marketing') {
    title = 'Nền Tảng Quản Trị & Tiếp Thị AI (AI Brand & Product Marketing Hub)';
    subtitle = 'Hệ sinh thái 9 nhóm tính năng quản trị thương hiệu, sản xuất nội dung tự động bằng AI và vận hành chiến dịch tiếp thị đa kênh.';
    bodyHtml = `
      <div class="section-title">1. HỆ THỐNG 9 NHÓM TÍNH NĂNG AI MARKETING HUB</div>
      <p class="section-intro">Nền tảng quản trị và tự động hóa toàn diện chiến lược tiếp thị, phân phối nội dung và chuyển đổi bán hàng:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 200px;">Module tính năng</th>
            <th>Phạm vi hoạt động & Khả năng xử lý</th>
            <th style="width: 180px;">Kết quả đầu ra</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Quản lý thương hiệu & Asset</strong><div class="sub-en">Brand Asset Hub</div></td>
            <td>Lưu trữ tập trung Logo, Brand Guidelines, bảng màu, font chữ, quy tắc giọng văn và tài sản đồ họa số hóa.</td>
            <td><span class="tag">Kho Brand Asset chuẩn</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Quản lý thông tin sản phẩm</strong><div class="sub-en">Product Catalog & Story</div></td>
            <td>Đồng bộ thông số kỹ thuật, chất liệu, kích thước, ảnh 3D/2D, bảng giá và câu chuyện sản phẩm đa kênh.</td>
            <td><span class="tag">Catalog Marketing tập trung</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>Chiến lược & Lập kế hoạch</strong><div class="sub-en">Marketing Strategy & Plan</div></td>
            <td>Thiết lập mục tiêu kinh doanh, phân bổ ngân sách, chia nhỏ chiến dịch theo quý/tháng và ma trận thông điệp.</td>
            <td><span class="tag">Marketing Master Plan</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Xưởng sản xuất nội dung AI</strong><div class="sub-en">AI Content Studio</div></td>
            <td>Tự động tạo bài viết SEO, kịch bản video ngắn TikTok/Reels, chuỗi email marketing và nội dung quảng cáo ad-copy.</td>
            <td><span class="tag">10+ Định dạng nội dung</span></td>
          </tr>
          <tr>
            <td class="center font-bold">05</td>
            <td><strong>Quản lý xuất bản đa kênh</strong><div class="sub-en">Omnichannel Publishing</div></td>
            <td>Lịch Content Calendar trực quan, quy trình phê duyệt nội bộ và tự động xuất bản lên Web, Facebook, Instagram, TikTok.</td>
            <td><span class="tag">Lịch phát hành tự động</span></td>
          </tr>
          <tr>
            <td class="center font-bold">06</td>
            <td><strong>Quản trị quảng cáo đa nền tảng</strong><div class="sub-en">Ad Management & ROAS</div></td>
            <td>Tập trung quản lý chiến dịch Meta Ads, Google Ads, TikTok Ads, theo dõi ngân sách và tối ưu hóa chi phí chuyển đổi.</td>
            <td><span class="tag">Báo cáo hiệu quả Ads</span></td>
          </tr>
          <tr>
            <td class="center font-bold">07</td>
            <td><strong>CRM & Chăm sóc khách hàng</strong><div class="sub-en">Lead Nurturing & CRM</div></td>
            <td>Thu thập và phân loại data khách hàng, tự động gửi email chăm sóc theo hành vi và thông báo cho đội Sales.</td>
            <td><span class="tag">Dữ liệu Lead phân tầng</span></td>
          </tr>
          <tr>
            <td class="center font-bold">08</td>
            <td><strong>Báo cáo & Phân tích thời gian thực</strong><div class="sub-en">Analytics & Insights</div></td>
            <td>Dashboard trực quan đo lường lưu lượng truy cập, tỷ lệ tương tác, chi phí trên mỗi đơn hàng (CAC) và doanh thu.</td>
            <td><span class="tag">Executive Dashboard</span></td>
          </tr>
          <tr>
            <td class="center font-bold">09</td>
            <td><strong>Kiểm duyệt & Phê duyệt 2 lớp</strong><div class="sub-en">Human-in-the-Loop</div></td>
            <td>Cơ chế phân quyền chặt chẽ, đảm bảo mọi nội dung và ngân sách đều qua kiểm duyệt của nhân sự trước khi phát hành.</td>
            <td><span class="tag">Quy trình duyệt an toàn</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // 5. MONOSBASE (monosbase)
  else if (service.id === 'monosbase') {
    title = 'Hệ Điều Hành Quản Trị Dữ Liệu Sản Phẩm Monosbase (Furniture Product Data OS)';
    subtitle = 'Single Source of Truth cho toàn bộ dữ liệu kỹ thuật, bản vẽ CAD/3D, định mức BOM và tích hợp liên kết chuỗi giá trị nội thất.';
    bodyHtml = `
      <div class="section-title">1. KIẾN TRÚC LÕI QUẢN TRỊ DỮ LIỆU SẢN PHẨM (FURNITURE PRODUCT DATA OS)</div>
      <p class="section-intro">Monosbase đóng vai trò là "Single Source of Truth" (Nguồn dữ liệu chuẩn duy nhất), kết nối toàn bộ hệ thống doanh nghiệp nội thất:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 220px;">Tính năng cốt lõi</th>
            <th>Phạm vi xử lý & Năng lực vận hành</th>
            <th style="width: 180px;">Hiệu quả triển khai</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Single Source of Truth</strong><div class="sub-en">Dữ liệu sản phẩm tập trung</div></td>
            <td>Tập trung toàn bộ thông số kỹ thuật, kích thước, bản vẽ CAD/3D, hình ảnh render, chứng chỉ và lịch sử cập nhật tại một nơi duy nhất.</td>
            <td><span class="tag">Xóa bỏ cát cứ dữ liệu</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Cấu trúc BOM & CMF đa tầng</strong><div class="sub-en">Multi-level BOM & Finishes</div></td>
            <td>Quản lý định mức nguyên vật liệu đa cấp (gỗ, phụ kiện, sơn, đệm), liên kết trực tiếp với các phương án hoàn thiện màu sắc bề mặt.</td>
            <td><span class="tag">Bóc tách BOM tự động</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>Quản lý phiên bản & Phê duyệt</strong><div class="sub-en">Version Control & Workflow</div></td>
            <td>Theo dõi từng phiên bản sửa đổi (v1.0, v1.1...), ghi nhận lịch sử thay đổi của từng kỹ sư và quy trình phê duyệt nghiêm ngặt trước khi xuất xưởng.</td>
            <td><span class="tag">Ngăn ngừa sản xuất sai lệch</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Tích hợp kết nối đa hệ thống</strong><div class="sub-en">API & Ecosystem Connect</div></td>
            <td>Cung cấp RESTful API kết nối liền mạch với ERP, CRM, Website 3D Configurator, phần mềm cắt CNC và phần mềm kế toán.</td>
            <td><span class="tag">Đồng bộ dữ liệu thời gian thực</span></td>
          </tr>
          <tr>
            <td class="center font-bold">05</td>
            <td><strong>Phân quyền & Bảo mật doanh nghiệp</strong><div class="sub-en">Role-Based Access Control</div></td>
            <td>Phân chia quyền truy cập chặt chẽ theo phòng ban (R&D, Mua hàng, Bán hàng, Xưởng sản xuất, Đối tác bên ngoài).</td>
            <td><span class="tag">Bảo mật tài sản trí tuệ</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // 6. AI MANAGEMENT PLATFORM (bot-team)
  else if (service.id === 'bot-team') {
    title = 'Nền Tảng Trợ Lý AI Đa Tác Nhân Quản Trị Vận Hành (AI Multi-Agent Management Platform)';
    subtitle = 'Mô hình trợ lý AI chuyên biệt cho từng phòng ban: Mua hàng RFQ, Báo giá Costing, Tư vấn bán hàng, Điều độ sản xuất và Hỗ trợ R&D.';
    bodyHtml = `
      <div class="section-title">1. HỆ ĐIỀU HÀNH TRỢ LÝ AI ĐA TÁC NHÂN (MULTI-AGENT OS)</div>
      <p class="section-intro">Mô hình AI chuyên biệt cho từng phòng ban trong doanh nghiệp sản xuất và thương mại nội thất:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 200px;">Trợ lý AI chuyên biệt</th>
            <th>Nhiệm vụ & Chức năng xử lý tự động</th>
            <th style="width: 180px;">Giá trị mang lại</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Trợ lý Mua hàng & NCC (RFQ AI)</strong><div class="sub-en">Procurement AI Agent</div></td>
            <td>Tự động so sánh báo giá ván, gỗ, sơn, phụ kiện từ nhiều NCC; phân tích biến động giá và đề xuất phương án tối ưu chi phí.</td>
            <td><span class="tag">Tiết kiệm 5–10% giá vốn</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Trợ lý Báo giá & Dự toán (Costing AI)</strong><div class="sub-en">Quotation & Costing AI</div></td>
            <td>Bóc tách khối lượng từ bản vẽ, tự động tính toán nhân công, máy móc, hao hụt và xuất bảng báo giá chuẩn chỉ trong 60 giây.</td>
            <td><span class="tag">Rút ngắn 90% thời gian báo giá</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>Trợ lý Tư vấn Bán hàng (Sales AI)</strong><div class="sub-en">Sales & Recommendation AI</div></td>
            <td>Tư vấn chọn mẫu, phối màu theo phong cách phòng, tính toán kích thước vừa vặn không gian và chốt đơn tự động 24/7.</td>
            <td><span class="tag">Tăng 35% tỷ lệ chuyển đổi</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Trợ lý Điều độ Sản xuất (Factory AI)</strong><div class="sub-en">Production Scheduler AI</div></td>
            <td>Sắp xếp lệnh sản xuất theo máy, cảnh báo thiếu hụt vật tư nguyên liệu và dự báo tiến độ giao hàng chính xác.</td>
            <td><span class="tag">Giảm thiểu thời gian chờ xưởng</span></td>
          </tr>
          <tr>
            <td class="center font-bold">05</td>
            <td><strong>Trợ lý Thiết kế & R&D (R&D AI)</strong><div class="sub-en">Design Assistant AI</div></td>
            <td>Tra cứu nhanh tiêu chuẩn kỹ thuật (BIFMA, EN), gợi ý cấu tạo phụ kiện phù hợp và hỗ trợ kiểm tra tính khả thi gia công.</td>
            <td><span class="tag">Nâng cao chất lượng R&D</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // 7. 3D INTERACTIVE SALES (3d-interactive)
  else if (service.id === '3d-interactive') {
    title = 'Giải Pháp Bán Hàng 3D Không Gian & Configurator (3D Interactive Sales)';
    subtitle = 'Công nghệ WebGL 3D Room trực quan, CMF Configurator thời gian thực và trải nghiệm thực tế ảo tăng cường AR.';
    bodyHtml = `
      <div class="section-title">1. PHẠM VI GIẢI PHÁP 3D INTERACTIVE SALES & CONFIGURATOR</div>
      <p class="section-intro">Giải pháp bán hàng không gian 3D và cấu hình sản phẩm trực quan thời gian thực:</p>
      
      <table class="scope-table">
        <thead>
          <tr>
            <th style="width: 50px; text-align: center;">STT</th>
            <th style="width: 200px;">Phân hệ giải pháp</th>
            <th>Phạm vi kỹ thuật & Trải nghiệm tương tác</th>
            <th style="width: 180px;">Sản phẩm bàn giao</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="center font-bold">01</td>
            <td><strong>Không gian 3D tương tác (3D Room)</strong><div class="sub-en">Virtual Room Environments</div></td>
            <td>Dựng không gian phòng mẫu (Living Room, Bedroom, Dining Room) với ánh sáng chuẩn photorealistic, hỗ trợ xoay 360 độ và góc nhìn tự do.</td>
            <td><span class="tag">Bộ Scene 3D không gian</span></td>
          </tr>
          <tr>
            <td class="center font-bold">02</td>
            <td><strong>Bộ cấu hình sản phẩm (3D Configurator)</strong><div class="sub-en">Real-time CMF Customizer</div></td>
            <td>Cho phép khách hàng thay đổi màu vải, chất liệu da, mặt đá, chân kim loại, kiểu tay vịn và kích thước ngay lập tức.</td>
            <td><span class="tag">Engine Configurator Web/App</span></td>
          </tr>
          <tr>
            <td class="center font-bold">03</td>
            <td><strong>Công nghệ Thực tế ảo tăng cường (AR)</strong><div class="sub-en">Augmented Reality Mobile</div></td>
            <td>Trực tiếp ướm thử sản phẩm vào không gian phòng thực tế của khách hàng qua camera điện thoại/iPad mà không cần cài app.</td>
            <td><span class="tag">Mô hình USDZ / GLTF chuẩn AR</span></td>
          </tr>
          <tr>
            <td class="center font-bold">04</td>
            <td><strong>Báo giá & Đặt hàng tự động</strong><div class="sub-en">Instant Quotation & Order</div></td>
            <td>Tính toán giá tiền chính xác theo từng lựa chọn vật liệu và kết xuất file PDF báo giá kèm hình ảnh render ngay tại chỗ.</td>
            <td><span class="tag">Báo giá tự động tích hợp</span></td>
          </tr>
        </tbody>
      </table>
    `;
  }

  // 8. PRODUCT CATEGORY GALLERY
  else {
    const products = getProductsForCategory(service.id);
    const categoryNameClean = service.name.split(' - ')[0];
    title = `${categoryNameClean} (Danh Mục Sản Phẩm & Tiêu Chuẩn Kỹ Thuật)`;
    subtitle = `Quy chuẩn thông số kỹ thuật, quy cách gia công, dung sai và chất liệu tiêu chuẩn xuất khẩu cho nhóm ${categoryNameClean}.`;

    let productsTableRows = '';
    if (products && products.length > 0) {
      products.forEach((prod, idx) => {
        productsTableRows += `
          <tr>
            <td class="center font-bold">${String(idx + 1).padStart(2, '0')}</td>
            <td><strong>${prod.name}</strong><div class="sub-en">Mã: ${prod.code || '-'}</div></td>
            <td>${prod.categoryName || categoryNameClean}</td>
            <td>${prod.material || 'Gỗ tự nhiên / Kim loại cao cấp'}</td>
            <td>${prod.dimensions || 'Theo tiêu chuẩn xuất khẩu'}</td>
            <td>${prod.finish || 'Sơn phủ PU / Hoàn thiện mờ cao cấp'}</td>
            <td class="center font-semibold">${prod.leadTime || '15-25 ngày'}</td>
          </tr>
        `;
      });
    }

    bodyHtml = `
      <div class="section-title">1. TỔNG QUAN DANH MỤC SẢN PHẨM & PHẠM VI TIÊU CHUẨN</div>
      <p class="section-intro">Danh mục ${categoryNameClean} bao gồm ${products.length} sản phẩm mẫu thiết kế đạt tiêu chuẩn xuất khẩu và thương mại:</p>

      ${products.length > 0 ? `
        <table class="scope-table">
          <thead>
            <tr>
              <th style="width: 40px; text-align: center;">STT</th>
              <th style="width: 180px;">Tên sản phẩm & Mã SKU</th>
              <th style="width: 130px;">Phân loại</th>
              <th>Chất liệu cấu tạo</th>
              <th style="width: 130px;">Kích thước (DxRxC)</th>
              <th style="width: 150px;">Quy cách hoàn thiện</th>
              <th style="width: 90px; text-align: center;">Thời gian</th>
            </tr>
          </thead>
          <tbody>
            ${productsTableRows}
          </tbody>
        </table>
      ` : `
        <div class="info-box">
          <strong>Thông tin phạm vi:</strong> Danh mục này bao gồm toàn bộ quy trình thiết kế, R&D cấu tạo, bóc tách bản vẽ kỹ thuật gia công và sản xuất hàng loạt theo tiêu chuẩn xuất khẩu quốc tế.
        </div>
      `}

      <div class="section-title" style="margin-top: 25px;">2. QUY CHUẨN ĐÓNG GÓI & TIÊU CHUẨN KỸ THUẬT BÀN GIAO</div>
      <div class="role-grid">
        <div class="role-card">
          <div class="role-title">Tiêu chuẩn Kỹ thuật & Độ bền</div>
          <div class="role-desc">Toàn bộ sản phẩm được kiểm soát theo tiêu chuẩn chịu lực quốc tế BIFMA / EN, độ ẩm gỗ <12%, liên kết chốt cam & mộng âm dương gia cường.</div>
        </div>
        <div class="role-card">
          <div class="role-title">Quy cách Đóng gói & Vận chuyển</div>
          <div class="role-desc">Đóng gói Knock-Down (KD) tối ưu thể tích CBM, thùng carton 5-7 lớp tiêu chuẩn xuất khẩu, góc xốp bọc bảo vệ và vượt qua Drop Test ISTA.</div>
        </div>
        <div class="role-card">
          <div class="role-title">Hồ sơ Kỹ thuật Bàn giao</div>
          <div class="role-desc">Bản vẽ 2D/3D CAD, bảng định mức BOM, bảng phân tích giá thành (Costing), hướng dẫn lắp ráp (AI) và chứng nhận an toàn bề mặt.</div>
        </div>
      </div>
    `;
  }

  return { title, subtitle, bodyHtml };
}

/**
 * Returns standard unified CSS for print and on-screen PDF preview
 */
function getDocumentStyles(): string {
  return `
    @page {
      size: A4 portrait;
      margin: 12mm 10mm 14mm 10mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #202124;
      background: #f8f9fa;
      margin: 0;
      padding: 20px;
      line-height: 1.5;
      font-size: 11.5px;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
      background: #ffffff;
      padding: 24px 30px;
      border: 1px solid #dadce0;
      border-radius: 12px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }

    /* Top Action Bar for on-screen view */
    .action-bar {
      background: #ffffff;
      border: 1px solid #dadce0;
      padding: 12px 18px;
      border-radius: 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    }

    .btn-print {
      background: #1a73e8;
      color: white;
      border: none;
      padding: 9px 20px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 13px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      transition: background 0.2s;
    }
    .btn-print:hover {
      background: #1557d0;
    }

    /* Document Header */
    .doc-header {
      border-bottom: 2px solid #1a73e8;
      padding-bottom: 14px;
      margin-bottom: 18px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
    }

    .brand-name {
      font-size: 18px;
      font-weight: 800;
      color: #1a73e8;
      letter-spacing: -0.02em;
      margin-bottom: 2px;
    }

    .brand-subtitle {
      font-size: 11px;
      color: #5f6368;
      font-weight: 500;
    }

    .doc-meta {
      text-align: right;
      font-size: 11px;
      color: #5f6368;
    }
    .doc-meta strong {
      color: #202124;
    }

    /* Main Document Title Box */
    .title-box {
      background: #f8f9fa;
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 14px 18px;
      margin-bottom: 20px;
      page-break-inside: avoid;
    }

    .doc-badge {
      display: inline-block;
      background: #e8f0fe;
      color: #1a73e8;
      font-size: 10px;
      font-weight: bold;
      padding: 2px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 6px;
    }

    .main-title {
      font-size: 17px;
      font-weight: 800;
      color: #202124;
      margin: 0 0 6px 0;
      line-height: 1.3;
    }

    .main-desc {
      font-size: 11.5px;
      color: #5f6368;
      margin: 0;
      line-height: 1.45;
    }

    /* Section Styles */
    .section-title {
      font-size: 13px;
      font-weight: 800;
      color: #1a73e8;
      border-left: 3.5px solid #1a73e8;
      padding-left: 8px;
      margin: 22px 0 10px 0;
      text-transform: uppercase;
      letter-spacing: 0.2px;
      page-break-after: avoid;
    }

    .section-intro {
      font-size: 11px;
      color: #5f6368;
      margin-bottom: 12px;
      line-height: 1.4;
    }

    /* Tables */
    .scope-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 18px;
      font-size: 11px;
      page-break-inside: auto;
    }

    .scope-table th {
      background: #f1f3f4;
      color: #202124;
      font-weight: 700;
      text-align: left;
      padding: 8px 10px;
      border: 1px solid #dadce0;
      font-size: 11px;
    }

    .scope-table td {
      padding: 8px 10px;
      border: 1px solid #dadce0;
      vertical-align: top;
      line-height: 1.4;
    }

    .scope-table tr {
      page-break-inside: avoid;
    }

    .scope-table tr:nth-child(even) {
      background: #fafafa;
    }

    .sub-en {
      font-size: 9.5px;
      color: #70757a;
      font-style: italic;
      margin-top: 2px;
    }

    .task-list {
      margin: 0;
      padding-left: 14px;
    }
    .task-list li {
      margin-bottom: 3px;
    }

    .tag {
      display: inline-block;
      background: #e8f0fe;
      color: #1a73e8;
      font-size: 9.5px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 4px;
      margin-bottom: 3px;
      border: 1px solid #d2e3fc;
      white-space: nowrap;
    }

    /* Role Cards */
    .role-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin-bottom: 16px;
      page-break-inside: auto;
    }

    .role-card {
      background: #f8f9fa;
      border: 1px solid #dadce0;
      border-radius: 6px;
      padding: 10px 12px;
      page-break-inside: avoid;
    }

    .role-title {
      font-weight: bold;
      color: #202124;
      font-size: 11.5px;
      margin-bottom: 3px;
    }

    .role-desc {
      font-size: 10.5px;
      color: #5f6368;
      line-height: 1.4;
    }

    .info-box {
      background: #e8f0fe;
      border: 1px solid #d2e3fc;
      border-radius: 6px;
      padding: 12px;
      font-size: 11.5px;
      color: #1a73e8;
      margin-bottom: 14px;
      page-break-inside: avoid;
    }

    /* Page Break for Multi-Module / Master SOW */
    .page-break {
      page-break-before: always;
      margin-top: 30px;
      padding-top: 20px;
      border-top: 1px dashed #dadce0;
    }

    /* Module Index */
    .toc-box {
      background: #f8f9fa;
      border: 1px solid #dadce0;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 24px;
      page-break-inside: avoid;
    }

    .toc-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 8px 16px;
    }

    .toc-item {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 11.5px;
      color: #202124;
      padding: 4px 0;
    }

    .toc-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #e8f0fe;
      color: #1a73e8;
      font-size: 10px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      shrink: 0;
    }

    /* Footer & Signatures */
    .doc-footer {
      margin-top: 30px;
      padding-top: 14px;
      border-top: 1px solid #dadce0;
      page-break-inside: avoid;
    }

    .terms-note {
      font-size: 10px;
      color: #70757a;
      line-height: 1.5;
      margin-bottom: 20px;
    }

    .signatures {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
    }

    .sign-col {
      width: 45%;
      text-align: center;
    }

    .sign-col .title {
      font-weight: bold;
      font-size: 11.5px;
      color: #202124;
      margin-bottom: 4px;
    }
    .sign-col .subtitle {
      font-size: 10px;
      color: #70757a;
    }
    .sign-col .placeholder {
      height: 60px;
    }
    .sign-col .name {
      font-weight: bold;
      font-size: 11px;
      color: #3c4043;
    }

    @media print {
      .no-print {
        display: none !important;
      }
      body {
        padding: 0;
        background: #ffffff;
      }
      .container {
        border: none;
        box-shadow: none;
        padding: 0;
        max-width: 100%;
      }
      .page-break {
        page-break-before: always;
        border-top: none;
        margin-top: 0;
        padding-top: 0;
      }
    }
  `;
}

/**
 * Triggers printing using a new window or iframe fallback
 */
function openPrintWindow(fullHtml: string) {
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(fullHtml);
    printWindow.document.close();
  } else {
    // Fallback via invisible iframe if popup blocked
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(fullHtml);
      doc.close();
      setTimeout(() => {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 1000);
      }, 500);
    }
  }
}

/**
 * Export a single service module scope
 */
export function exportScopeToPdf(service: Service, options?: ScopeExportOptions) {
  const printDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const docCode = `SOW-${(service.id || 'SRV').toUpperCase()}-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`;
  const companyName = options?.companyName || 'Quý Đối Tác / Doanh Nghiệp';
  const scopeData = getServiceScopeHtml(service);
  const docTitle = options?.customTitle || scopeData.title;

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Bản Mô Tả Phạm Vi Công Việc - ${docTitle}</title>
      <style>${getDocumentStyles()}</style>
    </head>
    <body>
      <div class="container">
        <!-- On-Screen Control Bar -->
        <div class="action-bar no-print">
          <div>
            <strong style="color: #202124; font-size: 13px;">Bản xem trước tài liệu Phạm vi công việc (SOW)</strong>
            <div style="color: #5f6368; font-size: 11px;">Nhấn nút bên cạnh để in hoặc lưu trực tiếp thành tệp PDF chất lượng cao (chọn "Tất cả các trang").</div>
          </div>
          <button class="btn-print" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Lưu thành PDF / In tài liệu
          </button>
        </div>

        <!-- Document Header -->
        <div class="doc-header">
          <div>
            <div class="brand-name">MONOS MAKER & FURNITURE OS</div>
            <div class="brand-subtitle">Hệ Sinh Thái Số Hóa, R&D & Chuỗi Cung Ứng Nội Thất 2026</div>
          </div>
          <div class="doc-meta">
            <div>Mã tài liệu: <strong>${docCode}</strong></div>
            <div>Ngày phát hành: <strong>${printDate}</strong></div>
            <div>Đơn vị tiếp nhận: <strong>${companyName}</strong></div>
          </div>
        </div>

        <!-- Title Box -->
        <div class="title-box">
          <div class="doc-badge">BẢN MÔ TẢ PHẠM VI CÔNG VIỆC & KỸ THUẬT (SCOPE OF WORK)</div>
          <h1 class="main-title">${docTitle}</h1>
          <p class="main-desc">${scopeData.subtitle}</p>
        </div>

        <!-- Specific Body Content -->
        ${scopeData.bodyHtml}

        <!-- Footer & Sign-off Block -->
        <div class="doc-footer">
          <div class="terms-note">
            * Tài liệu này quy định đầy đủ các hạng mục công việc, sản phẩm bàn giao kỹ thuật (Deliverables) và tiêu chuẩn chất lượng cam kết giữa các bên. Mọi yêu cầu phát sinh ngoài phạm vi mô tả sẽ được lập phụ lục điều chỉnh tương ứng.
          </div>

          <div class="signatures">
            <div class="sign-col">
              <div class="title">ĐẠI DIỆN ĐƠN VỊ TIẾP NHẬN</div>
              <div class="subtitle">(Ký, ghi rõ họ tên & đóng dấu)</div>
              <div class="placeholder"></div>
              <div class="name">${companyName}</div>
            </div>

            <div class="sign-col">
              <div class="title">ĐẠI DIỆN MONOS MAKER & R&D CENTER</div>
              <div class="subtitle">(Ký duyệt & xác nhận phạm vi)</div>
              <div class="placeholder"></div>
              <div class="name">Ban Giám Đốc Kỹ Thuật & R&D</div>
            </div>
          </div>
        </div>
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 400);
        });
      </script>
    </body>
    </html>
  `;

  openPrintWindow(fullHtml);
}

/**
 * Export the complete MASTER Scope of Work containing ALL modules, chapters and specifications
 */
export function exportMasterScopeToPdf(allServices: Service[], options?: ScopeExportOptions) {
  const printDate = new Date().toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const docCode = `MASTER-SOW-${new Date().getFullYear()}${String(new Date().getMonth() + 1).padStart(2, '0')}${String(new Date().getDate()).padStart(2, '0')}`;
  const companyName = options?.companyName || 'Quý Khách Hàng / Quý Đối Tác';
  const masterTitle = options?.customTitle || 'HỆ SINH THÁI GIẢI PHÁP THIẾT KẾ, R&D & VẬN HÀNH SỐ HÓA NỘI THẤT';

  // Primary core modules to include in master order
  const primaryCoreIds = [
    'furniture-development',
    'design-rnd-center',
    'brand-design',
    'brand-marketing',
    'monosbase',
    'bot-team',
    '3d-interactive'
  ];

  const orderedServices: Service[] = [];
  
  // Add core modules first
  primaryCoreIds.forEach(id => {
    const s = allServices.find(item => item.id === id);
    if (s) orderedServices.push(s);
  });

  // Add category services if any
  allServices.forEach(s => {
    if (!primaryCoreIds.includes(s.id) && !orderedServices.find(item => item.id === s.id)) {
      orderedServices.push(s);
    }
  });

  let tableOfContentsHtml = `
    <div class="toc-box">
      <div style="font-weight: 800; font-size: 12px; color: #1a73e8; margin-bottom: 10px; text-transform: uppercase;">
        MỤC LỤC TỔNG HỢP CÁC PHÂN HỆ PHẠM VI (TABLE OF CONTENTS)
      </div>
      <div class="toc-grid">
  `;

  let modulesBodyHtml = '';

  orderedServices.forEach((service, index) => {
    const scopeData = getServiceScopeHtml(service);
    const chapterNum = String(index + 1).padStart(2, '0');

    tableOfContentsHtml += `
      <div class="toc-item">
        <div class="toc-num">${chapterNum}</div>
        <div style="font-weight: 600;">${scopeData.title.split(' (')[0]}</div>
      </div>
    `;

    modulesBodyHtml += `
      <div class="${index > 0 ? 'page-break' : ''}">
        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
          <span class="doc-badge">PHẦN ${chapterNum}</span>
          <span style="font-size: 11px; font-weight: bold; color: #5f6368;">MÃ MODULE: ${(service.id || 'SRV').toUpperCase()}</span>
        </div>
        <h2 style="font-size: 15px; font-weight: 800; color: #202124; margin: 0 0 4px 0;">${scopeData.title}</h2>
        <p style="font-size: 11px; color: #5f6368; margin: 0 0 14px 0;">${scopeData.subtitle}</p>

        ${scopeData.bodyHtml}
      </div>
    `;
  });

  tableOfContentsHtml += `
      </div>
    </div>
  `;

  const fullHtml = `
    <!DOCTYPE html>
    <html lang="vi">
    <head>
      <meta charset="UTF-8">
      <title>Master SOW - ${masterTitle}</title>
      <style>${getDocumentStyles()}</style>
    </head>
    <body>
      <div class="container">
        <!-- On-Screen Control Bar -->
        <div class="action-bar no-print">
          <div>
            <strong style="color: #202124; font-size: 13px;">Tài liệu Master Scope of Work (Tổng Hợp Toàn Bộ Phân Hệ)</strong>
            <div style="color: #5f6368; font-size: 11px;">Hệ thống đã tự động gộp tất cả các phân hệ. Chọn "Tất cả các trang" (All Pages) và bật "Đồ họa nền" để in trọn vẹn.</div>
          </div>
          <button class="btn-print" onclick="window.print()">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            Lưu Master SOW thành PDF / In toàn bộ
          </button>
        </div>

        <!-- Master Document Header -->
        <div class="doc-header">
          <div>
            <div class="brand-name">MONOS MAKER & FURNITURE OS</div>
            <div class="brand-subtitle">Hệ Sinh Thái Toàn Diện Số Hóa, R&D & Chuỗi Cung Ứng Nội Thất 2026</div>
          </div>
          <div class="doc-meta">
            <div>Mã tổng: <strong>${docCode}</strong></div>
            <div>Ngày phát hành: <strong>${printDate}</strong></div>
            <div>Đơn vị tiếp nhận: <strong>${companyName}</strong></div>
          </div>
        </div>

        <!-- Master Cover / Title Box -->
        <div class="title-box">
          <div class="doc-badge">TỔNG THƯ THỎA THUẬN PHẠM VI CÔNG VIỆC & KỸ THUẬT (MASTER SOW)</div>
          <h1 class="main-title">${masterTitle}</h1>
          <p class="main-desc">Tập hợp toàn bộ quy chuẩn năng lực thiết kế, kế hoạch trung tâm R&D, nhận diện thương hiệu, tiếp thị AI, hệ điều hành dữ liệu Monosbase, trợ lý AI đa tác nhân và tiêu chuẩn các dòng sản phẩm xuất khẩu.</p>
        </div>

        <!-- Table of Contents -->
        ${tableOfContentsHtml}

        <!-- All Modules Content -->
        ${modulesBodyHtml}

        <!-- Master Footer & Sign-off Block -->
        <div class="doc-footer page-break">
          <div class="section-title">CAM KẾT CHẤT LƯỢNG & ĐIỀU KHOẢN THI HÀNH MASTER SOW</div>
          <div class="terms-note">
            1. Master Scope of Work này có giá trị pháp lý là cơ sở quy định toàn bộ tiêu chuẩn kỹ thuật, danh mục sản phẩm bàn giao (Deliverables) và cam kết thời gian hoàn thành giữa hai bên.<br/>
            2. Toàn bộ mã nguồn, tài sản dữ liệu CAD/3D, quy trình SOP và quyền sở hữu trí tuệ phát sinh theo hợp đồng sẽ được chuyển giao đầy đủ theo đúng thỏa thuận.<br/>
            3. Hai bên cam kết bảo mật tuyệt đối các thông tin thương mại, bí quyết kỹ thuật và công nghệ trong suốt quá trình hợp tác và sau khi nghiệm thu.
          </div>

          <div class="signatures">
            <div class="sign-col">
              <div class="title">ĐẠI DIỆN ĐƠN VỊ TIẾP NHẬN</div>
              <div class="subtitle">(Ký, ghi rõ họ tên & đóng dấu)</div>
              <div class="placeholder"></div>
              <div class="name">${companyName}</div>
            </div>

            <div class="sign-col">
              <div class="title">ĐẠI DIỆN MONOS MAKER & R&D ECOSYSTEM</div>
              <div class="subtitle">(Ký duyệt & xác nhận toàn diện)</div>
              <div class="placeholder"></div>
              <div class="name">Hội Đồng Quản Trị & Ban Giám Đốc Kỹ Thuật</div>
            </div>
          </div>
        </div>
      </div>

      <script>
        window.addEventListener('load', () => {
          setTimeout(() => {
            window.print();
          }, 400);
        });
      </script>
    </body>
    </html>
  `;

  openPrintWindow(fullHtml);
}
