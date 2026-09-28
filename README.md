# Việt An Express Portal — Modular Monolith & Clean Architecture

Hệ thống cổng thông tin khách hàng và phần mềm tạo đơn, đánh bill chuyển phát nhanh quốc tế **Việt An Express** được tái cấu trúc toàn diện sang **100% TypeScript** theo mô hình **Modular Monolith + Clean Architecture**.

---

## 🏗️ 1. Kiến trúc Hệ thống (Architecture Overview)

Toàn bộ hệ thống được chia thành các tầng Clean Architecture rõ ràng bên trong từng Bounded Context (Module):

```
src/
├── core/                                # Shared Kernel & Clean Architecture Primitives
│   ├── domain/
│   │   ├── entity.base.ts              # Base Entity & AggregateRoot
│   │   ├── value-object.base.ts        # Immutable ValueObject
│   │   └── result.ts                   # Result<T, E> Monad xử lý lỗi tường minh
│   ├── application/
│   │   └── use-case.interface.ts       # IUseCase<TRequest, TResponse>
│   └── infrastructure/
│       └── repository.base.ts          # BaseInMemoryRepository<T>
│
├── modules/                             # Bounded Contexts (Modular Monolith)
│   ├── catalog/                         # 1. Danh mục 44 nhóm hàng & gợi ý HS Code
│   ├── pricing/                         # 2. Định giá, 140 mốc cân, FSC, VAT, phụ phí kích thước
│   ├── orders/                          # 3. Đơn hàng, đơn nháp, in ấn, cấp mã bill, khóa đơn
│   ├── ecommerce/                       # 4. Kênh E-commerce (CSV/Excel 70 cột, Webhook sàn, bill lẻ)
│   ├── trouble/                         # 5. Báo cáo & quản lý sự cố (Trouble tickets)
│   ├── pickup/                          # 6. Đặt lịch lấy hàng tận nơi theo ca
│   ├── address-book/                    # 7. Sổ địa chỉ người gửi, người nhận & bảng cờ quốc gia
│   ├── notifications/                   # 8. Trung tâm thông báo hệ thống & popup tin quan trọng
│   └── ai-assistant/                    # 9. AI bóc tách thông tin người nhận & nhận diện hàng hóa
│
├── api/                                 # HTTP REST API Server (Express + TypeScript)
│   ├── routes.ts                        # Unified modular routing aggregator
│   └── server.ts                        # Khởi tạo Express, CORS, static SPA handler
│
├── client/                              # Frontend Client SPA (100% Strict TypeScript)
│   └── main.ts                          # Điều khiển UI, kết nối API backend, xử lý nghiệp vụ
│
└── index.ts                             # Điểm khởi chạy Monolith Server (Backend API + Web UI)
```

---

## ⚡ 2. Các Phân Hệ Nghiệp Vụ Cốt Lõi (Core Modules)

1. **Orders (Đơn hàng & Đơn nháp):**
   - Tạo đơn với 2 chế độ: *Từng bước (Wizard 3 bước)* hoặc *1 trang (Quick Mode làm phẳng)*.
   - Quy tắc nghiệp vụ tự động: Tài liệu DOC > 2kg tự chuyển sang PACK (`DocToPackRule`).
   - Tự động tính cước thể tích `(D x R x C) / 5000` và lấy `max(gross, vol)`.
   - Cảnh báo tức thì kích thước quá khổ, quá tải theo từng hãng (`CARRIER_LIMIT_RULES`).
   - Vòng đời đơn: Đơn nháp → Bấm In → Tự động cấp mã vận đơn Việt An (`billSeq`) → Khóa đơn không thể chỉnh sửa và chuyển vào *Đơn hàng của tôi*.
   - In nhãn nhiệt A6, in bill A4, xuất mã ZPL.

2. **Pricing (Định giá & Biểu phí Cước):**
   - Biểu giá 140 mốc cân từ 0.5kg đến 70.0kg theo Zone cho 6 dịch vụ chính: DHL, Fedex, UPS, Aramex, Chuyên tuyến, SEA.
   - Hàng nặng >70kg tính theo đơn giá VNĐ/kg.
   - Tự động cộng phụ phí nhiên liệu FSC%, thuế VAT% và tự động phát hiện dịch vụ có cước rẻ nhất.
   - Bảng quy tắc phụ thu 3 chiều theo chu vi `A = (R + C) x 2 + D`.

3. **E-Commerce (Kênh Bán Hàng):**
   - Upload & xử lý file CSV/Excel mẫu chuẩn 70 cột (`VietAn_Ecom_Import_Template.csv`).
   - Webhook API nhận đơn tự động từ TikTok Shop, Shopify, Shopee, Lazada.
   - Giao diện đánh bill lẻ nhập tay nhanh.

4. **AI Assistant (Trợ lý Bóc Tách Thông Tin):**
   - Dán chuỗi địa chỉ người nhận tự do (multiline text) → AI Heuristic tự bóc tách 9+ trường thông tin (Công ty, Người liên hệ, Điện thoại, Email, Mã số thuế, Quốc gia, Thành phố, Mã bưu chính, 3 dòng địa chỉ) kèm % độ tin cậy.
   - Nhận diện ảnh mặt hàng → Tự động sinh dòng invoice, đề xuất top-3 mã HS chuẩn và cảnh báo hàng nhạy cảm (pin lithium, mỹ phẩm).

5. **Catalog, Address Book, Trouble, Pickup, Notifications:**
   - 44 nhóm hàng hóa chuẩn của Việt An, đánh dấu ★ yêu thích, tính năng "Nhiều loại hàng" sinh bảng phụ đính kèm bill.
   - Sổ địa chỉ người gửi, người nhận, tra cứu nhanh.
   - Quản lý sự cố khiếu nại với mã `TRB-xxxx`.
   - Đặt lịch xe lấy hàng tận nhà theo ca sáng/chiều.

---

## 🚀 3. Hướng Dẫn Cài Đặt & Khởi Chạy

### Yêu cầu môi trường:
- Node.js version 18+ (khuyên dùng Node 20/22).
- npm version 9+.

### Cài đặt dependencies:
```bash
npm install
```

### Chạy chế độ phát triển (Development):
```bash
npm run dev
```

### Chạy bộ kiểm thử (Test Suite):
Kiểm tra toàn bộ 9 module nghiệp vụ end-to-end:
```bash
npm test
```

### Biên dịch TypeScript (Build):
```bash
npm run build
```
Code được biên dịch sang thư mục `dist/`.

### Khởi chạy & Sử dụng Giao diện Web:
Hệ thống hỗ trợ 2 cách sử dụng giao diện cực kỳ tiện lợi:
1. **Mở trực tiếp trên trình duyệt (Offline / File Protocol):**
   - Nhấp đúp chuột trực tiếp vào file [index.html](file:///d:/Downloads/PM_Danh_Bill_Trang_Ngoai.-main/PM_Danh_Bill_Trang_Ngoai.-main/index.html) ở thư mục gốc của dự án.
   - Giao diện chạy mượt mà ngay lập tức, chuyển đổi tab trang, tính cước, in nhãn, bóc tách AI mà không cần khởi động server.
2. **Khởi chạy máy chủ Fullstack Production:**
   ```bash
   npm start
   ```
   Truy cập giao diện Web Portal tại: **`http://localhost:3000`** (kết nối đầy đủ REST API backend).

---

## 📡 4. Danh Sách REST API Endpoints

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/health` | Kiểm tra tình trạng hoạt động của service |
| `POST` | `/api/v1/rates` | Tra cứu cước và phụ phí cho kiện hàng |
| `GET` | `/api/v1/pricing/services` | Danh sách các bảng giá dịch vụ vận chuyển |
| `GET` | `/api/v1/orders` | Danh sách đơn hàng (tìm kiếm, lọc, phân trang) |
| `GET` | `/api/v1/orders/:ref` | Chi tiết 1 đơn hàng theo mã bill hoặc mã tham chiếu |
| `POST` | `/api/v1/orders` | Tạo đơn hàng mới & cấp mã bill |
| `POST` | `/api/v1/orders/batch` | Tạo đơn hàng loạt (Batch orders) |
| `GET` | `/api/v1/orders/:ref/label` | Lấy dữ liệu in nhãn (A6 / A4 / ZPL) |
| `DELETE` | `/api/v1/orders/:ref` | Hủy đơn hàng khi chưa chuyển bay |
| `GET` | `/api/v1/drafts` | Danh sách đơn nháp |
| `POST` | `/api/v1/drafts` | Lưu đơn nháp |
| `POST` | `/api/v1/drafts/:id/print` | In đơn nháp, cấp mã vận đơn và khóa đơn |
| `DELETE` | `/api/v1/drafts/:id` | Xóa đơn nháp |
| `GET` | `/api/v1/ecom/orders` | Danh sách đơn e-commerce theo sàn |
| `POST` | `/api/v1/ecom/import-csv` | Import đơn từ file CSV 70 cột |
| `POST` | `/api/v1/ecom/webhook/:platform` | Nhận webhook đơn từ TikTok/Shopify/Shopee |
| `GET` | `/api/v1/troubles` | Danh sách báo cáo sự cố |
| `POST` | `/api/v1/troubles` | Báo cáo sự cố mới |
| `GET` | `/api/v1/pickups` | Danh sách yêu cầu lấy hàng |
| `POST` | `/api/v1/pickups` | Đặt lịch lấy hàng |
| `GET` | `/api/v1/catalog/categories` | 44 nhóm hàng hóa chuẩn |
| `POST` | `/api/v1/ai/parse-receiver` | AI bóc tách thông tin người nhận |
| `POST` | `/api/v1/ai/recognize` | AI nhận diện sản phẩm từ ảnh |
