import { PackageItem, CarrierWarning } from './order.types.js';
export declare class OrderPolicies {
    /**
     * Rule: Calculate volumetric weight for package items: (L * W * H) / 5000 * quantity
     */
    static calculatePackagesTotals(items: PackageItem[]): {
        totalPieces: number;
        totalGrossWeight: number;
        totalVolumetricWeight: number;
        chargeableWeight: number;
        itemsWithVol: PackageItem[];
    };
    /**
     * Rule: Evaluates carrier dimension and weight limits against service rules.
     */
    static evaluateCarrierWarnings(service: string, items: PackageItem[], grossWeight: number, volWeight: number): CarrierWarning[];
    /**
     * Rule: DOC > 2kg must be converted to PACK.
     */
    static shouldConvertToPack(type: string, docWeight: number): boolean;
    /**
     * Rule: Additional fees calculation (domestic <12kg, remote country).
     */
    static computeAdditionalFees(country: string, chargeWeight: number): Array<{
        name: string;
        amount: number;
    }>;
}
