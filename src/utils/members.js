import { parseISO } from './dates';
import { normalizePhone } from './phone';

export const SORT_OPTIONS = [
  { value: 'name', label: 'Name A–Z' },
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
];

export const EMPTY_FILTERS = {
  search: '',
  department: '',
  status: '',
  gender: '',
  birthMonth: '',
  cellGroup: '',
};

export const fullName = (m) => `${m.firstName} ${m.lastName}`.trim();

export const initials = (m) =>
  `${(m.firstName || '?').charAt(0)}${(m.lastName || '').charAt(0)}`.toUpperCase();

export function hasActiveFilters(filters) {
  return Object.keys(EMPTY_FILTERS).some((key) => filters[key] !== EMPTY_FILTERS[key]);
}

/** Single pipeline used by the list, pagination and CSV export. */
export function applyFilters(members, filters, sort) {
  const query = filters.search.trim().toLowerCase();
  const queryDigits = normalizePhone(query).replace(/\D/g, '');

  const filtered = members.filter((m) => {
    if (query) {
      const matchesText =
        fullName(m).toLowerCase().includes(query) ||
        (m.email || '').toLowerCase().includes(query);
      const matchesPhone =
        queryDigits.length >= 3 && normalizePhone(m.phone).includes(queryDigits);
      if (!matchesText && !matchesPhone) return false;
    }
    if (filters.department && m.department !== filters.department) return false;
    if (filters.status && m.status !== filters.status) return false;
    if (filters.gender && m.gender !== filters.gender) return false;
    if (filters.cellGroup && m.cellGroup !== filters.cellGroup) return false;
    if (filters.birthMonth) {
      const dob = parseISO(m.dateOfBirth);
      if (!dob || dob.getMonth() + 1 !== Number(filters.birthMonth)) return false;
    }
    return true;
  });

  const byName = (a, b) => fullName(a).localeCompare(fullName(b));
  const byJoin = (a, b) => (a.joinDate || '').localeCompare(b.joinDate || '');
  const sorted = [...filtered];
  if (sort === 'newest') sorted.sort((a, b) => byJoin(b, a) || byName(a, b));
  else if (sort === 'oldest') sorted.sort((a, b) => byJoin(a, b) || byName(a, b));
  else sorted.sort(byName);
  return sorted;
}

export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return `mem-${crypto.randomUUID()}`;
  return `mem-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

const AVATAR_COLORS = [
  'bg-navy-700 text-white',
  'bg-gold-600 text-white',
  'bg-emerald-700 text-white',
  'bg-teal-700 text-white',
  'bg-sky-700 text-white',
  'bg-rose-800 text-white',
];

export function avatarColor(seed) {
  let hash = 0;
  for (const ch of String(seed)) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0;
  return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}
