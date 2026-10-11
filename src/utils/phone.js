/** Normalise Nigerian numbers to the local 11-digit form (0xxxxxxxxxx). */
export function normalizePhone(value) {
  const cleaned = String(value || '').replace(/[\s\-().]/g, '');
  if (cleaned.startsWith('+234')) return `0${cleaned.slice(4)}`;
  if (cleaned.startsWith('234') && cleaned.length === 13) return `0${cleaned.slice(3)}`;
  return cleaned;
}

export function isValidNigerianPhone(value) {
  return /^0(70|80|81|90|91)\d{8}$/.test(normalizePhone(value));
}

export function formatPhone(value) {
  const n = normalizePhone(value);
  if (/^\d{11}$/.test(n)) return `${n.slice(0, 4)} ${n.slice(4, 7)} ${n.slice(7)}`;
  return value;
}
