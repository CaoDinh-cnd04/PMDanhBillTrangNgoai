import { SystemNotification } from '../domain/notification.types.js';
export declare class NotificationRepository {
    private notifications;
    constructor();
    getAll(): Promise<SystemNotification[]>;
    markAsRead(id: number | string): Promise<boolean>;
    markAllRead(): Promise<void>;
    getUnreadCount(): Promise<number>;
}
