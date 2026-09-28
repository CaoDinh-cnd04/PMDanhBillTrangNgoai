export type PickupStatus = 'wait' | 'ok';

export interface PickupBookingProps {
  id: string;
  date: string;
  slot: string; // '09:00 – 12:00' | '13:00 – 17:00'
  pcs: number;
  st: PickupStatus;
  stx: string;
  branch?: string;
  address?: string;
  contact?: string;
  phone?: string;
}

export const PICKUP_STATUSES: Record<PickupStatus, { badgeClass: string; label: string }> = {
  ok: { badgeClass: 'b-ok', label: 'Đã lấy hàng' },
  wait: { badgeClass: 'b-wait', label: 'Chờ xác nhận' }
};
