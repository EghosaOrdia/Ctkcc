import { useCallback, useMemo, useState } from 'react';
import { DEMO_CREDENTIALS, STORAGE_KEYS } from '../config/appConfig';
import { AuthContext } from './contexts';

const readFlag = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.auth) === 'true';
  } catch {
    return false;
  }
};

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(readFlag);

  const login = useCallback((email, password) => {
    const ok =
      email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
    if (ok) {
      try {
        localStorage.setItem(STORAGE_KEYS.auth, 'true');
      } catch {
        // Ignore storage errors; session lasts until refresh.
      }
      setIsAuthed(true);
    }
    return ok;
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.auth);
    } catch {
      // Ignore storage errors.
    }
    setIsAuthed(false);
  }, []);

  const value = useMemo(() => ({ isAuthed, login, logout }), [isAuthed, login, logout]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
