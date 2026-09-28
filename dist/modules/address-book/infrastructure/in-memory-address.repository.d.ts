import { SenderProfile, ReceiverEntry } from '../domain/address.types.js';
export declare class AddressBookRepository {
    private senders;
    private receivers;
    constructor();
    getAllSenders(): Promise<SenderProfile[]>;
    getAllReceivers(query?: string): Promise<ReceiverEntry[]>;
    saveReceiver(entry: ReceiverEntry): Promise<ReceiverEntry>;
    deleteReceiver(id: string): Promise<boolean>;
}
