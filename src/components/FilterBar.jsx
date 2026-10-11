import { Search, X } from 'lucide-react';
import { CELL_GROUPS, DEPARTMENTS, GENDERS, MONTHS, STATUSES } from '../constants/constants';
import { SORT_OPTIONS, hasActiveFilters } from '../utils/members';

function Select({ label, value, onChange, children }) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <select className="input pr-7 text-sm sm:text-base" value={value} onChange={(e) => onChange(e.target.value)} aria-label={label}>
        {children}
      </select>
    </label>
  );
}

export default function FilterBar({ filters, sort, onFilterChange, onSortChange, onClear }) {
  const set = (key) => (value) => onFilterChange({ ...filters, [key]: value });

  return (
    <div className="card space-y-3 p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy-300" aria-hidden="true" />
          <input
            type="search"
            className="input pl-10"
            placeholder="Search by name, phone or email"
            aria-label="Search members"
            value={filters.search}
            onChange={(e) => set('search')(e.target.value)}
          />
        </div>
        <div className="sm:w-48">
          <Select label="Sort members" value={sort} onChange={onSortChange}>
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <Select label="Filter by department" value={filters.department} onChange={set('department')}>
          <option value="">Department</option>
          {DEPARTMENTS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </Select>
        <Select label="Filter by status" value={filters.status} onChange={set('status')}>
          <option value="">Status</option>
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </Select>
        <Select label="Filter by gender" value={filters.gender} onChange={set('gender')}>
          <option value="">Gender</option>
          {GENDERS.map((g) => (
            <option key={g}>{g}</option>
          ))}
        </Select>
        <Select label="Filter by birthday month" value={filters.birthMonth} onChange={set('birthMonth')}>
          <option value="">Birth month</option>
          {MONTHS.map((m, i) => (
            <option key={m} value={i + 1}>
              {m}
            </option>
          ))}
        </Select>
        <Select label="Filter by cell group" value={filters.cellGroup} onChange={set('cellGroup')}>
          <option value="">Cell group</option>
          {CELL_GROUPS.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <button type="button" className="btn-outline" onClick={onClear} disabled={!hasActiveFilters(filters)}>
          <X size={16} aria-hidden="true" /> Clear filters
        </button>
      </div>
    </div>
  );
}
