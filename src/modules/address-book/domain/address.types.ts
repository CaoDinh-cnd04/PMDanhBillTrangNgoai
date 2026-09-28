export interface SenderProfile {
  id?: string;
  n: string; // Company / Name
  c: string; // Contact person
  t: string; // Tel
  d: string; // Address
}

export interface ReceiverEntry {
  id?: string;
  n: string; // Company / Name
  ct: string; // Country
  city: string;
  postal: string;
  contact: string;
  tel: string;
  a1: string; // Address 1
  a2?: string; // Address 2
  a3?: string; // Address 3
}

export const COUNTRY_FLAGS: Record<string, string> = {
  Singapore: '🇸🇬',
  Malaysia: '🇲🇾',
  'United States': '🇺🇸',
  Australia: '🇦🇺',
  Belgium: '🇧🇪',
  China: '🇨🇳',
  Mexico: '🇲🇽',
  Canada: '🇨🇦',
  Taiwan: '🇹🇼',
  'United Arab Emirates': '🇦🇪',
  Japan: '🇯🇵',
  'South Korea': '🇰🇷',
  'United Kingdom': '🇬🇧',
  Germany: '🇩🇪',
  France: '🇫🇷',
  Thailand: '🇹🇭'
};
