import { TroubleTicketProps } from '../domain/trouble.types.js';

const SEED_TROUBLES: TroubleTicketProps[] = [
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
  private tickets: TroubleTicketProps[] = [];
  private seq = 1025;

  constructor() {
    this.tickets = [...SEED_TROUBLES];
  }

  async getAll(): Promise<TroubleTicketProps[]> {
    return [...this.tickets];
  }

  async findById(id: string): Promise<TroubleTicketProps | null> {
    return this.tickets.find(t => t.id === id) || null;
  }

  async create(props: Omit<TroubleTicketProps, 'id' | 'status'> & { id?: string }): Promise<TroubleTicketProps> {
    const id = props.id || `TRB-${this.seq++}`;
    const newTicket: TroubleTicketProps = {
      ...props,
      id,
      status: 'new'
    };
    this.tickets.unshift(newTicket);
    return newTicket;
  }

  async replyTicket(id: string, reply: string, newStatus?: TroubleTicketProps['status']): Promise<TroubleTicketProps | null> {
    const ticket = this.tickets.find(t => t.id === id);
    if (!ticket) return null;
    ticket.reply = reply;
    if (newStatus) ticket.status = newStatus;
    return ticket;
  }

  async getPendingCount(): Promise<number> {
    return this.tickets.filter(t => t.status !== 'done').length;
  }
}
