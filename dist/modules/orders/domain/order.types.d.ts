export type OrderStatus = 'wait' | 'fly' | 'nd' | 'ok' | 'late';
export type CargoType = 'PACK' | 'DOC';
export type DraftStatus = 'draft' | 'ready';
export interface PackageItem {
    id?: number | string;
    sl: number;
    pack: string;
    d: number;
    w: number;
    h: number;
    g: number;
    vol?: number;
}
export interface InvoiceItem {
    id?: number | string;
    en: string;
    vi: string;
    mnf?: string;
    material?: string;
    origin: string;
    hs?: string;
    qty: number;
    unit: string;
    price: number;
    sub?: number;
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
export declare const BRANCHES: string[];
export declare const STATUS_INFO: Record<OrderStatus, {
    icon: string;
    label: string;
    color: string;
    badgeClass: string;
}>;
