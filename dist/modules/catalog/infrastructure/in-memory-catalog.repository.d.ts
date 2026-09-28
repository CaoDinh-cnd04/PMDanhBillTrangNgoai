import { CategoryData, HsSuggestion } from '../domain/catalog.types.js';
export declare class CatalogRepository {
    private categories;
    private favorites;
    constructor();
    private seed;
    getAllCategories(query?: string): Promise<CategoryData[]>;
    toggleFavorite(name: string): Promise<boolean>;
    getSuggestions(categoryName: string): Promise<HsSuggestion[]>;
}
