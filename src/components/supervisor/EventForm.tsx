import React, { useState } from 'react';
import { Layout, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';
import EventBasicDetails from './event-details/EventBasicDetails';
import EventDateTime from './event-details/EventDateTime';
import EventParticipation from './event-details/EventParticipation';
import EventObjectives from './event-details/EventObjectives';
import EventAttachments from './event-details/EventAttachments';
import EventNotes from './event-details/EventNotes';
import LocationSelect from './LocationSelect';

const TABS = ['details', 'datetime', 'location', 'participation', 'additional'] as const;
type TabType = typeof TABS[number];

export default function EventForm() {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    staffId: '',
    presenter: '',
    startDate: '',
    endDate: '',
    startTime: '',
    endTime: '',
    duration: '',
    locationType: 'in-campus' as 'in-campus' | 'out-campus',
    selectedHall: '',
    maxParticipants: '',
    participationType: 'yes',
    targetAudience: '',
    genderRestriction: {
      male: false,
      female: false,
    },
    objectives: [] as string[],
    attachments: [] as File[],
    notes: '',
  });

  const validateDetailsTab = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }
    if (!formData.staffId) {
      newErrors.staffId = 'Staff member is required';
    }
    if (!formData.presenter.trim()) {
      newErrors.presenter = 'Presenter is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateDateTimeTab = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.startDate) {
      newErrors.startDate = 'Start date is required';
    }
    if (!formData.endDate) {
      newErrors.endDate = 'End date is required';
    }
    if (!formData.startTime) {
      newErrors.startTime = 'Start time is required';
    }
    if (!formData.endTime) {
      newErrors.endTime = 'End time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLocationTab = () => {
    const newErrors: Record<string, string> = {};
    
    if (formData.locationType === 'in-campus' && !formData.selectedHall) {
      newErrors.selectedHall = 'Hall selection is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateParticipationTab = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Maximum participants is required';
    }
    if (!formData.targetAudience) {
      newErrors.targetAudience = 'Target audience is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCurrentTab = () => {
    switch (activeTab) {
      case 'details':
        return validateDetailsTab();
      case 'datetime':
        return validateDateTimeTab();
      case 'location':
        return validateLocationTab();
      case 'participation':
        return validateParticipationTab();
      case 'additional':
        return true; // Additional info is optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentTab()) {
      const currentIndex = TABS.indexOf(activeTab);
      if (currentIndex < TABS.length - 1) {
        setActiveTab(TABS[currentIndex + 1]);
        setErrors({}); // Clear errors when moving to next tab
      }
    }
  };

  const handleBack = () => {
    const currentIndex = TABS.indexOf(activeTab);
    if (currentIndex > 0) {
      setActiveTab(TABS[currentIndex - 1]);
      setErrors({}); // Clear errors when moving back
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateCurrentTab()) {
      // Handle form submission
      console.log('Form submitted:', formData);
      // Here you would typically send the data to your backend
    }
  };

  const isLastTab = activeTab === TABS[TABS.length - 1];
  const isFirstTab = activeTab === TABS[0];
  const currentTabIndex = TABS.indexOf(activeTab);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm p-6 animate-fade-in">
        <div className="flex items-center space-x-3 mb-6">
          <Layout className="w-8 h-8 text-orange-600" />
          <h2 className="text-2xl font-bold">Create New Event</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <Tabs value={activeTab} className="w-full">
            <TabsList>
              {TABS.map((tab) => (
                <TabsTrigger key={tab} value={tab} className="capitalize">
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="details">
              <EventBasicDetails
                title={formData.title}
                description={formData.description}
                category={formData.category}
                staffId={formData.staffId}
                presenter={formData.presenter}
                onTitleChange={(title) => setFormData({ ...formData, title })}
                onDescriptionChange={(description) => setFormData({ ...formData, description })}
                onCategoryChange={(category) => setFormData({ ...formData, category })}
                onStaffChange={(staffId) => setFormData({ ...formData, staffId })}
                onPresenterChange={(presenter) => setFormData({ ...formData, presenter })}
              />
            </TabsContent>

            <TabsContent value="datetime">
              <EventDateTime
                startDate={formData.startDate}
                endDate={formData.endDate}
                startTime={formData.startTime}
                endTime={formData.endTime}
                onStartDateChange={(date) => setFormData({ ...formData, startDate: date })}
                onEndDateChange={(date) => setFormData({ ...formData, endDate: date })}
                onStartTimeChange={(time) => setFormData({ ...formData, startTime: time })}
                onEndTimeChange={(time) => setFormData({ ...formData, endTime: time })}
                onDurationChange={(duration) => setFormData({ ...formData, duration })}
              />
            </TabsContent>

            <TabsContent value="location">
              <LocationSelect
                locationType={formData.locationType}
                selectedHall={formData.selectedHall}
                onLocationTypeChange={(type) => setFormData({ ...formData, locationType: type })}
                onHallChange={(hall) => setFormData({ ...formData, selectedHall: hall })}
              />
            </TabsContent>

            <TabsContent value="participation">
              <EventParticipation
                maxParticipants={formData.maxParticipants}
                participationType={formData.participationType}
                targetAudience={formData.targetAudience}
                genderRestriction={formData.genderRestriction}
                onMaxParticipantsChange={(value) => setFormData({ ...formData, maxParticipants: value })}
                onParticipationTypeChange={(value) => setFormData({ ...formData, participationType: value })}
                onTargetAudienceChange={(value) => setFormData({ ...formData, targetAudience: value })}
                onGenderRestrictionChange={(gender, value) =>
                  setFormData({
                    ...formData,
                    genderRestriction: { ...formData.genderRestriction, [gender]: value },
                  })
                }
              />
            </TabsContent>

            <TabsContent value="additional">
              <div className="space-y-6">
                <EventObjectives
                  objectives={formData.objectives}
                  onAddObjective={(objective) =>
                    setFormData({ ...formData, objectives: [...formData.objectives, objective] })
                  }
                  onRemoveObjective={(index) =>
                    setFormData({
                      ...formData,
                      objectives: formData.objectives.filter((_, i) => i !== index),
                    })
                  }
                />
                <EventAttachments
                  attachments={formData.attachments}
                  onAttachmentAdd={(files) =>
                    setFormData({ ...formData, attachments: [...formData.attachments, ...files] })
                  }
                  onAttachmentRemove={(index) =>
                    setFormData({
                      ...formData,
                      attachments: formData.attachments.filter((_, i) => i !== index),
                    })
                  }
                />
                <EventNotes
                  notes={formData.notes}
                  onChange={(notes) => setFormData({ ...formData, notes })}
                />
              </div>
            </TabsContent>
          </Tabs>

          {Object.keys(errors).length > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 animate-shake">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-600 font-medium">Please fix the following errors:</p>
              </div>
              <ul className="mt-2 text-sm text-red-600 list-disc list-inside">
                {Object.values(errors).map((error, index) => (
                  <li key={index} className="animate-slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                    {error}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-between items-center space-x-4 pt-6 border-t">
            <button
              type="button"
              onClick={handleBack}
              className={`flex items-center space-x-2 px-6 py-2 border border-gray-300 rounded-lg transition-all duration-200 ${
                isFirstTab 
                  ? 'opacity-0 pointer-events-none' 
                  : 'hover:bg-gray-50 hover:border-orange-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <div className="flex-1 text-center text-sm text-gray-500">
              Step {currentTabIndex + 1} of {TABS.length}
            </div>

            {isLastTab ? (
              <button
                type="submit"
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Create Event</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center space-x-2 px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}