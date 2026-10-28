'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send, CheckCircle2, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAgency } from '@/context/AgencyContext';

export function BriefFormSection() {
  const router = useRouter();
  const { submitBriefOnboarding } = useAgency();

  const [form, setForm] = useState({
    name: '',
    business: '',
    instagram: '',
    package: 'Growth Video (12 Reels + 8 Post)',
    email: '',
    notes: ''
  });

  const [submittedData, setSubmittedData] = useState<{
    clientId: string;
    invoiceNumber: string;
    waUrl: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.business) return;

    const result = submitBriefOnboarding({
      name: form.name,
      business: form.business,
      instagram: form.instagram || '@brand',
      package: form.package,
      email: form.email,
      notes: form.notes
    });

    setSubmittedData(result);
  };

  return (
    <section id="brief-section" className="py-24 px-6 border-t border-zinc-200 bg-zinc-50/70">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Jalur Kilat Langsung</span>
          <h2 className="text-3xl font-semibold text-zinc-900 mt-1.5">Formulir Brief Kebutuhan Agensi</h2>
          <p className="text-sm text-zinc-500 mt-2 font-light leading-relaxed">
            Isi data brand Anda. Sistem akan otomatis menerbitkan nomor faktur proforma, 
            mempersiapkan portal kerja Anda, dan menghubungkan Anda ke WhatsApp tim kreatif Cermin.
          </p>
        </div>

        {submittedData ? (
          <div className="bg-white border border-zinc-200 p-8 rounded-2xl shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-semibold text-zinc-900">Brief Berhasil Diterbitkan!</h3>
              <p className="text-xs text-zinc-500 mt-1 font-mono">
                No. Faktur: <strong className="text-zinc-800">{submittedData.invoiceNumber}</strong> • ID: {submittedData.clientId}
              </p>
            </div>

            <p className="text-xs text-zinc-600 leading-relaxed font-light max-w-md mx-auto">
              Akun brand Anda telah terdaftar di sistem komando agensi. Silakan lanjutkan konfirmasi ke WhatsApp PIC atau masuk ke portal klien demo untuk meninjau kalender kerja.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={submittedData.waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-sm"
              >
                <span>Buka Chat WhatsApp PIC Agensi</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => router.push('/portal')}
                className="px-6 py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition"
              >
                Buka Portal Klien Anda
              </button>
            </div>
          </div>
        ) : (
          <form 
            onSubmit={handleSubmit} 
            className="space-y-5 bg-white border border-zinc-200 p-7 sm:p-9 rounded-2xl shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">Nama Lengkap PIC</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Raditya Pratama"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">Nama Bisnis / Brand</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maven Coffee Roasters"
                  value={form.business}
                  onChange={(e) => setForm({ ...form, business: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">Instagram Brand</label>
                <input
                  type="text"
                  required
                  placeholder="@namabrand"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700 mb-1.5">Paket Retainer yang Diminati</label>
                <select
                  value={form.package}
                  onChange={(e) => setForm({ ...form, package: e.target.value })}
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                >
                  <option value="Starter Video (4 Reels Shoot)">Starter Video (4 Reels Shoot)</option>
                  <option value="Growth Video (12 Reels + 8 Post)">Growth Video (12 Reels + 8 Post)</option>
                  <option value="Full Retainer Social Media & Ads Creative">Full Retainer + Ads Creative</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Email PIC / Perusahaan</label>
              <input
                type="email"
                required
                placeholder="klien@bisnis.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Ekspektasi Goal / Masalah Utama Brand Saat Ini</label>
              <textarea
                rows={3}
                placeholder="Contoh: Butuh konten reels edukasi produk untuk target anak muda, ingin tingkatkan retensi penonton dan penjualan."
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-zinc-500 focus:bg-white transition leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-sm flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Kirim Brief & Terbitkan Akun (Otomatis Masuk Sistem & WhatsApp)</span>
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-xs text-zinc-400 font-mono text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Data aman terenkripsi & diteruskan langsung ke PIC Creative Cermin</span>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
