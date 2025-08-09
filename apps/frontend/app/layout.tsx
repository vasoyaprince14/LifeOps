import '../styles/globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { UserIdControl } from './components/UserIdControl';

export const metadata: Metadata = {
  title: 'LifeOps',
  description: 'AI Life Operations Manager',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <header className="border-b border-slate-800 sticky top-0 bg-slate-950/80 backdrop-blur z-20">
          <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-4">
            <Link href="/" className="font-bold">LifeOps</Link>
            <nav className="flex gap-3 text-sm">
              <Link href="/google" className="hover:underline">Google</Link>
              <Link href="/calendar" className="hover:underline">Calendar</Link>
              <Link href="/gmail" className="hover:underline">Gmail</Link>
              <Link href="/contacts" className="hover:underline">Contacts</Link>
            </nav>
            <div className="ml-auto"><UserIdControl /></div>
          </div>
        </header>
        <main className="max-w-5xl mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}

