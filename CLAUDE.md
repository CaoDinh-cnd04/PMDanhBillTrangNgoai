# CLAUDE.md — Dự án Việt An Express Portal (Modular Monolith + Clean Architecture)

> File hướng dẫn kỹ thuật dành cho AI Agent và lập trình viên. Đọc kỹ file này trước khi thực hiện chỉnh sửa.

---

## 1. Tổng quan Dự án
Hệ thống **Việt An Express Portal** (phần mềm tạo đơn, quản lý vận đơn và cổng thông tin logistics quốc tế của công ty Việt An Express).
Dự án được xây dựng theo chuẩn **Modular Monolith** kết hợp **Clean Architecture**, sử dụng **100% ngôn ngữ TypeScript** trên toàn bộ backend và frontend client.

Ngôn ngữ giao tiếp: **Tiếng Việt**.

---

## 2. Kiến trúc & Cấu trúc Thư mục

```
src/
├── core/                                # Shared Kernel & Clean Architecture Primitives
│   ├── domain/                         # Entity, AggregateRoot, ValueObject, Result monad
│   ├── application/                    # IUseCase interface
│   └── infrastructure/                 # BaseInMemoryRepository
│
├── modules/                             # Bounded Contexts (Modular Monolith)
│   ├── catalog/                        # Danh mục 44 nhóm hàng & gợi ý HS
│   ├── pricing/                        # Biểu phí cước (140 mốc cân, Zone, phụ phí)
│   ├── orders/                         # Quản lý đơn hàng, đơn nháp, in ấn, chính sách nghiệp vụ
│   ├── ecommerce/                      # Kênh e-commerce, CSV importer 70 cột, webhooks
│   ├── trouble/                        # Quản lý sự cố & phản hồi CS
│   ├── pickup/                         # Đặt lịch lấy hàng tận nơi
│   ├── address-book/                   # Sổ địa chỉ & danh mục quốc gia
│   ├── notifications/                  # Thông báo hệ thống
│   └── ai-assistant/                   # AI bóc tách thông tin & nhận diện ảnh
│
├── api/                                 # HTTP REST API Server (Express + TypeScript)
│   ├── routes.ts                       # Gom các router thành API v1 thống nhất
│   └── server.ts                       # Server setup, middleware, SPA fallback
│
├── client/                              # Web Client SPA (100% TypeScript)
│   └── main.ts                         # Client logic & DOM rendering
│
└── index.ts                             # Entrypoint khởi chạy server
```

---

## 3. Các lệnh thường dùng

```bash
# Cài đặt thư viện
npm install

# Chạy kiểm thử toàn bộ 9 module
npm test

# Biên dịch toàn bộ TypeScript sang dist/
npm run build

# Khởi chạy server production (sau khi build)
npm start

# Khởi chạy server development với live TS execution
npm run dev
```

---

## 4. Các Quy ước Nghiệp vụ Cốt Lõi Đã Triển Khai
- **DOC sang PACK:** Nếu loại hàng là `DOC` và trọng lượng > 2.0kg, hệ thống tự động cảnh báo và chuyển sang `PACK` (`DocToPackRule`).
- **Quy đổi thể tích:** Cước tính theo `max(grossWeight, (D x R x C) / 5000)`.
- **Cảnh báo kích thước:** Tự động đánh giá cạnh dài, tổng 3 cạnh, cân nặng theo `CARRIER_LIMIT_RULES` của từng hãng bay.
- **Vòng đời đơn:** Tạo đơn → Lưu nháp / Chưa in → In nhãn → Cấp mã bill Việt An (`billSeq`) → Chuyển sang "Đơn hàng của tôi" và khóa chỉnh sửa (`isLocked = true`).
- **Import E-commerce:** Hỗ trợ cấu trúc 70 cột mẫu của Yun/EPK/Việt An (`VietAn_Ecom_Import_Template.csv`).
- **AI Heuristic:** Bóc tách chuỗi dán người nhận tự do thành 9+ trường chuẩn và tính độ tin cậy %.
