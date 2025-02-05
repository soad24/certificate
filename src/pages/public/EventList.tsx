import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Search } from 'lucide-react';
import { format } from 'date-fns';

interface PublicEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registeredCount: number;
  type: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}

const mockEvents: PublicEvent[] = [
  {
    id: 1,
    title: 'Web Development Workshop',
    description: 'Learn modern web development techniques and best practices.',
    date: '2024-03-20',
    time: '10:00',
    location: 'Room 101',
    capacity: 50,
    registeredCount: 45,
    type: 'Workshop',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'AI & Machine Learning Seminar',
    description: 'Explore the latest advancements in artificial intelligence.',
    date: '2024-03-22',
    time: '14:00',
    location: 'Main Hall',
    capacity: 100,
    registeredCount: 75,
    type: 'Seminar',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'Cybersecurity Conference',
    description: 'Stay ahead of digital threats with expert insights.',
    date: '2024-03-25',
    time: '09:00',
    location: 'Conference Center',
    capacity: 150,
    registeredCount: 120,
    type: 'Conference',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Design Thinking Workshop',
    description: 'Master the principles of user-centered design.',
    date: '2024-03-27',
    time: '13:00',
    location: 'Design Lab',
    capacity: 40,
    registeredCount: 35,
    type: 'Workshop',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Business Innovation Forum',
    description: 'Connect with industry leaders and explore new opportunities.',
    date: '2024-03-29',
    time: '11:00',
    location: 'Business Center',
    capacity: 80,
    registeredCount: 60,
    type: 'Forum',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Data Science Bootcamp',
    description: 'Intensive training in data analysis and visualization.',
    date: '2024-04-01',
    time: '10:00',
    location: 'Tech Hub',
    capacity: 60,
    registeredCount: 45,
    type: 'Workshop',
    status: 'upcoming',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
  }
];

export default function EventList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || event.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">الفعاليات القادمة</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
        استكشف فرص الإلهام والتعلم لتحقيق نجاح أكاديمي ومهني متميز
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-w-[200px]"
        >
          <option value="all">All Types</option>
          <option value="Workshop">Workshops</option>
          <option value="Seminar">Seminars</option>
          <option value="Conference">Conferences</option>
          <option value="Forum">Forums</option>
        </select>
      </div>

      {/* Event Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((event) => (
          <div key={event.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <div className="relative h-48 overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium 
                  ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' : 
                    event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' : 
                    'bg-gray-100 text-gray-800'}`}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{event.description}</p>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{format(new Date(event.date), 'MMMM d, yyyy')}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{format(new Date(`2000-01-01T${event.time}`), 'h:mm a')}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-blue-600" />
                  <span>{event.registeredCount} / {event.capacity} registered</span>
                </div>
              </div>

              <div className="mt-6">
                <button 
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  onClick={() => {/* Handle registration */}}
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}