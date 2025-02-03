import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Layout,
  Calendar,
  Award,
  LogOut,
  Menu,
  X,
  Settings as SettingsIcon,
  User,
  Clock,
  FileText
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UtasLogo from '../components/common/UtasLogo';
import NotificationCenter from '../components/notifications/NotificationCenter';

export default function VisitorDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b bg-gradient-to-r from-utas-orange-500 to-utas-blue-500">
          <UtasLogo />
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-utas-blue-500 flex items-center justify-center text-white text-xl">
              {user?.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{user?.name}</h3>
              <p className="text-sm text-gray-500">Visitor</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to=""
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <Calendar className="w-5 h-5" />
            <span>Upcoming Events</span>
          </Link>
          <Link
            to="registered"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <Clock className="w-5 h-5" />
            <span>My Registrations</span>
          </Link>
          <Link
            to="certificates"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <Award className="w-5 h-5" />
            <span>My Certificates</span>
          </Link>
          <Link
            to="profile"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </Link>
          <Link
            to="settings"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <SettingsIcon className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 px-4 py-2 w-full text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 min-h-screen">
        {/* Top Bar */}
        <div className="bg-white shadow-sm">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <NotificationCenter />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route index element={<VisitorEvents />} />
            <Route path="registered" element={<VisitorRegistrations />} />
            <Route path="certificates" element={<VisitorCertificates />} />
            <Route path="profile" element={<VisitorProfile />} />
            <Route path="settings" element={<VisitorSettings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

// Placeholder components for visitor pages
function VisitorEvents() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Upcoming Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event cards would go here */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="font-semibold mb-2">No upcoming events</h3>
          <p className="text-gray-600">Check back later for new events</p>
        </div>
      </div>
    </div>
  );
}

function VisitorRegistrations() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Registrations</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">You haven't registered for any events yet.</p>
      </div>
    </div>
  );
}

function VisitorCertificates() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Certificates</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">No certificates available.</p>
      </div>
    </div>
  );
}

function VisitorProfile() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <p className="mt-1 text-gray-900">{user?.name}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-gray-900">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VisitorSettings() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>
      <div className="bg-white rounded-xl shadow-sm p-6">
        <p className="text-gray-600">Account settings and preferences</p>
      </div>
    </div>
  );
}