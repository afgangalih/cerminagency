'use client';

import React from 'react';
import { ClientPipeline } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { X, CheckCircle2, Unlock, ExternalLink } from 'lucide-react';

interface InspectProofModalProps {
  client: ClientPipeline;
  onClose: () => void;
}

export function InspectProofModal({ client, onClose }: InspectProofModalProps) {
  const { verifyPayment } = useAgency();

  const handleVerify = () => {
    verifyPayment(client.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-semibold text-zinc-900">Inspeksi Bukti Transfer Bank</h3>
        <p className="text-xs text-zinc-500 font-light mt-0.5">
          Faktur: <strong>{client.invoiceNumber}</strong> • Brand: {client.business}
        </p>

        <div className="my-5 p-3 bg-zinc-50 rounded-xl border border-zinc-200">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="text-zinc-500">Nominal DP Tertera:</span>
            <span className="font-mono font-bold text-emerald-700">{client.dpAmount}</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-500">Termin:</span>
            <span className="font-mono text-zinc-700">{client.paymentTerm}</span>
          </div>
        </div>

        {/* Bank Slip Image Preview */}
        <div className="h-64 rounded-xl overflow-hidden bg-zinc-100 border border-zinc-200 relative mb-5">
          {client.transferProof ? (
            <img
              src={client.transferProof}
              alt="Slip Transfer Bank"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-zinc-400 font-mono">
              Belum ada gambar slip
            </div>
          )}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-zinc-200 text-zinc-600 text-xs hover:bg-zinc-50 transition"
          >
            Tutup
          </button>

          {!client.isUnlocked && (
            <button
              onClick={handleVerify}
              className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-2 transition shadow-sm cursor-pointer"
            >
              <Unlock className="w-4 h-4 text-emerald-400" />
              <span>Verifikasi & Buka Akses Kalender</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
