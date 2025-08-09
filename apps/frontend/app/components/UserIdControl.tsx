'use client';
import { useEffect, useState } from 'react';

export function UserIdControl() {
  const [userId, setUserId] = useState('');
  useEffect(() => {
    const s = localStorage.getItem('lifeopsUserId');
    if (s) setUserId(s);
  }, []);

  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  return (
    <div className="flex items-center gap-2">
      <input
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="userId"
        className="bg-slate-900 border border-slate-700 rounded px-2 py-1 text-xs w-56"
      />
      <button
        className="text-xs px-2 py-1 rounded bg-sky-600 hover:bg-sky-500"
        onClick={() => localStorage.setItem('lifeopsUserId', userId)}
      >
        Save
      </button>
      <button
        className="text-xs px-2 py-1 rounded bg-emerald-600 hover:bg-emerald-500"
        onClick={async () => {
          const r = await fetch(`${api}/users`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: `demo+${Date.now()}@lifeops.test`, name: 'Demo User' }) });
          const j = await r.json();
          if (j?.id) {
            localStorage.setItem('lifeopsUserId', j.id);
            setUserId(j.id);
          } else {
            alert('Failed to create user');
          }
        }}
      >
        Create demo user
      </button>
    </div>
  );
}


