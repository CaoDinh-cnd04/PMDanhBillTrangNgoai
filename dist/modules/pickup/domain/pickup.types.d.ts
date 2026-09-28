export type PickupStatus = 'wait' | 'ok';
export interface PickupBookingProps {
    id: string;
    date: string;
    slot: string;
    pcs: number;
    st: PickupStatus;
    stx: string;
    branch?: string;
    address?: string;
    contact?: string;
    phone?: string;
}
export declare const PICKUP_STATUSES: Record<PickupStatus, {
    badgeClass: string;
    label: string;
}>;
