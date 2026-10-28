'use client';

import React from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, Clock, FileText, Receipt, Users, 
  BarChart3, ArrowRight, Star, Check 
} from 'lucide-react';

export function PillarsSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Client Portal',
      description: 'Sediakan portal bermerek profesional untuk klien Anda mengajukan brief, melacak progres video, dan mengakses master file tanpa utas pesan WhatsApp yang hilang.',
      linkText: 'Pelajari Portal Klien →'
    },
    {
      icon: Clock,
      title: 'Studio Ops & Tracking',
      description: 'Pantau jam kerja tim, alokasi kamera dan jadwal syuting fisik studio Malang, serta pastikan tenggat waktu video terpenuhi secara presisi.',
      linkText: 'Lihat Studio Tracking →'
    },
    {
      icon: FileText,
      title: 'Permintaan & Approval',
      description: 'Formulir brief dengan aturan kondisional, alokasi otomatis ke editor, serta persetujuan naskah & video 1-klik dengan batasan SLA revisi maks 2x.',
      linkText: 'Eksplorasi Alur SOP →'
    },
    {
      icon: Receipt,
      title: 'Billing & Subscriptions',
      description: 'Otomatisasi invoice termin (DP 50% untuk buka kalender, pelunasan sebelum rilis 4K), serta kalkulator upsell kuota video add-on (+Rp 450rb/video).',
      linkText: 'Kelola Finansial →'
    },
    {
      icon: Users,
      title: 'CRM & Profil Brand',
      description: 'Kelola profil brand klien, aset panduan visual (brand kit), tautan Instagram & TikTok, kontak PIC, serta catatan penting dalam satu tampilan terpusat.',
      linkText: 'Lihat Modul CRM →'
    },
    {
      icon: BarChart3,
      title: 'Reporting & Analytics',
      description: 'Visibilitas *real-time* atas kapasitas editor studio, kepuasan revisi klien, retensi audiens video, serta kesehatan kuota kontrak retainer.',
      linkText: 'Pantau Pelaporan →'
    }
  ];

  return (
    <section id="features" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Top Hero Grid: Value Statement & Featured Testimonial */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Heading Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
              INFRASTRUKTUR AGNESI MODERN
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.15]">
              A modern client portal for your agency.
            </h2>
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl">
              Dibangun dari nol khusus untuk agensi media sosial & rumah produksi video. Cermin Kreatif memfasilitasi onboarding klien, peninjauan naskah, persetujuan video, hingga penagihan termin faktur. Seluruhnya di bawah merek agensi Anda sendiri.
            </p>
            <div className="pt-2">
              <Link
                href="/portal"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-xs transition shadow-xs"
              >
                <span>Coba Portal Gratis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Column: Featured Scaled Testimonial */}
          <div className="lg:col-span-5 p-7 rounded-2xl bg-zinc-50 border border-zinc-200/90 shadow-2xs flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <p className="text-base sm:text-lg font-medium text-zinc-900 leading-snug">
                "Dalam 12 bulan kami berhasil <span className="underline decoration-zinc-400 font-bold">mengembangkan tim produksi dari 5 menjadi 45 personil</span> berkat sistem manajemen konten yang terstandarisasi."
              </p>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-zinc-200/60">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="James Alberts"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
              />
              <div>
                <h4 className="text-xs font-bold text-zinc-900">James Alberts</h4>
                <p className="text-[11px] text-zinc-500 font-mono">Founder, Studio Kreatif Maven</p>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Core Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-white border border-zinc-200/90 hover:border-zinc-300 hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-800 shadow-2xs group-hover:scale-105 transition">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-lg font-bold text-zinc-900 tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-100">
                  <Link
                    href="/portal"
                    className="text-xs font-semibold text-zinc-900 group-hover:underline flex items-center gap-1"
                  >
                    <span>{pillar.linkText}</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
