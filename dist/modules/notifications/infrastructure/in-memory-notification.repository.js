const SEED_NOTIS = [
    {
        id: 1,
        imp: true,
        unread: true,
        title: 'Lịch nghỉ lễ Quốc Khánh 2/9 & lịch cut-off',
        date: '28/08/2026',
        body: 'Việt An Express thông báo lịch cut-off dịp lễ 2/9 cho tuyến Singapore (DHL Sin, Fedex Sin, UPS Sin, Chuyên tuyến Sin):\n\n• Hàng có phụ thu (phí hải quan): cut-off 14:00 thứ Sáu 28/08.\n• Hàng thông thường: cut-off 11:30 thứ Bảy 29/08.\n\nCác đơn đến sau mốc trên sẽ bay chuyến sớm nhất sau lễ (dự kiến 03/09). Vui lòng chủ động gửi hàng đúng giờ.'
    },
    {
        id: 2,
        imp: true,
        unread: true,
        title: 'US CPSC — yêu cầu e-Filing mới từ 08/07/2026',
        date: '07/07/2026',
        body: 'Từ 08/07/2026, việc nộp hồ sơ điện tử (e-Filing) trở thành bắt buộc với hàng đi US, và áp dụng ngưỡng miễn thuế EU De Minimis với hàng đi EU qua Fedex. Quý khách vui lòng khai đầy đủ HS code & giá trị hàng để tránh giữ hàng tại hải quan.'
    },
    {
        id: 3,
        imp: false,
        unread: false,
        title: 'Cập nhật phụ phí xăng dầu tháng 9/2026',
        date: '01/09/2026',
        body: 'Phụ phí nhiên liệu (fuel surcharge) các hãng DHL/Fedex/UPS điều chỉnh áp dụng từ 01/09/2026. Xem chi tiết trong mục Hỗ trợ.'
    },
    {
        id: 4,
        imp: false,
        unread: false,
        title: 'Bảo trì hệ thống 15/09 (22:00–24:00)',
        date: '10/09/2026',
        body: 'Hệ thống sẽ bảo trì nâng cấp từ 22:00 đến 24:00 ngày 15/09/2026. Trong thời gian này việc tạo đơn có thể gián đoạn. Mong Quý khách thông cảm.'
    }
];
export class NotificationRepository {
    notifications = [];
    constructor() {
        this.notifications = [...SEED_NOTIS];
    }
    async getAll() {
        return [...this.notifications];
    }
    async markAsRead(id) {
        const item = this.notifications.find(n => n.id === id || String(n.id) === String(id));
        if (!item)
            return false;
        item.unread = false;
        return true;
    }
    async markAllRead() {
        this.notifications.forEach(n => {
            n.unread = false;
        });
    }
    async getUnreadCount() {
        return this.notifications.filter(n => n.unread).length;
    }
}
//# sourceMappingURL=in-memory-notification.repository.js.map