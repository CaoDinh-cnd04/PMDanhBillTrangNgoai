export interface ParsedReceiverResult {
    country: string;
    company: string;
    contact: string;
    tel: string;
    email: string;
    tax: string;
    city: string;
    state: string;
    postal: string;
    addr1: string;
    addr2: string;
    addr3: string;
    confidence: number;
    extractedFieldsCount: number;
}
export interface AiRecognizedItem {
    key: string;
    label: string;
    emoji: string;
    en: string;
    vi: string;
    mnf: string;
    mat: string;
    origin: string;
    hs: string[];
    unit: string;
    qty: number;
    price: number;
    conf: number;
    warn?: string;
}
export declare const AI_KNOWLEDGE_ITEMS: AiRecognizedItem[];
