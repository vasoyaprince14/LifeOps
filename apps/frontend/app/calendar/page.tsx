'use client';
import { useEffect, useState } from 'react';

export default function CalendarPage() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [userId, setUserId] = useState('');
  const [events, setEvents] = useState<any[]>([]);
  const [form, setForm] = useState({ title: 'Meeting', startsAt: '', endsAt: '', location: '' });

  useEffect(() => {
    const s = localStorage.getItem('lifeopsUserId') || '';
    setUserId(s);
    if (s) refresh(s);
  }, []);

  async function refresh(id: string) {
    const r = await fetch(`${api}/calendar/events?userId=${encodeURIComponent(id)}`);
    const j = await r.json();
    setEvents(Array.isArray(j) ? j : []);
  }

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Calendar</h1>
      <div className="grid gap-2 max-w-xl">
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} />
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="Start (YYYY-MM-DDTHH:mm)" value={form.startsAt} onChange={e=>setForm({...form,startsAt:e.target.value})} />
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="End (YYYY-MM-DDTHH:mm)" value={form.endsAt} onChange={e=>setForm({...form,endsAt:e.target.value})} />
        <input className="bg-slate-900 border border-slate-700 rounded px-3 py-2" placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} />
        <button
          className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500 w-max"
          onClick={async ()=>{
            if (!userId) return alert('Set userId');
            if (!form.startsAt || !form.endsAt) return alert('Start/End required');
            const r = await fetch(`${api}/calendar/events`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ userId, ...form })});
            if (r.ok) refresh(userId); else alert('Create failed');
          }}
        >Create event</button>
      </div>
      <div className="grid gap-2">
        <h2 className="font-semibold">Upcoming</h2>
        <ul className="text-sm grid gap-1">
          {events.map((e:any)=> <li key={e.id} className="border border-slate-800 rounded px-3 py-2">
            <div className="font-medium">{e.summary || e.title || '(no title)'}</div>
            <div className="opacity-70">{e.start?.dateTime || e.start?.date} → {e.end?.dateTime || e.end?.date}</div>
          </li>)}
        </ul>
      </div>
    </div>
  );
}


