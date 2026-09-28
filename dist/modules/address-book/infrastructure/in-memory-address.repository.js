const SEED_SENDERS = [
    { id: 'snd-1', n: 'Công ty TNHH ABC', d: '14 Sầm Sơn, Tân Sơn Nhất, TP.HCM', c: 'Nguyễn Văn A', t: '0901 234 567' },
    { id: 'snd-2', n: 'Kho Hà Nội - ABC', d: '88 Trần Duy Hưng, Cầu Giấy, Hà Nội', c: 'Trần Thị B', t: '0988 111 222' },
    { id: 'snd-3', n: 'Chi nhánh Cần Thơ', d: '12 Hòa Bình, Ninh Kiều, Cần Thơ', c: 'Lê Văn C', t: '0919 555 777' }
];
const SEED_RECEIVERS = [
    { id: 'rcv-1', n: 'LINEX CO. LTD', ct: 'Singapore', city: 'Singapore', postal: '238859', contact: 'Mr. Lim', tel: '+65 8123 4567', a1: '1 Raffles Place, #20-01', a2: 'Tower One', a3: '' },
    { id: 'rcv-2', n: 'NGUYEN DAI QUANG', ct: 'Belgium', city: 'Brussels', postal: '1000', contact: 'Quang Nguyen', tel: '+32 470 123 456', a1: 'Rue Neuve 12', a2: '1000 Brussels', a3: '' },
    { id: 'rcv-3', n: 'SIMON RUSSAK', ct: 'United States', city: 'New York', postal: '10016', contact: 'Simon Russak', tel: '+1 212 555 0100', a1: '340 5th Ave', a2: 'Manhattan, NY', a3: '' },
    { id: 'rcv-4', n: 'CJI-ARDYAN', ct: 'Singapore', city: 'Singapore', postal: '238866', contact: 'Ardyan', tel: '+65 9000 1122', a1: '200 Orchard Road', a2: '', a3: '' },
    { id: 'rcv-5', n: 'TERANA, S.A.', ct: 'Mexico', city: 'Mexico City', postal: '06600', contact: 'Teresa', tel: '+52 55 1234 5678', a1: 'Av. Reforma 100', a2: 'CDMX', a3: '' }
];
export class AddressBookRepository {
    senders = [];
    receivers = [];
    constructor() {
        this.senders = [...SEED_SENDERS];
        this.receivers = [...SEED_RECEIVERS];
    }
    async getAllSenders() {
        return [...this.senders];
    }
    async getAllReceivers(query) {
        if (!query || !query.trim())
            return [...this.receivers];
        const q = query.toLowerCase().trim();
        return this.receivers.filter(r => (r.n + r.contact + r.ct + r.city + r.tel).toLowerCase().includes(q));
    }
    async saveReceiver(entry) {
        if (entry.id) {
            const idx = this.receivers.findIndex(r => r.id === entry.id);
            if (idx >= 0) {
                this.receivers[idx] = { ...entry };
                return this.receivers[idx];
            }
        }
        const newEntry = {
            ...entry,
            id: 'rcv-' + Date.now()
        };
        this.receivers.unshift(newEntry);
        return newEntry;
    }
    async deleteReceiver(id) {
        const initialLen = this.receivers.length;
        this.receivers = this.receivers.filter(r => r.id !== id);
        return this.receivers.length < initialLen;
    }
}
//# sourceMappingURL=in-memory-address.repository.js.map