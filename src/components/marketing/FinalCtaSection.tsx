'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export function FinalCtaSection() {
  return (
    <section className="py-20 md:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0,transparent_70%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>MULAI HARI INI</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight max-w-3xl mx-auto">
          Switch in Days, Not Weeks.
        </h2>

        <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
          Tingkatkan kepuasan klien, hilangkan revisi tanpa batas, dan skalakan agensi video Anda dengan satu sistem yang terbukti andal.
        </p>

        {/* 4 Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-300 font-mono">
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>14 Hari Akses Demo Penuh</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Tanpa Kartu Kredit</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Bantuan Onboarding WhatsApp</span>
          </div>
          <div className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Studio Fisik Malang Hub</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            href="/portal"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-200 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Coba Portal Klien Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="#brief-section"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-white font-semibold text-sm transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Isi Brief Kilat Brand</span>
          </a>
        </div>
      </div>
    </section>
  );
}
