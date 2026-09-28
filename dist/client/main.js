/**
 * Việt An Express Portal — Client Application
 * Written in 100% Strict TypeScript
 * Fully interactive with global window exposure for inline DOM handlers.
 */
// Global definitions and constants
const LIMITS = { s_addr: 60, r_addr1: 30, r_addr2: 30, r_addr3: 30 };
const HUBS = {
    Aramex: ['Aramex - Dubai', 'Aramex - GCC'],
    DHL: ['DHL - Singapore', 'DHL - Hong Kong', 'DHL - VN'],
    Fedex: ['Fedex - US', 'Fedex - EU'],
    UPS: ['UPS - US', 'UPS - EU'],
    'Chuyên tuyến': ['Chuyên tuyến - Singapore', 'Chuyên tuyến - EU', 'Chuyên tuyến - AU_Toll Vip', 'Chuyên tuyến - China'],
    'Ủy quyền Việt An': ['UQ - Standard'],
    Ecommerce: ['Ecom - Asia'],
    SEA: ['SEA - Full']
};
const FLAGS = {
    Singapore: '🇸🇬',
    Malaysia: '🇲🇾',
    'United States': '🇺🇸',
    Australia: '🇦🇺',
    Belgium: '🇧🇪',
    China: '🇨🇳',
    Mexico: '🇲🇽',
    Canada: '🇨🇦',
    Taiwan: '🇹🇼',
    'United Arab Emirates': '🇦🇪'
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
const CAT_SUGGEST = {
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
let ORDERS = [
    { seq: 8, bill: '6156979', connect: '', ref: 'PO-A100', cnee: 'LINEX CO. LTD', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '09/09/2026 09:12', sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 8.0 kg', content: 'CONSOL', track: '—', pod: null, photos: 2 },
    { seq: 7, bill: '6156829', connect: '', ref: '', cnee: 'NGUYEN DAI QUANG', ct: 'Belgium', route: 'Chuyên tuyến - EU', branch: 'Hà Nội', created: '09/09/2026 08:50', sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 13.5 kg', content: 'THỰC PHẨM', track: '—', pod: null, photos: 1 },
    { seq: 6, bill: '6156540', connect: 'TollVIP-AU-33912', ref: 'PO-778', cnee: 'XIEU BINH THAI', ct: 'Australia', route: 'Chuyên tuyến - AU_Toll Vip', branch: 'Huế', created: '08/09/2026 14:02', sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 5.0 kg', content: 'AO DAI (100% COTTON)', track: '6156540', pod: null, photos: 2 },
    { seq: 5, bill: '6156452', connect: '1Z9A8X0312', ref: '', cnee: 'SIMON RUSSAK', ct: 'United States', route: 'DHL - Singapore', branch: 'TP.HCM', created: '08/09/2026 13:30', sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 0.5 kg', content: 'Stainless steel bracelet', track: '8371739935', pod: null, photos: 3 },
    { seq: 4, bill: '6155755', connect: '6155755SG', ref: 'PO-551', cnee: 'Rachael Lee', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Bảo Lộc', created: '08/09/2026 10:11', sent: '08/09/2026', type: 'PACK', st: 'nd', pcs: '7 kiện · 164.5 kg', content: "WOMEN'S FLOWER DRESS", track: '6155755', pod: null, photos: 2 },
    { seq: 3, bill: '6154952', connect: '6154952SG', ref: '', cnee: 'LINEX CO. LTD', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '05/09/2026 09:20', sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '1 kiện · 6.0 kg', content: 'CONSOL', track: '6154952', pod: { date: '05/09/2026', time: '16:40', signer: 'LIM C.S.' }, photos: 1 },
    { seq: 2, bill: '6154891', connect: '6154891SG', ref: 'PO-330', cnee: 'CJI-ARDYAN', ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Cần Thơ', created: '05/09/2026 08:40', sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '3 kiện · 39.0 kg', content: 'FALSE EYELASHES', track: '6154891', pod: { date: '05/09/2026', time: '15:05', signer: 'ARDYAN' }, photos: 2 },
    { seq: 1, bill: '6155057', connect: 'DHL-VN-8726187061', ref: '', cnee: 'TERANA, S.A.', ct: 'Mexico', route: 'DHL - VN', branch: 'Hà Nội', created: '02/09/2026 11:00', sent: '02/09/2026', type: 'DOC', st: 'late', pcs: '1 · 0.5 kg', content: 'Document', track: '8726187061', pod: null, photos: 1 }
];
let DRAFTS = [
    { id: 'd1', stt: 'draft', cnee: 'HOANG LE', ct: 'United States', service: 'KSN-SEA-USA-UPS', branch: 'TP.HCM', ref: 'PO-889', pcs: '2 kiện · 30.0 kg', content: 'HẠT SEN / HẠT BÍ', date: '09/09/2026 10:12' },
    { id: 'd2', stt: 'ready', cnee: 'Rachael Lee', ct: 'Singapore', service: 'Chuyên tuyến - Singapore', branch: 'Bảo Lộc', ref: 'PO-551', pcs: '1 kiện · 8.0 kg', content: 'Váy hoa nữ', date: '09/09/2026 09:40' }
];
let orderSeq = 9;
let billSeq = 6156980;
const ST = {
    wait: ['b-wait', 'Chưa đi'],
    fly: ['b-fly', 'Đã đi'],
    nd: ['b-nd', 'Chưa phát'],
    ok: ['b-ok', 'Đã phát'],
    late: ['b-late', 'Vượt ngày']
};
const SICON = {
    wait: ['🕒', 'Chưa đi', 'var(--blue)'],
    fly: ['✈️', 'Đã đi', 'var(--green-d)'],
    nd: ['🚚', 'Chưa phát', 'var(--amber)'],
    ok: ['✅', 'Đã phát', 'var(--green-dd)'],
    late: ['⏰', 'Vượt ngày', 'var(--red)']
};
const STRANK = { wait: 1, fly: 2, nd: 3, ok: 4, late: 5 };
const CURSYM = { USD: '$', EUR: '€', VND: '₫' };
const CRUMBS = {
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
const CARRIER_RULES = {
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
const TRB_LV = { low: ['b-lo', 'Thường'], mid: ['b-mid', 'Gấp'], high: ['b-hi', 'Rất gấp'] };
const TRB_ST = { new: ['b-wait', 'Mới'], doing: ['b-fly', 'Đang xử lý'], waitc: ['b-nd', 'Chờ khách phản hồi'], done: ['b-ok', 'Đã xử lý'] };
let TROUBLES = [
    { id: 'TRB-1024', bill: '6155755', cnee: 'Rachael Lee', ct: 'Singapore', type: 'Giao chậm / trễ hẹn', lv: 'mid', desc: 'Đơn quá 3 ngày chưa phát, khách hối gấp.', req: 'Nguyễn Văn A', contact: '0901 234 567', date: '09/09/2026 08:20', status: 'doing', reply: 'CS Việt An: Đang liên hệ hãng bay kiểm tra hành trình, sẽ cập nhật trong hôm nay. Cảm ơn Quý khách.' }
];
let trbSeq = 1025;
const SRC = {
    tiktok: ['🎵', 'TikTok', 'src-tiktok'],
    shopify: ['🛍️', 'Shopify', 'src-shopify'],
    shopee: ['🧡', 'Shopee', 'src-shopee'],
    lazada: ['💙', 'Lazada', 'src-lazada'],
    api: ['🔌', 'API', 'src-api'],
    excel: ['📄', 'Excel', 'src-excel'],
    manual: ['✍️', 'Tay', 'src-manual']
};
const ECOM_ST = {
    created: ['🟢', 'Đã tạo', 'b-fly'],
    picked_up: ['🚚', 'Đã lấy', 'b-wait'],
    departed: ['✈️', 'Đã đi', 'b-fly'],
    delivered: ['✅', 'Đã phát', 'b-ok'],
    exception: ['⚠️', 'Lỗi', 'b-late'],
    weighing: ['⚖️', 'Chờ cân đo', 'b-nd']
};
let ECOM = [
    { src: 'tiktok', ref: 'TT-88213', bill: '6156991', cnee: 'Emma W.', ct: 'Singapore', items: 3, kg: 1.2, st: 'created', note: '' },
    { src: 'shopify', ref: '#1042', bill: '6156990', cnee: 'John Lee', ct: 'Australia', items: 2, kg: 0.8, st: 'picked_up', note: '' },
    { src: 'excel', ref: 'ORD-501', bill: '6156989', cnee: 'Marie Curie', ct: 'Belgium', items: 1, kg: 0.5, st: 'created', note: '' },
    { src: 'api', ref: 'A-77120', bill: '6156988', cnee: 'Tanaka K.', ct: 'United States', items: 4, kg: 2.1, st: 'departed', note: '' },
    { src: 'shopee', ref: 'SP-3391', bill: '', cnee: 'Nguyen T.', ct: 'Malaysia', items: 2, kg: 0, st: 'exception', note: 'Thiếu HS code' },
    { src: 'manual', ref: 'TT-90011', bill: '6156987', cnee: 'David C.', ct: 'Canada', items: 1, kg: 0.3, st: 'delivered', note: '' },
    { src: 'lazada', ref: 'LZ-2201', bill: '6156986', cnee: 'Siti R.', ct: 'Singapore', items: 2, kg: 0, st: 'weighing', note: 'Chờ VA cân đo' },
    { src: 'tiktok', ref: 'TT-88190', bill: '6156985', cnee: 'Chen W.', ct: 'China', items: 5, kg: 3.4, st: 'created', note: '' }
];
const PRICE_NOTE = '⚠️ Giá trên là ước tính, CHƯA bao gồm các phí charge khác căn cứ theo mặt hàng và của hãng bay quy định thêm. Vui lòng đọc quy định của hãng và liên hệ nhân viên Việt An để được tư vấn thêm.';
const PRICE_STEPS = (() => {
    const a = [];
    for (let w = 0.5; w <= 70.0001; w += 0.5)
        a.push(+w.toFixed(1));
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
function slugify(s) {
    return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || ('svc' + Date.now());
}
function mkSvc(sd) {
    const zn = Object.keys(sd.base).map(Number).sort((a, b) => a - b);
    const price = {}, over70 = {};
    zn.forEach(z => {
        price[z] = PRICE_STEPS.map((_, i) => sd.base[z] + (sd.step[z] || 0) * i);
        over70[z] = (sd.step[z] || 0) * 2;
    });
    const sur = [];
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
function loadPrice() {
    try {
        const r = localStorage.getItem(PRICE_KEY);
        if (r) {
            const a = JSON.parse(r);
            if (Array.isArray(a) && a.length)
                return a;
        }
    }
    catch (e) { }
    return PRICE_SEED.map(mkSvc);
}
function savePrice() {
    try {
        localStorage.setItem(PRICE_KEY, JSON.stringify(PRICE_SVCS));
    }
    catch (e) { }
}
let PRICE_SVCS = loadPrice();
const AI_ITEMS = [
    { key: 'ao-thun', label: '👕 Áo thun', emoji: '👕', en: "Men's cotton T-shirt", vi: 'Áo thun cotton nam', mnf: 'Cty May Việt Tiến, TP.HCM, VN', mat: 'Cotton 100%', origin: 'VN', hs: ['6109.10', '6109.90', '6205.20'], unit: 'PCS', qty: 2, price: 6, conf: 96 },
    { key: 'tai-nghe', label: '🎧 Tai nghe bluetooth', emoji: '🎧', en: 'Wireless bluetooth earbuds', vi: 'Tai nghe không dây bluetooth', mnf: 'Shenzhen Audio Co., Ltd, CN', mat: 'Nhựa ABS + pin lithium', origin: 'CN', hs: ['8518.30', '8517.62', '8518.29'], unit: 'SET', qty: 1, price: 15, conf: 92, warn: '⚠️ Có pin lithium — hàng nhạy cảm' },
    { key: 'do-choi', label: '🧸 Đồ chơi nhựa', emoji: '🧸', en: 'Plastic toy car', vi: 'Xe ô tô đồ chơi nhựa', mnf: 'Cty Nhựa Chợ Lớn, TP.HCM, VN', mat: 'Nhựa PP', origin: 'VN', hs: ['9503.00', '9503.90'], unit: 'PCS', qty: 3, price: 4, conf: 94 },
    { key: 'my-pham', label: '💄 Son môi', emoji: '💄', en: 'Lipstick', vi: 'Son môi', mnf: 'Cty Mỹ phẩm ABC, TP.HCM, VN', mat: 'Sáp ong, dầu dưỡng, chất tạo màu', origin: 'VN', hs: ['3304.10', '3304.99'], unit: 'PCS', qty: 5, price: 7, conf: 90, warn: '⚠️ Mỹ phẩm — có thể cần công bố' },
    { key: 'giay', label: '👟 Giày thể thao', emoji: '👟', en: 'Sports sneakers', vi: 'Giày thể thao', mnf: "Cty Giày Bình Tiên (Biti's), VN", mat: 'Vải dệt + đế cao su', origin: 'VN', hs: ['6404.11', '6404.19'], unit: 'PCS', qty: 1, price: 20, conf: 93 }
];
// UI State Variables
let step = 1, createMode = 'wizard';
let kienId = 0, invId = 0;
let FAV_CATS = ['Thực phẩm chức năng', 'Đồ chơi và sản phẩm trẻ em'];
let multiCats = [];
let pendingSummary = null;
let curTrbBill = '';
let pickMode = '';
let rcvEditIdx = null;
let selAddons = [];
let filter = 'all', branchFilter = 'all', sortState = { field: 'seq', dir: 'desc' }, pageSize = 20, curPage = 1;
let ecomSrcFilter = 'all';
let eprodN = 0;
let priceRows = [], priceSortState = { f: 'tong', dir: 'asc' };
let rateSel = '';
let ped = null;
let aiPhotos = [], aiRowId = 0, aiInited = false;
// UI Helper Functions
function toast(msg, type = '') {
    const w = document.getElementById('toasts');
    if (!w)
        return;
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
function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function nowStr() {
    const d = new Date(), p = (x) => String(x).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
}
function today() {
    const d = new Date(), p = (x) => String(x).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()}`;
}
function fmtVnd(n) {
    return (Math.round(n)).toLocaleString('vi-VN') + 'đ';
}
function fmtV(n) {
    return (Math.round(n)).toLocaleString('vi-VN') + 'đ';
}
function fmtDMY(s) {
    if (!s)
        return '—';
    const p = s.split('-');
    return p.length === 3 ? p[2] + '/' + p[1] + '/' + p[0] : s;
}
const _lo = (v) => (v === '' || v == null || isNaN(+v)) ? 0 : +v;
const _hi = (v) => (v === '' || v == null || isNaN(+v)) ? 1e9 : +v;
function girthA(D, W, H) {
    const s = [+D || 0, +W || 0, +H || 0].sort((a, b) => b - a);
    return s[0] + (s[1] + s[2]) * 2;
}
function isPack() {
    const checked = document.querySelector('[name=ptype]:checked');
    return (checked || {}).value === 'PACK';
}
function bindCounters() {
    document.querySelectorAll('[data-count]').forEach(c => {
        const el = c;
        const n = el.dataset.count || '';
        const inp = document.querySelector('[name=' + n + ']');
        if (!inp)
            return;
        const lim = LIMITS[n] || 0;
        if (lim)
            inp.setAttribute('maxlength', String(lim));
        const upd = () => (el.textContent = inp.value.length + (lim ? '/' + lim : ''));
        inp.addEventListener('input', upd);
        upd();
    });
}
function nav(v) {
    document.querySelectorAll('.view').forEach(s => (s.hidden = true));
    const target = document.getElementById('v-' + v);
    if (target)
        target.hidden = false;
    document.querySelectorAll('.nav a').forEach(a => {
        const el = a;
        el.classList.toggle('on', el.dataset.view === v);
    });
    const crumb = document.getElementById('crumb');
    if (crumb)
        crumb.textContent = CRUMBS[v] || v;
    const sidebar = document.getElementById('sidebar');
    if (sidebar)
        sidebar.classList.remove('open');
    window.scrollTo(0, 0);
    if (v === 'drafts')
        renderDrafts();
    if (v === 'trouble')
        renderTroubles();
    if (v === 'price')
        doPriceLookup();
    if (v === 'create-ai')
        aiInit();
}
function setCreateMode(m) {
    createMode = m;
    const quick = m === 'quick';
    const vCreate = document.getElementById('v-create');
    if (vCreate)
        vCreate.classList.toggle('quick', quick);
    const stepRail = document.getElementById('stepRail');
    if (stepRail)
        stepRail.hidden = quick;
    const sub = document.getElementById('createSub');
    if (sub)
        sub.textContent = quick ? 'Điền tất cả trên 1 trang · tự lưu nháp' : '3 bước · tự lưu nháp';
    document.querySelectorAll('#modeSeg input').forEach(r => (r.checked = r.value === m));
    const f1 = document.getElementById('foot1');
    const f2 = document.getElementById('foot2');
    const fb = document.getElementById('foot3back');
    if (quick) {
        document.querySelectorAll('.wstep').forEach(s => (s.hidden = false));
        if (f1)
            f1.hidden = true;
        if (f2)
            f2.hidden = true;
        if (fb)
            fb.style.display = 'none';
        renderDrafts();
    }
    else {
        if (f1)
            f1.hidden = false;
        if (f2)
            f2.hidden = false;
        if (fb)
            fb.style.display = '';
        setStep(step);
    }
    const qd = document.getElementById('quickDrafts');
    if (qd)
        qd.hidden = !quick;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function go(n) {
    if (n > step && !validate(step))
        return;
    setStep(n);
}
function setStep(n) {
    step = n;
    document.querySelectorAll('.wstep').forEach(s => (s.hidden = +(s.dataset.step || 0) !== n));
    document.querySelectorAll('#stepRail .step').forEach(s => {
        const d = +(s.dataset.step || 0);
        s.classList.toggle('active', d === n);
        s.classList.toggle('done', d < n);
    });
}
function validate(n) {
    const box = document.querySelector('.wstep[data-step="' + n + '"]');
    if (!box)
        return true;
    let ok = true, first = null;
    box.querySelectorAll('[data-req]').forEach(c => {
        if (c.offsetParent === null) {
            c.classList.remove('err');
            return;
        }
        if (!String(c.value).trim()) {
            ok = false;
            c.classList.add('err');
            if (!first)
                first = c;
        }
        else {
            c.classList.remove('err');
        }
    });
    if (n === 2 && isPack()) {
        document.querySelectorAll('#kienBody .kien-row').forEach(r => {
            ['sl', 'pack'].forEach(k => {
                const el = r.querySelector('[data-k=' + k + ']');
                if (el) {
                    if (!String(el.value).trim()) {
                        ok = false;
                        el.classList.add('err');
                        if (!first)
                            first = el;
                    }
                    else {
                        el.classList.remove('err');
                    }
                }
            });
        });
    }
    if (n === 3 && isPack()) {
        document.querySelectorAll('#invBody tr').forEach(r => {
            ['en', 'qty', 'price'].forEach(k => {
                const el = r.querySelector('[data-c=' + k + ']');
                if (el) {
                    if (!String(el.value).trim()) {
                        ok = false;
                        el.classList.add('err');
                        if (!first)
                            first = el;
                    }
                    else {
                        el.classList.remove('err');
                    }
                }
            });
        });
    }
    if (!ok) {
        if (first) {
            first.focus();
            first.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        toast('⚠️ Còn ô bắt buộc chưa điền — mình đã tô đỏ giúp bạn');
    }
    return ok;
}
function fillHubs() {
    const s = document.getElementById('service')?.value || '';
    const h = document.getElementById('hub');
    if (!h)
        return;
    h.innerHTML = '<option value="">— Chọn HUB —</option>';
    (HUBS[s] || []).forEach(x => {
        const o = document.createElement('option');
        o.textContent = x;
        h.appendChild(o);
    });
    if (HUBS[s] && HUBS[s][0])
        h.value = HUBS[s][0];
    calcKien();
}
function setType(t) {
    const pack = t === 'PACK';
    const packBrief = document.getElementById('packBrief');
    const docBrief = document.getElementById('docBrief');
    const kienSection = document.getElementById('kienSection');
    const invSection = document.getElementById('invSection');
    const docNoInv = document.getElementById('docNoInv');
    const over2 = document.getElementById('over2note');
    if (packBrief)
        packBrief.hidden = !pack;
    if (docBrief)
        docBrief.hidden = pack;
    if (kienSection)
        kienSection.hidden = !pack;
    if (invSection)
        invSection.hidden = !pack;
    if (docNoInv)
        docNoInv.hidden = pack;
    if (!pack && over2)
        over2.hidden = true;
    updateMultiBox();
}
function checkDocWeight(el) {
    const w = parseFloat(el.value) || 0;
    if (w <= 2)
        return;
    const pack = document.querySelector('[name=ptype][value="PACK"]');
    if (pack)
        pack.checked = true;
    setType('PACK');
    const content = (document.querySelector('[name=docContent]') || {}).value;
    const brief = document.querySelector('[name=brief]');
    if (brief && content)
        brief.value = content;
    const g = document.querySelector('#kienBody .kien-row [data-k=g]');
    if (g) {
        g.value = String(w);
        calcKien();
    }
    const over2 = document.getElementById('over2note');
    if (over2) {
        over2.hidden = false;
        over2.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    toast('📦 Tài liệu trên 2kg được tính là hàng hóa — đã chuyển sang khai Hàng hóa (PACK).', 'good');
}
function updateFlag() {
    const country = document.querySelector('[name=r_country]')?.value || '';
    const flagEl = document.getElementById('r_flag');
    if (flagEl)
        flagEl.textContent = FLAGS[country] || '🏳️';
}
function kienRow(d = {}) {
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
    if (body)
        body.appendChild(el);
    calcKien();
}
function delKien(id) {
    const b = document.getElementById('kienBody');
    if (!b)
        return;
    if (b.children.length <= 1) {
        toast('Cần ít nhất 1 kiện');
        return;
    }
    const row = b.querySelector('[data-id="' + id + '"]');
    if (row)
        row.remove();
    calcKien();
}
function addKien() {
    kienRow();
}
function calcKien() {
    let pcs = 0, g = 0, vol = 0;
    document.querySelectorAll('#kienBody .kien-row').forEach(r => {
        const sl = +(r.querySelector('[data-k=sl]')?.value || 0);
        const d = +(r.querySelector('[data-k=d]')?.value || 0);
        const w = +(r.querySelector('[data-k=w]')?.value || 0);
        const h = +(r.querySelector('[data-k=h]')?.value || 0);
        const gross = +(r.querySelector('[data-k=g]')?.value || 0);
        const v = +((d * w * h) / 5000 * (sl || 1)).toFixed(2);
        const volEl = r.querySelector('[data-k=vol]');
        if (volEl)
            volEl.textContent = String(v);
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
    if (totPcs)
        totPcs.textContent = String(pcs);
    if (totGross)
        totGross.textContent = g.toFixed(1);
    if (totVol)
        totVol.textContent = vol.toFixed(1);
    if (totCharge)
        totCharge.textContent = charge.toFixed(1);
    if (kienCount)
        kienCount.textContent = pcs + ' kiện';
    renderKienWarn(evalSurcharge(g, vol));
}
function evalSurcharge(gross, vol) {
    const svc = document.getElementById('service')?.value || '';
    const R = CARRIER_RULES[svc] || CARRIER_RULES._default;
    const out = [];
    document.querySelectorAll('#kienBody .kien-row').forEach((r, i) => {
        const D = +(r.querySelector('[data-k=d]')?.value || 0);
        const W = +(r.querySelector('[data-k=w]')?.value || 0);
        const H = +(r.querySelector('[data-k=h]')?.value || 0);
        const G = +(r.querySelector('[data-k=g]')?.value || 0);
        if (!D && !W && !H && !G)
            return;
        const longest = Math.max(D, W, H), sum = D + W + H;
        if (longest > R.nonSide || G > R.nonWeight) {
            out.push({ lv: 'crit', t: `Kiện ${i + 1}: vượt giới hạn nhận của ${svc || 'dịch vụ'}`, d: `Cạnh dài ${longest}cm / cân ${G}kg vượt mức tối đa. Cần chia nhỏ kiện hoặc chuyển sang dịch vụ Chuyên tuyến/SEA.` });
            return;
        }
        if (longest > R.maxSide)
            out.push({ lv: 'warn', t: `Kiện ${i + 1}: hàng quá khổ (Oversize)`, d: `Cạnh dài ${longest}cm > ${R.maxSide}cm → dễ bị phụ phí hàng cồng kềnh.` });
        if (sum > R.maxSum)
            out.push({ lv: 'warn', t: `Kiện ${i + 1}: tổng kích thước lớn`, d: `D+R+C = ${sum}cm > ${R.maxSum}cm → có thể bị phụ phí quá khổ.` });
        if (G > R.maxWeight)
            out.push({ lv: 'warn', t: `Kiện ${i + 1}: quá nặng (Overweight)`, d: `Cân ${G}kg > ${R.maxWeight}kg/kiện → phụ phí xử lý hàng nặng.` });
    });
    if (gross > 0 && vol > gross + 0.01) {
        out.push({ lv: 'info', t: 'Tính cước theo trọng lượng quy đổi', d: `Quy đổi ${vol.toFixed(1)}kg > cân thực ${gross.toFixed(1)}kg → cước tính theo ${vol.toFixed(1)}kg. Đóng gói gọn hơn để giảm cước.` });
    }
    return out;
}
function renderKienWarn(list) {
    const el = document.getElementById('kienWarn');
    if (!el)
        return;
    if (!list || !list.length) {
        el.hidden = true;
        el.innerHTML = '';
        return;
    }
    el.hidden = false;
    const crit = list.some(w => w.lv === 'crit');
    el.className = 'warn-box ' + (crit ? 'red' : 'amber');
    el.innerHTML = `
    <div class="warn-head">${crit ? '⛔ Kiện vượt giới hạn — cần xử lý' : '⚠️ Cảnh báo phụ phí kiện hàng'}</div>
    ${list.map(w => `<div class="warn-item"><span class="wi">${w.lv === 'crit' ? '⛔' : w.lv === 'info' ? '📦' : '💡'}</span><div><b>${w.t}</b><div class="wd">${w.d}</div></div></div>`).join('')}
    <div class="warn-sug">→ Cân nhắc đổi dịch vụ phù hợp hoặc chia nhỏ / đóng gói lại kiện để tránh phụ phí.</div>`;
}
function invRow(d = {}) {
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
    if (b)
        b.appendChild(tr);
    if (d.unit) {
        const sel = tr.querySelector('[data-c=unit]');
        if (sel)
            sel.value = d.unit;
    }
    calcInvoice();
}
function delInv(id) {
    const b = document.getElementById('invBody');
    if (!b)
        return;
    if (b.children.length <= 1) {
        toast('Cần ít nhất 1 mặt hàng');
        return;
    }
    const row = b.querySelector('[data-id="' + id + '"]');
    if (row)
        row.remove();
    calcInvoice();
}
function addInv() {
    invRow();
}
function calcInvoice() {
    const cur = document.getElementById('cur')?.value || 'USD';
    const sym = CURSYM[cur] || '$';
    let tot = 0, n = 0;
    document.querySelectorAll('#invBody tr').forEach((r, i) => {
        const num = r.querySelector('.num-c');
        if (num)
            num.textContent = String(i + 1);
        const q = +(r.querySelector('[data-c=qty]')?.value || 0);
        const p = +(r.querySelector('[data-c=price]')?.value || 0);
        const s = q * p;
        tot += s;
        n++;
        const sub = r.querySelector('[data-c=sub]');
        if (sub)
            sub.textContent = sym + s.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
    const invTotal = document.getElementById('invTotal');
    const invCur = document.getElementById('invCur');
    const feeCur = document.getElementById('feeCur');
    const cumSummary = document.getElementById('cumSummary');
    if (invTotal)
        invTotal.textContent = tot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (invCur)
        invCur.textContent = cur;
    if (feeCur)
        feeCur.textContent = cur;
    if (cumSummary)
        cumSummary.textContent = n + ' mặt hàng';
}
function catOptions(sel) {
    return '<option value="">— Chọn nhóm hàng hóa —</option>' + CATEGORIES.map(c => `<option${c === sel ? ' selected' : ''}>${c}</option>`).join('');
}
function briefCatChange() {
    const cat = (document.getElementById('briefCat') || {}).value;
    const dl = document.getElementById('briefDL');
    if (dl)
        dl.innerHTML = (CAT_SUGGEST[cat] || []).map(x => `<option value="${x.en}">${x.vi || ''}</option>`).join('');
}
function toggleCatMenu(ev) {
    if (ev)
        ev.stopPropagation();
    const m = document.getElementById('catMenu');
    if (!m)
        return;
    const willOpen = m.hidden;
    if (willOpen) {
        m.hidden = false;
        const inp = document.getElementById('catSearch');
        if (inp) {
            inp.value = '';
            setTimeout(() => {
                try {
                    inp.focus();
                }
                catch (e) { }
            }, 0);
        }
        renderCatMenu();
    }
    else {
        m.hidden = true;
    }
}
function closeCatMenu() {
    const m = document.getElementById('catMenu');
    if (m)
        m.hidden = true;
}
function catItemHtml(c, cur) {
    const escName = c.replace(/'/g, "\\'");
    return `<div class="catdd-item ${c === cur ? 'on' : ''}" onclick="selectCat('${escName}')"><span class="nm">${c}</span><button type="button" class="catdd-star ${FAV_CATS.includes(c) ? 'fav' : ''}" title="Đánh dấu nhóm thường dùng" onclick="toggleCatFav(event,'${escName}')">★</button></div>`;
}
function renderCatMenu() {
    const q = (document.getElementById('catSearch')?.value || '').toLowerCase();
    const cur = document.getElementById('briefCat')?.value || '';
    const L = document.getElementById('catMenuList');
    if (!L)
        return;
    const m = (c) => c.toLowerCase().includes(q);
    const favs = CATEGORIES.filter(c => FAV_CATS.includes(c) && m(c));
    const all = CATEGORIES.filter(m);
    let h = '';
    if ('nhiều loại hàng'.includes(q)) {
        h += `<div class="catdd-item ${cur === 'Nhiều loại hàng' ? 'on' : ''}" style="background:var(--green-tint2);font-weight:600" onclick="selectCat('__MULTI__')"><span class="nm">🧩 Nhiều loại hàng <span style="color:var(--muted);font-weight:400;font-size:11px">— chọn nhiều nhóm</span></span></div>`;
    }
    if (favs.length)
        h += '<div class="catdd-sec">★ Nhóm thường dùng</div>' + favs.map(c => catItemHtml(c, cur)).join('');
    h += '<div class="catdd-sec">Tất cả nhóm (' + CATEGORIES.length + ')</div>' + all.map(c => catItemHtml(c, cur)).join('');
    L.innerHTML = h;
}
function multiLbl() {
    return 'Nhiều loại hàng' + (multiCats.length ? ' · ' + multiCats.length + ' nhóm' : '');
}
function selectCat(c) {
    const multi = (c === '__MULTI__');
    const val = multi ? 'Nhiều loại hàng' : c;
    const brief = document.getElementById('briefCat');
    const lbl = document.getElementById('catBtnLbl');
    if (brief)
        brief.value = val;
    if (lbl)
        lbl.textContent = multi ? multiLbl() : val;
    briefCatChange();
    closeCatMenu();
    updateMultiBox();
    if (multi)
        openMultiPick();
}
function updateMultiBox() {
    const on = isPack() && document.getElementById('briefCat')?.value === 'Nhiều loại hàng';
    const box = document.getElementById('multiBox');
    if (box) {
        box.hidden = !on;
        if (on)
            renderMultiTable();
    }
}
function openMultiPick() {
    renderMultiPickList();
    const m = document.getElementById('multiModal');
    if (m) {
        m.classList.add('show');
        setTimeout(() => {
            try {
                document.getElementById('multiSearch')?.focus();
            }
            catch (e) { }
        }, 0);
    }
}
function closeMultiPick() {
    const m = document.getElementById('multiModal');
    if (m)
        m.classList.remove('show');
}
function renderMultiPickList() {
    const q = (document.getElementById('multiSearch')?.value || '').toLowerCase();
    const L = document.getElementById('multiPickList');
    if (!L)
        return;
    L.innerHTML = '';
    CATEGORIES.filter(c => c.toLowerCase().includes(q)).forEach(c => {
        const el = document.createElement('label');
        el.className = 'check-item';
        el.innerHTML = `<input type="checkbox" ${multiCats.includes(c) ? 'checked' : ''} onchange="multiTally()" value="${c.replace(/"/g, '&quot;')}"><div class="cti"><b>${c}</b></div>`;
        L.appendChild(el);
    });
    multiTally();
}
function multiTally() {
    const n = document.querySelectorAll('#multiPickList input:checked').length;
    const e = document.getElementById('multiSel');
    if (e)
        e.textContent = 'Đã chọn ' + n + ' nhóm';
}
function applyMulti() {
    multiCats = Array.from(document.querySelectorAll('#multiPickList input:checked')).map(x => x.value);
    const lbl = document.getElementById('catBtnLbl');
    if (lbl)
        lbl.textContent = multiLbl();
    renderMultiTable();
    updateMultiBox();
    closeMultiPick();
    toast(multiCats.length ? ('Đã chọn ' + multiCats.length + ' nhóm hàng') : 'Chưa chọn nhóm nào');
}
function renderMultiTable() {
    const b = document.getElementById('multiBody');
    if (!b)
        return;
    b.innerHTML = '';
    multiCats.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `<td class="tnum" style="width:40px">${i + 1}</td><td class="cnee">${c}</td><td class="muted">—</td><td style="width:44px"><button type="button" class="xbtn" onclick="rmMulti('${c.replace(/'/g, "\\'")}')">✕</button></td>`;
        b.appendChild(tr);
    });
    if (!multiCats.length)
        b.innerHTML = '<tr><td colspan="4" class="muted" style="text-align:center;padding:16px">Chưa chọn nhóm nào — bấm "＋ Thêm / sửa nhóm".</td></tr>';
    const cc = document.getElementById('multiCount');
    if (cc)
        cc.textContent = multiCats.length + ' nhóm';
}
function rmMulti(c) {
    multiCats = multiCats.filter(x => x !== c);
    renderMultiTable();
    const lbl = document.getElementById('catBtnLbl');
    if (lbl)
        lbl.textContent = multiLbl();
}
function toggleCatFav(ev, c) {
    ev.stopPropagation();
    const was = FAV_CATS.includes(c);
    FAV_CATS = was ? FAV_CATS.filter(x => x !== c) : [c, ...FAV_CATS];
    renderCatMenu();
    toast(was ? ('Đã bỏ "' + c + '" khỏi thường dùng') : ('★ Đã ghim "' + c + '" vào nhóm thường dùng'));
}
function orderSummary() {
    const g = (n) => (document.querySelector('[name=' + n + ']') || {}).value || '';
    const hub = document.getElementById('hub')?.value || '';
    const pack = isPack();
    const pcs = document.getElementById('totPcs')?.textContent || '1';
    const charge = document.getElementById('totCharge')?.textContent || '0';
    return {
        cnee: g('r_company') || '(chưa đặt tên)',
        ct: g('r_country') || '—',
        service: hub || g('service') || '—',
        branch: g('branch') || 'TP.HCM',
        ref: g('ref') || '',
        pcs: pack ? (pcs + ' kiện · ' + charge + ' kg') : ('1 kiện' + (g('docWeight') ? ' · ' + g('docWeight') + ' kg' : '')),
        content: pack ? (g('brief') || 'Hàng hóa') : (g('docContent') || 'Chứng từ'),
        date: nowStr(),
        charge: pack ? (+charge || 0) : (+g('docWeight') || 0)
    };
}
function computeFees(s) {
    const f = [];
    if (s.charge > 0 && s.charge < 12)
        f.push(['Phụ phí giao nội địa (kiện < 12kg)', 500000]);
    if (['United States', 'Australia', 'Canada'].includes(s.ct))
        f.push(['Phụ phí vùng sâu vùng xa', 450000]);
    return f;
}
function submitOrder() {
    if (createMode === 'quick') {
        if (!validate(1) || !validate(2) || !validate(3))
            return;
    }
    else if (!validate(3)) {
        return;
    }
    pendingSummary = orderSummary();
    const fees = computeFees(pendingSummary);
    if (fees.length) {
        const tot = fees.reduce((a, b) => a + b[1], 0);
        const fl = document.getElementById('feeLines');
        const ft = document.getElementById('feeTotal');
        const fm = document.getElementById('feeModal');
        if (fl)
            fl.innerHTML = fees.map(f => `${f[0]}: <b style="color:var(--ink)">${fmtVnd(f[1])}</b>`).join('<br>');
        if (ft)
            ft.innerHTML = 'Tổng phụ phí: <span style="color:var(--red)">' + fmtVnd(tot) + '</span>';
        if (fm)
            fm.classList.add('show');
    }
    else {
        doCreate();
    }
}
function closeFee() {
    const fm = document.getElementById('feeModal');
    if (fm)
        fm.classList.remove('show');
}
function confirmCreate() {
    closeFee();
    doCreate();
}
function doCreate() {
    const s = pendingSummary || orderSummary();
    DRAFTS.unshift({ id: 'd' + Date.now(), stt: 'ready', cnee: s.cnee, ct: s.ct, service: s.service, branch: s.branch, ref: s.ref, pcs: s.pcs, content: s.content, date: s.date });
    updateDraftCount();
    toast('✓ Đã tạo đơn (chưa in). Vào "Đơn nháp & chưa in" để In & cấp mã bill.', 'good');
    setTimeout(() => nav('drafts'), 700);
}
function saveDraft() {
    const s = orderSummary();
    DRAFTS.unshift({ id: 'd' + Date.now(), stt: 'draft', cnee: s.cnee, ct: s.ct, service: s.service, branch: s.branch, ref: s.ref, pcs: s.pcs, content: s.content, date: s.date });
    updateDraftCount();
    toast('💾 Đã lưu nháp — xem ở "Đơn nháp & chưa in"');
    setTimeout(() => nav('drafts'), 700);
}
function renderDrafts() {
    document.querySelectorAll('.draft-body').forEach(b => {
        b.innerHTML = '';
        DRAFTS.forEach(d => {
            const ready = d.stt === 'ready';
            const badge = ready ? '<span class="badge b-ready">Chưa in</span>' : '<span class="badge b-draft">Nháp</span>';
            const tr = document.createElement('tr');
            tr.style.cursor = 'default';
            tr.innerHTML = `<td>${badge}</td><td class="cnee">${d.cnee}</td><td>${FLAGS[d.ct] || ''} ${d.ct}</td><td class="muted">${d.service}</td><td>${d.pcs}</td><td>${d.content}</td><td class="muted tnum">${d.date}</td>
       <td class="actions">
         <button class="btn ghost sm" onclick="editDraft('${d.id}')">✎ ${ready ? 'Sửa' : 'Tiếp tục'}</button>
         ${ready ? `<button class="btn primary sm" onclick="printDraft('${d.id}')">🖨 In &amp; cấp bill</button>` : `<button class="btn ghost sm" disabled style="opacity:.45;cursor:not-allowed" title="Hoàn thiện đơn trước khi in">🖨 In</button>`}
         <button class="act" title="Xóa" onclick="delDraft('${d.id}')" style="color:var(--red)">🗑</button></td>`;
            b.appendChild(tr);
        });
        if (!DRAFTS.length)
            b.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Chưa có đơn nháp nào. Bấm "Tạo đơn mới" để bắt đầu.</td></tr>';
    });
    const dc = document.getElementById('draftCount');
    if (dc)
        dc.textContent = DRAFTS.length + ' đơn (nháp / chưa in)';
}
function editDraft(id) {
    nav('create');
    toast('Đang mở lại đơn để chỉnh tiếp');
}
function delDraft(id) {
    const i = DRAFTS.findIndex(d => d.id === id);
    if (i < 0)
        return;
    const n = DRAFTS[i].cnee;
    DRAFTS.splice(i, 1);
    renderDrafts();
    updateDraftCount();
    toast('Đã xóa đơn nháp: ' + n);
}
function printDraft(id) {
    const i = DRAFTS.findIndex(d => d.id === id);
    if (i < 0)
        return;
    const d = DRAFTS[i];
    const bill = String(billSeq++);
    ORDERS.unshift({ seq: orderSeq++, bill: bill, connect: '', ref: d.ref || '', cnee: d.cnee, ct: d.ct, route: d.service, branch: d.branch || 'TP.HCM', created: d.date, sent: '', type: 'PACK', st: 'wait', pcs: d.pcs, content: d.content, track: '—', pod: null, photos: 0 });
    DRAFTS.splice(i, 1);
    renderDrafts();
    updateDraftCount();
    renderOrders();
    toast('🖨 Đã cấp mã bill ' + bill + ' & in. Đơn chuyển sang "Đơn hàng của tôi" và đã khóa.', 'good');
    setTimeout(() => nav('orders'), 1100);
}
function updateDraftCount() {
    const n = DRAFTS.length;
    const e = document.getElementById('navDrafts');
    if (e) {
        e.textContent = String(n);
        e.style.display = n ? '' : 'none';
    }
}
function openTrouble(bill) {
    curTrbBill = bill;
    const o = ORDERS.find(x => x.bill === bill) || {};
    const trbCtx = document.getElementById('trbCtx');
    if (trbCtx) {
        trbCtx.innerHTML = `<div><span class="k">Mã vận đơn:</span> <b class="bill">${bill}</b></div><div><span class="k">Người nhận:</span> <b>${o.cnee || '—'}</b></div><div><span class="k">Nước đến:</span> <b>${(FLAGS[o.ct] || '') + ' ' + (o.ct || '—')}</b></div>`;
    }
    const sel = document.getElementById('trbType');
    if (sel)
        sel.innerHTML = TRB_TYPES.map((t, i) => `<option${i === 0 ? '' : ''}>${t}</option>`).join('');
    const desc = document.getElementById('trbDesc');
    const lv = document.getElementById('trbLv');
    const m = document.getElementById('trbModal');
    if (desc)
        desc.value = '';
    if (lv)
        lv.value = 'mid';
    if (m)
        m.classList.add('show');
}
function closeTrb() {
    const m = document.getElementById('trbModal');
    if (m)
        m.classList.remove('show');
}
function submitTrouble() {
    const desc = document.getElementById('trbDesc')?.value.trim() || '';
    if (!desc) {
        document.getElementById('trbDesc')?.classList.add('err');
        toast('⚠️ Vui lòng mô tả chi tiết sự cố');
        return;
    }
    document.getElementById('trbDesc')?.classList.remove('err');
    const o = ORDERS.find(x => x.bill === curTrbBill) || {};
    const type = document.getElementById('trbType')?.value || 'Khác';
    const lv = document.getElementById('trbLv')?.value || 'mid';
    const req = document.getElementById('trbReq')?.value || '';
    const contact = document.getElementById('trbContact')?.value || '';
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
    toast('✓ Đã gửi báo cáo sự cố cho đơn ' + curTrbBill + ' tới CS Việt An', 'good');
    setTimeout(() => nav('trouble'), 700);
}
function renderTroubles() {
    const b = document.getElementById('trbBody');
    if (!b)
        return;
    b.innerHTML = '';
    TROUBLES.forEach(t => {
        const [lc, lx] = TRB_LV[t.lv] || ['b-mid', 'Gấp'];
        const [sc, sx] = TRB_ST[t.status] || ['b-wait', 'Mới'];
        const tr = document.createElement('tr');
        tr.onclick = e => {
            if (e.target.closest('button'))
                return;
            openTroubleDetail(t.id);
        };
        tr.innerHTML = `<td><span class="bill">${t.id}</span></td><td><span class="bill">${t.bill}</span><div class="muted">${t.cnee}</div></td>
      <td>${t.type}</td><td><span class="badge ${lc}">${lx}</span></td><td class="muted tnum">${t.date}</td><td><span class="badge ${sc}">${sx}</span></td>
      <td class="actions"><button class="btn ghost sm" onclick="openTroubleDetail('${t.id}')">Xem</button>
        ${t.status !== 'done' ? `<button class="btn ghost sm" onclick="remindTrouble('${t.id}')">🔔 Nhắc CS</button>` : ''}</td>`;
        b.appendChild(tr);
    });
    if (!TROUBLES.length)
        b.innerHTML = '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Chưa có sự cố nào. Vào "Đơn hàng của tôi" và bấm ⚠ trên đơn để báo cáo.</td></tr>';
    const trbCount = document.getElementById('trbCount');
    if (trbCount)
        trbCount.textContent = TROUBLES.length + ' yêu cầu hỗ trợ';
}
function remindTrouble(id) {
    toast('🔔 Đã gửi nhắc CS về ticket ' + id);
}
function openTroubleDetail(id) {
    const t = TROUBLES.find(x => x.id === id);
    if (!t)
        return;
    const [lc, lx] = TRB_LV[t.lv] || ['b-mid', 'Gấp'];
    const [sc, sx] = TRB_ST[t.status] || ['b-wait', 'Mới'];
    const drBill = document.getElementById('dr-bill');
    const drBody = document.getElementById('dr-body');
    if (drBill)
        drBill.textContent = t.id;
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
       ${t.status !== 'done' ? `<button class="btn ghost sm" onclick="remindTrouble('${t.id}')">🔔 Nhắc CS xử lý</button>` : ''}
       <button class="btn ghost sm" onclick="toast('Mở trao đổi thêm với CS (demo)')">💬 Trao đổi thêm</button></div>`;
    }
    const drawer = document.getElementById('drawer');
    const scrim = document.getElementById('scrim');
    if (drawer)
        drawer.classList.add('show');
    if (scrim)
        scrim.classList.add('show');
}
function updateTrbCount() {
    const n = TROUBLES.filter(t => t.status !== 'done').length;
    const e = document.getElementById('navTrb');
    if (e) {
        e.textContent = String(n);
        e.style.display = n ? '' : 'none';
    }
}
function ecomTab(name) {
    document.querySelectorAll('#v-ecom .etab').forEach(b => b.classList.toggle('on', b.dataset.etab === name));
    document.querySelectorAll('#v-ecom .etab-p').forEach(p => (p.hidden = p.dataset.etab !== name));
    if (name === 'list') {
        renderEcomSrcChips();
        renderEcom();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function pushMethod(m) {
    ['api', 'excel', 'manual'].forEach(x => {
        const el = document.getElementById('pm-' + x);
        if (el)
            el.hidden = x !== m;
    });
}
function addEprod() {
    if (document.querySelectorAll('#eprodBody .eprod-row').length >= 5) {
        toast('Tối đa 5 sản phẩm / đơn');
        return;
    }
    const el = document.createElement('div');
    el.className = 'eprod-row';
    eprodN++;
    el.innerHTML = `<input placeholder="Tên hàng"><input placeholder="SKU"><input type="number" placeholder="SL" value="1"><input type="number" placeholder="FOB"><input type="number" placeholder="Giá bán"><input placeholder="HS code"><button type="button" class="xbtn" onclick="this.parentElement.remove()">✕</button>`;
    const body = document.getElementById('eprodBody');
    if (body)
        body.appendChild(el);
}
function renderEcomSrcChips() {
    const w = document.getElementById('ecomSrcChips');
    if (!w)
        return;
    w.innerHTML = '';
    const mk = (k, label, n, on) => {
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
            const [i, nm] = SRC[s];
            mk(s, i + ' ' + nm, n, ecomSrcFilter === s);
        }
    });
}
function renderEcom() {
    const q = (document.getElementById('ecomSearch')?.value || '').toLowerCase();
    const rows = ECOM.filter(o => (ecomSrcFilter === 'all' || o.src === ecomSrcFilter) && (o.ref + o.bill + o.cnee + o.ct).toLowerCase().includes(q));
    const b = document.getElementById('ecomBody');
    if (!b)
        return;
    b.innerHTML = '';
    rows.forEach(o => {
        const [si, sn, sc] = SRC[o.src] || ['📦', 'Khác', 'src-manual'];
        const [ei, en, ec] = ECOM_ST[o.st] || ['🟢', 'Đã tạo', 'b-fly'];
        const tr = document.createElement('tr');
        tr.innerHTML = `<td onclick="event.stopPropagation()"><input type="checkbox"></td>
     <td><span class="src ${sc}">${si} ${sn}</span></td>
     <td><span class="bill">${o.ref}</span></td>
     <td>${o.bill ? `<span class="bill">${o.bill}</span>` : '<span class="muted">—</span>'}</td>
     <td><div class="cnee">${o.cnee}</div><div class="subcell">${FLAGS[o.ct] || ''} ${o.ct}</div></td>
     <td>${o.items} SP</td>
     <td>${o.kg ? o.kg + ' kg' : '<span style="color:var(--amber)">chờ cân</span>'}</td>
     <td><span class="badge ${ec}">${ei} ${en}</span></td>
     <td>${o.note ? '<span class="muted">' + o.note + '</span>' : '<span class="muted">—</span>'}</td>
     <td class="actions">
       ${o.st === 'exception' ? `<button class="btn ghost sm" onclick="toast('Thử tạo lại đơn ${o.ref} (demo)')">↻ Thử lại</button>` : `<button class="act" title="In nhãn A6/A4/ZPL" onclick="toast('In nhãn đơn ${o.ref} (demo)')">🖨</button>`}
       <button class="act" title="Xem chi tiết" onclick="toast('Xem chi tiết đơn ${o.ref} (demo)')">👁</button></td>`;
        b.appendChild(tr);
    });
    const count = document.getElementById('ecomCount');
    if (count)
        count.textContent = rows.length + ' đơn e-com';
}
function copyText(t) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(t).catch(() => { });
    }
    toast('Đã sao chép');
}
function openPicker(m) {
    pickMode = m;
    const M = {
        sender: ['👤', 'Chọn hồ sơ người gửi'],
        receiver: ['📇', 'Sổ địa chỉ người nhận'],
        product: ['📚', 'Thư viện mặt hàng']
    };
    const icon = document.getElementById('mIcon');
    const title = document.getElementById('mTitle');
    const search = document.getElementById('mSearch');
    const modal = document.getElementById('modal');
    if (icon && M[m])
        icon.textContent = M[m][0];
    if (title && M[m])
        title.textContent = M[m][1];
    if (search)
        search.value = '';
    renderPicker();
    if (modal)
        modal.classList.add('show');
    if (search)
        search.focus();
}
function closeModal() {
    const m = document.getElementById('modal');
    if (m)
        m.classList.remove('show');
}
function mkPick(av, t, d, onChoose, actions) {
    const el = document.createElement('div');
    el.className = 'pick';
    el.innerHTML = `<div class="pav">${av}</div><div style="flex:1;min-width:0"><div class="pn">${t}</div><div class="pd">${d}</div></div>`;
    const r = document.createElement('div');
    r.style.cssText = 'display:flex;gap:6px;align-items:center;flex:none';
    r.innerHTML = actions || '<div class="pgo">Chọn →</div>';
    el.appendChild(r);
    el.addEventListener('click', e => {
        if (e.target.closest('[data-act]'))
            return;
        onChoose();
    });
    return el;
}
function renderPicker() {
    const searchInput = document.getElementById('mSearch');
    const q = (searchInput?.value || '').toLowerCase();
    const L = document.getElementById('mList');
    if (!L)
        return;
    L.innerHTML = '';
    if (pickMode === 'sender') {
        SENDERS.forEach(s => {
            if (!(s.n + s.d).toLowerCase().includes(q))
                return;
            L.appendChild(mkPick(s.n.slice(0, 2).toUpperCase(), s.n, s.d + ' · ' + s.t, () => choosePick(s)));
        });
    }
    if (pickMode === 'product') {
        PRODUCTS.forEach(p => {
            if (!(p.vi + p.en).toLowerCase().includes(q))
                return;
            L.appendChild(mkPick('📦', p.vi + ' / ' + p.en, 'HS ' + p.hs + ' · ' + p.origin + ' · ' + p.unit, () => choosePick(p)));
        });
    }
    if (pickMode === 'receiver') {
        RECEIVERS.forEach((s, idx) => {
            if (!(s.n + s.ct + s.contact).toLowerCase().includes(q))
                return;
            const acts = `<button data-act class="act" title="Sửa" onclick="editReceiver(${idx})">✎</button><button data-act class="act" title="Xóa" onclick="deleteReceiver(${idx})" style="color:var(--red)">🗑</button>`;
            L.appendChild(mkPick(FLAGS[s.ct] || '📦', s.n, (FLAGS[s.ct] || '') + ' ' + s.ct + ' · ' + s.contact + ' · ' + s.tel, () => choosePick(s), acts));
        });
    }
    if (!L.children.length)
        L.innerHTML = '<p class="muted" style="text-align:center;padding:18px">Không tìm thấy.</p>';
}
function choosePick(r) {
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
function setV(n, v) {
    const e = document.querySelector('[name=' + n + ']');
    if (e) {
        e.value = v || '';
        e.dispatchEvent(new Event('input'));
    }
}
function fillReceiver(r) {
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
function getReceiver() {
    const g = (n) => (document.querySelector('[name=' + n + ']') || {}).value || '';
    return { n: g('r_company'), ct: g('r_country'), city: g('r_city'), postal: g('r_postal'), contact: g('r_contact'), tel: g('r_tel'), a1: g('r_addr1'), a2: g('r_addr2'), a3: g('r_addr3') };
}
function setRcvLbl() {
    const el = document.getElementById('saveRcvLbl');
    if (el)
        el.textContent = rcvEditIdx != null ? '💾 Cập nhật địa chỉ đã lưu' : '💾 Lưu vào sổ địa chỉ';
}
function saveReceiver() {
    const r = getReceiver();
    if (!r.n || !r.contact) {
        toast('⚠️ Cần có tên công ty & người liên hệ để lưu');
        return;
    }
    if (rcvEditIdx != null) {
        RECEIVERS[rcvEditIdx] = r;
        toast('Đã cập nhật "' + r.n + '" trong sổ địa chỉ');
        rcvEditIdx = null;
    }
    else {
        RECEIVERS.unshift(r);
        toast('Đã lưu "' + r.n + '" vào sổ địa chỉ');
    }
    setRcvLbl();
}
function editReceiver(i) {
    fillReceiver(RECEIVERS[i]);
    rcvEditIdx = i;
    setRcvLbl();
    closeModal();
    toast('Đang sửa "' + RECEIVERS[i].n + '" — chỉnh xong bấm "Cập nhật địa chỉ đã lưu"');
}
function deleteReceiver(i) {
    const n = RECEIVERS[i].n;
    RECEIVERS.splice(i, 1);
    if (rcvEditIdx === i)
        rcvEditIdx = null;
    setRcvLbl();
    renderPicker();
    toast('Đã xóa "' + n + '" khỏi sổ địa chỉ');
}
function openAddons() {
    renderAddonList();
    const m = document.getElementById('addonModal');
    if (m)
        m.classList.add('show');
}
function closeAddons() {
    const m = document.getElementById('addonModal');
    if (m)
        m.classList.remove('show');
}
function renderAddonList() {
    const L = document.getElementById('addonList');
    if (!L)
        return;
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
function tallyAddons() {
    const count = document.querySelectorAll('#addonList input:checked').length;
    const e = document.getElementById('addonSel');
    if (e)
        e.textContent = 'Đã chọn ' + count;
}
function applyAddons() {
    selAddons = Array.from(document.querySelectorAll('#addonList input:checked')).map(x => x.value);
    renderAddonChips();
    closeAddons();
    if (selAddons.length)
        toast('Đã thêm ' + selAddons.length + ' dịch vụ cộng thêm');
}
function renderAddonChips() {
    const w = document.getElementById('addonChips');
    const empty = document.getElementById('addonEmpty');
    if (!w)
        return;
    w.innerHTML = '';
    if (empty)
        empty.style.display = selAddons.length ? 'none' : 'flex';
    selAddons.forEach(s => {
        const c = document.createElement('span');
        c.className = 'addon-chip';
        c.innerHTML = `✓ ${s} <button type="button" onclick="rmAddon('${s.replace(/'/g, "\\'")}')">✕</button>`;
        w.appendChild(c);
    });
}
function rmAddon(s) {
    selAddons = selAddons.filter(x => x !== s);
    renderAddonChips();
}
function renderBranchChips() {
    const w = document.getElementById('branchChips');
    if (!w)
        return;
    w.innerHTML = '';
    const mk = (key, label, n, on) => {
        const b = document.createElement('button');
        b.className = 'chip' + (on ? ' on' : '');
        b.innerHTML = `${label} <span class="cc">${n}</span>`;
        b.onclick = () => {
            branchFilter = key;
            curPage = 1;
            renderBranchChips();
            renderOrders();
        };
        w.appendChild(b);
    };
    mk('all', 'Tất cả', ORDERS.length, branchFilter === 'all');
    BRANCHES.forEach(br => {
        const n = ORDERS.filter(o => o.branch === br).length;
        if (n)
            mk(br, br, n, branchFilter === br);
    });
}
function sortOrders(f) {
    if (sortState.field === f)
        sortState.dir = sortState.dir === 'asc' ? 'desc' : 'asc';
    else {
        sortState.field = f;
        sortState.dir = 'asc';
    }
    curPage = 1;
    renderOrders();
}
function sortVal(o, f) {
    switch (f) {
        case 'st': return STRANK[o.st] || 0;
        case 'created':
        case 'sent': return dParse(o[f]);
        case 'pod': return o.pod ? dParse(o.pod.date + ' ' + o.pod.time) : 0;
        case 'seq': return o.seq;
        default: return (o[f] || '').toString().toLowerCase();
    }
}
function dParse(s) {
    if (!s)
        return 0;
    const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})(?:\s+(\d{2}):(\d{2}))?/);
    if (!m)
        return 0;
    return new Date(+m[3], +m[2] - 1, +m[1], +(m[4] || 0), +(m[5] || 0)).getTime();
}
function parseKg(pcs) {
    const m = (pcs || '').match(/([\d.]+)\s*kg/i);
    return m ? parseFloat(m[1]) : 0;
}
function dOnly(s) {
    const m = (s || '').match(/(\d{2})\/(\d{2})\/(\d{4})/);
    return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
}
function applyFilter() {
    curPage = 1;
    renderOrders();
}
function changePageSize() {
    pageSize = +document.getElementById('fPageSize')?.value || 20;
    curPage = 1;
    renderOrders();
}
function clearFilters() {
    ['orderSearch', 'fFrom', 'fTo', 'fWFrom', 'fWTo'].forEach(id => {
        const e = document.getElementById(id);
        if (e)
            e.value = '';
    });
    const typeFilter = document.getElementById('typeFilter');
    if (typeFilter)
        typeFilter.value = '';
    filter = 'all';
    branchFilter = 'all';
    curPage = 1;
    document.querySelectorAll('#chips .chip').forEach((c, i) => c.classList.toggle('on', i === 0));
    renderOrders();
    toast('Đã xóa bộ lọc');
}
function renderPager(total) {
    const p = document.getElementById('pager');
    if (!p)
        return;
    const pages = Math.max(1, Math.ceil(total / pageSize));
    if (curPage > pages)
        curPage = pages;
    const from = total ? ((curPage - 1) * pageSize + 1) : 0, to = Math.min(curPage * pageSize, total);
    p.innerHTML = `<span class="pinfo">${from}–${to} / ${total}</span>
   <button onclick="goPage(1)" ${curPage <= 1 ? 'disabled' : ''}>«</button>
   <button onclick="goPage(${curPage - 1})" ${curPage <= 1 ? 'disabled' : ''}>‹</button>
   <span class="pinfo">Trang ${curPage}/${pages}</span>
   <button onclick="goPage(${curPage + 1})" ${curPage >= pages ? 'disabled' : ''}>›</button>
   <button onclick="goPage(${pages})" ${curPage >= pages ? 'disabled' : ''}>»</button>`;
}
function goPage(n) {
    curPage = n;
    renderOrders();
}
function renderOrders() {
    const q = (document.getElementById('orderSearch')?.value || '').toLowerCase();
    const tf = document.getElementById('typeFilter')?.value;
    const fd = document.getElementById('fFrom')?.value;
    const td = document.getElementById('fTo')?.value;
    const wf = parseFloat(document.getElementById('fWFrom')?.value);
    const wt = parseFloat(document.getElementById('fWTo')?.value);
    let rows = ORDERS.filter(o => (filter === 'all' || o.st === filter) &&
        (branchFilter === 'all' || o.branch === branchFilter) &&
        (!tf || o.type === tf) &&
        (o.cnee + o.ct + o.bill + o.content + o.ref + o.branch + o.connect).toLowerCase().includes(q) &&
        (!fd || dOnly(o.created) >= fd) &&
        (!td || dOnly(o.created) <= td) &&
        (isNaN(wf) || parseKg(o.pcs) >= wf) &&
        (isNaN(wt) || parseKg(o.pcs) <= wt));
    const f = sortState.field, dir = sortState.dir === 'asc' ? 1 : -1;
    rows.sort((a, b) => {
        const va = sortVal(a, f), vb = sortVal(b, f);
        return (va < vb ? -1 : va > vb ? 1 : 0) * dir || (b.seq - a.seq);
    });
    document.querySelectorAll('#v-orders .cast').forEach(c => {
        c.classList.toggle('on', c.dataset.sf === f);
        c.textContent = c.dataset.sf === f ? (sortState.dir === 'asc' ? '▲' : '▼') : '▲▼';
    });
    const total = rows.length, pages = Math.max(1, Math.ceil(total / pageSize));
    if (curPage > pages)
        curPage = pages;
    rows = rows.slice((curPage - 1) * pageSize, curPage * pageSize);
    const b = document.getElementById('orderBody');
    const cards = document.getElementById('orderCards');
    if (b)
        b.innerHTML = '';
    if (cards)
        cards.innerHTML = '';
    rows.forEach(o => {
        const [ic, itx, icol] = SICON[o.st] || ['📦', 'Chưa rõ', 'var(--muted)'];
        const tr = document.createElement('tr');
        tr.onclick = e => {
            if (e.target.closest('button,input,a'))
                return;
            openDrawer(o);
        };
        tr.innerHTML = `<td onclick="event.stopPropagation()"><input type="checkbox"></td>
     <td><div class="stcell" title="${itx}"><span class="stico">${ic}</span><span class="stlbl" style="color:${icol}">${itx}</span></div></td>
     <td><span class="bill">${o.bill}</span></td>
     <td>${o.ref ? `<span class="bill">${o.ref}</span>` : '<span class="muted">—</span>'}</td>
     <td><div class="cnee">${o.cnee}</div><div class="subcell">${o.ct}</div></td>
     <td>${o.connect ? `<div class="connbill" title="Bill dịch vụ last-mile">${o.connect}</div>` : '<div class="connbill" style="opacity:.4">—</div>'}<div class="route">${o.route}</div></td>
     <td class="tnum"><div>${o.created}</div><div class="subcell">${o.sent ? 'Gửi: ' + o.sent : '<span style="color:var(--amber)">Chưa gửi</span>'}</div></td>
     <td>${o.pod ? `<div class="pod-cell"><b>${o.pod.date}</b> ${o.pod.time}<div class="subcell">Ký: ${o.pod.signer}</div></div>` : '<span class="muted">—</span>'}</td>
     <td><span class="branch-chip">🏢 ${o.branch}</span></td>
     <td><button class="va-track" onclick="toast('VA Track: ${o.bill}')">VA Track</button><div><button class="ytrack" onclick="toast('Your Track (thương hiệu đại lý): ${o.bill}')">🏷 Your Track</button></div></td>
     <td><div>${o.content}</div><div class="pcs">${o.pcs}</div></td>
     <td><button class="photo-btn" onclick="openPhotos('${o.bill}')">🖼 Xem${o.photos ? ' (' + o.photos + ')' : ''}</button></td>
     <td class="actions" onclick="event.stopPropagation()">
       <button class="print-btn" onclick="openPrintMenu(event,'${o.bill}')">🖨 Print ▾</button>
       <button class="act" title="Nhân bản đơn" onclick="toast('Tạo đơn giống đơn này (demo)')">⧉</button>
       <button class="act" title="Báo cáo sự cố tới CS Việt An" onclick="openTrouble('${o.bill}')" style="color:var(--red);border-color:color-mix(in srgb,var(--red) 35%,var(--line-2))">⚠</button>
     </td>`;
        if (b)
            b.appendChild(tr);
        if (cards) {
            const card = document.createElement('div');
            card.className = 'ocard';
            card.onclick = e => {
                if (e.target.closest('button'))
                    return;
                openDrawer(o);
            };
            card.innerHTML = `<div class="oc-top"><span class="stico" title="${itx}">${ic}</span>
         <div><span class="bill">${o.bill}</span><div class="stlbl" style="color:${icol}">${itx}</div></div>
         <button class="btn ghost sm oc-detail" onclick="openDrawerBill('${o.bill}')">Xem chi tiết ›</button></div>
         <div class="oc-name">📥 ${o.cnee}</div>`;
            cards.appendChild(card);
        }
    });
    const orderCount = document.getElementById('orderCount');
    if (orderCount)
        orderCount.textContent = total + ' đơn hàng';
    renderPager(total);
    renderBranchChips();
}
function openDrawerBill(bill) {
    const o = ORDERS.find(x => x.bill === bill);
    if (o)
        openDrawer(o);
}
function toggleAll(c) {
    document.querySelectorAll('#orderBody input[type=checkbox]').forEach(x => (x.checked = c.checked));
}
function genPhoto(seed, w) {
    const bg = ['#eaf5ee', '#e5efe9', '#eef3f0'][seed % 3];
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='320' height='240'><rect width='320' height='240' fill='${bg}'/><rect x='40' y='196' width='240' height='10' rx='3' fill='#b9c8bf'/><rect x='96' y='150' width='128' height='46' rx='5' fill='#cdd8d1'/><rect x='150' y='120' width='20' height='30' fill='#aebbb2'/><rect x='108' y='66' width='104' height='84' rx='6' fill='#cba06a' stroke='#9c7238' stroke-width='3'/><line x1='108' y1='108' x2='212' y2='108' stroke='#9c7238' stroke-width='3'/><line x1='160' y1='66' x2='160' y2='150' stroke='#9c7238' stroke-width='3'/><text x='160' y='182' font-family='sans-serif' font-size='15' font-weight='bold' fill='#0b5c2c' text-anchor='middle'>${w}</text><text x='160' y='34' font-family='sans-serif' font-size='13' fill='#5d6f64' text-anchor='middle'>Ảnh kiện trên cân</text></svg>`;
    return 'data:image/svg+xml;charset=utf8,' + encodeURIComponent(svg);
}
function openPhotos(bill) {
    const o = ORDERS.find(x => x.bill === bill) || {};
    const n = o.photos || 0;
    const g = document.getElementById('photoGrid');
    const pt = document.getElementById('photoTitle');
    if (pt)
        pt.textContent = 'Ảnh đơn ' + bill + ' — ' + (o.cnee || '');
    if (g) {
        if (!n) {
            g.innerHTML = '<p class="muted" style="grid-column:1/-1;text-align:center;padding:24px">Đơn này chưa có ảnh kiện hàng.</p>';
        }
        else {
            const wt = (o.pcs || '').split('·')[1] || '';
            g.innerHTML = Array.from({ length: n }, (_, i) => `<div class="photo-card"><img src="${genPhoto(i, ('Kiện ' + (i + 1) + (wt ? ' ·' + wt : '')))}" alt="Ảnh kiện ${i + 1}"><div class="pcap">📷 Kiện ${i + 1}/${n} · chụp tại kho ${o.branch || ''}</div></div>`).join('');
        }
    }
    const m = document.getElementById('photoModal');
    if (m)
        m.classList.add('show');
}
function closePhotos() {
    const m = document.getElementById('photoModal');
    if (m)
        m.classList.remove('show');
}
function openPrintMenu(ev, bill) {
    ev.stopPropagation();
    const m = document.getElementById('pmenu');
    if (!m)
        return;
    const r = ev.currentTarget.getBoundingClientRect();
    m.style.left = Math.min(r.left, window.innerWidth - 192) + 'px';
    m.style.top = (r.bottom + 4) + 'px';
    m.dataset.bill = bill;
    m.classList.add('show');
}
function closePmenu() {
    const m = document.getElementById('pmenu');
    if (m)
        m.classList.remove('show');
}
function printDo(kind) {
    const m = document.getElementById('pmenu');
    const bill = m?.dataset.bill || '';
    closePmenu();
    toast('🖨 ' + kind + ' — đơn ' + bill + ' (demo)');
}
function openDrawer(o) {
    const [cls, txt] = ST[o.st] || ['b-wait', 'Chưa đi'];
    const drBill = document.getElementById('dr-bill');
    const drBody = document.getElementById('dr-body');
    if (drBill)
        drBill.textContent = 'VA Bill ' + o.bill;
    const steps = [
        ['Đã tiếp nhận tại kho', '08/09 09:12', true],
        ['Đang xử lý / đóng gói', '08/09 14:30', true],
        ['Đã xuất tuyến bay', o.st === 'wait' ? '—' : '08/09 22:05', o.st !== 'wait'],
        ['Đến kho nước đến', ['ok', 'nd', 'late'].includes(o.st) ? '09/09 06:40' : '—', ['ok', 'nd', 'late'].includes(o.st)],
        ['Phát thành công', o.st === 'ok' ? '09/09 15:20' : '—', o.st === 'ok']
    ];
    let cur = steps.filter(s => s[2]).length - 1;
    const [ic] = SICON[o.st] || ['📦'];
    if (drBody) {
        drBody.innerHTML = `
     <div class="dr-sec" style="display:flex;align-items:center;gap:9px"><span style="font-size:20px">${ic}</span><span class="badge ${cls}">${txt}</span>${o.pod ? '' : `<span class="branch-chip" style="margin-left:auto">🏢 ${o.branch}</span>`}</div>
     <div class="dr-sec" style="display:flex;gap:7px;flex-wrap:wrap">
       <button class="va-track" onclick="toast('VA Track: ${o.bill}')">VA Track</button>
       <button class="ytrack" onclick="toast('Your Track: ${o.bill}')">🏷 Your Track</button>
       <button class="photo-btn" onclick="openPhotos('${o.bill}')">🖼 Xem ảnh${o.photos ? ' (' + o.photos + ')' : ''}</button></div>
     <div class="dr-sec"><h4>Link tra cứu gửi khách</h4><div class="copy-link"><span class="cl">vietanexpress.com.vn/track?id=${o.bill}</span><button class="btn link" onclick="copyLink('${o.bill}')">Sao chép</button></div></div>
     <div class="dr-sec"><h4>Thông tin đơn</h4>
       <div class="kv"><span class="k">Người nhận</span><span class="v">${o.cnee}</span></div>
       <div class="kv"><span class="k">Nước đến</span><span class="v">${o.ct}</span></div>
       <div class="kv"><span class="k">REF</span><span class="v">${o.ref || '—'}</span></div>
       <div class="kv"><span class="k">Chi nhánh gửi</span><span class="v">🏢 ${o.branch}</span></div>
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
       <button class="btn ghost sm" onclick="toast('In A4 (demo)')">🖨 Bill A4</button><button class="btn ghost sm" onclick="toast('In Invoice (demo)')">🧾 Invoice</button>
       <button class="btn ghost sm" onclick="toast('Xuất CVCK (demo)')">📑 CVCK</button><button class="btn ghost sm" onclick="toast('In nhãn A6 (demo)')">🏷 Label A6</button>
       <button class="btn ghost sm" onclick="closeDrawer();openTrouble('${o.bill}')" style="color:var(--red)">⚠ Báo sự cố</button></div></div>`;
    }
    const drawer = document.getElementById('drawer');
    const scrim = document.getElementById('scrim');
    if (drawer)
        drawer.classList.add('show');
    if (scrim)
        scrim.classList.add('show');
}
function closeDrawer() {
    const drawer = document.getElementById('drawer');
    const scrim = document.getElementById('scrim');
    if (drawer)
        drawer.classList.remove('show');
    if (scrim)
        scrim.classList.remove('show');
}
function copyLink(id) {
    const t = 'vietanexpress.com.vn/track?id=' + id;
    if (navigator.clipboard)
        navigator.clipboard.writeText(t).catch(() => { });
    toast('Đã sao chép link tra cứu');
}
function updateNotiCount() {
    const n = NOTIS.filter(x => x.unread).length;
    ['navNoti', 'bellBadge'].forEach(id => {
        const e = document.getElementById(id);
        if (e) {
            e.textContent = String(n);
            e.style.display = n ? '' : 'none';
        }
    });
}
function renderNoti() {
    const L = document.getElementById('notiList');
    if (!L)
        return;
    L.innerHTML = '';
    NOTIS.forEach(x => {
        const el = document.createElement('div');
        el.className = 'noti-item' + (x.unread ? ' unread' : '') + (x.imp ? ' imp' : '');
        el.innerHTML = `<div class="nic">${x.imp ? '📢' : '🔔'}</div><div style="flex:1;min-width:0">
      <div class="nt">${x.title} ${x.imp ? '<span class="tag-imp">QUAN TRỌNG</span>' : ''}</div>
      <div class="nd">${x.body.split('\n')[0]}</div><div class="nmeta">🕑 ${x.date}</div></div>
      ${x.unread ? '<span class="undot"></span>' : ''}`;
        el.onclick = () => openNoti(x.id);
        L.appendChild(el);
    });
}
function openNoti(id) {
    const x = NOTIS.find(n => n.id === id);
    if (!x)
        return;
    x.unread = false;
    updateNotiCount();
    renderNoti();
    const drBill = document.getElementById('dr-bill');
    const drBody = document.getElementById('dr-body');
    if (drBill)
        drBill.textContent = x.title;
    if (drBody) {
        drBody.innerHTML = `<div class="dr-sec"><div class="nmeta" style="margin-bottom:6px">${x.imp ? '<span class="tag-imp">QUAN TRỌNG</span> · ' : ''}🕑 ${x.date}</div>
      <div style="font-size:13.5px;line-height:1.6;white-space:pre-line">${x.body}</div></div>`;
    }
    const drawer = document.getElementById('drawer');
    const scrim = document.getElementById('scrim');
    if (drawer)
        drawer.classList.add('show');
    if (scrim)
        scrim.classList.add('show');
}
function markAllRead() {
    NOTIS.forEach(x => (x.unread = false));
    updateNotiCount();
    renderNoti();
    toast('Đã đánh dấu tất cả là đã đọc');
}
const PKST = { ok: ['b-ok', 'Đã lấy hàng'], wait: ['b-wait', 'Chờ xác nhận'] };
function renderPickups() {
    const L = document.getElementById('pkList');
    if (!L)
        return;
    L.innerHTML = '';
    PICKUPS.forEach(p => {
        const [cls, tx] = PKST[p.st] || ['b-wait', 'Chờ xác nhận'];
        const el = document.createElement('div');
        el.className = 'pk-item';
        el.innerHTML = `<div style="width:34px;height:34px;border-radius:9px;background:var(--green-tint);color:var(--green-d);display:grid;place-items:center;font-size:16px">🚛</div>
      <div style="flex:1"><div class="pkd">${p.date} · ${p.slot}</div><div class="pkm">${p.pcs} kiện dự kiến</div></div>
      <span class="badge ${cls}">${tx}</span>`;
        L.appendChild(el);
    });
    if (!PICKUPS.length)
        L.innerHTML = '<p class="muted" style="text-align:center;padding:16px">Chưa có lịch pickup nào.</p>';
}
function submitPickup() {
    if (!validate2('v-pickup'))
        return;
    toast('🎉 Đã gửi yêu cầu pickup! Nhân viên sẽ liên hệ xác nhận.', 'good');
}
function validate2(viewId) {
    let ok = true, first = null;
    document.querySelectorAll('#' + viewId + ' [data-req]').forEach(c => {
        const el = c;
        if (!String(el.value).trim()) {
            ok = false;
            el.classList.add('err');
            if (!first)
                first = el;
        }
        else {
            el.classList.remove('err');
        }
    });
    if (!ok) {
        if (first)
            first.focus();
        toast('⚠️ Còn ô bắt buộc chưa điền');
    }
    return ok;
}
function showPop() {
    const imp = NOTIS.filter(x => x.imp);
    if (!imp.length)
        return;
    try {
        if (sessionStorage.getItem('va_pop_hide') === '1')
            return;
    }
    catch (e) { }
    const popList = document.getElementById('popList');
    if (popList) {
        popList.innerHTML = imp.map(x => `<div class="pop-noti"><h4>📢 ${x.title}</h4><p>${x.body.split('\n')[0]}</p><div class="pnd">🕑 ${x.date} · bấm "Xem tất cả" để đọc chi tiết</div></div>`).join('');
    }
    const modal = document.getElementById('popModal');
    if (modal)
        modal.classList.add('show');
}
function closePop() {
    try {
        const popHide = document.getElementById('popHide');
        if (popHide?.checked)
            sessionStorage.setItem('va_pop_hide', '1');
    }
    catch (e) { }
    const modal = document.getElementById('popModal');
    if (modal)
        modal.classList.remove('show');
}
function priceTab(t) {
    document.querySelectorAll('#v-price .etab').forEach(b => b.classList.toggle('on', b.dataset.ptab === t));
    document.querySelectorAll('#v-price .ptab-p').forEach(p => (p.hidden = p.dataset.ptab !== t));
    if (t === 'tables') {
        renderRateChips();
        if ((!rateSel || !PRICE_SVCS.some(x => x.name === rateSel)) && PRICE_SVCS[0])
            rateSel = PRICE_SVCS[0].name;
        renderRateTable(rateSel);
    }
    if (t === 'manage') {
        const pe = document.getElementById('priceEditor');
        const pl = document.getElementById('pmgrList');
        if (pe)
            pe.hidden = true;
        if (pl)
            pl.hidden = false;
        pmgrRender();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function priceAt(s, zone, cr) {
    const arr = s.price[zone] || s.price[s.dz] || [];
    if (cr <= 70) {
        const i = Math.max(0, Math.round(cr / 0.5) - 1);
        return arr[Math.min(i, arr.length - 1)] || 0;
    }
    return (s.over70[zone] || s.over70[s.dz] || 0) * cr;
}
function priceCalc(s, country, gross, D, W, H, type) {
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
        (s.sur || []).forEach((r) => {
            const inW = gross >= _lo(r.wFrom) && gross <= _hi(r.wTo);
            const inD = longest >= _lo(r.dFrom) && longest <= _hi(r.dTo);
            const inG = A >= _lo(r.gFrom) && A <= _hi(r.gTo);
            if (inW && inD && inG)
                phuthu = Math.max(phuthu, +r.fee || 0);
        });
    }
    const over = phuthu > 0;
    const vatBase = cuoc + fsc + phuthu;
    const vat = vatBase * s.vat;
    const tong = vatBase + vat;
    return { name: s.name, zone, charge: cr, vol, cuoc, fsc, phuthu, over, vat, tong, eta: s.eta };
}
function doPriceLookup() {
    const country = document.getElementById('priceCountry')?.value.trim() || '';
    const gross = +document.getElementById('priceKg')?.value || 0;
    const D = +document.getElementById('priceD')?.value || 0;
    const W = +document.getElementById('priceW')?.value || 0;
    const H = +document.getElementById('priceH')?.value || 0;
    const type = document.getElementById('priceType')?.value || 'PACK';
    if (!country || !gross) {
        toast('⚠️ Nhập nước đến & cân nặng để tra cứu');
        return;
    }
    priceRows = PRICE_SVCS.map(s => priceCalc(s, country, gross, D, W, H, type));
    priceSortState = { f: 'tong', dir: 'asc' };
    renderPriceResult(country);
}
function priceSort(f) {
    if (priceSortState.f === f)
        priceSortState.dir = priceSortState.dir === 'asc' ? 'desc' : 'asc';
    else
        priceSortState = { f: f, dir: 'asc' };
    renderPriceResult();
}
function renderPriceResult(country) {
    const el = document.getElementById('priceResult');
    if (!el)
        return;
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
    const car = (x) => `<span class="cast ${priceSortState.f === x ? 'on' : ''}">${priceSortState.f === x ? (priceSortState.dir === 'asc' ? '▲' : '▼') : '▲▼'}</span>`;
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
function renderRateChips() {
    const w = document.getElementById('rateSvcChips');
    if (!w)
        return;
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
function renderRateTable(name) {
    const s = PRICE_SVCS.find(x => x.name === name);
    const box = document.getElementById('rateTableBox');
    if (!box)
        return;
    if (!s) {
        box.innerHTML = '';
        return;
    }
    const zn = s.zones.map((_, i) => i + 1);
    let rows = '';
    PRICE_STEPS.forEach((w, i) => {
        rows += '<tr><td class="bill">' + w.toFixed(1) + ' kg</td>' + zn.map((z) => '<td class="tnum">' + fmtV((s.price[z] || [])[i] || 0) + '</td>').join('') + '</tr>';
    });
    const over = '<tr style="background:var(--green-tint)"><td class="bill">&gt;70kg (đ/kg)</td>' + zn.map((z) => '<td class="tnum">' + fmtV(s.over70[z] || 0) + '</td>').join('') + '</tr>';
    const zmap = Object.entries(s.zmap).map(([c, z]) => `<span class="src src-excel">${c} → Z${z}</span>`).join(' ') || '<span class="muted">chưa khai</span>';
    const surRows = (s.sur || []).length ? (s.sur.map((r) => `<tr>
     <td>${r.wFrom !== '' && r.wFrom != null ? r.wFrom : '0'} – ${r.wTo !== '' && r.wTo != null ? r.wTo : '∞'} kg</td>
     <td>${r.dFrom !== '' && r.dFrom != null ? r.dFrom : '0'} – ${r.dTo !== '' && r.dTo != null ? r.dTo : '∞'} cm</td>
     <td>${r.gFrom !== '' && r.gFrom != null ? r.gFrom : '0'} – ${r.gTo !== '' && r.gTo != null ? r.gTo : '∞'} cm</td>
     <td class="tnum" style="color:var(--red)">${fmtV(r.fee || 0)}</td></tr>`).join('')) : '<tr><td colspan="4" class="muted">Chưa khai quy định phụ thu.</td></tr>';
    box.innerHTML = `<div class="epanel"><div class="epanel-b">
   <div class="brow" style="margin-bottom:6px"><span class="src src-api">🚚 ${s.name}</span>${s.account ? `<span class="muted">Account: <b>${s.account}</b></span>` : ''}<span class="muted">FSC ${Math.round(s.fsc * 100)}% · VAT ${Math.round(s.vat * 100)}% · Dự kiến ${s.eta || '—'}</span></div>
   <div class="brow" style="margin-bottom:10px"><span class="badge b-ok">Hiệu lực: ${fmtDMY(s.effFrom)} → ${fmtDMY(s.effTo)}</span>
     <button class="btn ghost sm" onclick="pmgrEdit('${s.id}');priceTab('manage')">✏️ Sửa bảng giá này</button></div>
   <div style="font-weight:600;font-size:13px;margin-bottom:6px">Bảng giá — TỔNG cước theo Zone × mốc cân 0.5→70kg (VND)</div>
   <div class="tbl-wrap"><div class="tbl-scroll" style="max-height:360px;overflow:auto"><table class="orders" style="min-width:520px"><thead><tr><th>Cân (kg)</th>${s.zones.map((l) => '<th>' + l + '</th>').join('')}</tr></thead><tbody>${rows}${over}</tbody></table></div></div>
   <div class="brow" style="margin-top:10px;align-items:flex-start"><b style="color:var(--ink)">Zone theo nước:</b> ${zmap} <span class="muted">· nước khác → Z${s.dz}</span></div>
   <div style="font-weight:600;font-size:13px;margin:14px 0 6px">📦 Bảng phụ thu quá khổ / quá tải</div>
   <div class="tbl-wrap"><div class="tbl-scroll"><table class="orders" style="min-width:520px"><thead><tr><th>Cân nặng</th><th>Cạnh dài nhất</th><th>A=(R+C)×2+D</th><th>Phí charge</th></tr></thead><tbody>${surRows}</tbody></table></div></div>
   <p class="muted" style="font-size:12px;margin-top:10px">Kiện thỏa CẢ 3 khoảng (cân · cạnh dài · A) của 1 dòng → cộng phí charge dòng đó. Tổng = Cước + FSC + Phụ thu + VAT.</p>
   <div class="price-note">${PRICE_NOTE}</div></div></div>`;
}
const CI = 'width:100%;padding:5px 7px;border:1px solid var(--line,#cbd5cf);border-radius:7px;font-size:12.5px;background:var(--card,#fff);color:var(--ink,#111);box-sizing:border-box';
function pmgrRender() {
    const el = document.getElementById('pmgrList');
    if (!el)
        return;
    const cards = PRICE_SVCS.map(s => {
        const nc = Object.keys(s.zmap).length;
        return `<div class="epanel" style="margin-bottom:10px"><div class="epanel-b">
     <div class="brow" style="align-items:flex-start;gap:10px;flex-wrap:wrap">
       <div style="flex:1;min-width:200px">
         <div style="font-weight:700;font-size:15px">🚚 ${s.name} ${s.account ? `<span class="muted" style="font-weight:500;font-size:12.5px">· ${s.account}</span>` : ''}</div>
         <div class="muted" style="font-size:12.5px;margin-top:3px">${s.zones.length} zone · ${nc} nước khai · ${(s.sur || []).length} dòng phụ thu · FSC ${Math.round(s.fsc * 100)}% · VAT ${Math.round(s.vat * 100)}%</div>
         <div style="margin-top:4px"><span class="badge b-ok">Hiệu lực ${fmtDMY(s.effFrom)} → ${fmtDMY(s.effTo)}</span></div>
       </div>
       <div class="brow" style="gap:6px">
         <button class="btn ghost sm" onclick="rateSel='${s.name}';priceTab('tables')">👁 Xem</button>
         <button class="btn ghost sm" onclick="pmgrEdit('${s.id}')">✏️ Sửa</button>
         <button class="btn ghost sm" style="color:var(--red)" onclick="pmgrDel('${s.id}')">🗑 Xóa</button>
       </div></div></div></div>`;
    }).join('');
    el.innerHTML = `<div class="brow" style="margin-bottom:12px"><b style="color:var(--ink);font-size:15px">Danh sách dịch vụ &amp; bảng giá (${PRICE_SVCS.length})</b>
     <button class="btn primary" style="margin-left:auto" onclick="pmgrNew()">➕ Thêm dịch vụ</button>
     <button class="btn ghost sm" onclick="pmgrReset()">↺ Khôi phục demo</button></div>
   ${cards || '<div class="stub"><div class="se">💰</div><h3>Chưa có dịch vụ</h3><p>Bấm "Thêm dịch vụ" để khai bảng giá.</p></div>'}`;
}
function pmgrReset() {
    if (!confirm('Khôi phục 6 dịch vụ DEMO? Dữ liệu đã nhập sẽ bị thay thế.'))
        return;
    PRICE_SVCS = PRICE_SEED.map(mkSvc);
    savePrice();
    rateSel = PRICE_SVCS[0].name;
    pmgrRender();
    renderRateChips();
    toast('↺ Đã khôi phục biểu giá demo');
}
function pmgrDel(id) {
    const s = PRICE_SVCS.find(x => x.id === id);
    if (!s)
        return;
    if (!confirm('Xóa dịch vụ "' + s.name + '"?'))
        return;
    PRICE_SVCS = PRICE_SVCS.filter(x => x.id !== id);
    savePrice();
    if (rateSel === s.name)
        rateSel = (PRICE_SVCS[0] || {}).name || '';
    pmgrRender();
    try {
        renderRateChips();
    }
    catch (e) { }
    toast('🗑 Đã xóa ' + s.name);
}
function pmgrNew() {
    ped = {
        id: '', name: '', account: '', fsc: 0.28, vat: 0.08, eta: '', effFrom: '', effTo: '',
        zones: ['Zone 1', 'Zone 2', 'Zone 3'], zmap: {}, dz: 1,
        price: { 1: PRICE_STEPS.map(() => 0), 2: PRICE_STEPS.map(() => 0), 3: PRICE_STEPS.map(() => 0) },
        over70: { 1: 0, 2: 0, 3: 0 }, sur: [{ wFrom: '', wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: '' }]
    };
    pedOpen(true);
}
function pmgrEdit(id) {
    const s = PRICE_SVCS.find(x => x.id === id);
    if (!s)
        return;
    ped = JSON.parse(JSON.stringify(s));
    pedOpen(false);
}
function pedClose() {
    const pe = document.getElementById('priceEditor');
    const pl = document.getElementById('pmgrList');
    if (pe)
        pe.hidden = true;
    if (pl)
        pl.hidden = false;
    ped = null;
    pmgrRender();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function pedOpen(isNew) {
    const box = document.getElementById('priceEditor');
    const pl = document.getElementById('pmgrList');
    if (pl)
        pl.hidden = true;
    if (!box)
        return;
    box.hidden = false;
    box.innerHTML = `<div class="brow" style="margin-bottom:10px"><b style="color:var(--ink);font-size:16px">${isNew ? '➕ Thêm dịch vụ' : '✏️ Sửa: ' + ped.name}</b>
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
    <button class="btn ghost sm" style="margin-top:6px" onclick="pedAddCountry()">➕ Thêm nước</button>

    <div class="ped-sec"><span class="ped-no">4</span> Bảng giá — TỔNG cước theo mốc cân 0.5 → 70kg (VNĐ)</div>
    <div class="warn-box" style="background:var(--green-tint,#eef7f0);border:1px solid var(--line,#cbd5cf);border-radius:10px;padding:10px;margin-bottom:10px">
      <div style="font-weight:600;font-size:12.5px;margin-bottom:6px">⚡ Điền nhanh (tùy chọn): nhập giá mốc 0.5kg + mức cộng mỗi 0.5kg cho từng zone → tạo cả thang, rồi chỉnh tay ô lẻ.</div>
      <div id="ped-qf"></div>
      <button class="btn ghost sm" style="margin-top:6px" onclick="pedQuickFill()">Tạo thang giá</button>
    </div>
    <div id="ped-grid"></div>
    <div style="font-weight:600;font-size:13px;margin:12px 0 4px">Trên 70kg — đơn giá VNĐ/kg (theo zone)</div>
    <div id="ped-over"></div>

    <div class="ped-sec"><span class="ped-no">5</span> Bảng phụ thu quá khổ / quá tải</div>
    <p class="muted" style="font-size:12px;margin:0 0 8px">Mỗi dòng = 1 quy định. Kiện thỏa CẢ 3 khoảng (cân nặng · cạnh dài · A) → cộng phí charge. Bỏ trống = không giới hạn (0 → ∞). <b>A = (Rộng + Cao) × 2 + Dài</b>.</p>
    <div id="ped-sur"></div>
    <button class="btn ghost sm" style="margin-top:6px" onclick="pedAddSur()">➕ Thêm dòng phụ thu</button>

    <div class="brow" style="margin-top:16px;border-top:1px solid var(--line,#e5e5e5);padding-top:12px">
      <button class="btn primary" onclick="pedSave()">💾 Lưu bảng giá</button>
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
function pedZ() {
    return ped.zones.map((_, i) => i + 1);
}
function pedZoneOpts(sel) {
    return pedZ().map((z) => `<option value="${z}" ${z === sel ? 'selected' : ''}>Z${z} — ${esc(ped.zones[z - 1])}</option>`).join('');
}
function pedRenderZones() {
    const el = document.getElementById('ped-zones');
    if (!el)
        return;
    el.innerHTML = '<div class="grid g3" style="gap:6px">' + ped.zones.map((l, i) => `<div class="f"><label class="label">Nhãn Zone ${i + 1}</label><input class="ctrl" value="${esc(l)}" oninput="ped.zones[${i}]=this.value" onchange="pedRefreshZoneUI()"></div>`).join('') + '</div>';
    const dz = document.getElementById('ped-dz');
    if (dz) {
        dz.innerHTML = pedZoneOpts(ped.dz);
        dz.value = String(ped.dz);
    }
}
function pedRefreshZoneUI() {
    pedRenderCountries();
    pedRenderQF();
    pedRenderGrid();
    pedRenderOver();
    const dz = document.getElementById('ped-dz');
    if (dz)
        dz.innerHTML = pedZoneOpts(ped.dz);
}
function pedResizeZones(n) {
    n = Math.max(1, Math.min(12, +n || 1));
    const cur = ped.zones.length;
    if (n > cur) {
        for (let z = cur + 1; z <= n; z++) {
            ped.zones.push('Zone ' + z);
            ped.price[z] = PRICE_STEPS.map(() => 0);
            ped.over70[z] = 0;
        }
    }
    else if (n < cur) {
        for (let z = cur; z > n; z--) {
            delete ped.price[z];
            delete ped.over70[z];
        }
        ped.zones = ped.zones.slice(0, n);
        if (ped.dz > n)
            ped.dz = n;
        Object.keys(ped.zmap).forEach(c => {
            if (ped.zmap[c] > n)
                ped.zmap[c] = n;
        });
    }
    pedRenderZones();
    pedRefreshZoneUI();
}
function pedRenderCountries() {
    const el = document.getElementById('ped-countries');
    if (!el)
        return;
    const ent = Object.entries(ped.zmap);
    el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr><th>Tên nước</th><th style="width:150px">Zone</th><th style="width:40px"></th></tr></thead><tbody>' +
        (ent.length ? ent.map(([c, z], i) => `<tr>
     <td><input style="${CI}" value="${esc(c)}" onchange="pedRenameCountry(${i},this.value)"></td>
     <td><select style="${CI}" onchange="pedSetCountryZone(${i},this.value)">${pedZoneOpts(Number(z))}</select></td>
     <td><button class="btn ghost sm" style="color:var(--red)" onclick="pedRmCountry(${i})">✕</button></td></tr>`).join('') : '<tr><td colspan="3" class="muted">Chưa khai nước nào — nước chưa khai sẽ tính theo Zone mặc định.</td></tr>') +
        '</tbody></table></div>';
}
function pedCountryKey(i) {
    return Object.keys(ped.zmap)[i];
}
function pedRenameCountry(i, v) {
    v = v.trim();
    const keys = Object.keys(ped.zmap);
    const old = keys[i];
    if (old === undefined)
        return;
    const z = ped.zmap[old];
    const ne = {};
    keys.forEach((k, j) => {
        if (j === i) {
            if (v)
                ne[v] = z;
        }
        else
            ne[k] = ped.zmap[k];
    });
    ped.zmap = ne;
    pedRenderCountries();
}
function pedSetCountryZone(i, v) {
    const k = pedCountryKey(i);
    if (k !== undefined)
        ped.zmap[k] = +v;
}
function pedAddCountry() {
    let n = 'Nước ' + (Object.keys(ped.zmap).length + 1);
    while (ped.zmap[n] !== undefined)
        n += '.';
    ped.zmap[n] = 1;
    pedRenderCountries();
}
function pedRmCountry(i) {
    const k = pedCountryKey(i);
    if (k !== undefined)
        delete ped.zmap[k];
    pedRenderCountries();
}
function pedRenderQF() {
    const el = document.getElementById('ped-qf');
    if (!el)
        return;
    el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr><th>Zone</th><th>Giá mốc 0.5kg</th><th>+ mỗi 0.5kg</th></tr></thead><tbody>' +
        pedZ().map((z) => `<tr><td class="bill">${esc(ped.zones[z - 1])}</td>
     <td><input style="${CI}" type="number" id="qf-b-${z}" placeholder="VD 180000"></td>
     <td><input style="${CI}" type="number" id="qf-i-${z}" placeholder="VD 70000"></td></tr>`).join('') + '</tbody></table></div>';
}
function pedQuickFill() {
    pedZ().forEach((z) => {
        const b = +(document.getElementById('qf-b-' + z) || {}).value || 0;
        const inc = +(document.getElementById('qf-i-' + z) || {}).value || 0;
        if (b || inc) {
            ped.price[z] = PRICE_STEPS.map((_, i) => b + inc * i);
            ped.over70[z] = inc * 2;
        }
    });
    pedRenderGrid();
    pedRenderOver();
    toast('⚡ Đã tạo thang giá — chỉnh tay ô lẻ nếu cần');
}
function pedRenderGrid() {
    const zs = pedZ();
    let rows = '';
    PRICE_STEPS.forEach((w, i) => {
        rows += '<tr><td class="bill">' + w.toFixed(1) + '</td>' +
            zs.map((z) => `<td><input style="${CI};text-align:right" type="number" value="${(ped.price[z] || [])[i] || 0}" oninput="ped.price[${z}][${i}]=+this.value||0"></td>`).join('') + '</tr>';
    });
    const el = document.getElementById('ped-grid');
    if (el) {
        el.innerHTML = '<div class="tbl-wrap"><div class="tbl-scroll" style="max-height:380px;overflow:auto"><table class="orders" style="min-width:' + (120 + zs.length * 110) + 'px"><thead><tr><th style="position:sticky;left:0">Cân (kg)</th>' +
            zs.map((z) => '<th>' + esc(ped.zones[z - 1]) + '</th>').join('') + '</tr></thead><tbody>' + rows + '</tbody></table></div></div>';
    }
}
function pedRenderOver() {
    const zs = pedZ();
    const el = document.getElementById('ped-over');
    if (!el)
        return;
    el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:340px"><thead><tr>' +
        zs.map((z) => '<th>' + esc(ped.zones[z - 1]) + ' (đ/kg)</th>').join('') + '</tr></thead><tbody><tr>' +
        zs.map((z) => `<td><input style="${CI};text-align:right" type="number" value="${ped.over70[z] || 0}" oninput="ped.over70[${z}]=+this.value||0"></td>`).join('') + '</tr></tbody></table></div>';
}
function pedRenderSur() {
    const el = document.getElementById('ped-sur');
    if (!el)
        return;
    el.innerHTML = '<div class="tbl-wrap"><table class="orders" style="min-width:640px"><thead><tr>' +
        '<th colspan="2">Cân nặng (kg)</th><th colspan="2">Cạnh dài nhất (cm)</th><th colspan="2">A=(R+C)×2+D (cm)</th><th rowspan="2">Phí charge (đ)</th><th rowspan="2"></th></tr>' +
        '<tr><th>từ</th><th>đến</th><th>từ</th><th>đến</th><th>từ</th><th>đến</th></tr></thead><tbody>' +
        (ped.sur.length ? ped.sur.map((r, i) => `<tr>
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
function pedAddSur() {
    ped.sur.push({ wFrom: '', wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: '' });
    pedRenderSur();
}
function pedRmSur(i) {
    ped.sur.splice(i, 1);
    pedRenderSur();
}
function pedSave() {
    if (!ped.name.trim()) {
        toast('⚠️ Nhập Tên dịch vụ');
        return;
    }
    ped.sur = ped.sur.filter((r) => [r.wFrom, r.wTo, r.dFrom, r.dTo, r.gFrom, r.gTo, r.fee].some((v) => v !== '' && v != null));
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
    if (idx >= 0)
        PRICE_SVCS[idx] = rec;
    else
        PRICE_SVCS.push(rec);
    savePrice();
    rateSel = rec.name;
    toast('💾 Đã lưu bảng giá ' + rec.name);
    pedClose();
}
function aiInit() {
    if (!aiInited) {
        renderAiSamples();
        aiInited = true;
    }
    const body = document.getElementById('ai_invBody');
    if (body && !body.querySelector('tr.ai-row')) {
        body.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center;padding:18px">Chưa có mặt hàng — thêm ảnh (hoặc bấm ảnh mẫu) rồi bấm "AI nhận diện".</td></tr>';
    }
}
function renderAiSamples() {
    const w = document.getElementById('ai_samples');
    if (!w)
        return;
    w.innerHTML = '';
    AI_ITEMS.forEach(it => {
        const b = document.createElement('button');
        b.className = 'chip';
        b.textContent = it.label;
        b.onclick = () => aiAddSample(it.key);
        w.appendChild(b);
    });
}
function aiSetRcv(f, val, filled) {
    const inp = document.getElementById('ai_' + f);
    if (!inp)
        return;
    inp.value = val || '';
    const wrap = document.querySelector('#v-create-ai .f[data-aif="' + f + '"]');
    if (wrap) {
        wrap.classList.remove('ai-filled');
        if (filled && val) {
            void wrap.offsetWidth;
            wrap.classList.add('ai-filled');
        }
    }
    if (f === 'country')
        aiUpdateFlag();
}
function aiUpdateFlag() {
    const el = document.getElementById('ai_flag');
    if (el)
        el.textContent = FLAGS[(document.getElementById('ai_country') || {}).value] || '🏳️';
}
function aiClearReceiver() {
    const paste = document.getElementById('ai_paste');
    if (paste)
        paste.value = '';
    ['country', 'company', 'contact', 'tel', 'email', 'tax', 'city', 'state', 'postal', 'addr1', 'addr2', 'addr3'].forEach(f => aiSetRcv(f, '', false));
    const conf = document.getElementById('ai_rconf');
    if (conf) {
        conf.textContent = '';
        conf.className = 'ai-conf';
    }
}
function aiPasteSample() {
    const paste = document.getElementById('ai_paste');
    if (paste)
        paste.value = "Mr. Lim — LINEX CO. LTD\n+65 8123 4567 · lim@linex.sg\n1 Raffles Place, #20-01, Tower One\nSingapore 238859";
    aiParseReceiver();
}
function aiParseReceiver() {
    const raw = (document.getElementById('ai_paste')?.value || '').trim();
    if (!raw) {
        toast('⚠️ Dán thông tin người nhận vào ô rồi bấm AI phân tích');
        return;
    }
    ['country', 'company', 'contact', 'tel', 'email', 'tax', 'city', 'state', 'postal', 'addr1', 'addr2', 'addr3'].forEach(f => aiSetRcv(f, '', false));
    let work = raw.replace(/\r/g, '');
    const set = [];
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
        if (!city && country && ['Singapore', 'Hong Kong', 'Malaysia'].includes(country))
            city = country;
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
    toast('✨ AI đã tách ' + set.length + ' trường — kiểm tra ô tô xanh');
}
function aiAddSample(key) {
    const it = AI_ITEMS.find(x => x.key === key);
    if (!it)
        return;
    aiPhotos.push({ key, emoji: it.emoji });
    aiRenderPhotos();
}
function aiOnFiles(files) {
    Array.from(files).forEach(() => {
        const it = AI_ITEMS[(aiPhotos.length) % AI_ITEMS.length];
        aiPhotos.push({ key: it.key, emoji: it.emoji });
    });
    aiRenderPhotos();
    const fileInp = document.getElementById('ai_file');
    if (fileInp)
        fileInp.value = '';
}
function aiRmPhoto(i) {
    aiPhotos.splice(i, 1);
    aiRenderPhotos();
}
function aiRenderPhotos() {
    const w = document.getElementById('ai_photos');
    if (!w)
        return;
    w.innerHTML = '';
    aiPhotos.forEach((p, i) => {
        const it = (AI_ITEMS.find(x => x.key === p.key) || {});
        const d = document.createElement('div');
        d.className = 'ai-thumb';
        d.innerHTML = `<div class="ph">${p.url ? `<img src="${p.url}" style="width:96px;height:72px;object-fit:cover">` : (p.emoji || '📦')}</div><div class="cap">${p.fname || it.label || ''}</div><button class="rmp" onclick="aiRmPhoto(${i})">✕</button>`;
        w.appendChild(d);
    });
    const has = aiPhotos.length > 0, btn = document.getElementById('ai_recog');
    if (btn)
        btn.disabled = !has;
    const h = document.getElementById('ai_recogHint');
    if (h)
        h.textContent = has ? (aiPhotos.length + ' ảnh — bấm để AI nhận diện') : 'Thêm ít nhất 1 ảnh để AI nhận diện.';
}
function aiRecognize() {
    if (!aiPhotos.length)
        return;
    const body = document.getElementById('ai_invBody');
    if (body && body.querySelector('td[colspan]'))
        body.innerHTML = '';
    document.querySelectorAll('#ai_photos .ai-thumb').forEach(t => t.classList.add('busy'));
    const btn = document.getElementById('ai_recog');
    if (btn)
        btn.disabled = true;
    const multi = document.getElementById('ai_multi')?.checked;
    const batch = [...aiPhotos];
    setTimeout(() => {
        batch.forEach((p, idx) => {
            const it = AI_ITEMS.find(x => x.key === p.key) || AI_ITEMS[0];
            aiInvRow(it);
            if (multi && idx === 0)
                AI_ITEMS.filter(x => x.key !== it.key).slice(0, 2).forEach(e => aiInvRow(e));
        });
        aiPhotos = [];
        aiRenderPhotos();
        aiCalc();
        const banner = document.getElementById('ai_banner');
        if (banner)
            banner.hidden = false;
        if (btn)
            btn.disabled = false;
        toast('✨ AI đã nhận diện xong — kiểm tra tên hàng & mã HS');
        setTimeout(() => document.querySelectorAll('#ai_invBody tr.newrow').forEach(r => r.classList.remove('newrow')), 1200);
    }, 700);
}
function aiInvRow(it) {
    const id = ++aiRowId;
    const tr = document.createElement('tr');
    tr.className = 'ai-row newrow';
    tr.dataset.id = String(id);
    const hsOpts = (it.hs || []).map((h, i) => `<option value="${h}">${h}${i === 0 ? ' — AI đề xuất' : ''}</option>`).join('');
    tr.innerHTML = `<td class="num-c"></td>
    <td><textarea rows="1" data-c="en" placeholder="Tên hàng (EN)">${it.en || ''}</textarea>
        <textarea rows="1" data-c="vi" placeholder="Tên hàng (VN)">${it.vi || ''}</textarea>
        <textarea rows="1" data-c="mnf" placeholder="Nhà sản xuất">${it.mnf || ''}</textarea>
        <textarea rows="1" data-c="mat" placeholder="Chất liệu">${it.mat || ''}</textarea>
        <span class="ai-tag">✨ AI ${it.conf || 95}%</span>${it.warn ? ` <span class="badge b-wait" style="font-size:10.5px">${it.warn}</span>` : ''}</td>
    <td><input data-c="origin" value="${it.origin || 'VN'}"></td>
    <td><select class="hs-pick" data-c="hs">${hsOpts}</select></td>
    <td><div class="qtywrap" style="display:flex;gap:4px"><input data-c="qty" type="number" value="${it.qty || 1}" oninput="aiCalc()" style="max-width:52px"><select data-c="unit"><option>PCS</option><option>SET</option><option>BOX</option><option>KG</option></select></div></td>
    <td><input data-c="price" type="number" step="0.01" value="${it.price || 0}" oninput="aiCalc()"></td>
    <td data-c="sub" class="tnum">0</td>
    <td><button class="xbtn" onclick="aiDelRow(${id})">✕</button></td>`;
    const body = document.getElementById('ai_invBody');
    if (body)
        body.appendChild(tr);
    if (it.unit) {
        const unitSel = tr.querySelector('[data-c=unit]');
        if (unitSel)
            unitSel.value = it.unit;
    }
}
function aiDelRow(id) {
    const tr = document.querySelector('#ai_invBody tr[data-id="' + id + '"]');
    if (tr)
        tr.remove();
    const body = document.getElementById('ai_invBody');
    if (body && !body.querySelector('tr.ai-row'))
        aiInit();
    aiCalc();
}
function aiCalc() {
    const cur = document.getElementById('ai_cur')?.value || 'USD', sym = CURSYM[cur] || '$';
    let tot = 0;
    document.querySelectorAll('#ai_invBody tr.ai-row').forEach((r, i) => {
        const num = r.querySelector('.num-c');
        if (num)
            num.textContent = String(i + 1);
        const q = +(r.querySelector('[data-c=qty]')?.value || 0), p = +(r.querySelector('[data-c=price]')?.value || 0), s = q * p;
        tot += s;
        const sub = r.querySelector('[data-c=sub]');
        if (sub)
            sub.textContent = sym + s.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    });
    const el = document.getElementById('ai_total');
    if (el)
        el.textContent = sym + tot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
// Bind Global Window Functions
const exportsToWindow = {
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
function closeFav() { closeCatMenu(); }
function toggleFavorite(ev, c) { toggleCatFav(ev, c); }
function selectSender(s) { choosePick(s); }
function selectReceiver(r) { choosePick(r); }
function selectProduct(p) { choosePick(p); }
function removeKien(id) { delKien(id); }
function removeInv(id) { delInv(id); }
function removeEprod(btn) { btn?.parentElement?.remove(); }
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
    window[k] = exportsToWindow[k];
});
window.VA = exportsToWindow;
// Event Listeners Initialization
function initDomEvents() {
    document.querySelectorAll('.nav a').forEach(a => {
        a.onclick = e => {
            e.preventDefault();
            const el = a;
            nav(el.dataset.view || 'home');
            if (el.dataset.view === 'create')
                setCreateMode(el.dataset.mode || createMode);
            document.querySelectorAll('.nav a').forEach(x => x.classList.remove('on'));
            el.classList.add('on');
        };
    });
    const menuToggle = document.getElementById('menuToggle');
    if (menuToggle) {
        menuToggle.onclick = () => {
            if (matchMedia('(max-width:1040px)').matches) {
                document.getElementById('sidebar')?.classList.toggle('open');
            }
            else {
                const a = document.getElementById('app');
                if (a) {
                    a.classList.toggle('collapsed');
                    try {
                        localStorage.setItem('va_collapsed', a.classList.contains('collapsed') ? '1' : '0');
                    }
                    catch (e) { }
                }
            }
        };
    }
    try {
        if (localStorage.getItem('va_collapsed') === '1') {
            document.getElementById('app')?.classList.add('collapsed');
        }
    }
    catch (e) { }
    const themeBtn = document.getElementById('themeBtn');
    if (themeBtn) {
        themeBtn.onclick = () => {
            const r = document.documentElement;
            const cur = r.getAttribute('data-theme');
            const dark = cur ? cur === 'dark' : matchMedia('(prefers-color-scheme:dark)').matches;
            r.setAttribute('data-theme', dark ? 'light' : 'dark');
            const themeIc = document.getElementById('themeIc');
            if (themeIc)
                themeIc.textContent = dark ? '🌙' : '☀️';
        };
    }
    document.querySelectorAll('#chips .chip').forEach(c => {
        c.onclick = () => {
            document.querySelectorAll('#chips .chip').forEach(x => x.classList.remove('on'));
            c.classList.add('on');
            filter = c.dataset.f || 'all';
            curPage = 1;
            renderOrders();
        };
    });
    document.querySelectorAll('#stepRail .step').forEach(s => {
        s.onclick = () => {
            const d = +(s.dataset.step || 0);
            if (d <= step || validate(step))
                setStep(d);
        };
    });
    document.addEventListener('click', e => {
        if (!e.target.closest('#catDD'))
            closeCatMenu();
        if (!e.target.closest('#pmenu,.print-btn'))
            closePmenu();
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
}
else {
    initDomEvents();
}
export {};
//# sourceMappingURL=main.js.map