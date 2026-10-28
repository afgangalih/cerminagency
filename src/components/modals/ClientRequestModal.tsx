'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { PlatformType } from '@/types';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ClientRequestModalProps {
  onClose: () => void;
}

export function ClientRequestModal({ onClose }: ClientRequestModalProps) {
  const { submitClientRequest, selectedClient } = useAgency();

  const [title, setTitle] = useState('');
  const [type, setType] = useState('Reels / Video Pendek');
  const [date, setDate] = useState('2026-10-29');
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'tiktok']);
  const [notes, setNotes] = useState('');

  const togglePlatform = (p: PlatformType) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter(item => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const isReels = type.includes('Reels') || type.includes('Video') || platforms.includes('tiktok');
  const used = isReels ? selectedClient.reelsUsed : selectedClient.postsUsed;
  const max = isReels ? selectedClient.reelsMax : selectedClient.postsMax;
  const isQuotaFull = used >= max;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    submitClientRequest({
      title: title.trim(),
      type,
      platforms,
      date,
      notes
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-zinc-200 w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-7 relative animate-in fade-in zoom-in-95">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Ajukan Permintaan Konten Baru</h3>
            <p className="text-xs text-zinc-500 font-light">Untuk Brand: {selectedClient.business}</p>
          </div>
        </div>

        {isQuotaFull && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <strong>Kuota Reguler Penuh ({used}/{max}):</strong> Pengajuan ini akan diteruskan ke tim agensi sebagai slot tambahan (*Add-on*).
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Judul Ide / Konsep Promo</label>
            <input
              type="text"
              required
              placeholder="Contoh: Flash Sale 11.11 Beli 1 Gratis 1 Beans"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Format Utama</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
              >
                <option value="Reels / Video Pendek">Reels / Video Pendek</option>
                <option value="Instagram Carousel">Instagram Carousel</option>
                <option value="Single Post High-Res">Single Post High-Res</option>
                <option value="TikTok & Reels">TikTok & Reels</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1.5">Target Tanggal Tayang</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
              />
            </div>
          </div>

          {/* Multi-Platform Selector */}
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Platform Distribusi</label>
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'instagram' as PlatformType, label: '📸 Instagram' },
                { id: 'tiktok' as PlatformType, label: '🎵 TikTok' },
                { id: 'youtube_shorts' as PlatformType, label: '🔴 YouTube Shorts' }
              ].map(p => {
                const isSelected = platforms.includes(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => togglePlatform(p.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
                      isSelected 
                        ? 'bg-zinc-900 text-white border-zinc-900' 
                        : 'bg-zinc-50 text-zinc-600 border-zinc-200 hover:bg-zinc-100'
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Catatan Pesan / Brief Konsep</label>
            <textarea
              rows={3}
              placeholder="Jelaskan poin utama yang wajib masuk ke dalam naskah/visual..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2 text-sm text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
            />
          </div>

          <div className="pt-2 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-zinc-200 text-zinc-600 text-xs hover:bg-zinc-50 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center gap-1.5 transition shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Kirim Pengajuan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
