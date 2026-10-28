'use client';

import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Apakah brand kami bisa menggunakan nama domain sendiri (white-label)?',
      a: 'Ya, pada paket Scale Enterprise atau add-on custom domain, klien akan mengakses portal review melalui subdomain brand agensi Anda (misal: portal.brandanda.com) lengkap dengan logo dan palet warna identitas Anda.'
    },
    {
      q: 'Apakah ada mode demo yang bisa dicoba gratis tanpa kartu kredit?',
      a: 'Tentu. Anda dapat langsung mengklik tombol "Coba Portal Demo" di bagian atas untuk merasakan pengalaman langsung menyetujui konten draf, mengajukan revisi 9:16 vertikal, dan melihat matriks kalender tanpa perlu memasukkan kartu kredit.'
    },
    {
      q: 'Bagaimana cara kerja batas kuota revisi (SLA 2x putaran)?',
      a: 'Untuk menjaga ketepatan jadwal posting dan melindungi efisiensi tim dari scope creep, setiap draf video berhak mendapatkan 2x putaran revisi gratis (revisi V2 dan V3). Setiap catatan revisi tersimpan rapi dalam audit trail portal. Revisi mayor di luar brief dapat ditambahkan melalui slot add-on (+Rp 450.000/video).'
    },
    {
      q: 'Bagaimana alur pembayaran DP 50% dan pelunasan kontrak?',
      a: 'Kami menerapkan protokol Two-Gate Security: Termin 1 (DP 50%) diverifikasi di awal agar tim kreatif mulai menyusun naskah dan jadwal syuting studio. Termin 2 (pelunasan) diselesaikan sebelum penyerahan master file 4K siap tayang.'
    },
    {
      q: 'Di mana file master video 4K disimpan dan diunduh?',
      a: 'Seluruh video 4K beresolusi penuh, thumbnail cover, dan file naskah tersinkronisasi otomatis ke Google Drive dedicated per brand yang tautannya disematkan permanen di dalam dashboard klien.'
    },
    {
      q: 'Bagaimana jika saya ingin berkonsultasi atau mengajukan brief khusus?',
      a: 'Anda bisa mengisi form brief kilat di bagian bawah halaman ini untuk menerbitkan faktur proforma instan, atau langsung klik tombol WhatsApp untuk terhubung dengan Creative Lead kami.'
    }
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-zinc-50/60 border-t border-zinc-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
            PERTANYAAN UMUM
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
            Jawaban penting seputar proses onboarding, termin faktur, SLA revisi, dan keamanan data agensi.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-zinc-200 bg-white overflow-hidden shadow-2xs transition"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 transition hover:bg-zinc-50/50 cursor-pointer"
                >
                  <span className="text-sm sm:text-base font-semibold text-zinc-900 leading-snug">
                    {faq.q}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center text-zinc-700 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 sm:pb-7 text-xs sm:text-sm text-zinc-600 font-light leading-relaxed border-t border-zinc-100 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
