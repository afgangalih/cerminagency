export type UserRole = 'admin' | 'client' | 'team_member';

export type PlatformType = 'instagram' | 'tiktok' | 'youtube_shorts' | 'omnichannel';

export type ContentStage = 'script' | 'production' | 'review' | 'revision' | 'scheduled';

export type BallInCourt = 'client' | 'agency';

export type AccountStatus = 'demo' | 'official';

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  role: UserRole;
  phoneNumber?: string;
  businessName?: string;
  instagramHandle?: string;
}

export interface FeedbackLog {
  id?: string;
  sender: 'Klien' | 'Agensi' | 'Creative Lead' | 'Editor' | 'Tim Agensi';
  text: string;
  time: string;
}

export interface ContentItem {
  id: number;
  clientId: string;
  date: string; // 'YYYY-MM-DD'
  dayNumber: number; // 1-31
  day: string; // '05 Okt'
  weekday: string; // 'Senin'
  title: string;
  type: string; // 'Reels / Video Pendek' | 'Instagram Carousel' | 'Single Post High-Res' | 'TikTok & Reels'
  platforms: PlatformType[]; // Support multi-platform (IG, TikTok, etc.)
  stage: ContentStage;
  status: 'Draf Naskah' | 'Sedang Edit' | 'Menunggu Review' | 'Perlu Revisi' | 'Disetujui' | 'Request Masuk';
  statusColor?: string;
  ballInCourt: BallInCourt;
  version: string; // 'V1' | 'V2 (Draf Revisi)' | 'Final Approved'
  caption: string;
  mediaUrl: string;
  revisionCount: number; // Max 2 rounds (Anti-Scope Creep SLA)
  feedbackHistory: FeedbackLog[];
}

export interface ClientPipeline {
  id: string; // e.g. 'CK-091'
  userId?: string;
  name: string; // PIC Name
  business: string;
  instagram: string;
  email: string;
  package: string;
  reelsUsed: number;
  reelsMax: number;
  postsUsed: number;
  postsMax: number;
  status: 'Menunggu Verifikasi DP' | 'Aktif Resmi (Lunas DP)' | 'Brief Masuk (Belum Bayar)';
  statusBadge?: string;
  dpAmount: string;
  totalValue: string;
  paymentTerm: string;
  transferProof: string | null;
  invoiceNumber: string;
  briefNotes: string;
  registeredAt: string;
  isUnlocked: boolean; // Flag DP 50% Gated Access
  picAssigned: string;
}

export interface VideoProductionTask {
  id: number;
  clientId: string;
  title: string;
  phase: 'Riset & Naskah' | 'Produksi & Shoot' | 'Penyuntingan & Desain' | 'Quality Control';
  progress: number; // 0 - 100
  status: 'Dalam Antrean' | 'Sedang Berjalan' | 'Selesai';
  rawFolder: string;
  shooter: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  invoiceNumber: string;
  termType: 'Termin 1 (DP 50%)' | 'Termin 2 (Pelunasan)' | 'Add-on Quota';
  amount: string;
  status: 'Menunggu Verifikasi' | 'Lunas';
  transferProofUrl?: string;
  createdAt: string;
  verifiedAt?: string;
}
