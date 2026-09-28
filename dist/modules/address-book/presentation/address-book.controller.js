import { Router } from 'express';
import { COUNTRY_FLAGS } from '../domain/address.types.js';
export function createAddressBookRouter(repo) {
    const router = Router();
    // GET /addresses/senders - Danh sách hồ sơ người gửi
    router.get('/senders', async (_req, res) => {
        const list = await repo.getAllSenders();
        res.json({ success: true, count: list.length, data: list });
    });
    // GET /addresses/receivers - Sổ địa chỉ người nhận
    router.get('/receivers', async (req, res) => {
        const q = req.query.q;
        const list = await repo.getAllReceivers(q);
        res.json({ success: true, count: list.length, data: list });
    });
    // POST /addresses/receivers - Lưu hoặc cập nhật người nhận
    router.post('/receivers', async (req, res) => {
        try {
            const body = req.body;
            if (!body.n || !body.contact) {
                return res.status(400).json({ error: 'INVALID_DATA', message: 'Tên công ty và người liên hệ là bắt buộc.' });
            }
            const saved = await repo.saveReceiver(body);
            return res.status(201).json({ success: true, message: 'Đã lưu sổ địa chỉ', data: saved });
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            return res.status(500).json({ error: 'INTERNAL_ERROR', message: msg });
        }
    });
    // DELETE /addresses/receivers/:id - Xóa người nhận
    router.delete('/receivers/:id', async (req, res) => {
        const deleted = await repo.deleteReceiver(String(req.params.id));
        if (!deleted) {
            return res.status(404).json({ error: 'NOT_FOUND', message: 'Không tìm thấy địa chỉ' });
        }
        return res.json({ success: true, message: 'Đã xóa người nhận khỏi sổ địa chỉ' });
    });
    // GET /addresses/flags - Danh sách cờ quốc gia
    router.get('/flags', (_req, res) => {
        res.json({ success: true, data: COUNTRY_FLAGS });
    });
    return router;
}
//# sourceMappingURL=address-book.controller.js.map