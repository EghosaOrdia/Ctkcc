import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, UserX } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import MemberForm from '../components/MemberForm';
import { useMembers, useToast } from '../context/contexts';
import { fullName } from '../utils/members';

export default function MemberFormPage({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMember, addMember, updateMember } = useMembers();
  const { showToast } = useToast();
  const isEdit = mode === 'edit';
  const member = isEdit ? getMember(id) : undefined;

  if (isEdit && !member) {
    return (
      <div className="card">
        <EmptyState
          icon={UserX}
          title="We could not find this member"
          message="They may have been deleted, so there is nothing to edit."
          action={<Link to="/admin/members" className="btn-primary">Back to members</Link>}
        />
      </div>
    );
  }

  const handleSubmit = (data) => {
    if (isEdit) {
      const updated = updateMember(member.id, data);
      showToast(`${fullName(updated)} was updated.`);
      navigate(`/admin/members/${updated.id}`);
    } else {
      const created = addMember(data);
      showToast(`${fullName(created)} was added.`);
      navigate(`/admin/members/${created.id}`);
    }
  };

  const back = isEdit ? `/admin/members/${member.id}` : '/admin/members';

  return (
    <div className="mx-auto max-w-3xl space-y-5">
      <Link to={back} className="inline-flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-navy-800">
        <ArrowLeft size={16} aria-hidden="true" /> {isEdit ? 'Back to profile' : 'Back to members'}
      </Link>
      <MemberForm
        key={member?.id || 'new'}
        initialValues={member}
        submitLabel={isEdit ? 'Save changes' : 'Add member'}
        onSubmit={handleSubmit}
        onCancel={() => navigate(back)}
      />
    </div>
  );
}
