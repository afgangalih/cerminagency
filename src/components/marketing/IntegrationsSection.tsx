'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Share2, Sparkles, CheckCircle2 } from 'lucide-react';

export function IntegrationsSection() {
  const tools = [
    { name: 'Google Drive 4K', category: 'Penyimpanan Master File', tag: 'Native' },
    { name: 'WhatsApp Business API', category: 'Ping Notifikasi Otomatis', tag: 'Fast' },
    { name: 'Instagram Graph API', category: 'Simulasi Feed 3x3', tag: 'Official' },
    { name: 'TikTok Creator Studio', category: 'Format Video 9:16', tag: 'Verified' },
    { name: 'Adobe Premiere Pro', category: 'Export Metadata Draf', tag: 'Workflow' },
    { name: 'Frame.io Cloud', category: 'Penyuntingan Kolaboratif', tag: 'Pro' },
    { name: 'Figma & Design Kits', category: 'Brand Guidelines Kit', tag: 'Creative' },
    { name: 'Stripe & Midtrans', category: 'Otomatisasi DP 50%', tag: 'Fintech' }
  ];

  return (
    <section id="integrations" className="py-20 md:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-zinc-800/30 via-zinc-700/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300">
              <Share2 className="w-3.5 h-3.5 text-zinc-200" />
              <span>1,000+ Integrasi Cloud</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
              Supercharge Platform Agensi Anda.
            </h2>

            <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
              Hubungkan ekosistem kerja produksi Anda mulai dari Google Drive master raw, pengingat WhatsApp otomatis, hingga API platform sosial media untuk efisiensi maksimal.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/portal"
                className="px-6 py-3 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition shadow-xs flex items-center gap-2"
              >
                <span>Coba Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Integration Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {tools.map((t, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 hover:border-zinc-700 transition flex flex-col justify-between space-y-3"
              >
                <div className="flex justify-between items-start">
                  <span className="w-8 h-8 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center font-mono font-bold text-xs text-white">
                    {t.name.substring(0, 2).toUpperCase()}
                  </span>
                  <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
                    {t.tag}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5 truncate">{t.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
