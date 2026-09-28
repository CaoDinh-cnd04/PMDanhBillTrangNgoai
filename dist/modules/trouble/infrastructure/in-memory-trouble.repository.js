const SEED_TROUBLES = [
    {
        id: 'TRB-1024',
        bill: '6155755',
        cnee: 'Rachael Lee',
        ct: 'Singapore',
        type: 'Giao chậm / trễ hẹn',
        lv: 'mid',
        desc: 'Đơn quá 3 ngày chưa phát, khách hối gấp.',
        req: 'Nguyễn Văn A',
        contact: '0901 234 567',
        date: '09/09/2026 08:20',
        status: 'doing',
        reply: 'CS Việt An: Đang liên hệ hãng bay kiểm tra hành trình, sẽ cập nhật trong hôm nay. Cảm ơn Quý khách.'
    }
];
export class TroubleRepository {
    tickets = [];
    seq = 1025;
    constructor() {
        this.tickets = [...SEED_TROUBLES];
    }
    async getAll() {
        return [...this.tickets];
    }
    async findById(id) {
        return this.tickets.find(t => t.id === id) || null;
    }
    async create(props) {
        const id = props.id || `TRB-${this.seq++}`;
        const newTicket = {
            ...props,
            id,
            status: 'new'
        };
        this.tickets.unshift(newTicket);
        return newTicket;
    }
    async replyTicket(id, reply, newStatus) {
        const ticket = this.tickets.find(t => t.id === id);
        if (!ticket)
            return null;
        ticket.reply = reply;
        if (newStatus)
            ticket.status = newStatus;
        return ticket;
    }
    async getPendingCount() {
        return this.tickets.filter(t => t.status !== 'done').length;
    }
}
//# sourceMappingURL=in-memory-trouble.repository.js.map