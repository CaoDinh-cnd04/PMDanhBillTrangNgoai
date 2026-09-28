import { Router, Request, Response } from 'express';
import { CatalogRepository } from '../infrastructure/in-memory-catalog.repository.js';

export function createCatalogRouter(repo: CatalogRepository): Router {
  const router = Router();

  router.get('/categories', async (req: Request, res: Response) => {
    const q = req.query.q as string | undefined;
    const categories = await repo.getAllCategories(q);
    res.json({ success: true, count: categories.length, data: categories });
  });

  router.post('/categories/:name/favorite', async (req: Request, res: Response) => {
    const name = decodeURIComponent(String(req.params.name));
    const isFav = await repo.toggleFavorite(name);
    res.json({ success: true, category: name, isFavorite: isFav });
  });

  router.get('/categories/:name/suggestions', async (req: Request, res: Response) => {
    const name = decodeURIComponent(String(req.params.name));
    const suggestions = await repo.getSuggestions(name);
    res.json({ success: true, category: name, data: suggestions });
  });

  return router;
}
