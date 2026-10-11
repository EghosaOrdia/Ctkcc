import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Pencil, Trash2, UserX } from 'lucide-react';
import Avatar from '../components/Avatar';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import StatusBadge from '../components/StatusBadge';
import { useMembers, useToast } from '../context/contexts';
import { calculateAge, formatDate, membershipDuration } from '../utils/dates';
import { fullName } from '../utils/members';
import { formatPhone } from '../utils/phone';

function Section({ title, children }) {
  return (
    <section className="card p-5 sm:p-6">
      <h2 className="font-serif text-lg font-semibold text-navy-800">{title}</h2>
      <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">{children}</dl>
    </section>
  );
}

function Item({ label, children }) {
  return (
    <div>
      <dt className="text-sm text-navy-400">{label}</dt>
      <dd className="mt-0.5 break-words text-navy-800">{children || '—'}</dd>
    </div>
  );
}

export default function MemberProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMember, deleteMember } = useMembers();
  const { showToast } = useToast();
  const [confirming, setConfirming] = useState(false);
  const member = getMember(id);

  if (!member) {
    return (
      <div className="card">
        <EmptyState
          icon={UserX}
          title="We could not find this member"
          message="They may have been deleted, or the link may be out of date."
          action={<Link to="/admin/members" className="btn-primary">Back to members</Link>}
        />
      </div>
    );
  }

  const name = fullName(member);
  const age = calculateAge(member.dateOfBirth);

  const remove = () => {
    deleteMember(member.id);
    showToast(`${name} was deleted.`);
    navigate('/admin/members', { replace: true });
  };

  return (
    <div className="mx-auto max-w-4xl space-y-5">
      <Link to="/admin/members" className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={16} aria-hidden="true" /> Back to members
      </Link>

      <div className="card flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:p-6">
        <Avatar member={member} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-2xl font-semibold text-navy-800 sm:text-3xl">{name}</h2>
            <StatusBadge status={member.status} />
          </div>
          <p className="mt-1 text-navy-600">
            {member.department === 'None' ? 'No department yet' : member.department}
          </p>
          <p className="text-sm text-navy-400">Member since {formatDate(member.joinDate)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link to={`/admin/members/${member.id}/edit`} className="btn-primary">
            <Pencil size={16} aria-hidden="true" /> Edit
          </Link>
          <button type="button" className="btn-outline text-red-600 hover:bg-red-50" onClick={() => setConfirming(true)}>
            <Trash2 size={16} aria-hidden="true" /> Delete
          </button>
        </div>
      </div>

      <Section title="Contact information">
        <Item label="Phone">{formatPhone(member.phone)}</Item>
        <Item label="Email">{member.email}</Item>
        <div className="sm:col-span-2">
          <Item label="Address">{member.address}</Item>
        </div>
      </Section>

      <Section title="Personal information">
        <Item label="Gender">{member.gender}</Item>
        <Item label="Date of birth">
          {formatDate(member.dateOfBirth)}
          {age !== null ? ` (${age} ${age === 1 ? 'year' : 'years'} old)` : ''}
        </Item>
        <Item label="Marital status">{member.maritalStatus}</Item>
        <Item label="Occupation">{member.occupation}</Item>
      </Section>

      <Section title="Church information">
        <Item label="Department">{member.department}</Item>
        <Item label="Cell group">{member.cellGroup}</Item>
        <Item label="Join date">{formatDate(member.joinDate)}</Item>
        <Item label="Membership duration">{membershipDuration(member.joinDate)}</Item>
      </Section>

      <section className="card p-5 sm:p-6">
        <h2 className="font-serif text-lg font-semibold text-navy-800">Notes</h2>
        <p className="mt-3 whitespace-pre-wrap text-navy-700">
          {member.notes || <span className="text-navy-400">No notes for this member yet.</span>}
        </p>
      </section>

      <ConfirmModal
        open={confirming}
        title="Delete this member?"
        message={`${name} will be removed from your records. This cannot be undone.`}
        confirmLabel="Delete member"
        onConfirm={remove}
        onCancel={() => setConfirming(false)}
      />
    </div>
  );
}
