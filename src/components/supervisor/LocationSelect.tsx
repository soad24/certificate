import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationSelectProps {
  locationType: 'in-campus' | 'out-campus' | 'online';
  selectedHall: string;
  onLocationTypeChange: (type: 'in-campus' | 'out-campus' | 'online') => void;
  onHallChange: (hall: string) => void;
}
const inCampusHalls = [
  { id: 'adam', name: 'Adam Hall' },
  { id: 'ibtikar', name: 'Alibtikar Hall' }
];
const outCampusHalls = [
  { id: 'Museum', name: 'Oman Across Ages Museum' },
  { id: 'Cultural', name: 'Cultural Center' }
];



export default function LocationSelect({
  locationType,
  selectedHall,
  onLocationTypeChange,
  onHallChange
}: LocationSelectProps) {
  return (
    <div className="space-y-4">
      {/* Location Type Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Location Type
        </label>
        <select
          value={locationType}
          onChange={(e) =>
            onLocationTypeChange(e.target.value as 'in-campus' | 'out-campus' | 'online')
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="in-campus">In-campus Hall</option>
          <option value="out-campus">Out-campus Hall</option>
          <option value="online">Online</option>
        </select>
      </div>
  
      {/* Hall or Online Input */}
      <div>
        {locationType === 'online' ? (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Online Location or Link
            </label>
            <input
              type="text"
              value={selectedHall}
              onChange={(e) => onHallChange(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter meeting link or details"
            />
          </>
        ) : (
          <>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {locationType === 'in-campus' ? 'Select In-campus Hall' : 'Select Out-campus Hall'}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={selectedHall}
                onChange={(e) => onHallChange(e.target.value)}
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select a hall...</option>
                {locationType === 'in-campus'
                  ? inCampusHalls.map((hall) => (
                      <option key={hall.id} value={hall.id}>
                        {hall.name}
                      </option>
                    ))
                  : outCampusHalls.map((hall) => (
                      <option key={hall.id} value={hall.id}>
                        {hall.name}
                      </option>
                    ))}
              </select>
            </div>
          </>
        )}
      </div>
    </div>
  )};
  