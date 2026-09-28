import { EcomOrderProps } from '../domain/ecommerce.types.js';
export declare class EcomRepository {
    private orders;
    private billCounter;
    constructor();
    getNextBill(): string;
    getAllOrders(sourceFilter?: string, search?: string): Promise<EcomOrderProps[]>;
    createOrder(props: EcomOrderProps): Promise<EcomOrderProps>;
    parseAndImportCsv(csvContent: string): Promise<{
        importedCount: number;
        errors: string[];
    }>;
}
