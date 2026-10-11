export default function StatCard({ label, value, icon: Icon, hint, tone = 'navy' }) {
  const tones = {
    navy: 'bg-navy-50 text-navy-700',
    gold: 'bg-gold-100 text-gold-700',
    green: 'bg-emerald-50 text-emerald-700',
    gray: 'bg-slate-100 text-slate-600',
  };
  return (
    <div className="card flex items-center gap-4 p-5">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tones[tone]}`}>
        <Icon size={22} aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-sm text-navy-500">{label}</p>
        <p className="font-serif text-3xl font-semibold leading-tight text-navy-800">{value}</p>
        {hint && <p className="truncate text-xs text-navy-400">{hint}</p>}
      </div>
    </div>
  );
}
