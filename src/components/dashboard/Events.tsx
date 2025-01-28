import React from 'react';
import { Calendar, Users, MapPin, Clock } from 'lucide-react';

export default function Events() {
  const events = [
    {
      id: 1,
      title: 'Web Development Workshop',
      date: '2024-03-20',
      time: '10:00 AM',
      location: 'Room 101',
      participants: 45,
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'ورشة ادوات الذكاء الإصطناعي',
      date: '2024-03-22',
      time: '2:00 PM',
      location: 'ِAdam Hall',
      participants: 120,
      status: 'upcoming',
    },
    {
      id: 3,
      title: 'Design Thinking Workshop',
      date: '2024-03-25',
      time: '11:00 AM',
      location: 'Room 203',
      participants: 30,
      status: 'upcoming',
    },
  ];

  return (
    <div className="space-y-8 bg-gradient-to-r from-blue-100 to-green-100 p-6 min-h-screen">
      {/* Title Section */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-gray-800">الفعاليات القادمة</h1>
        <p className="mt-2 text-lg text-gray-600"></p>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 relative"
          >
            {/* Event Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-blue-500" />
                  <span>{event.participants} participants</span>
                </div>
              </div>
            </div>

            {/* Event Status Badge */}
            <span className="absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
              {event.status}
            </span>

            {/* Buttons */}
            <div className="mt-6 flex justify-between">
              <button className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-all">
                Edit
              </button>
              <button className="text-red-600 hover:text-red-700 font-medium hover:underline transition-all">
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
