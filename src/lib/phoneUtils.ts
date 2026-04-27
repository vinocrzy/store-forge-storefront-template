/**
 * Phone Number Utilities
 * E.164 format validation and formatting for checkout
 * India (+91) — 10-digit mobile numbers
 */

/**
 * Format phone number to E.164 format
 * Converts: 98765 43210 → +919876543210
 * If already E.164, returns as-is
 */
export const formatPhoneToE164 = (phone: string, countryCode: string = '91'): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // If already starts with +, return as-is (assume valid)
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Indian mobile: 10 digits starting with 6-9
  if (digits.length === 10) {
    return `+${countryCode}${digits}`;
  }
  
  // Already has country code 91 prefix
  if (digits.length === 12 && digits.startsWith('91')) {
    return `+${digits}`;
  }
  
  // Return with + prefix
  return `+${digits}`;
};

/**
 * Validate phone number format (E.164)
 * Returns true if valid, false otherwise
 * E.164 format: +[country code][number] (10-15 digits total)
 */
export const validatePhoneE164 = (phone: string): boolean => {
  const e164Regex = /^\+[1-9]\d{10,14}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone for display (Indian format)
 * +919876543210 → +91 98765 43210
 */
export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  // Indian mobile with country code (12 digits: 91 + 10)
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    const mobile = cleaned.slice(2);
    return `+91 ${mobile.slice(0, 5)} ${mobile.slice(5)}`;
  }
  
  // Plain 10-digit Indian mobile
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  
  return phone;
};

/**
 * Auto-format phone number as user types (Indian format)
 * Returns formatted string for input value
 * e.g. 9876543210 → 98765 43210
 */
export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  
  if (digits.length === 0) return '';
  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)} ${digits.slice(5, 10)}`;
};
