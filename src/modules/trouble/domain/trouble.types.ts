export type TroublePriority = 'low' | 'mid' | 'high';
export type TroubleStatus = 'new' | 'doing' | 'waitc' | 'done';

export interface TroubleTicketProps {
  id: string; // e.g. TRB-1024
  bill: string;
  cnee: string;
  ct: string;
  type: string;
  lv: TroublePriority;
  desc: string;
  req: string;
  contact: string;
  date: string;
  status: TroubleStatus;
  reply?: string;
}

export const TROUBLE_TYPES = [
  'Giao chậm / trễ hẹn',
  'Thất lạc kiện hàng',
  'Hư hỏng / vỡ hàng',
  'Thiếu hàng trong kiện',
  'Sai thông tin người nhận',
  'Phát sai địa chỉ',
  'Vấn đề phụ phí / cước',
  'Yêu cầu giữ / đổi địa chỉ',
  'Khác'
];

export const TROUBLE_PRIORITIES: Record<TroublePriority, { badgeClass: string; label: string }> = {
  low: { badgeClass: 'b-lo', label: 'Thường' },
  mid: { badgeClass: 'b-mid', label: 'Gấp' },
  high: { badgeClass: 'b-hi', label: 'Rất gấp' }
};

export const TROUBLE_STATUSES: Record<TroubleStatus, { badgeClass: string; label: string }> = {
  new: { badgeClass: 'b-wait', label: 'Mới' },
  doing: { badgeClass: 'b-fly', label: 'Đang xử lý' },
  waitc: { badgeClass: 'b-nd', label: 'Chờ khách phản hồi' },
  done: { badgeClass: 'b-ok', label: 'Đã xử lý' }
};
