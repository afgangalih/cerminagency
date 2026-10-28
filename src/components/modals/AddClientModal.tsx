'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { X, Building2, User, Mail, Phone, ShieldCheck, Sparkles } from 'lucide-react';

interface AddClientModalProps {
  onClose: () => void;
}

const PACKAGE_OPTIONS = [
  {
    name: 'Starter Growth (8 Reels & TikTok)',
    reels: 8,
    posts: 12,
    price: 'Rp 7.500.000',
    dp: 'Rp 3.750.000'
  },
  {
    name: 'Signature Retainer (15 Reels & TikTok)',
    reels: 15,
    posts: 20,
    price: 'Rp 13.500.000',
    dp: 'Rp 6.750.000'
  },
  {
    name: 'Scale Enterprise (30 Reels & Omnichannel)',
    reels: 30,
    posts: 35,
    price: 'Rp 25.000.000',
    dp: 'Rp 12.500.000'
  }
];

export function AddClientModal({ onClose }: AddClientModalProps) {
  const { addClient, triggerNotification } = useAgency();

  const [business, setBusiness] = useState('');
  const [name, setName] = useState('');
  const [instagram, setInstagram] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPkgIndex, setSelectedPkgIndex] = useState(1);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [picAssigned, setPicAssigned] = useState('Reza (Creative Lead)');
  const [briefNotes, setBriefNotes] = useState('');

  const currentPkg = PACKAGE_OPTIONS[selectedPkgIndex];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!business.trim() || !name.trim()) {
      triggerNotification('Mohon lengkapi nama brand dan nama penanggung jawab.');
      return;
    }

    const clientId = `CK-${Math.floor(100 + Math.random() * 900)}`;
    const invoiceNumber = `INV/CK/2026/${Math.floor(1000 + Math.random() * 9000)}`;

    addClient({
      id: clientId,
      business: business.trim(),
      name: name.trim(),
      instagram: instagram.trim().startsWith('@') ? instagram.trim() : `@${instagram.trim() || 'brand'}`,
      email: email.trim() || `${business.toLowerCase().replace(/\s+/g, '')}@brand.com`,
      package: currentPkg.name,
      reelsUsed: 0,
      reelsMax: currentPkg.reels,
      postsUsed: 0,
      postsMax: currentPkg.posts,
      totalValue: currentPkg.price,
      dpAmount: currentPkg.dp,
      paymentTerm: 'Termin 1 (DP 50%)',
      status: isUnlocked ? 'Aktif Resmi (Lunas DP)' : 'Menunggu Verifikasi DP',
      isUnlocked,
      transferProof: isUnlocked ? 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600' : null,
      invoiceNumber,
      briefNotes: briefNotes.trim() || 'Klien baru didaftarkan langsung melalui Dasbor Komando Agensi.',
      registeredAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      picAssigned
    });

    triggerNotification(`Klien baru "${business}" berhasil ditambahkan dengan ID ${clientId}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-xl rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95 max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-zinc-900">Tambah Klien Baru</h3>
            <p className="text-xs text-zinc-500 font-light">
              Daftarkan brand klien ke ekosistem Cermin Kreatif dan tentukan alokasi kuota retainer.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Nama Brand / Perusahaan <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                placeholder="Contoh: Kopi Tuku Nusantara"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">
                Nama PIC (Penanggung Jawab) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Contoh: Andi Pratama"
                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Username Instagram</label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@kopituku"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Email Klien</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="andi@tuku.id"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">WhatsApp PIC</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="08123456789"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>
          </div>

          {/* Package Selection */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-2">Pilihan Paket Retainer Kontrak</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {PACKAGE_OPTIONS.map((pkg, idx) => (
                <button
                  key={pkg.name}
                  type="button"
                  onClick={() => setSelectedPkgIndex(idx)}
                  className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                    selectedPkgIndex === idx
                      ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                      : 'border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100/70 text-zinc-800'
                  }`}
                >
                  <div className="font-semibold text-xs leading-snug">{pkg.name.split(' (')[0]}</div>
                  <div className={`text-[11px] font-mono mt-1 ${selectedPkgIndex === idx ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {pkg.price} / bln
                  </div>
                  <div className={`text-[10px] mt-1 font-mono ${selectedPkgIndex === idx ? 'text-emerald-300' : 'text-emerald-700'}`}>
                    Kuota: {pkg.reels} Video Reels
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">PIC Creative Lead Agensi</label>
              <select
                value={picAssigned}
                onChange={(e) => setPicAssigned(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                <option value="Reza (Creative Lead)">Reza (Creative Lead)</option>
                <option value="Dimas (Director of Photography)">Dimas (Director of Photography)</option>
                <option value="Maya (Content Strategist)">Maya (Content Strategist)</option>
                <option value="Bayu (Senior Video Editor)">Bayu (Senior Video Editor)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Status Verifikasi DP Awal</label>
              <div className="flex items-center gap-2 pt-1.5">
                <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-zinc-800">
                  <input
                    type="checkbox"
                    checked={isUnlocked}
                    onChange={(e) => setIsUnlocked(e.target.checked)}
                    className="w-4 h-4 rounded border-zinc-300 accent-zinc-900"
                  />
                  <span>Langsung Verifikasi DP 50% (Akses Langsung Buka)</span>
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Catatan Tambahan / Brief Awal</label>
            <textarea
              rows={2}
              value={briefNotes}
              onChange={(e) => setBriefNotes(e.target.value)}
              placeholder="Target audiens, fokus produk, gaya visual..."
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition shadow-sm cursor-pointer"
            >
              Simpan & Daftarkan Klien
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
