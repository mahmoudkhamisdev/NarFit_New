export interface Country {
  name: string;
  code: string;
  flag: string;
  iso: string;
}

export const COUNTRIES: Country[] = [
  // Middle East & North Africa (MENA)
  { name: 'Egypt', code: '+20', flag: '🇪🇬', iso: 'EG' },
  { name: 'Saudi Arabia', code: '+966', flag: '🇸🇦', iso: 'SA' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪', iso: 'AE' },
  { name: 'Kuwait', code: '+965', flag: '🇰🇼', iso: 'KW' },
  { name: 'Qatar', code: '+974', flag: '🇶🇦', iso: 'QA' },
  { name: 'Bahrain', code: '+973', flag: '🇧🇭', iso: 'BH' },
  { name: 'Oman', code: '+968', flag: '🇴🇲', iso: 'OM' },
  { name: 'Jordan', code: '+962', flag: '🇯🇴', iso: 'JO' },
  { name: 'Lebanon', code: '+961', flag: '🇱🇧', iso: 'LB' },
  { name: 'Iraq', code: '+964', flag: '🇮🇶', iso: 'IQ' },
  { name: 'Palestine', code: '+970', flag: '🇵🇸', iso: 'PS' },
  { name: 'Syria', code: '+963', flag: '🇸🇾', iso: 'SY' },
  { name: 'Yemen', code: '+967', flag: '🇾🇪', iso: 'YE' },
  { name: 'Morocco', code: '+212', flag: '🇲🇦', iso: 'MA' },
  { name: 'Algeria', code: '+213', flag: '🇩🇿', iso: 'DZ' },
  { name: 'Tunisia', code: '+216', flag: '🇹🇳', iso: 'TN' },
  { name: 'Libya', code: '+218', flag: '🇱🇾', iso: 'LY' },
  { name: 'Sudan', code: '+249', flag: '🇸🇩', iso: 'SD' },
  { name: 'Mauritania', code: '+222', flag: '🇲🇷', iso: 'MR' },
  { name: 'Somalia', code: '+252', flag: '🇸🇴', iso: 'SO' },
  { name: 'Djibouti', code: '+253', flag: '🇩🇯', iso: 'DJ' },

  // Americas
  { name: 'United States', code: '+1', flag: '🇺🇸', iso: 'US' },
  { name: 'Canada', code: '+1', flag: '🇨🇦', iso: 'CA' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽', iso: 'MX' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷', iso: 'BR' },
  { name: 'Argentina', code: '+54', flag: '🇦🇷', iso: 'AR' },
  { name: 'Colombia', code: '+57', flag: '🇨🇴', iso: 'CO' },
  { name: 'Chile', code: '+56', flag: '🇨🇱', iso: 'CL' },
  { name: 'Peru', code: '+51', flag: '🇵🇪', iso: 'PE' },
  { name: 'Ecuador', code: '+593', flag: '🇪🇨', iso: 'EC' },
  { name: 'Venezuela', code: '+58', flag: '🇻🇪', iso: 'VE' },

  // Europe
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧', iso: 'GB' },
  { name: 'Germany', code: '+49', flag: '🇩🇪', iso: 'DE' },
  { name: 'France', code: '+33', flag: '🇫🇷', iso: 'FR' },
  { name: 'Italy', code: '+39', flag: '🇮🇹', iso: 'IT' },
  { name: 'Spain', code: '+34', flag: '🇪🇸', iso: 'ES' },
  { name: 'Turkey', code: '+90', flag: '🇹🇷', iso: 'TR' },
  { name: 'Netherlands', code: '+31', flag: '🇳🇱', iso: 'NL' },
  { name: 'Switzerland', code: '+41', flag: '🇨🇭', iso: 'CH' },
  { name: 'Sweden', code: '+46', flag: '🇸🇪', iso: 'SE' },
  { name: 'Norway', code: '+47', flag: '🇳🇴', iso: 'NO' },
  { name: 'Denmark', code: '+45', flag: '🇩🇰', iso: 'DK' },
  { name: 'Belgium', code: '+32', flag: '🇧🇪', iso: 'BE' },
  { name: 'Austria', code: '+43', flag: '🇦🇹', iso: 'AT' },
  { name: 'Portugal', code: '+351', flag: '🇵🇹', iso: 'PT' },
  { name: 'Greece', code: '+30', flag: '🇬🇷', iso: 'GR' },
  { name: 'Poland', code: '+48', flag: '🇵🇱', iso: 'PL' },
  { name: 'Czech Republic', code: '+420', flag: '🇨🇿', iso: 'CZ' },
  { name: 'Ireland', code: '+353', flag: '🇮🇪', iso: 'IE' },
  { name: 'Finland', code: '+358', flag: '🇫🇮', iso: 'FI' },
  { name: 'Romania', code: '+40', flag: '🇷🇴', iso: 'RO' },
  { name: 'Ukraine', code: '+380', flag: '🇺🇦', iso: 'UA' },
  { name: 'Russia', code: '+7', flag: '🇷🇺', iso: 'RU' },

  // Asia & Oceania
  { name: 'China', code: '+86', flag: '🇨🇳', iso: 'CN' },
  { name: 'Japan', code: '+81', flag: '🇯🇵', iso: 'JP' },
  { name: 'South Korea', code: '+82', flag: '🇰🇷', iso: 'KR' },
  { name: 'India', code: '+91', flag: '🇮🇳', iso: 'IN' },
  { name: 'Pakistan', code: '+92', flag: '🇵🇰', iso: 'PK' },
  { name: 'Bangladesh', code: '+880', flag: '🇧🇩', iso: 'BD' },
  { name: 'Indonesia', code: '+62', flag: '🇮🇩', iso: 'ID' },
  { name: 'Malaysia', code: '+60', flag: '🇲🇾', iso: 'MY' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬', iso: 'SG' },
  { name: 'Thailand', code: '+66', flag: '🇹🇭', iso: 'TH' },
  { name: 'Vietnam', code: '+84', flag: '🇻🇳', iso: 'VN' },
  { name: 'Philippines', code: '+63', flag: '🇵🇭', iso: 'PH' },
  { name: 'Australia', code: '+61', flag: '🇦🇺', iso: 'AU' },
  { name: 'New Zealand', code: '+64', flag: '🇳🇿', iso: 'NZ' },

  // Africa
  { name: 'South Africa', code: '+27', flag: '🇿🇦', iso: 'ZA' },
  { name: 'Nigeria', code: '+234', flag: '🇳🇬', iso: 'NG' },
  { name: 'Kenya', code: '+254', flag: '🇰🇪', iso: 'KE' },
  { name: 'Ghana', code: '+233', flag: '🇬🇭', iso: 'GH' },
  { name: 'Ethiopia', code: '+251', flag: '🇪🇹', iso: 'ET' },
  { name: 'Senegal', code: '+221', flag: '🇸🇳', iso: 'SN' },
  { name: 'Uganda', code: '+256', flag: '🇺🇬', iso: 'UG' },
  { name: 'Tanzania', code: '+255', flag: '🇹🇿', iso: 'TZ' },
  { name: 'Cameroon', code: '+237', flag: '🇨🇲', iso: 'CM' },
  { name: 'Ivory Coast', code: '+225', flag: '🇨🇮', iso: 'CI' },
];

export const DEFAULT_COUNTRY: Country = COUNTRIES[0]; // Egypt (+20)
