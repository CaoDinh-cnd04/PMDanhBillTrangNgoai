import { OFFICIAL_44_CATEGORIES, DEFAULT_HS_SUGGESTIONS } from '../domain/catalog.types.js';
export class CatalogRepository {
    categories = new Map();
    favorites = new Set([
        'Quần áo và hàng may mặc',
        'Thực phẩm chức năng',
        'Đồ chơi và sản phẩm trẻ em',
        'Thực phẩm khô'
    ]);
    constructor() {
        this.seed();
    }
    seed() {
        for (const name of OFFICIAL_44_CATEGORIES) {
            this.categories.set(name, {
                name,
                isFavorite: this.favorites.has(name),
                suggestions: DEFAULT_HS_SUGGESTIONS[name] || []
            });
        }
    }
    async getAllCategories(query) {
        const list = Array.from(this.categories.values());
        let filtered = list;
        if (query && query.trim()) {
            const q = query.toLowerCase().trim();
            filtered = list.filter(c => c.name.toLowerCase().includes(q));
        }
        // Return favorites on top, then alphabetical
        return filtered.sort((a, b) => {
            if (a.isFavorite && !b.isFavorite)
                return -1;
            if (!a.isFavorite && b.isFavorite)
                return 1;
            return a.name.localeCompare(b.name, 'vi');
        });
    }
    async toggleFavorite(name) {
        const cat = this.categories.get(name);
        if (!cat)
            return false;
        cat.isFavorite = !cat.isFavorite;
        if (cat.isFavorite) {
            this.favorites.add(name);
        }
        else {
            this.favorites.delete(name);
        }
        return cat.isFavorite;
    }
    async getSuggestions(categoryName) {
        const cat = this.categories.get(categoryName);
        return cat ? cat.suggestions : [];
    }
}
//# sourceMappingURL=in-memory-catalog.repository.js.map