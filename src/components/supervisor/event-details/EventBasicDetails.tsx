import React, { useState } from 'react';
import { Folder, User } from 'lucide-react';
import { staff } from '../../../types/department';

interface EventBasicDetailsProps {
  title: string;
  description: string;
  category: string;
  staffId: string;
  presenter: string;
  onTitleChange: (title: string) => void;
  onDescriptionChange: (description: string) => void;
  onCategoryChange: (category: string) => void;
  onStaffChange: (id: string) => void;
  onPresenterChange: (name: string) => void;
}

const categories = [
  { id: 'StudentActivites', label: 'Student Activities - النشاط الطلابي' },
  { id: 'Excellence', label: 'Competitions and Academic Excellence - المسابقات والتفوق العلمي' },
  { id: 'Innovations', label: 'Scientific Projects and Innovations - المشاريع والابتكارات العلمية' }
];

const categoryOptions = {
  StudentActivites: ['Workshop', 'Conference', 'Lecture'],
  Excellence: ['Science Competition', 'Skills', 'Sport'],
  Innovations: ['Research', 'Technology', 'Inventors']
};

const EventBasicDetails = ({
  title,
  description,
  category,
  staffId,
  presenter,
  onTitleChange,
  onDescriptionChange,
  onCategoryChange,
  onStaffChange,
  onPresenterChange
}: EventBasicDetailsProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(category);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('');
  const [eventLanguages, setEventLanguages] = useState<string[]>([]); // Tracks multiple languages

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    setSelectedSubCategory(''); // Reset subcategory when changing category
    onCategoryChange(selectedCategory); // Notify parent component
  };

  const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const subCategory = e.target.value;
    setSelectedSubCategory(subCategory);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      setEventLanguages((prev) => [...prev, value]); // Add selected language
    } else {
      setEventLanguages((prev) => prev.filter((lang) => lang !== value)); // Remove deselected language
    }
  };

  return (
    <div className="space-y-6">
      {/* Event Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Event Title
        </label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event title"
        />
      </div>

      {/* Event Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          required
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter event description"
        />
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Category
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a category:</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Subcategory Selection */}
      {selectedCategory && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Activity Type
          </label>
          <select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Activity Type:</option>
            {categoryOptions[selectedCategory]?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Staff Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Required By (Staff Member)
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              required
              value={staffId}
              onChange={(e) => onStaffChange(e.target.value)}
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select staff member...</option>
              {staff.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} - {s.position}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Presenter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Speaker/Presenter
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              required
              value={presenter}
              onChange={(e) => onPresenterChange(e.target.value)}
              placeholder="Enter speaker name"
              className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Event Language Checkbox */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Language
        </label>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="english"
            value="english"
            checked={eventLanguages.includes('english')}
            onChange={handleLanguageChange}
            className="h-4 w-4 text-blue-500"
          />
          <label htmlFor="english" className="ml-2 text-sm">
            English
          </label>
        </div>
        <div className="flex items-center mt-2">
          <input
            type="checkbox"
            id="arabic"
            value="arabic"
            checked={eventLanguages.includes('arabic')}
            onChange={handleLanguageChange}
            className="h-4 w-4 text-blue-500"
          />
          <label htmlFor="arabic" className="ml-2 text-sm">
            Arabic
          </label>
        </div>
        <p className="mt-2 text-sm text-gray-500">
          {eventLanguages.length > 0
            ? `The event will be presented in ${eventLanguages.join(' and ')}.`
            : 'Please select the languages for presenting the event.'}
        </p>
      </div>
    </div>
  );
};

export default EventBasicDetails;
