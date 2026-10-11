import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { STORAGE_KEYS } from '../config/appConfig';
import { createSeedMembers } from '../data/members';
import { generateId } from '../utils/members';
import { MembersContext } from './contexts';

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.members);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Corrupt or unavailable storage: fall back to seed data.
  }
  return createSeedMembers();
}

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      return [...state, action.member];
    case 'update':
      return state.map((m) => (m.id === action.member.id ? action.member : m));
    case 'delete':
      return state.filter((m) => m.id !== action.id);
    case 'reset':
      return action.members;
    default:
      return state;
  }
}

export function MembersProvider({ children }) {
  const [members, dispatch] = useReducer(reducer, undefined, loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.members, JSON.stringify(members));
    } catch {
      // Storage full or blocked: the demo keeps working in memory.
    }
  }, [members]);

  const addMember = useCallback((data) => {
    const member = { ...data, id: generateId() };
    dispatch({ type: 'add', member });
    return member;
  }, []);

  const updateMember = useCallback((id, data) => {
    const member = { ...data, id };
    dispatch({ type: 'update', member });
    return member;
  }, []);

  const deleteMember = useCallback((id) => dispatch({ type: 'delete', id }), []);

  const resetDemo = useCallback(
    () => dispatch({ type: 'reset', members: createSeedMembers() }),
    [],
  );

  const getMember = useCallback((id) => members.find((m) => m.id === id), [members]);

  const value = useMemo(
    () => ({ members, addMember, updateMember, deleteMember, resetDemo, getMember }),
    [members, addMember, updateMember, deleteMember, resetDemo, getMember],
  );

  return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>;
}
