import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogOut, Menu, RotateCcw, UserPlus, Users, X } from 'lucide-react';
import { CHURCH } from '../config/appConfig';
import { useAuth, useMembers, useToast } from '../context/contexts';
import ConfirmModal from '../components/ConfirmModal';
import Logo from '../components/Logo';

function pageTitle(pathname) {
  if (pathname === '/admin') return 'Dashboard';
  if (pathname === '/admin/members') return 'Members';
  if (pathname === '/admin/members/new') return 'Add Member';
  if (pathname.endsWith('/edit')) return 'Edit Member';
  return 'Member Profile';
}

const NAV = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, active: (p) => p === '/admin' },
  {
    to: '/admin/members',
    label: 'Members',
    icon: Users,
    active: (p) => p.startsWith('/admin/members') && p !== '/admin/members/new',
  },
  { to: '/admin/members/new', label: 'Add Member', icon: UserPlus, active: (p) => p === '/admin/members/new' },
];

export default function AdminLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { resetDemo } = useMembers();
  const { showToast } = useToast();
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);

  useEffect(() => {
    document.title = `${pageTitle(pathname)} · ${CHURCH.name}`;
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleReset = () => {
    resetDemo();
    setConfirmReset(false);
    setMenuOpen(false);
    showToast('Demo data restored to the original 100 members.');
    navigate('/admin');
  };

  const itemClass = (active) =>
    `flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
      active ? 'bg-gold-400 text-navy-900' : 'text-navy-100 hover:bg-navy-700 hover:text-white'
    }`;

  return (
    <div className="min-h-screen lg:pl-64">
      {menuOpen && (
        <div className="fixed inset-0 z-30 bg-navy-900/50 lg:hidden" onClick={() => setMenuOpen(false)} aria-hidden="true" />
      )}

      <aside
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-navy-800 p-4 transition-transform duration-200 lg:translate-x-0 ${
          menuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Admin navigation"
      >
        <div className="flex items-center justify-between px-1 py-2">
          <Logo tone="light" />
          <button
            type="button"
            className="rounded-lg p-1.5 text-navy-200 hover:bg-navy-700 hover:text-white lg:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="mt-6 flex-1 space-y-1">
          {NAV.map(({ to, label, icon: Icon, active }) => {
            const isActive = active(pathname);
            return (
              <Link
                key={to}
                to={to}
                className={itemClass(isActive)}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => setMenuOpen(false)}
              >
                <Icon size={18} aria-hidden="true" /> {label}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-1 border-t border-navy-700 pt-4">
          <button type="button" className={itemClass(false)} onClick={() => setConfirmReset(true)}>
            <RotateCcw size={18} aria-hidden="true" /> Reset Demo Data
          </button>
          <button type="button" className={itemClass(false)} onClick={handleLogout}>
            <LogOut size={18} aria-hidden="true" /> Logout
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-navy-100 bg-paper/90 px-4 backdrop-blur sm:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-navy-700 hover:bg-navy-50 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="admin-sidebar"
            >
              <Menu size={22} />
            </button>
            <h1 className="font-serif text-xl font-semibold text-navy-800 sm:text-2xl">{pageTitle(pathname)}</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm font-medium text-navy-700 sm:inline">Admin</span>
            <span
              className="flex h-9 w-9 items-center justify-center rounded-full bg-navy-700 text-sm font-semibold text-white"
              aria-hidden="true"
            >
              A
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 sm:px-8 sm:py-8">
          <Outlet />
        </main>
      </div>

      <ConfirmModal
        open={confirmReset}
        title="Reset demo data?"
        message="This replaces every change you have made with the original 100 members."
        confirmLabel="Reset data"
        tone="primary"
        onConfirm={handleReset}
        onCancel={() => setConfirmReset(false)}
      />
    </div>
  );
}
