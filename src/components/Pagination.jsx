import { ChevronLeft, ChevronRight } from 'lucide-react';

function pageWindow(page, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  const start = Math.max(1, Math.min(page - 2, total - 4));
  return Array.from({ length: 5 }, (_, i) => start + i);
}

export default function Pagination({ page, pageSize, total, onChange }) {
  const pages = Math.max(1, Math.ceil(total / pageSize));
  if (total <= pageSize) return null;
  const from = (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  return (
    <nav
      aria-label="Pagination"
      className="flex flex-col items-center justify-between gap-3 border-t border-navy-100 px-4 py-4 sm:flex-row"
    >
      <p className="text-sm text-navy-500">
        {from}–{to} of {total}
      </p>
      <div className="flex items-center gap-1">
        <button
          type="button"
          className="btn-outline px-2.5 py-2"
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>
        {pageWindow(page, pages).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onChange(p)}
            aria-current={p === page ? 'page' : undefined}
            className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium transition-colors ${
              p === page ? 'bg-navy-700 text-white' : 'text-navy-600 hover:bg-navy-50'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          className="btn-outline px-2.5 py-2"
          disabled={page === pages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}
