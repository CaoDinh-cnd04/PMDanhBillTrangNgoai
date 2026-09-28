export interface SurchargeRule {
    wFrom?: number | '';
    wTo?: number | '';
    dFrom?: number | '';
    dTo?: number | '';
    gFrom?: number | '';
    gTo?: number | '';
    fee: number;
}
export interface ShippingServiceProps {
    id: string;
    name: string;
    account: string;
    fsc: number;
    vat: number;
    eta: string;
    effFrom: string;
    effTo: string;
    zones: string[];
    zmap: Record<string, number>;
    dz: number;
    price: Record<number, number[]>;
    over70: Record<number, number>;
    sur: SurchargeRule[];
}
export interface QuoteRequest {
    country: string;
    grossWeight: number;
    length?: number;
    width?: number;
    height?: number;
    type: 'PACK' | 'DOC';
}
export interface ServiceQuote {
    name: string;
    zone: number;
    chargeableWeight: number;
    volumetricWeight: number;
    baseFare: number;
    fscFee: number;
    surcharges: number;
    hasSurcharge: boolean;
    vatFee: number;
    totalFare: number;
    eta: string;
    isCheapest?: boolean;
}
/**
 * 140 standard weight steps: 0.5kg, 1.0kg, 1.5kg, ... 70.0kg
 */
export declare const WEIGHT_STEPS: number[];
export declare const CARRIER_LIMIT_RULES: Record<string, {
    maxSide: number;
    maxSum: number;
    maxWeight: number;
    nonSide: number;
    nonWeight: number;
}>;
