import { ShippingServiceProps, QuoteRequest, ServiceQuote } from '../domain/pricing.types.js';
export declare class PricingRepository {
    private services;
    constructor();
    private slugify;
    private buildService;
    seed(): void;
    getAllServices(): Promise<ShippingServiceProps[]>;
    getServiceById(id: string): Promise<ShippingServiceProps | null>;
    saveService(service: ShippingServiceProps): Promise<void>;
    deleteService(id: string): Promise<boolean>;
    calculateGirthA(d: number, w: number, h: number): number;
    getFareAt(service: ShippingServiceProps, zone: number, chargeableKg: number): number;
    calculateQuotes(req: QuoteRequest): Promise<ServiceQuote[]>;
}
