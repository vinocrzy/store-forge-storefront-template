/**
 * Phone Number Utilities
 * E.164 format validation and formatting for storefront checkout
 * Generic implementation — works with any country code
 */

/**
 * Format phone number to E.164 format
 * If already E.164, returns as-is
 */
export const formatPhoneToE164 = (phone: string, countryCode: string = '1'): string => {
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');

  // If already starts with +, return as-is (assume valid)
  if (phone.startsWith('+')) {
    return phone;
  }

  // Add country code if not present
  if (digits.length === 10) {
    return `+${countryCode}${digits}`;
  }

  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // Return with + prefix
  return `+${digits}`;
};

/**
 * Validate phone number format (E.164)
 * Returns true if valid, false otherwise
 * E.164 format: +[country code][number] (7-15 digits total)
 */
export const validatePhoneE164 = (phone: string): boolean => {
  const e164Regex = /^\+[1-9]\d{6,14}$/;
  return e164Regex.test(phone);
};

/**
 * Format phone for display
 * +12025551234 → +1 (202) 555-1234
 * Falls back to original string if format is unrecognised
 */
export const formatPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');

  // US/Canada (+1) — 11 digits starting with 1
  if (cleaned.length === 11 && cleaned.startsWith('1')) {
    const number = cleaned.slice(1);
    return `+1 (${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6)}`;
  }

  return phone;
};

/**
 * Auto-format phone number as user types
 * Returns formatted string for controlled input
 */
export const formatPhoneInput = (value: string): string => {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};
