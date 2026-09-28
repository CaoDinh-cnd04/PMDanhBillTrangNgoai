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
    ref: string;
    bill: string;
    cnee: string;
    ct: string;
    items: number;
    kg: number;
    st: EcomStatus;
    note?: string;
    products?: EcomProductItem[];
    createdAt: string;
}
export declare const ECOM_SOURCE_INFO: Record<EcomSource, {
    icon: string;
    label: string;
    badgeClass: string;
}>;
export declare const ECOM_STATUS_INFO: Record<EcomStatus, {
    icon: string;
    label: string;
    badgeClass: string;
}>;
