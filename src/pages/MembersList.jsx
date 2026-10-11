import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Download, SearchX, UserPlus, Users } from 'lucide-react';
import ActionsMenu from '../components/ActionsMenu';
import Avatar from '../components/Avatar';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import StatusBadge from '../components/StatusBadge';
import { useMembers, useToast } from '../context/contexts';
import { downloadMembersCsv } from '../utils/csv';
import { formatDate, todayISO } from '../utils/dates';
import { EMPTY_FILTERS, applyFilters, fullName, hasActiveFilters } from '../utils/members';
import { formatPhone } from '../utils/phone';

const PAGE_SIZE = 10;

export default function MembersList() {
  const { members, deleteMember } = useMembers();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [sort, setSort] = useState('name');
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState(null);

  const results = useMemo(() => applyFilters(members, filters, sort), [members, filters, sort]);
  const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
  const currentPage = Math.min(page, pages);
  const visible = results.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const changeFilters = (next) => {
    setFilters(next);
    setPage(1);
  };
  const changeSort = (next) => {
    setSort(next);
    setPage(1);
  };
  const clear = () => changeFilters(EMPTY_FILTERS);

  const exportCsv = () => {
    if (!results.length) {
      showToast('There are no members to export with these filters.', 'error');
      return;
    }
    downloadMembersCsv(results, `members-${todayISO()}.csv`);
    showToast(`Exported ${results.length} ${results.length === 1 ? 'member' : 'members'} to CSV.`);
  };

  const confirmDelete = () => {
    deleteMember(toDelete.id);
    showToast(`${fullName(toDelete)} was deleted.`);
    setToDelete(null);
  };

  const openProfile = (id) => navigate(`/admin/members/${id}`);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-navy-500" aria-live="polite">
          Showing <span className="font-semibold text-navy-800">{results.length}</span> of{' '}
          <span className="font-semibold text-navy-800">{members.length}</span> members
        </p>
        <div className="flex gap-2">
          <button type="button" className="btn-outline flex-1 sm:flex-none" onClick={exportCsv}>
            <Download size={16} aria-hidden="true" /> Export CSV
          </button>
          <Link to="/admin/members/new" className="btn-primary flex-1 sm:flex-none">
            <UserPlus size={16} aria-hidden="true" /> Add Member
          </Link>
        </div>
      </div>

      <FilterBar filters={filters} sort={sort} onFilterChange={changeFilters} onSortChange={changeSort} onClear={clear} />

      <div className="card">
        {results.length === 0 ? (
          members.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No members yet"
              message="Add your first member to start building your church records."
              action={<Link to="/admin/members/new" className="btn-primary">Add Member</Link>}
            />
          ) : (
            <EmptyState
              icon={SearchX}
              title="No members match these filters"
              message="Try a different search or clear the filters to see everyone."
              action={
                hasActiveFilters(filters) && (
                  <button type="button" className="btn-outline" onClick={clear}>Clear filters</button>
                )
              }
            />
          )
        ) : (
          <>
            <div className="hidden lg:block">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-navy-100 text-navy-500">
                    <th scope="col" className="px-5 py-3.5 font-medium">Member</th>
                    <th scope="col" className="px-3 py-3.5 font-medium">Phone</th>
                    <th scope="col" className="px-3 py-3.5 font-medium">Department</th>
                    <th scope="col" className="px-3 py-3.5 font-medium">Cell group</th>
                    <th scope="col" className="px-3 py-3.5 font-medium">Status</th>
                    <th scope="col" className="px-3 py-3.5 font-medium">Joined</th>
                    <th scope="col" className="px-3 py-3.5"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {visible.map((m) => (
                    <tr
                      key={m.id}
                      onClick={() => openProfile(m.id)}
                      className="cursor-pointer border-b border-navy-50 last:border-0 hover:bg-gold-50/60"
                    >
                      <td className="px-5 py-3">
                        <Link
                          to={`/admin/members/${m.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center gap-3 font-medium text-navy-800 hover:underline"
                        >
                          <Avatar member={m} size="sm" />
                          <span>{fullName(m)}</span>
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-3 py-3 text-navy-600">{formatPhone(m.phone)}</td>
                      <td className="px-3 py-3 text-navy-600">{m.department}</td>
                      <td className="px-3 py-3 text-navy-600">{m.cellGroup || '—'}</td>
                      <td className="px-3 py-3"><StatusBadge status={m.status} /></td>
                      <td className="whitespace-nowrap px-3 py-3 text-navy-600">{formatDate(m.joinDate)}</td>
                      <td className="px-3 py-3 text-right">
                        <ActionsMenu member={m} name={fullName(m)} onDelete={setToDelete} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-navy-50 lg:hidden">
              {visible.map((m) => (
                <li key={m.id} className="flex items-start gap-3 p-4">
                  <Link to={`/admin/members/${m.id}`} className="flex min-w-0 flex-1 items-start gap-3">
                    <Avatar member={m} />
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-semibold text-navy-800">{fullName(m)}</span>
                        <StatusBadge status={m.status} />
                      </span>
                      <span className="mt-0.5 block text-sm text-navy-600">{formatPhone(m.phone)}</span>
                      <span className="block text-sm text-navy-500">
                        {m.department}
                        {m.cellGroup ? `, ${m.cellGroup}` : ''}
                      </span>
                      <span className="block text-xs text-navy-400">Joined {formatDate(m.joinDate)}</span>
                    </span>
                  </Link>
                  <ActionsMenu member={m} name={fullName(m)} onDelete={setToDelete} />
                </li>
              ))}
            </ul>

            <Pagination page={currentPage} pageSize={PAGE_SIZE} total={results.length} onChange={setPage} />
          </>
        )}
      </div>

      <ConfirmModal
        open={!!toDelete}
        title="Delete this member?"
        message={toDelete ? `${fullName(toDelete)} will be removed from your records. This cannot be undone.` : ''}
        confirmLabel="Delete member"
        onConfirm={confirmDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
}
