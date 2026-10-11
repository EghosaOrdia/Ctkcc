export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
      {Icon && (
        <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-navy-50 text-navy-400">
          <Icon size={26} aria-hidden="true" />
        </span>
      )}
      <h3 className="font-serif text-lg font-semibold text-navy-800">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-navy-500">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
