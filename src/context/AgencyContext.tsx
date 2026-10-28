'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ClientPipeline, 
  ContentItem, 
  VideoProductionTask, 
  UserProfile, 
  ContentStage,
  PlatformType 
} from '@/types';
import { 
  INITIAL_CLIENTS_PIPELINE, 
  INITIAL_CONTENT_ITEMS, 
  INITIAL_VIDEO_PRODUCTION_TASKS 
} from '@/lib/mock-data';

export const EMPTY_CLIENT_FALLBACK: ClientPipeline = {
  id: '',
  name: 'Belum Ada Klien',
  business: 'Belum Ada Klien Terdaftar',
  instagram: '@-',
  email: '-',
  package: 'Belum Memilih Paket',
  reelsUsed: 0,
  reelsMax: 0,
  postsUsed: 0,
  postsMax: 0,
  status: 'Menunggu Verifikasi DP',
  dpAmount: 'Rp 0',
  totalValue: 'Rp 0',
  paymentTerm: '50% DP',
  transferProof: null,
  invoiceNumber: '-',
  briefNotes: 'Silakan tambah klien pertama untuk memulai operasional agensi.',
  registeredAt: '-',
  isUnlocked: false,
  picAssigned: 'Tim Creative Cermin'
};

interface AgencyContextType {
  // State
  currentUser: UserProfile | null;
  accountType: 'demo' | 'official';
  clientPipeline: ClientPipeline[];
  contentList: ContentItem[];
  videoTasks: VideoProductionTask[];
  selectedClientId: string;
  selectedClient: ClientPipeline;
  activeClientContents: ContentItem[];
  notification: string | null;

  // Actions
  setCurrentUser: (user: UserProfile | null) => void;
  setAccountType: (type: 'demo' | 'official') => void;
  setSelectedClientId: (id: string) => void;
  triggerNotification: (msg: string) => void;
  toggleAccountStatus: () => void;
  
  // Data State Actions (Clean & Seed)
  clearAllData: () => void;
  seedSampleData: () => void;

  // Client Management CRUD
  addClient: (client: ClientPipeline) => void;
  updateClient: (clientId: string, updates: Partial<ClientPipeline>) => void;
  deleteClient: (clientId: string) => void;

  // Content Operations CRUD
  addContentItem: (item: {
    clientId: string;
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    stage: ContentStage;
    status: ContentItem['status'];
    statusColor?: string;
    ballInCourt: ContentItem['ballInCourt'];
    version: string;
    caption: string;
    mediaUrl: string;
  }) => void;
  updateContentItem: (contentId: number, updates: Partial<ContentItem>) => void;
  deleteContentItem: (contentId: number) => void;

  // Content SOPs
  approveContent: (contentId: number) => void;
  requestRevision: (contentId: number, note: string) => { success: boolean; message: string };
  submitRevisionFix: (contentId: number, resolutionNote: string) => void;
  moveContentStage: (contentId: number, newStage: ContentStage) => void;
  submitClientRequest: (data: {
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    caption?: string;
    notes?: string;
  }) => { success: boolean; isAddOn: boolean };
  
  // Studio Operations CRUD
  addStudioTask: (task: Omit<VideoProductionTask, 'id'>) => void;
  updateStudioTask: (taskId: number, progress: number, status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai') => void;
  deleteStudioTask: (taskId: number) => void;

  // Financial & Onboarding Ops
  verifyPayment: (clientId: string) => void;
  addQuotaSlot: (clientId: string, addedReels: number) => void;
  submitBriefOnboarding: (data: {
    name: string;
    business: string;
    instagram: string;
    package: string;
    email: string;
    notes?: string;
  }) => { clientId: string; invoiceNumber: string; waUrl: string };
}

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export function AgencyProvider({ children }: { children: React.ReactNode }) {
  const [clientPipeline, setClientPipeline] = useState<ClientPipeline[]>(INITIAL_CLIENTS_PIPELINE);
  const [contentList, setContentList] = useState<ContentItem[]>(INITIAL_CONTENT_ITEMS);
  const [videoTasks, setVideoTasks] = useState<VideoProductionTask[]>(INITIAL_VIDEO_PRODUCTION_TASKS);
  const [selectedClientId, setSelectedClientId] = useState<string>('CK-091');
  const [accountType, setAccountType] = useState<'demo' | 'official'>('demo');
  const [notification, setNotification] = useState<string | null>(null);

  const [currentUser, setCurrentUser] = useState<UserProfile | null>({
    id: 'usr-001',
    email: 'budi@mavencoffee.id',
    fullName: 'Budi Santoso',
    role: 'client',
    businessName: 'Maven Coffee Roasters',
    instagramHandle: '@mavencoffee'
  });

  // LocalStorage persistence
  useEffect(() => {
    try {
      const savedClients = localStorage.getItem('ck_clients');
      const savedContents = localStorage.getItem('ck_contents');
      const savedTasks = localStorage.getItem('ck_tasks');
      const savedAccountType = localStorage.getItem('ck_account_type');

      if (savedClients) {
        const parsed = JSON.parse(savedClients);
        setClientPipeline(parsed);
        if (parsed.length > 0 && !parsed.find((c: ClientPipeline) => c.id === selectedClientId)) {
          setSelectedClientId(parsed[0].id);
        }
      }
      if (savedContents) setContentList(JSON.parse(savedContents));
      if (savedTasks) setVideoTasks(JSON.parse(savedTasks));
      if (savedAccountType === 'official' || savedAccountType === 'demo') {
        setAccountType(savedAccountType);
      }
    } catch {
      // Fallback
    }
  }, []);

  const saveToStorage = (clients: ClientPipeline[], contents: ContentItem[], tasks: VideoProductionTask[]) => {
    try {
      localStorage.setItem('ck_clients', JSON.stringify(clients));
      localStorage.setItem('ck_contents', JSON.stringify(contents));
      localStorage.setItem('ck_tasks', JSON.stringify(tasks));
    } catch {
      // Ignore
    }
  };

  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const toggleAccountStatus = () => {
    const nextType = accountType === 'demo' ? 'official' : 'demo';
    setAccountType(nextType);
    localStorage.setItem('ck_account_type', nextType);
    if (nextType === 'official') {
      triggerNotification('Status akun di-upgrade ke KLIEN RESMI! Seluruh kalender, feed & video terbuka penuh.');
    } else {
      triggerNotification('Status dikembalikan ke MODE DEMO (Fitur kalender & video digembok).');
    }
  };

  // Safe selected client fallback
  const selectedClient = clientPipeline.find(c => c.id === selectedClientId) || clientPipeline[0] || EMPTY_CLIENT_FALLBACK;
  const activeClientContents = selectedClient.id ? contentList.filter(item => item.clientId === selectedClient.id) : [];

  // Reset all to clean zero state
  const clearAllData = () => {
    setClientPipeline([]);
    setContentList([]);
    setVideoTasks([]);
    setSelectedClientId('');
    saveToStorage([], [], []);
    triggerNotification('Semua data mock berhasil dibersihkan! Mulai sistem dengan data riil.');
  };

  // Seed sample data
  const seedSampleData = () => {
    setClientPipeline(INITIAL_CLIENTS_PIPELINE);
    setContentList(INITIAL_CONTENT_ITEMS);
    setVideoTasks(INITIAL_VIDEO_PRODUCTION_TASKS);
    setSelectedClientId('CK-091');
    saveToStorage(INITIAL_CLIENTS_PIPELINE, INITIAL_CONTENT_ITEMS, INITIAL_VIDEO_PRODUCTION_TASKS);
    triggerNotification('Data sampel agensi berhasil dimuat kembali untuk pengujian!');
  };

  // Client CRUD
  const addClient = (newClient: ClientPipeline) => {
    const updated = [newClient, ...clientPipeline];
    setClientPipeline(updated);
    setSelectedClientId(newClient.id);
    saveToStorage(updated, contentList, videoTasks);
  };

  const updateClient = (clientId: string, updates: Partial<ClientPipeline>) => {
    const updated = clientPipeline.map(c => c.id === clientId ? { ...c, ...updates } : c);
    setClientPipeline(updated);
    saveToStorage(updated, contentList, videoTasks);
  };

  const deleteClient = (clientId: string) => {
    const updatedClients = clientPipeline.filter(c => c.id !== clientId);
    const updatedContents = contentList.filter(c => c.clientId !== clientId);
    const updatedTasks = videoTasks.filter(t => t.clientId !== clientId);
    setClientPipeline(updatedClients);
    setContentList(updatedContents);
    setVideoTasks(updatedTasks);
    if (selectedClientId === clientId) {
      setSelectedClientId(updatedClients[0]?.id || '');
    }
    saveToStorage(updatedClients, updatedContents, updatedTasks);
    triggerNotification(`Klien berhasil dihapus.`);
  };

  // Helper date parsing
  const parseDateMetadata = (dateStr: string) => {
    const d = new Date(dateStr);
    const dayNumber = isNaN(d.getDate()) ? 1 : d.getDate();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const day = `${dayNumber < 10 ? '0' : ''}${dayNumber} ${months[d.getMonth()] || 'Okt'}`;
    const weekday = days[d.getDay()] || 'Senin';
    return { dayNumber, day, weekday };
  };

  // Content Operations CRUD
  const addContentItem = (itemData: {
    clientId: string;
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    stage: ContentStage;
    status: ContentItem['status'];
    statusColor?: string;
    ballInCourt: ContentItem['ballInCourt'];
    version: string;
    caption: string;
    mediaUrl: string;
  }) => {
    const { dayNumber, day, weekday } = parseDateMetadata(itemData.date);
    const newId = Date.now();
    const newItem: ContentItem = {
      id: newId,
      ...itemData,
      dayNumber,
      day,
      weekday,
      revisionCount: 0,
      feedbackHistory: [
        { sender: 'Agensi', text: `Draf konten "${itemData.title}" dijadwalkan oleh tim agensi.`, time: 'Baru saja' }
      ]
    };

    const updated = [newItem, ...contentList];
    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
  };

  const updateContentItem = (contentId: number, updates: Partial<ContentItem>) => {
    const updated = contentList.map(item => item.id === contentId ? { ...item, ...updates } : item);
    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification('Perubahan konten berhasil disimpan.');
  };

  const deleteContentItem = (contentId: number) => {
    const updated = contentList.filter(item => item.id !== contentId);
    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification('Konten berhasil dihapus dari kalender produksi.');
  };

  // 1-Click Approve
  const approveContent = (contentId: number) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        return {
          ...item,
          status: 'Disetujui' as const,
          statusColor: 'emerald',
          stage: 'scheduled' as const,
          ballInCourt: 'agency' as const,
          version: item.version.includes('Approved') ? item.version : `${item.version} (Final Approved)`,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Klien' as const, text: 'Konten disetujui resmi (1-Click Approved), siap ditayangkan.', time: 'Baru saja' }
          ]
        };
      }
      return item;
    });
    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification('Konten berhasil DISETUJUI & status terkunci siap tayang!');
  };

  // Request Revision with SLA Max 2 Rounds
  const requestRevision = (contentId: number, note: string) => {
    const target = contentList.find(c => c.id === contentId);
    if (!target) return { success: false, message: 'Konten tidak ditemukan' };

    if (target.revisionCount >= 2) {
      triggerNotification('Batas revisi gratis (SLA 2x) telah tercapai. Tambahan revisi dihitung sebagai slot add-on.');
      return { 
        success: false, 
        message: 'Batas kuota revisi (2x putaran) sudah tercapai untuk konten ini. Silakan konsultasikan revisi mayor ke tim agensi.' 
      };
    }

    const updated = contentList.map(item => {
      if (item.id === contentId) {
        return {
          ...item,
          status: 'Perlu Revisi' as const,
          statusColor: 'rose',
          stage: 'revision' as const,
          ballInCourt: 'agency' as const,
          revisionCount: item.revisionCount + 1,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Klien' as const, text: `Catatan Revisi #${item.revisionCount + 1}: ${note}`, time: 'Baru saja' }
          ]
        };
      }
      return item;
    });

    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification(`Catatan revisi #${target.revisionCount + 1} berhasil dikirim ke tim editor agensi.`);
    return { success: true, message: 'Revisi berhasil diajukan.' };
  };

  // Admin submit revised draft
  const submitRevisionFix = (contentId: number, resolutionNote: string) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        const nextVersion = item.version.startsWith('V1') ? 'V2 (Draf Revisi)' : 'V3 (Final)';
        return {
          ...item,
          version: nextVersion,
          stage: 'review' as const,
          status: 'Menunggu Review' as const,
          statusColor: 'amber',
          ballInCourt: 'client' as const,
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Tim Agensi' as const, text: resolutionNote || 'Perbaikan draf selesai dikerjakan sesuai masukan. Siap review kembali.', time: 'Baru saja' }
          ]
        };
      }
      return item;
    });

    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification('Draf revisi berhasil diunggah ulang! Bola peninjauan kembali ke klien.');
  };

  // Move stage via Kanban
  const moveContentStage = (contentId: number, newStage: ContentStage) => {
    const updated = contentList.map(item => {
      if (item.id === contentId) {
        let status = item.status;
        let color = item.statusColor;
        let ball = item.ballInCourt;

        if (newStage === 'script') { status = 'Draf Naskah'; color = 'slate'; ball = 'agency'; }
        if (newStage === 'production') { status = 'Sedang Edit'; color = 'slate'; ball = 'agency'; }
        if (newStage === 'review') { status = 'Menunggu Review'; color = 'amber'; ball = 'client'; }
        if (newStage === 'revision') { status = 'Perlu Revisi'; color = 'rose'; ball = 'agency'; }
        if (newStage === 'scheduled') { status = 'Disetujui'; color = 'emerald'; ball = 'agency'; }

        return { ...item, stage: newStage, status, statusColor: color, ballInCourt: ball };
      }
      return item;
    });

    setContentList(updated);
    saveToStorage(clientPipeline, updated, videoTasks);
    triggerNotification(`Tahapan konten dipindahkan ke: ${newStage.toUpperCase()}`);
  };

  // Client self-request content
  const submitClientRequest = (data: {
    title: string;
    type: string;
    platforms: PlatformType[];
    date: string;
    caption?: string;
    notes?: string;
  }) => {
    const client = selectedClient;
    const isQuotaFull = client.reelsUsed >= client.reelsMax;
    const { dayNumber, day, weekday } = parseDateMetadata(data.date);

    const newId = Date.now();
    const newContent: ContentItem = {
      id: newId,
      clientId: client.id,
      date: data.date,
      dayNumber,
      day,
      weekday,
      title: data.title,
      type: data.type,
      platforms: data.platforms,
      stage: 'script',
      status: 'Request Masuk',
      statusColor: isQuotaFull ? 'rose' : 'slate',
      ballInCourt: 'agency',
      version: 'V1 (Request Klien)',
      caption: data.caption || `Catatan Klien: ${data.notes || 'Tidak ada catatan khusus.'}`,
      mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      revisionCount: 0,
      feedbackHistory: [
        { sender: 'Klien', text: `Pengajuan konten baru melalui portal. Catatan: ${data.notes || '-'}`, time: 'Baru saja' }
      ]
    };

    const updatedContents = [newContent, ...contentList];
    const updatedClients = clientPipeline.map(c => {
      if (c.id === client.id) {
        return {
          ...c,
          reelsUsed: c.reelsUsed + 1
        };
      }
      return c;
    });

    setContentList(updatedContents);
    setClientPipeline(updatedClients);
    saveToStorage(updatedClients, updatedContents, videoTasks);

    if (isQuotaFull) {
      triggerNotification(`Pengajuan "${data.title}" diterima sebagai slot add-on (kuota reguler penuh)!`);
    } else {
      triggerNotification(`Pengajuan "${data.title}" berhasil diajukan & masuk radar tim kreatif!`);
    }

    return { success: true, isAddOn: isQuotaFull };
  };

  // Studio Task CRUD
  const addStudioTask = (taskData: Omit<VideoProductionTask, 'id'>) => {
    const newTask: VideoProductionTask = {
      id: Date.now(),
      ...taskData
    };
    const updated = [newTask, ...videoTasks];
    setVideoTasks(updated);
    saveToStorage(clientPipeline, contentList, updated);
  };

  const updateStudioTask = (taskId: number, progress: number, status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai') => {
    const updated = videoTasks.map(t => {
      if (t.id === taskId) {
        return { ...t, progress, status };
      }
      return t;
    });
    setVideoTasks(updated);
    saveToStorage(clientPipeline, contentList, updated);
    triggerNotification('Tahap produksi video studio diperbarui!');
  };

  const deleteStudioTask = (taskId: number) => {
    const updated = videoTasks.filter(t => t.id !== taskId);
    setVideoTasks(updated);
    saveToStorage(clientPipeline, contentList, updated);
    triggerNotification('Task studio berhasil dihapus.');
  };

  // Verify payment
  const verifyPayment = (clientId: string) => {
    const updated = clientPipeline.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          status: 'Aktif Resmi (Lunas DP)' as const,
          isUnlocked: true,
          paymentTerm: 'Termin 1 Lunas (Akses Terbuka Penuh)'
        };
      }
      return c;
    });

    setClientPipeline(updated);
    setAccountType('official');
    saveToStorage(updated, contentList, videoTasks);
    triggerNotification(`Pembayaran ${clientId} diverifikasi! Akses kalender & video resmi dibuka penuh.`);
  };

  // Add-on quota upsell
  const addQuotaSlot = (clientId: string, addedReels: number) => {
    const updated = clientPipeline.map(c => {
      if (c.id === clientId) {
        const currentVal = parseInt(c.totalValue.replace(/\D/g, ''), 10) || 0;
        const addCost = addedReels * 450000;
        return {
          ...c,
          reelsMax: c.reelsMax + addedReels,
          totalValue: `Rp ${(currentVal + addCost).toLocaleString('id-ID')}`
        };
      }
      return c;
    });

    setClientPipeline(updated);
    saveToStorage(updated, contentList, videoTasks);
    triggerNotification(`+${addedReels} Slot Video Add-on berhasil ditambahkan ke kontrak klien!`);
  };

  // Submit quick brief onboarding
  const submitBriefOnboarding = (data: {
    name: string;
    business: string;
    instagram: string;
    package: string;
    email: string;
    notes?: string;
  }) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newClientId = `CK-${randomNum}`;
    const invoiceNumber = `INV/2026/CK/10-${randomNum}`;

    const newClient: ClientPipeline = {
      id: newClientId,
      name: data.name,
      business: data.business,
      instagram: data.instagram,
      email: data.email,
      package: data.package,
      reelsUsed: 0,
      reelsMax: data.package.includes('Starter') ? 8 : 15,
      postsUsed: 0,
      postsMax: data.package.includes('Starter') ? 12 : 20,
      status: 'Menunggu Verifikasi DP',
      dpAmount: data.package.includes('Starter') ? 'Rp 3.750.000' : 'Rp 6.750.000',
      totalValue: data.package.includes('Starter') ? 'Rp 7.500.000' : 'Rp 13.500.000',
      paymentTerm: 'Termin 1 (DP 50%)',
      transferProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      invoiceNumber: invoiceNumber,
      briefNotes: data.notes || 'Pengajuan brief kilat melalui website.',
      registeredAt: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }),
      isUnlocked: false,
      picAssigned: 'Tim Creative Cermin'
    };

    const updated = [newClient, ...clientPipeline];
    setClientPipeline(updated);
    setSelectedClientId(newClientId);
    saveToStorage(updated, contentList, videoTasks);

    const waText = encodeURIComponent(
      `Halo Tim Cermin Kreatif, saya telah mengisi brief dari website:\n` +
      `• No Faktur Proforma: ${invoiceNumber}\n` +
      `• Nama PIC: ${data.name}\n` +
      `• Brand: ${data.business} (${data.instagram})\n` +
      `• Paket Pilihan: ${data.package}\n` +
      `• Email: ${data.email}\n` +
      `• Target / Goal: ${data.notes || 'Siap verifikasi DP 50% dan pembukaan kalender produksi.'}`
    );
    const waUrl = `https://wa.me/6281234567890?text=${waText}`;

    triggerNotification(`Brief brand ${data.business} tersimpan! Proforma invoice ${invoiceNumber} diterbitkan.`);
    return { clientId: newClientId, invoiceNumber, waUrl };
  };

  return (
    <AgencyContext.Provider
      value={{
        currentUser,
        accountType,
        clientPipeline,
        contentList,
        videoTasks,
        selectedClientId,
        selectedClient,
        activeClientContents,
        notification,
        setCurrentUser,
        setAccountType,
        setSelectedClientId,
        triggerNotification,
        toggleAccountStatus,
        clearAllData,
        seedSampleData,
        addClient,
        updateClient,
        deleteClient,
        addContentItem,
        updateContentItem,
        deleteContentItem,
        approveContent,
        requestRevision,
        submitRevisionFix,
        moveContentStage,
        submitClientRequest,
        addStudioTask,
        updateStudioTask,
        deleteStudioTask,
        verifyPayment,
        addQuotaSlot,
        submitBriefOnboarding
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
}

export function useAgency() {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
}
