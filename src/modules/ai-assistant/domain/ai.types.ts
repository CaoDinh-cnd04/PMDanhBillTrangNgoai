export interface ParsedReceiverResult {
  country: string;
  company: string;
  contact: string;
  tel: string;
  email: string;
  tax: string;
  city: string;
  state: string;
  postal: string;
  addr1: string;
  addr2: string;
  addr3: string;
  confidence: number; // 0 - 100%
  extractedFieldsCount: number;
}

export interface AiRecognizedItem {
  key: string;
  label: string;
  emoji: string;
  en: string;
  vi: string;
  mnf: string;
  mat: string;
  origin: string;
  hs: string[]; // Top-3 recommended HS codes
  unit: string;
  qty: number;
  price: number;
  conf: number;
  warn?: string;
}

export const AI_KNOWLEDGE_ITEMS: AiRecognizedItem[] = [
  {
    key: 'ao-thun', label: '👕 Áo thun', emoji: '👕', en: "Men's cotton T-shirt", vi: 'Áo thun cotton nam',
    mnf: 'Cty May Việt Tiến, TP.HCM, VN', mat: 'Cotton 100%', origin: 'VN',
    hs: ['6109.10', '6109.90', '6205.20'], unit: 'PCS', qty: 2, price: 6, conf: 96
  },
  {
    key: 'tai-nghe', label: '🎧 Tai nghe bluetooth', emoji: '🎧', en: 'Wireless bluetooth earbuds', vi: 'Tai nghe không dây bluetooth',
    mnf: 'Shenzhen Audio Co., Ltd, CN', mat: 'Nhựa ABS + pin lithium', origin: 'CN',
    hs: ['8518.30', '8517.62', '8518.29'], unit: 'SET', qty: 1, price: 15, conf: 92,
    warn: '⚠️ Có pin lithium — hàng nhạy cảm'
  },
  {
    key: 'do-choi', label: '🧸 Đồ chơi nhựa', emoji: '🧸', en: 'Plastic toy car', vi: 'Xe ô tô đồ chơi nhựa',
    mnf: 'Cty Nhựa Chợ Lớn, TP.HCM, VN', mat: 'Nhựa PP', origin: 'VN',
    hs: ['9503.00', '9503.90'], unit: 'PCS', qty: 3, price: 4, conf: 94
  },
  {
    key: 'my-pham', label: '💄 Son môi', emoji: '💄', en: 'Lipstick', vi: 'Son môi',
    mnf: 'Cty Mỹ phẩm ABC, TP.HCM, VN', mat: 'Sáp ong, dầu dưỡng, chất tạo màu', origin: 'VN',
    hs: ['3304.10', '3304.99'], unit: 'PCS', qty: 5, price: 7, conf: 90,
    warn: '⚠️ Mỹ phẩm — có thể cần công bố'
  },
  {
    key: 'giay', label: '👟 Giày thể thao', emoji: '👟', en: 'Sports sneakers', vi: 'Giày thể thao',
    mnf: "Cty Giày Bình Tiên (Biti's), VN", mat: 'Vải dệt + đế cao su', origin: 'VN',
    hs: ['6404.11', '6404.19'], unit: 'PCS', qty: 1, price: 20, conf: 93
  }
];
