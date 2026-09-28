import { Router, Request, Response } from 'express';
import { PickupRepository } from '../infrastructure/in-memory-pickup.repository.js';

export function createPickupRouter(repo: PickupRepository): Router {
  const router = Router();

  // GET /pickups - Danh sách lịch hẹn pickup
  router.get('/pickups', async (_req: Request, res: Response) => {
    const list = await repo.getAll();
    res.json({ success: true, count: list.length, data: list });
  });

  // POST /pickups - Đặt lịch pickup mới
  router.post('/pickups', async (req: Request, res: Response) => {
    try {
      const { date, slot, pcs = 1, branch = 'TP.HCM', address, contact, phone } = req.body;
      if (!date || !slot) {
        return res.status(400).json({ error: 'INVALID_DATA', message: 'Ngày và khung giờ lấy hàng là bắt buộc' });
      }

      const booking = await repo.create({
        date,
        slot,
        pcs: Number(pcs) || 1,
        branch,
        address,
        contact,
        phone
      });

      return res.status(201).json({ success: true, message: 'Đã đặt lịch pickup thành công', data: booking });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
    }
  });

  return router;
}
