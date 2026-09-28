import { TroubleTicketProps } from '../domain/trouble.types.js';
export declare class TroubleRepository {
    private tickets;
    private seq;
    constructor();
    getAll(): Promise<TroubleTicketProps[]>;
    findById(id: string): Promise<TroubleTicketProps | null>;
    create(props: Omit<TroubleTicketProps, 'id' | 'status'> & {
        id?: string;
    }): Promise<TroubleTicketProps>;
    replyTicket(id: string, reply: string, newStatus?: TroubleTicketProps['status']): Promise<TroubleTicketProps | null>;
    getPendingCount(): Promise<number>;
}
