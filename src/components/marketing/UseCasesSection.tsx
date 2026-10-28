'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Share2, Palette, Sparkles, ArrowRight } from 'lucide-react';

export function UseCasesSection() {
  const cases = [
    {
      icon: Film,
      title: 'Rumah Produksi & Video Agencies',
      description: 'Kumpulkan asset RAW, atur jadwal shooting fisik di studio, tinjau color grading, dan kelola persetujuan draf video 9:16 vertikal secara terpusat.',
      linkText: 'Pelajari Alur Video →'
    },
    {
      icon: Share2,
      title: 'Agensi Social Media Retainer',
      description: 'Kelola kalender penayangan bulanan 1–31, pratinjau feed Instagram 3x3 sebelum tayang, dan atur kuota video bulanan tanpa repot.',
      linkText: 'Eksplorasi Kalender →'
    },
    {
      icon: Palette,
      title: 'Studio Desain & Branding',
      description: 'Bagikan brand guidelines, cover carousel, poster grafis resolusi tinggi, dan dapatkan umpan balik terstruktur dari klien.',
      linkText: 'Lihat Format Desain →'
    },
    {
      icon: Sparkles,
      title: 'Brand E-Commerce & Retail',
      description: 'Kirimkan sampel produk ke studio Malang, pantau progres unboxing & shoot komersial, serta terima video siap iklan berskala tinggi.',
      linkText: 'Kolaborasi Brand →'
    }
  ];

  return (
    <section id="use-cases" className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
            FLEKSIBILITAS INDUSTRI
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Use Cases: Dibangun untuk Agensi Kreatif Modern
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
            Gunakan Cermin Kreatif untuk menyederhanakan alur kerja peninjauan konten, operasional studio fisik, dan penagihan faktur klien.
          </p>
        </div>

        {/* 4 Use Case Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cases.map((c, idx) => {
            const Icon = c.icon;
            return (
              <div
                key={idx}
                className="p-7 rounded-2xl bg-zinc-50/70 border border-zinc-200/90 hover:border-zinc-300 hover:bg-white hover:shadow-xs transition duration-200 flex flex-col justify-between space-y-6 group"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center text-zinc-800 shadow-2xs group-hover:scale-105 transition">
                    <Icon className="w-6 h-6 stroke-[1.75]" />
                  </div>

                  <h3 className="text-base font-bold text-zinc-900 tracking-tight leading-snug">
                    {c.title}
                  </h3>

                  <p className="text-xs text-zinc-600 font-light leading-relaxed">
                    {c.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-zinc-200/60">
                  <Link
                    href="/portal"
                    className="text-xs font-semibold text-zinc-900 group-hover:underline flex items-center gap-1"
                  >
                    <span>{c.linkText}</span>
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
