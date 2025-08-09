'use client';
import { useState } from 'react';
import { X, MapPin, Clock, CreditCard } from 'lucide-react';

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  action: {
    label: string;
    icon: any;
    color: string;
  } | null;
  darkMode: boolean;
}

export default function QuickActionModal({ isOpen, onClose, action, darkMode }: QuickActionModalProps) {
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');

  if (!isOpen || !action) return null;

  const handleSubmit = async () => {
    // Simulate API call
    console.log('Submitting action:', action.label, { location, time, notes });
    
    // Close modal and reset form
    onClose();
    setLocation('');
    setTime('');
    setNotes('');
  };

  const getFormFields = () => {
    switch (action.label) {
      case 'Book Cab':
        return (
          <>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Destination
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Where would you like to go?"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                When?
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="Now / 2:30 PM / In 15 minutes"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </>
        );
      case 'Order Food':
        return (
          <>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Restaurant or Cuisine
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Pizza, McDonald's, Indian food"
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Delivery Time
              </label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="ASAP / 7:00 PM / In 30 minutes"
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </>
        );
      case 'Pay Bill':
        return (
          <>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Bill Type
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
              >
                <option value="">Select bill type</option>
                <option value="electricity">Electricity</option>
                <option value="water">Water</option>
                <option value="internet">Internet</option>
                <option value="mobile">Mobile</option>
                <option value="credit-card">Credit Card</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Amount
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  placeholder="₹ 1,500"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>
          </>
        );
      default:
        return (
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Details
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter details..."
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className={`relative w-full max-w-md mx-4 p-6 rounded-2xl shadow-2xl animate-slide-up ${
        darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold">{action.label}</h2>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4 mb-6">
          {getFormFields()}
          
          <div>
            <label className={`block text-sm font-medium mb-2 ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Additional Notes (Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Any special instructions..."
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className={`flex-1 py-3 rounded-xl font-medium transition-colors ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-3 rounded-xl bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
          >
            {action.label}
          </button>
        </div>
      </div>
    </div>
  );
}
