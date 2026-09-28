import { Router } from 'express';
export function createCatalogRouter(repo) {
    const router = Router();
    router.get('/categories', async (req, res) => {
        const q = req.query.q;
        const categories = await repo.getAllCategories(q);
        res.json({ success: true, count: categories.length, data: categories });
    });
    router.post('/categories/:name/favorite', async (req, res) => {
        const name = decodeURIComponent(String(req.params.name));
        const isFav = await repo.toggleFavorite(name);
        res.json({ success: true, category: name, isFavorite: isFav });
    });
    router.get('/categories/:name/suggestions', async (req, res) => {
        const name = decodeURIComponent(String(req.params.name));
        const suggestions = await repo.getSuggestions(name);
        res.json({ success: true, category: name, data: suggestions });
    });
    return router;
}
//# sourceMappingURL=catalog.controller.js.map