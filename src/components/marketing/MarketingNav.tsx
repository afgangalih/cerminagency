'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function MarketingNav() {
  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-zinc-200/80 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:scale-105 transition">
            CK
          </div>
          <div>
            <span className="font-bold text-base tracking-tight text-zinc-900 block leading-tight">
              Cermin Kreatif
            </span>
            <span className="text-[10px] text-zinc-500 font-mono block">
              Agency Platform & Studio
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-zinc-700">
          <a href="#features" className="px-3.5 py-2 rounded-lg hover:text-zinc-950 hover:bg-zinc-100/70 transition">
            Platform
          </a>
          <a href="#use-cases" className="px-3.5 py-2 rounded-lg hover:text-zinc-950 hover:bg-zinc-100/70 transition">
            Use Cases
          </a>
          <a href="#pricing" className="px-3.5 py-2 rounded-lg hover:text-zinc-950 hover:bg-zinc-100/70 transition">
            Harga & Paket
          </a>
          <a href="#integrations" className="px-3.5 py-2 rounded-lg hover:text-zinc-950 hover:bg-zinc-100/70 transition">
            Integrasi
          </a>
          <a href="#faq" className="px-3.5 py-2 rounded-lg hover:text-zinc-950 hover:bg-zinc-100/70 transition">
            FAQ
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/login"
            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-semibold text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition"
          >
            Masuk Klien
          </Link>
          <Link
            href="/portal"
            className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 text-xs font-semibold shadow-2xs transition"
          >
            Coba Portal Demo
          </Link>
          <a
            href="#brief-section"
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition"
          >
            <span>Mulai Sekarang</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
}
