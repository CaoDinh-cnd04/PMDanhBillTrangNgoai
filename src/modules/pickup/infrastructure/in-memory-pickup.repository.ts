import { PickupBookingProps } from '../domain/pickup.types.js';

const SEED_PICKUPS: PickupBookingProps[] = [
  { id: 'pk-1', date: '08/09/2026', slot: '13:00 – 17:00', pcs: 3, st: 'ok', stx: 'Đã lấy hàng', branch: 'TP.HCM' },
  { id: 'pk-2', date: '10/09/2026', slot: '09:00 – 12:00', pcs: 1, st: 'wait', stx: 'Chờ xác nhận', branch: 'Hà Nội' }
];

export class PickupRepository {
  private bookings: PickupBookingProps[] = [];

  constructor() {
    this.bookings = [...SEED_PICKUPS];
  }

  async getAll(): Promise<PickupBookingProps[]> {
    return [...this.bookings];
  }

  async create(props: Omit<PickupBookingProps, 'id' | 'st' | 'stx'>): Promise<PickupBookingProps> {
    const newBooking: PickupBookingProps = {
      ...props,
      id: 'pk-' + Date.now(),
      st: 'wait',
      stx: 'Chờ xác nhận'
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }
}
