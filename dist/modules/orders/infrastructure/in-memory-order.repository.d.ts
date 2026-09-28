import { OrderProps, DraftOrderProps } from '../domain/order.types.js';
export interface OrderFilterParams {
    query?: string;
    status?: string;
    branch?: string;
    type?: string;
    fromDate?: string;
    toDate?: string;
    weightFrom?: number;
    weightTo?: number;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDir?: 'asc' | 'desc';
}
export declare class OrderRepository {
    private orders;
    private drafts;
    private billSequence;
    private seqCounter;
    constructor();
    getNextBillCode(): string;
    getNextSeq(): number;
    getAllOrders(): Promise<OrderProps[]>;
    findOrderByBillOrRef(billOrRef: string): Promise<OrderProps | null>;
    createOrder(order: OrderProps): Promise<OrderProps>;
    updateOrder(order: OrderProps): Promise<void>;
    deleteOrder(billOrRef: string): Promise<boolean>;
    getAllDrafts(): Promise<DraftOrderProps[]>;
    findDraftById(id: string): Promise<DraftOrderProps | null>;
    saveDraft(draft: DraftOrderProps): Promise<DraftOrderProps>;
    deleteDraft(id: string): Promise<boolean>;
    /**
     * Print draft & convert to locked order with newly assigned bill code.
     */
    printDraftAndLock(draftId: string): Promise<{
        order: OrderProps;
        billCode: string;
    }>;
    /**
     * Filter orders with pagination, search, status chips, branch chips, weight and date ranges.
     */
    filterOrders(params: OrderFilterParams): Promise<{
        items: OrderProps[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
}
