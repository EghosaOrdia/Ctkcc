import { MONTHS } from '../constants/constants';

const pad = (n) => String(n).padStart(2, '0');

/** Parse a YYYY-MM-DD string as a local date (avoids timezone shifts). */
export function parseISO(value) {
  if (!value) return null;
  const [y, m, d] = value.split('-').map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
}

export function toISO(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayISO() {
  return toISO(new Date());
}

export function formatDate(value) {
  const d = parseISO(value);
  if (!d) return '—';
  return `${d.getDate()} ${MONTHS[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
}

export function formatDayMonth(date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()].slice(0, 3)}`;
}

export function calculateAge(dateOfBirth, today = new Date()) {
  const dob = parseISO(dateOfBirth);
  if (!dob) return null;
  let age = today.getFullYear() - dob.getFullYear();
  const hadBirthday =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hadBirthday) age -= 1;
  return age;
}

/** Next occurrence of a birthday on or after `today` (Feb 29 falls on Mar 1 in non-leap years). */
export function nextBirthday(dateOfBirth, today = new Date()) {
  const dob = parseISO(dateOfBirth);
  if (!dob) return null;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  let next = new Date(start.getFullYear(), dob.getMonth(), dob.getDate());
  if (next < start) next = new Date(start.getFullYear() + 1, dob.getMonth(), dob.getDate());
  return next;
}

export function daysUntilBirthday(dateOfBirth, today = new Date()) {
  const next = nextBirthday(dateOfBirth, today);
  if (!next) return null;
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  return Math.round((next - start) / 86400000);
}

/** Members whose birthday falls within the next 7 days (today included), soonest first. */
export function birthdaysThisWeek(members, today = new Date()) {
  return members
    .map((member) => ({ member, days: daysUntilBirthday(member.dateOfBirth, today) }))
    .filter((entry) => entry.days !== null && entry.days <= 6)
    .sort((a, b) => a.days - b.days)
    .map((entry) => ({
      ...entry,
      date: nextBirthday(entry.member.dateOfBirth, today),
    }));
}

export function birthdayLabel(days) {
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return `In ${days} days`;
}

export function membershipDuration(joinDate, today = new Date()) {
  const join = parseISO(joinDate);
  if (!join) return '—';
  let months =
    (today.getFullYear() - join.getFullYear()) * 12 + (today.getMonth() - join.getMonth());
  if (today.getDate() < join.getDate()) months -= 1;
  if (months < 1) return 'Less than a month';
  const years = Math.floor(months / 12);
  const rest = months % 12;
  const parts = [];
  if (years) parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
  if (rest) parts.push(`${rest} ${rest === 1 ? 'month' : 'months'}`);
  return parts.join(', ');
}

export function isSameMonth(value, today = new Date()) {
  const d = parseISO(value);
  return !!d && d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth();
}

/** Last `count` months as { key, label } ending with the current month. */
export function lastMonths(count, today = new Date()) {
  const result = [];
  for (let i = count - 1; i >= 0; i -= 1) {
    const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
    result.push({
      key: `${d.getFullYear()}-${pad(d.getMonth() + 1)}`,
      label: MONTHS[d.getMonth()].slice(0, 3),
      endOfMonth: new Date(d.getFullYear(), d.getMonth() + 1, 0),
    });
  }
  return result;
}

export function monthKey(value) {
  return value ? value.slice(0, 7) : '';
}
