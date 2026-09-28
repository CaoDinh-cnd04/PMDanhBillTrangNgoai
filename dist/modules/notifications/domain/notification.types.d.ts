export interface SystemNotification {
    id: number | string;
    imp: boolean;
    unread: boolean;
    title: string;
    date: string;
    body: string;
}
