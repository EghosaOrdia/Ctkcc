import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CHURCH } from '../../config/appConfig';
import Logo from '../../components/Logo';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#service-times', label: 'Service Times' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#home" aria-label={`${CHURCH.name} home`}>
          <Logo />
        </a>
        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-navy-600 hover:text-navy-900">
              {l.label}
            </a>
          ))}
          <Link to="/login" className="btn-gold">{CHURCH.portalName}</Link>
        </nav>
        <button
          type="button"
          className="rounded-lg p-2 text-navy-700 hover:bg-navy-50 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav className="space-y-1 border-t border-navy-100 px-4 py-3 md:hidden" aria-label="Mobile">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-navy-700 hover:bg-navy-50"
            >
              {l.label}
            </a>
          ))}
          <Link to="/login" className="btn-gold mt-2 w-full">{CHURCH.portalName}</Link>
        </nav>
      )}
    </header>
  );
}
