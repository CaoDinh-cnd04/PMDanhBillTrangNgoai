import { Router, Request, Response } from 'express';
import { HeuristicAiService } from '../infrastructure/heuristic-parser.service.js';

export function createAiAssistantRouter(service: HeuristicAiService): Router {
  const router = Router();

  // POST /ai/parse-receiver - Tách chuỗi người nhận tự do thành các trường chuẩn
  router.post('/parse-receiver', (req: Request, res: Response) => {
    const text = req.body.text as string;
    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'EMPTY_TEXT', message: 'Vui lòng cung cấp chuỗi văn bản thông tin người nhận.' });
    }
    const parsed = service.parseReceiverText(text);
    return res.json({ success: true, data: parsed });
  });

  // GET /ai/sample-items - Lấy danh mục mẫu nhận diện ảnh AI
  router.get('/sample-items', (_req: Request, res: Response) => {
    const items = service.getKnowledgeItems();
    return res.json({ success: true, count: items.length, data: items });
  });

  // POST /ai/recognize - Nhận diện mặt hàng từ key mẫu hoặc ảnh
  router.post('/recognize', (req: Request, res: Response) => {
    const key = req.body.key as string | undefined;
    const item = service.recognizeImageItem(key);
    return res.json({ success: true, data: item });
  });

  return router;
}
