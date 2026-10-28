'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { PlatformType, ContentStage } from '@/types';
import { X, Plus, Calendar, Film, Image as ImageIcon, Sparkles } from 'lucide-react';

interface AddContentModalProps {
  onClose: () => void;
}

export function AddContentModal({ onClose }: AddContentModalProps) {
  const { clientPipeline, selectedClientId, addContentItem, triggerNotification } = useAgency();

  const [clientId, setClientId] = useState(selectedClientId || (clientPipeline[0]?.id || ''));
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Reels / Video Pendek');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [platforms, setPlatforms] = useState<PlatformType[]>(['instagram', 'tiktok']);
  const [stage, setStage] = useState<ContentStage>('production');
  const [caption, setCaption] = useState('');
  const [mediaUrl, setMediaUrl] = useState('https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80');

  const togglePlatform = (p: PlatformType) => {
    if (platforms.includes(p)) {
      if (platforms.length > 1) {
        setPlatforms(platforms.filter(item => item !== p));
      }
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      triggerNotification('Judul konsep konten wajib diisi.');
      return;
    }

    addContentItem({
      clientId,
      title: title.trim(),
      type,
      platforms,
      date,
      stage,
      status: stage === 'scheduled' ? 'Disetujui' : stage === 'review' ? 'Menunggu Review' : stage === 'revision' ? 'Perlu Revisi' : 'Sedang Edit',
      statusColor: stage === 'scheduled' ? 'emerald' : stage === 'review' ? 'amber' : stage === 'revision' ? 'rose' : 'slate',
      ballInCourt: stage === 'review' ? 'client' : 'agency',
      version: 'V1',
      caption: caption.trim() || 'Draf naskah & konsep visual dibuat oleh tim kreatif Cermin.',
      mediaUrl: mediaUrl.trim() || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80'
    });

    triggerNotification(`Konten "${title}" berhasil dijadwalkan!`);
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

        <div className="flex items-center gap-2.5 mb-5">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Jadwalkan Konten Baru</h3>
            <p className="text-xs text-zinc-500 font-light">Input konsep, naskah, format platform, dan tanggal penayangan kalender.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Target Klien</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                {clientPipeline.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.business} ({c.name})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Tanggal Tayang</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Judul Konsep Konten <span className="text-rose-500">*</span></label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Reels: 3 Alasan Mengapa Kopi Dingin Lebih Nikmat"
              className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Format Konten</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                <option value="Reels / Video Pendek">Reels / Video Pendek (9:16)</option>
                <option value="TikTok & Reels">TikTok & Reels Vertical 4K</option>
                <option value="Instagram Carousel">Instagram Carousel (1:1 / 4:5)</option>
                <option value="Single Post High-Res">Single Post High-Res Foto</option>
                <option value="YouTube Shorts">YouTube Shorts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Tahapan SOP Awal</label>
              <select
                value={stage}
                onChange={(e) => setStage(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                <option value="script">1. Riset & Naskah</option>
                <option value="production">2. Produksi & Edit</option>
                <option value="review">3. Menunggu Review Klien</option>
                <option value="revision">4. Perlu Revisi Editor</option>
                <option value="scheduled">5. Siap Tayang (Disetujui)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1.5">Platform Distribusi</label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => togglePlatform('instagram')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  platforms.includes('instagram')
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                Instagram
              </button>
              <button
                type="button"
                onClick={() => togglePlatform('tiktok')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  platforms.includes('tiktok')
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                TikTok
              </button>
              <button
                type="button"
                onClick={() => togglePlatform('youtube_shorts')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition cursor-pointer ${
                  platforms.includes('youtube_shorts')
                    ? 'bg-zinc-900 border-zinc-900 text-white'
                    : 'bg-zinc-50 border-zinc-200 text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                YouTube Shorts
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">URL Media / Thumbnail Visual</label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Draf Copywriting & Caption</label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Tulis hook 3 detik pertama, isi pesan, CTA, dan hashtag..."
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium transition cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition shadow-sm cursor-pointer"
            >
              Simpan Konten
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
