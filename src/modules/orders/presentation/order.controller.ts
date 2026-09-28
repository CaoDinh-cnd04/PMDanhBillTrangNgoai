import { Router, Request, Response } from 'express';
import { OrderRepository } from '../infrastructure/in-memory-order.repository.js';
import { OrderProps, DraftOrderProps } from '../domain/order.types.js';

export function createOrderRouter(repo: OrderRepository): Router {
  const router = Router();

  // GET /orders - Danh sách đơn hàng với bộ lọc & phân trang
  router.get('/orders', async (req: Request, res: Response) => {
    try {
      const {
        q,
        status,
        branch,
        type,
        fromDate,
        toDate,
        weightFrom,
        weightTo,
        page = '1',
        pageSize = '20',
        sortBy = 'seq',
        sortDir = 'desc'
      } = req.query;

      const result = await repo.filterOrders({
        query: q as string,
        status: status as string,
        branch: branch as string,
        type: type as string,
        fromDate: fromDate as string,
        toDate: toDate as string,
        weightFrom: weightFrom ? parseFloat(weightFrom as string) : undefined,
        weightTo: weightTo ? parseFloat(weightTo as string) : undefined,
        page: parseInt(page as string, 10),
        pageSize: parseInt(pageSize as string, 10),
        sortBy: sortBy as string,
        sortDir: sortDir === 'asc' ? 'asc' : 'desc'
      });

      return res.json({ success: true, ...result });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
    }
  });

  // GET /orders/:ref - Chi tiết 1 đơn hàng (qua bill code hoặc customer ref)
  router.get('/orders/:ref', async (req: Request, res: Response) => {
    const order = await repo.findOrderByBillOrRef(String(req.params.ref));
    if (!order) {
      return res.status(404).json({ error: 'ORDER_NOT_FOUND', message: 'Không tìm thấy đơn hàng' });
    }
    return res.json({ success: true, data: order });
  });

  // POST /orders - Tạo đơn hàng (Đặc tả API Việt An Express)
  router.post('/orders', async (req: Request, res: Response) => {
    try {
      const body = req.body;
      const bill = repo.getNextBillCode();
      const seq = repo.getNextSeq();

      const newOrder: OrderProps = {
        id: 'ord-' + Date.now(),
        seq,
        bill,
        ref: body.order_reference || body.ref || `REF-${Date.now().toString().slice(-6)}`,
        connect: body.connect || '',
        cnee: body.receiver?.company || body.receiver?.contact || body.cnee || '(Chưa đặt tên)',
        ct: body.receiver?.country || body.ct || 'Vietnam',
        route: body.service_code || body.route || 'Chuyên tuyến - Singapore',
        hub: body.hub || '',
        branch: body.branch || 'TP.HCM',
        created: new Date().toLocaleString('vi-VN'),
        sent: '',
        type: body.type || 'PACK',
        st: 'wait',
        pcs: body.pcs || `${body.packages?.length || 1} kiện · ${body.total_weight || 1.0} kg`,
        content: body.content || 'Hàng hóa E-commerce',
        track: bill,
        pod: null,
        photos: 0,
        sender: body.sender,
        receiver: body.receiver,
        packages: body.packages,
        invoice: body.invoice,
        addons: body.addons || [],
        isLocked: true
      };

      await repo.createOrder(newOrder);

      return res.status(201).json({
        success: true,
        message: 'Đơn hàng đã được tạo thành công và cấp mã vận đơn.',
        data: {
          bill: newOrder.bill,
          order_reference: newOrder.ref,
          status: newOrder.st,
          label_url: `/api/v1/orders/${newOrder.bill}/label?format=A6`,
          tracking_url: `https://vietanexpress.com.vn/track?id=${newOrder.bill}`
        }
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'CREATION_FAILED', message: msg });
    }
  });

  // POST /orders/batch - Tạo đơn hàng loạt
  router.post('/orders/batch', async (req: Request, res: Response) => {
    try {
      const orders = req.body.orders as Array<Record<string, unknown>>;
      if (!Array.isArray(orders) || orders.length === 0) {
        return res.status(400).json({ error: 'INVALID_BATCH', message: 'Danh sách đơn hàng không hợp lệ' });
      }

      const createdList: OrderProps[] = [];
      for (const item of orders) {
        const bill = repo.getNextBillCode();
        const seq = repo.getNextSeq();
        const o: OrderProps = {
          id: 'ord-' + Date.now() + Math.random().toString(36).slice(2, 6),
          seq,
          bill,
          ref: String(item.order_reference || item.ref || `ORD-${Date.now().toString().slice(-5)}`),
          cnee: String(item.cnee || (item.receiver as Record<string, string>)?.company || 'Receiver'),
          ct: String(item.ct || (item.receiver as Record<string, string>)?.country || 'US'),
          route: String(item.route || 'Chuyên tuyến - US'),
          branch: String(item.branch || 'TP.HCM'),
          created: new Date().toLocaleString('vi-VN'),
          type: 'PACK',
          st: 'wait',
          pcs: String(item.pcs || '1 kiện · 1.0 kg'),
          content: String(item.content || 'Ecom goods'),
          track: bill,
          pod: null,
          photos: 0,
          isLocked: true
        };
        await repo.createOrder(o);
        createdList.push(o);
      }

      return res.status(202).json({
        success: true,
        job_id: 'job-' + Date.now(),
        total_submitted: orders.length,
        total_created: createdList.length,
        orders: createdList.map(o => ({ bill: o.bill, ref: o.ref, status: o.st }))
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'BATCH_FAILED', message: msg });
    }
  });

  // GET /orders/:ref/label - Tải/xem nhãn in A6 / A4 / ZPL
  router.get('/orders/:ref/label', async (req: Request, res: Response) => {
    const order = await repo.findOrderByBillOrRef(String(req.params.ref));
    if (!order) {
      return res.status(404).json({ error: 'ORDER_NOT_FOUND', message: 'Không tìm thấy đơn hàng' });
    }
    const format = (req.query.format as string) || 'A6';
    return res.json({
      success: true,
      bill: order.bill,
      ref: order.ref,
      format,
      label_type: format === 'ZPL' ? 'text/plain' : 'application/pdf',
      data: `[MOCK_PRINT_LABEL_${format}_FOR_BILL_${order.bill}]`,
      instructions: `In tem nhãn kích thước chuẩn ${format}. Quý khách dán lên mặt phẳng của kiện hàng.`
    });
  });

  // DELETE /orders/:ref - Hủy đơn
  router.delete('/orders/:ref', async (req: Request, res: Response) => {
    const order = await repo.findOrderByBillOrRef(String(req.params.ref));
    if (!order) {
      return res.status(404).json({ error: 'ORDER_NOT_FOUND', message: 'Không tìm thấy đơn hàng' });
    }
    if (order.st !== 'wait') {
      return res.status(400).json({
        error: 'CANNOT_CANCEL',
        message: 'Đơn hàng đã được chuyển kho hoặc đã xuất bay, không thể hủy qua API.'
      });
    }
    await repo.deleteOrder(order.bill);
    return res.json({ success: true, message: `Đã hủy đơn hàng ${order.bill}` });
  });

  // --- DRAFTS ENDPOINTS ---

  // GET /drafts - Danh sách đơn nháp
  router.get('/drafts', async (_req: Request, res: Response) => {
    const drafts = await repo.getAllDrafts();
    return res.json({ success: true, count: drafts.length, data: drafts });
  });

  // POST /drafts - Lưu đơn nháp
  router.post('/drafts', async (req: Request, res: Response) => {
    try {
      const body = req.body as DraftOrderProps;
      const draft: DraftOrderProps = {
        id: body.id || 'd' + Date.now(),
        stt: body.stt || 'draft',
        cnee: body.cnee || '(Chưa đặt tên)',
        ct: body.ct || '—',
        service: body.service || '—',
        branch: body.branch || 'TP.HCM',
        ref: body.ref || '',
        pcs: body.pcs || '1 kiện',
        content: body.content || 'Hàng hóa',
        date: new Date().toLocaleString('vi-VN'),
        payload: body.payload || {}
      };
      const saved = await repo.saveDraft(draft);
      return res.status(201).json({ success: true, message: 'Đã lưu đơn nháp', data: saved });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
    }
  });

  // POST /drafts/:id/print - Cấp mã bill, in & chuyển sang đơn khóa
  router.post('/drafts/:id/print', async (req: Request, res: Response) => {
    try {
      const { order, billCode } = await repo.printDraftAndLock(String(req.params.id));
      return res.json({
        success: true,
        message: `Đã cấp mã bill ${billCode} và in. Đơn đã khóa và chuyển sang Đơn hàng của tôi.`,
        billCode,
        order
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return res.status(400).json({ error: 'PRINT_FAILED', message: msg });
    }
  });

  // DELETE /drafts/:id - Xóa đơn nháp
  router.delete('/drafts/:id', async (req: Request, res: Response) => {
    const deleted = await repo.deleteDraft(String(req.params.id));
    if (!deleted) {
      return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy đơn nháp' });
    }
    return res.json({ success: true, message: 'Đã xóa đơn nháp thành công' });
  });

  return router;
}
