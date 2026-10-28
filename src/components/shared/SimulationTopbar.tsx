'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAgency } from '@/context/AgencyContext';
import { ShieldCheck, CheckCircle2, Lock, X, Sparkles } from 'lucide-react';

export function SimulationTopbar() {
  const pathname = usePathname();
  const { accountType, toggleAccountStatus, notification, triggerNotification } = useAgency();

  return (
    <>
      <header className="bg-zinc-950 border-b border-zinc-800/90 text-zinc-100 px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-50 sticky top-0 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="font-mono text-zinc-400 uppercase tracking-wider text-[10px] flex items-center gap-1.5 font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Simulasi Role:
          </span>
          <div className="inline-flex rounded-lg p-0.5 bg-zinc-900 border border-zinc-800">
            <Link
              href="/"
              className={`px-3 py-1 rounded-md text-xs transition ${
                pathname === '/'
                  ? 'bg-zinc-800 text-white font-medium shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Landing Page
            </Link>
            <Link
              href="/portal"
              className={`px-3 py-1 rounded-md text-xs transition ${
                pathname.startsWith('/portal')
                  ? 'bg-zinc-800 text-white font-medium shadow-xs'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              Portal Klien ({accountType === 'official' ? 'Resmi' : 'Demo'})
            </Link>
            <Link
              href="/admin"
              className={`px-3 py-1 rounded-md text-xs transition flex items-center gap-1.5 ${
                pathname.startsWith('/admin')
                  ? 'bg-white text-zinc-950 font-semibold shadow-xs'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dasbor Admin Cermin</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAccountStatus}
            className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition cursor-pointer ${
              accountType === 'official'
                ? 'bg-emerald-950/80 border-emerald-700/80 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/80 border-amber-700/80 text-amber-300 hover:bg-amber-900/60'
            }`}
          >
            {accountType === 'official' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Status: Klien Resmi (DP Lunas)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulasikan Bayar DP (Buka Gembok)</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Floating Toast Notification */}
      {notification && (
        <aside
          aria-label="Notifikasi sistem"
          className="fixed bottom-6 right-6 z-50 max-w-md bg-zinc-900 border border-zinc-700 text-zinc-100 px-4 py-3 rounded-xl shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">{notification}</div>
          <button
            onClick={() => triggerNotification('')}
            className="text-zinc-400 hover:text-white ml-auto cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}
    </>
  );
}
