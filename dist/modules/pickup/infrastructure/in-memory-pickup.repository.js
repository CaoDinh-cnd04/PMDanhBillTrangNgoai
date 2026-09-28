const SEED_PICKUPS = [
    { id: 'pk-1', date: '08/09/2026', slot: '13:00 – 17:00', pcs: 3, st: 'ok', stx: 'Đã lấy hàng', branch: 'TP.HCM' },
    { id: 'pk-2', date: '10/09/2026', slot: '09:00 – 12:00', pcs: 1, st: 'wait', stx: 'Chờ xác nhận', branch: 'Hà Nội' }
];
export class PickupRepository {
    bookings = [];
    constructor() {
        this.bookings = [...SEED_PICKUPS];
    }
    async getAll() {
        return [...this.bookings];
    }
    async create(props) {
        const newBooking = {
            ...props,
            id: 'pk-' + Date.now(),
            st: 'wait',
            stx: 'Chờ xác nhận'
        };
        this.bookings.unshift(newBooking);
        return newBooking;
    }
}
//# sourceMappingURL=in-memory-pickup.repository.js.map