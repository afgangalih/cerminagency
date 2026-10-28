protoype awal:
import React, { useState } from 'react';
import { 
  Lock, Unlock, Calendar, Video, BarChart3, Compass, CheckCircle2, 
  Clock, ArrowRight, ExternalLink, Send, ShieldAlert, Sparkles, 
  Menu, X, ChevronRight, Eye, RefreshCw, UserCheck, MessageSquare,
  Flame, TrendingUp, Layers, Check, AlertCircle, FileText,
  UserCheck2, Users, Receipt, ShieldCheck, ChevronLeft, CalendarDays,
  FileCheck, Download, Plus, Filter, LayoutDashboard, Film, Sliders,
  FolderSync, UploadCloud, Edit3, Trash2, ArrowUpRight, Kanban,
  Grid3X3, DollarSign, AlertTriangle, Share2, HelpCircle
} from 'lucide-react';

// --- INITIAL MOCK DATA ---
const INITIAL_CONTENT_ITEMS = [
  {
    id: 1,
    clientId: 'CK-091',
    date: '2026-10-05',
    dayNumber: 5,
    day: '05 Okt',
    weekday: 'Senin',
    title: 'Reels: Behind The Scenes Studio & Shoot Gear',
    type: 'Reels / Video Pendek',
    stage: 'review', // 'script' | 'production' | 'review' | 'revision' | 'scheduled'
    status: 'Menunggu Review',
    statusColor: 'amber',
    ballInCourt: 'client', // 'client' | 'agency'
    version: 'V1',
    caption: 'Rahasia lighting sinematik tim Cermin Kreatif saat shoot produk apparel lokal 🔥 Simak breakdown lengkapnya!',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: [
      { sender: 'Agensi', text: 'Draf V1 diunggah oleh Creative Lead', time: '04 Okt, 14:00' }
    ]
  },
  {
    id: 2,
    clientId: 'CK-091',
    date: '2026-10-12',
    dayNumber: 12,
    day: '12 Okt',
    weekday: 'Senin',
    title: 'Carousel Edukasi: 3 Kesalahan Hook Video TikTok',
    type: 'Instagram Carousel',
    stage: 'scheduled',
    status: 'Disetujui',
    statusColor: 'emerald',
    ballInCourt: 'agency',
    version: 'V2 (Final)',
    caption: 'Jangan buang 3 detik pertama audiens Anda! Berikut riset retensi audiens dari 50+ video viral.',
    mediaUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: [
      { sender: 'Klien', text: 'Tolong pertegas font di cover depan', time: '10 Okt, 10:20' },
      { sender: 'Agensi', text: 'Font diperbaiki dan warna disesuaikan brand kit', time: '11 Okt, 15:30' },
      { sender: 'Klien', text: 'Visual slide 2 disetujui, siap tayang.', time: '12 Okt, 09:00' }
    ]
  },
  {
    id: 3,
    clientId: 'CK-091',
    date: '2026-10-16',
    dayNumber: 16,
    day: '16 Okt',
    weekday: 'Jumat',
    title: 'Product Launching: Promo Flash Sale Weekend',
    type: 'Single Post High-Res',
    stage: 'revision',
    status: 'Perlu Revisi',
    statusColor: 'rose',
    ballInCourt: 'agency',
    version: 'V1',
    caption: 'Diskon terbatas menyambut peluncuran koleksi musim panas. Dapatkan potongan 30%!',
    mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: [
      { sender: 'Klien', text: 'Tolong ganti logo di pojok kanan bawah dengan versi monochrome putih.', time: '15 Okt, 16:45' }
    ]
  },
  {
    id: 4,
    clientId: 'CK-091',
    date: '2026-10-21',
    dayNumber: 21,
    day: '21 Okt',
    weekday: 'Rabu',
    title: 'Founder Interview: Filosofi Produk & Standar QC',
    type: 'TikTok & Reels',
    stage: 'scheduled',
    status: 'Disetujui',
    statusColor: 'emerald',
    ballInCourt: 'agency',
    version: 'V1 (Approved)',
    caption: 'Mengapa bahan baku premium menjadi pembeda utama brand kami di pasaran.',
    mediaUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: [
      { sender: 'Klien', text: 'Pewarnaan video (color grading) mantap.', time: '20 Okt, 11:15' }
    ]
  },
  {
    id: 5,
    clientId: 'CK-091',
    date: '2026-10-26',
    dayNumber: 26,
    day: '26 Okt',
    weekday: 'Senin',
    title: 'Customer Story: Testimoni & Review Pemakaian',
    type: 'TikTok & Story Video',
    stage: 'production',
    status: 'Sedang Edit',
    statusColor: 'slate',
    ballInCourt: 'agency',
    version: 'Draf Naskah',
    caption: 'Bagaimana brand lokal X scale-up penjualan 300% dalam 60 hari menggunakan storytelling video.',
    mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: []
  },
  {
    id: 6,
    clientId: 'CK-092',
    date: '2026-10-18',
    dayNumber: 18,
    day: '18 Okt',
    weekday: 'Minggu',
    title: 'Treatment Glow: Eksplanasi Dokter SpKK',
    type: 'Reels / Video Pendek',
    stage: 'review',
    status: 'Menunggu Review',
    statusColor: 'amber',
    ballInCourt: 'client',
    version: 'V1',
    caption: 'Mitos vs Fakta laser wajah: apa yang wajib dihindari sebelum perawatan klinis?',
    mediaUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80',
    feedbackHistory: []
  }
];

const INITIAL_CLIENTS_PIPELINE = [
  {
    id: 'CK-091',
    name: 'Budi Santoso',
    business: 'Maven Coffee Roasters',
    instagram: '@mavencoffee',
    email: 'budi@mavencoffee.id',
    package: 'Growth Video (12 Reels + 8 Post)',
    reelsUsed: 4,
    reelsMax: 12,
    postsUsed: 3,
    postsMax: 8,
    status: 'Menunggu Verifikasi DP',
    statusBadge: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
    dpAmount: 'Rp 6.500.000',
    totalValue: 'Rp 13.000.000',
    paymentTerm: 'Termin 1 (DP 50%)',
    transferProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    invoiceNumber: 'INV/2026/CK/10-091',
    briefNotes: 'Fokus branding coffee beans specialty ke pasar anak muda Jabodetabek & Surabaya.',
    registeredAt: '24 Okt 2026, 14:20 WIB',
    isUnlocked: false,
    picAssigned: 'Dimas (Creative Lead)'
  },
  {
    id: 'CK-092',
    name: 'Sarah Wijaya',
    business: 'Lumen Skin Clinic',
    instagram: '@lumenskin.id',
    email: 'sarah@lumenskin.com',
    package: 'Full Retainer Social Media & Ads Creative',
    reelsUsed: 8,
    reelsMax: 20,
    postsUsed: 10,
    postsMax: 12,
    status: 'Aktif Resmi (Lunas DP)',
    statusBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
    dpAmount: 'Rp 12.000.000',
    totalValue: 'Rp 24.000.000',
    paymentTerm: 'Termin 1 Lunas, Termin 2 Berjalan',
    transferProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
    invoiceNumber: 'INV/2026/CK/10-088',
    briefNotes: 'Butuh konten edukasi dokter kulit, 8 video cinematic studio shooting.',
    registeredAt: '20 Okt 2026, 09:15 WIB',
    isUnlocked: true,
    picAssigned: 'Farhan (Video Director)'
  },
  {
    id: 'CK-093',
    name: 'Dimas Ardiansyah',
    business: 'Arche Studio Apparel',
    instagram: '@arche.apparel',
    email: 'dimas@arche.co',
    package: 'Starter Video (4 Reels Shoot)',
    reelsUsed: 1,
    reelsMax: 4,
    postsUsed: 0,
    postsMax: 0,
    status: 'Brief Masuk (Belum Bayar)',
    statusBadge: 'bg-neutral-800 text-neutral-400 border-neutral-700',
    dpAmount: 'Rp 3.500.000',
    totalValue: 'Rp 7.000.000',
    paymentTerm: 'Belum DP',
    transferProof: null,
    invoiceNumber: 'INV/2026/CK/10-094',
    briefNotes: 'Luncurkan produk jaket parasut waterproof outdoor.',
    registeredAt: '27 Okt 2026, 10:45 WIB',
    isUnlocked: false,
    picAssigned: 'Belum Ditugaskan'
  }
];

const INITIAL_VIDEO_PRODUCTION_TASKS = [
  { id: 101, clientId: 'CK-091', title: 'Concept Scripting 5 Reels Viral', phase: 'Riset & Naskah', progress: 100, status: 'Selesai', rawFolder: 'https://drive.google.com', shooter: 'Dimas (Creative Lead)' },
  { id: 102, clientId: 'CK-091', title: 'Shooting Session Batch 1 (Studio Malang)', phase: 'Produksi & Shoot', progress: 100, status: 'Selesai', rawFolder: 'https://drive.google.com', shooter: 'Farhan & Tim' },
  { id: 103, clientId: 'CK-091', title: 'Rough Cut Editing 3 Video TikTok', phase: 'Penyuntingan & Desain', progress: 65, status: 'Sedang Berjalan', rawFolder: 'https://drive.google.com', shooter: 'Reza Editor' },
  { id: 104, clientId: 'CK-091', title: 'Sound Design & Subtitle Hook Final', phase: 'Quality Control', progress: 20, status: 'Dalam Antrean', rawFolder: 'https://drive.google.com', shooter: 'Dimas Lead' },
  { id: 105, clientId: 'CK-092', title: 'Shooting Dokter Kulit Episode 1-4', phase: 'Produksi & Shoot', progress: 100, status: 'Selesai', rawFolder: 'https://drive.google.com', shooter: 'Farhan' }
];

export default function App() {
  // Navigation State
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing' | 'login' | 'dashboard' | 'admin'
  const [activeTab, setActiveTab] = useState('overview'); // Client tab
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin Dedicated Workspace State
  const [adminTab, setAdminTab] = useState('mission_control'); 
  // 'mission_control' | 'clients' | 'content_engine' | 'production_mgmt' | 'finance' | 'brief_vault'
  const [adminSelectedClient, setAdminSelectedClient] = useState('CK-091');
  const [adminContentViewMode, setAdminContentViewMode] = useState('kanban'); // 'kanban' | 'calendar' | 'feed'

  // Authentication & Simulation State
  const [user, setUser] = useState(null);
  const [accountType, setAccountType] = useState('demo'); // 'demo' | 'official'
  const [demoNoticeClosed, setDemoNoticeClosed] = useState(false);

  // Data Pipeline State
  const [clientPipeline, setClientPipeline] = useState(INITIAL_CLIENTS_PIPELINE);
  const [contentList, setContentList] = useState(INITIAL_CONTENT_ITEMS);
  const [videoTasks, setVideoTasks] = useState(INITIAL_VIDEO_PRODUCTION_TASKS);
  const [selectedProofClient, setSelectedProofClient] = useState(null);
  const [adminFilter, setAdminFilter] = useState('all');

  // Modals & Calendar UI State
  const [showDemoRegisterModal, setShowDemoRegisterModal] = useState(false);
  const [showBriefModal, setShowBriefModal] = useState(false);
  const [showAddContentModal, setShowAddContentModal] = useState(false);
  const [showAddOnModal, setShowAddOnModal] = useState(false);
  const [showClientRequestModal, setShowClientRequestModal] = useState(false);
  const [selectedCalendarItem, setSelectedCalendarItem] = useState(null);
  const [calendarViewMode, setCalendarViewMode] = useState('monthly'); // client side: 'monthly' | 'list'
  const [activeCalendarDate, setActiveCalendarDate] = useState(12);
  const [revisionInput, setRevisionInput] = useState('');
  const [showRevisionBox, setShowRevisionBox] = useState(false);

  // Form states
  const [demoEmail, setDemoEmail] = useState('');
  const [demoPassword, setDemoPassword] = useState('');
  
  // Client Request Content Form
  const [clientRequestForm, setClientRequestForm] = useState({
    title: '',
    type: 'Reels / Video Pendek',
    date: '2026-10-29',
    caption: '',
    notes: ''
  });

  // Quick Brief Form
  const [briefForm, setBriefForm] = useState({
    name: '',
    business: '',
    instagram: '',
    package: 'Growth Video (12 Reels + 8 Post)',
    email: '',
    password: '',
    notes: ''
  });

  // Admin Content Creation Form
  const [newContentForm, setNewContentForm] = useState({
    title: '',
    type: 'Reels / Video Pendek',
    date: '2026-10-28',
    dayNumber: 28,
    caption: '',
    mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
  });

  // Notifications and revision state
  const [notification, setNotification] = useState(null);
  const [adminResolutionNote, setAdminResolutionNote] = useState('');

  // Flash toast notification helper
  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4500);
  };

  // Toggle Demo vs Official state
  const toggleAccountStatus = () => {
    if (accountType === 'demo') {
      setAccountType('official');
      triggerNotification('Status akun di-upgrade ke KLIEN RESMI! Seluruh kalender, feed, & video terbuka penuh.');
    } else {
      setAccountType('demo');
      triggerNotification('Status dikembalikan ke MODE DEMO (Fitur kalender & video digembok).');
    }
  };

  // Submit Client Content Request (Fitur Baru: Klien Request Konten Mandiri)
  const handleClientSubmitRequest = (e) => {
    e.preventDefault();
    if (!clientRequestForm.title) return;

    // Ambil data klien saat ini (default CK-091)
    const currentClientId = 'CK-091';
    const targetClient = clientPipeline.find(c => c.id === currentClientId) || clientPipeline[0];
    
    // Cek kuota apakah masih ada
    const isReels = clientRequestForm.type.includes('Reels') || clientRequestForm.type.includes('Video');
    const quotaUsed = isReels ? targetClient.reelsUsed : targetClient.postsUsed;
    const quotaMax = isReels ? targetClient.reelsMax : targetClient.postsMax;
    const isQuotaFull = quotaUsed >= quotaMax;

    const parseDay = parseInt(clientRequestForm.date.split('-')[2], 10) || 29;
    
    const newRequestedItem = {
      id: Date.now(),
      clientId: currentClientId,
      date: clientRequestForm.date,
      dayNumber: parseDay,
      day: `${parseDay < 10 ? '0' : ''}${parseDay} Okt`,
      weekday: 'Pengajuan Klien',
      title: clientRequestForm.title,
      type: clientRequestForm.type,
      stage: 'script', // Masuk tahap 1 di Kanban Admin
      status: 'Request Masuk',
      statusColor: 'slate',
      ballInCourt: 'agency', // Bola di tim agensi untuk diproses naskahnya
      version: 'Draf Naskah',
      caption: clientRequestForm.caption || clientRequestForm.notes || 'Permintaan konsep konten dari klien.',
      mediaUrl: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=600&auto=format&fit=crop&q=80',
      feedbackHistory: [
        { 
          sender: 'Klien', 
          text: `Request konten baru diajukan: "${clientRequestForm.title}". Catatan: ${clientRequestForm.notes || 'Mohon disiapkan naskahnya.'}`, 
          time: 'Baru saja' 
        }
      ]
    };

    // Tambah kuota jika belum penuh
    setClientPipeline(prev => prev.map(c => {
      if (c.id === currentClientId) {
        if (isReels) {
          return { ...c, reelsUsed: c.reelsUsed + 1 };
        } else {
          return { ...c, postsUsed: c.postsUsed + 1 };
        }
      }
      return c;
    }));

    // Masukkan ke database konten
    setContentList(prev => [newRequestedItem, ...prev]);
    setShowClientRequestModal(false);
    
    // Reset form
    setClientRequestForm({
      title: '',
      type: 'Reels / Video Pendek',
      date: '2026-10-29',
      caption: '',
      notes: ''
    });

    if (isQuotaFull) {
      triggerNotification(`Request "${newRequestedItem.title}" terkirim ke Admin Cermin sebagai slot tambahan!`);
    } else {
      triggerNotification(`Permintaan konten "${newRequestedItem.title}" berhasil diajukan & masuk radar tim kreatif!`);
    }
  };

  // Register Demo Account (Jalur 1)
  const handleRegisterDemo = (e) => {
    e.preventDefault();
    if (!demoEmail) return;

    setUser({
      name: demoEmail.split('@')[0],
      email: demoEmail,
      business: 'Prospek Demo Brand',
      instagram: '@demobrand'
    });
    setAccountType('demo');
    setShowDemoRegisterModal(false);
    setCurrentPage('dashboard');
    setActiveTab('overview');
    triggerNotification('Selamat datang di Akun Demo Cermin Kreatif! Kalender & Video terkunci.');
  };

  // Submit Instant Brief (Jalur 2)
  const handleBriefSubmit = (e, source = 'landing') => {
    e.preventDefault();
    if (!briefForm.email || !briefForm.name) return;

    const newClientId = `CK-${Math.floor(100 + Math.random() * 900)}`;
    const registeredUser = {
      name: briefForm.name,
      email: briefForm.email,
      business: briefForm.business || 'Bisnis Klien Baru',
      instagram: briefForm.instagram || '@brand'
    };

    const newQueueItem = {
      id: newClientId,
      name: briefForm.name,
      business: briefForm.business,
      instagram: briefForm.instagram,
      email: briefForm.email,
      package: briefForm.package,
      reelsUsed: 0,
      reelsMax: briefForm.package.includes('Starter') ? 4 : 12,
      postsUsed: 0,
      postsMax: briefForm.package.includes('Starter') ? 0 : 8,
      status: 'Menunggu Verifikasi DP',
      statusBadge: 'bg-amber-950/80 text-amber-300 border-amber-700/80',
      dpAmount: 'Rp 6.500.000',
      totalValue: 'Rp 13.000.000',
      paymentTerm: 'Termin 1 (DP 50%)',
      transferProof: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&auto=format&fit=crop&q=80',
      invoiceNumber: `INV/2026/CK/${newClientId}`,
      briefNotes: briefForm.notes || 'Pengajuan brief kilat melalui web.',
      registeredAt: 'Baru saja',
      isUnlocked: false,
      picAssigned: 'Tim Creative Cermin'
    };

    setClientPipeline(prev => [newQueueItem, ...prev]);
    setUser(registeredUser);
    setAccountType('demo');
    setShowBriefModal(false);

    // Open WhatsApp
    const waText = encodeURIComponent(
      `Halo Tim Cermin Kreatif, saya telah mengisi brief dari web:\n` +
      `• No Invoice: ${newQueueItem.invoiceNumber}\n` +
      `• Nama: ${briefForm.name}\n` +
      `• Bisnis: ${briefForm.business} (${briefForm.instagram})\n` +
      `• Paket: ${briefForm.package}\n` +
      `• Email Akun: ${briefForm.email}\n` +
      `• Catatan: ${briefForm.notes || 'Siap konsultasi alur konten dan verifikasi DP.'}`
    );
    window.open(`https://wa.me/6281234567890?text=${waText}`, '_blank', 'noopener,noreferrer');

    setCurrentPage('dashboard');
    setActiveTab('overview');
    triggerNotification('Brief tersimpan ke sistem admin! Dashboard demo aktif, menanti konfirmasi DP.');
  };

  // Guard for locked menus
  const handleNavClick = (tabKey) => {
    if (accountType === 'demo' && (tabKey === 'calendar' || tabKey === 'production')) {
      setShowBriefModal(true);
      return;
    }
    setActiveTab(tabKey);
  };

  // Content Approval & Revision Logic with Audit Trail
  const updateContentStatus = (id, newStatus, feedbackText = '') => {
    setContentList(prev => prev.map(item => {
      if (item.id === id) {
        let color = 'slate';
        let stage = item.stage;
        let ball = item.ballInCourt;

        if (newStatus === 'Disetujui') {
          color = 'emerald';
          stage = 'scheduled';
          ball = 'agency';
        }
        if (newStatus === 'Perlu Revisi') {
          color = 'rose';
          stage = 'revision';
          ball = 'agency'; // Bola di agensi untuk dikerjakan tim editor
        }
        if (newStatus === 'Menunggu Review') {
          color = 'amber';
          stage = 'review';
          ball = 'client'; // Bola di klien untuk di-review
        }

        const newHistory = feedbackText ? [
          ...item.feedbackHistory,
          { sender: 'Klien', text: feedbackText, time: 'Baru saja' }
        ] : item.feedbackHistory;

        return {
          ...item,
          status: newStatus,
          statusColor: color,
          stage: stage,
          ballInCourt: ball,
          version: newStatus === 'Disetujui' ? `${item.version} (Approved)` : item.version,
          feedbackHistory: newHistory
        };
      }
      return item;
    }));
    setShowRevisionBox(false);
    setRevisionInput('');
    setSelectedCalendarItem(null);
    triggerNotification(`Status konten diperbarui: ${newStatus}`);
  };

  // Admin submit revised draft to client (Agensi menyelesaikan revisi & mengembalikan bola ke klien)
  const handleAdminSubmitRevisionFix = (id, noteText) => {
    setContentList(prev => prev.map(item => {
      if (item.id === id) {
        const nextVersion = item.version.startsWith('V1') ? 'V2 (Draf Revisi)' : 'V3 (Final)';
        return {
          ...item,
          version: nextVersion,
          stage: 'review',
          status: 'Menunggu Review',
          statusColor: 'amber',
          ballInCourt: 'client', // Bola dikembalikan ke klien
          feedbackHistory: [
            ...item.feedbackHistory,
            { sender: 'Tim Agensi', text: noteText || 'Revisi selesai dikerjakan sesuai catatan. Siap review ulang.', time: 'Baru saja' }
          ]
        };
      }
      return item;
    }));
    setAdminResolutionNote('');
    setSelectedCalendarItem(null);
    triggerNotification('Draf revisi berhasil dikirim ulang ke Klien! Status kembali: Menunggu Review.');
  };

  // Admin Move Stage via Kanban
  const handleAdminMoveStage = (contentId, newStage) => {
    setContentList(prev => prev.map(item => {
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
    }));
    triggerNotification(`Tahapan konten dipindahkan ke: ${newStage.toUpperCase()}`);
  };

  // Admin quick WhatsApp reminder to client
  const handlePingClientReview = (clientObj, contentItem) => {
    const text = encodeURIComponent(
      `Halo Kak ${clientObj.name} dari ${clientObj.business}! 👋\n` +
      `Tim Cermin Kreatif telah mengunggah draf konten baru: "${contentItem.title}".\n` +
      `Silakan cek dan berikan approval di Portal Klien agar jadwal posting tgl ${contentItem.day} tetap aman. Terima kasih!`
    );
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank', 'noopener,noreferrer');
    triggerNotification(`Template WhatsApp review untuk ${clientObj.business} dibuka!`);
  };

  // Verify client payment
  const handleVerifyClientPayment = (clientId) => {
    setClientPipeline(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          status: 'Aktif Resmi (Lunas DP)',
          statusBadge: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/80',
          isUnlocked: true,
          paymentTerm: 'Termin 1 Lunas (Akses Buka)'
        };
      }
      return c;
    }));

    setAccountType('official');
    setSelectedProofClient(null);
    triggerNotification(`Invoice ${clientId} Diverifikasi! Kalender & Video diaktifkan penuh.`);
  };

  // Admin Add Content
  const handleAdminAddContent = (e) => {
    e.preventDefault();
    if (!newContentForm.title) return;

    const parseDay = parseInt(newContentForm.date.split('-')[2], 10) || 28;
    const newItem = {
      id: Date.now(),
      clientId: adminSelectedClient,
      date: newContentForm.date,
      dayNumber: parseDay,
      day: `${parseDay < 10 ? '0' : ''}${parseDay} Okt`,
      weekday: 'Terjadwal',
      title: newContentForm.title,
      type: newContentForm.type,
      stage: 'review',
      status: 'Menunggu Review',
      statusColor: 'amber',
      ballInCourt: 'client',
      version: 'V1',
      caption: newContentForm.caption || 'Caption siap review.',
      mediaUrl: newContentForm.mediaUrl,
      feedbackHistory: [
        { sender: 'Agensi', text: 'Draf konten baru diunggah oleh Media Ops', time: 'Baru saja' }
      ]
    };

    // Update quota usage
    setClientPipeline(prev => prev.map(c => {
      if (c.id === adminSelectedClient) {
        if (newContentForm.type.includes('Reels')) {
          return { ...c, reelsUsed: Math.min(c.reelsUsed + 1, c.reelsMax + 5) };
        } else {
          return { ...c, postsUsed: Math.min(c.postsUsed + 1, c.postsMax + 5) };
        }
      }
      return c;
    }));

    setContentList(prev => [newItem, ...prev]);
    setShowAddContentModal(false);
    setNewContentForm({
      title: '',
      type: 'Reels / Video Pendek',
      date: '2026-10-28',
      dayNumber: 28,
      caption: '',
      mediaUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=600&auto=format&fit=crop&q=80'
    });
    triggerNotification(`Konten baru berhasil dijadwalkan ke kalender & kuota diperbarui!`);
  };

  // Add-on quota upsell
  const handleAddOnUpsell = (clientId, addedReels) => {
    setClientPipeline(prev => prev.map(c => {
      if (c.id === clientId) {
        return {
          ...c,
          reelsMax: c.reelsMax + addedReels,
          totalValue: `Rp ${(parseInt(c.totalValue.replace(/\D/g, ''), 10) + (addedReels * 450000)).toLocaleString('id-ID')}`
        };
      }
      return c;
    }));
    setShowAddOnModal(false);
    triggerNotification(`Add-on ${addedReels} Reels berhasil ditambahkan ke kontrak klien!`);
  };

  // Video progress update
  const handleAdminUpdateTask = (taskId, newProgress, newStatus) => {
    setVideoTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        return { ...t, progress: newProgress, status: newStatus };
      }
      return t;
    }));
    triggerNotification(`Tahap produksi video diperbarui!`);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setUser({
      name: 'Budi Santoso',
      email: 'budi@mavencoffee.id',
      business: 'Maven Coffee Roasters',
      instagram: '@mavencoffee'
    });
    setAccountType('official');
    setCurrentPage('dashboard');
    triggerNotification('Berhasil masuk sebagai Klien Resmi.');
  };

  const calendarDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const currentAdminClientObj = clientPipeline.find(c => c.id === adminSelectedClient) || clientPipeline[0];
  const clientContentItems = contentList.filter(item => item.clientId === adminSelectedClient);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-neutral-800 selection:text-neutral-100">
      
      {/* SIMULATOR QUICK CONTROL TOPBAR */}
      <header className="bg-neutral-900 border-b border-neutral-800 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs z-40 sticky top-0">
        <div className="flex items-center gap-3">
          <span className="font-mono text-neutral-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Simulasi Role:
          </span>
          <div className="inline-flex rounded-md p-0.5 bg-neutral-950 border border-neutral-800">
            <button
              onClick={() => setCurrentPage('dashboard')}
              className={`px-3 py-1 rounded text-xs transition ${
                currentPage === 'dashboard' 
                  ? 'bg-neutral-800 text-neutral-100 font-medium shadow-sm' 
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Portal Klien ({accountType === 'official' ? 'Resmi' : 'Demo'})
            </button>
            <button
              onClick={() => setCurrentPage('admin')}
              className={`px-3 py-1 rounded text-xs transition flex items-center gap-1.5 ${
                currentPage === 'admin' 
                  ? 'bg-amber-500 text-neutral-950 font-semibold shadow-sm' 
                  : 'text-amber-400 hover:text-amber-300'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Dasbor Admin Cermin</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleAccountStatus}
            className={`px-3 py-1.5 rounded text-xs font-medium border flex items-center gap-1.5 transition ${
              accountType === 'official'
                ? 'bg-emerald-950/70 border-emerald-700/80 text-emerald-300 hover:bg-emerald-900/60'
                : 'bg-amber-950/70 border-amber-700/80 text-amber-300 hover:bg-amber-900/60'
            }`}
          >
            {accountType === 'official' ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Status: Klien Resmi (Terbuka)</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>Simulasikan Bayar DP (Buka Gembok)</span>
              </>
            )}
          </button>

          {currentPage !== 'landing' && (
            <button
              onClick={() => setCurrentPage('landing')}
              className="px-2.5 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs transition border border-neutral-700"
            >
              Landing Page
            </button>
          )}
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {notification && (
        <aside aria-label="Notifikasi sistem" className="fixed bottom-6 right-6 z-50 max-w-md bg-neutral-900 border border-neutral-700 text-neutral-200 px-4 py-3 rounded-lg shadow-2xl flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed">{notification}</div>
          <button onClick={() => setNotification(null)} className="text-neutral-500 hover:text-neutral-300 ml-auto">
            <X className="w-4 h-4" />
          </button>
        </aside>
      )}

      {/* ========================================================
          ROUTING: LANDING PAGE VIEW
      ======================================================== */}
      {currentPage === 'landing' && (
        <div className="flex-1 flex flex-col">
          <nav className="border-b border-neutral-800/80 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-neutral-200 text-neutral-950 font-bold flex items-center justify-center tracking-tighter">
                CK
              </div>
              <div>
                <span className="font-semibold text-base tracking-tight text-neutral-100">Cermin Kreatif</span>
                <span className="text-xs text-neutral-400 block leading-none">Social Media & Video Agency</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
              <a href="#portfolio" className="hover:text-white transition">Portofolio</a>
              <a href="#brief-form" className="hover:text-white transition">Kirim Brief Instan</a>
              <button 
                onClick={() => setCurrentPage('admin')} 
                className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-mono text-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Portal Tim Admin
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentPage('login')}
                className="text-xs md:text-sm text-neutral-300 hover:text-white px-3 py-2"
              >
                Masuk Klien
              </button>
              <button 
                onClick={() => setShowDemoRegisterModal(true)}
                className="text-xs md:text-sm bg-neutral-100 text-neutral-950 hover:bg-neutral-200 px-4 py-2 rounded font-medium transition"
              >
                Coba Akun Demo
              </button>
            </div>
          </nav>

          <section className="px-6 py-20 max-w-5xl mx-auto text-center flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-400 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-neutral-300" />
              <span>Sistem Kolaborasi Konten & Transparansi Produksi Video</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-neutral-100 leading-tight md:leading-[1.15] mb-6">
              Bukan Sekadar Posting Konten.<br />
              <span className="text-neutral-400 font-normal">Kami Merekayasa Retensi dan Identitas Brand Anda.</span>
            </h1>

            <p className="max-w-2xl text-neutral-400 text-base md:text-lg mb-10 leading-relaxed font-light">
              Platform kolaborasi satu pintu antara Anda dan tim kreatif. Pantau naskah, kalender publikasi bulanan, 
              serta proses revisi video secara real-time tanpa tercecer di chat WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <button
                onClick={() => setShowDemoRegisterModal(true)}
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-neutral-100 text-neutral-950 font-medium hover:bg-neutral-200 flex items-center justify-center gap-2 transition"
              >
                <span>Coba Akun Demo Gratis</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#brief-form"
                className="w-full sm:w-auto px-6 py-3.5 rounded bg-neutral-900 border border-neutral-700 text-neutral-200 hover:bg-neutral-800 flex items-center justify-center gap-2 transition"
              >
                <span>Isi Brief Bisnis (Jalur Kilat)</span>
              </a>
            </div>

            <div className="mt-12 flex items-center gap-6 text-xs text-neutral-500 font-mono">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Kalender Interaktif
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Verifikasi Birokrasi DP Transparan
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Sistem Approval 1-Klik
              </div>
            </div>
          </section>

          <section className="border-y border-neutral-900 py-6 bg-neutral-950 overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 text-center text-xs font-mono uppercase text-neutral-500 mb-4 tracking-widest">
              Telah Memproduksi Lebih dari 1.200+ Konten Komersial Untuk
            </div>
            <div className="flex justify-center items-center gap-8 md:gap-14 opacity-60 grayscale hover:grayscale-0 transition flex-wrap px-4">
              <span className="font-semibold text-lg text-neutral-400">ARCHE APPAREL</span>
              <span className="font-semibold text-lg text-neutral-400">MAVEN COFFEE</span>
              <span className="font-semibold text-lg text-neutral-400">LUMEN SKIN</span>
              <span className="font-semibold text-lg text-neutral-400">URBAN LIVING</span>
              <span className="font-semibold text-lg text-neutral-400">FINTECH ASIA</span>
            </div>
          </section>

          <section id="portfolio" className="py-20 px-6 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-neutral-100">Katalog Karya & Standar Visual</h2>
                <p className="text-sm text-neutral-400 mt-1">Gaya produksi clean, high-retention, dan direct-response marketing.</p>
              </div>
              <div className="text-xs font-mono text-neutral-400 border border-neutral-800 px-3 py-1.5 rounded">
                Semua Konten Dikurasi Oleh Creative Director
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Cinematic Fashion Reels', tag: 'Produksi Video', ratio: '9:16 Vertical', img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80' },
                { title: 'Food & Beverage Macro Shots', tag: 'Social Media', ratio: 'Feed & Story', img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80' },
                { title: 'Founder Story & Podcast Snippets', tag: 'Branding', ratio: 'Omnichannel', img: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&auto=format&fit=crop&q=80' }
              ].map((item, idx) => (
                <div key={idx} className="group border border-neutral-800 rounded-lg overflow-hidden bg-neutral-900/50">
                  <div className="h-48 overflow-hidden bg-neutral-800 relative">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80"
                    />
                    <div className="absolute top-3 left-3 bg-neutral-900/80 backdrop-blur px-2 py-0.5 rounded text-[10px] text-neutral-300 font-mono">
                      {item.ratio}
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wide">{item.tag}</span>
                    <h3 className="text-sm font-medium text-neutral-200 mt-1">{item.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="brief-form" className="py-20 px-6 border-t border-neutral-900 bg-neutral-900/20">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Jalur Kilat Langsung</span>
                <h2 className="text-3xl font-semibold text-neutral-100 mt-2">Formulir Brief Kebutuhan Agensi</h2>
                <p className="text-sm text-neutral-400 mt-2">
                  Isi data proyek Anda di bawah. Data otomatis masuk ke antrean verifikasi Admin Cermin Kreatif, 
                  mempersiapkan akun Anda, dan langsung menghubungkan ke WhatsApp PIC.
                </p>
              </div>

              <form onSubmit={(e) => handleBriefSubmit(e, 'landing')} className="space-y-4 bg-neutral-900/90 border border-neutral-800 p-6 md:p-8 rounded-xl shadow-xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Nama Lengkap PIC</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Raditya Pratama"
                      value={briefForm.name}
                      onChange={(e) => setBriefForm({ ...briefForm, name: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Nama Bisnis / Brand</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Maven Coffee"
                      value={briefForm.business}
                      onChange={(e) => setBriefForm({ ...briefForm, business: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Instagram Brand</label>
                    <input
                      type="text"
                      required
                      placeholder="@namabrand"
                      value={briefForm.instagram}
                      onChange={(e) => setBriefForm({ ...briefForm, instagram: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Paket Kerja Sama</label>
                    <select
                      value={briefForm.package}
                      onChange={(e) => setBriefForm({ ...briefForm, package: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    >
                      <option value="Starter Video (4 Reels Shoot)">Starter Video (4 Reels Shoot)</option>
                      <option value="Growth Video (12 Reels + 8 Post)">Growth Video (12 Reels + 8 Post)</option>
                      <option value="Full Retainer Social Media & Ads Creative">Full Retainer + Ads Creative</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Email Akun Baru</label>
                    <input
                      type="email"
                      required
                      placeholder="klien@bisnis.com"
                      value={briefForm.email}
                      onChange={(e) => setBriefForm({ ...briefForm, email: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-300 mb-1.5">Buat Password Akun</label>
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={briefForm.password}
                      onChange={(e) => setBriefForm({ ...briefForm, password: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-neutral-300 mb-1.5">Ekspektasi Goal / Catatan Khusus</label>
                  <textarea
                    rows={2}
                    placeholder="Contoh: Fokus ke edukasi produk kecantikan, target audiens Gen-Z wanita."
                    value={briefForm.notes}
                    onChange={(e) => setBriefForm({ ...briefForm, notes: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-medium text-sm flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim & Buat Akun (Otomatis Masuk Sistem & WhatsApp)</span>
                </button>
              </form>
            </div>
          </section>

          <footer className="border-t border-neutral-900 py-8 px-6 text-center text-xs text-neutral-600">
            <p>© 2026 Cermin Kreatif Media Agency. Seluruh hak cipta dilindungi.</p>
          </footer>
        </div>
      )}

      {/* ========================================================
          ROUTING: LOGIN PAGE
      ======================================================== */}
      {currentPage === 'login' && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="w-full max-w-sm bg-neutral-900 border border-neutral-800 rounded-xl p-6 shadow-xl">
            <div className="text-center mb-6">
              <div className="w-10 h-10 rounded bg-neutral-100 text-neutral-950 font-bold flex items-center justify-center mx-auto mb-3">
                CK
              </div>
              <h2 className="text-lg font-semibold text-neutral-100">Portal Klien Cermin Kreatif</h2>
              <p className="text-xs text-neutral-400 mt-1">Masuk untuk melihat kalender dan progres produksi.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Email Klien</label>
                <input
                  type="email"
                  defaultValue="budi@mavencoffee.id"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Password</label>
                <input
                  type="password"
                  defaultValue="password123"
                  required
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-medium text-xs transition"
              >
                Masuk Portal Klien
              </button>
            </form>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-between items-center text-xs text-neutral-400">
              <button onClick={() => setCurrentPage('landing')} className="hover:text-white">
                ← Kembali ke Landing
              </button>
              <button onClick={() => setShowDemoRegisterModal(true)} className="text-neutral-300 hover:underline">
                Coba Demo Dulu
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          ROUTING: UNIFIED CLIENT DASHBOARD (DEMO & OFFICIAL)
      ======================================================== */}
      {currentPage === 'dashboard' && (
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          <div className="md:hidden border-b border-neutral-800 p-4 flex items-center justify-between bg-neutral-900">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-neutral-200 text-neutral-950 font-bold flex items-center justify-center text-xs">
                CK
              </div>
              <span className="font-medium text-sm">Cermin Workspace</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 rounded bg-neutral-800 text-neutral-300"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          <aside className={`
            ${mobileMenuOpen ? 'block' : 'hidden'} 
            md:block w-full md:w-64 border-r border-neutral-800 bg-neutral-950/60 p-4 shrink-0 flex flex-col justify-between
          `}>
            <div>
              <div className="hidden md:flex items-center gap-3 pb-6 border-b border-neutral-800 mb-6">
                <div className="w-8 h-8 rounded bg-neutral-200 text-neutral-950 font-bold flex items-center justify-center text-sm">
                  CK
                </div>
                <div className="overflow-hidden">
                  <div className="font-semibold text-sm truncate text-neutral-100">Cermin Kreatif</div>
                  <div className="text-[11px] text-neutral-400 truncate">Agency Portal v3.0</div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-neutral-900 border border-neutral-800 mb-6">
                <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 mb-1">Akun Terhubung:</div>
                <div className="text-xs font-medium text-neutral-200 truncate">{user ? user.business : 'Maven Coffee Roasters'}</div>
                <div className="text-[11px] text-neutral-400 truncate">{user ? user.email : 'budi@mavencoffee.id'}</div>
                
                <div className="mt-2.5 pt-2 border-t border-neutral-800/80 flex items-center justify-between">
                  <span className="text-[10px] text-neutral-400">Tipe Akses:</span>
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                    accountType === 'official' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
                  }`}>
                    {accountType === 'official' ? 'Klien Resmi' : 'Mode Demo'}
                  </span>
                </div>
              </div>

              <nav className="space-y-1">
                <button
                  onClick={() => handleNavClick('overview')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    activeTab === 'overview' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4" />
                    <span>Dasbor Utama</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('calendar')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    activeTab === 'calendar' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4" />
                    <span>Kalender Konten</span>
                  </div>
                  {accountType === 'demo' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono bg-neutral-900 text-amber-400 px-1.5 py-0.5 rounded border border-neutral-800">
                      <Lock className="w-2.5 h-2.5" /> Gembok
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('production')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    activeTab === 'production' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Video className="w-4 h-4" />
                    <span>Progres Video & Shoot</span>
                  </div>
                  {accountType === 'demo' && (
                    <span className="flex items-center gap-1 text-[10px] font-mono bg-neutral-900 text-amber-400 px-1.5 py-0.5 rounded border border-neutral-800">
                      <Lock className="w-2.5 h-2.5" /> Gembok
                    </span>
                  )}
                </button>

                <button
                  onClick={() => handleNavClick('analytics')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    activeTab === 'analytics' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart3 className="w-4 h-4" />
                    <span>Laporan Analisis</span>
                  </div>
                </button>

                <button
                  onClick={() => handleNavClick('strategy')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    activeTab === 'strategy' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4" />
                    <span>Strategi Brand & Hook</span>
                  </div>
                </button>
              </nav>
            </div>

            <div className="pt-6 border-t border-neutral-800 space-y-3">
              {accountType === 'demo' ? (
                <div className="bg-amber-950/40 border border-amber-900/60 p-3 rounded text-[11px] text-amber-300">
                  <div className="flex items-center gap-1.5 font-medium mb-1">
                    <Lock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Fitur Draf Terkunci</span>
                  </div>
                  <p className="text-[10px] text-amber-300/80 leading-relaxed mb-2">
                    Kirim brief & konfirmasi DP agar admin mengaktifkan kalender.
                  </p>
                  <button
                    onClick={() => setShowBriefModal(true)}
                    className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded font-medium text-[11px]"
                  >
                    Buka Formulir Brief
                  </button>
                </div>
              ) : (
                <div className="bg-neutral-900 border border-neutral-800 p-3 rounded text-[11px] text-neutral-300">
                  <div className="flex items-center gap-1.5 font-medium text-emerald-400 mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Paket Aktif & Terverifikasi</span>
                  </div>
                  <p className="text-[10px] text-neutral-400">
                    Semua jadwal feed dan link shoot video sinkron penuh.
                  </p>
                </div>
              )}

              <button
                onClick={() => {
                  setUser(null);
                  setCurrentPage('landing');
                }}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-500 hover:text-neutral-300 transition"
              >
                Keluar Akun
              </button>
            </div>
          </aside>

          <main className="flex-1 p-4 md:p-8 overflow-y-auto">
            {accountType === 'demo' && !demoNoticeClosed && (
              <div className="mb-6 bg-amber-950/50 border border-amber-800/80 rounded-lg p-4 flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-xs font-semibold text-amber-200">
                      Anda berada dalam Mode Akun Demo (Menunggu Verifikasi DP)
                    </h3>
                    <p className="text-xs text-amber-300/80 mt-0.5 leading-relaxed">
                      Menu <strong>Kalender Konten</strong> dan <strong>Progres Video</strong> saat ini dikunci. 
                      Admin Cermin dapat memverifikasi pembayaran Anda di <strong>Dasbor Admin</strong> atau gunakan tombol cepat simulasi di pojok atas.
                    </p>
                    <div className="mt-2.5 flex items-center gap-2">
                      <button
                        onClick={() => setShowBriefModal(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-200 bg-amber-900/60 hover:bg-amber-800/60 border border-amber-700/80 px-2.5 py-1 rounded"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Kirim Brief Kebutuhan</span>
                      </button>
                      <button
                        onClick={() => setCurrentPage('admin')}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                        <span>Lihat Panel Admin Birokrasi</span>
                      </button>
                    </div>
                  </div>
                </div>
                <button onClick={() => setDemoNoticeClosed(true)} className="text-amber-400 hover:text-amber-200">
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {accountType === 'official' && (
              <div className="mb-6 bg-neutral-900 border border-neutral-800 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400 flex items-center justify-center shrink-0">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-medium text-neutral-200">
                      Selamat Datang di Workspace Resmi, {user ? user.name : 'Budi Santoso'}!
                    </div>
                    <div className="text-[11px] text-neutral-400">
                      Birokrasi DP Terverifikasi. Kalender bulanan interaktif dan folder Drive produksi aktif.
                    </div>
                  </div>
                </div>
                <div className="text-xs font-mono text-neutral-400 bg-neutral-950 px-3 py-1.5 rounded border border-neutral-800 shrink-0">
                  Sisa Kuota: 8 Reels • 5 Post Tersedia
                </div>
              </div>
            )}

            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                  <div>
                    <h2 className="text-xl font-semibold text-neutral-100">Ikhtisar Akun & Progres Agensi</h2>
                    <p className="text-xs text-neutral-400 mt-1">Status koordinasi kreatif antara brand dan tim Cermin Kreatif.</p>
                  </div>
                  {accountType === 'official' && (
                    <button
                      onClick={() => setShowClientRequestModal(true)}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajukan Request Konten</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">STATUS KONTRAK</span>
                    <div className="text-lg font-semibold text-neutral-100 mt-1 flex items-center gap-1.5">
                      {accountType === 'official' ? 'Aktif Berjalan' : 'Prospek Demo'}
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      {accountType === 'official' ? 'DP Terverifikasi Admin' : 'Menunggu DP / Review'}
                    </span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">KONTEN BULAN INI</span>
                    <div className="text-lg font-semibold text-neutral-100 mt-1">
                      {accountType === 'official' ? '5 Konten Terjadwal' : '3 Contoh Demo'}
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      {accountType === 'official' ? '1 Menunggu Review Anda' : 'Pratinjau Terkunci'}
                    </span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">VIDEO SHOOTING</span>
                    <div className="text-lg font-semibold text-neutral-100 mt-1">
                      {accountType === 'official' ? 'Batch 1 Siap' : 'Belum Dijadwalkan'}
                    </div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">
                      {accountType === 'official' ? 'Studio Malang' : 'Ajukan Brief Terlebih Dulu'}
                    </span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">CREATIVE PIC</span>
                    <div className="text-lg font-semibold text-neutral-100 mt-1">Dimas & Farhan</div>
                    <span className="text-[10px] text-neutral-500 mt-1 block">Video Director & Copywriter</span>
                  </div>
                </div>

                {accountType === 'demo' ? (
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-xl p-6 text-center max-w-2xl mx-auto py-10">
                    <Lock className="w-10 h-10 text-amber-500 mx-auto mb-3" />
                    <h3 className="text-base font-semibold text-neutral-100">Birokrasi & Fitur Kalender Terkunci</h3>
                    <p className="text-xs text-neutral-400 max-w-md mx-auto mt-2 leading-relaxed">
                      Di dalam portal resmi, klien mendapatkan kalender interaktif bulanan, timeline penayangan otomatis, 
                      dan approval draf video langsung dengan histori revisi.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                      <button
                        onClick={() => setShowBriefModal(true)}
                        className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-medium text-xs flex items-center gap-1.5 transition"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Kirim Brief Kebutuhan Brand</span>
                      </button>
                      <button
                        onClick={() => setCurrentPage('admin')}
                        className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs transition"
                      >
                        Buka Dasbor Admin untuk Verifikasi DP
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-neutral-200">Perlu Tindakan Anda (Review)</h4>
                        <span className="text-[10px] font-mono bg-amber-950 text-amber-400 px-2 py-0.5 rounded border border-amber-800">
                          1 Konten Pending
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="p-3 rounded bg-neutral-950 border border-neutral-800 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-medium text-neutral-200">Reels: Behind The Scenes Shoot</div>
                            <div className="text-[11px] text-neutral-400 mt-0.5">Jadwal: 05 Okt • Bola di Tangan Anda</div>
                          </div>
                          <button
                            onClick={() => {
                              setActiveTab('calendar');
                              setSelectedCalendarItem(contentList[0]);
                            }}
                            className="text-xs bg-neutral-800 hover:bg-neutral-700 text-neutral-200 px-3 py-1.5 rounded"
                          >
                            Review Draf
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-semibold text-neutral-200">Akses Tim Produksi</h4>
                        <span className="text-[10px] font-mono text-emerald-400">Aktif & Sinkron</span>
                      </div>
                      <p className="text-xs text-neutral-400 leading-relaxed">
                        Folder Drive penyimpanan mentahan video resolusi 4K dan aset grafis Photoshop/Figma telah tersinkronisasi.
                      </p>
                      <div className="mt-4 flex gap-2">
                        <a
                          href="https://drive.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs text-neutral-200 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded border border-neutral-700"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Buka Google Drive Bersama</span>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: KALENDER KONTEN SISI KLIEN */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold text-neutral-100">Kalender Publikasi & Feed Planning</h2>
                      <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                        Sisa Kuota: {Math.max(0, 12 - (contentList.filter(c => c.clientId === 'CK-091' && c.type.includes('Reels')).length))} Reels
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400 mt-1">Interaksi kalender tanggalan, visual feed, status approval, dan revisi naskah.</p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setShowClientRequestModal(true)}
                      className="px-3.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center gap-1.5 shadow-sm transition"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Request Konten Baru</span>
                    </button>

                    <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-xs">
                      <button
                        onClick={() => setCalendarViewMode('monthly')}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                          calendarViewMode === 'monthly' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <CalendarDays className="w-3.5 h-3.5" />
                        <span>Grid Kalender</span>
                      </button>
                      <button
                        onClick={() => setCalendarViewMode('list')}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                          calendarViewMode === 'list' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-neutral-200'
                        }`}
                      >
                        <Layers className="w-3.5 h-3.5" />
                        <span>Daftar Feed</span>
                      </button>
                    </div>
                  </div>
                </div>

                {calendarViewMode === 'monthly' && (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-sm text-neutral-200">Oktober 2026</span>
                        <span className="text-[11px] font-mono bg-neutral-950 px-2.5 py-0.5 rounded border border-neutral-800 text-neutral-400">
                          {contentList.filter(c => c.clientId === 'CK-091').length} Konten Terjadwal
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400 flex items-center gap-3">
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400" /> Disetujui
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-amber-400" /> Menunggu Review
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400" /> Revisi
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-mono text-neutral-500 uppercase">
                      <div>Sen</div>
                      <div>Sel</div>
                      <div>Rab</div>
                      <div>Kam</div>
                      <div>Jum</div>
                      <div>Sab</div>
                      <div>Min</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>

                      {calendarDays.map((day) => {
                        const matchedItem = contentList.find(c => c.clientId === 'CK-091' && c.dayNumber === day);
                        const isSelected = activeCalendarDate === day;

                        return (
                          <div
                            key={day}
                            onClick={() => {
                              setActiveCalendarDate(day);
                              if (matchedItem) setSelectedCalendarItem(matchedItem);
                            }}
                            className={`h-24 p-2 rounded border transition cursor-pointer flex flex-col justify-between ${
                              isSelected ? 'border-neutral-400 bg-neutral-800/60' : 'border-neutral-800/80 bg-neutral-950/50 hover:border-neutral-700'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className={`text-xs font-mono font-medium ${isSelected ? 'text-white' : 'text-neutral-400'}`}>
                                {day}
                              </span>
                              {matchedItem && (
                                <span className={`w-2 h-2 rounded-full ${
                                  matchedItem.status === 'Disetujui' ? 'bg-emerald-400' :
                                  matchedItem.status === 'Perlu Revisi' ? 'bg-rose-400' :
                                  'bg-amber-400'
                                }`} />
                              )}
                            </div>

                            {matchedItem ? (
                              <div className="mt-1">
                                <div className="text-[10px] text-neutral-300 font-medium truncate">
                                  {matchedItem.title}
                                </div>
                                <div className="text-[9px] font-mono text-neutral-500 uppercase truncate">
                                  {matchedItem.type}
                                </div>
                              </div>
                            ) : (
                              <span className="text-[9px] text-neutral-700 font-mono">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {contentList.filter(c => c.clientId === 'CK-091').map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setSelectedCalendarItem(item)}
                      className="bg-neutral-900 border border-neutral-800 hover:border-neutral-600 rounded-lg overflow-hidden cursor-pointer transition flex flex-col"
                    >
                      <div className="h-44 bg-neutral-950 relative overflow-hidden">
                        <img 
                          src={item.mediaUrl} 
                          alt={item.title} 
                          className="w-full h-full object-cover opacity-85 hover:scale-105 transition duration-300"
                        />
                        <div className="absolute top-2 left-2 bg-neutral-900/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-mono text-neutral-300">
                          {item.day} ({item.weekday})
                        </div>
                        <div className={`absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded ${
                          item.status === 'Disetujui' ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' :
                          item.status === 'Perlu Revisi' ? 'bg-rose-950 text-rose-300 border border-rose-700' :
                          'bg-amber-950 text-amber-300 border border-amber-700'
                        }`}>
                          {item.status}
                        </div>
                      </div>

                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="text-[10px] font-mono text-neutral-500 uppercase flex items-center justify-between">
                            <span>{item.type}</span>
                            <span className="text-amber-400 font-bold">{item.version}</span>
                          </div>
                          <h4 className="text-xs font-medium text-neutral-200 mt-1 line-clamp-2">{item.title}</h4>
                          <p className="text-[11px] text-neutral-400 mt-2 line-clamp-2 font-light">
                            "{item.caption}"
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
                          <span className="text-neutral-500">Klik untuk review / approval</span>
                          <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: PROGRES VIDEO */}
            {activeTab === 'production' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-100">Pipeline Produksi Video & Shooting</h2>
                  <p className="text-xs text-neutral-400 mt-1">Transparansi alur kerja dari naskah, pengambilan gambar, hingga tahap finishing.</p>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-neutral-800 flex justify-between items-center text-xs text-neutral-400 font-mono">
                    <span>DAFTAR TUGAS & TAHAPAN PRODUKSI</span>
                    <span>STATUS & TAUTAN MENTAHAN</span>
                  </div>

                  <div className="divide-y divide-neutral-800/80">
                    {videoTasks.filter(t => t.clientId === 'CK-091').map((task) => (
                      <div key={task.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-neutral-200">{task.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                              {task.phase}
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-3 mt-2">
                            <div className="w-32 sm:w-48 bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                              <div 
                                className={`h-full ${task.progress === 100 ? 'bg-emerald-500' : 'bg-neutral-300'}`}
                                style={{ width: `${task.progress}%` }}
                              />
                            </div>
                            <span className="text-[11px] font-mono text-neutral-400">{task.progress}%</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-2.5 py-1 rounded font-mono ${
                            task.status === 'Selesai' ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800' :
                            task.status === 'Sedang Berjalan' ? 'bg-amber-950/60 text-amber-300 border border-amber-800' :
                            'bg-neutral-800 text-neutral-400'
                          }`}>
                            {task.status}
                          </span>

                          <a
                            href={task.rawFolder}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-neutral-300 bg-neutral-800 hover:bg-neutral-700 px-3 py-1.5 rounded border border-neutral-700"
                          >
                            <ExternalLink className="w-3 h-3" />
                            <span>Link Mentahan Video</span>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: LAPORAN ANALISIS */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-100">Laporan Metrik & Analisis Performa</h2>
                  <p className="text-xs text-neutral-400 mt-1">Data pertumbuhan akun dari strategi konten yang diterapkan tim Cermin Kreatif.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">TOTAL JANGKAUAN (REACH)</span>
                    <div className="text-2xl font-bold text-neutral-100 mt-1">142.800+</div>
                    <span className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5" /> +34.2% dari bulan lalu
                    </span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">PENONTON REELS VIRAL</span>
                    <div className="text-2xl font-bold text-neutral-100 mt-1">89.400</div>
                    <span className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5" /> Hook audio trending
                    </span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg">
                    <span className="text-[11px] font-mono text-neutral-400">ENGAGEMENT RATE RATA-RATA</span>
                    <div className="text-2xl font-bold text-neutral-100 mt-1">4.82%</div>
                    <span className="text-xs text-neutral-400 mt-1">
                      Rata-rata industri: 1.8%
                    </span>
                  </div>
                </div>

                <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-xs font-semibold text-neutral-200">Grafik Penayangan Video (30 Hari Terakhir)</h4>
                    <span className="text-[10px] font-mono text-neutral-500">Auto-synced via Meta Graph API</span>
                  </div>

                  <div className="h-44 flex items-end gap-2 pt-6 border-b border-neutral-800">
                    {[35, 42, 60, 48, 75, 92, 65, 80, 110, 95, 130, 145].map((val, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full justify-end group">
                        <div 
                          className="w-full bg-neutral-700 group-hover:bg-neutral-300 rounded-t transition"
                          style={{ height: `${(val / 150) * 100}%` }}
                          title={`Minggu ke-${i + 1}: ${val * 1000} tayangan`}
                        />
                        <span className="text-[9px] font-mono text-neutral-500">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] text-neutral-500 font-mono mt-2">
                    <span>Awal Siklus Kerja Sama</span>
                    <span>Lonjakan Pasca Optimasi Hook Video</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: STRATEGI BRAND */}
            {activeTab === 'strategy' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-100">Blueprint Strategi Konten & Hook</h2>
                  <p className="text-xs text-neutral-400 mt-1">Dokumen panduan tone of voice dan positioning yang disusun saat onboarding.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg space-y-3">
                    <span className="text-xs font-mono text-neutral-400">01. PILLAR UTAMA KONTEN</span>
                    <h4 className="text-sm font-semibold text-neutral-200">Edukasi Masalah vs Hiburan Relatable</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      50% Reels dialokasikan untuk menunjukkan solusi instan dari produk. 30% soft-selling storytelling, 
                      dan 20% behind-the-scenes untuk membangun kredibilitas tim pendiri.
                    </p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-5 rounded-lg space-y-3">
                    <span className="text-xs font-mono text-neutral-400">02. FORMULA 3 DETIK PERTAMA</span>
                    <h4 className="text-sm font-semibold text-neutral-200">Negative Hook Pattern Interrupt</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Menghentikan jempol audiens dengan premis paradoks atau kesalahan umum (e.g. 
                      "Jangan beli produk X sebelum tahu alasan mengejutkan ini...").
                    </p>
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* ========================================================
          ROUTING: ADVANCED AGENCY ADMIN OS
      ======================================================== */}
      {currentPage === 'admin' && (
        <div className="flex-1 flex flex-col md:flex-row min-h-0 bg-neutral-950">
          
          {/* DEDICATED ADMIN SIDEBAR */}
          <aside className="w-full md:w-64 border-r border-neutral-800 bg-neutral-900/60 p-4 shrink-0 flex flex-col justify-between">
            <div className="space-y-6">
              
              <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
                <div className="w-8 h-8 rounded bg-amber-400 text-neutral-950 font-black flex items-center justify-center text-sm shadow">
                  CK
                </div>
                <div>
                  <div className="font-semibold text-xs tracking-tight text-neutral-100 uppercase">Cermin Control</div>
                  <div className="text-[10px] text-amber-400 font-mono">Agency Operating Engine</div>
                </div>
              </div>

              {/* Multi-Tenant Active Client Selector */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3">
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1.5 flex items-center gap-1">
                  <Sliders className="w-3 h-3 text-amber-400" /> Klien yang Dikelola:
                </label>
                <select
                  value={adminSelectedClient}
                  onChange={(e) => setAdminSelectedClient(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded px-2.5 py-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                >
                  {clientPipeline.map((cl) => (
                    <option key={cl.id} value={cl.id}>
                      {cl.business} ({cl.isUnlocked ? 'Resmi' : 'Pending'})
                    </option>
                  ))}
                </select>
                <div className="mt-2 text-[10px] text-neutral-400 flex items-center justify-between">
                  <span>PIC: {currentAdminClientObj.picAssigned.split(' ')[0]}</span>
                  <span className={`px-1.5 py-0.5 rounded ${currentAdminClientObj.isUnlocked ? 'text-emerald-400 bg-emerald-950/60' : 'text-amber-400 bg-amber-950/60'}`}>
                    {currentAdminClientObj.isUnlocked ? 'Aktif' : 'DP Pending'}
                  </span>
                </div>
              </div>

              {/* Navigation Menus */}
              <nav className="space-y-1">
                <button
                  onClick={() => setAdminTab('mission_control')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'mission_control' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Mission Control (Overview)</span>
                  </div>
                </button>

                <button
                  onClick={() => setAdminTab('content_engine')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'content_engine' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4" />
                    <span>Manajemen Konten (SOP)</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{clientContentItems.length}</span>
                </button>

                <button
                  onClick={() => setAdminTab('clients')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'clients' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4" />
                    <span>Daftar Klien & Kuota</span>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-500">{clientPipeline.length}</span>
                </button>

                <button
                  onClick={() => setAdminTab('production_mgmt')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'production_mgmt' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Film className="w-4 h-4" />
                    <span>Studio Ops & Video Shoot</span>
                  </div>
                </button>

                <button
                  onClick={() => setAdminTab('finance')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'finance' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Receipt className="w-4 h-4" />
                    <span>Finansial & Verifikasi DP</span>
                  </div>
                  {clientPipeline.filter(c => !c.isUnlocked).length > 0 && (
                    <span className="w-4 h-4 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-bold flex items-center justify-center">
                      {clientPipeline.filter(c => !c.isUnlocked).length}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => setAdminTab('brief_vault')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded text-xs font-medium transition ${
                    adminTab === 'brief_vault' ? 'bg-neutral-800 text-amber-300 border border-neutral-700' : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4" />
                    <span>Vault Brief & Naskah</span>
                  </div>
                </button>
              </nav>
            </div>

            <div className="pt-4 border-t border-neutral-800 space-y-2">
              <div className="text-[10px] font-mono text-neutral-500">
                Studio Malang Core • SLA Guard v3.0
              </div>
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="w-full py-1.5 px-3 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium flex items-center justify-center gap-1.5 transition"
              >
                <ArrowRight className="w-3.5 h-3.5" />
                <span>Buka Dashboard Sisi Klien</span>
              </button>
            </div>
          </aside>

          {/* ADMIN CONTENT WORKSPACE */}
          <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
            
            {/* TOP BAR / CLIENT CONTEXT HEADER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-neutral-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[10px] font-mono border border-amber-500/20">
                    AGENCY COMMAND CENTER
                  </span>
                  <span className="text-xs text-neutral-400 font-mono">
                    Brand Terpilih: <strong className="text-neutral-200">{currentAdminClientObj.business}</strong> ({currentAdminClientObj.instagram})
                  </span>
                </div>
                <h1 className="text-xl font-bold text-neutral-100 mt-1">
                  {adminTab === 'mission_control' && 'Mission Control: Ringkasan Bisnis Agensi & SLA'}
                  {adminTab === 'content_engine' && `The 5-Stage Content Engine: ${currentAdminClientObj.business}`}
                  {adminTab === 'clients' && `Manajemen Kuota Retainer & Kontrak Klien`}
                  {adminTab === 'production_mgmt' && `Studio Ops & Kontrol Shooting Video Lapangan`}
                  {adminTab === 'finance' && `Birokrasi Pembayaran, Invoice & Verifikasi Slip Transfer`}
                  {adminTab === 'brief_vault' && `Vault Dokumen Brief & Naskah Klien`}
                </h1>
              </div>

              {adminTab === 'content_engine' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowAddOnModal(true)}
                    className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Upsell Add-on
                  </button>
                  <button
                    onClick={() => setShowAddContentModal(true)}
                    className="px-3.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-semibold text-xs flex items-center gap-1.5 shadow"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Jadwalkan Konten</span>
                  </button>
                </div>
              )}
            </div>

            {/* ========================================================
                ADMIN TAB 0: MISSION CONTROL (EXECUTIVE OVERVIEW)
            ======================================================== */}
            {adminTab === 'mission_control' && (
              <div className="space-y-6">
                
                {/* 4 Business Health Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center justify-between">
                      <span>TOTAL KONTRAK AKTIF (MRR)</span>
                      <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <div className="text-xl font-bold text-neutral-100 mt-1">Rp 44.000.000</div>
                    <span className="text-[10px] text-emerald-400 mt-1 block">3 Akun Aktif & Retainer</span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <span className="text-[11px] font-mono text-amber-400 flex items-center justify-between">
                      <span>PENDING DP & VERIFIKASI</span>
                      <AlertTriangle className="w-3.5 h-3.5" />
                    </span>
                    <div className="text-xl font-bold text-amber-300 mt-1">Rp 10.000.000</div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">2 Invoice menunggu verifikasi</span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <span className="text-[11px] font-mono text-rose-400 flex items-center justify-between">
                      <span>STALLED IN REVIEW (BOLA DI KLIEN)</span>
                      <Clock className="w-3.5 h-3.5" />
                    </span>
                    <div className="text-xl font-bold text-rose-300 mt-1">
                      {contentList.filter(c => c.stage === 'review').length} Konten
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">Perlu diingatkan via WhatsApp</span>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl">
                    <span className="text-[11px] font-mono text-blue-400 flex items-center justify-between">
                      <span>REQUEST MASUK DARI KLIEN</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </span>
                    <div className="text-xl font-bold text-blue-300 mt-1">
                      {contentList.filter(c => c.status === 'Request Masuk').length} Ide Baru
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">Menunggu naskah disiapkan</span>
                  </div>
                </div>

                {/* Deadlines Radar & Actionable Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  
                  {/* Urgent Review Queue */}
                  <div className="lg:col-span-2 bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-sm font-semibold text-neutral-200">Radar Antrean & Ball-in-Court Action</h3>
                        <p className="text-xs text-neutral-400">Konten yang sedang menunggu tindakan agar tidak melewati jadwal tayang.</p>
                      </div>
                      <span className="text-[10px] font-mono bg-neutral-950 px-2.5 py-1 rounded text-neutral-400 border border-neutral-800">
                        SLA Target: 24 Jam
                      </span>
                    </div>

                    <div className="space-y-3">
                      {contentList.filter(c => c.stage === 'review' || c.stage === 'revision').map(item => {
                        const targetClient = clientPipeline.find(cl => cl.id === item.clientId);
                        return (
                          <div key={item.id} className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                            <div className="flex items-center gap-3">
                              <img src={item.mediaUrl} alt={item.title} className="w-10 h-10 rounded object-cover shrink-0" />
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-neutral-200">{item.title}</span>
                                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${
                                    item.stage === 'review' ? 'bg-amber-950 text-amber-300 border border-amber-800' : 'bg-rose-950 text-rose-300 border border-rose-800'
                                  }`}>
                                    {item.stage === 'review' ? 'Bola di Klien' : 'Bola di Editor (Revisi)'}
                                  </span>
                                </div>
                                <div className="text-[10px] text-neutral-400 mt-0.5">
                                  {targetClient ? targetClient.business : item.clientId} • Jadwal: <strong>{item.day}</strong> • Versi: {item.version}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              {item.stage === 'review' && (
                                <button
                                  onClick={() => handlePingClientReview(targetClient || currentAdminClientObj, item)}
                                  className="px-2.5 py-1 bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 rounded text-xs flex items-center gap-1"
                                >
                                  <Share2 className="w-3 h-3" /> Ping WA Klien
                                </button>
                              )}
                              <button
                                onClick={() => {
                                  setAdminSelectedClient(item.clientId);
                                  setAdminTab('content_engine');
                                }}
                                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded text-xs border border-neutral-700"
                              >
                                Buka Konten
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Team Capacity Load */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200">Beban Kerja Tim Produksi</h3>
                      <p className="text-xs text-neutral-400 mt-1">Kapasitas videografer & editor bulan ini.</p>

                      <div className="space-y-4 mt-5 text-xs">
                        <div>
                          <div className="flex justify-between text-neutral-300 mb-1">
                            <span>Dimas (Creative Lead / Script)</span>
                            <span className="font-mono text-emerald-400">85% (Kapasitas Optimal)</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                            <div className="bg-emerald-500 h-full w-[85%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-neutral-300 mb-1">
                            <span>Farhan (Video Director / Shoot)</span>
                            <span className="font-mono text-amber-400">92% (Tinggi / Studio Penuh)</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                            <div className="bg-amber-500 h-full w-[92%]" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-neutral-300 mb-1">
                            <span>Reza (Senior Editor & Motion)</span>
                            <span className="font-mono text-neutral-300">60% (Siap Menerima Project)</span>
                          </div>
                          <div className="w-full bg-neutral-950 h-2 rounded-full overflow-hidden border border-neutral-800">
                            <div className="bg-neutral-400 h-full w-[60%]" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500 flex justify-between items-center">
                      <span>Studio Malang • Kamera A7S III Ready</span>
                      <button 
                        onClick={() => setAdminTab('production_mgmt')} 
                        className="text-amber-400 hover:underline"
                      >
                        Detail Task →
                      </button>
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 1: THE 5-STAGE CONTENT ENGINE (SOP AGENTIC)
            ======================================================== */}
            {adminTab === 'content_engine' && (
              <div className="space-y-6">
                
                {/* Brand Header Banner with Quota Indicator */}
                <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-base text-neutral-100">{currentAdminClientObj.business}</span>
                      <span className="text-xs font-mono text-neutral-400">{currentAdminClientObj.instagram}</span>
                      <span className="text-[10px] font-mono bg-neutral-950 border border-neutral-800 px-2 py-0.5 rounded text-neutral-400">
                        ID: {currentAdminClientObj.id}
                      </span>
                    </div>
                    <div className="text-xs text-neutral-400">
                      Paket Retainer: <strong>{currentAdminClientObj.package}</strong> • PIC: {currentAdminClientObj.picAssigned}
                    </div>
                  </div>

                  {/* Real-time Quota Health Bar */}
                  <div className="flex items-center gap-4 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800 text-xs">
                    <div>
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono mb-1">
                        <span>REELS: {currentAdminClientObj.reelsUsed}/{currentAdminClientObj.reelsMax}</span>
                        <span className="text-amber-400 ml-2">
                          (Sisa {Math.max(0, currentAdminClientObj.reelsMax - currentAdminClientObj.reelsUsed)})
                        </span>
                      </div>
                      <div className="w-28 bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                        <div 
                          className="bg-amber-400 h-full" 
                          style={{ width: `${Math.min(100, (currentAdminClientObj.reelsUsed / currentAdminClientObj.reelsMax) * 100)}%` }} 
                        />
                      </div>
                    </div>

                    <div className="border-l border-neutral-800 pl-4">
                      <div className="flex justify-between text-[11px] text-neutral-400 font-mono mb-1">
                        <span>POST: {currentAdminClientObj.postsUsed}/{currentAdminClientObj.postsMax}</span>
                        <span className="text-emerald-400 ml-2">
                          (Sisa {Math.max(0, currentAdminClientObj.postsMax - currentAdminClientObj.postsUsed)})
                        </span>
                      </div>
                      <div className="w-28 bg-neutral-900 h-1.5 rounded-full overflow-hidden border border-neutral-800">
                        <div 
                          className="bg-emerald-400 h-full" 
                          style={{ width: `${Math.min(100, (currentAdminClientObj.postsUsed / currentAdminClientObj.postsMax) * 100)}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sub-view Selector: Kanban Stages vs Monthly Grid vs 3x3 Feed Simulator */}
                <div className="flex items-center justify-between">
                  <div className="inline-flex bg-neutral-900 border border-neutral-800 rounded-lg p-1 text-xs">
                    <button
                      onClick={() => setAdminContentViewMode('kanban')}
                      className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                        adminContentViewMode === 'kanban' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Kanban className="w-3.5 h-3.5" />
                      <span>5-Stage Kanban SOP</span>
                    </button>
                    <button
                      onClick={() => setAdminContentViewMode('calendar')}
                      className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                        adminContentViewMode === 'calendar' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <CalendarDays className="w-3.5 h-3.5" />
                      <span>Kalender Distribusi</span>
                    </button>
                    <button
                      onClick={() => setAdminContentViewMode('feed')}
                      className={`px-3 py-1 rounded flex items-center gap-1.5 transition ${
                        adminContentViewMode === 'feed' ? 'bg-neutral-800 text-white font-medium' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Grid3X3 className="w-3.5 h-3.5" />
                      <span>Simulasi Feed 3x3</span>
                    </button>
                  </div>

                  <span className="text-[11px] font-mono text-neutral-500">
                    Menampilkan {clientContentItems.length} Konten untuk {currentAdminClientObj.business}
                  </span>
                </div>

                {/* VIEW A: KANBAN 5-STAGE LIFECYCLE */}
                {adminContentViewMode === 'kanban' && (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                    {[
                      { key: 'script', title: '1. Draf Naskah', badge: 'bg-neutral-800 text-neutral-300' },
                      { key: 'production', title: '2. Produksi / Edit', badge: 'bg-blue-950 text-blue-300 border border-blue-800' },
                      { key: 'review', title: '3. Review Klien', badge: 'bg-amber-950 text-amber-300 border border-amber-800' },
                      { key: 'revision', title: '4. Revisi Editor', badge: 'bg-rose-950 text-rose-300 border border-rose-800' },
                      { key: 'scheduled', title: '5. Siap Tayang', badge: 'bg-emerald-950 text-emerald-300 border border-emerald-800' }
                    ].map(col => {
                      const itemsInCol = clientContentItems.filter(item => item.stage === col.key);
                      return (
                        <div key={col.key} className="bg-neutral-900/70 border border-neutral-800 rounded-xl p-3 flex flex-col min-h-[420px]">
                          <div className="flex justify-between items-center pb-2 mb-3 border-b border-neutral-800">
                            <span className="text-xs font-semibold text-neutral-200">{col.title}</span>
                            <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${col.badge}`}>
                              {itemsInCol.length}
                            </span>
                          </div>

                          <div className="space-y-3 flex-1 overflow-y-auto">
                            {itemsInCol.map(item => (
                              <div 
                                key={item.id} 
                                className="bg-neutral-950 border border-neutral-800 hover:border-neutral-600 rounded-lg p-3 space-y-2 transition shadow-sm"
                              >
                                <div className="h-24 rounded overflow-hidden relative border border-neutral-800">
                                  <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover" />
                                  <div className="absolute top-1.5 left-1.5 bg-neutral-950/80 backdrop-blur text-[9px] font-mono px-1.5 py-0.5 rounded text-neutral-300">
                                    {item.day}
                                  </div>
                                  <div className="absolute top-1.5 right-1.5 bg-neutral-950/90 text-amber-400 text-[9px] font-mono px-1.5 py-0.5 rounded font-bold">
                                    {item.version}
                                  </div>
                                </div>

                                <div className="text-xs font-medium text-neutral-200 line-clamp-2 leading-snug">
                                  {item.title}
                                </div>

                                <div className="text-[10px] text-neutral-400 font-mono truncate">
                                  {item.type}
                                </div>

                                {item.stage === 'review' && (
                                  <button
                                    onClick={() => handlePingClientReview(currentAdminClientObj, item)}
                                    className="w-full py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-medium flex items-center justify-center gap-1"
                                  >
                                    <Share2 className="w-3 h-3" /> Ping WA Klien
                                  </button>
                                )}

                                {/* Interactive Move Stage */}
                                <div className="pt-2 border-t border-neutral-850 flex items-center justify-between text-[10px]">
                                  <span className="text-neutral-500">Pindah Tahap:</span>
                                  <select
                                    value={item.stage}
                                    onChange={(e) => handleAdminMoveStage(item.id, e.target.value)}
                                    className="bg-neutral-900 border border-neutral-700 text-neutral-300 text-[10px] rounded px-1.5 py-0.5 focus:outline-none"
                                  >
                                    <option value="script">Naskah</option>
                                    <option value="production">Produksi</option>
                                    <option value="review">Review Klien</option>
                                    <option value="revision">Revisi</option>
                                    <option value="scheduled">Approved</option>
                                  </select>
                                </div>
                              </div>
                            ))}

                            {itemsInCol.length === 0 && (
                              <div className="h-32 border border-dashed border-neutral-800 rounded-lg flex items-center justify-center text-[11px] text-neutral-600 font-mono">
                                Kosong
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* VIEW B: CALENDAR DISTRIBUTION VIEW */}
                {adminContentViewMode === 'calendar' && (
                  <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4 pb-3 border-b border-neutral-800">
                      <span className="font-semibold text-sm text-neutral-200">Kalender Distribusi {currentAdminClientObj.business}</span>
                      <span className="text-xs font-mono text-neutral-400">Oktober 2026</span>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-mono text-neutral-500 uppercase">
                      <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>
                      <div className="h-24 bg-neutral-950/20 rounded border border-transparent"></div>

                      {calendarDays.map((day) => {
                        const matchedItem = clientContentItems.find(c => c.dayNumber === day);
                        return (
                          <div
                            key={day}
                            onClick={() => {
                              if (matchedItem) setSelectedCalendarItem(matchedItem);
                            }}
                            className={`h-24 p-2 rounded border transition cursor-pointer flex flex-col justify-between ${
                              matchedItem ? 'bg-neutral-900 border-neutral-700' : 'bg-neutral-950/40 border-neutral-850'
                            }`}
                          >
                            <div className="flex justify-between items-start">
                              <span className="text-xs font-mono text-neutral-400">{day}</span>
                              {matchedItem && (
                                <span className={`w-2 h-2 rounded-full ${
                                  matchedItem.stage === 'scheduled' ? 'bg-emerald-400' :
                                  matchedItem.stage === 'revision' ? 'bg-rose-400' : 'bg-amber-400'
                                }`} />
                              )}
                            </div>
                            {matchedItem ? (
                              <div>
                                <div className="text-[10px] text-neutral-200 truncate font-medium">{matchedItem.title}</div>
                                <div className="text-[9px] text-amber-400 font-mono truncate">{matchedItem.version}</div>
                              </div>
                            ) : (
                              <span className="text-[9px] text-neutral-700 font-mono">-</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* VIEW C: 3x3 INSTAGRAM FEED PREVIEW */}
                {adminContentViewMode === 'feed' && (
                  <div className="max-w-md mx-auto bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                    <div className="text-center pb-4 border-b border-neutral-800 mb-4">
                      <div className="w-14 h-14 rounded-full bg-neutral-800 mx-auto mb-2 flex items-center justify-center font-bold text-lg text-amber-400 border border-neutral-700">
                        {currentAdminClientObj.business.substring(0, 2).toUpperCase()}
                      </div>
                      <h4 className="text-sm font-semibold text-neutral-100">{currentAdminClientObj.business}</h4>
                      <p className="text-xs text-neutral-400">{currentAdminClientObj.instagram}</p>
                      <p className="text-[11px] text-neutral-500 mt-1">Pratinjau Estetika Feed Instagram (Harmoni Warna)</p>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5">
                      {clientContentItems.concat(clientContentItems).slice(0, 9).map((item, idx) => (
                        <div 
                          key={idx} 
                          onClick={() => setSelectedCalendarItem(item)}
                          className="aspect-square bg-neutral-950 overflow-hidden relative cursor-pointer group"
                        >
                          <img src={item.mediaUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                          <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center p-2 text-center">
                            <span className="text-[9px] text-white font-medium">{item.title}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* ========================================================
                ADMIN TAB 2: DAFTAR KLIEN & KUOTA RETAINER
            ======================================================== */}
            {adminTab === 'clients' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clientPipeline.map(client => (
                    <div key={client.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-sm font-semibold text-neutral-100">{client.business}</h4>
                          <span className="text-xs text-neutral-400">{client.name} • {client.instagram}</span>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${client.isUnlocked ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'}`}>
                          {client.isUnlocked ? 'Aktif Resmi' : 'Pending DP'}
                        </span>
                      </div>

                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Paket:</span>
                          <span className="text-neutral-200 font-medium">{client.package}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Sisa Kuota Reels:</span>
                          <span className="text-amber-400 font-mono font-bold">{client.reelsUsed} / {client.reelsMax} Konten</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">Nilai Kontrak:</span>
                          <span className="text-emerald-400 font-mono font-bold">{client.totalValue}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-neutral-400">PIC Creative:</span>
                          <span className="text-neutral-300">{client.picAssigned}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          onClick={() => {
                            setAdminSelectedClient(client.id);
                            setAdminTab('content_engine');
                          }}
                          className="flex-1 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-xs font-medium"
                        >
                          Kelola Konten Brand Ini
                        </button>
                        <button
                          onClick={() => {
                            setAdminSelectedClient(client.id);
                            setShowAddOnModal(true);
                          }}
                          className="px-2.5 py-1.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold"
                          title="Tambah kuota Reels ekstra"
                        >
                          +Slot
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ========================================================
                ADMIN TAB 3: STUDIO OPS & VIDEO SHOOTING
            ======================================================== */}
            {adminTab === 'production_mgmt' && (
              <div className="space-y-6">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                  <h3 className="text-sm font-semibold text-neutral-200 mb-1">Status Produksi Video & Shooting Lapangan</h3>
                  <p className="text-xs text-neutral-400 mb-4">
                    Atur progres naskah, shooting studio, dan editing video. Persentase progres langsung tampil di dashboard klien.
                  </p>

                  <div className="space-y-3">
                    {videoTasks.map((task) => (
                      <div key={task.id} className="p-4 bg-neutral-950 rounded-lg border border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-neutral-200">{task.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                              {task.phase}
                            </span>
                          </div>
                          <div className="text-[11px] text-neutral-400 mt-1">
                            Shooter / Crew: <span className="text-neutral-300">{task.shooter}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-amber-400">{task.progress}%</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => handleAdminUpdateTask(task.id, 25, 'Dalam Antrean')}
                              className={`px-2 py-1 rounded text-[10px] font-mono border ${task.progress === 25 ? 'bg-amber-500 text-neutral-950 border-amber-400' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}`}
                            >
                              25% (Draft)
                            </button>
                            <button
                              onClick={() => handleAdminUpdateTask(task.id, 65, 'Sedang Berjalan')}
                              className={`px-2 py-1 rounded text-[10px] font-mono border ${task.progress === 65 ? 'bg-amber-500 text-neutral-950 border-amber-400' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}`}
                            >
                              65% (Shoot)
                            </button>
                            <button
                              onClick={() => handleAdminUpdateTask(task.id, 100, 'Selesai')}
                              className={`px-2 py-1 rounded text-[10px] font-mono border ${task.progress === 100 ? 'bg-emerald-500 text-neutral-950 border-emerald-400' : 'bg-neutral-800 text-neutral-300 border-neutral-700'}`}
                            >
                              100% (Selesai)
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                ADMIN TAB 4: FINANSIAL & VERIFIKASI DP (TERMIN 1 & 2)
            ======================================================== */}
            {adminTab === 'finance' && (
              <div className="space-y-6">
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
                  <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-semibold text-neutral-200">Birokrasi Pembayaran & Verifikasi Slip Transfer</h3>
                      <p className="text-xs text-neutral-400">Verifikasi termin 1 (DP 50%) untuk membuka fitur kalender dan termin 2 sebelum serah terima file 4K.</p>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-950/60 border-b border-neutral-800 text-neutral-400 font-mono uppercase text-[10px]">
                        <tr>
                          <th className="py-3 px-4">Brand & Invoice</th>
                          <th className="py-3 px-4">Nilai Kontrak & DP</th>
                          <th className="py-3 px-4">Status Termin</th>
                          <th className="py-3 px-4">Bukti Slip</th>
                          <th className="py-3 px-4 text-right">Aksi Admin</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-800/80">
                        {clientPipeline.map((client) => (
                          <tr key={client.id} className="hover:bg-neutral-800/30 transition">
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-neutral-200">{client.business}</div>
                              <div className="text-[11px] text-neutral-400 font-mono">{client.invoiceNumber}</div>
                            </td>

                            <td className="py-3.5 px-4">
                              <div className="text-neutral-200 font-medium">Total: {client.totalValue}</div>
                              <div className="text-[11px] text-emerald-400 font-mono mt-0.5">DP: {client.dpAmount}</div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-mono border ${client.statusBadge}`}>
                                {client.status}
                              </span>
                              <div className="text-[10px] text-neutral-400 mt-1">{client.paymentTerm}</div>
                            </td>

                            <td className="py-3.5 px-4">
                              {client.transferProof ? (
                                <button
                                  onClick={() => setSelectedProofClient(client)}
                                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 text-[11px]"
                                >
                                  <Receipt className="w-3.5 h-3.5 text-amber-400" />
                                  <span>Lihat Struk Bank</span>
                                </button>
                              ) : (
                                <span className="text-[11px] text-neutral-500 italic">Belum unggah</span>
                              )}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              {client.isUnlocked ? (
                                <span className="text-emerald-400 font-mono text-xs inline-flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Terverifikasi
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleVerifyClientPayment(client.id)}
                                  className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs shadow-sm inline-flex items-center gap-1.5 transition"
                                >
                                  <Unlock className="w-3.5 h-3.5" />
                                  <span>Verifikasi & Buka Akses</span>
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================
                ADMIN TAB 5: VAULT BRIEF & NASKAH BRAND
            ======================================================== */}
            {adminTab === 'brief_vault' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clientPipeline.map((cl) => (
                    <div key={cl.id} className="p-5 rounded-xl bg-neutral-900 border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-neutral-200">{cl.business}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                          {cl.id}
                        </span>
                      </div>
                      <div className="text-xs text-neutral-400">
                        <div>PIC: <strong className="text-neutral-200">{cl.name}</strong> ({cl.instagram})</div>
                        <div>Email: {cl.email}</div>
                        <div>Paket Kerja Sama: {cl.package}</div>
                      </div>
                      <div className="p-3 rounded bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 leading-relaxed font-light">
                        <strong>Brief Goal:</strong> "{cl.briefNotes}"
                      </div>
                      <div className="pt-2 flex justify-between items-center text-xs">
                        <span className="text-emerald-400 font-mono">Invoice DP: {cl.dpAmount}</span>
                        <button
                          onClick={() => {
                            setAdminSelectedClient(cl.id);
                            setAdminTab('content_engine');
                          }}
                          className="text-amber-400 hover:underline flex items-center gap-1"
                        >
                          Buka Content Engine <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </main>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD-ON QUOTA UPSELL
      ======================================================== */}
      {showAddOnModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-sm rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setShowAddOnModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base font-semibold text-neutral-100">Tambah Kuota Konten</h3>
                <p className="text-xs text-neutral-400">Brand: {currentAdminClientObj.business}</p>
              </div>
            </div>

            <p className="text-xs text-neutral-300 leading-relaxed mb-4">
              Klien membutuhkan slot tambahan di luar kuota bulanan? Tambahkan kuota video ekstra secara resmi ke kontrak:
            </p>

            <div className="space-y-2 mb-4">
              <button
                onClick={() => handleAddOnUpsell(currentAdminClientObj.id, 2)}
                className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-left flex justify-between items-center transition"
              >
                <div>
                  <div className="text-xs font-semibold text-neutral-200">+2 Reels Production</div>
                  <div className="text-[10px] text-neutral-400">Termasuk shoot & editing</div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">+Rp 900.000</span>
              </button>

              <button
                onClick={() => handleAddOnUpsell(currentAdminClientObj.id, 4)}
                className="w-full p-3 rounded-lg bg-neutral-950 border border-neutral-800 hover:border-amber-500 text-left flex justify-between items-center transition"
              >
                <div>
                  <div className="text-xs font-semibold text-neutral-200">+4 Reels Production (Bundle)</div>
                  <div className="text-[10px] text-neutral-400">Hemat paket komersial</div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">+Rp 1.600.000</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 0: FORM REQUEST KONTEN BARU DARI SISI KLIEN (BARU)
      ======================================================== */}
      {showClientRequestModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setShowClientRequestModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-neutral-800">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-700/80 text-emerald-400 flex items-center justify-center">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-100">Ajukan Permintaan Konten Baru</h3>
                <p className="text-xs text-neutral-400">Tim Cermin Kreatif akan segera memproses naskah & jadwalnya</p>
              </div>
            </div>

            <form onSubmit={handleClientSubmitRequest} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Judul Ide / Topik Promo</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Promo Flash Sale Payday 30% atau Peluncuran Menu Baru"
                  value={clientRequestForm.title}
                  onChange={(e) => setClientRequestForm({ ...clientRequestForm, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Format Konten</label>
                  <select
                    value={clientRequestForm.type}
                    onChange={(e) => setClientRequestForm({ ...clientRequestForm, type: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="Reels / Video Pendek">Reels / Video Pendek (9:16)</option>
                    <option value="Instagram Carousel">Instagram Carousel Edukatif</option>
                    <option value="Single Post High-Res">Single Feed High-Res</option>
                    <option value="TikTok & Story Video">TikTok & IG Story Video</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-300 mb-1 font-medium">Target Tanggal Penayangan</label>
                  <input
                    type="date"
                    required
                    value={clientRequestForm.date}
                    onChange={(e) => setClientRequestForm({ ...clientRequestForm, date: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1 font-medium">Catatan Khusus / Poin Pesan Utama</label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan info penting: harga promo, syarat ketentuan, atau angle video yang diinginkan..."
                  value={clientRequestForm.notes}
                  onChange={(e) => setClientRequestForm({ ...clientRequestForm, notes: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Status Birokrasi Kuota Info */}
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 flex items-start gap-2.5 text-[11px] text-neutral-400">
                <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="leading-relaxed">
                  Request ini akan otomatis memotong kuota retainer paket bulanan Anda. Setelah dikirim, Creative Lead Cermin Kreatif akan menyusun draf naskah pertama dalam 1x24 jam.
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition shadow"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Permintaan Konten</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowClientRequestModal(false)}
                  className="px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADMIN TAMBAH KONTEN KE KALENDER
      ======================================================== */}
      {showAddContentModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setShowAddContentModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="text-base font-semibold text-neutral-100">Jadwalkan Konten Klien</h3>
                <p className="text-xs text-neutral-400">Brand: {currentAdminClientObj.business}</p>
              </div>
            </div>

            <form onSubmit={handleAdminAddContent} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 mb-1">Judul / Konsep Postingan</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Carousel: 5 Rahasia Brewing Kopi"
                  value={newContentForm.title}
                  onChange={(e) => setNewContentForm({ ...newContentForm, title: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-300 mb-1">Format Konten</label>
                  <select
                    value={newContentForm.type}
                    onChange={(e) => setNewContentForm({ ...newContentForm, type: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                  >
                    <option value="Reels / Video Pendek">Reels / Video Pendek</option>
                    <option value="Instagram Carousel">Instagram Carousel</option>
                    <option value="Single Post High-Res">Single Post High-Res</option>
                    <option value="TikTok & Story Video">TikTok & Story Video</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-300 mb-1">Tanggal Tayang (Oktober 2026)</label>
                  <input
                    type="date"
                    required
                    value={newContentForm.date}
                    onChange={(e) => setNewContentForm({ ...newContentForm, date: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-2.5 py-1.5 text-neutral-200 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-300 mb-1">Naskah / Caption Awal</label>
                <textarea
                  rows={3}
                  placeholder="Tulis hook dan draf copywriting di sini..."
                  value={newContentForm.caption}
                  onChange={(e) => setNewContentForm({ ...newContentForm, caption: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-neutral-200 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>Jadwalkan & Kirim ke Klien</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddContentModal(false)}
                  className="px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: REVIEW BUKTI TRANSFER & INVOICE DP (ADMIN)
      ======================================================== */}
      {selectedProofClient && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setSelectedProofClient(null)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <Receipt className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-semibold text-neutral-100">Review Bukti Transfer & Invoice DP</h3>
            </div>

            <div className="space-y-4">
              <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-neutral-500 block text-[10px] font-mono">NAMA KLIEN / BRAND</span>
                  <span className="text-neutral-200 font-medium">{selectedProofClient.business}</span>
                  <span className="text-neutral-400 block text-[11px]">{selectedProofClient.name}</span>
                </div>
                <div>
                  <span className="text-neutral-500 block text-[10px] font-mono">NOMOR INVOICE & NOMINAL</span>
                  <span className="text-neutral-200 font-mono font-medium">{selectedProofClient.invoiceNumber}</span>
                  <span className="text-emerald-400 block font-mono font-bold">{selectedProofClient.dpAmount}</span>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 block mb-1">LAMPIRAN STRUK BANK / SLIP TRANSFER:</label>
                <div className="h-60 rounded-lg overflow-hidden border border-neutral-800 bg-neutral-950 flex items-center justify-center">
                  <img
                    src={selectedProofClient.transferProof}
                    alt="Bukti Transfer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => handleVerifyClientPayment(selectedProofClient.id)}
                  className="flex-1 py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Check className="w-4 h-4" />
                  <span>Setujui Pembayaran & Aktifkan Fitur Klien</span>
                </button>
                <button
                  onClick={() => setSelectedProofClient(null)}
                  className="px-4 py-2.5 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 text-xs"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 1: REGISTRASI KILAT AKUN DEMO
      ======================================================== */}
      {showDemoRegisterModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-md rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95">
            <button onClick={() => setShowDemoRegisterModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[10px] font-mono uppercase bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded">
                Akses Kilat Demo
              </span>
              <h3 className="text-lg font-semibold text-neutral-100 mt-2">Daftar Akun Demo Gratis</h3>
              <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                Langsung masuk ke dashboard untuk melihat cara tim Cermin Kreatif mengorganisir naskah dan kalender konten.
              </p>
            </div>

            <form onSubmit={handleRegisterDemo} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-300 mb-1">Email Anda</label>
                <input
                  type="email"
                  required
                  placeholder="nama@perusahaan.com"
                  value={demoEmail}
                  onChange={(e) => setDemoEmail(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Kata Sandi</label>
                <input
                  type="password"
                  required
                  placeholder="Minimal 6 karakter"
                  value={demoPassword}
                  onChange={(e) => setDemoPassword(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-sm text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-950 font-medium text-xs flex items-center justify-center gap-2 transition"
              >
                <span>Masuk ke Dashboard Demo Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: POP-UP BRIEF KEBUTUHAN AGENSI
      ======================================================== */}
      {showBriefModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-lg rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowBriefModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-start gap-3 mb-5">
              <div className="p-2 rounded bg-amber-950/80 border border-amber-800 text-amber-400 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-neutral-100">Fitur Draf Terkunci</h3>
                <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                  Untuk mengaktifkan kalender interaktif dan produksi video brand Anda, silakan lengkapi formulir brief singkat ini.
                </p>
              </div>
            </div>

            <form onSubmit={(e) => handleBriefSubmit(e, 'modal')} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Nama PIC</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Anda"
                    value={briefForm.name}
                    onChange={(e) => setBriefForm({ ...briefForm, name: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Nama Brand / Bisnis</label>
                  <input
                    type="text"
                    required
                    placeholder="Nama Bisnis"
                    value={briefForm.business}
                    onChange={(e) => setBriefForm({ ...briefForm, business: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Instagram Bisnis</label>
                  <input
                    type="text"
                    required
                    placeholder="@bisnis"
                    value={briefForm.instagram}
                    onChange={(e) => setBriefForm({ ...briefForm, instagram: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-300 mb-1">Paket yang Diminati</label>
                  <select
                    value={briefForm.package}
                    onChange={(e) => setBriefForm({ ...briefForm, package: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                  >
                    <option value="Starter Video (4 Reels Shoot)">Starter Video (4 Reels Shoot)</option>
                    <option value="Growth Video (12 Reels + 8 Post)">Growth Video (12 Reels + 8 Post)</option>
                    <option value="Full Retainer Social Media & Ads">Full Retainer & Ads</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Email Konfirmasi</label>
                <input
                  type="email"
                  required
                  placeholder="email@bisnis.com"
                  value={briefForm.email || (user ? user.email : '')}
                  onChange={(e) => setBriefForm({ ...briefForm, email: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-300 mb-1">Target / Masalah Konten Saat Ini</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan jenis konten atau target omset/view yang ingin dicapai..."
                  value={briefForm.notes}
                  onChange={(e) => setBriefForm({ ...briefForm, notes: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-2 text-xs text-neutral-200 focus:outline-none focus:border-neutral-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Kirim Brief & Teruskan ke WhatsApp Admin</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: DETAIL REVIEW KONTEN (ROLE-AWARE: ADMIN VS CLIENT)
      ======================================================== */}
      {selectedCalendarItem && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 w-full max-w-2xl rounded-xl p-6 shadow-2xl relative animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setSelectedCalendarItem(null); setShowRevisionBox(false); }} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-full sm:w-1/2">
                <div className="h-64 sm:h-80 bg-neutral-950 rounded-lg overflow-hidden border border-neutral-800 relative">
                  <img 
                    src={selectedCalendarItem.mediaUrl} 
                    alt={selectedCalendarItem.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-neutral-950/90 text-neutral-300 font-mono text-[10px] px-2 py-0.5 rounded">
                    Rasio 9:16 Vertical
                  </div>
                </div>
                <div className="mt-2 text-[11px] font-mono text-neutral-400 flex justify-between">
                  <span>Jadwal: {selectedCalendarItem.day} 2026</span>
                  <span>Versi: <strong className="text-amber-400">{selectedCalendarItem.version}</strong></span>
                </div>
              </div>

              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      selectedCalendarItem.status === 'Disetujui' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                      selectedCalendarItem.status === 'Perlu Revisi' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}>
                      {selectedCalendarItem.status}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                      selectedCalendarItem.ballInCourt === 'client' 
                        ? 'bg-amber-950/40 text-amber-300 border-amber-800/60' 
                        : 'bg-rose-950/40 text-rose-300 border-rose-800/60'
                    }`}>
                      Bola di: <strong>{selectedCalendarItem.ballInCourt === 'client' ? 'Klien (Menunggu Review)' : 'Agensi (Sedang Dikerjakan)'}</strong>
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-neutral-100">{selectedCalendarItem.title}</h3>
                  
                  <div className="mt-3">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase">Draf Teks Caption</label>
                    <p className="text-xs text-neutral-300 mt-1 p-3 rounded bg-neutral-950 border border-neutral-800/80 leading-relaxed font-light">
                      {selectedCalendarItem.caption}
                    </p>
                  </div>

                  {/* Audit Trail Histori Catatan / Revisi */}
                  <div className="mt-3">
                    <label className="text-[11px] font-mono text-neutral-400 uppercase">Riwayat Feedback & Catatan</label>
                    <div className="space-y-1.5 mt-1 max-h-28 overflow-y-auto">
                      {selectedCalendarItem.feedbackHistory.length > 0 ? (
                        selectedCalendarItem.feedbackHistory.map((fb, idx) => (
                          <div key={idx} className="p-2 rounded bg-neutral-950 border border-neutral-800 text-[11px]">
                            <div className="flex justify-between text-neutral-500 font-mono text-[9px]">
                              <span className={fb.sender === 'Klien' ? 'text-amber-400 font-bold' : 'text-neutral-400'}>{fb.sender}</span>
                              <span>{fb.time}</span>
                            </div>
                            <div className="text-neutral-300 mt-0.5">{fb.text}</div>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-neutral-600 italic">Belum ada riwayat revisi.</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* LOGIKA PEMISAHAN AKSI: ADMIN VS KLIEN */}
                {currentPage === 'admin' ? (
                  /* ================= SISI ADMIN ================= */
                  <div className="mt-5 pt-3 border-t border-neutral-800 space-y-3">
                    <div className="text-[11px] font-mono text-amber-400 flex items-center justify-between">
                      <span>PANEL AKSI TIM AGENSI</span>
                      <span className="text-[9px] text-neutral-500 uppercase">Role: Media Ops / Editor</span>
                    </div>

                    {selectedCalendarItem.status === 'Perlu Revisi' ? (
                      <div className="space-y-2 bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                        <label className="text-[10px] text-neutral-400 block font-mono">
                          Catatan Solusi Perbaikan Revisi (untuk Klien):
                        </label>
                        <input
                          type="text"
                          value={adminResolutionNote}
                          onChange={(e) => setAdminResolutionNote(e.target.value)}
                          placeholder="e.g. Logo monochrome putih sudah diterapkan di pojok kanan."
                          className="w-full bg-neutral-900 border border-neutral-700 rounded p-1.5 text-xs text-neutral-200 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          onClick={() => handleAdminSubmitRevisionFix(selectedCalendarItem.id, adminResolutionNote)}
                          className="w-full py-2 rounded bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center justify-center gap-1.5 transition shadow"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Kirim Draf Revisi Baru (Kembalikan ke Klien)</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateContentStatus(selectedCalendarItem.id, 'Disetujui')}
                          className="flex-1 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                          title="Gunakan ini jika klien konfirmasi setuju via telepon/WA"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Tandai Disetujui (By Admin)</span>
                        </button>
                        <button
                          onClick={() => handlePingClientReview(currentAdminClientObj, selectedCalendarItem)}
                          className="flex-1 py-2 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                          <span>Ingatkan via WA</span>
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ================= SISI KLIEN ================= */
                  <div className="mt-5 pt-3 border-t border-neutral-800 space-y-2">
                    {showRevisionBox && (
                      <div className="mb-2 space-y-2 bg-neutral-950 p-2.5 rounded border border-neutral-800">
                        <label className="text-[10px] font-mono text-rose-400 uppercase">Tuliskan Poin Perbaikan:</label>
                        <textarea
                          rows={2}
                          value={revisionInput}
                          onChange={(e) => setRevisionInput(e.target.value)}
                          placeholder="Tuliskan bagian detik video atau kalimat yang ingin diubah..."
                          className="w-full bg-neutral-900 border border-neutral-700 rounded p-2 text-xs text-neutral-200 focus:outline-none focus:border-rose-500"
                        />
                        <button
                          onClick={() => {
                            if (revisionInput.trim()) {
                              updateContentStatus(selectedCalendarItem.id, 'Perlu Revisi', revisionInput);
                            }
                          }}
                          className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium"
                        >
                          Kirim ke Tim Agensi
                        </button>
                      </div>
                    )}

                    <div className="text-[11px] text-neutral-400 mb-1">Keputusan Persetujuan Anda:</div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateContentStatus(selectedCalendarItem.id, 'Disetujui')}
                        className="flex-1 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <Check className="w-4 h-4" />
                        <span>Setujui Konten (Approve)</span>
                      </button>
                      <button
                        onClick={() => setShowRevisionBox(!showRevisionBox)}
                        className="flex-1 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 border border-neutral-700 font-medium text-xs flex items-center justify-center gap-1.5 transition"
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{showRevisionBox ? 'Batal' : 'Minta Revisi'}</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}