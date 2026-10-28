'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Play, CheckCircle2, ShieldCheck, Calendar, Grid3X3, Film, ArrowRight, ExternalLink } from 'lucide-react';

export function AppShowcaseSection() {
  const [activeTab, setActiveTab] = useState<'review' | 'calendar' | 'kanban'>('review');

  return (
    <section className="py-12 md:py-20 bg-white border-y border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block mb-2">
            PENGALAMAN KLIEN KELAS SATU
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-950">
            Satu Dashboard Terpadu. Nol Kebingungan di WhatsApp.
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light mt-3">
            Beri klien Anda portal modern untuk mereview draf video vertikal 9:16, mengajukan revisi dengan catatan waktu presisi, dan menyetujui jadwal tayang dalam 1-klik.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex rounded-xl p-1 bg-zinc-100 border border-zinc-200/90 shadow-2xs">
            <button
              onClick={() => setActiveTab('review')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'review'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Modal Review Video 9:16</span>
            </button>
            <button
              onClick={() => setActiveTab('calendar')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Matriks Kalender & Feed IG</span>
            </button>
            <button
              onClick={() => setActiveTab('kanban')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                activeTab === 'kanban'
                  ? 'bg-white text-zinc-950 shadow-2xs'
                  : 'text-zinc-600 hover:text-zinc-950'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>SOP Produksi 5-Tahap</span>
            </button>
          </div>
        </div>

        {/* Browser Mock Frame */}
        <div className="rounded-2xl border border-zinc-200/90 bg-white shadow-xl overflow-hidden max-w-5xl mx-auto">
          {/* Browser Chrome Header */}
          <div className="bg-zinc-100/80 px-4 py-3 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-400 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-400 inline-block" />
            </div>

            <div className="bg-white border border-zinc-200/80 px-4 py-1 rounded-md text-[11px] font-mono text-zinc-500 flex items-center gap-2 max-w-xs w-full justify-center">
              <span className="text-emerald-600 font-bold">🔒</span>
              <span className="truncate">portal.cerminagency.com/{activeTab}</span>
            </div>

            <Link
              href="/portal"
              className="text-[11px] font-medium text-zinc-600 hover:text-zinc-950 flex items-center gap-1"
            >
              <span>Buka Demo</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>

          {/* Interactive Screen Preview */}
          <div className="p-6 sm:p-8 bg-zinc-50/50 min-h-[420px] flex items-center justify-center">
            {activeTab === 'review' && (
              <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row gap-6 items-center">
                <div className="w-48 sm:w-56 aspect-9/16 rounded-xl bg-zinc-900 overflow-hidden relative shadow-md shrink-0 border border-zinc-200">
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80"
                    alt="Review Video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center shadow-lg">
                      <Play className="w-5 h-5 fill-zinc-900 ml-0.5" />
                    </div>
                  </div>
                  <div className="absolute top-2 left-2 bg-zinc-900/80 text-white font-mono text-[10px] px-2 py-0.5 rounded">
                    Draf V1 (4K)
                  </div>
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      Menunggu Review Klien
                    </span>
                    <span className="text-xs font-mono text-zinc-500">Kuota SLA Revisi: 0 / 2x</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      Reels: Behind The Scenes Lighting Studio Kopi Specialty
                    </h3>
                    <p className="text-xs text-zinc-500 font-light mt-1">
                      Jadwal Tayang: 12 Oktober 2026 • Platform: Instagram & TikTok
                    </p>
                  </div>

                  <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-200/80 text-xs text-zinc-600 font-light leading-relaxed">
                    "Pencahayaan dramatis 3-point lighting saat proses seduh espresso artisan. Hook 3 detik pertama terbukti meningkatkan retensi audiens +38%."
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <Link
                      href="/portal"
                      className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-xs transition"
                    >
                      Setujui 1-Click (Siap Tayang)
                    </Link>
                    <Link
                      href="/portal"
                      className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-semibold transition"
                    >
                      Minta Revisi (Maks 2x)
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calendar' && (
              <div className="w-full max-w-3xl bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-zinc-100">
                  <span className="text-xs font-mono font-semibold text-zinc-500 uppercase">
                    Distribusi Kalender & Pratinjau Grid 3x3
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                    15 Konten Terjadwal
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(d => (
                    <div
                      key={d}
                      className={`p-2.5 rounded-xl border text-xs flex flex-col justify-between h-16 ${
                        d === 5 || d === 12
                          ? 'bg-zinc-900 text-white border-zinc-900 shadow-2xs'
                          : 'bg-zinc-50 border-zinc-200/80 text-zinc-700'
                      }`}
                    >
                      <span className="font-mono font-bold">{d} Okt</span>
                      <span className="text-[10px] truncate">
                        {d === 5 ? 'Reels' : d === 12 ? 'Carousel' : '-'}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-zinc-400 font-mono text-center pt-2">
                  Klien melihat langsung timeline penayangan bulanan secara transparan.
                </p>
              </div>
            )}

            {activeTab === 'kanban' && (
              <div className="w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-zinc-900 flex justify-between">
                    <span>1. Riset & Naskah</span>
                    <span className="font-mono text-zinc-400">2</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs space-y-1">
                    <span className="font-semibold text-zinc-800 block">Edukasi Hook TikTok</span>
                    <span className="text-[10px] text-zinc-500 font-mono">Draf Naskah</span>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-zinc-900 flex justify-between">
                    <span>2. Produksi & Edit</span>
                    <span className="font-mono text-zinc-400">3</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200 text-xs space-y-1">
                    <span className="font-semibold text-zinc-800 block">Shoot Studio 4K Batch #2</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Shooter: Dimas (DOP)</span>
                  </div>
                </div>

                <div className="bg-white border border-zinc-200 rounded-xl p-3.5 space-y-2.5">
                  <div className="text-xs font-bold text-zinc-900 flex justify-between">
                    <span>3. Siap Tayang</span>
                    <span className="font-mono text-emerald-700 font-bold">5</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-xs space-y-1">
                    <span className="font-semibold text-emerald-950 block">Promo Flash Sale Beans</span>
                    <span className="text-[10px] text-emerald-700 font-mono">Disetujui Klien</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
