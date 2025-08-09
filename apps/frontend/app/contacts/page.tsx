'use client';
import { useEffect, useState } from 'react';

export default function ContactsPage() {
  const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const s = localStorage.getItem('lifeopsUserId') || '';
    setUserId(s);
    if (s) fetch(`${api}/contacts?userId=${encodeURIComponent(s)}`).then(async r => setItems(await r.json())).catch(()=>{});
  }, []);

  return (
    <div className="grid gap-4">
      <h1 className="text-2xl font-semibold">Contacts</h1>
      <ul className="text-sm grid gap-1">
        {items.map((p:any)=>{
          const name = p.names?.[0]?.displayName || '(no name)';
          const email = p.emailAddresses?.[0]?.value || '';
          return <li key={p.resourceName} className="border border-slate-800 rounded px-3 py-2 flex justify-between">
            <span>{name}</span>
            <span className="opacity-70">{email}</span>
          </li>
        })}
      </ul>
    </div>
  );
}


