import { Router, Request, Response } from 'express';
import { NotificationRepository } from '../infrastructure/in-memory-notification.repository.js';

export function createNotificationRouter(repo: NotificationRepository): Router {
  const router = Router();

  // GET /notifications - Danh sách thông báo
  router.get('/notifications', async (_req: Request, res: Response) => {
    const list = await repo.getAll();
    const unread = await repo.getUnreadCount();
    res.json({ success: true, count: list.length, unreadCount: unread, data: list });
  });

  // POST /notifications/:id/read - Đánh dấu 1 thông báo đã đọc
  router.post('/notifications/:id/read', async (req: Request, res: Response) => {
    const ok = await repo.markAsRead(String(req.params.id));
    res.json({ success: ok });
  });

  // POST /notifications/mark-all-read - Đánh dấu tất cả là đã đọc
  router.post('/notifications/mark-all-read', async (_req: Request, res: Response) => {
    await repo.markAllRead();
    res.json({ success: true, message: 'Đã đánh dấu tất cả thông báo là đã đọc' });
  });

  return router;
}
