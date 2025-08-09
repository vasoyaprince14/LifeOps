'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [health, setHealth] = useState<string>('loading...');
  const [input, setInput] = useState('Book an Uber to the gym at 6pm');
  const [reply, setReply] = useState<string>('');
  const [recognizing, setRecognizing] = useState(false);
  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    fetch(`${url}/health`).then(async (r) => setHealth(JSON.stringify(await r.json()))).catch(() => setHealth('error'));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center gap-6 p-6">
      <h1 className="text-3xl font-bold">LifeOps</h1>
      <p className="text-sm opacity-80">Backend health: {health}</p>
      <div className="w-full max-w-3xl rounded-lg overflow-hidden border border-slate-800 p-6 text-slate-300">
        <p className="opacity-80">LifeOps is ready. Ask for anything via the Assistant below.</p>
      </div>
      <div className="w-full max-w-3xl grid gap-3">
        <div className="border border-slate-800 rounded p-3">
          <h2 className="font-semibold mb-2">Assistant</h2>
          <div className="flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} className="flex-1 bg-slate-900 border border-slate-700 rounded px-3 py-2" />
            <button
              className="px-3 py-2 rounded bg-sky-600 hover:bg-sky-500"
              onClick={async () => {
                const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const userId = 'demo-user';
                const r = await fetch(`${url}/assistant/chat`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ userId, text: input }) });
                const j = await r.json();
                setReply(j.reply || JSON.stringify(j));
              }}
            >
              Send
            </button>
            <button
              className={`px-3 py-2 rounded ${recognizing ? 'bg-red-600' : 'bg-purple-600'} hover:opacity-90`}
              onClick={() => {
                const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
                if (!SR) { alert('Speech Recognition not supported'); return; }
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
              }}
            >
              {recognizing ? 'Listening…' : '🎤 Speak'}
            </button>
          </div>
          {reply && <p className="text-sm mt-2 opacity-80">{reply}</p>}
        </div>

        <div className="border border-slate-800 rounded p-3">
          <h2 className="font-semibold mb-2">Morning Digest</h2>
          <button
            className="px-3 py-2 rounded bg-emerald-600 hover:bg-emerald-500"
            onClick={async () => {
              const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
              const userId = 'demo-user';
              const r = await fetch(`${url}/digest/morning/${userId}`);
              const j = await r.json();
              alert(JSON.stringify(j, null, 2));
            }}
          >
            Fetch Digest
          </button>
        </div>

        <div className="border border-slate-800 rounded p-3">
          <h2 className="font-semibold mb-2">Connect Google Calendar</h2>
          <button
            className="px-3 py-2 rounded bg-amber-600 hover:bg-amber-500"
            onClick={async () => {
              const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
              const userId = 'demo-user';
              const r = await fetch(`${url}/integrations/google/oauth-url?userId=${encodeURIComponent(userId)}`);
              const j = await r.json();
              if (j.url) window.location.href = j.url;
            }}
          >
            Connect Google
          </button>
        </div>
      </div>
    </main>
  );
}

