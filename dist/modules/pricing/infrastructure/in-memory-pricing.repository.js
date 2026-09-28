import { WEIGHT_STEPS } from '../domain/pricing.types.js';
const DEFAULT_SEEDS = [
    {
        name: 'DHL', account: 'DHL Express', fsc: 0.28, vat: 0.08, ms: 120, mw: 30, fee: 500000, dz: 4, eta: '2–4 ngày',
        z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 },
        base: { 1: 180000, 2: 230000, 3: 290000, 4: 360000, 5: 440000 },
        step: { 1: 70000, 2: 95000, 3: 125000, 4: 160000, 5: 200000 }
    },
    {
        name: 'Fedex', account: 'FedEx IP', fsc: 0.27, vat: 0.08, ms: 121, mw: 30, fee: 500000, dz: 4, eta: '2–4 ngày',
        z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 },
        base: { 1: 185000, 2: 235000, 3: 300000, 4: 365000, 5: 450000 },
        step: { 1: 72000, 2: 96000, 3: 128000, 4: 162000, 5: 205000 }
    },
    {
        name: 'UPS', account: 'UPS Worldwide', fsc: 0.29, vat: 0.08, ms: 122, mw: 30, fee: 520000, dz: 4, eta: '2–5 ngày',
        z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 3, 'United States': 5, Canada: 5, Belgium: 4, 'United Arab Emirates': 4, Mexico: 5 },
        base: { 1: 190000, 2: 240000, 3: 295000, 4: 370000, 5: 460000 },
        step: { 1: 74000, 2: 98000, 3: 126000, 4: 165000, 5: 208000 }
    },
    {
        name: 'Aramex', account: 'Aramex', fsc: 0.22, vat: 0.08, ms: 120, mw: 30, fee: 450000, dz: 3, eta: '3–6 ngày',
        z: { 'United Arab Emirates': 1, Singapore: 2, Malaysia: 2, China: 2, Taiwan: 2, Belgium: 3, Australia: 3, 'United States': 4, Canada: 4, Mexico: 4 },
        base: { 1: 150000, 2: 210000, 3: 320000, 4: 420000 },
        step: { 1: 60000, 2: 85000, 3: 120000, 4: 160000 }
    },
    {
        name: 'Chuyên tuyến', account: 'Chuyên tuyến US', fsc: 0.10, vat: 0.08, ms: 150, mw: 45, fee: 350000, dz: 3, eta: '4–8 ngày',
        z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 2, Belgium: 3, 'United States': 3, Canada: 3, 'United Arab Emirates': 3, Mexico: 3 },
        base: { 1: 140000, 2: 190000, 3: 250000 },
        step: { 1: 55000, 2: 80000, 3: 110000 }
    },
    {
        name: 'SEA', account: 'Sea freight', fsc: 0.05, vat: 0.08, ms: 300, mw: 1000, fee: 0, dz: 3, eta: '20–40 ngày',
        z: { Singapore: 1, Malaysia: 1, China: 1, Taiwan: 1, Australia: 2, Belgium: 3, 'United States': 3, Canada: 3, 'United Arab Emirates': 3, Mexico: 3 },
        base: { 1: 90000, 2: 120000, 3: 160000 },
        step: { 1: 22000, 2: 30000, 3: 42000 }
    }
];
export class PricingRepository {
    services = new Map();
    constructor() {
        this.seed();
    }
    slugify(name) {
        return name
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || ('svc-' + Date.now());
    }
    buildService(sd) {
        const zoneNumbers = Object.keys(sd.base).map(Number).sort((a, b) => a - b);
        const price = {};
        const over70 = {};
        for (const z of zoneNumbers) {
            price[z] = WEIGHT_STEPS.map((_, i) => sd.base[z] + (sd.step[z] || 0) * i);
            over70[z] = (sd.step[z] || 0) * 2;
        }
        const sur = [];
        if (sd.fee > 0) {
            sur.push({ wFrom: sd.mw, wTo: '', dFrom: '', dTo: '', gFrom: '', gTo: '', fee: sd.fee });
            sur.push({ wFrom: '', wTo: '', dFrom: sd.ms, dTo: '', gFrom: '', gTo: '', fee: sd.fee });
        }
        return {
            id: this.slugify(sd.name),
            name: sd.name,
            account: sd.account,
            fsc: sd.fsc,
            vat: sd.vat,
            eta: sd.eta,
            effFrom: '2026-01-01',
            effTo: '2026-12-31',
            zones: zoneNumbers.map(z => `Zone ${z}`),
            zmap: { ...sd.z },
            dz: sd.dz || zoneNumbers[0],
            price,
            over70,
            sur
        };
    }
    seed() {
        this.services.clear();
        for (const s of DEFAULT_SEEDS) {
            const svc = this.buildService(s);
            this.services.set(svc.id, svc);
        }
    }
    async getAllServices() {
        return Array.from(this.services.values());
    }
    async getServiceById(id) {
        return this.services.get(id) || null;
    }
    async saveService(service) {
        this.services.set(service.id, service);
    }
    async deleteService(id) {
        return this.services.delete(id);
    }
    calculateGirthA(d, w, h) {
        const s = [d, w, h].sort((a, b) => b - a);
        return s[0] + (s[1] + s[2]) * 2;
    }
    getFareAt(service, zone, chargeableKg) {
        const arr = service.price[zone] || service.price[service.dz] || [];
        if (chargeableKg <= 70) {
            const index = Math.max(0, Math.round(chargeableKg / 0.5) - 1);
            return arr[Math.min(index, arr.length - 1)] || 0;
        }
        const unitPrice = service.over70[zone] || service.over70[service.dz] || 0;
        return unitPrice * chargeableKg;
    }
    async calculateQuotes(req) {
        const { country, grossWeight, length = 0, width = 0, height = 0, type } = req;
        const services = Array.from(this.services.values());
        const volWeight = (type === 'PACK') ? +((length * width * height) / 5000).toFixed(2) : 0;
        const chargeable = Math.max(grossWeight, volWeight);
        const cr = Math.max(0.5, Math.ceil(chargeable / 0.5) * 0.5);
        const longest = Math.max(length, width, height);
        const girthA = (type === 'PACK') ? this.calculateGirthA(length, width, height) : 0;
        const quotes = [];
        const lo = (v) => (v === '' || v === undefined || isNaN(+v)) ? 0 : +v;
        const hi = (v) => (v === '' || v === undefined || isNaN(+v)) ? 1e9 : +v;
        for (const s of services) {
            const zone = s.zmap[country] || s.dz;
            const baseFare = this.getFareAt(s, zone, cr);
            const fscFee = baseFare * s.fsc;
            let surcharges = 0;
            if (type === 'PACK' && s.sur) {
                for (const r of s.sur) {
                    const inW = grossWeight >= lo(r.wFrom) && grossWeight <= hi(r.wTo);
                    const inD = longest >= lo(r.dFrom) && longest <= hi(r.dTo);
                    const inG = girthA >= lo(r.gFrom) && girthA <= hi(r.gTo);
                    if (inW && inD && inG) {
                        surcharges = Math.max(surcharges, +r.fee || 0);
                    }
                }
            }
            const vatBase = baseFare + fscFee + surcharges;
            const vatFee = vatBase * s.vat;
            const totalFare = Math.round(vatBase + vatFee);
            quotes.push({
                name: s.name,
                zone,
                chargeableWeight: cr,
                volumetricWeight: volWeight,
                baseFare: Math.round(baseFare),
                fscFee: Math.round(fscFee),
                surcharges: Math.round(surcharges),
                hasSurcharge: surcharges > 0,
                vatFee: Math.round(vatFee),
                totalFare,
                eta: s.eta
            });
        }
        if (quotes.length > 0) {
            const minTotal = Math.min(...quotes.map(q => q.totalFare));
            for (const q of quotes) {
                if (q.totalFare === minTotal) {
                    q.isCheapest = true;
                    break;
                }
            }
        }
        return quotes.sort((a, b) => a.totalFare - b.totalFare);
    }
}
//# sourceMappingURL=in-memory-pricing.repository.js.map