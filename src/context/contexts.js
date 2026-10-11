import { createContext, useContext } from 'react';

export const AuthContext = createContext(null);
export const MembersContext = createContext(null);
export const ToastContext = createContext(null);

function useRequired(context, name, provider) {
  const value = useContext(context);
  if (!value) throw new Error(`${name} must be used inside ${provider}`);
  return value;
}

export const useAuth = () => useRequired(AuthContext, 'useAuth', 'AuthProvider');
export const useMembers = () => useRequired(MembersContext, 'useMembers', 'MembersProvider');
export const useToast = () => useRequired(ToastContext, 'useToast', 'ToastProvider');
