export type TroublePriority = 'low' | 'mid' | 'high';
export type TroubleStatus = 'new' | 'doing' | 'waitc' | 'done';
export interface TroubleTicketProps {
    id: string;
    bill: string;
    cnee: string;
    ct: string;
    type: string;
    lv: TroublePriority;
    desc: string;
    req: string;
    contact: string;
    date: string;
    status: TroubleStatus;
    reply?: string;
}
export declare const TROUBLE_TYPES: string[];
export declare const TROUBLE_PRIORITIES: Record<TroublePriority, {
    badgeClass: string;
    label: string;
}>;
export declare const TROUBLE_STATUSES: Record<TroubleStatus, {
    badgeClass: string;
    label: string;
}>;
