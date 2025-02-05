import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import VisitorDashboard from './pages/VisitorDashboard';
import PublicLayout from './pages/public/PublicLayout';
import EventList from './pages/public/EventList';
import CertificateVerification from './pages/public/CertificateVerification';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<EventList />} />
            <Route path="events" element={<EventList />} />
            <Route path="certificates" element={<CertificateVerification />} />
          </Route>

          {/* Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/student/*" element={<StudentDashboard />} />
          <Route path="/visitor/*" element={<VisitorDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}