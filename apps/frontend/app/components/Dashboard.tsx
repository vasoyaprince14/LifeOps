'use client';
import { useState } from 'react';
import { Mic, MicOff, Send, Calendar, Car, UtensilsCrossed, Mail, MapPin, CreditCard, Plus, Bell, Settings, Sun, Moon, Link2 } from 'lucide-react';
import IntegrationsPage from './IntegrationsPage';
import QuickActionModal from './QuickActionModal';

interface TaskItem {
  id: string;
  title: string;
  type: 'uber' | 'food' | 'meeting' | 'email' | 'payment';
  status: 'scheduled' | 'in-progress' | 'completed';
  time?: string;
  description?: string;
}

const QUICK_ACTIONS = [
  { icon: Car, label: 'Book Cab', color: 'bg-blue-500' },
  { icon: UtensilsCrossed, label: 'Order Food', color: 'bg-orange-500' },
  { icon: MapPin, label: 'Check Traffic', color: 'bg-green-500' },
  { icon: Mail, label: 'Email Scan', color: 'bg-purple-500' },
  { icon: CreditCard, label: 'Pay Bill', color: 'bg-red-500' },
  { icon: Calendar, label: 'Add Meeting', color: 'bg-indigo-500' },
];

export default function Dashboard() {
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [recognizing, setRecognizing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [currentView, setCurrentView] = useState<'dashboard' | 'integrations'>('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<typeof QUICK_ACTIONS[0] | null>(null);
  const [tasks, setTasks] = useState<TaskItem[]>([
    {
      id: '1',
      title: 'Uber to Airport',
      type: 'uber',
      status: 'scheduled',
      time: '2:30 PM',
      description: 'Booked for Terminal 3'
    },
    {
      id: '2',
      title: 'Team Standup',
      type: 'meeting',
      status: 'scheduled',
      time: '3:00 PM',
      description: 'Daily sync with product team'
    },
    {
      id: '3',
      title: 'Lunch from Zomato',
      type: 'food',
      status: 'completed',
      time: '1:00 PM',
      description: 'Order delivered'
    }
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const getTaskIcon = (type: string) => {
    switch (type) {
      case 'uber': return Car;
      case 'food': return UtensilsCrossed;
      case 'meeting': return Calendar;
      case 'email': return Mail;
      case 'payment': return CreditCard;
      default: return Calendar;
    }
  };

  const handleVoiceInput = () => {
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SR) {
      alert('Speech Recognition not supported');
      return;
    }
    
    const rec = new SR();
    rec.lang = 'en-US';
    rec.continuous = false;
    rec.interimResults = false;
    rec.onstart = () => setRecognizing(true);
    rec.onend = () => setRecognizing(false);
    rec.onerror = () => setRecognizing(false);
    rec.onresult = (e: any) => {
      const text = e.results[0][0].transcript;
      setInput(text);
    };
    rec.start();
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    try {
      const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      const userId = 'demo-user';
      const response = await fetch(`${url}/assistant/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, text: input })
      });
      const data = await response.json();
      setReply(data.reply || JSON.stringify(data));
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setReply('Error connecting to assistant');
    }
  };

  if (currentView === 'integrations') {
    return (
      <IntegrationsPage
        onBack={() => setCurrentView('dashboard')}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'bg-surface-dark text-white' : 'bg-surface-light text-gray-900'
    }`}>
      {/* Header */}
      <div className={`sticky top-0 z-50 ${darkMode ? 'glass' : 'glass-light'} px-6 py-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LO</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
              LifeOps
            </h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('integrations')}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              <Link2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button className="relative p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-700 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8 space-y-8">
        {/* Greeting Section */}
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold mb-2">{getGreeting()}, Prince!</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
            It's partly cloudy, 24°C in Mumbai
          </p>
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'} italic`}>
            "Success is not final, failure is not fatal: it is the courage to continue that counts."
          </p>
        </div>

        {/* AI Assistant Input */}
        <div className={`rounded-2xl p-6 shadow-soft ${
          darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
        } animate-fade-in`}>
          <h3 className="font-semibold mb-4 flex items-center">
            <div className="w-2 h-2 bg-accent-500 rounded-full mr-2 animate-pulse-soft"></div>
            AI Assistant
          </h3>
          
          <div className="flex space-x-3 mb-4">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Tell me what you need..."
              className={`flex-1 px-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                darkMode 
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>

          {/* Voice Input Button */}
          <button
            onClick={handleVoiceInput}
            className={`w-full py-4 rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
              recognizing 
                ? 'bg-red-500 hover:bg-red-600 animate-pulse-soft' 
                : 'bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-glow'
            } text-white font-medium`}
          >
            {recognizing ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            <span>{recognizing ? 'Listening...' : 'Tap to speak'}</span>
          </button>

          {reply && (
            <div className={`mt-4 p-4 rounded-xl ${
              darkMode ? 'bg-gray-800' : 'bg-gray-50'
            } animate-slide-up`}>
              <p className="text-sm">{reply}</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="animate-fade-in">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-3 gap-4">
            {QUICK_ACTIONS.map((action, index) => (
              <button
                key={action.label}
                onClick={() => {
                  setSelectedAction(action);
                  setModalOpen(true);
                }}
                className={`p-4 rounded-xl ${action.color} hover:scale-105 transition-all duration-200 text-white shadow-soft`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <action.icon className="w-6 h-6 mx-auto mb-2" />
                <span className="text-xs font-medium">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Today's Tasks */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Today's Tasks</h3>
            <button className="p-2 rounded-lg bg-primary-500 hover:bg-primary-600 text-white transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-3">
            {tasks.map((task) => {
              const IconComponent = getTaskIcon(task.type);
              return (
                <div
                  key={task.id}
                  className={`p-4 rounded-xl transition-all hover:scale-102 ${
                    darkMode ? 'bg-card-dark border border-gray-700' : 'bg-card-light border border-gray-200'
                  } shadow-soft animate-fade-in`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      task.status === 'completed' ? 'bg-accent-500' : 
                      task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}>
                      <IconComponent className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{task.title}</h4>
                        <span className="text-sm font-mono text-gray-500">{task.time}</span>
                      </div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {task.description}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.status === 'completed' ? 'bg-accent-100 text-accent-700' :
                      task.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {task.status.replace('-', ' ')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Suggestions */}
        <div className={`p-4 rounded-xl border-l-4 border-accent-500 ${
          darkMode ? 'bg-gray-800' : 'bg-accent-50'
        } animate-fade-in`}>
          <div className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-accent-500 rounded-full mt-2 animate-pulse-soft"></div>
            <div>
              <h4 className="font-medium text-accent-600 mb-1">Smart Suggestion</h4>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Leave in 10 minutes for your Airport trip to avoid traffic on the Western Express Highway.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Modal */}
      <QuickActionModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setSelectedAction(null);
        }}
        action={selectedAction}
        darkMode={darkMode}
      />
    </div>
  );
}
