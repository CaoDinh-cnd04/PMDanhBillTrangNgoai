const SEED_ORDERS = [
    {
        id: 'ord-8', seq: 8, bill: '6156979', connect: '', ref: 'PO-A100', cnee: 'LINEX CO. LTD',
        ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '09/09/2026 09:12',
        sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 8.0 kg', content: 'CONSOL', track: '—', pod: null, photos: 2, isLocked: true
    },
    {
        id: 'ord-7', seq: 7, bill: '6156829', connect: '', ref: '', cnee: 'NGUYEN DAI QUANG',
        ct: 'Belgium', route: 'Chuyên tuyến - EU', branch: 'Hà Nội', created: '09/09/2026 08:50',
        sent: '', type: 'PACK', st: 'wait', pcs: '1 kiện · 13.5 kg', content: 'THỰC PHẨM', track: '—', pod: null, photos: 1, isLocked: true
    },
    {
        id: 'ord-6', seq: 6, bill: '6156540', connect: 'TollVIP-AU-33912', ref: 'PO-778', cnee: 'XIEU BINH THAI',
        ct: 'Australia', route: 'Chuyên tuyến - AU_Toll Vip', branch: 'Huế', created: '08/09/2026 14:02',
        sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 5.0 kg', content: 'AO DAI (100% COTTON)', track: '6156540', pod: null, photos: 2, isLocked: true
    },
    {
        id: 'ord-5', seq: 5, bill: '6156452', connect: '1Z9A8X0312', ref: '', cnee: 'SIMON RUSSAK',
        ct: 'United States', route: 'DHL - Singapore', branch: 'TP.HCM', created: '08/09/2026 13:30',
        sent: '08/09/2026', type: 'PACK', st: 'fly', pcs: '1 kiện · 0.5 kg', content: 'Stainless steel bracelet', track: '8371739935', pod: null, photos: 3, isLocked: true
    },
    {
        id: 'ord-4', seq: 4, bill: '6155755', connect: '6155755SG', ref: 'PO-551', cnee: 'Rachael Lee',
        ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Bảo Lộc', created: '08/09/2026 10:11',
        sent: '08/09/2026', type: 'PACK', st: 'nd', pcs: '7 kiện · 164.5 kg', content: "WOMEN'S FLOWER DRESS", track: '6155755', pod: null, photos: 2, isLocked: true
    },
    {
        id: 'ord-3', seq: 3, bill: '6154952', connect: '6154952SG', ref: '', cnee: 'LINEX CO. LTD',
        ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'TP.HCM', created: '05/09/2026 09:20',
        sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '1 kiện · 6.0 kg', content: 'CONSOL', track: '6154952',
        pod: { date: '05/09/2026', time: '16:40', signer: 'LIM C.S.' }, photos: 1, isLocked: true
    },
    {
        id: 'ord-2', seq: 2, bill: '6154891', connect: '6154891SG', ref: 'PO-330', cnee: 'CJI-ARDYAN',
        ct: 'Singapore', route: 'Chuyên tuyến - Singapore', branch: 'Cần Thơ', created: '05/09/2026 08:40',
        sent: '05/09/2026', type: 'PACK', st: 'ok', pcs: '3 kiện · 39.0 kg', content: 'FALSE EYELASHES', track: '6154891',
        pod: { date: '05/09/2026', time: '15:05', signer: 'ARDYAN' }, photos: 2, isLocked: true
    },
    {
        id: 'ord-1', seq: 1, bill: '6155057', connect: 'DHL-VN-8726187061', ref: '', cnee: 'TERANA, S.A.',
        ct: 'Mexico', route: 'DHL - VN', branch: 'Hà Nội', created: '02/09/2026 11:00',
        sent: '02/09/2026', type: 'DOC', st: 'late', pcs: '1 · 0.5 kg', content: 'Document', track: '8726187061', pod: null, photos: 1, isLocked: true
    }
];
const SEED_DRAFTS = [
    {
        id: 'd1', stt: 'draft', cnee: 'HOANG LE', ct: 'United States', service: 'KSN-SEA-USA-UPS',
        branch: 'TP.HCM', ref: 'PO-889', pcs: '2 kiện · 30.0 kg', content: 'HẠT SEN / HẠT BÍ', date: '09/09/2026 10:12'
    },
    {
        id: 'd2', stt: 'ready', cnee: 'Rachael Lee', ct: 'Singapore', service: 'Chuyên tuyến - Singapore',
        branch: 'Bảo Lộc', ref: 'PO-551', pcs: '1 kiện · 8.0 kg', content: 'Váy hoa nữ', date: '09/09/2026 09:40'
    }
];
export class OrderRepository {
    orders = [];
    drafts = [];
    billSequence = 6156980;
    seqCounter = 9;
    constructor() {
        this.orders = [...SEED_ORDERS];
        this.drafts = [...SEED_DRAFTS];
    }
    getNextBillCode() {
        return String(this.billSequence++);
    }
    getNextSeq() {
        return this.seqCounter++;
    }
    async getAllOrders() {
        return [...this.orders];
    }
    async findOrderByBillOrRef(billOrRef) {
        const target = billOrRef.toLowerCase();
        const order = this.orders.find(o => o.bill.toLowerCase() === target ||
            o.ref.toLowerCase() === target ||
            o.id.toLowerCase() === target);
        return order ? { ...order } : null;
    }
    async createOrder(order) {
        this.orders.unshift(order);
        return order;
    }
    async updateOrder(order) {
        const idx = this.orders.findIndex(o => o.bill === order.bill || o.id === order.id);
        if (idx >= 0) {
            this.orders[idx] = { ...order };
        }
    }
    async deleteOrder(billOrRef) {
        const initialLen = this.orders.length;
        this.orders = this.orders.filter(o => o.bill !== billOrRef && o.ref !== billOrRef);
        return this.orders.length < initialLen;
    }
    // --- Drafts operations ---
    async getAllDrafts() {
        return [...this.drafts];
    }
    async findDraftById(id) {
        const draft = this.drafts.find(d => d.id === id);
        return draft ? { ...draft } : null;
    }
    async saveDraft(draft) {
        const idx = this.drafts.findIndex(d => d.id === draft.id);
        if (idx >= 0) {
            this.drafts[idx] = { ...draft };
        }
        else {
            this.drafts.unshift(draft);
        }
        return draft;
    }
    async deleteDraft(id) {
        const initialLen = this.drafts.length;
        this.drafts = this.drafts.filter(d => d.id !== id);
        return this.drafts.length < initialLen;
    }
    /**
     * Print draft & convert to locked order with newly assigned bill code.
     */
    async printDraftAndLock(draftId) {
        const draftIndex = this.drafts.findIndex(d => d.id === draftId);
        if (draftIndex < 0) {
            throw new Error(`Không tìm thấy đơn nháp với ID: ${draftId}`);
        }
        const draft = this.drafts[draftIndex];
        const billCode = this.getNextBillCode();
        const newOrder = {
            id: 'ord-' + Date.now(),
            seq: this.getNextSeq(),
            bill: billCode,
            ref: draft.ref || '',
            connect: '',
            cnee: draft.cnee,
            ct: draft.ct,
            route: draft.service,
            branch: draft.branch || 'TP.HCM',
            created: draft.date,
            sent: '',
            type: 'PACK',
            st: 'wait',
            pcs: draft.pcs,
            content: draft.content,
            track: '—',
            pod: null,
            photos: 0,
            isLocked: true
        };
        // Remove from drafts and add to orders
        this.drafts.splice(draftIndex, 1);
        this.orders.unshift(newOrder);
        return { order: newOrder, billCode };
    }
    /**
     * Filter orders with pagination, search, status chips, branch chips, weight and date ranges.
     */
    async filterOrders(params) {
        const { query = '', status = 'all', branch = 'all', type = '', fromDate, toDate, weightFrom, weightTo, page = 1, pageSize = 20, sortBy = 'seq', sortDir = 'desc' } = params;
        const parseKg = (pcs) => {
            const m = pcs.match(/([\d.]+)\s*kg/i);
            return m ? parseFloat(m[1]) : 0;
        };
        const parseDateOnly = (s) => {
            const m = s.match(/(\d{2})\/(\d{2})\/(\d{4})/);
            return m ? `${m[3]}-${m[2]}-${m[1]}` : '';
        };
        const q = query.toLowerCase().trim();
        let filtered = this.orders.filter(o => {
            if (status !== 'all' && o.st !== status)
                return false;
            if (branch !== 'all' && o.branch !== branch)
                return false;
            if (type && o.type !== type)
                return false;
            if (q) {
                const text = `${o.bill} ${o.ref} ${o.cnee} ${o.ct} ${o.content} ${o.branch} ${o.connect || ''}`.toLowerCase();
                if (!text.includes(q))
                    return false;
            }
            if (fromDate) {
                const d = parseDateOnly(o.created);
                if (d && d < fromDate)
                    return false;
            }
            if (toDate) {
                const d = parseDateOnly(o.created);
                if (d && d > toDate)
                    return false;
            }
            const kg = parseKg(o.pcs);
            if (weightFrom !== undefined && !isNaN(weightFrom) && kg < weightFrom)
                return false;
            if (weightTo !== undefined && !isNaN(weightTo) && kg > weightTo)
                return false;
            return true;
        });
        // Sorting
        filtered.sort((a, b) => {
            let va = a[sortBy];
            let vb = b[sortBy];
            if (typeof va === 'string')
                va = va.toLowerCase();
            if (typeof vb === 'string')
                vb = vb.toLowerCase();
            const dir = sortDir === 'asc' ? 1 : -1;
            if (va == null || vb == null)
                return 0;
            return (va < vb ? -1 : va > vb ? 1 : 0) * dir;
        });
        const total = filtered.length;
        const totalPages = Math.max(1, Math.ceil(total / pageSize));
        const currentPage = Math.min(Math.max(1, page), totalPages);
        const items = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        return {
            items,
            total,
            page: currentPage,
            pageSize,
            totalPages
        };
    }
}
//# sourceMappingURL=in-memory-order.repository.js.map