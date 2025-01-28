import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="text-xl font-bold text-blue-900">
               شهادة الاجادة الطلابية
              </Link>
            </div>
            <div className="flex items-center space-x-6 text-blue-900">
              <Link to="/search" className="flex items-center space-x-2 hover:text-blue-600">
                <Search className="w-5 h-5" />
                <span>البحث المتقدم</span>
              </Link>
              <Link
                to="/login"
                className="flex items-center space-x-2 text-sm text-gray-700 hover:text-blue-600"
              >
                <span>دخول</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl font-bold text-blue-900">آفاق واسعة</h1>
          <p className="text-xl text-orange-600 font-semibold">BROAD HORIZONS</p>
          <p className="mt-4 text-gray-700">جامعة التقنية والعلوم التطبيقية</p>
          <div className="mt-6 flex justify-center">
            <div className="relative w-full max-w-lg">
              <input
                type="text"
                placeholder="... ابحث"
                className="w-full px-4 py-2 border rounded-full shadow-sm focus:outline-none"
              />
              <button className="absolute right-3 top-2 text-blue-600">
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>
    </div>
  );
}
