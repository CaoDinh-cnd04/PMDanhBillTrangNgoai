import { parse } from 'csv-parse/sync';
const SEED_ECOM = [
    { id: 'ec-1', src: 'tiktok', ref: 'TT-88213', bill: '6156991', cnee: 'Emma W.', ct: 'Singapore', items: 3, kg: 1.2, st: 'created', note: '', createdAt: '09/09/2026' },
    { id: 'ec-2', src: 'shopify', ref: '#1042', bill: '6156990', cnee: 'John Lee', ct: 'Australia', items: 2, kg: 0.8, st: 'picked_up', note: '', createdAt: '09/09/2026' },
    { id: 'ec-3', src: 'excel', ref: 'ORD-501', bill: '6156989', cnee: 'Marie Curie', ct: 'Belgium', items: 1, kg: 0.5, st: 'created', note: '', createdAt: '09/09/2026' },
    { id: 'ec-4', src: 'api', ref: 'A-77120', bill: '6156988', cnee: 'Tanaka K.', ct: 'United States', items: 4, kg: 2.1, st: 'departed', note: '', createdAt: '08/09/2026' },
    { id: 'ec-5', src: 'shopee', ref: 'SP-3391', bill: '', cnee: 'Nguyen T.', ct: 'Malaysia', items: 2, kg: 0, st: 'exception', note: 'Thiếu HS code', createdAt: '08/09/2026' },
    { id: 'ec-6', src: 'manual', ref: 'TT-90011', bill: '6156987', cnee: 'David C.', ct: 'Canada', items: 1, kg: 0.3, st: 'delivered', note: '', createdAt: '07/09/2026' },
    { id: 'ec-7', src: 'lazada', ref: 'LZ-2201', bill: '6156986', cnee: 'Siti R.', ct: 'Singapore', items: 2, kg: 0, st: 'weighing', note: 'Chờ VA cân đo', createdAt: '07/09/2026' },
    { id: 'ec-8', src: 'tiktok', ref: 'TT-88190', bill: '6156985', cnee: 'Chen W.', ct: 'China', items: 5, kg: 3.4, st: 'created', note: '', createdAt: '06/09/2026' }
];
export class EcomRepository {
    orders = [];
    billCounter = 6156992;
    constructor() {
        this.orders = [...SEED_ECOM];
    }
    getNextBill() {
        return String(this.billCounter++);
    }
    async getAllOrders(sourceFilter, search) {
        let result = [...this.orders];
        if (sourceFilter && sourceFilter !== 'all') {
            result = result.filter(o => o.src === sourceFilter);
        }
        if (search && search.trim()) {
            const q = search.toLowerCase().trim();
            result = result.filter(o => (o.ref + o.bill + o.cnee + o.ct + (o.note || '')).toLowerCase().includes(q));
        }
        return result;
    }
    async createOrder(props) {
        this.orders.unshift(props);
        return props;
    }
    async parseAndImportCsv(csvContent) {
        const errors = [];
        let records = [];
        try {
            records = parse(csvContent, {
                columns: true,
                skip_empty_lines: true,
                trim: true
            });
        }
        catch (e) {
            const err = e instanceof Error ? e.message : String(e);
            return { importedCount: 0, errors: [`Lỗi cú pháp CSV: ${err}`] };
        }
        let count = 0;
        for (let i = 0; i < records.length; i++) {
            const row = records[i];
            const ref = row.CustomerOrderNo || `CSV-ORD-${Date.now()}-${i + 1}`;
            const cnee = row.Name || row.Company || 'Khách nhận';
            const ct = row.CountryCode || 'US';
            const weight = parseFloat(row.PackageWeight || '0') || 0.5;
            const platform = (row.EcommercePlatformCode || 'excel').toLowerCase();
            const validSrc = ['tiktok', 'shopify', 'shopee', 'lazada', 'api', 'excel', 'manual'].includes(platform)
                ? platform
                : 'excel';
            const bill = this.getNextBill();
            const newOrder = {
                id: 'ec-' + Date.now() + '-' + i,
                src: validSrc,
                ref,
                bill,
                cnee,
                ct,
                items: 1,
                kg: weight,
                st: weight > 0 ? 'created' : 'weighing',
                note: row.ItemDescription1 ? `SP: ${row.ItemDescription1}` : '',
                createdAt: new Date().toLocaleDateString('vi-VN')
            };
            this.orders.unshift(newOrder);
            count++;
        }
        return { importedCount: count, errors };
    }
}
//# sourceMappingURL=in-memory-ecom.repository.js.map