import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
  Layout,
  Calendar,
  FileText,
  Award,
  LogOut,
  Menu,
  X,
  Settings as SettingsIcon,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import UtasLogo from '../components/common/UtasLogo';
import RegisteredEvents from '../components/student/RegisteredEvents';
import StudentTranscript from '../components/student/StudentTranscript';
import EjaadaCertificate from '../components/student/EjaadaCertificate';
import NotificationCenter from '../components/notifications/NotificationCenter';
import { mockStudent } from '../data/mockStudent';

export default function StudentDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const student = mockStudent; // In real app, this would come from context/API

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
              {student.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{student.name}</h3>
              <p className="text-sm text-gray-500">{student.studentId}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-sm text-gray-600">Total Points</div>
            <div className="text-2xl font-bold text-utas-blue-600">{student.totalPoints}</div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          <Link
            to=""
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <Calendar className="w-5 h-5" />
            <span>Registered Events</span>
          </Link>
          <Link
            to="transcript"
            className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
          >
            <FileText className="w-5 h-5" />
            <span>Transcript</span>
          </Link>
          {student.totalPoints >= 200 && (
            <Link
              to="certificate"
              className="flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg hover:bg-utas-blue-50 hover:text-utas-blue-700"
            >
              <Award className="w-5 h-5" />
              <span>Ejaada Certificate</span>
            </Link>
          )}
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
              <div className="text-sm text-gray-600">{student.department}</div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6">
          <Routes>
            <Route index element={<RegisteredEvents events={student.transcript.events} />} />
            <Route path="transcript" element={<StudentTranscript transcript={student.transcript} />} />
            {student.totalPoints >= 200 && (
              <Route path="certificate" element={<EjaadaCertificate student={student} />} />
            )}
          </Routes>
        </div>
      </div>
    </div>
  );
}