import { fullName } from './members';

const COLUMNS = [
  ['ID', (m) => m.id],
  ['First Name', (m) => m.firstName],
  ['Last Name', (m) => m.lastName],
  ['Full Name', fullName],
  ['Gender', (m) => m.gender],
  ['Phone', (m) => m.phone],
  ['Email', (m) => m.email],
  ['Address', (m) => m.address],
  ['Date of Birth', (m) => m.dateOfBirth],
  ['Marital Status', (m) => m.maritalStatus],
  ['Occupation', (m) => m.occupation],
  ['Department', (m) => m.department],
  ['Cell Group', (m) => m.cellGroup],
  ['Join Date', (m) => m.joinDate],
  ['Status', (m) => m.status],
  ['Notes', (m) => m.notes],
];

function escapeCell(value) {
  let text = value == null ? '' : String(value);
  // Neutralise spreadsheet formula injection.
  if (/^[=+\-@]/.test(text) && !/^\+?\d[\d\s]*$/.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function membersToCsv(members) {
  const header = COLUMNS.map(([label]) => escapeCell(label)).join(',');
  const rows = members.map((m) => COLUMNS.map(([, get]) => escapeCell(get(m))).join(','));
  return [header, ...rows].join('\r\n');
}

export function downloadMembersCsv(members, filename = 'members.csv') {
  const blob = new Blob(['\uFEFF', membersToCsv(members)], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
