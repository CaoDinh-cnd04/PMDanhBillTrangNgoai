import { PickupBookingProps } from '../domain/pickup.types.js';
export declare class PickupRepository {
    private bookings;
    constructor();
    getAll(): Promise<PickupBookingProps[]>;
    create(props: Omit<PickupBookingProps, 'id' | 'st' | 'stx'>): Promise<PickupBookingProps>;
}
