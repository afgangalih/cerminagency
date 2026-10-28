'use client';

import React from 'react';
import { useAgency } from '@/context/AgencyContext';
import { Plus, X, Check, DollarSign } from 'lucide-react';

interface AddOnQuotaModalProps {
  onClose: () => void;
}

export function AddOnQuotaModal({ onClose }: AddOnQuotaModalProps) {
  const { selectedClient, addQuotaSlot } = useAgency();

  const handleSelectAddOn = (reelsCount: number) => {
    addQuotaSlot(selectedClient.id, reelsCount);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Plus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Tambah Kuota Add-on Video</h3>
            <p className="text-xs text-zinc-500 font-light">Brand: {selectedClient.business}</p>
          </div>
        </div>

        <p className="text-xs text-zinc-600 leading-relaxed font-light mb-5">
          Klien membutuhkan kuota video ekstra di luar perjanjian bulanan? Tambahkan slot produksi resmi ke kontrak retainer:
        </p>

        <div className="space-y-3 mb-6">
          <button
            onClick={() => handleSelectAddOn(2)}
            className="w-full p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 bg-zinc-50 hover:bg-white text-left flex justify-between items-center transition shadow-xs group cursor-pointer"
          >
            <div>
              <div className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-800">+2 Slot Video Reels / TikTok</div>
              <div className="text-[11px] text-zinc-500 font-light mt-0.5">Termasuk shooting studio & editing finish</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-zinc-900">+Rp 900.000</span>
              <span className="block text-[10px] text-zinc-400">@Rp 450.000 / video</span>
            </div>
          </button>

          <button
            onClick={() => handleSelectAddOn(4)}
            className="w-full p-4 rounded-xl border border-zinc-200 hover:border-zinc-900 bg-zinc-50 hover:bg-white text-left flex justify-between items-center transition shadow-xs group cursor-pointer"
          >
            <div>
              <div className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-800">+4 Slot Video Reels / TikTok</div>
              <div className="text-[11px] text-zinc-500 font-light mt-0.5">Termasuk shooting studio & editing finish</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-zinc-900">+Rp 1.800.000</span>
              <span className="block text-[10px] text-zinc-400">@Rp 450.000 / video</span>
            </div>
          </button>
        </div>

        <div className="text-[11px] text-zinc-400 font-mono text-center">
          *Nilai kontrak dan batas kuota akan langsung terbarui secara otomatis.
        </div>
      </div>
    </div>
  );
}
