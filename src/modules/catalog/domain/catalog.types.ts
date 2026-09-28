export interface HsSuggestion {
  en: string;
  vi: string;
  hs: string;
}

export interface CategoryData {
  name: string;
  isFavorite: boolean;
  suggestions: HsSuggestion[];
}

export const OFFICIAL_44_CATEGORIES: string[] = [
  "Quần áo và hàng may mặc",
  "Thực phẩm khô",
  "Mỹ phẩm",
  "Đồ dùng cá nhân",
  "Thực phẩm chức năng",
  "Thuốc, dược phẩm và thiết bị y tế",
  "Quà tặng và đồ lưu niệm",
  "Giày dép",
  "Đồ da, túi xách và phụ kiện thời trang",
  "Nông sản và sản phẩm từ thực vật",
  "Điện thoại, máy tính và thiết bị công nghệ",
  "Điện tử, thiết bị điện và linh kiện",
  "Đồ gia dụng và vật dụng nhà bếp",
  "Sách, ấn phẩm và văn phòng phẩm",
  "Chứng từ và tài liệu",
  "Hàng thủ công mỹ nghệ",
  "Đồ chơi và sản phẩm trẻ em",
  "Hàng mẫu và sản phẩm quảng cáo",
  "Gốm sứ, thủy tinh và đồ dễ vỡ",
  "Tranh, tác phẩm nghệ thuật và đồ sưu tầm",
  "Đồ nội thất và trang trí nội thất",
  "Đồng hồ và phụ kiện",
  "Trang sức, đá quý và kim loại quý",
  "Sản phẩm dành cho thú cưng",
  "Dụng cụ thể thao và dã ngoại",
  "Vật phẩm tôn giáo và thờ cúng",
  "Công cụ, dụng cụ và đồ nghề",
  "Máy móc cơ khí, thiết bị và phụ tùng",
  "Phụ tùng ô tô, xe máy",
  "Thiết bị có pin",
  "Nhạc cụ và phụ kiện âm nhạc",
  "Sản phẩm nhựa",
  "Sản phẩm kim loại",
  "Bao bì, chai lọ và vật tư đóng gói",
  "Nguyên liệu và vật tư công nghiệp",
  "Vật liệu và phụ kiện xây dựng",
  "Chất lỏng, dung dịch và sản phẩm dạng gel",
  "Dầu, tinh dầu và sản phẩm chứa dầu",
  "Bột, hạt và nguyên liệu dạng rời",
  "Sơn, mực, keo và chất kết dính",
  "Hóa chất và chế phẩm hóa học",
  "Mẫu thử và mẫu phòng thí nghiệm",
  "Hành lý và đồ dùng chuyển nhà",
  "Hàng hóa khác"
];

export const DEFAULT_HS_SUGGESTIONS: Record<string, HsSuggestion[]> = {
  "Quần áo và hàng may mặc": [
    { en: "T-shirt", vi: "Áo thun", hs: "6109" },
    { en: "Dress", vi: "Váy", hs: "6204" },
    { en: "Jeans", vi: "Quần jean", hs: "6203" },
    { en: "Jacket", vi: "Áo khoác", hs: "6201" }
  ],
  "Thực phẩm khô": [
    { en: "Dried fruit", vi: "Trái cây sấy", hs: "0813" },
    { en: "Instant noodles", vi: "Mì ăn liền", hs: "1902" },
    { en: "Dried seaweed", vi: "Rong biển khô", hs: "1212" }
  ],
  "Mỹ phẩm": [
    { en: "Lipstick", vi: "Son môi", hs: "3304" },
    { en: "Face cream", vi: "Kem dưỡng da", hs: "3304" },
    { en: "Perfume", vi: "Nước hoa", hs: "3303" }
  ],
  "Đồ dùng cá nhân": [
    { en: "Toothbrush", vi: "Bàn chải", hs: "9603" },
    { en: "Towel", vi: "Khăn", hs: "6302" },
    { en: "Comb", vi: "Lược", hs: "9615" }
  ],
  "Thực phẩm chức năng": [
    { en: "Vitamin supplement", vi: "Vitamin", hs: "2106" },
    { en: "Collagen", vi: "Collagen", hs: "2106" },
    { en: "Fish oil", vi: "Dầu cá", hs: "1504" }
  ],
  "Thuốc, dược phẩm và thiết bị y tế": [
    { en: "Medicine", vi: "Thuốc", hs: "3004" },
    { en: "Face mask", vi: "Khẩu trang", hs: "6307" },
    { en: "Thermometer", vi: "Nhiệt kế", hs: "9025" }
  ],
  "Quà tặng và đồ lưu niệm": [
    { en: "Keychain", vi: "Móc khóa", hs: "8308" },
    { en: "Souvenir", vi: "Đồ lưu niệm", hs: "9701" },
    { en: "Postcard", vi: "Bưu thiếp", hs: "4909" }
  ],
  "Giày dép": [
    { en: "Sneakers", vi: "Giày thể thao", hs: "6404" },
    { en: "Sandals", vi: "Dép", hs: "6402" },
    { en: "Leather shoes", vi: "Giày da", hs: "6403" }
  ],
  "Đồ da, túi xách và phụ kiện thời trang": [
    { en: "Handbag", vi: "Túi xách", hs: "4202" },
    { en: "Wallet", vi: "Ví da", hs: "4202" },
    { en: "Belt", vi: "Thắt lưng", hs: "4203" }
  ],
  "Nông sản và sản phẩm từ thực vật": [
    { en: "Coffee beans", vi: "Cà phê hạt", hs: "0901" },
    { en: "Cashew nuts", vi: "Hạt điều", hs: "0801" },
    { en: "Pepper", vi: "Tiêu", hs: "0904" }
  ],
  "Điện thoại, máy tính và thiết bị công nghệ": [
    { en: "Smartphone", vi: "Điện thoại", hs: "8517" },
    { en: "Laptop", vi: "Máy tính xách tay", hs: "8471" },
    { en: "Tablet", vi: "Máy tính bảng", hs: "8471" }
  ],
  "Điện tử, thiết bị điện và linh kiện": [
    { en: "Earphone", vi: "Tai nghe", hs: "8518" },
    { en: "Charger", vi: "Sạc", hs: "8504" },
    { en: "Cable", vi: "Cáp", hs: "8544" }
  ],
  "Đồ gia dụng và vật dụng nhà bếp": [
    { en: "Cookware", vi: "Nồi chảo", hs: "7323" },
    { en: "Cup", vi: "Ly cốc", hs: "3924" },
    { en: "Cutlery", vi: "Dao muỗng nĩa", hs: "8215" }
  ],
  "Sách, ấn phẩm và văn phòng phẩm": [
    { en: "Book", vi: "Sách", hs: "4901" },
    { en: "Notebook", vi: "Sổ tay", hs: "4820" },
    { en: "Pen", vi: "Bút", hs: "9608" }
  ],
  "Chứng từ và tài liệu": [
    { en: "Documents", vi: "Chứng từ", hs: "4907" },
    { en: "Contract", vi: "Hợp đồng", hs: "4907" }
  ],
  "Hàng thủ công mỹ nghệ": [
    { en: "Handicraft", vi: "Đồ thủ công", hs: "4602" },
    { en: "Bamboo product", vi: "Sản phẩm tre", hs: "4602" },
    { en: "Embroidery", vi: "Đồ thêu", hs: "5810" }
  ],
  "Đồ chơi và sản phẩm trẻ em": [
    { en: "Toy", vi: "Đồ chơi", hs: "9503" },
    { en: "Plush toy", vi: "Thú nhồi bông", hs: "9503" },
    { en: "Baby clothes", vi: "Quần áo trẻ em", hs: "6111" }
  ],
  "Thiết bị có pin": [
    { en: "Power bank", vi: "Sạc dự phòng", hs: "8507" },
    { en: "Battery", vi: "Pin", hs: "8506" },
    { en: "Electric toy", vi: "Đồ chơi dùng pin", hs: "9503" }
  ],
  "Hàng hóa khác": [
    { en: "General goods", vi: "Hàng hóa khác", hs: "9999" }
  ]
};
