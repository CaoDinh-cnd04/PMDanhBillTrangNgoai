import { Router, Request, Response } from 'express';
import { PricingRepository } from '../infrastructure/in-memory-pricing.repository.js';
import { ShippingServiceProps } from '../domain/pricing.types.js';

export function createPricingRouter(repo: PricingRepository): Router {
  const router = Router();

  // POST /rates - Tra cứu báo giá theo đặc tả API
  router.post('/rates', async (req: Request, res: Response) => {
    try {
      const { country, weight, length, width, height, type = 'PACK' } = req.body;
      if (!country || weight === undefined) {
        return res.status(400).json({
          error: 'INVALID_REQUEST',
          message: 'Vui lòng cung cấp country và weight (cân nặng tính theo kg).'
        });
      }

      const quotes = await repo.calculateQuotes({
        country: String(country),
        grossWeight: Number(weight),
        length: length ? Number(length) : 0,
        width: width ? Number(width) : 0,
        height: height ? Number(height) : 0,
        type: type === 'DOC' ? 'DOC' : 'PACK'
      });

      return res.json({
        success: true,
        destination: country,
        grossWeight: weight,
        rates: quotes
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
    }
  });

  // GET /pricing/services - Danh sách các dịch vụ & bảng giá
  router.get('/services', async (_req: Request, res: Response) => {
    const list = await repo.getAllServices();
    res.json({ success: true, count: list.length, data: list });
  });

  // GET /pricing/services/:id - Chi tiết 1 dịch vụ
  router.get('/services/:id', async (req: Request, res: Response) => {
    const svc = await repo.getServiceById(String(req.params.id));
    if (!svc) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy dịch vụ' });
    }
    return res.json({ success: true, data: svc });
  });

  // POST /pricing/services - Lưu / cập nhật bảng giá dịch vụ
  router.post('/services', async (req: Request, res: Response) => {
    try {
      const body = req.body as ShippingServiceProps;
      if (!body.name) {
        return res.status(400).json({ error: 'INVALID_REQUEST', message: 'Tên dịch vụ không được để trống' });
      }
      await repo.saveService(body);
      return res.json({ success: true, message: 'Đã lưu cấu hình dịch vụ', data: body });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
    }
  });

  // DELETE /pricing/services/:id - Xóa dịch vụ
  router.delete('/services/:id', async (req: Request, res: Response) => {
    const deleted = await repo.deleteService(String(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Dịch vụ không tồn tại' });
    }
    return res.json({ success: true, message: 'Đã xóa dịch vụ thành công' });
  });

  // POST /pricing/reset - Khôi phục biểu giá gốc demo
  router.post('/reset', async (_req: Request, res: Response) => {
    repo.seed();
    res.json({ success: true, message: 'Đã khôi phục các biểu giá demo' });
  });

  return router;
}
