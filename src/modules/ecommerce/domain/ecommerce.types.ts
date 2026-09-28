export type EcomSource = 'tiktok' | 'shopify' | 'shopee' | 'lazada' | 'api' | 'excel' | 'manual';
export type EcomStatus = 'created' | 'picked_up' | 'departed' | 'delivered' | 'exception' | 'weighing';

export interface EcomProductItem {
  name: string;
  sku: string;
  qty: number;
  fobPrice: number;
  sellingPrice: number;
  weightKg?: number;
  hsCode?: string;
  origin?: string;
}

export interface EcomOrderProps {
  id: string;
  src: EcomSource;
  ref: string; // Customer / Store order code
  bill: string; // VA bill code (or empty if pending/exception)
  cnee: string;
  ct: string;
  items: number;
  kg: number;
  st: EcomStatus;
  note?: string;
  products?: EcomProductItem[];
  createdAt: string;
}

export const ECOM_SOURCE_INFO: Record<EcomSource, { icon: string; label: string; badgeClass: string }> = {
  tiktok: { icon: '🎵', label: 'TikTok', badgeClass: 'src-tiktok' },
  shopify: { icon: '🛍️', label: 'Shopify', badgeClass: 'src-shopify' },
  shopee: { icon: '🧡', label: 'Shopee', badgeClass: 'src-shopee' },
  lazada: { icon: '💙', label: 'Lazada', badgeClass: 'src-lazada' },
  api: { icon: '🔌', label: 'API', badgeClass: 'src-api' },
  excel: { icon: '📄', label: 'Excel', badgeClass: 'src-excel' },
  manual: { icon: '✍️', label: 'Tay', badgeClass: 'src-manual' }
};

export const ECOM_STATUS_INFO: Record<EcomStatus, { icon: string; label: string; badgeClass: string }> = {
  created: { icon: '🟢', label: 'Đã tạo', badgeClass: 'b-fly' },
  picked_up: { icon: '🚚', label: 'Đã lấy', badgeClass: 'b-wait' },
  departed: { icon: '✈️', label: 'Đã đi', badgeClass: 'b-fly' },
  delivered: { icon: '✅', label: 'Đã phát', badgeClass: 'b-ok' },
  exception: { icon: '⚠️', label: 'Lỗi', badgeClass: 'b-late' },
  weighing: { icon: '⚖️', label: 'Chờ cân đo', badgeClass: 'b-nd' }
};
