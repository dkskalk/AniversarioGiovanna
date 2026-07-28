/**
 * Formats a raw input string into Brazilian phone number mask:
 * (XX) XXXXX-XXXX or (XX) XXXX-XXXX
 */
export function maskPhone(value: string): string {
  if (!value) return "";
  
  // Remove all non-digits
  const digits = value.replace(/\D/g, "").slice(0, 11);
  
  if (digits.length === 0) return "";
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }
  
  // 11 digits (mobile)
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`;
}

export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, "");
}
