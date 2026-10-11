import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CHURCH } from './config/appConfig';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Login from './pages/Login';
import MemberFormPage from './pages/MemberFormPage';
import MemberProfile from './pages/MemberProfile';
import MembersList from './pages/MembersList';
import NotFound from './pages/NotFound';

export default function App() {
  useEffect(() => {
    document.title = `${CHURCH.name} · ${CHURCH.portalName}`;
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="members" element={<MembersList />} />
          <Route path="members/new" element={<MemberFormPage mode="add" />} />
          <Route path="members/:id" element={<MemberProfile />} />
          <Route path="members/:id/edit" element={<MemberFormPage mode="edit" />} />
        </Route>
      </Route>
      <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
