import { Router } from 'express';
export function createTroubleRouter(repo) {
    const router = Router();
    // GET /troubles - Danh sách sự cố
    router.get('/troubles', async (_req, res) => {
        const list = await repo.getAll();
        res.json({ success: true, count: list.length, data: list });
    });
    // GET /troubles/:id - Chi tiết 1 sự cố
    router.get('/troubles/:id', async (req, res) => {
        const ticket = await repo.findById(String(req.params.id));
        if (!ticket) {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy sự cố' });
        }
        return res.json({ success: true, data: ticket });
    });
    // POST /troubles - Báo cáo sự cố mới
    router.post('/troubles', async (req, res) => {
        try {
            const { bill, cnee, ct, type, lv = 'mid', desc, req: requester, contact } = req.body;
            if (!bill || !desc) {
                return res.status(400).json({ error: 'INVALID_DATA', message: 'Mã vận đơn và mô tả chi tiết là bắt buộc.' });
            }
            const ticket = await repo.create({
                bill,
                cnee: cnee || '—',
                ct: ct || '—',
                type: type || 'Khác',
                lv: lv || 'mid',
                desc,
                req: requester || 'Khách hàng',
                contact: contact || '',
                date: new Date().toLocaleString('vi-VN')
            });
            return res.status(201).json({ success: true, message: 'Đã gửi báo cáo sự cố thành công', data: ticket });
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
        }
    });
    // POST /troubles/:id/reply - Trả lời / cập nhật trạng thái sự cố
    router.post('/troubles/:id/reply', async (req, res) => {
        const { reply, status } = req.body;
        const ticket = await repo.replyTicket(String(req.params.id), reply, status);
        if (!ticket) {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy sự cố' });
        }
        return res.json({ success: true, message: 'Đã cập nhật phản hồi sự cố', data: ticket });
    });
    return router;
}
//# sourceMappingURL=trouble.controller.js.map