'use client';
import { useState } from 'react';
import { 
  ArrowLeft, 
  Car, 
  UtensilsCrossed, 
  MapPin, 
  Mail, 
  Calendar, 
  CreditCard, 
  CheckCircle, 
  Circle,
  ExternalLink,
  Shield,
  Zap
} from 'lucide-react';

interface Integration {
  id: string;
  name: string;
  icon: any;
  description: string;
  connected: boolean;
  category: 'transport' | 'food' | 'productivity' | 'finance' | 'utility';
  color: string;
}

const INTEGRATIONS: Integration[] = [
  {
    id: 'uber',
    name: 'Uber',
    icon: Car,
    description: 'Book rides and manage transportation',
    connected: false,
    category: 'transport',
    color: 'bg-black'
  },
  {
    id: 'zomato',
    name: 'Zomato',
    icon: UtensilsCrossed,
    description: 'Order food and manage deliveries',
    connected: false,
    category: 'food',
    color: 'bg-red-500'
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    icon: MapPin,
    description: 'Navigate and check traffic conditions',
    connected: true,
    category: 'utility',
    color: 'bg-green-500'
  },
  {
    id: 'gmail',
    name: 'Gmail',
    icon: Mail,
    description: 'Manage emails and notifications',
    connected: true,
    category: 'productivity',
    color: 'bg-red-600'
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    icon: Calendar,
    description: 'Schedule meetings and events',
    connected: true,
    category: 'productivity',
    color: 'bg-blue-500'
  },
  {
    id: 'razorpay',
    name: 'Razorpay',
    icon: CreditCard,
    description: 'Process payments and manage transactions',
    connected: false,
    category: 'finance',
    color: 'bg-blue-600'
  }
];

const CATEGORIES = {
  transport: { name: 'Transport', icon: Car },
  food: { name: 'Food & Dining', icon: UtensilsCrossed },
  productivity: { name: 'Productivity', icon: Calendar },
  finance: { name: 'Finance', icon: CreditCard },
  utility: { name: 'Utilities', icon: MapPin }
};

interface IntegrationsPageProps {
  onBack: () => void;
  darkMode: boolean;
}

export default function IntegrationsPage({ onBack, darkMode }: IntegrationsPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const filteredIntegrations = selectedCategory 
    ? integrations.filter(int => int.category === selectedCategory)
    : integrations;

  const connectedCount = integrations.filter(int => int.connected).length;

  const handleConnect = async (integration: Integration) => {
    if (integration.connected) {
      // Handle disconnect
      setIntegrations(prev => 
        prev.map(int => int.id === integration.id ? { ...int, connected: false } : int)
      );
    } else {
      // Handle connect - simulate OAuth flow
      if (integration.id === 'google-calendar' || integration.id === 'gmail') {
        try {
          const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
          const userId = 'demo-user';
          const response = await fetch(`${url}/integrations/google/oauth-url?userId=${encodeURIComponent(userId)}`);
          const data = await response.json();
          if (data.url) {
            window.location.href = data.url;
          }
        } catch (error) {
          console.error('OAuth error:', error);
        }
      } else {
        // For other integrations, simulate connection
        setIntegrations(prev => 
          prev.map(int => int.id === integration.id ? { ...int, connected: true } : int)
        );
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-surface-dark text-white' : 'bg-surface-light text-gray-900'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'glass' : 'glass-light'} px-6 py-4`}>
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
            }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Integrations</h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              {connectedCount} of {integrations.length} services connected
            </p>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <div className={`p-4 rounded-xl text-center ${
            darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
          }`}>
            <Shield className="w-6 h-6 mx-auto mb-2 text-green-500" />
            <div className="font-bold text-lg">{connectedCount}</div>
            <div className="text-xs text-gray-500">Connected</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${
            darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
          }`}>
            <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
            <div className="font-bold text-lg">24</div>
            <div className="text-xs text-gray-500">Tasks Today</div>
          </div>
          <div className={`p-4 rounded-xl text-center ${
            darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
          }`}>
            <CheckCircle className="w-6 h-6 mx-auto mb-2 text-accent-500" />
            <div className="font-bold text-lg">98%</div>
            <div className="text-xs text-gray-500">Success Rate</div>
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h3 className="font-semibold mb-4">Categories</h3>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                selectedCategory === null
                  ? 'bg-primary-500 text-white'
                  : darkMode 
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {Object.entries(CATEGORIES).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex items-center space-x-2 ${
                  selectedCategory === key
                    ? 'bg-primary-500 text-white'
                    : darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div>
          <h3 className="font-semibold mb-4">Available Services</h3>
          <div className="grid gap-4">
            {filteredIntegrations.map((integration) => (
              <div
                key={integration.id}
                className={`p-6 rounded-xl transition-all hover:scale-102 ${
                  darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
                } shadow-soft`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${integration.color}`}>
                      <integration.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg">{integration.name}</h4>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {integration.description}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        {integration.connected ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : (
                          <Circle className="w-4 h-4 text-gray-400" />
                        )}
                        <span className={`text-xs font-medium ${
                          integration.connected ? 'text-green-500' : 'text-gray-400'
                        }`}>
                          {integration.connected ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {integration.connected && (
                      <button className={`p-2 rounded-lg transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
                      }`}>
                        <ExternalLink className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => handleConnect(integration)}
                      className={`px-6 py-2 rounded-lg font-medium transition-all ${
                        integration.connected
                          ? darkMode 
                            ? 'bg-red-600 hover:bg-red-700 text-white' 
                            : 'bg-red-500 hover:bg-red-600 text-white'
                          : 'bg-primary-500 hover:bg-primary-600 text-white'
                      }`}
                    >
                      {integration.connected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Notice */}
        <div className={`p-4 rounded-xl border-l-4 border-blue-500 ${
          darkMode ? 'bg-blue-900/20' : 'bg-blue-50'
        }`}>
          <div className="flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-600 mb-1">Security & Privacy</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                All integrations use secure OAuth 2.0 authentication. We never store your passwords and can only access the specific data you authorize.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
