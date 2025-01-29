import React from 'react';
import { Calendar, MapPin, Award } from 'lucide-react';
import { StudentEvent } from '../../types/student';
import { formatArabicDate } from '../../utils/certificate';

interface RegisteredEventsProps {
  events: StudentEvent[];
}

export default function RegisteredEvents({ events }: RegisteredEventsProps) {
  const completedEvents = events.filter(e => e.status === 'completed');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-lg font-semibold mb-4">الفعاليات المكتملة</h2>
        <div className="space-y-4">
          {completedEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{event.title}</h3>
                  <div className="mt-2 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 ml-2" />
                      <span>{formatArabicDate(new Date(event.date))}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 ml-2" />
                      <span>{event.type}</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="w-4 h-4 ml-2" />
                      <span>{event.points} نقطة</span>
                    </div>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  مكتمل
                </span>
              </div>
            </div>
          ))}
          {completedEvents.length === 0 && (
            <p className="text-gray-500">لا توجد فعاليات مكتملة</p>
          )}
        </div>
      </div>
    </div>
  );
}