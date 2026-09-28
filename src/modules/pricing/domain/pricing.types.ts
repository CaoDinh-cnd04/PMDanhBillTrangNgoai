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
  fsc: number; // e.g. 0.28 for 28%
  vat: number; // e.g. 0.08 for 8%
  eta: string;
  effFrom: string;
  effTo: string;
  zones: string[]; // e.g. ['Zone 1', 'Zone 2', 'Zone 3']
  zmap: Record<string, number>; // country name -> zone number (1-indexed)
  dz: number; // default zone
  price: Record<number, number[]>; // zone number -> 140 price points (0.5kg -> 70kg)
  over70: Record<number, number>; // zone number -> price per kg for weight > 70kg
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
export const WEIGHT_STEPS: number[] = (() => {
  const steps: number[] = [];
  for (let w = 0.5; w <= 70.0001; w += 0.5) {
    steps.push(+w.toFixed(1));
  }
  return steps;
})();

export const CARRIER_LIMIT_RULES: Record<string, {
  maxSide: number;
  maxSum: number;
  maxWeight: number;
  nonSide: number;
  nonWeight: number;
}> = {
  _default: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 200, nonWeight: 100 },
  DHL: { maxSide: 120, maxSum: 300, maxWeight: 31.5, nonSide: 120, nonWeight: 70 },
  Fedex: { maxSide: 121, maxSum: 330, maxWeight: 31.5, nonSide: 121, nonWeight: 68 },
  UPS: { maxSide: 122, maxSum: 330, maxWeight: 31.5, nonSide: 122, nonWeight: 70 },
  Aramex: { maxSide: 120, maxSum: 300, maxWeight: 30, nonSide: 150, nonWeight: 70 },
  'Chuyên tuyến': { maxSide: 150, maxSum: 330, maxWeight: 45, nonSide: 220, nonWeight: 120 },
  Ecommerce: { maxSide: 100, maxSum: 250, maxWeight: 20, nonSide: 150, nonWeight: 50 },
  SEA: { maxSide: 300, maxSum: 600, maxWeight: 1000, nonSide: 600, nonWeight: 2000 }
};
