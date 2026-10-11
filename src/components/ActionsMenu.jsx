import { useEffect, useRef, useState } from 'react';
import { Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ActionsMenu({ member, name, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onClick = (e) => !ref.current?.contains(e.target) && setOpen(false);
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const item =
    'flex w-full items-center gap-2.5 px-3.5 py-2 text-left text-sm text-navy-700 hover:bg-navy-50';

  return (
    <div ref={ref} className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`Actions for ${name}`}
        className="rounded-lg p-2 text-navy-400 hover:bg-navy-50 hover:text-navy-700"
      >
        <MoreVertical size={18} />
      </button>
      {open && (
        <div role="menu" className="absolute right-0 top-full z-30 mt-1 w-40 overflow-hidden rounded-xl bg-white py-1 shadow-lift ring-1 ring-navy-100">
          <Link role="menuitem" to={`/admin/members/${member.id}`} className={item}>
            <Eye size={16} aria-hidden="true" /> View
          </Link>
          <Link role="menuitem" to={`/admin/members/${member.id}/edit`} className={item}>
            <Pencil size={16} aria-hidden="true" /> Edit
          </Link>
          <button
            type="button"
            role="menuitem"
            className={`${item} text-red-600 hover:bg-red-50`}
            onClick={() => {
              setOpen(false);
              onDelete(member);
            }}
          >
            <Trash2 size={16} aria-hidden="true" /> Delete
          </button>
        </div>
      )}
    </div>
  );
}
