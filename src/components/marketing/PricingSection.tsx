'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Check, Star, ArrowRight, Sparkles } from 'lucide-react';

export function PricingSection() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      id: 'starter',
      name: 'Starter Growth',
      tagline: 'Ideal untuk brand lokal & UMKM yang ingin konsistensi konten berkualitas tinggi.',
      monthlyPrice: 'Rp 7.500.000',
      annualPrice: 'Rp 6.000.000',
      quota: '8 Video Reels/TikTok + 12 Feed',
      popular: false,
      features: [
        'Akses Portal Klien Bermerek',
        '8 Video Reels/TikTok (9:16 Vertikal)',
        '12 Single Post & Carousel Feeds',
        'SOP Revisi Maksimal 2x (Anti-Scope Creep)',
        'Matriks Kalender Distribusi 1–31',
        'Penyimpanan Google Drive Master 4K',
        'Integrasi Bukti Transfer DP 50%'
      ],
      notIncluded: [
        'Sesi Syuting Fisik Studio Malang',
        'Pengingat WhatsApp Otomatis',
        'Dedicated Creative Lead'
      ]
    },
    {
      id: 'signature',
      name: 'Signature Retainer',
      tagline: 'Paling diminati. Solusi terlengkap untuk skala brand nasional.',
      monthlyPrice: 'Rp 13.500.000',
      annualPrice: 'Rp 10.800.000',
      quota: '15 Video Reels/TikTok 4K + 20 Feed',
      popular: true,
      features: [
        'Semua fitur Starter Growth',
        '15 Video Reels/TikTok 4K Beresolusi Tinggi',
        '20 Single Post & Carousel Feeds',
        'Termasuk Syuting Fisik di Studio Malang',
        'Dual Simulator: Feed IG 3x3 & TikTok 9:16',
        'Sistem Radar Pengingat WhatsApp',
        'Hak Pembelian Slot Tambahan (+Rp 450rb/video)',
        'Dedicated Creative Lead & DOP Kamera'
      ],
      notIncluded: [
        'White-label Custom Domain Penuh'
      ]
    },
    {
      id: 'enterprise',
      name: 'Scale Enterprise',
      tagline: 'Dirancang untuk korporasi, brand fashion, dan multi-channel campaign besar.',
      monthlyPrice: 'Rp 25.000.000',
      annualPrice: 'Rp 20.000.000',
      quota: '30+ Video Reels / Omnichannel',
      popular: false,
      features: [
        'Semua fitur Signature Retainer',
        '30+ Video Reels, TikTok & YouTube Shorts',
        'Unlimited Carousel & Foto Komersial',
        'White-label Custom Domain Klien Penuh',
        'Dedicated Kru Produksi Lengkap (DOP, Editor, Lead)',
        'Penyediaan Talenta Talent / Model On-Camera',
        'SLA Review Prioritas (<24 Jam)',
        'Concierge Onboarding VIP'
      ],
      notIncluded: []
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-28 bg-white border-t border-zinc-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-400 font-semibold block">
            SKEMA INVESTASI TRANSPARAN
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-950">
            Clear Fair Pricing — Tanpa Biaya Tersembunyi
          </h2>
          <p className="text-sm sm:text-base text-zinc-500 font-light leading-relaxed">
            Pilih paket retainer produksi konten yang sesuai dengan fase pertumbuhan bisnis Anda. Semua paket didukung oleh portal persetujuan dan jaminan kualitas 4K.
          </p>

          {/* Billing Switcher (Monthly vs Annual) */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex items-center p-1 bg-zinc-100 rounded-xl border border-zinc-200 shadow-2xs">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-zinc-950 shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                Bulanan (Monthly)
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-zinc-900 text-white shadow-2xs'
                    : 'text-zinc-600 hover:text-zinc-950'
                }`}
              >
                <span>Tahunan (Annual)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-emerald-500 text-white font-bold">
                  Hemat 20%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {plans.map(plan => {
            const isPopular = plan.popular;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`p-8 rounded-3xl border flex flex-col justify-between transition duration-200 relative ${
                  isPopular
                    ? 'bg-zinc-950 text-white border-zinc-900 shadow-xl ring-2 ring-zinc-900'
                    : 'bg-white text-zinc-900 border-zinc-200/90 shadow-2xs hover:shadow-xs'
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-white text-zinc-950 font-bold font-mono text-[10px] uppercase px-3 py-1 rounded-full shadow-md flex items-center gap-1 border border-zinc-200">
                    <Sparkles className="w-3 h-3 text-amber-500 fill-amber-500" />
                    <span>Dipilih 84% Brand Agensi</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold tracking-tight ${isPopular ? 'text-white' : 'text-zinc-900'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-xs font-light mt-1.5 leading-relaxed ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 pb-4 border-b border-zinc-200/60 dark:border-zinc-800">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-extrabold font-mono tracking-tight">
                        {price}
                      </span>
                      <span className={`text-xs font-mono ${isPopular ? 'text-zinc-400' : 'text-zinc-500'}`}>
                        / bln
                      </span>
                    </div>
                    <div className={`text-xs font-mono mt-1 font-semibold ${isPopular ? 'text-emerald-400' : 'text-emerald-700'}`}>
                      {plan.quota}
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 text-xs leading-relaxed">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold block ${isPopular ? 'text-zinc-400' : 'text-zinc-400'}`}>
                      Fitur Termasuk:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isPopular ? 'text-emerald-400' : 'text-zinc-900'}`} />
                        <span className={isPopular ? 'text-zinc-200 font-light' : 'text-zinc-700 font-light'}>
                          {feat}
                        </span>
                      </div>
                    ))}

                    {plan.notIncluded.length > 0 && (
                      <div className="pt-2 space-y-2 opacity-60">
                        {plan.notIncluded.map((noFeat, i) => (
                          <div key={i} className="flex items-start gap-2.5 text-zinc-400 line-through">
                            <span className="w-4 h-4 shrink-0 flex items-center justify-center font-bold">✕</span>
                            <span>{noFeat}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-8">
                  <a
                    href="#brief-section"
                    className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                      isPopular
                        ? 'bg-white text-zinc-950 hover:bg-zinc-200 shadow-sm'
                        : 'bg-zinc-900 text-white hover:bg-zinc-800 shadow-2xs'
                    }`}
                  >
                    <span>Pilih {plan.name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
