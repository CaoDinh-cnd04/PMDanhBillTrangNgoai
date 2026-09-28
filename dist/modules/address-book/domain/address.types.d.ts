export interface SenderProfile {
    id?: string;
    n: string;
    c: string;
    t: string;
    d: string;
}
export interface ReceiverEntry {
    id?: string;
    n: string;
    ct: string;
    city: string;
    postal: string;
    contact: string;
    tel: string;
    a1: string;
    a2?: string;
    a3?: string;
}
export declare const COUNTRY_FLAGS: Record<string, string>;
