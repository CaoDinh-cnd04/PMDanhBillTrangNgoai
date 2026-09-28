export interface HsSuggestion {
    en: string;
    vi: string;
    hs: string;
}
export interface CategoryData {
    name: string;
    isFavorite: boolean;
    suggestions: HsSuggestion[];
}
export declare const OFFICIAL_44_CATEGORIES: string[];
export declare const DEFAULT_HS_SUGGESTIONS: Record<string, HsSuggestion[]>;
