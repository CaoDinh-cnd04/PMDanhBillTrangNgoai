export type OrderStatus = 'wait' | 'fly' | 'nd' | 'ok' | 'late';
export type CargoType = 'PACK' | 'DOC';
export type DraftStatus = 'draft' | 'ready';

export interface PackageItem {
  id?: number | string;
  sl: number; // quantity of cartons
  pack: string; // 'Thùng carton' | 'Bao / túi' | 'Pallet' | 'Kiện gỗ'
  d: number; // length cm
  w: number; // width cm
  h: number; // height cm
  g: number; // gross weight kg
  vol?: number; // volumetric weight (d*w*h)/5000 * sl
}

export interface InvoiceItem {
  id?: number | string;
  en: string; // English description
  vi: string; // Vietnamese description
  mnf?: string; // Manufacturer name & address
  material?: string;
  origin: string; // default 'VN'
  hs?: string; // HS Code
  qty: number;
  unit: string; // 'PCS' | 'BOX' | 'KG' | 'SET'
  price: number; // Unit price
  sub?: number; // qty * price
}

export interface SenderAddress {
  company: string;
  contact: string;
  tel: string;
  address: string;
}

export interface ReceiverAddress {
  company: string;
  contact: string;
  tel: string;
  email?: string;
  tax?: string;
  country: string;
  city: string;
  postal: string;
  addr1: string;
  addr2?: string;
  addr3?: string;
}

export interface OrderPod {
  date: string;
  time: string;
  signer: string;
}

export interface OrderProps {
  id: string;
  seq: number;
  bill: string;
  ref: string;
  connect?: string;
  cnee: string;
  ct: string;
  route: string;
  hub?: string;
  branch: string;
  created: string;
  sent?: string;
  type: CargoType;
  st: OrderStatus;
  pcs: string;
  content: string;
  track: string;
  pod?: OrderPod | null;
  photos: number;
  sender?: SenderAddress;
  receiver?: ReceiverAddress;
  packages?: PackageItem[];
  invoice?: InvoiceItem[];
  addons?: string[];
  isLocked: boolean;
}

export interface DraftOrderProps {
  id: string;
  stt: DraftStatus;
  cnee: string;
  ct: string;
  service: string;
  branch: string;
  ref: string;
  pcs: string;
  content: string;
  date: string;
  payload?: Record<string, unknown>;
}

export interface CarrierWarning {
  lv: 'crit' | 'warn' | 'info';
  t: string;
  d: string;
}

export const BRANCHES = ['TP.HCM', 'Hà Nội', 'Huế', 'Bảo Lộc', 'Cần Thơ'];

export const STATUS_INFO: Record<OrderStatus, { icon: string; label: string; color: string; badgeClass: string }> = {
  wait: { icon: '🕒', label: 'Chưa đi', color: 'var(--blue)', badgeClass: 'b-wait' },
  fly: { icon: '✈️', label: 'Đã đi', color: 'var(--green-d)', badgeClass: 'b-fly' },
  nd: { icon: '🚚', label: 'Chưa phát', color: 'var(--amber)', badgeClass: 'b-nd' },
  ok: { icon: '✅', label: 'Đã phát', color: 'var(--green-dd)', badgeClass: 'b-ok' },
  late: { icon: '⏰', label: 'Vượt ngày', color: 'var(--red)', badgeClass: 'b-late' }
};
