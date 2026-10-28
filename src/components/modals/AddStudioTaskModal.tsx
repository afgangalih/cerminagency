'use client';

import React, { useState } from 'react';
import { useAgency } from '@/context/AgencyContext';
import { X, Film, Plus } from 'lucide-react';

interface AddStudioTaskModalProps {
  onClose: () => void;
}

export function AddStudioTaskModal({ onClose }: AddStudioTaskModalProps) {
  const { clientPipeline, selectedClientId, addStudioTask, triggerNotification } = useAgency();

  const [clientId, setClientId] = useState(selectedClientId || (clientPipeline[0]?.id || ''));
  const [title, setTitle] = useState('');
  const [phase, setPhase] = useState<'Riset & Naskah' | 'Produksi & Shoot' | 'Penyuntingan & Desain' | 'Quality Control'>('Produksi & Shoot');
  const [shooter, setShooter] = useState('Dimas (DOP Studio)');
  const [rawFolder, setRawFolder] = useState('Google Drive: /Raw-Shooting-4K');
  const [status, setStatus] = useState<'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai'>('Sedang Berjalan');
  const [progress, setProgress] = useState(25);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      triggerNotification('Judul task produksi wajib diisi.');
      return;
    }

    addStudioTask({
      clientId,
      title: title.trim(),
      phase,
      shooter,
      rawFolder,
      status,
      progress
    });

    triggerNotification(`Task studio "${title}" berhasil ditambahkan!`);
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

        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Tambah Task Produksi Studio</h3>
            <p className="text-xs text-zinc-500 font-light">
              Catat jadwal syuting fisik, penanggung jawab kamera, dan alur pengerjaan file.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-700 mb-1">Pilih Klien</label>
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
            <label className="block text-xs font-medium text-zinc-700 mb-1">Judul Task Produksi</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Syuting On-Location 5 Video Batch #2"
              className="w-full px-3.5 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Fase Operasional</label>
              <select
                value={phase}
                onChange={(e) => setPhase(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                <option value="Riset & Naskah">Riset & Naskah</option>
                <option value="Produksi & Shoot">Produksi & Shoot</option>
                <option value="Penyuntingan & Desain">Penyuntingan & Desain</option>
                <option value="Quality Control">Quality Control</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Penanggung Jawab (Shooter/Lead)</label>
              <input
                type="text"
                value={shooter}
                onChange={(e) => setShooter(e.target.value)}
                placeholder="Dimas (DOP Studio)"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Folder Master File</label>
              <input
                type="text"
                value={rawFolder}
                onChange={(e) => setRawFolder(e.target.value)}
                placeholder="Google Drive: /Raw-Shooting-4K"
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700 mb-1">Status Awal</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 bg-zinc-50/50 text-xs text-zinc-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-zinc-900 transition"
              >
                <option value="Dalam Antrean">Dalam Antrean</option>
                <option value="Sedang Berjalan">Sedang Berjalan</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-medium text-zinc-700">Progres Pengerjaan</label>
              <span className="text-xs font-mono font-semibold text-zinc-900">{progress}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value, 10))}
              className="w-full accent-zinc-900 cursor-pointer"
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
              Tambah Task Studio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
