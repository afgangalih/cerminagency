'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Clock, FileText, Receipt, Users, 
  BarChart3, CheckCircle2, ArrowRight, Star 
} from 'lucide-react';

export function FeatureDeepDivesSection() {
  return (
    <section className="py-20 bg-zinc-950 text-white space-y-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 p-1 px-3 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>FITUR LENGKAP PLATFORM</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Semua yang Anda Butuhkan untuk Menghadirkan Pengalaman Klien Kelas Dunia.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 font-light leading-relaxed">
            Mulai dari portal klien modern, alur peninjauan draf, kontrol revisi 2x putaran, studio tracking, hingga penagihan termin DP 50%.
          </p>
        </div>

        {/* DEEP DIVE 1: CLIENT PORTAL */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-zinc-200" />
              <span>Portal Klien Bermerek</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Portal Modern & Terpersonalisasi di Bawah Identitas Agensi Anda
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-light">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Klien login mandiri dengan nama brand & logo mereka sendiri</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual simulator: Feed Instagram 3x3 dan TikTok 9:16 vertical</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Gated fitur kalender: otomatis terkunci sebelum DP 50% terverifikasi</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pusat tautan Google Drive master 4K & kontak langsung PIC kreatif</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Link
                href="/portal"
                className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition"
              >
                Coba Portal Klien
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed italic">
              "Klien kami sangat menyukai betapa bersih dan simpelnya portal ini. Mereka merasa seperti kami membangun dashboard custom khusus untuk brand mereka."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                alt="Alex Stewart"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-700"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Alex Stewart</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Managing Partner, TeamTown Studio</p>
              </div>
            </div>
          </div>
        </div>

        {/* DEEP DIVE 2: CLIENT REQUESTS & REVISION CAP (SLA 2X) */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-6 order-2 lg:order-1 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed italic">
              "Sebagai Creative Lead, batasan SLA 2x revisi menyelamatkan agensi kami dari *scope creep*. Sekarang klien memberikan catatan yang terstruktur dan draf selesai tepat waktu."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80"
                alt="Gabriella Brigando"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-700"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Gabriella Brigando</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Operations Lead, Hey Design & Media</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-300">
              <FileText className="w-3.5 h-3.5 text-zinc-200" />
              <span>SLA Revisi & Anti-Scope Creep</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Kelola Peninjauan Draf Konten Tanpa Revisi Tanpa Akhir
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-light">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Persetujuan 1-Click Approved yang langsung mengunci status siap tayang</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Batas kuota revisi gratis maks 2x putaran per draf video</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Riwayat audit feedback transparan (siapa yang memberi catatan dan kapan)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Integrasi reminder WhatsApp jika review klien tertahan &gt;24 jam</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/admin"
                className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition"
              >
                Buka Dasbor SOP Agensi
              </Link>
            </div>
          </div>
        </div>

        {/* DEEP DIVE 3: BILLING, DP 50%, & ADD-ON QUOTA */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/70 p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-2xl">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-800 border border-zinc-700/80 text-xs font-mono text-zinc-300">
              <Receipt className="w-3.5 h-3.5 text-zinc-200" />
              <span>Finansial & Retainer</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-snug">
              Birokrasi Finansial Terstruktur & Upsell Kuota Otomatis
            </h3>

            <div className="space-y-3 text-xs sm:text-sm text-zinc-300 font-light">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Penerbitan faktur proforma instan begitu klien selesai submit brief</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Two-Gate Security: Termin 1 (DP 50%) dan Termin 2 (Pelunasan 4K)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Upsell slot video instan (+Rp 450.000 / video) saat kuota paket habis</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verifikasi slip transfer manual oleh admin sebelum akses dibuka</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="#pricing"
                className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold text-xs hover:bg-zinc-200 transition"
              >
                Lihat Skema Harga
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 p-6 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed italic">
              "Fitur favorit kami adalah kemampuan menjual slot kuota tambahan (+Add-on video) secara fleksibel tanpa harus negosiasi ulang kontrak dari awal."
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-zinc-900">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="Dylan Harrocks"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-zinc-700"
              />
              <div>
                <h4 className="text-xs font-bold text-white">Dylan Harrocks</h4>
                <p className="text-[10px] text-zinc-500 font-mono">Founder, Nexus Creative Network</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
