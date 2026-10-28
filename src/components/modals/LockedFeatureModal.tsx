'use client';

import React from 'react';
import { Lock, Unlock, ArrowRight, MessageSquare, X } from 'lucide-react';
import { useAgency } from '@/context/AgencyContext';

interface LockedFeatureModalProps {
  onClose: () => void;
}

export function LockedFeatureModal({ onClose }: LockedFeatureModalProps) {
  const { toggleAccountStatus, selectedClient } = useAgency();

  const handleSimulatePayment = () => {
    toggleAccountStatus();
    onClose();
  };

  const handleOpenWhatsApp = () => {
    const text = encodeURIComponent(
      `Halo Tim Cermin Kreatif, saya sedang mencoba mode demo di web untuk brand ${selectedClient.business}.\n` +
      `Saya ingin membuka akses kalender kerja resmi dan konfirmasi pembayaran DP 50%. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-md rounded-2xl shadow-2xl p-6 sm:p-8 relative text-center animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto mb-4 border border-amber-200 shadow-sm">
          <Lock className="w-7 h-7" />
        </div>

        <h3 className="text-lg font-semibold text-zinc-900">Fitur Ini Terkunci (Mode Demo)</h3>
        <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-light">
          Kalender distribusi resmi dan riwayat produksi video studio aktif secara otomatis begitu pembayaran Down Payment (DP 50%) terverifikasi oleh tim agensi.
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleSimulatePayment}
            className="w-full py-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-2 transition shadow-sm cursor-pointer"
          >
            <Unlock className="w-4 h-4 text-emerald-400" />
            <span>Simulasikan Bayar DP (Buka Gembok Sekarang)</span>
          </button>

          <button
            onClick={handleOpenWhatsApp}
            className="w-full py-2.5 rounded-xl border border-zinc-200 hover:bg-zinc-50 text-zinc-700 font-medium text-xs flex items-center justify-center gap-2 transition"
          >
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Hubungi PIC Agensi via WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
}
