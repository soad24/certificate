import React, { useState } from 'react';
import { X, Award } from 'lucide-react';
import Select from 'react-select';

interface AchievementFormProps {
  onSubmit: (data: {
    studentId: string;
    title: string;
    description: string;
    date: string;
    category: string;
    subcategory: string;
  }) => void;
  onClose: () => void;
}

export default function AchievementForm({ onSubmit, onClose }: AchievementFormProps) {
  const [formData, setFormData] = useState({
    studentId: '',
    title: '',
    description: '',
    date: '',
    category: '',
    subcategory: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const students = [
    { value: 'S12345', label: 'John Doe (S12345)' },
    { value: 'S67890', label: 'Jane Smith (S67890)' },
    { value: 'S54321', label: 'Michael Brown (S54321)' },
  ];

  const categories = [
    { value: 'StudentActivities', label: 'Student Activities - النشاط الطلابي' },
    { value: 'Excellence', label: 'Competitions and Academic Excellence - المسابقات والتفوق العلمي' },
    { value: 'Innovations', label: 'Scientific Projects and Innovations - المشاريع والابتكارات العلمية' },
  ];

  const subcategories: { [key: string]: { value: string; label: string }[] } = {
    StudentActivities: [
      { value: 'Workshop', label: 'Workshop' },
      { value: 'Conference', label: 'Conference' },
      { value: 'Lecture', label: 'Lecture' },
    ],
    Excellence: [
      { value: 'ScienceCompetition', label: 'Science Competition' },
      { value: 'Skills', label: 'Skills' },
      { value: 'Sport', label: 'Sport' },
    ],
    Innovations: [
      { value: 'Research', label: 'Research' },
      { value: 'Technology', label: 'Technology' },
      { value: 'Inventors', label: 'Inventors' },
    ],
  };

  const selectedSubcategories =
    subcategories[formData.category] || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <Award className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold">Add Achievement</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Student ID
            </label>
            <Select
              options={students}
              placeholder="Search for a student..."
              onChange={(selectedOption) =>
                setFormData({ ...formData, studentId: selectedOption?.value || '' })
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter achievement title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe the achievement"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Select
              options={categories}
              placeholder="Select a category..."
              onChange={(selectedOption) =>
                setFormData({
                  ...formData,
                  category: selectedOption?.value || '',
                  subcategory: '', // Clear subcategory on category change
                })
              }
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          {selectedSubcategories.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Activity Type
              </label>
              <Select
                options={selectedSubcategories}
                placeholder="Select Activity Type:"
                onChange={(selectedOption) =>
                  setFormData({ ...formData, subcategory: selectedOption?.value || '' })
                }
                className="react-select-container"
                classNamePrefix="react-select"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
