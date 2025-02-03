import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StudentDashboard from './pages/StudentDashboard';
import VisitorDashboard from './pages/VisitorDashboard';
import PublicLayout from './pages/public/PublicLayout';
import EventList from './pages/public/EventList';
import CertificateVerification from './pages/public/CertificateVerification';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function PrivateRoute({ children, allowedRole }: { children: React.ReactNode; allowedRole?: string }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (allowedRole && user?.role !== allowedRole) {
    switch (user?.role) {
      case 'student':
        return <Navigate to="/student" />;
      case 'external':
        return <Navigate to="/visitor" />;
      default:
        return <Navigate to="/dashboard" />;
    }
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Navigate to="/events" />} />
        <Route path="events" element={<EventList />} />
        <Route path="certificates" element={<CertificateVerification />} />
      </Route>

      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute allowedRole="admin">
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/student/*"
        element={
          <PrivateRoute allowedRole="student">
            <StudentDashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/visitor/*"
        element={
          <PrivateRoute allowedRole="external">
            <VisitorDashboard />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}