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
export const TROUBLE_PRIORITIES = {
    low: { badgeClass: 'b-lo', label: 'Thường' },
    mid: { badgeClass: 'b-mid', label: 'Gấp' },
    high: { badgeClass: 'b-hi', label: 'Rất gấp' }
};
export const TROUBLE_STATUSES = {
    new: { badgeClass: 'b-wait', label: 'Mới' },
    doing: { badgeClass: 'b-fly', label: 'Đang xử lý' },
    waitc: { badgeClass: 'b-nd', label: 'Chờ khách phản hồi' },
    done: { badgeClass: 'b-ok', label: 'Đã xử lý' }
};
//# sourceMappingURL=trouble.types.js.map