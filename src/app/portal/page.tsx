'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAgency } from '@/context/AgencyContext';
import { ContentItem } from '@/types';
import { 
  Calendar, Video, BarChart3, Compass, CheckCircle2, Lock, 
  Plus, AlertCircle, ExternalLink, ArrowRight, Film, Clock, 
  Menu, X, Sparkles, UserCheck, ChevronRight 
} from 'lucide-react';
import { CalendarView } from '@/components/client/CalendarView';
import { ReviewModal } from '@/components/modals/ReviewModal';
import { ClientRequestModal } from '@/components/modals/ClientRequestModal';
import { LockedFeatureModal } from '@/components/modals/LockedFeatureModal';

export default function ClientPortalPage() {
  const { 
    accountType, 
    selectedClient, 
    activeClientContents, 
    videoTasks 
  } = useAgency();

  const [activeTab, setActiveTab] = useState<'overview' | 'calendar' | 'production' | 'strategy'>('overview');
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showLockedModal, setShowLockedModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleTabClick = (tab: 'overview' | 'calendar' | 'production' | 'strategy') => {
    if (accountType === 'demo' && (tab === 'calendar' || tab === 'production')) {
      setShowLockedModal(true);
      return;
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const pendingReviews = activeClientContents.filter(c => c.status === 'Menunggu Review');
  const approvedContents = activeClientContents.filter(c => c.status === 'Disetujui');
  const clientStudioTasks = videoTasks.filter(t => t.clientId === selectedClient.id);

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-zinc-50/50">
      {/* Mobile Top Navigation */}
      <div className="md:hidden border-b border-zinc-200 p-4 flex items-center justify-between bg-white">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
            {selectedClient.business.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span className="font-semibold text-xs text-zinc-900 block leading-tight">{selectedClient.business}</span>
            <span className="text-[10px] text-zinc-400 block font-mono">{selectedClient.instagram}</span>
          </div>
        </div>
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-lg border border-zinc-200 text-zinc-600 bg-zinc-50"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ========================================================
          POLISHED CLIENT SIDEBAR (Precision Clean Design)
      ======================================================== */}
      <aside className={`
        ${mobileMenuOpen ? 'block' : 'hidden'} 
        md:block w-full md:w-64 lg:w-72 border-r border-zinc-200 bg-white p-5 shrink-0 flex flex-col justify-between shadow-xs z-30
      `}>
        <div className="space-y-6">
          {/* Brand Header Card */}
          <div className="p-4 bg-zinc-50/80 border border-zinc-200/90 rounded-2xl shadow-2xs">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-zinc-900 truncate">{selectedClient.business}</span>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-medium ${
                accountType === 'official' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {accountType === 'official' ? 'Resmi' : 'Demo'}
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-1">{selectedClient.instagram}</p>
            <div className="text-[10px] text-zinc-400 mt-2.5 border-t border-zinc-200/60 pt-2 font-light">
              Paket: <strong className="text-zinc-700 font-medium">{selectedClient.package}</strong>
            </div>
          </div>

          {/* Quota Usage Widget */}
          <div className="p-4 bg-white border border-zinc-200 rounded-2xl shadow-2xs space-y-3.5">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                KUOTA KONTEN BULANAN
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Oktober</span>
            </div>

            {/* Reels Quota */}
            <div>
              <div className="flex justify-between text-xs text-zinc-700 font-medium mb-1.5">
                <span>Video Reels & TikTok</span>
                <span className="font-mono font-bold text-zinc-900">{selectedClient.reelsUsed} / {selectedClient.reelsMax}</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((selectedClient.reelsUsed / selectedClient.reelsMax) * 100, 100)}%` }}
                />
              </div>
            </div>

            {/* Posts Quota */}
            <div>
              <div className="flex justify-between text-xs text-zinc-700 font-medium mb-1.5">
                <span>Statis / Carousel IG</span>
                <span className="font-mono font-bold text-zinc-900">{selectedClient.postsUsed} / {selectedClient.postsMax}</span>
              </div>
              <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-zinc-900 h-full rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((selectedClient.postsUsed / Math.max(selectedClient.postsMax, 1)) * 100, 100)}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setShowRequestModal(true)}
              className="w-full mt-1 py-2.5 px-3 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow-xs cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>+ Ajukan Request Konten</span>
            </button>
          </div>

          {/* Navigation Menu */}
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 px-3 mb-1.5 block font-semibold">
              MENU UTAMA
            </span>

            <button
              onClick={() => handleTabClick('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'overview'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Dasbor Utama (Overview)</span>
            </button>

            <button
              onClick={() => handleTabClick('calendar')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'calendar'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className="w-4 h-4 shrink-0" />
                <span>Kalender & Feed Simulator</span>
              </div>
              {accountType === 'demo' && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
            </button>

            <button
              onClick={() => handleTabClick('production')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'production'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Video className="w-4 h-4 shrink-0" />
                <span>Progres Video & Shoot</span>
              </div>
              {accountType === 'demo' && <Lock className="w-3.5 h-3.5 text-amber-500 shrink-0" />}
            </button>

            <button
              onClick={() => handleTabClick('strategy')}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                activeTab === 'strategy'
                  ? 'bg-zinc-900 text-white font-semibold shadow-xs'
                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70'
              }`}
            >
              <Compass className="w-4 h-4 shrink-0" />
              <span>Strategi Brand & Hook</span>
            </button>
          </div>
        </div>

        {/* Assigned PIC Card */}
        <div className="pt-6 border-t border-zinc-200">
          <div className="p-3.5 bg-zinc-50 rounded-xl border border-zinc-200/80 text-xs">
            <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1 font-semibold">
              PIC KREATIF CERMIN
            </span>
            <div className="flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-zinc-700" />
              <span className="font-semibold text-zinc-900">{selectedClient.picAssigned}</span>
            </div>
            <a 
              href="https://wa.me/6281234567890" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2.5 block text-center py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-800 text-[11px] font-medium border border-zinc-200 transition shadow-2xs"
            >
              Chat WhatsApp PIC
            </a>
          </div>
        </div>
      </aside>

      {/* ========================================================
          MAIN WORKSPACE CANVAS (Full Precision Layout)
      ======================================================== */}
      <main className="flex-1 w-full min-w-0 p-6 sm:p-8 xl:p-10 overflow-y-auto">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Selamat Datang di Portal {selectedClient.business}
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Pantau seluruh jadwal penayangan konten, draf video yang perlu persetujuan, dan progres syuting studio.
                  </p>
                </div>
                <div className="text-xs font-mono text-zinc-500 bg-white border border-zinc-200 px-3 py-1.5 rounded-lg shadow-2xs">
                  Faktur: {selectedClient.invoiceNumber}
                </div>
              </div>

              {/* 3 Metric KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                    STATUS KONTRAK KERJA SAMA
                  </span>
                  <div className="text-xl font-semibold text-zinc-900 mt-1.5 flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${accountType === 'official' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    <span>{accountType === 'official' ? 'Aktif Resmi (Lunas DP)' : 'Mode Demo Terkunci'}</span>
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    {accountType === 'official' ? 'Kalender & video terbuka penuh' : 'Menunggu verifikasi DP 50%'}
                  </p>
                </div>

                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                    KONTEN PERLU REVIEW ANDA
                  </span>
                  <div className="text-3xl font-semibold text-zinc-900 font-mono tracking-tight mt-1.5">
                    {pendingReviews.length} Draf Video
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    Memerlukan persetujuan sebelum jam posting
                  </p>
                </div>

                <div className="p-6 bg-white border border-zinc-200 rounded-2xl shadow-xs">
                  <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
                    KONTEN DISETUJUI & TERJADWAL
                  </span>
                  <div className="text-3xl font-semibold text-emerald-700 font-mono tracking-tight mt-1.5">
                    {approvedContents.length} Siap Tayang
                  </div>
                  <p className="text-xs text-zinc-500 font-light mt-2">
                    Terkunci final untuk penayangan H-1
                  </p>
                </div>
              </div>

              {/* ACTION NEEDED RADAR */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-5 pb-3 border-b border-zinc-100">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <h2 className="text-sm sm:text-base font-semibold text-zinc-900">
                      Perlu Tindakan Anda (Menunggu Persetujuan Klien)
                    </h2>
                  </div>
                  <span className="text-xs font-mono text-zinc-400 bg-zinc-50 px-2.5 py-1 rounded-md border border-zinc-200">
                    {pendingReviews.length} Konten Pending
                  </span>
                </div>

                {pendingReviews.length > 0 ? (
                  <div className="space-y-3">
                    {pendingReviews.map(item => (
                      <div 
                        key={item.id}
                        onClick={() => setSelectedContent(item)}
                        className="p-4 rounded-xl border border-zinc-200/90 bg-zinc-50/50 hover:bg-white hover:border-zinc-300 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer shadow-2xs group"
                      >
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="w-12 h-12 rounded-lg bg-zinc-900 overflow-hidden shrink-0 shadow-2xs">
                            <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-mono font-medium text-zinc-500">{item.day} ({item.weekday})</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-bold">{item.version}</span>
                              <span className="text-[10px] font-mono text-zinc-400">{item.platforms.join(' • ')}</span>
                            </div>
                            <h3 className="text-sm font-semibold text-zinc-900 mt-1 truncate">{item.title}</h3>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white font-medium text-xs transition shadow-xs">
                            Review & Approve
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-10 text-center text-zinc-400 text-xs font-mono bg-zinc-50/30 rounded-xl border border-dashed border-zinc-200">
                    Tidak ada konten yang pending. Seluruh draf terkini telah ditinjau!
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: CALENDAR & FEED */}
          {activeTab === 'calendar' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Kalender Distribusi & Feed Simulator
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Matriks tanggal penayangan bulanan dan simulasi tampilan visual feed Instagram serta thumbnail TikTok.
                </p>
              </div>
              <CalendarView onSelectItem={(item) => setSelectedContent(item)} />
            </div>
          )}

          {/* TAB 3: PRODUCTION STUDIO OPS */}
          {activeTab === 'production' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-2 border-b border-zinc-200">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                    Pipeline Produksi Video Studio Malang
                  </h1>
                  <p className="text-xs text-zinc-500 font-light mt-1">
                    Transparansi alur syuting dari riset naskah, pengambilan gambar kamera 4K, hingga tahap finishing.
                  </p>
                </div>
                <a
                  href="https://drive.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-700 text-xs font-medium flex items-center gap-1.5 transition shadow-2xs"
                >
                  <span>Akses Folder Mentahan 4K</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-xs divide-y divide-zinc-100">
                {clientStudioTasks.map((task) => (
                  <div key={task.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2.5">
                        <span className="text-sm font-semibold text-zinc-900">{task.title}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 font-medium">
                          {task.phase}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-44 bg-zinc-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${task.progress === 100 ? 'bg-emerald-600' : 'bg-zinc-900'}`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                        <span className="text-xs font-mono text-zinc-600 font-medium">{task.progress}% Selesai</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs text-zinc-500 font-light">Penanggung Jawab: <strong className="text-zinc-800">{task.shooter}</strong></span>
                      <span className={`text-xs px-2.5 py-1 rounded-md font-mono ${
                        task.status === 'Selesai' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        task.status === 'Sedang Berjalan' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                        'bg-zinc-100 text-zinc-600'
                      }`}>
                        {task.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: STRATEGY & HOOK */}
          {activeTab === 'strategy' && (
            <div className="space-y-6">
              <div className="pb-2 border-b border-zinc-200">
                <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900">
                  Strategi Pilar Brand & Formula Hook Retensi
                </h1>
                <p className="text-xs text-zinc-500 font-light mt-1">
                  Panduan acuan tim kreatif dalam menyusun naskah dan produksi visual brand Anda.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Pilar 1 (50%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Edukasi & Problem Solving</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Membongkar masalah spesifik audiens dan menyajikan solusi praktis lewat produk brand.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Pilar 2 (30%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Storytelling & Founder Journey</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Membangun ikatan emosional melalui cerita autentik di balik dapur produksi dan standar QC.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white border border-zinc-200 shadow-xs">
                  <span className="text-xs font-mono uppercase text-zinc-400 font-semibold">Pilar 3 (20%)</span>
                  <h3 className="text-base font-semibold text-zinc-900 mt-1">Direct Response & Promo</h3>
                  <p className="text-xs text-zinc-600 font-light mt-2.5 leading-relaxed">
                    Memicu konversi penjualan instan melalui penawaran terbatas dan call-to-action yang tegas.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      {selectedContent && (
        <ReviewModal
          item={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}

      {showRequestModal && (
        <ClientRequestModal
          onClose={() => setShowRequestModal(false)}
        />
      )}

      {showLockedModal && (
        <LockedFeatureModal
          onClose={() => setShowLockedModal(false)}
        />
      )}
    </div>
  );
}
