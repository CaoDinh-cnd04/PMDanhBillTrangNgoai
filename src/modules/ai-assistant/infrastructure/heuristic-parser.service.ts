import { ParsedReceiverResult, AiRecognizedItem, AI_KNOWLEDGE_ITEMS } from '../domain/ai.types.js';
import { COUNTRY_FLAGS } from '../../address-book/domain/address.types.js';

export class HeuristicAiService {
  /**
   * Parse unformatted multiline receiver paste text into structured fields.
   */
  public parseReceiverText(rawText: string): ParsedReceiverResult {
    const raw = (rawText || '').trim();
    const result: ParsedReceiverResult = {
      country: '',
      company: '',
      contact: '',
      tel: '',
      email: '',
      tax: '',
      city: '',
      state: '',
      postal: '',
      addr1: '',
      addr2: '',
      addr3: '',
      confidence: 0,
      extractedFieldsCount: 0
    };

    if (!raw) return result;

    let work = raw.replace(/\r/g, '');
    const set = new Set<string>();

    // 1. Email extraction
    const emMatch = work.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
    if (emMatch) {
      result.email = emMatch[0];
      set.add('email');
      work = work.replace(emMatch[0], '');
    }

    // 2. Phone extraction
    const phMatch = work.match(/\+?\d[\d\s().\-]{6,}\d/);
    if (phMatch) {
      result.tel = phMatch[0].trim();
      set.add('tel');
      work = work.replace(phMatch[0], '');
    }

    // 3. Tax / VAT extraction
    const taxMatch = work.match(/(?:tax|gst|vat|mst)[^A-Za-z0-9]{0,4}([A-Za-z0-9\-]{5,})/i);
    if (taxMatch) {
      result.tax = taxMatch[1];
      set.add('tax');
      work = work.replace(taxMatch[0], '');
    }

    // 4. Country extraction
    const countryList = Object.keys(COUNTRY_FLAGS).concat([
      'United Kingdom', 'Germany', 'France', 'Japan', 'South Korea', 'Korea',
      'Thailand', 'Netherlands', 'Italy', 'Spain', 'India', 'Indonesia',
      'Philippines', 'Hong Kong', 'New Zealand'
    ]);
    countryList.sort((a, b) => b.length - a.length);

    for (const c of countryList) {
      const reg = new RegExp(c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
      if (reg.test(work)) {
        result.country = c;
        set.add('country');
        break;
      }
    }

    // 5. Lines parsing for company, contact, postal, city, street
    const lines = work
      .split(/\n/)
      .map(s => s.replace(/^[·|,\s]+|[·|,\s]+$/g, '').trim())
      .filter(Boolean);

    if (lines.length > 0) {
      const parts = lines[0].split(/\s[—\-\/|]\s|,\s*/).map(s => s.trim()).filter(Boolean);
      const companyPart = parts.find(p => /\b(co\.?|ltd|inc|company|pte|llc|corp|gmbh|jsc|sa)\b/i.test(p)) || '';
      const contactPart = parts.find(p => p !== companyPart) || (companyPart ? '' : parts[0]) || lines[0];

      if (companyPart) {
        result.company = companyPart;
        set.add('company');
      }
      if (contactPart) {
        result.contact = contactPart;
        set.add('contact');
      }
      lines.shift();
    }

    // Postal code search from bottom
    for (let i = lines.length - 1; i >= 0; i--) {
      const m = lines[i].match(/\b([A-Z]{0,2}\d{4,6}|\d{3,5}\s?[A-Z]{2})\b/);
      if (m) {
        result.postal = m[1];
        set.add('postal');
        break;
      }
    }

    // City determination
    const cityLine = (result.country && lines.find(l => l.toLowerCase().includes(result.country.toLowerCase()))) ||
      (result.postal && lines.find(l => l.includes(result.postal))) || '';

    if (cityLine) {
      let city = cityLine
        .replace(new RegExp(result.country || '', 'i'), '')
        .replace(result.postal || '', '')
        .replace(/[,·|]/g, ' ')
        .trim();

      if (!city && result.country && ['Singapore', 'Hong Kong', 'Malaysia'].includes(result.country)) {
        city = result.country;
      }

      if (city && city.length <= 24 && !/\d{3,}/.test(city)) {
        result.city = city;
        set.add('city');
      }
    }

    // Street lines
    const streetLines = lines.filter(l => l !== cityLine || /#|\d+\s*[A-Za-z]/.test(l.replace(result.postal || '', '')));
    if (streetLines[0]) {
      result.addr1 = streetLines[0];
      set.add('addr1');
    }
    if (streetLines[1]) {
      result.addr2 = streetLines[1];
      set.add('addr2');
    }
    if (streetLines[2]) {
      result.addr3 = streetLines[2];
      set.add('addr3');
    }

    const requiredFields = ['country', 'contact', 'tel', 'city', 'postal', 'addr1'];
    const matchedRequired = requiredFields.filter(x => set.has(x)).length;
    const basePct = Math.round((matchedRequired / requiredFields.length) * 100);
    const confidence = Math.min(99, Math.max(30, basePct + (set.has('email') ? 4 : 0)));

    result.confidence = confidence;
    result.extractedFieldsCount = set.size;

    return result;
  }

  /**
   * Get sample recognized items or simulate vision inference on image files.
   */
  public getKnowledgeItems(): AiRecognizedItem[] {
    return [...AI_KNOWLEDGE_ITEMS];
  }

  public recognizeImageItem(key?: string): AiRecognizedItem {
    if (key) {
      const match = AI_KNOWLEDGE_ITEMS.find(it => it.key === key);
      if (match) return match;
    }
    return AI_KNOWLEDGE_ITEMS[0];
  }
}
