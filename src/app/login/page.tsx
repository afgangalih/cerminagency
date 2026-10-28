'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAgency } from '@/context/AgencyContext';
import { ArrowLeft, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentUser, setAccountType, triggerNotification } = useAgency();

  const [email, setEmail] = useState('budi@mavencoffee.id');
  const [password, setPassword] = useState('password123');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({
      id: 'usr-001',
      email: email,
      fullName: 'Budi Santoso',
      role: email.includes('admin') ? 'admin' : 'client',
      businessName: 'Maven Coffee Roasters',
      instagramHandle: '@mavencoffee'
    });
    setAccountType('official');
    triggerNotification('Berhasil masuk sebagai Klien Resmi (DP Lunas).');
    
    if (email.includes('admin')) {
      router.push('/admin');
    } else {
      router.push('/portal');
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-zinc-50">
      <div className="w-full max-w-sm bg-white border border-zinc-200 rounded-2xl p-7 shadow-xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-900 mb-6 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Landing Page</span>
        </Link>

        <div className="text-center mb-6">
          <div className="w-11 h-11 rounded-xl bg-zinc-900 text-white font-bold flex items-center justify-center mx-auto mb-3 shadow-sm text-sm">
            CK
          </div>
          <h2 className="text-lg font-semibold text-zinc-900">Portal Klien Cermin Kreatif</h2>
          <p className="text-xs text-zinc-500 mt-1 font-light">Masuk untuk meninjau kalender konten & approval video.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Email Klien</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            <span>Masuk Portal Klien</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-between items-center text-xs text-zinc-500">
          <Link href="/portal" className="text-zinc-600 hover:text-zinc-900 hover:underline">
            Coba Demo Langsung →
          </Link>
          <Link href="/admin" className="text-zinc-600 hover:text-zinc-900 font-mono text-[11px]">
            Masuk Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
