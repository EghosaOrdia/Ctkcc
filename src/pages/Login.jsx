import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { CHURCH, DEMO_CREDENTIALS } from '../config/appConfig';
import { useAuth } from '../context/contexts';
import Logo from '../components/Logo';

export default function Login() {
  const { isAuthed, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthed) return <Navigate to="/admin" replace />;

  const submit = (e) => {
    e.preventDefault();
    if (login(email, password)) navigate('/admin', { replace: true });
    else setError('That email or password is not right. Check the demo credentials below.');
  };

  const fillDemo = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-4 py-10">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-navy-500 hover:text-navy-800">
          <ArrowLeft size={16} aria-hidden="true" /> Back to {CHURCH.name}
        </Link>
        <div className="card p-6 sm:p-8">
          <Logo />
          <h1 className="mt-6 font-serif text-2xl font-semibold text-navy-800">Sign in to the {CHURCH.portalName}</h1>
          <p className="mt-1 text-sm text-navy-500">Manage members, cell groups and departments.</p>

          <form onSubmit={submit} className="mt-6 space-y-4" noValidate>
            {error && (
              <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-700">
                {error}
              </p>
            )}
            <div>
              <label htmlFor="email" className="label">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="username"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="label">Password</label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary w-full">Sign in</button>
          </form>

          <div className="mt-6 rounded-xl border border-gold-200 bg-gold-50 p-4 text-sm text-navy-700">
            <p className="flex items-center gap-2 font-semibold">
              <Info size={16} className="text-gold-600" aria-hidden="true" /> Demo credentials
            </p>
            <p className="mt-2">Email: <span className="font-mono">{DEMO_CREDENTIALS.email}</span></p>
            <p>Password: <span className="font-mono">{DEMO_CREDENTIALS.password}</span></p>
            <button type="button" onClick={fillDemo} className="mt-3 font-semibold text-navy-700 underline underline-offset-2 hover:text-navy-900">
              Fill in for me
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
