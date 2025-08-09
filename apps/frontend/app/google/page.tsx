'use client';
import { useEffect, useState } from 'react';

export default function GooglePage() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [userId, setUserId] = useState('');
  const [status, setStatus] = useState<any>(null);

  useEffect(() => {
    const s = localStorage.getItem('lifeopsUserId') || '';
    setUserId(s);
    if (s) fetch(`${api}/integrations/google/check?userId=${encodeURIComponent(s)}`).then(async r => setStatus(await r.json())).catch(()=>setStatus({error:'fetch failed'}));
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Google Integration</h1>
      {!userId && <p className="text-sm opacity-80">Set a userId in the header first.</p>}
      <div className="flex gap-2">
        <button
          className="px-3 py-2 rounded bg-amber-600 hover:bg-amber-500"
          onClick={async () => {
            if (!userId) return alert('Set userId first');
            const r = await fetch(`${api}/integrations/google/oauth-url?userId=${encodeURIComponent(userId)}`);
            const j = await r.json();
            if (j.url) window.location.href = j.url;
          }}
        >
          Connect / Reconnect Google
        </button>
        <button
          className="px-3 py-2 rounded bg-sky-700 hover:bg-sky-600"
          onClick={async () => {
            if (!userId) return alert('Set userId first');
            const r = await fetch(`${api}/integrations/google/check?userId=${encodeURIComponent(userId)}`);
            const j = await r.json();
            setStatus(j);
          }}
        >
          Refresh status
        </button>
      </div>
      <pre className="text-xs bg-slate-900 border border-slate-800 rounded p-3 overflow-auto">{JSON.stringify(status, null, 2)}</pre>
    </div>
  );
}


