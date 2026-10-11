import { Church } from 'lucide-react';
import { CHURCH } from '../config/appConfig';

export default function Logo({ tone = 'dark' }) {
  const dark = tone === 'dark';
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gold-400 text-navy-900">
        <Church size={20} aria-hidden="true" />
      </span>
      <span className={`font-serif text-lg font-semibold ${dark ? 'text-navy-800' : 'text-white'}`}>
        {CHURCH.name}
      </span>
    </span>
  );
}
