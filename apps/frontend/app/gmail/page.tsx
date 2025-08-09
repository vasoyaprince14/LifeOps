'use client';
import { useEffect, useState } from 'react';

export default function GmailPage() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState<any>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [send, setSend] = useState({ to: '', subject: 'Hello from LifeOps', body: 'This is a test.' });

  useEffect(() => {
    const s = localStorage.getItem('lifeopsUserId') || '';
    setUserId(s);
    if (s) {
      fetch(`${api}/gmail/profile?userId=${encodeURIComponent(s)}`).then(async r => setProfile(await r.json())).catch(()=>{});
      fetch(`${api}/gmail/messages?userId=${encodeURIComponent(s)}`).then(async r => { const j=await r.json(); setMessages(Array.isArray(j)?j:[]); }).catch(()=>{});
    }
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Gmail</h1>
      <div className="grid gap-2 max-w-xl">
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="To" value={send.to} onChange={e=>setSend({...send,to:e.target.value})} />
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="Subject" value={send.subject} onChange={e=>setSend({...send,subject:e.target.value})} />
        <textarea className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="Body" rows={5} value={send.body} onChange={e=>setSend({...send,body:e.target.value})} />
        <button className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 w-max" onClick={async()=>{
          if (!userId) return alert('Set userId');
          if (!send.to) return alert('To required');
          const r = await fetch(`${api}/gmail/send`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId, ...send })});
          if (r.ok) alert('Sent'); else alert('Send failed');
        }}>Send email</button>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Profile</h2>
        <pre className="text-xs bg-slate-900 border border-slate-800 rounded p-3 overflow-auto">{JSON.stringify(profile, null, 2)}</pre>
      </div>
      <div>
        <h2 className="font-semibold mb-2">Recent messages (ids)</h2>
        <ul className="text-xs grid gap-1">
          {messages.map((m:any)=> <li key={m.id} className="border border-slate-800 rounded px-3 py-2">{m.id}</li>)}
        </ul>
      </div>
    </div>
  );
}


