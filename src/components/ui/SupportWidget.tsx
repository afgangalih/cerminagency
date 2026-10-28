"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Home,
  HelpCircle,
  Search,
  Send,
  Paperclip,
  Smile,
  Mic,
  Clock,
  CheckCheck,
  Sparkles,
  ExternalLink,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────────────── */
type Tab = "home" | "messages" | "help";

interface Message {
  id: string;
  from: "client" | "agency";
  text: string;
  time: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  readTime: string;
  content: string;
}

interface Collection {
  id: string;
  title: string;
  desc: string;
  count: number;
  articles: Article[];
}

/* ─── Knowledge & FAQ Data ──────────────────────────────── */
const HELP_COLLECTIONS: Collection[] = [
  {
    id: "getting-started",
    title: "Memulai & Onboarding",
    desc: "Panduan aktivasi portal klien dan alur kerja Cermin Kreatif",
    count: 3,
    articles: [
      {
        id: "gs-1",
        title: "Cara memulai onboarding klien baru",
        excerpt: "Langkah pertama menghubungkan brand identity dengan tim kreatif kami.",
        readTime: "2 mnt",
        content: "Setelah kontrak disepakati, Anda akan menerima akses eksklusif ke Portal Klien Cermin Kreatif. Di sini Anda dapat mengisi brand guidelines, target audience, moodboard referensi, dan jadwal posting perdana.",
      },
      {
        id: "gs-2",
        title: "Menghubungkan akun media sosial",
        excerpt: "Otorisasi akun Instagram & TikTok untuk simulasi dan analitik.",
        readTime: "3 mnt",
        content: "Kami menggunakan integrasi API resmi yang aman tanpa meminta kata sandi Anda. Anda cukup memberikan izin akses publikasi dan metrik agar tim dapat mengunggah konten yang telah Anda setujui.",
      },
      {
        id: "gs-3",
        title: "Peran PIC dan anggota tim Anda",
        excerpt: "Menentukan siapa yang berhak memberi revisi dan persetujuan akhir.",
        readTime: "2 mnt",
        content: "Untuk menjaga efisiensi produksi, kami merekomendasikan satu orang PIC Utama yang berwenang memberikan Approval Final sebelum konten dijadwalkan tayang.",
      },
    ],
  },
  {
    id: "content-mgmt",
    title: "Manajemen & Approval Konten",
    desc: "Alur revisi, simulasi feed/reels, dan persetujuan satu pintu",
    count: 3,
    articles: [
      {
        id: "cm-1",
        title: "Bagaimana alur revisi konten berlangsung?",
        excerpt: "Aturan revisi 2 putaran minor dan sistem feedback berbasis timestamp.",
        readTime: "3 mnt",
        content: "Setiap paket retainer mencakup 2 kali putaran revisi minor per deliverable. Berikan catatan langsung pada frame video atau teks copy di portal agar editor langsung memahami konteks revisi Anda.",
      },
      {
        id: "cm-2",
        title: "Kapan konten saya akan dipublish?",
        excerpt: "Siklus approval H-3 sebelum jadwal tayang kalender editorial.",
        readTime: "2 mnt",
        content: "Konten yang telah disetujui (Approved) minimal 48 jam sebelum jadwal tayang akan otomatis masuk ke antrean auto-publish atau diserahkan ke tim media sosial Anda sesuai kesepakatan.",
      },
      {
        id: "cm-3",
        title: "Cara approve konten di client portal",
        excerpt: "Satu klik untuk meloloskan video dan caption ke tahap rilis.",
        readTime: "1 mnt",
        content: "Klik tombol 'Approve Konten' berwarna hijau di preview draft. Status otomatis berganti menjadi 'Approved' dan tim produksi segera menyiapkan master file final.",
      },
    ],
  },
  {
    id: "video-production",
    title: "Produksi Video Komersial",
    desc: "Brief syuting, storyboard, gear studio, dan hak cipta musik",
    count: 2,
    articles: [
      {
        id: "vp-1",
        title: "Alur pra-produksi hingga delivery final",
        excerpt: "Dari penulisan hook script hingga color grading kelas cinema.",
        readTime: "4 mnt",
        content: "Produksi video Cermin Kreatif melalui 4 fase: Script & Hook Engineering, Shooting Day dengan tim cinema di Malang/Surabaya, Editing & Sound Design, serta Export master ProRes/4K.",
      },
      {
        id: "vp-2",
        title: "Lisensi musik dan hak cipta konten",
        excerpt: "Semua musik komersial 100% legal dan bebas klaim copyright.",
        readTime: "2 mnt",
        content: "Kami menggunakan katalog musik berlisensi komersial (Artlist/Epidemic) sehingga video Anda aman diiklankan di Meta Ads, TikTok Ads, maupun platform lainnya.",
      },
    ],
  },
  {
    id: "billing",
    title: "Pembayaran & Retainer",
    desc: "Tagihan bulanan, invoice resmi, dan perpanjangan retainer",
    count: 2,
    articles: [
      {
        id: "bl-1",
        title: "Siklus pembayaran retainer bulanan",
        excerpt: "Faktur terbit setiap tanggal 25 untuk periode bulan berikutnya.",
        readTime: "2 mnt",
        content: "Pembayaran retainer dilakukan di awal siklus produksi untuk mengamankan alokasi slot studio, tim videografer, dan kuota editing bulanan brand Anda.",
      },
      {
        id: "bl-2",
        title: "Metode pembayaran & faktur pajak",
        excerpt: "Transfer Bank BCA / Mandiri atas nama PT Cermin Kreatif Digital.",
        readTime: "1 mnt",
        content: "Invoice otomatis terbit dengan format resmi dan dapat dilampiri e-Faktur PPN 11% sesuai NPWP perusahaan Anda.",
      },
    ],
  },
];

const QUICK_FAQS = [
  { q: "Bagaimana alur revisi konten?", collId: "content-mgmt", artId: "cm-1" },
  { q: "Kapan konten saya akan dipublish?", collId: "content-mgmt", artId: "cm-2" },
  { q: "Cara approve konten di portal", collId: "content-mgmt", artId: "cm-3" },
  { q: "Alur produksi video komersial", collId: "video-production", artId: "vp-1" },
];

/* ─── Apple-Style Tab Bar ───────────────────────────────── */
function AppleTabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "home", label: "Home", icon: <Home size={17} strokeWidth={2.2} /> },
    { id: "messages", label: "Pesan", icon: <MessageSquare size={17} strokeWidth={2.2} /> },
    { id: "help", label: "Bantuan", icon: <HelpCircle size={17} strokeWidth={2.2} /> },
  ];

  return (
    <nav
      aria-label="Navigasi Widget"
      className="shrink-0 border-t border-zinc-200/70 bg-white/90 backdrop-blur-md px-3 py-2 flex items-center justify-around"
    >
      {tabs.map((t) => {
        const isActive = active === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onChange(t.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition-all duration-200 ${
              isActive
                ? "text-zinc-950 font-semibold bg-zinc-100/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]"
                : "text-zinc-400 hover:text-zinc-700 hover:bg-zinc-50/60 font-medium"
            }`}
          >
            <span className={`transition-transform duration-200 ${isActive ? "scale-105" : ""}`}>
              {t.icon}
            </span>
            <span className="text-[11px] tracking-tight">{t.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

/* ─── Tab 1: Home ───────────────────────────────────────── */
function HomeTab({
  onNewMessage,
  onOpenArticle,
  onOpenHelp,
}: {
  onNewMessage: () => void;
  onOpenArticle: (collId: string, artId: string) => void;
  onOpenHelp: () => void;
}) {
  return (
    <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain">
      {/* Apple-style Luxury Card Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950 text-white px-5 pt-7 pb-9 rounded-b-[28px] shadow-lg">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-gradient-to-br from-zinc-700/30 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-sm">
              <div className="w-3.5 h-3.5 border-2 border-white rounded-[3px]" />
            </div>
            <div>
              <p className="text-[10px] tracking-widest uppercase font-mono text-zinc-400">Client Support</p>
              <h2 className="text-sm font-semibold tracking-tight text-white leading-tight">Cermin Kreatif</h2>
            </div>
          </div>

          {/* Active Creative Team stack */}
          <div className="flex items-center -space-x-2">
            {[
              { init: "CK", bg: "bg-zinc-800" },
              { init: "AG", bg: "bg-zinc-700" },
              { init: "DM", bg: "bg-zinc-600" },
            ].map((lead, i) => (
              <div
                key={i}
                className={`w-7 h-7 rounded-full ${lead.bg} ring-2 ring-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-200 shadow-sm`}
              >
                {lead.init}
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 space-y-1">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Tim Studio Online
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white pt-1">
            Halo 👋<br />Ada yang bisa kami bantu?
          </h1>
          <p className="text-zinc-400 text-xs font-normal">
            Bantuan teknis portal, brief syuting, atau approval konten.
          </p>
        </div>
      </div>

      {/* Main Action Cards */}
      <div className="px-4 -mt-4 space-y-3 pb-6">
        {/* Send Message Card */}
        <button
          onClick={onNewMessage}
          className="w-full text-left bg-white/95 backdrop-blur-xl rounded-2xl p-4 border border-zinc-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:border-zinc-300 transition-all duration-200 active:scale-[0.99] group flex items-center justify-between"
        >
          <div className="space-y-0.5">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-semibold text-zinc-900 group-hover:text-zinc-950">
                Kirim Pesan ke Tim
              </span>
              <Sparkles size={13} className="text-amber-500" />
            </div>
            <p className="text-xs text-zinc-500">Biasanya direspons dalam 2 jam kerja studio</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-zinc-900 text-white flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-sm shrink-0 ml-3">
            <Send size={15} />
          </div>
        </button>

        {/* Quick Help Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-zinc-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
          <div className="px-4 py-3 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
            <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              Pertanyaan Sering Ditanyakan
            </span>
            <button
              onClick={onOpenHelp}
              className="text-xs text-zinc-800 hover:text-zinc-950 font-medium flex items-center gap-0.5 hover:underline"
            >
              Semua <ArrowUpRight size={12} />
            </button>
          </div>

          <div className="divide-y divide-zinc-100">
            {QUICK_FAQS.map((faq, i) => (
              <button
                key={i}
                onClick={() => onOpenArticle(faq.collId, faq.artId)}
                className="w-full text-left px-4 py-3 text-xs font-medium text-zinc-700 hover:text-zinc-950 hover:bg-zinc-50/80 transition-colors flex items-center justify-between group"
              >
                <span className="pr-2">{faq.q}</span>
                <ChevronRight
                  size={14}
                  className="text-zinc-300 group-hover:text-zinc-600 group-hover:translate-x-0.5 transition-all shrink-0"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Direct WhatsApp / Escalation */}
        <a
          href="https://wa.me/6281234567890?text=Halo%20Cermin%20Kreatif%2C%20saya%20butuh%20bantuan%20seputar%20project"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-between px-4 py-3 rounded-2xl bg-zinc-100/80 hover:bg-zinc-100 text-zinc-700 hover:text-zinc-950 border border-zinc-200/60 transition-colors text-xs font-medium group"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            Butuh tanggapan darurat? Chat WhatsApp Tim
          </span>
          <ExternalLink size={13} className="text-zinc-400 group-hover:text-zinc-600" />
        </a>
      </div>
    </div>
  );
}

/* ─── Tab 2: Messages ───────────────────────────────────── */
function MessagesTab({ onNewMessage }: { onNewMessage: () => void }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-between">
      <div className="px-5 py-3.5 border-b border-zinc-100 bg-white/60 backdrop-blur-sm">
        <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Pesan & Diskusi</h3>
        <p className="text-[11px] text-zinc-400">Riwayat percakapan Anda dengan tim agency</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 text-center py-10">
        <div className="w-14 h-14 rounded-2xl bg-zinc-100/90 border border-zinc-200/80 flex items-center justify-center mb-3 shadow-inner">
          <MessageSquare size={24} className="text-zinc-400" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-900">Belum ada percakapan aktif</h4>
        <p className="text-xs text-zinc-500 mt-1 max-w-[240px] leading-relaxed">
          Ada kendala brief atau butuh revisi cepat? Kirim pesan dan kami akan segera terhubung.
        </p>
      </div>

      <div className="p-4 border-t border-zinc-100 bg-zinc-50/50">
        <button
          onClick={onNewMessage}
          className="w-full flex items-center justify-center gap-2 bg-zinc-950 hover:bg-zinc-800 text-white text-xs font-semibold py-3 rounded-xl shadow-sm hover:shadow-md active:scale-[0.99] transition-all"
        >
          <Send size={13} />
          Mulai Percakapan Baru
        </button>
      </div>
    </div>
  );
}

/* ─── Tab 3: Help / Knowledge Base ──────────────────────── */
function HelpTab({
  onSelectArticle,
}: {
  onSelectArticle: (collId: string, artId: string) => void;
}) {
  const [query, setQuery] = useState("");

  const filteredCollections = HELP_COLLECTIONS.map((c) => ({
    ...c,
    matchingArticles: c.articles.filter(
      (a) =>
        query === "" ||
        a.title.toLowerCase().includes(query.toLowerCase()) ||
        a.content.toLowerCase().includes(query.toLowerCase()) ||
        c.title.toLowerCase().includes(query.toLowerCase())
    ),
  })).filter((c) => c.matchingArticles.length > 0);

  return (
    <div className="flex-1 min-h-0 flex flex-col">
      {/* Header */}
      <div className="px-4 pt-3.5 pb-3 border-b border-zinc-100 bg-white/70 backdrop-blur-sm space-y-2.5 shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-zinc-900 tracking-tight">Pusat Bantuan</h3>
          <span className="text-[11px] text-zinc-400 font-medium">Cermin Knowledge Base</span>
        </div>

        {/* Search input */}
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari artikel, revisi, alur brief..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-zinc-100/80 focus:bg-white rounded-xl border border-transparent focus:border-zinc-300 outline-none text-zinc-900 placeholder:text-zinc-400 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-4">
        {filteredCollections.length === 0 ? (
          <div className="text-center py-12 text-zinc-400 text-xs">
            Tidak ada artikel yang cocok dengan &quot;{query}&quot;
          </div>
        ) : (
          filteredCollections.map((col) => (
            <div key={col.id} className="space-y-1.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                  {col.title}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  {col.matchingArticles.length} artikel
                </span>
              </div>

              <div className="bg-white/95 rounded-2xl border border-zinc-200/90 shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden divide-y divide-zinc-100">
                {col.matchingArticles.map((art) => (
                  <button
                    key={art.id}
                    onClick={() => onSelectArticle(col.id, art.id)}
                    className="w-full text-left p-3.5 hover:bg-zinc-50/80 transition-colors flex items-start justify-between group"
                  >
                    <div className="pr-3 space-y-0.5">
                      <p className="text-xs font-semibold text-zinc-900 group-hover:text-zinc-950">
                        {art.title}
                      </p>
                      <p className="text-[11px] text-zinc-500 line-clamp-1 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 text-zinc-400 shrink-0 mt-0.5">
                      <span className="text-[10px] font-mono">{art.readTime}</span>
                      <ChevronRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

/* ─── Detail View: Article Reader ───────────────────────── */
function ArticleDetailView({
  article,
  onBack,
}: {
  article: Article;
  onBack: () => void;
}) {
  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-3 border-b border-zinc-100 bg-white/80 backdrop-blur-md shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Kembali</span>
        </button>
        <span className="text-[11px] font-mono text-zinc-400 pr-2">{article.readTime} baca</span>
      </div>

      {/* Content */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 space-y-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 text-[10px] font-mono">
            <BookOpen size={11} />
            Panduan Resmi
          </div>
          <h2 className="text-base font-bold text-zinc-950 leading-snug tracking-tight">
            {article.title}
          </h2>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50 border border-zinc-200/60 text-xs text-zinc-600 leading-relaxed">
          {article.excerpt}
        </div>

        <div className="text-xs text-zinc-700 leading-relaxed space-y-3 pt-2">
          <p>{article.content}</p>
          <p className="text-zinc-500">
            Jika membutuhkan bantuan lebih lanjut mengenai poin ini, Anda dapat langsung mengirim pesan kepada Creative Director atau Account Manager via tab Pesan.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Detail View: Chat / Thread ────────────────────────── */
function ChatThreadView({ onBack }: { onBack: () => void }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init-1",
      from: "agency",
      text: "Halo! Terima kasih telah menghubungi Cermin Kreatif. Silakan tinggalkan detail kebutuhan Anda, tim kami akan merespons secepatnya. 🎬",
      time: "Sekarang",
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const now = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), from: "client", text, time: now },
    ]);
    setInput("");

    // Simulated auto-reply
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          from: "agency",
          text: "Pesan Anda telah diteruskan ke PIC Project & Lead Editor. Kami akan segera menindaklanjuti. Terima kasih! ✨",
          time: replyTime,
        },
      ]);
    }, 1200);
  };

  return (
    <div className="flex-1 min-h-0 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2.5 border-b border-zinc-100 bg-white/80 backdrop-blur-md shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium text-zinc-600 hover:text-zinc-950 hover:bg-zinc-100 transition-colors"
        >
          <ChevronLeft size={16} />
          <span>Kembali</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-zinc-900 text-white text-[10px] font-bold flex items-center justify-center">
              CK
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="text-left">
            <p className="text-xs font-semibold text-zinc-900 leading-tight">Cermin Support</p>
            <p className="text-[10px] text-zinc-400 flex items-center gap-1">
              <Clock size={9} /> Respon &lt; 2 jam
            </p>
          </div>
        </div>
        <div className="w-12" /> {/* spacer */}
      </div>

      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 space-y-3 bg-zinc-50/40">
        {messages.map((msg) => {
          const isClient = msg.from === "client";
          return (
            <div key={msg.id} className={`flex ${isClient ? "justify-end" : "justify-start"}`}>
              {!isClient && (
                <div className="w-6 h-6 rounded-full bg-zinc-900 text-white text-[9px] font-bold flex items-center justify-center mr-2 mt-1 shrink-0">
                  CK
                </div>
              )}
              <div
                className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                  isClient
                    ? "bg-zinc-950 text-white rounded-br-xs"
                    : "bg-white text-zinc-800 border border-zinc-200/80 rounded-bl-xs"
                }`}
              >
                <p>{msg.text}</p>
                <div className={`flex items-center gap-1 mt-1 ${isClient ? "justify-end text-zinc-400" : "text-zinc-400"}`}>
                  <span className="text-[9px]">{msg.time}</span>
                  {isClient && <CheckCheck size={11} className="text-zinc-400" />}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      <div className="p-3 border-t border-zinc-100 bg-white shrink-0">
        <div className="flex items-end gap-1.5 bg-zinc-100/80 focus-within:bg-white rounded-2xl border border-transparent focus-within:border-zinc-300 p-2 transition-all shadow-inner">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Ketik pesan untuk tim..."
            rows={1}
            className="flex-1 resize-none bg-transparent outline-none text-xs text-zinc-900 placeholder:text-zinc-400 max-h-24 px-1 py-1"
          />
          <div className="flex items-center gap-1 text-zinc-400 shrink-0 pb-0.5">
            <button type="button" aria-label="Lampirkan file" className="p-1 hover:text-zinc-700 transition-colors">
              <Paperclip size={14} />
            </button>
            <button type="button" aria-label="Sisipkan emoji" className="p-1 hover:text-zinc-700 transition-colors">
              <Smile size={14} />
            </button>
            <button type="button" aria-label="Pesan suara" className="p-1 hover:text-zinc-700 transition-colors">
              <Mic size={14} />
            </button>
            <button
              onClick={send}
              disabled={!input.trim()}
              aria-label="Kirim pesan"
              className="w-7 h-7 rounded-xl bg-zinc-950 text-white flex items-center justify-center disabled:opacity-30 hover:bg-zinc-800 transition-all ml-1 shadow-sm"
            >
              <Send size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Widget Component ──────────────────────────────── */
export default function SupportWidget() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [inChat, setInChat] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTabChange = (t: Tab) => {
    setTab(t);
    setActiveArticle(null);
    setInChat(false);
  };

  const handleOpenArticle = (collId: string, artId: string) => {
    const col = HELP_COLLECTIONS.find((c) => c.id === collId);
    const art = col?.articles.find((a) => a.id === artId);
    if (art) {
      setActiveArticle(art);
    }
  };

  const isDetailView = inChat || activeArticle !== null;

  return (
    <>
      {/* Floating Launcher Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Tutup dukungan Cermin Kreatif" : "Buka dukungan Cermin Kreatif"}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-zinc-950 text-white shadow-[0_12px_32px_rgba(0,0,0,0.3)] ring-1 ring-white/10 flex items-center justify-center transition-all duration-300 ease-out hover:scale-105 active:scale-95 group`}
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          {/* ChevronDown when open, MessageSquare when closed */}
          <ChevronDown
            size={24}
            strokeWidth={2.4}
            className={`absolute transition-all duration-300 ease-out ${
              open
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 -rotate-90 scale-50 pointer-events-none"
            }`}
          />
          <MessageSquare
            size={22}
            strokeWidth={2.2}
            className={`absolute transition-all duration-300 ease-out ${
              !open
                ? "opacity-100 rotate-0 scale-100"
                : "opacity-0 rotate-90 scale-50 pointer-events-none"
            }`}
          />
        </div>
      </button>

      {/* Main Support Panel (Apple SaaS Card) */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[580px] max-h-[calc(100vh-120px)] bg-white/95 backdrop-blur-2xl rounded-[32px] border border-zinc-200/80 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.2),0_8px_24px_-4px_rgba(0,0,0,0.08)] ring-1 ring-black/5 flex flex-col overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-bottom-right ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Top Floating Minimize Button (down chevron) */}
        <button
          onClick={handleClose}
          aria-label="Tutup panel"
          className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-black/10 hover:bg-black/20 text-white/90 flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-sm"
          title="Tutup / Minimize"
        >
          <ChevronDown size={18} strokeWidth={2.5} />
        </button>

        {/* View Switcher with proper overflow containment */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          {inChat ? (
            <ChatThreadView onBack={() => setInChat(false)} />
          ) : activeArticle ? (
            <ArticleDetailView article={activeArticle} onBack={() => setActiveArticle(null)} />
          ) : (
            <>
              {tab === "home" && (
                <HomeTab
                  onNewMessage={() => setInChat(true)}
                  onOpenArticle={handleOpenArticle}
                  onOpenHelp={() => handleTabChange("help")}
                />
              )}
              {tab === "messages" && <MessagesTab onNewMessage={() => setInChat(true)} />}
              {tab === "help" && <HelpTab onSelectArticle={handleOpenArticle} />}
            </>
          )}
        </div>

        {/* Apple Tab Bar: ALWAYS rendered at the bottom, never disappears or gets pushed away */}
        {!isDetailView && (
          <AppleTabBar active={tab} onChange={handleTabChange} />
        )}
      </div>
    </>
  );
}
