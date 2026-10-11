import { AlertCircle, CheckCircle2, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  const isError = toast.type === 'error';
  const Icon = isError ? AlertCircle : CheckCircle2;
  return (
    <div
      role="status"
      className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl bg-navy-800 px-4 py-3 text-sm text-white shadow-lift"
    >
      <Icon size={18} className={`mt-0.5 shrink-0 ${isError ? 'text-red-300' : 'text-gold-300'}`} aria-hidden="true" />
      <p className="flex-1">{toast.message}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="rounded p-0.5 text-navy-200 hover:text-white"
      >
        <X size={16} />
      </button>
    </div>
  );
}
