import { Router } from 'express';
export function createEcomRouter(repo) {
    const router = Router();
    // GET /ecom/orders - Lấy danh sách đơn e-commerce (có lọc theo sàn & tìm kiếm)
    router.get('/orders', async (req, res) => {
        const src = req.query.src;
        const q = req.query.q;
        const orders = await repo.getAllOrders(src, q);
        res.json({ success: true, count: orders.length, data: orders });
    });
    // POST /ecom/manual - Tạo đơn lẻ thủ công
    router.post('/manual', async (req, res) => {
        try {
            const { ref, cnee, ct, kg = 0.5, products = [] } = req.body;
            if (!cnee || !ct) {
                return res.status(400).json({ error: 'INVALID_DATA', message: 'Tên người nhận và quốc gia đến là bắt buộc' });
            }
            const bill = repo.getNextBill();
            const newOrder = await repo.createOrder({
                id: 'ec-' + Date.now(),
                src: 'manual',
                ref: ref || 'MN-' + Date.now().toString().slice(-6),
                bill,
                cnee,
                ct,
                items: Array.isArray(products) && products.length > 0 ? products.length : 1,
                kg: Number(kg) || 0,
                st: Number(kg) > 0 ? 'created' : 'weighing',
                products,
                createdAt: new Date().toLocaleDateString('vi-VN')
            });
            return res.status(201).json({ success: true, message: 'Đã tạo đơn e-commerce thành công', data: newOrder });
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            return res.status(500).json({ error: 'CREATION_FAILED', message: msg });
        }
    });
    // POST /ecom/import-csv - Upload & parse CSV đơn hàng theo mẫu 70 cột
    router.post('/import-csv', async (req, res) => {
        try {
            const csvData = req.body.csv;
            if (!csvData) {
                return res.status(400).json({ error: 'MISSING_CSV', message: 'Vui lòng cung cấp nội dung file CSV qua trường csv.' });
            }
            const result = await repo.parseAndImportCsv(csvData);
            return res.json({
                success: true,
                message: `Đã import thành công ${result.importedCount} đơn hàng e-commerce.`,
                importedCount: result.importedCount,
                errors: result.errors
            });
        }
        catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            return res.status(500).json({ error: 'IMPORT_FAILED', message: msg });
        }
    });
    // POST /ecom/webhook/:platform - Webhook nhận đơn từ TikTok Shop, Shopify, Shopee
    router.post('/webhook/:platform', async (req, res) => {
        const platform = req.params.platform;
        const payload = req.body;
        const bill = repo.getNextBill();
        const order = await repo.createOrder({
            id: 'ec-' + Date.now(),
            src: platform,
            ref: payload.order_id || payload.ref || `${platform.toUpperCase()}-${Date.now().toString().slice(-6)}`,
            bill,
            cnee: payload.customer_name || payload.cnee || 'Ecom Customer',
            ct: payload.destination_country || payload.ct || 'United States',
            items: payload.items?.length || 1,
            kg: payload.weight_kg || 0.8,
            st: 'created',
            note: `Webhook push từ ${platform}`,
            createdAt: new Date().toLocaleDateString('vi-VN')
        });
        return res.status(200).json({
            success: true,
            message: `Webhook received for platform ${platform}`,
            bill: order.bill,
            ref: order.ref
        });
    });
    return router;
}
//# sourceMappingURL=ecommerce.controller.js.map