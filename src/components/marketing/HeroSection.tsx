'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, ArrowUpRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden bg-gradient-to-b from-zinc-50/80 via-white to-white">
      {/* Background Decorative Mesh Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-tr from-zinc-200/40 via-zinc-100/30 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top Social Proof Pill Badge */}
        <div className="inline-flex items-center gap-3 p-1 pr-4 bg-white border border-zinc-200/90 rounded-full shadow-2xs mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex -space-x-2 overflow-hidden items-center pl-1">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
              alt="Avatar 1"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
              alt="Avatar 2"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
              alt="Avatar 3"
              className="inline-block h-7 w-7 rounded-full ring-2 ring-white object-cover"
            />
          </div>
          <span className="text-xs font-semibold text-zinc-800 tracking-tight">
            Dipercaya 1.800+ Pemilik Agensi & Kreator Konten
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-950 max-w-4xl mx-auto leading-[1.1] mb-6">
          The Client Portal Built For Agencies.
        </h1>

        {/* Feature Tags & Value Tagline */}
        <div className="max-w-3xl mx-auto mb-10">
          <p className="text-base sm:text-lg text-zinc-600 leading-relaxed font-normal">
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              Client Portal
            </span>
            ,{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              Requests & Feedback
            </span>
            ,{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              Studio Tracking
            </span>
            ,{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              Subscriptions & Invoicing
            </span>
            ,{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              CRM Brand
            </span>
            , dan{' '}
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 border border-zinc-200 text-zinc-900 font-semibold text-sm mx-1">
              Reporting
            </span>
            <br className="hidden sm:inline" />
            <span className="text-zinc-500 font-light mt-2 block">
              – Onboard klien baru, tinjau naskah & video, serta kelola pembayaran secara otomatis melalui portal bermerek agensi Anda sendiri.
            </span>
          </p>
        </div>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-14">
          <Link
            href="/portal"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-sm flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Coba Portal Klien Demo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#pricing"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-800 font-semibold text-sm shadow-2xs flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <span>Lihat Paket Retainer</span>
          </a>
        </div>

        {/* Mini Trust Checklist */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>SOP 2x Putaran Revisi (Anti-Scope Creep)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Gated DP 50% & Pembayaran Resmi</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Penyimpanan Google Drive Master 4K</span>
          </div>
        </div>
      </div>
    </section>
  );
}
