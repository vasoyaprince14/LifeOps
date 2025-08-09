'use client';
import { useState } from 'react';

export default function SimpleDashboard() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={`min-h-screen p-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="mb-8">
        <h1 className="text-3xl font-bold">LifeOps</h1>
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Toggle Theme
        </button>
      </header>
      
      <main>
        <p>Dashboard is working correctly!</p>
      </main>
    </div>
  );
}
