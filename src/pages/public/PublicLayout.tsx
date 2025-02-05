import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Calendar, Award, LogIn, Menu, X, ChevronDown } from 'lucide-react';

export default function PublicLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <img 
                src="/src/pages/public/images/utas-logo.png" 
                alt="UTAS Logo" 
                className="h-14 w-auto transform group-hover:scale-105 transition-transform duration-300"
              />
              <div className="text-right">
                <h1 className="text-xl font-bold text-gradient">
                  شهادة الإجادة الطلابية
                </h1>
                <p className="text-sm text-gray-600">جامعة التقنية والعلوم التطبيقية</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/events"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                الفعاليات
              </Link>
              <Link
                to="/certificates"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                الشهادات
              </Link>
              <Link
                to="/login"
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-blue-600 text-white rounded-lg 
                hover:from-orange-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 
                hover:shadow-lg"
              >
                تسجيل الدخول
              </Link>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fade-slide-up">
            <div className="px-4 py-2 space-y-2">
              <Link to="/events" className="block py-2 text-gray-700 hover:text-blue-600">
                الفعاليات
              </Link>
              <Link to="/certificates" className="block py-2 text-gray-700 hover:text-blue-600">
                الشهادات
              </Link>
              <Link to="/login" className="block py-2 text-gray-700 hover:text-blue-600">
                تسجيل الدخول
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      {location.pathname === '/' && (
        <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-blue-600 animate-gradient">
            {/* Floating Blobs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/4 -left-12 w-96 h-96 bg-orange-400/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
              <div className="absolute top-1/3 -right-12 w-96 h-96 bg-blue-400/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-orange-400/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>
            </div>
            
            {/* Pattern Overlay */}
            <div className="absolute inset-0 hero-pattern opacity-10"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              {/* Main Text */}
              <h1 className="text-5xl md:text-7xl font-bold text-white opacity-0 animate-fade-slide-up" style={{ direction: 'rtl' }}>
              ارتقِ بتجربتك التعليمية
              </h1>
              
              {/* Decorative Line */}
              <div className="w-32 h-1 bg-white/50 mx-auto rounded-full opacity-0 animate-fade-slide-up animation-delay-300"></div>
              
              {/* CTA Button */}
              <div className="opacity-0 animate-fade-slide-up animation-delay-600">
                <Link
                  to="/events"
                  className="inline-block px-8 py-4 bg-white text-lg font-semibold text-blue-600 rounded-full 
                    shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ direction: 'rtl' }}
                >
                  استكشف الفعاليات
                </Link>
              </div>
            </div>
          </div>

          {/* Wave Overlay */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg 
              className="w-full h-24 md:h-32 text-gray-50" 
              viewBox="0 0 1440 120" 
              preserveAspectRatio="none"
            >
              <path 
                d="M0,0 C480,120 960,120 1440,0 L1440,120 L0,120 Z" 
                fill="currentColor"
              />
            </svg>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}