/**
 * Việt An Express Portal — Client Application
 * Written in 100% Strict TypeScript
 * Fully interactive with global window exposure for inline DOM handlers.
 */

// Global definitions and constants
const LIMITS: Record<string, number> = { s_addr: 60, r_addr1: 30, r_addr2: 30, r_addr3: 30 };

const HUBS: Record<string, string[]> = {
  Aramex: ['Aramex - Dubai', 'Aramex - GCC'],
  DHL: ['DHL - Singapore', 'DHL - Hong Kong', 'DHL - VN'],
  Fedex: ['Fedex - US', 'Fedex - EU'],
  UPS: ['UPS - US', 'UPS - EU'],
  'Chuyên tuyến': ['Chuyên tuyến - Singapore', 'Chuyên tuyến - EU', 'Chuyên tuyến - AU_Toll Vip', 'Chuyên tuyến - China'],
  'Ủy quyền Việt An': ['UQ - Standard'],
  Ecommerce: ['Ecom - Asia'],
  SEA: ['SEA - Full']
};

const FLAGS: Record<string, string> = {
  Singapore: 'SG',
  Malaysia: 'MY',
  'United States': 'US',
  Australia: 'AU',
  Belgium: 'BE',
  China: 'CN',
  Mexico: 'MX',
  Canada: 'CA',
  Taiwan: 'TW',
  'United Arab Emirates': 'AE'
};

// Icon nét đơn sắc cho các nút thao tác (thay emoji)
const IC: Record<string, string> = {
  print: '<svg class="svi" viewBox="0 0 24 24"><path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/></svg>',
  eye: '<svg class="svi" viewBox="0 0 24 24"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  trash: '<svg class="svi" viewBox="0 0 24 24"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
  edit: '<svg class="svi" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  alert: '<svg class="svi" viewBox="0 0 24 24"><path d="M12 3 2 20h20z"/><path d="M12 10v4M12 17h.01"/></svg>',
  copy: '<svg class="svi" viewBox="0 0 24 24"><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/></svg>',
  more: '<svg class="svi" viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>'
};

const SENDERS = [
  { n: 'Công ty TNHH ABC', d: '14 Sầm Sơn, Tân Sơn Nhất, TP.HCM', c: 'Nguyễn Văn A', t: '0901 234 567' },
  { n: 'Kho Hà Nội - ABC', d: '88 Trần Duy Hưng, Cầu Giấy, Hà Nội', c: 'Trần Thị B', t: '0988 111 222' },
  { n: 'Chi nhánh Cần Thơ', d: '12 Hòa Bình, Ninh Kiều, Cần Thơ', c: 'Lê Văn C', t: '0919 555 777' }
];

let RECEIVERS = [
  { n: 'LINEX CO. LTD', ct: 'Singapore', city: 'Singapore', postal: '238859', contact: 'Mr. Lim', tel: '+65 8123 4567', a1: '1 Raffles Place, #20-01', a2: 'Tower One', a3: '' },
  { n: 'NGUYEN DAI QUANG', ct: 'Belgium', city: 'Brussels', postal: '1000', contact: 'Quang Nguyen', tel: '+32 470 123 456', a1: 'Rue Neuve 12', a2: '1000 Brussels', a3: '' },
  { n: 'SIMON RUSSAK', ct: 'United States', city: 'New York', postal: '10016', contact: 'Simon Russak', tel: '+1 212 555 0100', a1: '340 5th Ave', a2: 'Manhattan, NY', a3: '' },
  { n: 'CJI-ARDYAN', ct: 'Singapore', city: 'Singapore', postal: '238866', contact: 'Ardyan', tel: '+65 9000 1122', a1: '200 Orchard Road', a2: '', a3: '' },
  { n: 'TERANA, S.A.', ct: 'Mexico', city: 'Mexico City', postal: '06600', contact: 'Teresa', tel: '+52 55 1234 5678', a1: 'Av. Reforma 100', a2: 'CDMX', a3: '' }
];

const PRODUCTS = [
  { en: "Women's flower dress", vi: 'Váy hoa nữ', hs: '6204.43', origin: 'VN', unit: 'PCS' },
  { en: 'Cotton Ao Dai', vi: 'Áo dài cotton', hs: '6204.49', origin: 'VN', unit: 'PCS' },
  { en: 'False eyelashes', vi: 'Lông mi giả', hs: '6704.20', origin: 'VN', unit: 'BOX' },
  { en: 'Dried food', vi: 'Thực phẩm khô', hs: '2106.90', origin: 'VN', unit: 'KG' },
  { en: 'Backpack', vi: 'Ba lô', hs: '4202.92', origin: 'VN', unit: 'PCS' },
  { en: 'Stainless steel bracelet', vi: 'Vòng tay inox', hs: '7117.19', origin: 'VN', unit: 'PCS' }
];

const CATEGORIES = [
  "Quần áo và hàng may mặc", "Thực phẩm khô", "Mỹ phẩm", "Đồ dùng cá nhân", "Thực phẩm chức năng",
  "Thuốc, dược phẩm và thiết bị y tế", "Quà tặng và đồ lưu niệm", "Giày dép", "Đồ da, túi xách và phụ kiện thời trang",
  "Nông sản và sản phẩm từ thực vật", "Điện thoại, máy tính và thiết bị công nghệ", "Điện tử, thiết bị điện và linh kiện",
  "Đồ gia dụng và vật dụng nhà bếp", "Sách, ấn phẩm và văn phòng phẩm", "Chứng từ và tài liệu", "Hàng thủ công mỹ nghệ",
  "Đồ chơi và sản phẩm trẻ em", "Hàng mẫu và sản phẩm quảng cáo", "Gốm sứ, thủy tinh và đồ dễ vỡ",
  "Tranh, tác phẩm nghệ thuật và đồ sưu tầm", "Đồ nội thất và trang trí nội thất", "Đồng hồ và phụ kiện",
  "Trang sức, đá quý và kim loại quý", "Sản phẩm dành cho thú cưng", "Dụng cụ thể thao và dã ngoại",
  "Vật phẩm tôn giáo và thờ cúng", "Công cụ, dụng cụ và đồ nghề", "Máy móc cơ khí, thiết bị và phụ tùng",
  "Phụ tùng ô tô, xe máy", "Thiết bị có pin", "Nhạc cụ và phụ kiện âm nhạc", "Sản phẩm nhựa", "Sản phẩm kim loại",
  "Bao bì, chai lọ và vật tư đóng gói", "Nguyên liệu và vật tư công nghiệp", "Vật liệu và phụ kiện xây dựng",
  "Chất lỏng, dung dịch và sản phẩm dạng gel", "Dầu, tinh dầu và sản phẩm chứa dầu", "Bột, hạt và nguyên liệu dạng rời",
  "Sơn, mực, keo và chất kết dính", "Hóa chất và chế phẩm hóa học", "Mẫu thử và mẫu phòng thí nghiệm",
  "Hành lý và đồ dùng chuyển nhà", "Hàng hóa khác"
];

const CAT_SUGGEST: Record<string, Array<{ en: string; vi: string; hs: string }>> = {
  "Quần áo và hàng may mặc": [{ en: "T-shirt", vi: "Áo thun", hs: "6109" }, { en: "Dress", vi: "Váy", hs: "6204" }, { en: "Jeans", vi: "Quần jean", hs: "6203" }, { en: "Jacket", vi: "Áo khoác", hs: "6201" }],
  "Thực phẩm khô": [{ en: "Dried fruit", vi: "Trái cây sấy", hs: "0813" }, { en: "Instant noodles", vi: "Mì ăn liền", hs: "1902" }, { en: "Dried seaweed", vi: "Rong biển khô", hs: "1212" }],
  "Mỹ phẩm": [{ en: "Lipstick", vi: "Son môi", hs: "3304" }, { en: "Face cream", vi: "Kem dưỡng da", hs: "3304" }, { en: "Perfume", vi: "Nước hoa", hs: "3303" }],
  "Đồ dùng cá nhân": [{ en: "Toothbrush", vi: "Bàn chải", hs: "9603" }, { en: "Towel", vi: "Khăn", hs: "6302" }, { en: "Comb", vi: "Lược", hs: "9615" }],
  "Thực phẩm chức năng": [{ en: "Vitamin supplement", vi: "Vitamin", hs: "2106" }, { en: "Collagen", vi: "Collagen", hs: "2106" }, { en: "Fish oil", vi: "Dầu cá", hs: "1504" }],
  "Thuốc, dược phẩm và thiết bị y tế": [{ en: "Medicine", vi: "Thuốc", hs: "3004" }, { en: "Face mask", vi: "Khẩu trang", hs: "6307" }, { en: "Thermometer", vi: "Nhiệt kế", hs: "9025" }],
  "Quà tặng và đồ lưu niệm": [{ en: "Keychain", vi: "Móc khóa", hs: "8308" }, { en: "Souvenir", vi: "Đồ lưu niệm", hs: "" }, { en: "Postcard", vi: "Bưu thiếp", hs: "4909" }],
  "Giày dép": [{ en: "Sneakers", vi: "Giày thể thao", hs: "6404" }, { en: "Sandals", vi: "Dép", hs: "6402" }, { en: "Leather shoes", vi: "Giày da", hs: "6403" }],
  "Đồ da, túi xách và phụ kiện thời trang": [{ en: "Handbag", vi: "Túi xách", hs: "4202" }, { en: "Wallet", vi: "Ví da", hs: "4202" }, { en: "Belt", vi: "Thắt lưng", hs: "4203" }],
  "Nông sản và sản phẩm từ thực vật": [{ en: "Coffee beans", vi: "Cà phê hạt", hs: "0901" }, { en: "Cashew nuts", vi: "Hạt điều", hs: "0801" }, { en: "Pepper", vi: "Tiêu", hs: "0904" }],
  "Điện thoại, máy tính và thiết bị công nghệ": [{ en: "Smartphone", vi: "Điện thoại", hs: "8517" }, { en: "Laptop", vi: "Máy tính xách tay", hs: "8471" }, { en: "Tablet", vi: "Máy tính bảng", hs: "8471" }],
  "Điện tử, thiết bị điện và linh kiện": [{ en: "Earphone", vi: "Tai nghe", hs: "8518" }, { en: "Charger", vi: "Sạc", hs: "8504" }, { en: "Cable", vi: "Cáp", hs: "8544" }],
  "Đồ gia dụng và vật dụng nhà bếp": [{ en: "Cookware", vi: "Nồi chảo", hs: "7323" }, { en: "Cup", vi: "Ly cốc", hs: "3924" }, { en: "Cutlery", vi: "Dao muỗng nĩa", hs: "8215" }],
  "Sách, ấn phẩm và văn phòng phẩm": [{ en: "Book", vi: "Sách", hs: "4901" }, { en: "Notebook", vi: "Sổ tay", hs: "4820" }, { en: "Pen", vi: "Bút", hs: "9608" }],
  "Chứng từ và tài liệu": [{ en: "Documents", vi: "Chứng từ", hs: "4907" }, { en: "Contract", vi: "Hợp đồng", hs: "" }],
  "Hàng thủ công mỹ nghệ": [{ en: "Handicraft", vi: "Đồ thủ công", hs: "4602" }, { en: "Bamboo product", vi: "Sản phẩm tre", hs: "4602" }, { en: "Embroidery", vi: "Đồ thêu", hs: "" }],
  "Đồ chơi và sản phẩm trẻ em": [{ en: "Toy", vi: "Đồ chơi", hs: "9503" }, { en: "Plush toy", vi: "Thú nhồi bông", hs: "9503" }, { en: "Baby clothes", vi: "Quần áo trẻ em", hs: "6111" }],
  "Thiết bị có pin": [{ en: "Power bank", vi: "Sạc dự phòng", hs: "8507" }, { en: "Battery", vi: "Pin", hs: "8506" }, { en: "Electric toy", vi: "Đồ chơi dùng pin", hs: "9503" }],
  "Hàng hóa khác": [{ en: "General goods", vi: "Hàng hóa khác", hs: "" }]
};

const ADDONS = [
  { n: 'Phát có chữ ký người nhận', d: 'Yêu cầu người nhận ký xác nhận (Signature Required)' },
  { n: 'Đóng gói hộ', d: 'Việt An đóng gói / gia cố kiện hàng' },
  { n: 'Gửi email thông báo', d: 'Tự động email trạng thái cho người nhận' },
  { n: 'Đóng thuế hộ (DDP)', d: 'Việt An ứng & đóng thuế nhập khẩu đầu nhận' },
  { n: 'Khai giá / Bảo hiểm hàng', d: 'Khai giá trị để bảo hiểm rủi ro' },
  { n: 'Lấy hàng tận nơi', d: 'Nhân viên tới địa chỉ lấy hàng' },
  { n: 'Dán nhãn Fragile (dễ vỡ)', d: 'Xử lý nhẹ tay, dán cảnh báo dễ vỡ' },
  { n: 'Kiểm đếm chi tiết', d: 'Đếm & chụp ảnh từng món trước khi gửi' }
];

const BRANCHES = ['TP.HCM', 'Hà Nội', 'Huế', 'Bảo Lộc', 'Cần Thơ'];

let ORDERS: any[] = [
  { seq: 8, bill: '6156979', connect: '', ref: 'PO-A100', cnee: 'LINEX CO. LTD', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '09/09/2026 09:12', sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 8.0 kg', content: 'CONSOL', track: '—', pod: null, photos: 2 },
  { seq: 7, bill: '6156829', connect: '', ref: '', cnee: 'NGUYEN DAI QUANG', ct: 'Belgium', route: 'Chuyên tuyến - EU', branch: 'Hà Nội', created: '09/09/2026 08:50', sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 13.5 kg', content: 'THỰC PHẨM', track: '—', pod: null, photos: 1 },
  { seq: 6, bill: '6156540', connect: 'TollVIP-AU-33912', ref: 'PO-778', cnee: 'XIEU BINH THAI', ct: 'Australia', route: 'Chuyên tuyến - AU_Toll Vip', branch: 'Huế', created: '08/09/2026 14:02', sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 5.0 kg', content: 'AO DAI (100% COTTON)', track: '6156540', pod: null, photos: 2 },
  { seq: 5, bill: '6156452', connect: '1Z9A8X0312', ref: '', cnee: 'SIMON RUSSAK', ct: 'United States', route: 'DHL - Singapore', branch: 'TP.HCM', created: '08/09/2026 13:30', sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 0.5 kg', content: 'Stainless steel bracelet', track: '8371739935', pod: null, photos: 3 },
  { seq: 4, bill: '6155755', connect: '6155755SG', ref: 'PO-551', cnee: 'Rachael Lee', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Bảo Lộc', created: '08/09/2026 10:11', sent: '08/09/2026', type: 'PACK', st: 'nd', pcs: '7 kiện · 164.5 kg', content: "WOMEN'S FLOWER DRESS", track: '6155755', pod: null, photos: 2 },
  { seq: 3, bill: '6154952', connect: '6154952SG', ref: '', cnee: 'LINEX CO. LTD', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '05/09/2026 09:20', sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '1 kiện · 6.0 kg', content: 'CONSOL', track: '6154952', pod: { date: '05/09/2026', time: '16:40', signer: 'LIM C.S.' }, photos: 1 },
  { seq: 2, bill: '6154891', connect: '6154891SG', ref: 'PO-330', cnee: 'CJI-ARDYAN', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Cần Thơ', created: '05/09/2026 08:40', sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '3 kiện · 39.0 kg', content: 'FALSE EYELASHES', track: '6154891', pod: { date: '05/09/2026', time: '15:05', signer: 'ARDYAN' }, photos: 2 },
  { seq: 1, bill: '6155057', connect: 'DHL-VN-8726187061', ref: '', cnee: 'TERANA, S.A.', ct: 'Mexico', route: 'DHL - VN', branch: 'Hà Nội', created: '02/09/2026 11:00', sent: '02/09/2026', type: 'DOC', st: 'late', pcs: '1 · 0.5 kg', content: 'Document', track: '8726187061', pod: null, photos: 1 }
];

let DRAFTS: any[] = [
  { id: 'd1', stt: 'draft', cnee: 'HOANG LE', ct: 'United States', service: 'KSN-SEA-USA-UPS', branch: 'TP.HCM', ref: 'PO-889', pcs: '2 kiện · 30.0 kg', content: 'HẠT SEN / HẠT BÍ', date: '09/09/2026 10:12' },
  { id: 'd2', stt: 'ready', cnee: 'Rachael Lee', ct: 'Singapore', service: 'Chuyên tuyến - Singapore', branch: 'Bảo Lộc', ref: 'PO-551', pcs: '1 kiện · 8.0 kg', content: 'Váy hoa nữ', date: '09/09/2026 09:40' }
];

let orderSeq = 9;
let billSeq = 6156980;

const ST: Record<string, [string, string]> = {
  wait: ['b-wait', 'Chưa đi'],
  fly: ['b-fly', 'Đã đi'],
  nd: ['b-nd', 'Chưa phát'],
  ok: ['b-ok', 'Đã phát'],
  late: ['b-late', 'Vượt ngày']
};

const SICON: Record<string, [string, string, string]> = {
  wait: ['', 'Chưa đi', 'var(--blue)'],
  fly: ['', 'Đã đi', 'var(--green-d)'],
  nd: ['', 'Chưa phát', 'var(--amber)'],
  ok: ['', 'Đã phát', 'var(--green-dd)'],
  late: ['', 'Vượt ngày', 'var(--red)']
};

const STRANK: Record<string, number> = { wait: 1, fly: 2, nd: 3, ok: 4, late: 5 };
const CURSYM: Record<string, string> = { USD: '$', EUR: '€', VND: '₫' };

const CRUMBS: Record<string, string> = {
  home: 'Trang chủ',
  create: 'Tạo đơn hàng',
  'create-ai': 'Tạo đơn bằng AI (thử nghiệm)',
  drafts: 'Đơn nháp & chưa in',
  orders: 'Đơn hàng của tôi',
  price: 'Giá & gợi ý chọn dịch vụ',
  ecom: 'Kênh bán hàng (E-commerce)',
  trouble: 'Quản lý sự cố',
  pickup: 'Đặt lịch Pickup',
  import: 'Tạo đơn từ Excel',
  noti: 'Thông báo',
  help: 'Trợ giúp & Góp ý',
  api: 'API Tracking',
  pass: 'Đổi mật khẩu'
};

const CARRIER_RULES: Record<string, any> = {
  _default: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 200, nonWeight: 100 },
  DHL: { maxSide: 120, maxSum: 300, maxWeight: 31.5, nonSide: 120, nonWeight: 70 },
  Fedex: { maxSide: 121, maxSum: 330, maxWeight: 31.5, nonSide: 121, nonWeight: 68 },
  UPS: { maxSide: 122, maxSum: 330, maxWeight: 31.5, nonSide: 122, nonWeight: 70 },
  Aramex: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 150, nonWeight: 70 },
  'Chuyên tuyến': { maxSide: 150, maxSum: 330, maxWeight: 45, nonSide: 220, nonWeight: 120 },
  Ecommerce: { maxSide: 100, maxSum: 250, maxWeight: 20, nonSide: 150, nonWeight: 50 },
  SEA: { maxSide: 300, maxSum: 600, maxWeight: 1000, nonSide: 600, nonWeight: 2000 }
};

const NOTIS = [
  { id: 1, imp: true, unread: true, title: 'Lịch nghỉ lễ Quốc Khánh 2/9 & lịch cut-off', date: '28/08/2026', body: 'Việt An Express thông báo lịch cut-off dịp lễ 2/9 cho tuyến Singapore (DHL Sin, Fedex Sin, UPS Sin, Chuyên tuyến Sin):\n\n• Hàng có phụ thu (phí hải quan): cut-off 14:00 thứ Sáu 28/08.\n• Hàng thông thường: cut-off 11:30 thứ Bảy 29/08.\n\nCác đơn đến sau mốc trên sẽ bay chuyến sớm nhất sau lễ (dự kiến 03/09). Vui lòng chủ động gửi hàng đúng giờ.' },
  { id: 2, imp: true, unread: true, title: 'US CPSC — yêu cầu e-Filing mới từ 08/07/2026', date: '07/07/2026', body: 'Từ 08/07/2026, việc nộp hồ sơ điện tử (e-Filing) trở thành bắt buộc với hàng đi US, và áp dụng ngưỡng miễn thuế EU De Minimis với hàng đi EU qua Fedex. Quý khách vui lòng khai đầy đủ HS code & giá trị hàng để tránh giữ hàng tại hải quan.' },
  { id: 3, imp: false, unread: false, title: 'Cập nhật phụ phí xăng dầu tháng 9/2026', date: '01/09/2026', body: 'Phụ phí nhiên liệu (fuel surcharge) các hãng DHL/Fedex/UPS điều chỉnh áp dụng từ 01/09/2026. Xem chi tiết trong mục Hỗ trợ.' },
  { id: 4, imp: false, unread: false, title: 'Bảo trì hệ thống 15/09 (22:00–24:00)', date: '10/09/2026', body: 'Hệ thống sẽ bảo trì nâng cấp từ 22:00 đến 24:00 ngày 15/09/2026. Trong thời gian này việc tạo đơn có thể gián đoạn. Mong Quý khách thông cảm.' }
];

let PICKUPS = [
  { date: '08/09/2026', slot: '13:00 – 17:00', pcs: 3, st: 'ok', stx: 'Đã lấy hàng' },
  { date: '10/09/2026', slot: '09:00 – 12:00', pcs: 1, st: 'wait', stx: 'Chờ xác nhận' }
];

const TRB_TYPES = ['Giao chậm / trễ hẹn', 'Thất lạc kiện hàng', 'Hư hỏng / vỡ hàng', 'Thiếu hàng trong kiện', 'Sai thông tin người nhận', 'Phát sai địa chỉ', 'Vấn đề phụ phí / cước', 'Yêu cầu giữ / đổi địa chỉ', 'Khác'];
const TRB_LV: Record<string, [string, string]> = { low: ['b-lo', 'Thường'], mid: ['b-mid', 'Gấp'], high: ['b-hi', 'Rất gấp'] };
const TRB_ST: Record<string, [string, string]> = { new: ['b-wait', 'Mới'], doing: ['b-fly', 'Đang xử lý'], waitc: ['b-nd', 'Chờ khách phản hồi'], done: ['b-ok', 'Đã xử lý'] };

let TROUBLES = [
  { id: 'TRB-1024', bill: '6155755', cnee: 'Rachael Lee', ct: 'Singapore', type: 'Giao chậm / trễ hẹn', lv: 'mid', desc: 'Đơn quá 3 ngày chưa phát, khách hối gấp.', req: 'Nguyễn Văn A', contact: '0901 234 567', date: '09/09/2026 08:20', status: 'doing', reply: 'CS Việt An: Đang liên hệ hãng bay kiểm tra hành trình, sẽ cập nhật trong hôm nay. Cảm ơn Quý khách.' }
];
let trbSeq = 1025;

const SRC: Record<string, [string, string, string]> = {
  tiktok: ['', 'TikTok', 'src-tiktok'],
  shopify: ['', 'Shopify', 'src-shopify'],
  shopee: ['', 'Shopee', 'src-shopee'],
  lazada: ['', 'Lazada', 'src-lazada'],
  api: ['', 'API', 'src-api'],
  excel: ['', 'Excel', 'src-excel'],
  manual: ['', 'Tay', 'src-manual']
};

const ECOM_ST: Record<string, [string, string, string]> = {
  created: ['', 'Đã tạo', 'b-fly'],
  picked_up: ['', 'Đã lấy', 'b-wait'],
  departed: ['', 'Đã đi', 'b-fly'],
  delivered: ['', 'Đã phát', 'b-ok'],
  exception: ['', 'Lỗi', 'b-late'],
  weighing: ['', 'Chờ cân đo', 'b-nd']
};

let ECOM: any[] = [
  { src: 'tiktok', ref: 'TT-88213', bill: '6156991', cnee: 'Emma W.', ct: 'Singapore', items: 3, kg: 1.2, st: 'created', note: '' },
  { src: 'shopify', ref: '#1042', bill: '6156990', cnee: 'John Lee', ct: 'Australia', items: 2, kg: 0.8, st: 'picked_up', note: '' },
  { src: 'excel', ref: 'ORD-501', bill: '6156989', cnee: 'Marie Curie', ct: 'Belgium', items: 1, kg: 0.5, st: 'created', note: '' },
  { src: 'api', ref: 'A-77120', bill: '6156988', cnee: 'Tanaka K.', ct: 'United States', items: 4, kg: 2.1, st: 'departed', note: '' },
  { src: 'shopee', ref: 'SP-3391', bill: '', cnee: 'Nguyen T.', ct: 'Malaysia', items: 2, kg: 0, st: 'exception', note: 'Thiếu HS code' },
  { src: 'manual', ref: 'TT-90011', bill: '6156987', cnee: 'David C.', ct: 'Canada', items: 1, kg: 0.3, st: 'delivered', note: '' },
  { src: 'lazada', ref: 'LZ-2201', bill: '6156986', cnee: 'Siti R.', ct: 'Singapore', items: 2, kg: 0, st: 'weighing', note: 'Chờ VA cân đo' },
  { src: 'tiktok', ref: 'TT-88190', bill: '6156985', cnee: 'Chen W.', ct: 'China', items: 5, kg: 3.4, st: 'created', note: '' }
];

const PRICE_NOTE = 'Giá trên là ước tính, chưa bao gồm các phí charge khác căn cứ theo mặt hàng và của hãng bay quy định thêm. Vui lòng đọc quy định của hãng và liên hệ nhân viên Việt An để được tư vấn thêm.';
const PRICE_STEPS = (() => {
  const a: number[] = [];
  for (let w = 0.5; w <= 70.0001; w += 0.5) a.push(+w.toFixed(1));
  return a;
})();

const PRICE_SEED = [
  { name: 'DHL', account: 'DHL Express', fsc: 0.28, vat: 0.08, ms: 120, mw: 30, fee: 500000, dz: 4, eta: '2–4 ngày', z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 }, base: { 1: 180000, 2: 230000, 3: 290000, 4: 360000, 5: 440000 }, step: { 1: 70000, 2: 95000, 3: 125000, 4: 160000, 5: 200000 } },
  { name: 'Fedex', account: 'FedEx IP', fsc: 0.27, vat: 0.08, ms: 121, mw: 30, fee: 500000, dz: 4, eta: '2–4 ngày', z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 }, base: { 1: 185000, 2: 235000, 3: 300000, 4: 365000, 5: 450000 }, step: { 1: 72000, 2: 96000, 3: 128000, 4: 162000, 5: 205000 } },
  { name: 'UPS', account: 'UPS Worldwide', fsc: 0.29, vat: 0.08, ms: 122, mw: 30, fee: 520000, dz: 4, eta: '2–5 ngày', z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 }, base: { 1: 190000, 2: 240000, 3: 295000, 4: 370000, 5: 460000 }, step: { 1: 74000, 2: 98000, 3: 126000, 4: 165000, 5: 208000 } },
  { name: 'Aramex', account: 'Aramex', fsc: 0.22, vat: 0.08, ms: 120, mw: 30, fee: 450000, dz: 3, eta: '3–6 ngày', z: { 'United Arab Emirates': 1, Singapore: 2, Malaysia: 2, China: 2, Taiwan: 2, Belgium: 3, Australia: 3, 'United States': 4, Canada: 4, Mexico: 4 }, base: { 1: 150000, 2: 210000, 3: 320000, 4: 420000 }, step: { 1: 60000, 2: 85000, 3: 120000, 4: 160000 } },
  { name: 'Chuyên tuyến', account: 'Chuyên tuyến US', fsc: 0.10, vat: 0.08, ms: 150, mw: 45, fee: 350000, dz: 3, eta: '4–8 ngày', z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 2, Belgium: 3, 'United States': 3, Canada: 3, 'United Arab Emirates': 3, Mexico: 3 }, base: { 1: 140000, 2: 190000, 3: 250000 }, step: { 1: 55000, 2: 80000, 3: 110000 } },
  { name: 'SEA', account: 'Sea freight', fsc: 0.05, vat: 0.08, ms: 300, mw: 1000, fee: 0, dz: 3, eta: '20–40 ngày', z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 2, Belgium: 3, 'United States': 3, Canada: 3, 'United Arab Emirates': 3, Mexico: 3 }, base: { 1: 90000, 2: 120000, 3: 160000 }, step: { 1: 22000, 2: 30000, 3: 42000 } }
];

function slugify(s: string): string {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('svc' + Date.now());
}

function mkSvc(sd: any): any {
  const zn = Object.keys(sd.base).map(Number).sort((a, b) => a - b);
  const price: Record<number, number[]> = {}, over70: Record<number, number> = {};
  zn.forEach(z => {
    price[z] = PRICE_STEPS.map((_, i) => sd.base[z] + (sd.step[z] || 0) * i);
    over70[z] = (sd.step[z] || 0) * 2;
  });
  const sur: any[] = [];
  if (sd.fee > 0) {
    sur.push({ wFrom: sd.mw, wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: sd.fee });
    sur.push({ wFrom: '', wTo: '', dFrom: sd.ms, dTo: '', gFrom: '', gTo: '', fee: sd.fee });
  }
  return {
    id: slugify(sd.name),
    name: sd.name,
    account: sd.account || '',
    fsc: sd.fsc,
    vat: sd.vat,
    eta: sd.eta || '',
    effFrom: sd.effFrom || '2026-01-01',
    effTo: sd.effTo || '2026-12-31',
    zones: zn.map(z => 'Zone ' + z),
    zmap: Object.assign({}, sd.z),
    dz: sd.dz || zn[0],
    price,
    over70,
    sur
  };
}

const PRICE_KEY = 'va_price_svcs_v1';
function loadPrice(): any[] {
  try {
    const r = localStorage.getItem(PRICE_KEY);
    if (r) {
      const a = JSON.parse(r);
      if (Array.isArray(a) && a.length) return a;
    }
  } catch (e) {}
  return PRICE_SEED.map(mkSvc);
}
function savePrice(): void {
  try {
    localStorage.setItem(PRICE_KEY, JSON.stringify(PRICE_SVCS));
  } catch (e) {}
}
let PRICE_SVCS: any[] = loadPrice();

const AI_ITEMS = [
  { key: 'ao-thun', label: 'Áo thun', emoji: '', en: "Men's cotton T-shirt", vi: 'Áo thun cotton nam', mnf: 'Cty May Việt Tiến, TP.HCM, VN', mat: 'Cotton 100%', origin: 'VN', hs: ['6109.10', '6109.90', '6205.20'], unit: 'PCS', qty: 2, price: 6, conf: 96 },
  { key: 'tai-nghe', label: 'Tai nghe bluetooth', emoji: '', en: 'Wireless bluetooth earbuds', vi: 'Tai nghe không dây bluetooth', mnf: 'Shenzhen Audio Co., Ltd, CN', mat: 'Nhựa ABS + pin lithium', origin: 'CN', hs: ['8518.30', '8517.62', '8518.29'], unit: 'SET', qty: 1, price: 15, conf: 92, warn: 'Có pin lithium — hàng nhạy cảm' },
  { key: 'do-choi', label: 'Đồ chơi nhựa', emoji: '', en: 'Plastic toy car', vi: 'Xe ô tô đồ chơi nhựa', mnf: 'Cty Nhựa Chợ Lớn, TP.HCM, VN', mat: 'Nhựa PP', origin: 'VN', hs: ['9503.00', '9503.90'], unit: 'PCS', qty: 3, price: 4, conf: 94 },
  { key: 'my-pham', label: 'Son môi', emoji: '', en: 'Lipstick', vi: 'Son môi', mnf: 'Cty Mỹ phẩm ABC, TP.HCM, VN', mat: 'Sáp ong, dầu dưỡng, chất tạo màu', origin: 'VN', hs: ['3304.10', '3304.99'], unit: 'PCS', qty: 5, price: 7, conf: 90, warn: 'Mỹ phẩm — có thể cần công bố' },
  { key: 'giay', label: 'Giày thể thao', emoji: '', en: 'Sports sneakers', vi: 'Giày thể thao', mnf: "Cty Giày Bình Tiên (Biti's), VN", mat: 'Vải dệt + đế cao su', origin: 'VN', hs: ['6404.11', '6404.19'], unit: 'PCS', qty: 1, price: 20, conf: 93 }
];

// UI State Variables
let step = 1, createMode = 'wizard';
let kienId = 0, invId = 0;
let FAV_CATS = ['Thực phẩm chức năng', 'Đồ chơi và sản phẩm trẻ em'];
let multiCats: string[] = [];
let pendingSummary: any = null;
let curTrbBill = '';
let pickMode = '';
let rcvEditIdx: number | null = null;
let selAddons: string[] = [];
let filter = 'all', branchFilter = 'all', sortState = { field: 'seq', dir: 'desc' }, pageSize = 20, curPage = 1;
let ecomSrcFilter = 'all';
let eprodN = 0;
let priceRows: any[] = [], priceSortState = { f: 'tong', dir: 'asc' };
let rateSel = '';
let ped: any = null;
let aiPhotos: any[] = [], aiRowId = 0, aiInited = false;

// UI Helper Functions
function toast(msg: string, type = ''): void {
  const w = document.getElementById('toasts');
  if (!w) return;
  const t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  w.appendChild(t);
  setTimeout(() => {
    t.style.opacity = '0';
    t.style.transform = 'translateY(10px)';
    t.style.transition = '.3s';
    setTimeout(() => t.remove(), 300);
  }, 2600);
}

function esc(s: any): string {
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function nowStr(): string {
  const d = new Date(), p = (x: number) => String(x).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}

function today(): string {
  const d = new Date(), p = (x: number) => String(x).padStart(2, '0');
  return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}

function fmtVnd(n: number): string {
  return (Math.round(n)).toLocaleString('vi-VN') + 'đ';
}

function fmtV(n: number): string {
  return (Math.round(n)).toLocaleString('vi-VN') + 'đ';
}

function fmtDMY(s: string): string {
  if (!s) return '—';
  const p = s.split('-');
  return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : s;
}

const _lo = (v: any) => (v === '' || v == null || isNaN(+v)) ? 0 : +v;
const _hi = (v: any) => (v === '' || v == null || isNaN(+v)) ? 1e9 : +v;

function girthA(D: number, W: number, H: number): number {
  const s = [+D || 0, +W || 0, +H || 0].sort((a, b) => b - a);
  return s[0] + (s[1] + s[2]) * 2;
}

function isPack(): boolean {
  const checked = document.querySelector('[name=ptype]:checked') as HTMLInputElement;
  return (checked || {}).value === 'PACK';
}

function bindCounters(): void {
  document.querySelectorAll('[data-count]').forEach(c => {
    const el = c as HTMLElement;
    const n = el.dataset.count || '';
    const inp = document.querySelector('[name=' + n + ']') as HTMLInputElement;
    if (!inp) return;
    const lim = LIMITS[n] || 0;
    if (lim) inp.setAttribute('maxlength', String(lim));
    const upd = () => (el.textContent = inp.value.length + (lim ? '/' + lim : ''));
    inp.addEventListener('input', upd);
    upd();
  });
}

let curView = 'create';

const ICON_MOON = '<svg viewBox="0 0 24 24"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
const ICON_SUN = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';

// Đánh dấu mục sidebar đang mở; view "create" phân biệt theo chế độ (từng bước / 1 trang)
function syncNavActive(): void {
  document.querySelectorAll<HTMLElement>('.nav a').forEach(el => {
    const on = el.dataset.view === curView && (curView !== 'create' || (el.dataset.mode || 'wizard') === createMode);
    el.classList.toggle('on', on);
  });
  document.querySelectorAll<HTMLElement>('.nav-sec').forEach(sec => {
    const hasOn = !!sec.querySelector('a.on');
    sec.classList.toggle('has-on', hasOn);
    if (hasOn) setNavSection(sec, true, false);
  });
}

function setNavSection(sec: HTMLElement, open: boolean, persist = true): void {
  sec.classList.toggle('open', open);
  sec.querySelector('.nav-parent')?.setAttribute('aria-expanded', String(open));
  if (!persist) return;
  try {
    const st = JSON.parse(localStorage.getItem('va_nav_sec') || '{}');
    st[sec.dataset.sec || ''] = open;
    localStorage.setItem('va_nav_sec', JSON.stringify(st));
  } catch (e) {}
}

// Tổng badge các mục con → hiện trên nút nhóm khi nhóm đang đóng
function updateNavSums(): void {
  document.querySelectorAll<HTMLElement>('.nav-sec').forEach(sec => {
    let n = 0;
    sec.querySelectorAll<HTMLElement>('.nav-sub .nbadge').forEach(b => {
      if (b.style.display !== 'none') n += +(b.textContent || 0) || 0;
    });
    const sum = sec.querySelector<HTMLElement>('.nsum');
    if (sum) sum.textContent = n ? String(n) : '';
  });
}

function nav(v: string): void {
  document.querySelectorAll('.view').forEach(s => ((s as HTMLElement).hidden = true));
  const target = document.getElementById('v-' + v);
  if (target) target.hidden = false;
  curView = v;
  syncNavActive();
  const crumb = document.getElementById('crumb');
  if (crumb) crumb.textContent = CRUMBS[v] || v;
  const sidebar = document.getElementById('sidebar');
  if (sidebar) sidebar.classList.remove('open');
  window.scrollTo(0, 0);

  if (v === 'drafts') renderDrafts();
  if (v === 'trouble') renderTroubles();
  if (v === 'price') doPriceLookup();
  if (v === 'create-ai') aiInit();
}

function setCreateMode(m: string): void {
  createMode = m;
  syncNavActive();
  const quick = m === 'quick';
  const vCreate = document.getElementById('v-create');
  if (vCreate) vCreate.classList.toggle('quick', quick);
  const stepRail = document.getElementById('stepRail');
  if (stepRail) stepRail.hidden = quick;
  const sub = document.getElementById('createSub');
  if (sub) sub.textContent = quick ? 'Điền tất cả trên 1 trang · tự lưu nháp' : '3 bước · tự lưu nháp';
  document.querySelectorAll<HTMLInputElement>('#modeSeg input').forEach(r => (r.checked = r.value === m));
  const f1 = document.getElementById('foot1');
  const f2 = document.getElementById('foot2');
  const fb = document.getElementById('foot3back');

  if (quick) {
    document.querySelectorAll<HTMLElement>('.wstep').forEach(s => (s.hidden = false));
    if (f1) f1.hidden = true;
    if (f2) f2.hidden = true;
    if (fb) fb.style.display = 'none';
    renderDrafts();
  } else {
    if (f1) f1.hidden = false;
    if (f2) f2.hidden = false;
    if (fb) fb.style.display = '';
    setStep(step);
  }
  const qd = document.getElementById('quickDrafts');
  if (qd) qd.hidden = !quick;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function go(n: number): void {
  if (n > step && !validate(step)) return;
  setStep(n);
}

function setStep(n: number): void {
  step = n;
  document.querySelectorAll<HTMLElement>('.wstep').forEach(s => (s.hidden = +(s.dataset.step || 0) !== n));
  document.querySelectorAll<HTMLElement>('#stepRail .step').forEach(s => {
    const d = +(s.dataset.step || 0);
    s.classList.toggle('active', d === n);
    s.classList.toggle('done', d < n);
  });
}

function validate(n: number): boolean {
  const box = document.querySelector<HTMLElement>('.wstep[data-step="' + n + '"]');
  if (!box) return true;
  let ok = true, first: HTMLElement | null = null;
  box.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('[data-req]').forEach(c => {
    if (c.offsetParent === null) {
      c.classList.remove('err');
      return;
    }
    if (!String(c.value).trim()) {
      ok = false;
      c.classList.add('err');
      if (!first) first = c;
    } else {
      c.classList.remove('err');
    }
  });

  if (n === 2 && isPack()) {
    document.querySelectorAll<HTMLElement>('#kienBody .kien-row').forEach(r => {
      ['sl', 'pack'].forEach(k => {
        const el = r.querySelector<HTMLInputElement | HTMLSelectElement>('[data-k=' + k + ']');
        if (el) {
          if (!String(el.value).trim()) {
            ok = false;
            el.classList.add('err');
            if (!first) first = el;
          } else {
            el.classList.remove('err');
          }
        }
      });
    });
  }

  if (n === 3 && isPack()) {
    document.querySelectorAll<HTMLElement>('#invBody tr').forEach(r => {
      ['en', 'qty', 'price'].forEach(k => {
        const el = r.querySelector<HTMLInputElement | HTMLTextAreaElement>('[data-c=' + k + ']');
        if (el) {
          if (!String(el.value).trim()) {
            ok = false;
            el.classList.add('err');
            if (!first) first = el;
          } else {
            el.classList.remove('err');
          }
        }
      });
    });
  }

  if (!ok) {
    if (first) {
      (first as HTMLElement).focus();
      (first as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    toast('Còn ô bắt buộc chưa điền — mình đã tô đỏ giúp bạn');
  }
  return ok;
}

function fillHubs(): void {
  const s = (document.getElementById('service') as HTMLSelectElement)?.value || '';
  const h = document.getElementById('hub') as HTMLSelectElement;
  if (!h) return;
  h.innerHTML = '<option value="">— Chọn HUB —</option>';
  (HUBS[s] || []).forEach(x => {
    const o = document.createElement('option');
    o.textContent = x;
    h.appendChild(o);
  });
  if (HUBS[s] && HUBS[s][0]) h.value = HUBS[s][0];
  calcKien();
}

function setType(t: string): void {
  const pack = t === 'PACK';
  const packBrief = document.getElementById('packBrief');
  const docBrief = document.getElementById('docBrief');
  const kienSection = document.getElementById('kienSection');
  const invSection = document.getElementById('invSection');
  const docNoInv = document.getElementById('docNoInv');
  const over2 = document.getElementById('over2note');

  if (packBrief) packBrief.hidden = !pack;
  if (docBrief) docBrief.hidden = pack;
  if (kienSection) kienSection.hidden = !pack;
  if (invSection) invSection.hidden = !pack;
  if (docNoInv) docNoInv.hidden = pack;
  if (!pack && over2) over2.hidden = true;
  updateMultiBox();
  calcKien();
}

// DocToPackRule: chứng từ > 2kg tự chuyển sang hàng hóa
function checkDocWeight(el: HTMLInputElement): void {
  const w = parseFloat(el.value) || 0;
  if (isPack() || w <= 2) return;
  const pack = document.querySelector('[name=ptype][value="PACK"]') as HTMLInputElement;
  if (pack) pack.checked = true;
  setType('PACK');
  const content = (document.querySelector('[name=docContent]') as HTMLInputElement || {}).value;
  const brief = document.querySelector('[name=brief]') as HTMLInputElement;
  if (brief && content) brief.value = content;
  syncQuickPieces();
  const over2 = document.getElementById('over2note');
  if (over2) {
    over2.hidden = false;
    over2.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  toast('Tài liệu trên 2kg được tính là hàng hóa — đã chuyển sang khai Hàng hóa (PACK).', 'good');
}

// Số kiện / cân nặng ở bước 1 → bảng kiện ở bước 2 (khi bảng chỉ có 1 dòng)
function syncQuickPieces(): void {
  const pcsEl = document.getElementById('s1Pcs') as HTMLInputElement;
  const grossEl = document.getElementById('s1Gross') as HTMLInputElement;
  if (!pcsEl || !grossEl) return;
  if (!isPack()) {
    checkDocWeight(grossEl);
    return;
  }
  const rows = document.querySelectorAll<HTMLElement>('#kienBody .kien-row');
  if (rows.length !== 1) return;
  const pcs = Math.max(1, parseInt(pcsEl.value) || 1);
  const gross = parseFloat(grossEl.value) || 0;
  const sl = rows[0].querySelector<HTMLInputElement>('[data-k=sl]');
  const g = rows[0].querySelector<HTMLInputElement>('[data-k=g]');
  if (sl) sl.value = String(pcs);
  if (g) g.value = gross ? String(+(gross / pcs).toFixed(2)) : '';
  calcKien();
}

function updateFlag(): void {
  const country = (document.querySelector('[name=r_country]') as HTMLInputElement)?.value || '';
  const flagEl = document.getElementById('r_flag');
  if (flagEl) flagEl.textContent = FLAGS[country] || '';
}

function kienRow(d: any = {}): void {
  const id = ++kienId;
  const el = document.createElement('div');
  el.className = 'kien-row';
  el.dataset.id = String(id);
  el.innerHTML = `
    <div><input data-k="sl" type="number" min="1" value="${d.sl || 1}" oninput="calcKien()"></div>
    <div><select data-k="pack"><option value="">— Chọn —</option><option${d.pack === 'Thùng carton' ? ' selected' : ''}>Thùng carton</option><option${d.pack === 'Bao / túi' ? ' selected' : ''}>Bao / túi</option><option${d.pack === 'Pallet' ? ' selected' : ''}>Pallet</option><option${d.pack === 'Kiện gỗ' ? ' selected' : ''}>Kiện gỗ</option></select></div>
    <div><input data-k="d" type="number" value="${d.d || ''}" oninput="calcKien()" placeholder="cm"></div>
    <div><input data-k="w" type="number" value="${d.w || ''}" oninput="calcKien()" placeholder="cm"></div>
    <div><input data-k="h" type="number" value="${d.h || ''}" oninput="calcKien()" placeholder="cm"></div>
    <div><input data-k="g" type="number" value="${d.g || ''}" oninput="calcKien()" placeholder="kg"></div>
    <div class="comp"><b data-k="vol">0</b></div>
    <div><button type="button" class="xbtn" onclick="delKien(${id})">✕</button></div>`;
  const body = document.getElementById('kienBody');
  if (body) body.appendChild(el);
  calcKien();
}

function delKien(id: number): void {
  const b = document.getElementById('kienBody');
  if (!b) return;
  if (b.children.length <= 1) {
    toast('Cần ít nhất 1 kiện');
    return;
  }
  const row = b.querySelector('[data-id="' + id + '"]');
  if (row) row.remove();
  calcKien();
}

function addKien(): void {
  kienRow();
}

function calcKien(): void {
  let pcs = 0, g = 0, vol = 0;
  document.querySelectorAll<HTMLElement>('#kienBody .kien-row').forEach(r => {
    const sl = +(r.querySelector<HTMLInputElement>('[data-k=sl]')?.value || 0);
    const d = +(r.querySelector<HTMLInputElement>('[data-k=d]')?.value || 0);
    const w = +(r.querySelector<HTMLInputElement>('[data-k=w]')?.value || 0);
    const h = +(r.querySelector<HTMLInputElement>('[data-k=h]')?.value || 0);
    const gross = +(r.querySelector<HTMLInputElement>('[data-k=g]')?.value || 0);
    const v = +((d * w * h) / 5000 * (sl || 1)).toFixed(2);
    const volEl = r.querySelector('[data-k=vol]');
    if (volEl) volEl.textContent = String(v);
    pcs += sl;
    g += gross * (sl || 1);
    vol += v;
  });

  const charge = Math.max(g, vol);
  const totPcs = document.getElementById('totPcs');
  const totGross = document.getElementById('totGross');
  const totVol = document.getElementById('totVol');
  const totCharge = document.getElementById('totCharge');
  const kienCount = document.getElementById('kienCount');

  if (totPcs) totPcs.textContent = String(pcs);
  if (totGross) totGross.textContent = g.toFixed(1);
  if (totVol) totVol.textContent = vol.toFixed(1);
  if (totCharge) totCharge.textContent = charge.toFixed(1);
  if (kienCount) kienCount.textContent = pcs + ' kiện';

  const nRows = document.querySelectorAll('#kienBody .kien-row').length;
  if (!nRows) return;
  const multi = nRows > 1;
  const pcsEl = document.getElementById('s1Pcs') as HTMLInputElement;
  const grossEl = document.getElementById('s1Gross') as HTMLInputElement;
  const active = document.activeElement;
  if (isPack() && pcsEl && grossEl && active !== pcsEl && active !== grossEl) {
    pcsEl.value = String(pcs);
    grossEl.value = g ? String(+g.toFixed(2)) : '';
  }
  if (pcsEl) pcsEl.readOnly = isPack() && multi;
  if (grossEl) grossEl.readOnly = isPack() && multi;
  const hint = document.getElementById('s1Hint');
  if (hint) hint.textContent = !isPack() ? 'Chứng từ trên 2kg sẽ tự chuyển sang hàng hóa (PACK).'
    : multi ? 'Đơn có nhiều dòng kiện — tổng được tính từ bảng kiện ở bước 2.'
    : 'Khai kích thước từng kiện ở bước 2 để tính trọng lượng quy đổi.';

  renderKienWarn(evalSurcharge(g, vol));
}

function evalSurcharge(gross: number, vol: number): any[] {
  const svc = (document.getElementById('service') as HTMLSelectElement)?.value || '';
  const R = CARRIER_RULES[svc] || CARRIER_RULES._default;
  const out: any[] = [];
  document.querySelectorAll<HTMLElement>('#kienBody .kien-row').forEach((r, i) => {
    const D = +(r.querySelector<HTMLInputElement>('[data-k=d]')?.value || 0);
    const W = +(r.querySelector<HTMLInputElement>('[data-k=w]')?.value || 0);
    const H = +(r.querySelector<HTMLInputElement>('[data-k=h]')?.value || 0);
    const G = +(r.querySelector<HTMLInputElement>('[data-k=g]')?.value || 0);
    if (!D && !W && !H && !G) return;
    const longest = Math.max(D, W, H), sum = D + W + H;
    if (longest > R.nonSide || G > R.nonWeight) {
      out.push({ lv: 'crit', t: `Kiện ${i + 1}: vượt giới hạn nhận của ${svc || 'dịch vụ'}`, d: `Cạnh dài ${longest}cm / cân ${G}kg vượt mức tối đa. Cần chia nhỏ kiện hoặc chuyển sang dịch vụ Chuyên tuyến/SEA.` });
      return;
    }
    if (longest > R.maxSide) out.push({ lv: 'warn', t: `Kiện ${i + 1}: hàng quá khổ (Oversize)`, d: `Cạnh dài ${longest}cm > ${R.maxSide}cm → dễ bị phụ phí hàng cồng kềnh.` });
    if (sum > R.maxSum) out.push({ lv: 'warn', t: `Kiện ${i + 1}: tổng kích thước lớn`, d: `D+R+C = ${sum}cm > ${R.maxSum}cm → có thể bị phụ phí quá khổ.` });
    if (G > R.maxWeight) out.push({ lv: 'warn', t: `Kiện ${i + 1}: quá nặng (Overweight)`, d: `Cân ${G}kg > ${R.maxWeight}kg/kiện → phụ phí xử lý hàng nặng.` });
  });
  if (gross > 0 && vol > gross + 0.01) {
    out.push({ lv: 'info', t: 'Tính cước theo trọng lượng quy đổi', d: `Quy đổi ${vol.toFixed(1)}kg > cân thực ${gross.toFixed(1)}kg → cước tính theo ${vol.toFixed(1)}kg. Đóng gói gọn hơn để giảm cước.` });
  }
  return out;
}

function renderKienWarn(list: any[]): void {
  const el = document.getElementById('kienWarn');
  if (!el) return;
  if (!list || !list.length) {
    el.hidden = true;
    el.innerHTML = '';
    return;
  }
  el.hidden = false;
  const crit = list.some(w => w.lv === 'crit');
  el.className = 'warn-box ' + (crit ? 'red' : 'amber');
  el.innerHTML = `
    <div class="warn-head">${crit ? 'Kiện vượt giới hạn — cần xử lý' : 'Cảnh báo phụ phí kiện hàng'}</div>
    ${list.map(w => `<div class="warn-item"><span class="wi wi-${w.lv || 'warn'}"></span><div><b>${w.t}</b><div class="wd">${w.d}</div></div></div>`).join('')}
    <div class="warn-sug">→ Cân nhắc đổi dịch vụ phù hợp hoặc chia nhỏ / đóng gói lại kiện để tránh phụ phí.</div>`;
}

function invRow(d: any = {}): void {
  const id = ++invId;
  const tr = document.createElement('tr');
  tr.dataset.id = String(id);
  tr.innerHTML = `
    <td class="num-c"></td>
    <td class="desc-c" data-label="Mô tả hàng hóa">
      <textarea data-c="en" rows="1" placeholder="Tên hàng tiếng Anh *">${d.en || ''}</textarea>
      <textarea data-c="vi" rows="1" placeholder="Tên hàng tiếng Việt *">${d.vi || ''}</textarea>
      <textarea data-c="mnf" rows="1" placeholder="Nhà SX: tên & địa chỉ">${d.mnf || ''}</textarea>
    </td>
    <td class="co-c" data-label="Xuất xứ"><input data-c="origin" value="${d.origin || 'VN'}" placeholder="VN"></td>
    <td class="hs-c" data-label="Mã HS"><input data-c="hs" value="${d.hs || ''}" placeholder="HS Code"></td>
    <td class="qty-c" data-label="Số lượng / ĐVT">
      <div class="qtywrap">
        <input data-c="qty" type="number" value="${d.qty || ''}" oninput="calcInvoice()" placeholder="SL">
        <select data-c="unit"><option>PCS</option><option>BOX</option><option>KG</option><option>SET</option></select>
      </div>
    </td>
    <td class="price-c" data-label="Đơn giá"><input data-c="price" type="number" step="0.01" value="${d.price || ''}" oninput="calcInvoice()" placeholder="0.00"></td>
    <td class="sub-c" data-label="Thành tiền" data-c="sub">0</td>
    <td class="del-c"><button type="button" class="xbtn" onclick="delInv(${id})">✕<span class="dtxt"> Xóa mặt hàng</span></button></td>`;
  const b = document.getElementById('invBody');
  if (b) b.appendChild(tr);
  if (d.unit) {
    const sel = tr.querySelector('[data-c=unit]') as HTMLSelectElement;
    if (sel) sel.value = d.unit;
  }
  calcInvoice();
}

function delInv(id: number): void {
  const b = document.getElementById('invBody');
  if (!b) return;
  if (b.children.length <= 1) {
    toast('Cần ít nhất 1 mặt hàng');
    return;
  }
  const row = b.querySelector('[data-id="' + id + '"]');
  if (row) row.remove();
  calcInvoice();
}

function addInv(): void {
  invRow();
}

function calcInvoice(): void {
  const cur = (document.getElementById('cur') as HTMLSelectElement)?.value || 'USD';
  const sym = CURSYM[cur] || '$';
  let tot = 0, n = 0;
  document.querySelectorAll<HTMLElement>('#invBody tr').forEach((r, i) => {
    const num = r.querySelector('.num-c');
    if (num) num.textContent = String(i + 1);
    const q = +(r.querySelector<HTMLInputElement>('[data-c=qty]')?.value || 0);
    const p = +(r.querySelector<HTMLInputElement>('[data-c=price]')?.value || 0);
    const s = q * p;
    tot += s;
    n++;
    const sub = r.querySelector('[data-c=sub]');
    if (sub) sub.textContent = sym + s.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });
  const invTotal = document.getElementById('invTotal');
  const invCur = document.getElementById('invCur');
  const feeCur = document.getElementById('feeCur');
  const cumSummary = document.getElementById('cumSummary');
  if (invTotal) invTotal.textContent = tot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (invCur) invCur.textContent = cur;
  if (feeCur) feeCur.textContent = cur;
  if (cumSummary) cumSummary.textContent = n + ' mặt hàng';
}

function catOptions(sel: string): string {
  return '<option value="">— Chọn nhóm hàng hóa —</option>' + CATEGORIES.map(c => `<option${c === sel ? ' selected' : ''}>${c}</option>`).join('');
}

function briefCatChange(): void {
  const cat = (document.getElementById('briefCat') as HTMLInputElement || {}).value;
  const dl = document.getElementById('briefDL');
  if (dl) dl.innerHTML = (CAT_SUGGEST[cat] || []).map(x => `<option value="${x.en}">${x.vi || ''}</option>`).join('');
}

function toggleCatMenu(ev?: Event): void {
  if (ev) ev.stopPropagation();
  const m = document.getElementById('catMenu');
  if (!m) return;
  const willOpen = m.hidden;
  if (willOpen) {
    m.hidden = false;
    const inp = document.getElementById('catSearch') as HTMLInputElement;
    if (inp) {
      inp.value = '';
      setTimeout(() => {
        try { inp.focus(); } catch (e) {}
      }, 0);
    }
    renderCatMenu();
  } else {
    m.hidden = true;
  }
}

function closeCatMenu(): void {
  const m = document.getElementById('catMenu');
  if (m) m.hidden = true;
}

function catItemHtml(c: string, cur: string): string {
  const escName = c.replace(/'/g, "\\'");
  return `<div class="catdd-item ${c === cur ? 'on' : ''}" onclick="selectCat('${escName}')"><span class="nm">${c}</span><button type="button" class="catdd-star ${FAV_CATS.includes(c) ? 'fav' : ''}" title="Đánh dấu nhóm thường dùng" onclick="toggleCatFav(event,'${escName}')">★</button></div>`;
}

function renderCatMenu(): void {
  const q = ((document.getElementById('catSearch') as HTMLInputElement)?.value || '').toLowerCase();
  const cur = (document.getElementById('briefCat') as HTMLInputElement)?.value || '';
  const L = document.getElementById('catMenuList');
  if (!L) return;
  const m = (c: string) => c.toLowerCase().includes(q);
  const favs = CATEGORIES.filter(c => FAV_CATS.includes(c) && m(c));
  const all = CATEGORIES.filter(m);
  let h = '';
  if ('nhiều loại hàng'.includes(q)) {
    h += `<div class="catdd-item ${cur === 'Nhiều loại hàng' ? 'on' : ''}" style="background:var(--green-tint2);font-weight:600" onclick="selectCat('__MULTI__')"><span class="nm">Nhiều loại hàng <span style="color:var(--muted);font-weight:400;font-size:11px">— chọn nhiều nhóm</span></span></div>`;
  }
  if (favs.length) h += '<div class="catdd-sec">Nhóm thường dùng</div>' + favs.map(c => catItemHtml(c, cur)).join('');
  h += '<div class="catdd-sec">Tất cả nhóm (' + CATEGORIES.length + ')</div>' + all.map(c => catItemHtml(c, cur)).join('');
  L.innerHTML = h;
}

function multiLbl(): string {
  return 'Nhiều loại hàng' + (multiCats.length ? ' · ' + multiCats.length + ' nhóm' : '');
}

function selectCat(c: string): void {
  const multi = (c === '__MULTI__');
  const val = multi ? 'Nhiều loại hàng' : c;
  const brief = document.getElementById('briefCat') as HTMLInputElement;
  const lbl = document.getElementById('catBtnLbl');
  if (brief) brief.value = val;
  if (lbl) lbl.textContent = multi ? multiLbl() : val;
  briefCatChange();
  closeCatMenu();
  updateMultiBox();
  if (multi) openMultiPick();
}

function updateMultiBox(): void {
  const on = isPack() && (document.getElementById('briefCat') as HTMLInputElement)?.value === 'Nhiều loại hàng';
  const box = document.getElementById('multiBox');
  if (box) {
    box.hidden = !on;
    if (on) renderMultiTable();
  }
}

function openMultiPick(): void {
  renderMultiPickList();
  const m = document.getElementById('multiModal');
  if (m) {
    m.classList.add('show');
    setTimeout(() => {
      try { (document.getElementById('multiSearch') as HTMLElement)?.focus(); } catch (e) {}
    }, 0);
  }
}

function closeMultiPick(): void {
  const m = document.getElementById('multiModal');
  if (m) m.classList.remove('show');
}

function renderMultiPickList(): void {
  const q = ((document.getElementById('multiSearch') as HTMLInputElement)?.value || '').toLowerCase();
  const L = document.getElementById('multiPickList');
  if (!L) return;
  L.innerHTML = '';
  CATEGORIES.filter(c => c.toLowerCase().includes(q)).forEach(c => {
    const el = document.createElement('label');
    el.className = 'check-item';
    el.innerHTML = `<input type="checkbox" ${multiCats.includes(c) ? 'checked' : ''} onchange="multiTally()" value="${c.replace(/"/g, '&quot;')}"><div class="cti"><b>${c}</b></div>`;
    L.appendChild(el);
  });
  multiTally();
}

function multiTally(): void {
  const n = document.querySelectorAll('#multiPickList input:checked').length;
  const e = document.getElementById('multiSel');
  if (e) e.textContent = 'Đã chọn ' + n + ' nhóm';
}

function applyMulti(): void {
  multiCats = Array.from(document.querySelectorAll<HTMLInputElement>('#multiPickList input:checked')).map(x => x.value);
  const lbl = document.getElementById('catBtnLbl');
  if (lbl) lbl.textContent = multiLbl();
  renderMultiTable();
  updateMultiBox();
  closeMultiPick();
  toast(multiCats.length ? ('Đã chọn ' + multiCats.length + ' nhóm hàng') : 'Chưa chọn nhóm nào');
}

function renderMultiTable(): void {
  const b = document.getElementById('multiBody');
  if (!b) return;
  b.innerHTML = '';
  multiCats.forEach((c, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td class="tnum" style="width:40px">${i + 1}</td><td class="cnee">${c}</td><td class="muted">—</td><td style="width:44px"><button type="button" class="xbtn" onclick="rmMulti('${c.replace(/'/g, "\\'")}')">✕</button></td>`;
    b.appendChild(tr);
  });
  if (!multiCats.length) b.innerHTML = '<tr><td colspan="4" class="muted" style="text-align:center;padding:16px">Chưa chọn nhóm nào — bấm "＋ Thêm / sửa nhóm".</td></tr>';
  const cc = document.getElementById('multiCount');
  if (cc) cc.textContent = multiCats.length + ' nhóm';
}

function rmMulti(c: string): void {
  multiCats = multiCats.filter(x => x !== c);
  renderMultiTable();
  const lbl = document.getElementById('catBtnLbl');
  if (lbl) lbl.textContent = multiLbl();
}

function toggleCatFav(ev: Event, c: string): void {
  ev.stopPropagation();
  const was = FAV_CATS.includes(c);
  FAV_CATS = was ? FAV_CATS.filter(x => x !== c) : [c, ...FAV_CATS];
  renderCatMenu();
  toast(was ? ('Đã bỏ "' + c + '" khỏi thường dùng') : ('Đã ghim "' + c + '" vào nhóm thường dùng'));
}

function orderSummary(): any {
  const g = (n: string) => (document.querySelector('[name=' + n + ']') as HTMLInputElement || {}).value || '';
  const hub = (document.getElementById('hub') as HTMLSelectElement)?.value || '';
  const pack = isPack();
  const pcs = document.getElementById('totPcs')?.textContent || '1';
  const charge = document.getElementById('totCharge')?.textContent || '0';
  return {
    cnee: g('r_company') || '(chưa đặt tên)',
    ct: g('r_country') || '—',
    service: hub || g('service') || '—',
    branch: g('branch') || 'TP.HCM',
    ref: g('ref') || '',
    pcs: pack ? (pcs + ' kiện · ' + charge + ' kg') : ((g('pcs') || '1') + ' kiện' + (g('gross') ? ' · ' + g('gross') + ' kg' : '')),
    content: pack ? (g('brief') || 'Hàng hóa') : (g('docContent') || 'Chứng từ'),
    date: nowStr(),
    charge: pack ? (+charge || 0) : (+g('gross') || 0)
  };
}

function computeFees(s: any): Array<[string, number]> {
  const f: Array<[string, number]> = [];
  if (s.charge > 0 && s.charge < 12) f.push(['Phụ phí giao nội địa (kiện < 12kg)', 500000]);
  if (['United States', 'Australia', 'Canada'].includes(s.ct)) f.push(['Phụ phí vùng sâu vùng xa', 450000]);
  return f;
}

function submitOrder(): void {
  if (createMode === 'quick') {
    if (!validate(1) || !validate(2) || !validate(3)) return;
  } else if (!validate(3)) {
    return;
  }
  pendingSummary = orderSummary();
  const fees = computeFees(pendingSummary);
  if (fees.length) {
    const tot = fees.reduce((a, b) => a + b[1], 0);
    const fl = document.getElementById('feeLines');
    const ft = document.getElementById('feeTotal');
    const fm = document.getElementById('feeModal');
    if (fl) fl.innerHTML = fees.map(f => `${f[0]}: <b style="color:var(--ink)">${fmtVnd(f[1])}</b>`).join('<br>');
    if (ft) ft.innerHTML = 'Tổng phụ phí: <span style="color:var(--red)">' + fmtVnd(tot) + '</span>';
    if (fm) fm.classList.add('show');
  } else {
    doCreate();
  }
}

function closeFee(): void {
  const fm = document.getElementById('feeModal');
  if (fm) fm.classList.remove('show');
}

function confirmCreate(): void {
  closeFee();
  doCreate();
}

function doCreate(): void {
  const s = pendingSummary || orderSummary();
  DRAFTS.unshift({ id: 'd' + Date.now(), stt: 'ready', cnee: s.cnee, ct: s.ct, service: s.service, branch: s.branch, ref: s.ref, pcs: s.pcs, content: s.content, date: s.date });
  updateDraftCount();
  toast('Đã tạo đơn (chưa in). Vào "Đơn nháp & chưa in" để In & cấp mã bill.', 'good');
  setTimeout(() => nav('drafts'), 700);
}

function saveDraft(): void {
  const s = orderSummary();
  DRAFTS.unshift({ id: 'd' + Date.now(), stt: 'draft', cnee: s.cnee, ct: s.ct, service: s.service, branch: s.branch, ref: s.ref, pcs: s.pcs, content: s.content, date: s.date });
  updateDraftCount();
  toast('Đã lưu nháp — xem ở "Đơn nháp & chưa in"');
  setTimeout(() => nav('drafts'), 700);
}

function renderDrafts(): void {
  document.querySelectorAll<HTMLElement>('.draft-body').forEach(b => {
    b.innerHTML = '';
    DRAFTS.forEach(d => {
      const ready = d.stt === 'ready';
      const badge = ready ? '<span class="badge b-ready">Chưa in</span>' : '<span class="badge b-draft">Nháp</span>';
      const tr = document.createElement('tr');
      tr.style.cursor = 'default';
      tr.innerHTML = `<td>${badge}</td><td class="cnee">${d.cnee}</td><td>${FLAGS[d.ct] || ''} ${d.ct}</td><td class="muted">${d.service}</td><td>${d.pcs}</td><td>${d.content}</td><td class="muted tnum">${d.date}</td>
       <td class="actions">
         <button class="btn ghost sm" onclick="editDraft('${d.id}')">${ready ? 'Sửa' : 'Tiếp tục'}</button>
         ${ready ? `<button class="btn primary sm" onclick="printDraft('${d.id}')">In &amp; cấp bill</button>` : `<button class="btn ghost sm" disabled style="opacity:.45;cursor:not-allowed" title="Hoàn thiện đơn trước khi in">In</button>`}
         <button class="act" title="Xóa" onclick="delDraft('${d.id}')" style="color:var(--red)">${IC.trash}</button></td>`;
      b.appendChild(tr);
    });
    if (!DRAFTS.length) b.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Chưa có đơn nháp nào. Bấm "Tạo đơn mới" để bắt đầu.</td></tr>';
  });
  const dc = document.getElementById('draftCount');
  if (dc) dc.textContent = DRAFTS.length + ' đơn (nháp / chưa in)';
}

function editDraft(id: string): void {
  nav('create');
  toast('Đang mở lại đơn để chỉnh tiếp');
}

function delDraft(id: string): void {
  const i = DRAFTS.findIndex(d => d.id === id);
  if (i < 0) return;
  const n = DRAFTS[i].cnee;
  DRAFTS.splice(i, 1);
  renderDrafts();
  updateDraftCount();
  toast('Đã xóa đơn nháp: ' + n);
}

function printDraft(id: string): void {
  const i = DRAFTS.findIndex(d => d.id === id);
  if (i < 0) return;
  const d = DRAFTS[i];
  const bill = String(billSeq++);
  ORDERS.unshift({ seq: orderSeq++, bill: bill, connect: '', ref: d.ref || '', cnee: d.cnee, ct: d.ct, route: d.service, branch: d.branch || 'TP.HCM', created: d.date, sent: '', type: 'PACK', st: 'wait', pcs: d.pcs, content: d.content, track: '—', pod: null, photos: 0 });
  DRAFTS.splice(i, 1);
  renderDrafts();
  updateDraftCount();
  renderOrders();
  toast('Đã cấp mã bill ' + bill + ' & in. Đơn chuyển sang "Đơn hàng của tôi" và đã khóa.', 'good');
  setTimeout(() => nav('orders'), 1100);
}

function updateDraftCount(): void {
  const n = DRAFTS.length;
  const e = document.getElementById('navDrafts');
  if (e) {
    e.textContent = String(n);
    e.style.display = n ? '' : 'none';
  }
  updateNavSums();
}

function openTrouble(bill: string): void {
  curTrbBill = bill;
  const o = ORDERS.find(x => x.bill === bill) || {};
  const trbCtx = document.getElementById('trbCtx');
  if (trbCtx) {
    trbCtx.innerHTML = `<div><span class="k">Mã vận đơn:</span> <b class="bill">${bill}</b></div><div><span class="k">Người nhận:</span> <b>${o.cnee || '—'}</b></div><div><span class="k">Nước đến:</span> <b>${(FLAGS[o.ct] || '') + ' ' + (o.ct || '—')}</b></div>`;
  }
  const sel = document.getElementById('trbType') as HTMLSelectElement;
  if (sel) sel.innerHTML = TRB_TYPES.map((t, i) => `<option${i === 0 ? '' : ''}>${t}</option>`).join('');
  const desc = document.getElementById('trbDesc') as HTMLTextAreaElement;
  const lv = document.getElementById('trbLv') as HTMLSelectElement;
  const m = document.getElementById('trbModal');
  if (desc) desc.value = '';
  if (lv) lv.value = 'mid';
  if (m) m.classList.add('show');
}

function closeTrb(): void {
  const m = document.getElementById('trbModal');
  if (m) m.classList.remove('show');
}

function submitTrouble(): void {
  const desc = (document.getElementById('trbDesc') as HTMLTextAreaElement)?.value.trim() || '';
  if (!desc) {
    (document.getElementById('trbDesc') as HTMLElement)?.classList.add('err');
    toast('Vui lòng mô tả chi tiết sự cố');
    return;
  }
  (document.getElementById('trbDesc') as HTMLElement)?.classList.remove('err');
  const o = ORDERS.find(x => x.bill === curTrbBill) || {};
  const type = (document.getElementById('trbType') as HTMLSelectElement)?.value || 'Khác';
  const lv = (document.getElementById('trbLv') as HTMLSelectElement)?.value || 'mid';
  const req = (document.getElementById('trbReq') as HTMLInputElement)?.value || '';
  const contact = (document.getElementById('trbContact') as HTMLInputElement)?.value || '';

  TROUBLES.unshift({
    id: 'TRB-' + (trbSeq++),
    bill: curTrbBill,
    cnee: o.cnee || '—',
    ct: o.ct || '—',
    type,
    lv,
    desc,
    req,
    contact,
    date: nowStr(),
    status: 'new',
    reply: ''
  });
  closeTrb();
  updateTrbCount();
  toast('Đã gửi báo cáo sự cố cho đơn ' + curTrbBill + ' tới CS Việt An', 'good');
  setTimeout(() => nav('trouble'), 700);
}

function renderTroubles(): void {
  const b = document.getElementById('trbBody');
  if (!b) return;
  b.innerHTML = '';
  TROUBLES.forEach(t => {
    const [lc, lx] = TRB_LV[t.lv] || ['b-mid', 'Gấp'];
    const [sc, sx] = TRB_ST[t.status] || ['b-wait', 'Mới'];
    const tr = document.createElement('tr');
    tr.onclick = e => {
      if ((e.target as HTMLElement).closest('button')) return;
      openTroubleDetail(t.id);
    };
    tr.innerHTML = `<td><span class="bill">${t.id}</span></td><td><span class="bill">${t.bill}</span><div class="muted">${t.cnee}</div></td>
      <td>${t.type}</td><td><span class="badge ${lc}">${lx}</span></td><td class="muted tnum">${t.date}</td><td><span class="badge ${sc}">${sx}</span></td>
      <td class="actions"><button class="btn ghost sm" onclick="openTroubleDetail('${t.id}')">Xem</button>
        ${t.status !== 'done' ? `<button class="btn ghost sm" onclick="remindTrouble('${t.id}')">Nhắc CS</button>` : ''}</td>`;
    b.appendChild(tr);
  });
  if (!TROUBLES.length) b.innerHTML = '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Chưa có sự cố nào. Vào "Đơn hàng của tôi" và bấm trên đơn để báo cáo.</td></tr>';
  const trbCount = document.getElementById('trbCount');
  if (trbCount) trbCount.textContent = TROUBLES.length + ' yêu cầu hỗ trợ';
}

function remindTrouble(id: string): void {
  toast('Đã gửi nhắc CS về ticket ' + id);
}

function openTroubleDetail(id: string): void {
  const t = TROUBLES.find(x => x.id === id);
  if (!t) return;
  const [lc, lx] = TRB_LV[t.lv] || ['b-mid', 'Gấp'];
  const [sc, sx] = TRB_ST[t.status] || ['b-wait', 'Mới'];
  const drBill = document.getElementById('dr-bill');
  const drBody = document.getElementById('dr-body');
  if (drBill) drBill.textContent = t.id;
  if (drBody) {
    drBody.innerHTML = `
     <div class="dr-sec" style="display:flex;gap:7px;flex-wrap:wrap"><span class="badge ${sc}">${sx}</span><span class="badge ${lc}">Ưu tiên: ${lx}</span></div>
     <div class="dr-sec"><h4>Đơn liên quan</h4>
       <div class="kv"><span class="k">Mã vận đơn</span><span class="v bill">${t.bill}</span></div>
       <div class="kv"><span class="k">Người nhận</span><span class="v">${t.cnee}</span></div>
       <div class="kv"><span class="k">Nước đến</span><span class="v">${(FLAGS[t.ct] || '') + ' ' + t.ct}</span></div></div>
     <div class="dr-sec"><h4>Nội dung sự cố</h4>
       <div class="kv"><span class="k">Loại</span><span class="v">${t.type}</span></div>
       <div style="font-size:13px;line-height:1.6;margin-top:8px">${t.desc}</div>
       <div class="muted" style="margin-top:8px">Gửi bởi ${t.req} · ${t.contact} · ${t.date}</div></div>
     ${t.reply ? `<div class="dr-sec"><h4>Phản hồi từ CS</h4><div style="background:var(--green-tint2);border:1px solid var(--line-2);border-radius:var(--r-sm);padding:11px 13px;font-size:13px;line-height:1.6">${t.reply}</div></div>` : '<div class="dr-sec"><div class="muted">Chưa có phản hồi từ CS.</div></div>'}
     <div class="dr-sec" style="display:flex;gap:8px;flex-wrap:wrap">
       ${t.status !== 'done' ? `<button class="btn ghost sm" onclick="remindTrouble('${t.id}')">Nhắc CS xử lý</button>` : ''}
       <button class="btn ghost sm" onclick="toast('Mở trao đổi thêm với CS (demo)')">Trao đổi thêm</button></div>`;
  }
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  if (drawer) drawer.classList.add('show');
  if (scrim) scrim.classList.add('show');
}

function updateTrbCount(): void {
  const n = TROUBLES.filter(t => t.status !== 'done').length;
  const e = document.getElementById('navTrb');
  if (e) {
    e.textContent = String(n);
    e.style.display = n ? '' : 'none';
  }
  updateNavSums();
}

function ecomTab(name: string): void {
  document.querySelectorAll('#v-ecom .etab').forEach(b => (b as HTMLElement).classList.toggle('on', (b as HTMLElement).dataset.etab === name));
  document.querySelectorAll<HTMLElement>('#v-ecom .etab-p').forEach(p => (p.hidden = p.dataset.etab !== name));
  if (name === 'list') {
    renderEcomSrcChips();
    renderEcom();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function pushMethod(m: string): void {
  ['api', 'excel', 'manual'].forEach(x => {
    const el = document.getElementById('pm-' + x);
    if (el) el.hidden = x !== m;
  });
}

function addEprod(): void {
  if (document.querySelectorAll('#eprodBody .eprod-row').length >= 5) {
    toast('Tối đa 5 sản phẩm / đơn');
    return;
  }
  const el = document.createElement('div');
  el.className = 'eprod-row';
  eprodN++;
  el.innerHTML = `<input placeholder="Tên hàng"><input placeholder="SKU"><input type="number" placeholder="SL" value="1"><input type="number" placeholder="FOB"><input type="number" placeholder="Giá bán"><input placeholder="HS code"><button type="button" class="xbtn" onclick="this.parentElement.remove()">✕</button>`;
  const body = document.getElementById('eprodBody');
  if (body) body.appendChild(el);
}

function renderEcomSrcChips(): void {
  const w = document.getElementById('ecomSrcChips');
  if (!w) return;
  w.innerHTML = '';
  const mk = (k: string, label: string, n: number, on: boolean) => {
    const b = document.createElement('button');
    b.className = 'chip' + (on ? ' on' : '');
    b.innerHTML = `${label} <span class="cc">${n}</span>`;
    b.onclick = () => {
      ecomSrcFilter = k;
      renderEcomSrcChips();
      renderEcom();
    };
    w.appendChild(b);
  };
  mk('all', 'Tất cả', ECOM.length, ecomSrcFilter === 'all');
  Object.keys(SRC).forEach(s => {
    const n = ECOM.filter(o => o.src === s).length;
    if (n) {
      const [, nm] = SRC[s];
      mk(s, nm, n, ecomSrcFilter === s);
    }
  });
}

function renderEcom(): void {
  const q = ((document.getElementById('ecomSearch') as HTMLInputElement)?.value || '').toLowerCase();
  const rows = ECOM.filter(o => (ecomSrcFilter === 'all' || o.src === ecomSrcFilter) && (o.ref + o.bill + o.cnee + o.ct).toLowerCase().includes(q));
  const b = document.getElementById('ecomBody');
  if (!b) return;
  b.innerHTML = '';
  rows.forEach(o => {
    const [, sn, sc] = SRC[o.src] || ['', 'Khác', 'src-manual'];
    const [, en, ec] = ECOM_ST[o.st] || ['', 'Đã tạo', 'b-fly'];
    const tr = document.createElement('tr');
    tr.innerHTML = `<td onclick="event.stopPropagation()"><input type="checkbox"></td>
     <td><span class="src ${sc}">${sn}</span></td>
     <td><span class="bill">${o.ref}</span></td>
     <td>${o.bill ? `<span class="bill">${o.bill}</span>` : '<span class="muted">—</span>'}</td>
     <td><div class="cnee">${o.cnee}</div><div class="subcell">${FLAGS[o.ct] || ''} ${o.ct}</div></td>
     <td>${o.items} SP</td>
     <td>${o.kg ? o.kg + ' kg' : '<span style="color:var(--amber)">chờ cân</span>'}</td>
     <td><span class="badge ${ec}">${en}</span></td>
     <td>${o.note ? '<span class="muted">' + o.note + '</span>' : '<span class="muted">—</span>'}</td>
     <td class="actions">
       ${o.st === 'exception' ? `<button class="btn ghost sm" onclick="toast('Thử tạo lại đơn ${o.ref} (demo)')">Thử lại</button>` : `<button class="act" title="In nhãn A6/A4/ZPL" onclick="toast('In nhãn đơn ${o.ref} (demo)')">${IC.print}</button>`}
       <button class="act" title="Xem chi tiết" onclick="toast('Xem chi tiết đơn ${o.ref} (demo)')">${IC.eye}</button></td>`;
    b.appendChild(tr);
  });
  const count = document.getElementById('ecomCount');
  if (count) count.textContent = rows.length + ' đơn e-com';
}

function copyText(t: string): void {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(t).catch(() => {});
  }
  toast('Đã sao chép');
}

function openPicker(m: string): void {
  pickMode = m;
  const M: Record<string, [string, string]> = {
    sender: ['', 'Chọn hồ sơ người gửi'],
    receiver: ['', 'Sổ địa chỉ người nhận'],
    product: ['', 'Thư viện mặt hàng']
  };
  const title = document.getElementById('mTitle');
  const search = document.getElementById('mSearch') as HTMLInputElement;
  const modal = document.getElementById('modal');

    if (title && M[m]) title.textContent = M[m][1];
  if (search) search.value = '';
  renderPicker();
  if (modal) modal.classList.add('show');
  if (search) search.focus();
}

function closeModal(): void {
  const m = document.getElementById('modal');
  if (m) m.classList.remove('show');
}

function mkPick(av: string, t: string, d: string, onChoose: () => void, actions?: string): HTMLElement {
  const el = document.createElement('div');
  el.className = 'pick';
  el.innerHTML = `<div class="pav">${av}</div><div style="flex:1;min-width:0"><div class="pn">${t}</div><div class="pd">${d}</div></div>`;
  const r = document.createElement('div');
  r.style.cssText = 'display:flex;gap:6px;align-items:center;flex:none';
  r.innerHTML = actions || '<div class="pgo">Chọn →</div>';
  el.appendChild(r);
  el.addEventListener('click', e => {
    if ((e.target as HTMLElement).closest('[data-act]')) return;
    onChoose();
  });
  return el;
}

function renderPicker(): void {
  const searchInput = document.getElementById('mSearch') as HTMLInputElement;
  const q = (searchInput?.value || '').toLowerCase();
  const L = document.getElementById('mList');
  if (!L) return;
  L.innerHTML = '';

  if (pickMode === 'sender') {
    SENDERS.forEach(s => {
      if (!(s.n + s.d).toLowerCase().includes(q)) return;
      L.appendChild(mkPick(s.n.slice(0, 2).toUpperCase(), s.n, s.d + ' · ' + s.t, () => choosePick(s)));
    });
  }
  if (pickMode === 'product') {
    PRODUCTS.forEach(p => {
      if (!(p.vi + p.en).toLowerCase().includes(q)) return;
      L.appendChild(mkPick(p.vi.slice(0, 2).toUpperCase(), p.vi + ' / ' + p.en, 'HS ' + p.hs + ' · ' + p.origin + ' · ' + p.unit, () => choosePick(p)));
    });
  }
  if (pickMode === 'receiver') {
    RECEIVERS.forEach((s, idx) => {
      if (!(s.n + s.ct + s.contact).toLowerCase().includes(q)) return;
      const acts = `<button data-act class="act" title="Sửa" onclick="editReceiver(${idx})">${IC.edit}</button><button data-act class="act" title="Xóa" onclick="deleteReceiver(${idx})" style="color:var(--red)">${IC.trash}</button>`;
      L.appendChild(mkPick(FLAGS[s.ct] || s.n.slice(0, 2).toUpperCase(), s.n, s.ct + ' · ' + s.contact + ' · ' + s.tel, () => choosePick(s), acts));
    });
  }
  if (!L.children.length) L.innerHTML = '<p class="muted" style="text-align:center;padding:18px">Không tìm thấy.</p>';
}

function choosePick(r: any): void {
  if (pickMode === 'sender') {
    setV('s_company', r.n);
    setV('s_contact', r.c);
    setV('s_tel', r.t);
    setV('s_addr', r.d);
    toast('Đã chọn hồ sơ: ' + r.n);
  }
  if (pickMode === 'receiver') {
    fillReceiver(r);
    rcvEditIdx = null;
    setRcvLbl();
    toast('Đã điền người nhận: ' + r.n);
  }
  if (pickMode === 'product') {
    invRow({ en: r.en, vi: r.vi, hs: r.hs, origin: r.origin, unit: r.unit, qty: 1, price: 0 });
    toast('Đã thêm mặt hàng: ' + r.vi);
  }
  closeModal();
}

function setV(n: string, v: string): void {
  const e = document.querySelector('[name=' + n + ']') as HTMLInputElement;
  if (e) {
    e.value = v || '';
    e.dispatchEvent(new Event('input'));
  }
}

function fillReceiver(r: any): void {
  setV('r_company', r.n);
  setV('r_country', r.ct);
  setV('r_city', r.city);
  setV('r_postal', r.postal);
  setV('r_contact', r.contact);
  setV('r_tel', r.tel);
  setV('r_addr1', r.a1);
  setV('r_addr2', r.a2);
  setV('r_addr3', r.a3);
  updateFlag();
}

function getReceiver(): any {
  const g = (n: string) => (document.querySelector('[name=' + n + ']') as HTMLInputElement || {}).value || '';
  return { n: g('r_company'), ct: g('r_country'), city: g('r_city'), postal: g('r_postal'), contact: g('r_contact'), tel: g('r_tel'), a1: g('r_addr1'), a2: g('r_addr2'), a3: g('r_addr3') };
}

function setRcvLbl(): void {
  const el = document.getElementById('saveRcvLbl');
  if (el) el.textContent = rcvEditIdx != null ? 'Cập nhật địa chỉ đã lưu' : 'Lưu vào sổ địa chỉ';
}

function saveReceiver(): void {
  const r = getReceiver();
  if (!r.n || !r.contact) {
    toast('Cần có tên công ty & người liên hệ để lưu');
    return;
  }
  if (rcvEditIdx != null) {
    RECEIVERS[rcvEditIdx] = r;
    toast('Đã cập nhật "' + r.n + '" trong sổ địa chỉ');
    rcvEditIdx = null;
  } else {
    RECEIVERS.unshift(r);
    toast('Đã lưu "' + r.n + '" vào sổ địa chỉ');
  }
  setRcvLbl();
}

function editReceiver(i: number): void {
  fillReceiver(RECEIVERS[i]);
  rcvEditIdx = i;
  setRcvLbl();
  closeModal();
  toast('Đang sửa "' + RECEIVERS[i].n + '" — chỉnh xong bấm "Cập nhật địa chỉ đã lưu"');
}

function deleteReceiver(i: number): void {
  const n = RECEIVERS[i].n;
  RECEIVERS.splice(i, 1);
  if (rcvEditIdx === i) rcvEditIdx = null;
  setRcvLbl();
  renderPicker();
  toast('Đã xóa "' + n + '" khỏi sổ địa chỉ');
}

function openAddons(): void {
  renderAddonList();
  const m = document.getElementById('addonModal');
  if (m) m.classList.add('show');
}

function closeAddons(): void {
  const m = document.getElementById('addonModal');
  if (m) m.classList.remove('show');
}

function renderAddonList(): void {
  const L = document.getElementById('addonList');
  if (!L) return;
  L.innerHTML = '';
  ADDONS.forEach(a => {
    const checked = selAddons.includes(a.n);
    const el = document.createElement('label');
    el.className = 'check-item';
    el.innerHTML = `<input type="checkbox" ${checked ? 'checked' : ''} onchange="tallyAddons()" value="${a.n}"><div class="cti"><b>${a.n}</b><span>${a.d}</span></div>`;
    L.appendChild(el);
  });
  tallyAddons();
}

function tallyAddons(): void {
  const count = document.querySelectorAll('#addonList input:checked').length;
  const e = document.getElementById('addonSel');
  if (e) e.textContent = 'Đã chọn ' + count;
}

function applyAddons(): void {
  selAddons = Array.from(document.querySelectorAll<HTMLInputElement>('#addonList input:checked')).map(x => x.value);
  renderAddonChips();
  closeAddons();
  if (selAddons.length) toast('Đã thêm ' + selAddons.length + ' dịch vụ cộng thêm');
}

function renderAddonChips(): void {
  const w = document.getElementById('addonChips');
  const empty = document.getElementById('addonEmpty');
  if (!w) return;
  w.innerHTML = '';
  if (empty) empty.style.display = selAddons.length ? 'none' : 'flex';
  selAddons.forEach(s => {
    const c = document.createElement('span');
    c.className = 'addon-chip';
    c.innerHTML = `${s} <button type="button" onclick="rmAddon('${s.replace(/'/g, "\\'")}')">✕</button>`;
    w.appendChild(c);
  });
}

function rmAddon(s: string): void {
  selAddons = selAddons.filter(x => x !== s);
  renderAddonChips();
}

// Chi nhánh gửi: ô chọn (thay hàng chip)
function renderBranchChips(): void {
  const sel = document.getElementById('branchSel') as HTMLSelectElement;
  if (!sel) return;
  const opts = [['all', 'Tất cả chi nhánh (' + ORDERS.length + ')']]
    .concat(BRANCHES.filter(br => ORDERS.some(o => o.branch === br)).map(br => [br, br + ' (' + ORDERS.filter(o => o.branch === br).length + ')']));
  sel.innerHTML = opts.map(([v, t]) => `<option value="${v}">${t}</option>`).join('');
  sel.value = branchFilter;
}

function setBranch(v: string): void {
  branchFilter = v || 'all';
  curPage = 1;
  renderOrders();
}

function setStatusTab(f: string): void {
  filter = f || 'all';
  document.querySelectorAll<HTMLElement>('#chips [data-f]').forEach(x => x.classList.toggle('on', x.dataset.f === filter));
  curPage = 1;
  renderOrders();
}

// POD dự kiến = ngày gửi + thời gian vận chuyển tham khảo theo dịch vụ
const TRANSIT_DAYS: Record<string, number> = { DHL: 3, Fedex: 3, UPS: 4, Aramex: 4, 'Chuyên tuyến': 5, Ecom: 7, SEA: 25 };
function estPod(o: any): string {
  if (o.pod || !o.sent) return '';
  const t = dParse(o.sent);
  if (!t) return '';
  const key = Object.keys(TRANSIT_DAYS).find(k => (o.route || '').startsWith(k));
  const d = new Date(t + (key ? TRANSIT_DAYS[key] : 5) * 86400000);
  const p = (x: number) => String(x).padStart(2, '0');
  return p(d.getDate()) + '/' + p(d.getMonth() + 1) + '/' + d.getFullYear();
}

function parsePcs(pcs: string): number {
  const m = (pcs || '').match(/^\s*(\d+)/);
  return m ? +m[1] : 0;
}

function openRowMenu(ev: Event, bill: string): void {
  ev.stopPropagation();
  closePmenu();
  const m = document.getElementById('omenu');
  if (!m) return;
  const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
  m.style.left = Math.min(r.left, window.innerWidth - 200) + 'px';
  m.style.top = (r.bottom + 4) + 'px';
  m.dataset.bill = bill;
  m.classList.add('show');
}

function rowDo(act: string): void {
  const bill = document.getElementById('omenu')?.dataset.bill || '';
  closePmenu();
  if (act === 'detail') openDrawerBill(bill);
  if (act === 'photos') openPhotos(bill);
  if (act === 'clone') toast('Đã mở đơn mới theo mẫu đơn ' + bill + ' (demo)');
  if (act === 'trouble') openTrouble(bill);
}

function copyTrack(kind: string, bill: string): void {
  copyText('https://vietanexpress.com.vn/track?id=' + bill + (kind === 'your' ? '&brand=1' : ''));
}

function sortOrders(f: string): void {
  if (sortState.field === f) sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
  else {
    sortState.field = f;
    sortState.dir = 'asc';
  }
  curPage = 1;
  renderOrders();
}

function sortVal(o: any, f: string): any {
  switch (f) {
    case 'st': return STRANK[o.st] || 0;
    case 'created':
    case 'sent': return dParse(o[f]);
    case 'bill': return +o.bill || 0;
    case 'pod': return o.pod ? dParse(o.pod.date + ' ' + o.pod.time) : 0;
    case 'seq': return o.seq;
    default: return (o[f] || '').toString().toLowerCase();
  }
}

function dParse(s: string): number {
  if (!s) return 0;
  const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/);
  if (!m) return 0;
  return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime();
}

function parseKg(pcs: string): number {
  const m = (pcs || '').match(/([\d.]+)\s*kg/i);
  return m ? parseFloat(m[1]) : 0;
}

function dOnly(s: string): string {
  const m = (s || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}

function applyFilter(): void {
  curPage = 1;
  renderOrders();
}

function changePageSize(): void {
  pageSize = +(document.getElementById('fPageSize') as HTMLSelectElement)?.value || 20;
  curPage = 1;
  renderOrders();
}

function clearFilters(): void {
  ['orderSearch', 'fFrom', 'fTo', 'fWFrom', 'fWTo'].forEach(id => {
    const e = document.getElementById(id) as HTMLInputElement;
    if (e) e.value = '';
  });
  const typeFilter = document.getElementById('typeFilter') as HTMLSelectElement;
  if (typeFilter) typeFilter.value = '';
  const searchBy = document.getElementById('searchBy') as HTMLSelectElement;
  if (searchBy) searchBy.value = 'all';
  branchFilter = 'all';
  setStatusTab('all');
  toast('Đã xóa bộ lọc');
}

function renderPager(total: number): void {
  const p = document.getElementById('pager');
  if (!p) return;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (curPage > pages) curPage = pages;
  const from = total ? ((curPage - 1) * pageSize + 1) : 0, to = Math.min(curPage * pageSize, total);
  p.innerHTML = `<span class="pinfo">${from}–${to} / ${total}</span>
   <button onclick="goPage(1)" ${curPage <= 1 ? 'disabled' : ''}>«</button>
   <button onclick="goPage(${curPage - 1})" ${curPage <= 1 ? 'disabled' : ''}>‹</button>
   <span class="pinfo">Trang ${curPage}/${pages}</span>
   <button onclick="goPage(${curPage + 1})" ${curPage >= pages ? 'disabled' : ''}>›</button>
   <button onclick="goPage(${pages})" ${curPage >= pages ? 'disabled' : ''}>»</button>`;
}

function goPage(n: number): void {
  curPage = n;
  renderOrders();
}

function renderOrders(): void {
  const q = ((document.getElementById('orderSearch') as HTMLInputElement)?.value || '').trim().toLowerCase();
  const by = (document.getElementById('searchBy') as HTMLSelectElement)?.value || 'all';
  const tf = (document.getElementById('typeFilter') as HTMLSelectElement)?.value;
  const fd = (document.getElementById('fFrom') as HTMLInputElement)?.value;
  const td = (document.getElementById('fTo') as HTMLInputElement)?.value;
  const wf = parseFloat((document.getElementById('fWFrom') as HTMLInputElement)?.value);
  const wt = parseFloat((document.getElementById('fWTo') as HTMLInputElement)?.value);

  const hay = (o: any) => by === 'all' ? (o.cnee + ' ' + o.ct + ' ' + o.bill + ' ' + o.content + ' ' + o.ref + ' ' + o.connect) : String(o[by] || '');
  // mọi điều kiện trừ trạng thái → dùng cho số đếm trên tab
  const base = ORDERS.filter(o =>
    (branchFilter === 'all' || o.branch === branchFilter) &&
    (!tf || o.type === tf) &&
    (!q || hay(o).toLowerCase().includes(q)) &&
    (!fd || dOnly(o.created) >= fd) &&
    (!td || dOnly(o.created) <= td) &&
    (isNaN(wf) || parseKg(o.pcs) >= wf) &&
    (isNaN(wt) || parseKg(o.pcs) <= wt)
  );
  document.querySelectorAll<HTMLElement>('#chips [data-f]').forEach(t => {
    const k = t.dataset.f || 'all';
    const cc = t.querySelector('.cc');
    if (cc) cc.textContent = String(k === 'all' ? base.length : base.filter(o => o.st === k).length);
  });
  let rows = base.filter(o => filter === 'all' || o.st === filter);

  const f = sortState.field, dir = sortState.dir === 'asc' ? 1 : -1;
  rows.sort((a, b) => {
    const va = sortVal(a, f), vb = sortVal(b, f);
    return (va < vb ? -1 : va > vb ? 1 : 0) * dir || (b.seq - a.seq);
  });

  document.querySelectorAll<HTMLElement>('#v-orders .cast').forEach(c => {
    c.classList.toggle('on', c.dataset.sf === f);
    c.textContent = c.dataset.sf === f ? (sortState.dir === 'asc' ? '▲' : '▼') : '';
  });

  // tổng hợp theo kết quả lọc (như bản cũ: Total Pcs / Total Weight / Total result)
  const sumPcs = rows.reduce((a, o) => a + parsePcs(o.pcs), 0);
  const sumKg = rows.reduce((a, o) => a + parseKg(o.pcs), 0);
  const setT = (id: string, v: string) => { const e = document.getElementById(id); if (e) e.textContent = v; };
  setT('sumPcs', String(sumPcs));
  setT('sumKg', (Math.round(sumKg * 10) / 10).toLocaleString('vi-VN'));
  setT('sumRows', String(rows.length));

  const total = rows.length, pages = Math.max(1, Math.ceil(total / pageSize));
  if (curPage > pages) curPage = pages;
  const offset = (curPage - 1) * pageSize;
  rows = rows.slice(offset, curPage * pageSize);

  const b = document.getElementById('orderBody');
  const cards = document.getElementById('orderCards');
  if (b) b.innerHTML = '';
  if (cards) cards.innerHTML = '';

  rows.forEach((o, i) => {
    const [, itx, icol] = SICON[o.st] || ['', 'Chưa rõ', 'var(--muted)'];
    const est = estPod(o);
    const tr = document.createElement('tr');
    tr.onclick = e => {
      if ((e.target as HTMLElement).closest('button,input,a,select')) return;
      openDrawer(o);
    };
    tr.innerHTML = `<td class="c-chk" onclick="event.stopPropagation()"><input type="checkbox" aria-label="Chọn đơn ${o.bill}"></td>
     <td class="c-no">${offset + i + 1}</td>
     <td>${o.ref ? `<span class="mono">${o.ref}</span>` : '<span class="nil">—</span>'}</td>
     <td><div class="mono strong">${o.bill}</div><span class="st-pill sm" style="--c:${icol}">${itx}</span></td>
     <td class="c-cnee"><div class="cnee">${o.cnee}</div></td>
     <td><div>${o.ct}</div><div class="route">${o.route}</div></td>
     <td>${o.sent ? `<div class="tnum">${o.sent}</div>` : '<span class="nil">Chưa gửi</span>'}${o.connect ? `<div class="connbill" title="Mã tracking hãng / last-mile">${o.connect}</div>` : ''}</td>
     <td>${o.pod ? `<div class="tnum">${o.pod.date} ${o.pod.time}</div><div class="subcell">Ký: ${o.pod.signer}</div>` : est ? `<div class="subcell">Dự kiến</div><div class="tnum">${est}</div>` : '<span class="nil">—</span>'}</td>
     <td><div class="trk">
       <div class="trk-i"><button class="tlink" onclick="toast('VA Track: ${o.bill}')">VA Track</button><button class="icopy" title="Sao chép link VA Track" onclick="copyTrack('va','${o.bill}')">${IC.copy}</button></div>
       <div class="trk-i"><button class="tlink" onclick="toast('Your Track (thương hiệu đại lý): ${o.bill}')">Your Track</button><button class="icopy" title="Sao chép link Your Track" onclick="copyTrack('your','${o.bill}')">${IC.copy}</button></div>
     </div></td>
     <td><div class="tnum">${o.created.split(' ')[0]}</div><div class="subcell">${o.pcs}</div><div class="content">${o.content}</div></td>
     <td class="actions c-act" onclick="event.stopPropagation()">
       <button class="print-btn" onclick="openPrintMenu(event,'${o.bill}')">In ▾</button>
       <button class="act row-more" title="Thao tác khác" onclick="openRowMenu(event,'${o.bill}')">${IC.more}</button>
     </td>`;
    if (b) b.appendChild(tr);

    if (cards) {
      const card = document.createElement('div');
      card.className = 'ocard';
      card.onclick = e => {
        if ((e.target as HTMLElement).closest('button')) return;
        openDrawer(o);
      };
      card.innerHTML = `<div class="oc-top">
         <div><span class="mono strong">${o.bill}</span> <span class="st-pill sm" style="--c:${icol}">${itx}</span></div>
         <button class="btn ghost sm oc-detail" onclick="openDrawerBill('${o.bill}')">Chi tiết</button></div>
         <div class="oc-name">${o.cnee}</div>
         <div class="subcell">${o.ct} · ${o.route} · ${o.pcs}</div>`;
      cards.appendChild(card);
    }
  });
  if (!rows.length && b) b.innerHTML = '<tr><td colspan="11" class="empty-row">Không có đơn nào khớp bộ lọc.</td></tr>';

  const orderCount = document.getElementById('orderCount');
  if (orderCount) orderCount.textContent = total + ' đơn hàng';
  renderPager(total);
  renderBranchChips();
}

function openDrawerBill(bill: string): void {
  const o = ORDERS.find(x => x.bill === bill);
  if (o) openDrawer(o);
}

function toggleAll(c: HTMLInputElement): void {
  document.querySelectorAll<HTMLInputElement>('#orderBody input[type=checkbox]').forEach(x => (x.checked = c.checked));
}

function genPhoto(seed: number, w: string): string {
  const bg = ['#eaf5ee', '#e5efe9', '#eef3f0'][seed % 3];
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240'><rect width='320' height='240' fill='${bg}'/><rect x='40' y='196' width='240' height='10' rx='3' fill='#b9c8bf'/><rect x='96' y='150' width='128' height='46' rx='5' fill='#cdd8d1'/><rect x='150' y='120' width='20' height='30' fill='#aebbb2'/><rect x='108' y='66' width='104' height='84' rx='6' fill='#cba06a' stroke='#9c7238' stroke-width='3'/><line x1='108' y1='108' x2='212' y2='108' stroke='#9c7238' stroke-width='3'/><line x1='160' y1='66' x2='160' y2='150' stroke='#9c7238' stroke-width='3'/><text x='160' y='182' font-family='sans-serif' font-size='15' font-weight='bold' fill='#0b5c2c' text-anchor='middle'>${w}</text><text x='160' y='34' font-family='sans-serif' font-size='13' fill='#5d6f64' text-anchor='middle'>Ảnh kiện trên cân</text></svg>`;
  return 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svg);
}

function openPhotos(bill: string): void {
  const o = ORDERS.find(x => x.bill === bill) || {};
  const n = o.photos || 0;
  const g = document.getElementById('photoGrid');
  const pt = document.getElementById('photoTitle');
  if (pt) pt.textContent = 'Ảnh đơn ' + bill + ' — ' + (o.cnee || '');
  if (g) {
    if (!n) {
      g.innerHTML = '<p class="muted" style="grid-column:1/-1;text-align:center;padding:24px">Đơn này chưa có ảnh kiện hàng.</p>';
    } else {
      const wt = (o.pcs || '').split('·')[1] || '';
      g.innerHTML = Array.from({ length: n }, (_, i) => `<div class="photo-card"><img src="${genPhoto(i, ('Kiện ' + (i + 1) + (wt ? ' ·' + wt : '')))}" alt="Ảnh kiện ${i + 1}"><div class="pcap">Kiện ${i + 1}/${n} · chụp tại kho ${o.branch || ''}</div></div>`).join('');
    }
  }
  const m = document.getElementById('photoModal');
  if (m) m.classList.add('show');
}

function closePhotos(): void {
  const m = document.getElementById('photoModal');
  if (m) m.classList.remove('show');
}

function openPrintMenu(ev: Event, bill: string): void {
  ev.stopPropagation();
  const m = document.getElementById('pmenu');
  if (!m) return;
  const r = (ev.currentTarget as HTMLElement).getBoundingClientRect();
  m.style.left = Math.min(r.left, window.innerWidth - 192) + 'px';
  m.style.top = (r.bottom + 4) + 'px';
  m.dataset.bill = bill;
  document.getElementById('omenu')?.classList.remove('show');
  m.classList.add('show');
}

function closePmenu(): void {
  ['pmenu', 'omenu'].forEach(id => document.getElementById(id)?.classList.remove('show'));
}

function toggleHelp(ev: Event): void {
  ev.stopPropagation();
  const h = document.getElementById('helpPop');
  if (h) h.hidden = !h.hidden;
}

function printDo(kind: string): void {
  const m = document.getElementById('pmenu');
  const bill = m?.dataset.bill || '';
  closePmenu();
  toast('' + kind + ' — đơn ' + bill + ' (demo)');
}

function openDrawer(o: any): void {
  const [cls, txt] = ST[o.st] || ['b-wait', 'Chưa đi'];
  const drBill = document.getElementById('dr-bill');
  const drBody = document.getElementById('dr-body');
  if (drBill) drBill.textContent = 'VA Bill ' + o.bill;

  const steps = [
    ['Đã tiếp nhận tại kho', '08/09 09:12', true],
    ['Đang xử lý / đóng gói', '08/09 14:30', true],
    ['Đã xuất tuyến bay', o.st === 'wait' ? '—' : '08/09 22:05', o.st !== 'wait'],
    ['Đến kho nước đến', ['ok', 'nd', 'late'].includes(o.st) ? '09/09 06:40' : '—', ['ok', 'nd', 'late'].includes(o.st)],
    ['Phát thành công', o.st === 'ok' ? '09/09 15:20' : '—', o.st === 'ok']
  ];
  let cur = steps.filter(s => s[2]).length - 1;

  if (drBody) {
    drBody.innerHTML = `
     <div class="dr-sec" style="display:flex;align-items:center;gap:9px"><span class="badge ${cls}">${txt}</span>${o.pod ? '' : `<span class="branch-chip" style="margin-left:auto">${o.branch}</span>`}</div>
     <div class="dr-sec" style="display:flex;gap:7px;flex-wrap:wrap">
       <button class="va-track" onclick="toast('VA Track: ${o.bill}')">VA Track</button>
       <button class="ytrack" onclick="toast('Your Track: ${o.bill}')">Your Track</button>
       <button class="photo-btn" onclick="openPhotos('${o.bill}')">Xem ảnh${o.photos ? ' (' + o.photos + ')' : ''}</button></div>
     <div class="dr-sec"><h4>Link tra cứu gửi khách</h4><div class="copy-link"><span class="cl">vietanexpress.com.vn/track?id=${o.bill}</span><button class="btn link" onclick="copyLink('${o.bill}')">Sao chép</button></div></div>
     <div class="dr-sec"><h4>Thông tin đơn</h4>
       <div class="kv"><span class="k">Người nhận</span><span class="v">${o.cnee}</span></div>
       <div class="kv"><span class="k">Nước đến</span><span class="v">${o.ct}</span></div>
       <div class="kv"><span class="k">REF</span><span class="v">${o.ref || '—'}</span></div>
       <div class="kv"><span class="k">Chi nhánh gửi</span><span class="v">${o.branch}</span></div>
       <div class="kv"><span class="k">Dịch vụ</span><span class="v">${o.route}</span></div>
       <div class="kv"><span class="k">Connect bill</span><span class="v bill">${o.connect || '—'}</span></div>
       <div class="kv"><span class="k">Loại hàng</span><span class="v">${o.type}</span></div>
       <div class="kv"><span class="k">Hàng hóa</span><span class="v">${o.content}</span></div>
       <div class="kv"><span class="k">Kiện / cân</span><span class="v">${o.pcs}</span></div>
       <div class="kv"><span class="k">Ngày tạo</span><span class="v">${o.created}</span></div>
       <div class="kv"><span class="k">Ngày gửi</span><span class="v">${o.sent || '<span style="color:var(--amber)">Chưa gửi</span>'}</span></div>
       <div class="kv"><span class="k">POD (giao)</span><span class="v">${o.pod ? o.pod.date + ' ' + o.pod.time + ' · ' + o.pod.signer : '—'}</span></div></div>
     <div class="dr-sec"><h4>Hành trình đơn hàng</h4><div class="tl">${steps.map((s, i) => `<div class="tl-it ${s[2] ? (i === cur ? 'now' : 'done') : ''}"><div class="tt">${s[0]}</div><div class="td">${s[1]}</div></div>`).join('')}</div></div>
     <div class="dr-sec"><h4>In &amp; thao tác</h4><div style="display:flex;gap:7px;flex-wrap:wrap">
       <button class="btn ghost sm" onclick="toast('In A4 (demo)')">Bill A4</button><button class="btn ghost sm" onclick="toast('In Invoice (demo)')">Invoice</button>
       <button class="btn ghost sm" onclick="toast('Xuất CVCK (demo)')">CVCK</button><button class="btn ghost sm" onclick="toast('In nhãn A6 (demo)')">Label A6</button>
       <button class="btn ghost sm" onclick="closeDrawer();openTrouble('${o.bill}')" style="color:var(--red)">Báo sự cố</button></div></div>`;
  }
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  if (drawer) drawer.classList.add('show');
  if (scrim) scrim.classList.add('show');
}

function closeDrawer(): void {
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  if (drawer) drawer.classList.remove('show');
  if (scrim) scrim.classList.remove('show');
}

function copyLink(id: string): void {
  const t = 'vietanexpress.com.vn/track?id=' + id;
  if (navigator.clipboard) navigator.clipboard.writeText(t).catch(() => {});
  toast('Đã sao chép link tra cứu');
}

function updateNotiCount(): void {
  const n = NOTIS.filter(x => x.unread).length;
  ['navNoti', 'bellBadge'].forEach(id => {
    const e = document.getElementById(id);
    if (e) {
      e.textContent = String(n);
      e.style.display = n ? '' : 'none';
    }
  });
  updateNavSums();
}

function renderNoti(): void {
  const L = document.getElementById('notiList');
  if (!L) return;
  L.innerHTML = '';
  NOTIS.forEach(x => {
    const el = document.createElement('div');
    el.className = 'noti-item' + (x.unread ? ' unread' : '') + (x.imp ? ' imp' : '');
    el.innerHTML = `<div style="flex:1;min-width:0">
      <div class="nt">${x.title} ${x.imp ? '<span class="tag-imp">Quan trọng</span>' : ''}</div>
      <div class="nd">${x.body.split('\n')[0]}</div><div class="nmeta">${x.date}</div></div>
      ${x.unread ? '<span class="undot"></span>' : ''}`;
    el.onclick = () => openNoti(x.id);
    L.appendChild(el);
  });
}

function openNoti(id: number): void {
  const x = NOTIS.find(n => n.id === id);
  if (!x) return;
  x.unread = false;
  updateNotiCount();
  renderNoti();
  const drBill = document.getElementById('dr-bill');
  const drBody = document.getElementById('dr-body');
  if (drBill) drBill.textContent = x.title;
  if (drBody) {
    drBody.innerHTML = `<div class="dr-sec"><div class="nmeta" style="margin-bottom:6px">${x.imp ? '<span class="tag-imp">Quan trọng</span> · ' : ''}${x.date}</div>
      <div style="font-size:13.5px;line-height:1.6;white-space:pre-line">${x.body}</div></div>`;
  }
  const drawer = document.getElementById('drawer');
  const scrim = document.getElementById('scrim');
  if (drawer) drawer.classList.add('show');
  if (scrim) scrim.classList.add('show');
}

function markAllRead(): void {
  NOTIS.forEach(x => (x.unread = false));
  updateNotiCount();
  renderNoti();
  toast('Đã đánh dấu tất cả là đã đọc');
}

const PKST: Record<string, [string, string]> = { ok: ['b-ok', 'Đã lấy hàng'], wait: ['b-wait', 'Chờ xác nhận'] };
function renderPickups(): void {
  const L = document.getElementById('pkList');
  if (!L) return;
  L.innerHTML = '';
  PICKUPS.forEach(p => {
    const [cls, tx] = PKST[p.st] || ['b-wait', 'Chờ xác nhận'];
    const el = document.createElement('div');
    el.className = 'pk-item';
    el.innerHTML = `<div style="flex:1"><div class="pkd">${p.date} · ${p.slot}</div><div class="pkm">${p.pcs} kiện dự kiến</div></div>
      <span class="badge ${cls}">${tx}</span>`;
    L.appendChild(el);
  });
  if (!PICKUPS.length) L.innerHTML = '<p class="muted" style="text-align:center;padding:16px">Chưa có lịch pickup nào.</p>';
}

function submitPickup(): void {
  if (!validate2('v-pickup')) return;
  toast('Đã gửi yêu cầu pickup! Nhân viên sẽ liên hệ xác nhận.', 'good');
}

function validate2(viewId: string): boolean {
  let ok = true, first: HTMLElement | null = null;
  document.querySelectorAll('#' + viewId + ' [data-req]').forEach(c => {
    const el = c as HTMLInputElement;
    if (!String(el.value).trim()) {
      ok = false;
      el.classList.add('err');
      if (!first) first = el;
    } else {
      el.classList.remove('err');
    }
  });
  if (!ok) {
    if (first) (first as HTMLElement).focus();
    toast('Còn ô bắt buộc chưa điền');
  }
  return ok;
}

function showPop(): void {
  const imp = NOTIS.filter(x => x.imp);
  if (!imp.length) return;
  try {
    if (sessionStorage.getItem('va_pop_hide') === '1') return;
  } catch (e) {}
  const popList = document.getElementById('popList');
  if (popList) {
    popList.innerHTML = imp.map(x => `<div class="pop-noti"><h4>${x.title}</h4><p>${x.body.split('\n')[0]}</p><div class="pnd">${x.date} · bấm "Xem tất cả" để đọc chi tiết</div></div>`).join('');
  }
  const modal = document.getElementById('popModal');
  if (modal) modal.classList.add('show');
}

function closePop(): void {
  try {
    const popHide = document.getElementById('popHide') as HTMLInputElement;
    if (popHide?.checked) sessionStorage.setItem('va_pop_hide', '1');
  } catch (e) {}
  const modal = document.getElementById('popModal');
  if (modal) modal.classList.remove('show');
}

function priceTab(t: string): void {
  document.querySelectorAll('#v-price .etab').forEach(b => (b as HTMLElement).classList.toggle('on', (b as HTMLElement).dataset.ptab === t));
  document.querySelectorAll<HTMLElement>('#v-price .ptab-p').forEach(p => (p.hidden = p.dataset.ptab !== t));
  if (t === 'tables') {
    renderRateChips();
    if ((!rateSel || !PRICE_SVCS.some(x => x.name === rateSel)) && PRICE_SVCS[0]) rateSel = PRICE_SVCS[0].name;
    renderRateTable(rateSel);
  }
  if (t === 'manage') {
    const pe = document.getElementById('priceEditor');
    const pl = document.getElementById('pmgrList');
    if (pe) pe.hidden = true;
    if (pl) pl.hidden = false;
    pmgrRender();
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function priceAt(s: any, zone: number, cr: number): number {
  const arr = s.price[zone] || s.price[s.dz] || [];
  if (cr <= 70) {
    const i = Math.max(0, Math.round(cr / 0.5) - 1);
    return arr[Math.min(i, arr.length - 1)] || 0;
  }
  return (s.over70[zone] || s.over70[s.dz] || 0) * cr;
}

function priceCalc(s: any, country: string, gross: number, D: number, W: number, H: number, type: string): any {
  const zone = s.zmap[country] || s.dz;
  const vol = (type === 'PACK') ? +((D * W * H) / 5000).toFixed(2) : 0;
  const charge = Math.max(gross, vol);
  const cr = Math.max(0.5, Math.ceil(charge / 0.5) * 0.5);
  const cuoc = priceAt(s, zone, cr);
  const fsc = cuoc * s.fsc;
  const longest = Math.max(+D || 0, +W || 0, +H || 0);
  const A = type === 'PACK' ? girthA(D, W, H) : 0;
  let phuthu = 0;
  if (type === 'PACK') {
    (s.sur || []).forEach((r: any) => {
      const inW = gross >= _lo(r.wFrom) && gross <= _hi(r.wTo);
      const inD = longest >= _lo(r.dFrom) && longest <= _hi(r.dTo);
      const inG = A >= _lo(r.gFrom) && A <= _hi(r.gTo);
      if (inW && inD && inG) phuthu = Math.max(phuthu, +r.fee || 0);
    });
  }
  const over = phuthu > 0;
  const vatBase = cuoc + fsc + phuthu;
  const vat = vatBase * s.vat;
  const tong = vatBase + vat;
  return { name: s.name, zone, charge: cr, vol, cuoc, fsc, phuthu, over, vat, tong, eta: s.eta };
}

function doPriceLookup(): void {
  const country = (document.getElementById('priceCountry') as HTMLInputElement)?.value.trim() || '';
  const gross = +(document.getElementById('priceKg') as HTMLInputElement)?.value || 0;
  const D = +(document.getElementById('priceD') as HTMLInputElement)?.value || 0;
  const W = +(document.getElementById('priceW') as HTMLInputElement)?.value || 0;
  const H = +(document.getElementById('priceH') as HTMLInputElement)?.value || 0;
  const type = (document.getElementById('priceType') as HTMLSelectElement)?.value || 'PACK';
  if (!country || !gross) {
    toast('Nhập nước đến & cân nặng để tra cứu');
    return;
  }
  priceRows = PRICE_SVCS.map(s => priceCalc(s, country, gross, D, W, H, type));
  priceSortState = { f: 'tong', dir: 'asc' };
  renderPriceResult(country);
}

function priceSort(f: string): void {
  if (priceSortState.f === f) priceSortState.dir = priceSortState.dir === 'asc' ? 'desc' : 'asc';
  else priceSortState = { f: f, dir: 'asc' };
  renderPriceResult();
}

function renderPriceResult(country?: string): void {
  const el = document.getElementById('priceResult');
  if (!el) return;
  if (!priceRows.length) {
    el.innerHTML = '';
    return;
  }
  const best = priceRows.reduce((a, b) => (b.tong < a.tong ? b : a));
  const vol = priceRows[0].vol, charge = priceRows[0].charge;
  const f = priceSortState.f, dir = priceSortState.dir === 'asc' ? 1 : -1;
  const rows = [...priceRows].sort((a, b) => {
    const va = typeof a[f] === 'string' ? a[f].toLowerCase() : a[f];
    const vb = typeof b[f] === 'string' ? b[f].toLowerCase() : b[f];
    return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
  });
  const car = (x: string) => `<span class="cast ${priceSortState.f === x ? 'on' : ''}">${priceSortState.f === x ? (priceSortState.dir === 'asc' ? '▲' : '▼') : '▲▼'}</span>`;

  let h = `<div class="epanel"><div class="epanel-b">
   <div class="brow" style="margin-bottom:10px;font-size:13px"><b style="color:var(--ink)">Kết quả cho ${country || ''}</b> · Cân tính cước: <b>${charge}kg</b>${vol ? ` (quy đổi ${vol}kg)` : ''} · <span class="muted">rẻ nhất: <b style="color:var(--green-d)">${best.name}</b></span></div>
   <div class="tbl-wrap"><div class="tbl-scroll"><table class="orders" style="min-width:900px">
    <thead><tr>
      <th class="sortable" onclick="priceSort('name')">Dịch vụ ${car('name')}</th>
      <th class="sortable" onclick="priceSort('zone')">Zone ${car('zone')}</th>
      <th class="sortable" onclick="priceSort('cuoc')">Cước ${car('cuoc')}</th>
      <th class="sortable" onclick="priceSort('fsc')">FSC ${car('fsc')}</th>
      <th class="sortable" onclick="priceSort('phuthu')">Phụ thu KT/TL ${car('phuthu')}</th>
      <th class="sortable" onclick="priceSort('vat')">VAT ${car('vat')}</th>
      <th class="sortable" onclick="priceSort('tong')">Tổng ${car('tong')}</th>
      <th>Dự kiến</th><th></th></tr></thead><tbody>`;

  rows.forEach(r => {
    h += `<tr class="${r.name === best.name ? 'price-best' : ''}">
      <td><span class="cnee">${r.name}</span>${r.name === best.name ? ' <span class="badge b-ok">Rẻ nhất</span>' : ''}</td>
      <td>Zone ${r.zone}</td><td class="tnum">${fmtV(r.cuoc)}</td><td class="tnum">${fmtV(r.fsc)}</td>
      <td class="tnum">${r.phuthu ? '<span style="color:var(--red)">' + fmtV(r.phuthu) + '</span>' : '—'}</td>
      <td class="tnum">${fmtV(r.vat)}</td><td class="price-total tnum">${fmtV(r.tong)}</td>
      <td class="muted">${r.eta}</td>
      <td><button class="btn ghost sm" onclick="toast('Tạo đơn với ${r.name} (demo)');nav('create')">Chọn</button></td></tr>`;
  });
  h += `</tbody></table></div></div><div class="price-note">${PRICE_NOTE}</div></div></div>`;
  el.innerHTML = h;
}

function renderRateChips(): void {
  const w = document.getElementById('rateSvcChips');
  if (!w) return;
  w.innerHTML = '';
  PRICE_SVCS.forEach(s => {
    const b = document.createElement('button');
    b.className = 'chip' + (s.name === rateSel ? ' on' : '');
    b.textContent = s.name;
    b.onclick = () => {
      rateSel = s.name;
      renderRateChips();
      renderRateTable(s.name);
    };
    w.appendChild(b);
  });
}

function renderRateTable(name: string): void {
  const s = PRICE_SVCS.find(x => x.name === name);
  const box = document.getElementById('rateTableBox');
  if (!box) return;
  if (!s) {
    box.innerHTML = '';
    return;
  }
  const zn = s.zones.map((_: any, i: number) => i + 1);
  let rows = '';
  PRICE_STEPS.forEach((w, i) => {
    rows += '<tr><td class="bill">' + w.toFixed(1) + ' kg</td>' + zn.map((z: number) => '<td class="tnum">' + fmtV((s.price[z] || [])[i] || 0) + '</td>').join('') + '</tr>';
  });
  const over = '<tr style="background:var(--green-tint)"><td class="bill">&gt;70kg (đ/kg)</td>' + zn.map((z: number) => '<td class="tnum">' + fmtV(s.over70[z] || 0) + '</td>').join('') + '</tr>';
  const zmap = Object.entries(s.zmap).map(([c, z]) => `<span class="src src-excel">${c} → Z${z}</span>`).join(' ') || '<span class="muted">chưa khai</span>';
  const surRows = (s.sur || []).length ? (s.sur.map((r: any) => `<tr>
     <td>${r.wFrom !== '' && r.wFrom != null ? r.wFrom : '0'} – ${r.wTo !== '' && r.wTo != null ? r.wTo : '∞'} kg</td>
     <td>${r.dFrom !== '' && r.dFrom != null ? r.dFrom : '0'} – ${r.dTo !== '' && r.dTo != null ? r.dTo : '∞'} cm</td>
     <td>${r.gFrom !== '' && r.gFrom != null ? r.gFrom : '0'} – ${r.gTo !== '' && r.gTo != null ? r.gTo : '∞'} cm</td>
     <td class="tnum" style="color:var(--red)">${fmtV(r.fee || 0)}</td></tr>`).join('')) : '<tr><td colspan="4" class="muted">Chưa khai quy định phụ thu.</td></tr>';

  box.innerHTML = `<div class="epanel"><div class="epanel-b">
   <div class="brow" style="margin-bottom:6px"><span class="src src-api">${s.name}</span>${s.account ? `<span class="muted">Account: <b>${s.account}</b></span>` : ''}<span class="muted">FSC ${Math.round(s.fsc * 100)}% · VAT ${Math.round(s.vat * 100)}% · Dự kiến ${s.eta || '—'}</span></div>
   <div class="brow" style="margin-bottom:10px"><span class="badge b-ok">Hiệu lực: ${fmtDMY(s.effFrom)} → ${fmtDMY(s.effTo)}</span>
     <button class="btn ghost sm" onclick="pmgrEdit('${s.id}');priceTab('manage')">Sửa bảng giá này</button></div>
   <div style="font-weight:600;font-size:13px;margin-bottom:6px">Bảng giá — TỔNG cước theo Zone × mốc cân 0.5→70kg (VND)</div>
   <div class="tbl-wrap"><div class="tbl-scroll" style="max-height:360px;overflow:auto"><table class="orders" style="min-width:520px"><thead><tr><th>Cân (kg)</th>${s.zones.map((l: string) => '<th>' + l + '</th>').join('')}</tr></thead><tbody>${rows}${over}</tbody></table></div></div>
   <div class="brow" style="margin-top:10px;align-items:flex-start"><b style="color:var(--ink)">Zone theo nước:</b> ${zmap} <span class="muted">· nước khác → Z${s.dz}</span></div>
   <div style="font-weight:600;font-size:13px;margin:14px 0 6px">Bảng phụ thu quá khổ / quá tải</div>
   <div class="tbl-wrap"><div class="tbl-scroll"><table class="orders" style="min-width:520px"><thead><tr><th>Cân nặng</th><th>Cạnh dài nhất</th><th>A=(R+C)×2+D</th><th>Phí charge</th></tr></thead><tbody>${surRows}</tbody></table></div></div>
   <p class="muted" style="font-size:12px;margin-top:10px">Kiện thỏa CẢ 3 khoảng (cân · cạnh dài · A) của 1 dòng → cộng phí charge dòng đó. Tổng = Cước + FSC + Phụ thu + VAT.</p>
   <div class="price-note">${PRICE_NOTE}</div></div></div>`;
}

const CI = 'width:100%;padding:5px 7px;border:1px solid var(--line,#cbd5cf);border-radius:7px;font-size:12.5px;background:var(--card,#fff);color:var(--ink,#111);box-sizing:border-box';
function pmgrRender(): void {
  const el = document.getElementById('pmgrList');
  if (!el) return;
  const cards = PRICE_SVCS.map(s => {
    const nc = Object.keys(s.zmap).length;
    return `<div class="epanel" style="margin-bottom:10px"><div class="epanel-b">
     <div class="brow" style="align-items:flex-start;gap:10px;flex-wrap:wrap">
       <div style="flex:1;min-width:200px">
         <div style="font-weight:700;font-size:15px">${s.name} ${s.account ? `<span class="muted" style="font-weight:500;font-size:12.5px">· ${s.account}</span>` : ''}</div>
         <div class="muted" style="font-size:12.5px;margin-top:3px">${s.zones.length} zone · ${nc} nước khai · ${(s.sur || []).length} dòng phụ thu · FSC ${Math.round(s.fsc * 100)}% · VAT ${Math.round(s.vat * 100)}%</div>
         <div style="margin-top:4px"><span class="badge b-ok">Hiệu lực ${fmtDMY(s.effFrom)} → ${fmtDMY(s.effTo)}</span></div>
       </div>
       <div class="brow" style="gap:6px">
         <button class="btn ghost sm" onclick="rateSel='${s.name}';priceTab('tables')">Xem</button>
         <button class="btn ghost sm" onclick="pmgrEdit('${s.id}')">Sửa</button>
         <button class="btn ghost sm" style="color:var(--red)" onclick="pmgrDel('${s.id}')">Xóa</button>
       </div></div></div></div>`;
  }).join('');
  el.innerHTML = `<div class="brow" style="margin-bottom:12px"><b style="color:var(--ink);font-size:15px">Danh sách dịch vụ &amp; bảng giá (${PRICE_SVCS.length})</b>
     <button class="btn primary" style="margin-left:auto" onclick="pmgrNew()">Thêm dịch vụ</button>
     <button class="btn ghost sm" onclick="pmgrReset()">↺ Khôi phục demo</button></div>
   ${cards || '<div class="stub"><h3>Chưa có dịch vụ</h3><p>Bấm "Thêm dịch vụ" để khai bảng giá.</p></div>'}`;
}

function pmgrReset(): void {
  if (!confirm('Khôi phục 6 dịch vụ DEMO? Dữ liệu đã nhập sẽ bị thay thế.')) return;
  PRICE_SVCS = PRICE_SEED.map(mkSvc);
  savePrice();
  rateSel = PRICE_SVCS[0].name;
  pmgrRender();
  renderRateChips();
  toast('↺ Đã khôi phục biểu giá demo');
}

function pmgrDel(id: string): void {
  const s = PRICE_SVCS.find(x => x.id === id);
  if (!s) return;
  if (!confirm('Xóa dịch vụ "' + s.name + '"?')) return;
  PRICE_SVCS = PRICE_SVCS.filter(x => x.id !== id);
  savePrice();
  if (rateSel === s.name) rateSel = (PRICE_SVCS[0] || {}).name || '';
  pmgrRender();
  try { renderRateChips(); } catch (e) {}
  toast('Đã xóa ' + s.name);
}

function pmgrNew(): void {
  ped = {
    id: '', name: '', account: '', fsc: 0.28, vat: 0.08, eta: '', effFrom: '', effTo: '',
    zones: ['Zone 1', 'Zone 2', 'Zone 3'], zmap: {}, dz: 1,
    price: { 1: PRICE_STEPS.map(() => 0), 2: PRICE_STEPS.map(() => 0), 3: PRICE_STEPS.map(() => 0) },
    over70: { 1: 0, 2: 0, 3: 0 }, sur: [{ wFrom: '', wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: '' }]
  };
  pedOpen(true);
}

function pmgrEdit(id: string): void {
  const s = PRICE_SVCS.find(x => x.id === id);
  if (!s) return;
  ped = JSON.parse(JSON.stringify(s));
  pedOpen(false);
}

function pedClose(): void {
  const pe = document.getElementById('priceEditor');
  const pl = document.getElementById('pmgrList');
  if (pe) pe.hidden = true;
  if (pl) pl.hidden = false;
  ped = null;
  pmgrRender();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function pedOpen(isNew: boolean): void {
  const box = document.getElementById('priceEditor');
  const pl = document.getElementById('pmgrList');
  if (pl) pl.hidden = true;
  if (!box) return;
  box.hidden = false;
  box.innerHTML = `<div class="brow" style="margin-bottom:10px"><b style="color:var(--ink);font-size:16px">${isNew ? 'Thêm dịch vụ' : 'Sửa: ' + ped.name}</b>
     <button class="btn ghost sm" style="margin-left:auto" onclick="pedClose()">← Quay lại danh sách</button></div>

   <div class="epanel"><div class="epanel-b">
    <div class="ped-sec"><span class="ped-no">1</span> Thông tin dịch vụ</div>
    <div class="grid g3" style="margin-bottom:8px">
      <div class="f"><label class="label">Tên dịch vụ <span class="req">*</span></label><input class="ctrl" id="ped-name" placeholder="VD: DHL, Chuyên tuyến US" value="${esc(ped.name)}" oninput="ped.name=this.value"></div>
      <div class="f"><label class="label">Tên Account</label><input class="ctrl" id="ped-account" placeholder="VD: DHL Express / mã account hãng" value="${esc(ped.account)}" oninput="ped.account=this.value"></div>
      <div class="f"><label class="label">Thời gian dự kiến (ETA)</label><input class="ctrl" placeholder="VD: 2–4 ngày" value="${esc(ped.eta)}" oninput="ped.eta=this.value"></div>
    </div>
    <div class="grid g3">
      <div class="f"><label class="label">FSC (%)</label><input class="ctrl" type="number" step="0.1" value="${(ped.fsc * 100).toFixed(1)}" oninput="ped.fsc=(+this.value||0)/100"></div>
      <div class="f"><label class="label">VAT (%)</label><input class="ctrl" type="number" step="0.1" value="${(ped.vat * 100).toFixed(1)}" oninput="ped.vat=(+this.value||0)/100"></div>
      <div></div>
    </div>

    <div class="ped-sec"><span class="ped-no">2</span> Hiệu lực bảng giá (áp dụng từ ngày → đến ngày)</div>
    <div class="grid g3">
      <div class="f"><label class="label">Áp dụng từ ngày</label><input class="ctrl" type="date" value="${ped.effFrom || ''}" oninput="ped.effFrom=this.value"></div>
      <div class="f"><label class="label">Đến ngày</label><input class="ctrl" type="date" value="${ped.effTo || ''}" oninput="ped.effTo=this.value"></div>
      <div></div>
    </div>

    <div class="ped-sec"><span class="ped-no">3</span> Zone &amp; chia nước</div>
    <div class="grid g3" style="margin-bottom:8px">
      <div class="f"><label class="label">Số zone</label><input class="ctrl" type="number" min="1" max="12" value="${ped.zones.length}" onchange="pedResizeZones(this.value)"></div>
      <div class="f"><label class="label">Zone mặc định (nước chưa khai)</label><select class="ctrl" id="ped-dz" onchange="ped.dz=+this.value"></select></div>
      <div></div>
    </div>
    <div id="ped-zones"></div>
    <div style="font-weight:600;font-size:13px;margin:6px 0 4px">Bảng chia Zone theo nước</div>
    <div id="ped-countries"></div>
    <button class="btn ghost sm" style="margin-top:6px" onclick="pedAddCountry()">Thêm nước</button>

    <div class="ped-sec"><span class="ped-no">4</span> Bảng giá — TỔNG cước theo mốc cân 0.5 → 70kg (VNĐ)</div>
    <div class="warn-box" style="background:var(--green-tint,#eef7f0);border:1px solid var(--line,#cbd5cf);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="font-weight:600;font-size:12.5px;margin-bottom:6px">Điền nhanh (tùy chọn): nhập giá mốc 0.5kg + mức cộng mỗi 0.5kg cho từng zone → tạo cả thang, rồi chỉnh tay ô lẻ.</div>
      <div id="ped-qf"></div>
      <button class="btn ghost sm" style="margin-top:6px" onclick="pedQuickFill()">Tạo thang giá</button>
    </div>
    <div id="ped-grid"></div>
    <div style="font-weight:600;font-size:13px;margin:12px 0 4px">Trên 70kg — đơn giá VNĐ/kg (theo zone)</div>
    <div id="ped-over"></div>

    <div class="ped-sec"><span class="ped-no">5</span> Bảng phụ thu quá khổ / quá tải</div>
    <p class="muted" style="font-size:12px;margin:0 0 8px">Mỗi dòng = 1 quy định. Kiện thỏa CẢ 3 khoảng (cân nặng · cạnh dài · A) → cộng phí charge. Bỏ trống = không giới hạn (0 → ∞). <b>A = (Rộng + Cao) × 2 + Dài</b>.</p>
    <div id="ped-sur"></div>
    <button class="btn ghost sm" style="margin-top:6px" onclick="pedAddSur()">Thêm dòng phụ thu</button>

    <div class="brow" style="margin-top:16px;border-top:1px solid var(--line,#e5e5e5);padding-top:12px">
      <button class="btn primary" onclick="pedSave()">Lưu bảng giá</button>
      <button class="btn ghost" onclick="pedClose()">Hủy</button>
    </div>
   </div></div>`;
  pedRenderZones();
  pedRenderCountries();
  pedRenderQF();
  pedRenderGrid();
  pedRenderOver();
  pedRenderSur();
}

function pedZ(): number[] {
  return ped.zones.map((_: any, i: number) => i + 1);
}
function pedZoneOpts(sel: number): string {
  return pedZ().map((z: number) => `<option value="${z}" ${z === sel ? 'selected' : ''}>Z${z} — ${esc(ped.zones[z - 1])}</option>`).join('');
}
function pedRenderZones(): void {
  const el = document.getElementById('ped-zones');
  if (!el) return;
  el.innerHTML = '<div class="grid g3" style="gap:6px">' + ped.zones.map((l: string, i: number) =>
    `<div class="f"><label class="label">Nhãn Zone ${i + 1}</label><input class="ctrl" value="${esc(l)}" oninput="ped.zones[${i}]=this.value" onchange="pedRefreshZoneUI()"></div>`).join('') + '</div>';
  const dz = document.getElementById('ped-dz') as HTMLSelectElement;
  if (dz) {
    dz.innerHTML = pedZoneOpts(ped.dz);
    dz.value = String(ped.dz);
  }
}
function pedRefreshZoneUI(): void {
  pedRenderCountries();
  pedRenderQF();
  pedRenderGrid();
  pedRenderOver();
  const dz = document.getElementById('ped-dz') as HTMLSelectElement;
  if (dz) dz.innerHTML = pedZoneOpts(ped.dz);
}
function pedResizeZones(n: any): void {
  n = Math.max(1, Math.min(12, +n || 1));
  const cur = ped.zones.length;
  if (n > cur) {
    for (let z = cur + 1; z <= n; z++) {
      ped.zones.push('Zone ' + z);
      ped.price[z] = PRICE_STEPS.map(() => 0);
      ped.over70[z] = 0;
    }
  } else if (n < cur) {
    for (let z = cur; z > n; z--) {
      delete ped.price[z];
      delete ped.over70[z];
    }
    ped.zones = ped.zones.slice(0, n);
    if (ped.dz > n) ped.dz = n;
    Object.keys(ped.zmap).forEach(c => {
      if (ped.zmap[c] > n) ped.zmap[c] = n;
    });
  }
  pedRenderZones();
  pedRefreshZoneUI();
}
function pedRenderCountries(): void {
  const el = document.getElementById('ped-countries');
  if (!el) return;
  const ent = Object.entries(ped.zmap);
  el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr><th>Tên nước</th><th style="width:150px">Zone</th><th style="width:40px"></th></tr></thead><tbody>' +
    (ent.length ? ent.map(([c, z], i) => `<tr>
     <td><input style="${CI}" value="${esc(c)}" onchange="pedRenameCountry(${i},this.value)"></td>
     <td><select style="${CI}" onchange="pedSetCountryZone(${i},this.value)">${pedZoneOpts(Number(z))}</select></td>
     <td><button class="btn ghost sm" style="color:var(--red)" onclick="pedRmCountry(${i})">✕</button></td></tr>`).join('') : '<tr><td colspan="3" class="muted">Chưa khai nước nào — nước chưa khai sẽ tính theo Zone mặc định.</td></tr>') +
    '</tbody></table></div>';
}
function pedCountryKey(i: number): string {
  return Object.keys(ped.zmap)[i];
}
function pedRenameCountry(i: number, v: string): void {
  v = v.trim();
  const keys = Object.keys(ped.zmap);
  const old = keys[i];
  if (old === undefined) return;
  const z = ped.zmap[old];
  const ne: Record<string, any> = {};
  keys.forEach((k, j) => {
    if (j === i) {
      if (v) ne[v] = z;
    } else ne[k] = ped.zmap[k];
  });
  ped.zmap = ne;
  pedRenderCountries();
}
function pedSetCountryZone(i: number, v: any): void {
  const k = pedCountryKey(i);
  if (k !== undefined) ped.zmap[k] = +v;
}
function pedAddCountry(): void {
  let n = 'Nước ' + (Object.keys(ped.zmap).length + 1);
  while (ped.zmap[n] !== undefined) n += '.';
  ped.zmap[n] = 1;
  pedRenderCountries();
}
function pedRmCountry(i: number): void {
  const k = pedCountryKey(i);
  if (k !== undefined) delete ped.zmap[k];
  pedRenderCountries();
}
function pedRenderQF(): void {
  const el = document.getElementById('ped-qf');
  if (!el) return;
  el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr><th>Zone</th><th>Giá mốc 0.5kg</th><th>+ mỗi 0.5kg</th></tr></thead><tbody>' +
    pedZ().map((z: number) => `<tr><td class="bill">${esc(ped.zones[z - 1])}</td>
     <td><input style="${CI}" type="number" id="qf-b-${z}" placeholder="VD 180000"></td>
     <td><input style="${CI}" type="number" id="qf-i-${z}" placeholder="VD 70000"></td></tr>`).join('') + '</tbody></table></div>';
}
function pedQuickFill(): void {
  pedZ().forEach((z: number) => {
    const b = +((document.getElementById('qf-b-' + z) as HTMLInputElement) || {}).value || 0;
    const inc = +((document.getElementById('qf-i-' + z) as HTMLInputElement) || {}).value || 0;
    if (b || inc) {
      ped.price[z] = PRICE_STEPS.map((_, i) => b + inc * i);
      ped.over70[z] = inc * 2;
    }
  });
  pedRenderGrid();
  pedRenderOver();
  toast('Đã tạo thang giá — chỉnh tay ô lẻ nếu cần');
}
function pedRenderGrid(): void {
  const zs = pedZ();
  let rows = '';
  PRICE_STEPS.forEach((w, i) => {
    rows += '<tr><td class="bill">' + w.toFixed(1) + '</td>' +
      zs.map((z: number) => `<td><input style="${CI};text-align:right" type="number" value="${(ped.price[z] || [])[i] || 0}" oninput="ped.price[${z}][${i}]=+this.value||0"></td>`).join('') + '</tr>';
  });
  const el = document.getElementById('ped-grid');
  if (el) {
    el.innerHTML = '<div class="tbl-wrap"><div class="tbl-scroll" style="max-height:380px;overflow:auto"><table class="orders" style="min-width:' + (120 + zs.length * 110) + 'px"><thead><tr><th style="position:sticky;left:0">Cân (kg)</th>' +
      zs.map((z: number) => '<th>' + esc(ped.zones[z - 1]) + '</th>').join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
  }
}
function pedRenderOver(): void {
  const zs = pedZ();
  const el = document.getElementById('ped-over');
  if (!el) return;
  el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr>' +
    zs.map((z: number) => '<th>' + esc(ped.zones[z - 1]) + ' (đ/kg)</th>').join('') + '</tr></thead><tbody><tr>' +
    zs.map((z: number) => `<td><input style="${CI};text-align:right" type="number" value="${ped.over70[z] || 0}" oninput="ped.over70[${z}]=+this.value||0"></td>`).join('') + '</tr></tbody></table></div>';
}
function pedRenderSur(): void {
  const el = document.getElementById('ped-sur');
  if (!el) return;
  el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:640px"><thead><tr>' +
    '<th colspan="2">Cân nặng (kg)</th><th colspan="2">Cạnh dài nhất (cm)</th><th colspan="2">A=(R+C)×2+D (cm)</th><th rowspan="2">Phí charge (đ)</th><th rowspan="2"></th></tr>' +
    '<tr><th>từ</th><th>đến</th><th>từ</th><th>đến</th><th>từ</th><th>đến</th></tr></thead><tbody>' +
    (ped.sur.length ? ped.sur.map((r: any, i: number) => `<tr>
     <td><input style="${CI}" type="number" value="${r.wFrom}" oninput="ped.sur[${i}].wFrom=this.value"></td>
     <td><input style="${CI}" type="number" value="${r.wTo}" oninput="ped.sur[${i}].wTo=this.value"></td>
     <td><input style="${CI}" type="number" value="${r.dFrom}" oninput="ped.sur[${i}].dFrom=this.value"></td>
     <td><input style="${CI}" type="number" value="${r.dTo}" oninput="ped.sur[${i}].dTo=this.value"></td>
     <td><input style="${CI}" type="number" value="${r.gFrom}" oninput="ped.sur[${i}].gFrom=this.value"></td>
     <td><input style="${CI}" type="number" value="${r.gTo}" oninput="ped.sur[${i}].gTo=this.value"></td>
     <td><input style="${CI};text-align:right" type="number" value="${r.fee}" oninput="ped.sur[${i}].fee=this.value"></td>
     <td><button class="btn ghost sm" style="color:var(--red)" onclick="pedRmSur(${i})">✕</button></td></tr>`).join('') : '<tr><td colspan="8" class="muted">Chưa có quy định phụ thu.</td></tr>') +
    '</tbody></table></div>';
}
function pedAddSur(): void {
  ped.sur.push({ wFrom: '', wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: '' });
  pedRenderSur();
}
function pedRmSur(i: number): void {
  ped.sur.splice(i, 1);
  pedRenderSur();
}
function pedSave(): void {
  if (!ped.name.trim()) {
    toast('Nhập Tên dịch vụ');
    return;
  }
  ped.sur = ped.sur.filter((r: any) => [r.wFrom, r.wTo, r.dFrom, r.dTo, r.gFrom, r.gTo, r.fee].some((v: any) => v !== '' && v != null));
  let id = ped.id || slugify(ped.name);
  if (!ped.id) {
    let b = id, k = 2;
    while (PRICE_SVCS.some(x => x.id === id)) {
      id = b + '-' + k;
      k++;
    }
  }
  ped.id = id;
  const idx = PRICE_SVCS.findIndex(x => x.id === id);
  const rec = JSON.parse(JSON.stringify(ped));
  if (idx >= 0) PRICE_SVCS[idx] = rec;
  else PRICE_SVCS.push(rec);
  savePrice();
  rateSel = rec.name;
  toast('Đã lưu bảng giá ' + rec.name);
  pedClose();
}

function aiInit(): void {
  if (!aiInited) {
    renderAiSamples();
    aiInited = true;
  }
  const body = document.getElementById('ai_invBody');
  if (body && !body.querySelector('tr.ai-row')) {
    body.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center;padding:18px">Chưa có mặt hàng — thêm ảnh (hoặc bấm ảnh mẫu) rồi bấm "AI nhận diện".</td></tr>';
  }
}
function renderAiSamples(): void {
  const w = document.getElementById('ai_samples');
  if (!w) return;
  w.innerHTML = '';
  AI_ITEMS.forEach(it => {
    const b = document.createElement('button');
    b.className = 'chip';
    b.textContent = it.label;
    b.onclick = () => aiAddSample(it.key);
    w.appendChild(b);
  });
}
function aiSetRcv(f: string, val: string, filled: boolean): void {
  const inp = document.getElementById('ai_' + f) as HTMLInputElement;
  if (!inp) return;
  inp.value = val || '';
  const wrap = document.querySelector('#v-create-ai .f[data-aif="' + f + '"]') as HTMLElement;
  if (wrap) {
    wrap.classList.remove('ai-filled');
    if (filled && val) {
      void wrap.offsetWidth;
      wrap.classList.add('ai-filled');
    }
  }
  if (f === 'country') aiUpdateFlag();
}
function aiUpdateFlag(): void {
  const el = document.getElementById('ai_flag');
  if (el) el.textContent = FLAGS[(document.getElementById('ai_country') as HTMLInputElement || {}).value] || '';
}
function aiClearReceiver(): void {
  const paste = document.getElementById('ai_paste') as HTMLTextAreaElement;
  if (paste) paste.value = '';
  ['country', 'company', 'contact', 'tel', 'email', 'tax', 'city', 'state', 'postal', 'addr1', 'addr2', 'addr3'].forEach(f => aiSetRcv(f, '', false));
  const conf = document.getElementById('ai_rconf');
  if (conf) {
    conf.textContent = '';
    conf.className = 'ai-conf';
  }
}
function aiPasteSample(): void {
  const paste = document.getElementById('ai_paste') as HTMLTextAreaElement;
  if (paste) paste.value = "Mr. Lim — LINEX CO. LTD\n+65 8123 4567 · lim@linex.sg\n1 Raffles Place, #20-01, Tower One\nSingapore 238859";
  aiParseReceiver();
}
function aiParseReceiver(): void {
  const raw = ((document.getElementById('ai_paste') as HTMLTextAreaElement)?.value || '').trim();
  if (!raw) {
    toast('Dán thông tin người nhận vào ô rồi bấm AI phân tích');
    return;
  }
  ['country', 'company', 'contact', 'tel', 'email', 'tax', 'city', 'state', 'postal', 'addr1', 'addr2', 'addr3'].forEach(f => aiSetRcv(f, '', false));
  let work = raw.replace(/\r/g, '');
  const set: string[] = [];
  const em = work.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (em) {
    aiSetRcv('email', em[0], true);
    set.push('email');
    work = work.replace(em[0], '');
  }
  const ph = work.match(/\+?\d[\d\s().\-]{6,}\d/);
  if (ph) {
    aiSetRcv('tel', ph[0].trim(), true);
    set.push('tel');
    work = work.replace(ph[0], '');
  }
  const tx = work.match(/(?:tax|gst|vat|mst)[^A-Za-z0-9]{0,4}([A-Za-z0-9\-]{5,})/i);
  if (tx) {
    aiSetRcv('tax', tx[1], true);
    set.push('tax');
    work = work.replace(tx[0], '');
  }
  let country = '';
  const clist = Object.keys(FLAGS).concat(['United Kingdom', 'Germany', 'France', 'Japan', 'South Korea', 'Korea', 'Thailand', 'Netherlands', 'Italy', 'Spain', 'India', 'Indonesia', 'Philippines', 'Hong Kong', 'New Zealand']);
  clist.sort((a, b) => b.length - a.length).some(c => {
    if (new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i').test(work)) {
      country = c;
      return true;
    }
    return false;
  });
  if (country) {
    aiSetRcv('country', country, true);
    set.push('country');
  }
  let lines = work.split(/\n/).map(s => s.replace(/^[·|,\s]+|[·|,\s]+$/g, '').trim()).filter(Boolean);
  let contact = '', company = '';
  if (lines.length) {
    const parts = lines[0].split(/\s[—\-\/|]\s|,\s*/).map(s => s.trim()).filter(Boolean);
    company = parts.find(p => /\b(co\.?|ltd|inc|company|pte|llc|corp|gmbh|jsc|sa)\b/i.test(p)) || '';
    contact = parts.find(p => p !== company) || (company ? '' : parts[0]) || lines[0];
    lines.shift();
  }
  if (company) {
    aiSetRcv('company', company, true);
    set.push('company');
  }
  if (contact) {
    aiSetRcv('contact', contact, true);
    set.push('contact');
  }
  let postal = '';
  for (let i = lines.length - 1; i >= 0; i--) {
    const m = lines[i].match(/\b([A-Z]{0,2}\d{4,6}|\d{3,5}\s?[A-Z]{2})\b/);
    if (m) {
      postal = m[1];
      break;
    }
  }
  if (postal) {
    aiSetRcv('postal', postal, true);
    set.push('postal');
  }
  const cityLine = (country && lines.find(l => l.toLowerCase().includes(country.toLowerCase()))) || (postal && lines.find(l => l.includes(postal))) || '';
  if (cityLine) {
    let city = cityLine.replace(new RegExp(country, 'i'), '').replace(postal, '').replace(/[,·|]/g, ' ').trim();
    if (!city && country && ['Singapore', 'Hong Kong', 'Malaysia'].includes(country)) city = country;
    if (city && city.length <= 24 && !/\d{3,}/.test(city)) {
      aiSetRcv('city', city, true);
      set.push('city');
    }
  }
  const streetLines = lines.filter(l => l !== cityLine || /#|\d+\s*[A-Za-z]/.test(l.replace(postal, '')));
  ['addr1', 'addr2', 'addr3'].forEach((f, i) => {
    if (streetLines[i]) {
      aiSetRcv(f, streetLines[i], true);
      set.push(f);
    }
  });
  const need = ['country', 'contact', 'tel', 'city', 'postal', 'addr1'];
  const got = need.filter(x => set.includes(x)).length;
  const pct = Math.min(99, Math.round(got / need.length * 100) + (set.includes('email') ? 4 : 0));
  const c = document.getElementById('ai_rconf');
  if (c) {
    c.textContent = 'Độ tin cậy ~' + pct + '% · đã điền ' + set.length + ' ô';
    c.className = 'ai-conf' + (pct < 60 ? ' low' : '');
  }
  toast('AI đã tách ' + set.length + ' trường — kiểm tra ô tô xanh');
}

function aiAddSample(key: string): void {
  const it = AI_ITEMS.find(x => x.key === key);
  if (!it) return;
  aiPhotos.push({ key, emoji: it.emoji });
  aiRenderPhotos();
}
function aiOnFiles(files: FileList): void {
  Array.from(files).forEach(() => {
    const it = AI_ITEMS[(aiPhotos.length) % AI_ITEMS.length];
    aiPhotos.push({ key: it.key, emoji: it.emoji });
  });
  aiRenderPhotos();
  const fileInp = document.getElementById('ai_file') as HTMLInputElement;
  if (fileInp) fileInp.value = '';
}
function aiRmPhoto(i: number): void {
  aiPhotos.splice(i, 1);
  aiRenderPhotos();
}
function aiRenderPhotos(): void {
  const w = document.getElementById('ai_photos');
  if (!w) return;
  w.innerHTML = '';
  aiPhotos.forEach((p, i) => {
    const it = (AI_ITEMS.find(x => x.key === p.key) || {}) as any;
    const d = document.createElement('div');
    d.className = 'ai-thumb';
    d.innerHTML = `<div class="ph">${p.url ? `<img src="${p.url}" style="width:96px;height:72px;object-fit:cover">` : 'Ảnh'}</div><div class="cap">${p.fname || it.label || ''}</div><button class="rmp" onclick="aiRmPhoto(${i})">✕</button>`;
    w.appendChild(d);
  });
  const has = aiPhotos.length > 0, btn = document.getElementById('ai_recog') as HTMLButtonElement;
  if (btn) btn.disabled = !has;
  const h = document.getElementById('ai_recogHint');
  if (h) h.textContent = has ? (aiPhotos.length + ' ảnh — bấm để AI nhận diện') : 'Thêm ít nhất 1 ảnh để AI nhận diện.';
}
function aiRecognize(): void {
  if (!aiPhotos.length) return;
  const body = document.getElementById('ai_invBody');
  if (body && body.querySelector('td[colspan]')) body.innerHTML = '';
  document.querySelectorAll('#ai_photos .ai-thumb').forEach(t => t.classList.add('busy'));
  const btn = document.getElementById('ai_recog') as HTMLButtonElement;
  if (btn) btn.disabled = true;
  const multi = (document.getElementById('ai_multi') as HTMLInputElement)?.checked;
  const batch = [...aiPhotos];
  setTimeout(() => {
    batch.forEach((p, idx) => {
      const it = AI_ITEMS.find(x => x.key === p.key) || AI_ITEMS[0];
      aiInvRow(it);
      if (multi && idx === 0) AI_ITEMS.filter(x => x.key !== it.key).slice(0, 2).forEach(e => aiInvRow(e));
    });
    aiPhotos = [];
    aiRenderPhotos();
    aiCalc();
    const banner = document.getElementById('ai_banner');
    if (banner) banner.hidden = false;
    if (btn) btn.disabled = false;
    toast('AI đã nhận diện xong — kiểm tra tên hàng & mã HS');
    setTimeout(() => document.querySelectorAll('#ai_invBody tr.newrow').forEach(r => r.classList.remove('newrow')), 1200);
  }, 700);
}
function aiInvRow(it: any): void {
  const id = ++aiRowId;
  const tr = document.createElement('tr');
  tr.className = 'ai-row newrow';
  tr.dataset.id = String(id);
  const hsOpts = (it.hs || []).map((h: string, i: number) => `<option value="${h}">${h}${i === 0 ? ' — AI đề xuất' : ''}</option>`).join('');
  tr.innerHTML = `<td class="num-c"></td>
    <td><textarea rows="1" data-c="en" placeholder="Tên hàng (EN)">${it.en || ''}</textarea>
        <textarea rows="1" data-c="vi" placeholder="Tên hàng (VN)">${it.vi || ''}</textarea>
        <textarea rows="1" data-c="mnf" placeholder="Nhà sản xuất">${it.mnf || ''}</textarea>
        <textarea rows="1" data-c="mat" placeholder="Chất liệu">${it.mat || ''}</textarea>
        <span class="ai-tag">AI ${it.conf || 95}%</span>${it.warn ? ` <span class="badge b-wait" style="font-size:10.5px">${it.warn}</span>` : ''}</td>
    <td><input data-c="origin" value="${it.origin || 'VN'}"></td>
    <td><select class="hs-pick" data-c="hs">${hsOpts}</select></td>
    <td><div class="qtywrap" style="display:flex;gap:4px"><input data-c="qty" type="number" value="${it.qty || 1}" oninput="aiCalc()" style="max-width:52px"><select data-c="unit"><option>PCS</option><option>SET</option><option>BOX</option><option>KG</option></select></div></td>
    <td><input data-c="price" type="number" step="0.01" value="${it.price || 0}" oninput="aiCalc()"></td>
    <td data-c="sub" class="tnum">0</td>
    <td><button class="xbtn" onclick="aiDelRow(${id})">✕</button></td>`;
  const body = document.getElementById('ai_invBody');
  if (body) body.appendChild(tr);
  if (it.unit) {
    const unitSel = tr.querySelector('[data-c=unit]') as HTMLSelectElement;
    if (unitSel) unitSel.value = it.unit;
  }
}
function aiDelRow(id: number): void {
  const tr = document.querySelector('#ai_invBody tr[data-id="' + id + '"]');
  if (tr) tr.remove();
  const body = document.getElementById('ai_invBody');
  if (body && !body.querySelector('tr.ai-row')) aiInit();
  aiCalc();
}
function aiCalc(): void {
  const cur = (document.getElementById('ai_cur') as HTMLSelectElement)?.value || 'USD', sym = CURSYM[cur] || '$';
  let tot = 0;
  document.querySelectorAll<HTMLElement>('#ai_invBody tr.ai-row').forEach((r, i) => {
    const num = r.querySelector('.num-c');
    if (num) num.textContent = String(i + 1);
    const q = +(r.querySelector<HTMLInputElement>('[data-c=qty]')?.value || 0), p = +(r.querySelector<HTMLInputElement>('[data-c=price]')?.value || 0), s = q * p;
    tot += s;
    const sub = r.querySelector('[data-c=sub]');
    if (sub) sub.textContent = sym + s.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });
  const el = document.getElementById('ai_total');
  if (el) el.textContent = sym + tot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Bind Global Window Functions
const exportsToWindow: Record<string, any> = {
  nav,
  setCreateMode,
  setStep,
  go,
  validate,
  isPack,
  fillHubs,
  setType,
  checkDocWeight,
  updateFlag,
  kienRow,
  delKien,
  addKien,
  calcKien,
  evalSurcharge,
  renderKienWarn,
  invRow,
  delInv,
  addInv,
  calcInvoice,
  catOptions,
  briefCatChange,
  toggleCatMenu,
  closeCatMenu,
  selectCat,
  toggleCatFav,
  multiLbl,
  updateMultiBox,
  openMultiPick,
  closeMultiPick,
  renderMultiPickList,
  multiTally,
  applyMulti,
  renderMultiTable,
  rmMulti,
  orderSummary,
  computeFees,
  submitOrder,
  closeFee,
  confirmCreate,
  doCreate,
  saveDraft,
  renderDrafts,
  editDraft,
  delDraft,
  printDraft,
  updateDraftCount,
  openTrouble,
  closeTrb,
  submitTrouble,
  renderTroubles,
  remindTrouble,
  openTroubleDetail,
  updateTrbCount,
  ecomTab,
  pushMethod,
  addEprod,
  renderEcomSrcChips,
  renderEcom,
  copyText,
  openPicker,
  closeModal,
  choosePick,
  setV,
  fillReceiver,
  getReceiver,
  setRcvLbl,
  saveReceiver,
  editReceiver,
  deleteReceiver,
  openAddons,
  closeAddons,
  renderAddonList,
  tallyAddons,
  applyAddons,
  renderAddonChips,
  rmAddon,
  renderBranchChips,
  sortOrders,
  sortVal,
  dParse,
  parseKg,
  dOnly,
  applyFilter,
  changePageSize,
  clearFilters,
  renderPager,
  goPage,
  renderOrders,
  openDrawerBill,
  toggleAll,
  openPhotos,
  closePhotos,
  openPrintMenu,
  closePmenu,
  syncQuickPieces,
  setBranch,
  setStatusTab,
  openRowMenu,
  rowDo,
  copyTrack,
  toggleHelp,
  printDo,
  openDrawer,
  closeDrawer,
  copyLink,
  toast,
  updateNotiCount,
  renderNoti,
  openNoti,
  markAllRead,
  renderPickups,
  submitPickup,
  showPop,
  closePop,
  priceTab,
  priceAt,
  priceCalc,
  doPriceLookup,
  priceSort,
  renderPriceResult,
  renderRateChips,
  renderRateTable,
  pmgrRender,
  pmgrReset,
  pmgrDel,
  pmgrNew,
  pmgrEdit,
  pedClose,
  pedOpen,
  pedZ,
  pedZoneOpts,
  pedRenderZones,
  pedRefreshZoneUI,
  pedResizeZones,
  pedRenderCountries,
  pedRenameCountry,
  pedSetCountryZone,
  pedAddCountry,
  pedRmCountry,
  pedRenderQF,
  pedQuickFill,
  pedRenderGrid,
  pedRenderOver,
  pedRenderSur,
  pedAddSur,
  pedRmSur,
  pedSave,
  aiInit,
  renderAiSamples,
  aiSetRcv,
  aiUpdateFlag,
  aiClearReceiver,
  aiPasteSample,
  aiParseReceiver,
  aiAddSample,
  aiOnFiles,
  aiRmPhoto,
  aiRenderPhotos,
  aiRecognize,
  aiInvRow,
  aiDelRow,
  aiCalc,
  bindCounters
};

// Aliases for compatibility
function closeFav(): void { closeCatMenu(); }
function toggleFavorite(ev: Event, c: string): void { toggleCatFav(ev, c); }
function selectSender(s: any): void { choosePick(s); }
function selectReceiver(r: any): void { choosePick(r); }
function selectProduct(p: any): void { choosePick(p); }
function removeKien(id: number): void { delKien(id); }
function removeInv(id: number): void { delInv(id); }
function removeEprod(btn: HTMLElement): void { btn?.parentElement?.remove(); }
const delEprod = removeEprod;
const openPmenu = openPrintMenu;
const viewOrder = openDrawer;

Object.assign(exportsToWindow, {
  closeFav,
  toggleFavorite,
  selectSender,
  selectReceiver,
  selectProduct,
  removeKien,
  removeInv,
  removeEprod,
  delEprod,
  openPmenu,
  viewOrder
});

Object.keys(exportsToWindow).forEach(k => {
  (window as any)[k] = exportsToWindow[k];
});
(window as any).VA = exportsToWindow;

// Event Listeners Initialization
function initDomEvents(): void {
  document.querySelectorAll('.nav a').forEach(a => {
    (a as HTMLElement).onclick = e => {
      e.preventDefault();
      const el = a as HTMLElement;
      if (el.dataset.view === 'create') createMode = el.dataset.mode || createMode;
      nav(el.dataset.view || 'home');
      if (el.dataset.view === 'create') setCreateMode(createMode);
    };
  });

  let navState: Record<string, boolean> = {};
  try {
    navState = JSON.parse(localStorage.getItem('va_nav_sec') || '{}');
  } catch (e) {}
  document.querySelectorAll<HTMLElement>('.nav-sec').forEach(sec => {
    const saved = navState[sec.dataset.sec || ''];
    if (typeof saved === 'boolean') setNavSection(sec, saved, false);
    const btn = sec.querySelector<HTMLElement>('.nav-parent');
    if (btn) btn.onclick = () => {
      // Sidebar đang thu gọn chỉ còn icon → mở rộng lại để thấy mục con
      const app = document.getElementById('app');
      if (app?.classList.contains('collapsed') && !matchMedia('(max-width:1040px)').matches) {
        app.classList.remove('collapsed');
        try {
          localStorage.setItem('va_collapsed', '0');
        } catch (e) {}
        setNavSection(sec, true);
        return;
      }
      setNavSection(sec, !sec.classList.contains('open'));
    };
  });
  syncNavActive();

  const menuToggle = document.getElementById('menuToggle');
  if (menuToggle) {
    menuToggle.onclick = () => {
      if (matchMedia('(max-width:1040px)').matches) {
        document.getElementById('sidebar')?.classList.toggle('open');
      } else {
        const a = document.getElementById('app');
        if (a) {
          a.classList.toggle('collapsed');
          try {
            localStorage.setItem('va_collapsed', a.classList.contains('collapsed') ? '1' : '0');
          } catch (e) {}
        }
      }
    };
  }

  try {
    if (localStorage.getItem('va_collapsed') === '1') {
      document.getElementById('app')?.classList.add('collapsed');
    }
  } catch (e) {}

  const themeBtn = document.getElementById('themeBtn');
  if (themeBtn) {
    themeBtn.onclick = () => {
      const r = document.documentElement;
      const cur = r.getAttribute('data-theme');
      const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
      r.setAttribute('data-theme', dark ? 'light' : 'dark');
      const themeIc = document.getElementById('themeIc');
      if (themeIc) themeIc.innerHTML = dark ? ICON_MOON : ICON_SUN;
    };
  }

  document.querySelectorAll<HTMLElement>('#chips [data-f]').forEach(c => {
    c.onclick = () => setStatusTab(c.dataset.f || 'all');
  });

  document.querySelectorAll<HTMLElement>('#stepRail .step').forEach(s => {
    s.onclick = () => {
      const d = +(s.dataset.step || 0);
      if (d <= step || validate(step)) setStep(d);
    };
  });

  document.addEventListener('click', e => {
    if (!(e.target as HTMLElement).closest('#catDD')) closeCatMenu();
    if (!(e.target as HTMLElement).closest('#pmenu,#omenu,.print-btn,.row-more')) closePmenu();
    if (!(e.target as HTMLElement).closest('.help-wrap')) { const h = document.getElementById('helpPop'); if (h) h.hidden = true; }
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeDrawer();
      closeModal();
      closeAddons();
      closePop();
      closeFee();
      closeTrb();
      closePhotos();
      closePmenu();
      closeCatMenu();
      closeMultiPick();
    }
  });

  fillHubs();
  setType('PACK');
  bindCounters();
  setRcvLbl();
  selectCat('Quần áo và hàng may mặc');
  kienRow({ sl: 1, pack: 'Thùng carton', d: 30, w: 20, h: 15, g: 8 });
  invRow({ cat: 'Quần áo và hàng may mặc', en: "Women's flower dress", vi: 'Váy hoa nữ', mnf: 'Cty May ABC, TP.HCM', hs: '6204.43', origin: 'VN', unit: 'PCS', qty: 5, price: 8 });
  renderOrders();
  renderNoti();
  renderPickups();
  renderDrafts();
  renderTroubles();
  updateNotiCount();
  updateDraftCount();
  updateTrbCount();
  addEprod();
  addEprod();
  renderEcomSrcChips();
  renderEcom();
  setTimeout(showPop, 600);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDomEvents);
} else {
  initDomEvents();
}
