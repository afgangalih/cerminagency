'use client';

import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { X, Send, Sparkles } from 'lucide-react';

interface AdminRevisionModalProps {
  item: ContentItem;
  onClose: () => void;
}

export function AdminRevisionModal({ item, onClose }: AdminRevisionModalProps) {
  const { submitRevisionFix } = useAgency();
  const [resolutionNote, setResolutionNote] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitRevisionFix(item.id, resolutionNote);
    onClose();
  };

  const latestFeedback = item.feedbackHistory[item.feedbackHistory.length - 1];

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-base font-semibold text-zinc-900">Kirim Draf Revisi Baru</h3>
        <p className="text-xs text-zinc-500 font-light mt-0.5">
          Konten: <strong>{item.title}</strong>
        </p>

        {latestFeedback && (
          <div className="my-4 p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-900">
            <span className="font-semibold block mb-0.5">Catatan Masukan Klien:</span>
            <p className="font-light italic">"{latestFeedback.text}"</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">
              Penjelasan Solusi Perbaikan (Akan Tampil di Histori Klien)
            </label>
            <textarea
              rows={3}
              required
              placeholder="Contoh: 'Cover naskah sudah disesuaikan, logo monochrome putih diganti, dan audio diganti sesuai arahan.'"
              value={resolutionNote}
              onChange={(e) => setResolutionNote(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
            />
          </div>

          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 text-xs hover:bg-zinc-50"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Unggah Draf Revisi & Kembalikan ke Klien</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
