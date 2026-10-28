'use client';

import React, { useState } from 'react';
import { ContentItem } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { X, CheckCircle2, AlertCircle, Send, Clock, Video, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewModalProps {
  item: ContentItem;
  onClose: () => void;
}

export function ReviewModal({ item, onClose }: ReviewModalProps) {
  const { approveContent, requestRevision } = useAgency();
  const [showRevisionInput, setShowRevisionInput] = useState(false);
  const [revisionText, setRevisionText] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleApprove = () => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 }
    });
    approveContent(item.id);
    onClose();
  };

  const handleRevisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revisionText.trim()) return;

    const result = requestRevision(item.id, revisionText.trim());
    if (result.success) {
      onClose();
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-zinc-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border border-zinc-200 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in-95 my-8">
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 flex items-center justify-between bg-zinc-50/50">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono px-2.5 py-1 rounded bg-zinc-100 text-zinc-700 font-medium">
              {item.day} ({item.weekday})
            </span>
            <span className="text-xs font-mono font-bold text-zinc-900 bg-white border border-zinc-200 px-2 py-0.5 rounded">
              {item.version}
            </span>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded ${
              item.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
              item.status === 'Perlu Revisi' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
              'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {item.status}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Visual Asset 9:16 Preview */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-[260px] aspect-[9/16] rounded-xl overflow-hidden bg-zinc-900 shadow-md relative border border-zinc-200">
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-zinc-900/80 backdrop-blur text-white text-[10px] font-mono px-2 py-0.5 rounded">
                Preview Vertikal 9:16
              </div>
              <div className="absolute bottom-3 left-3 right-3 bg-zinc-900/90 backdrop-blur p-2.5 rounded-lg text-white">
                <p className="text-[10px] font-mono text-zinc-400 uppercase">{item.type}</p>
                <p className="text-xs font-medium truncate mt-0.5">{item.title}</p>
              </div>
            </div>
            
            <div className="mt-3 text-center">
              <span className="text-[11px] font-mono text-zinc-400">
                SLA Revisi: <strong>{item.revisionCount} / 2</strong> putaran terpakai
              </span>
            </div>
          </div>

          {/* Right Column: Copywriting & Feedback History */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-base font-semibold text-zinc-900 leading-snug">
                {item.title}
              </h3>
              
              <div className="mt-3 p-3.5 rounded-xl bg-zinc-50 border border-zinc-200">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide block mb-1">
                  Draf Copywriting, Hook & Caption:
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-light whitespace-pre-line">
                  {item.caption}
                </p>
              </div>

              {/* Audit Trail Feedback */}
              <div className="mt-4">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide block mb-2">
                  Riwayat Audit Feedback ({item.feedbackHistory.length}):
                </span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {item.feedbackHistory.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`p-2.5 rounded-lg text-xs ${
                        log.sender === 'Klien' 
                          ? 'bg-zinc-100 text-zinc-800 border-l-2 border-zinc-700' 
                          : 'bg-zinc-50 text-zinc-700 border-l-2 border-zinc-300'
                      }`}
                    >
                      <div className="flex justify-between items-center text-[10px] font-mono text-zinc-500 mb-0.5">
                        <span className="font-semibold">{log.sender}</span>
                        <span>{log.time}</span>
                      </div>
                      <p className="font-light">{log.text}</p>
                    </div>
                  ))}

                  {item.feedbackHistory.length === 0 && (
                    <div className="text-xs text-zinc-400 font-mono italic">Belum ada catatan revisi.</div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions / Buttons */}
            <div className="pt-4 border-t border-zinc-200 space-y-3">
              {errorMsg && (
                <div className="p-2.5 rounded bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {item.status === 'Disetujui' ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs text-emerald-800 font-medium flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Konten ini telah Disetujui (Locked Final) dan siap ditayangkan sesuai jadwal.</span>
                </div>
              ) : showRevisionInput ? (
                <form onSubmit={handleRevisionSubmit} className="space-y-3">
                  <textarea
                    rows={2}
                    required
                    placeholder="Tuliskan catatan revisi spesifik (misal: 'Tolong ganti audio latar dengan tempo lebih santai')..."
                    value={revisionText}
                    onChange={(e) => setRevisionText(e.target.value)}
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2.5 text-xs text-zinc-900 focus:outline-none focus:border-zinc-500 focus:bg-white transition"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      type="button"
                      onClick={() => setShowRevisionInput(false)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-200 text-zinc-600 text-xs hover:bg-zinc-50"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1.5 rounded-lg bg-zinc-900 text-white text-xs font-medium hover:bg-zinc-800 flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Kirim Catatan Revisi</span>
                    </button>
                  </div>
                </form>
              ) : (
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setShowRevisionInput(true)}
                    className="flex-1 py-2.5 px-4 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 font-medium text-xs transition cursor-pointer"
                  >
                    Minta Revisi Minor (Maks. 2x)
                  </button>
                  <button
                    onClick={handleApprove}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Setujui Konten (1-Click Approve)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
