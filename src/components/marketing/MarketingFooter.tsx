'use client';

import React from 'react';
import Link from 'next/link';

export function MarketingFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-zinc-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
                CK
              </div>
              <div>
                <span className="font-bold text-sm text-zinc-900 block leading-tight">
                  Cermin Kreatif
                </span>
                <span className="text-[10px] text-zinc-400 font-mono">
                  Agency Platform & Studio Hub
                </span>
              </div>
            </Link>

            <p className="text-xs text-zinc-500 font-light leading-relaxed max-w-sm">
              Run your entire agency and video production from one place. Onboard clients, manage requests, and get paid with your own brand.
            </p>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-50 border border-zinc-200 text-[11px] font-mono text-zinc-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Studio Fisik: Malang, Jawa Timur</span>
              </div>
            </div>
          </div>

          {/* Col 2: Platform */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-zinc-500">
              <li><Link href="/portal" className="hover:text-zinc-950 transition">Client Portal</Link></li>
              <li><Link href="/admin" className="hover:text-zinc-950 transition">Kanban SOP Produksi</Link></li>
              <li><a href="#features" className="hover:text-zinc-950 transition">Billing & Invoicing</a></li>
              <li><a href="#features" className="hover:text-zinc-950 transition">Studio Time-Tracking</a></li>
              <li><a href="#features" className="hover:text-zinc-950 transition">CRM Brand Klien</a></li>
              <li><a href="#integrations" className="hover:text-zinc-950 transition">Integrasi Cloud</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="#features" className="hover:text-zinc-950 transition">SOP Revisi 2x (Anti-Scope Creep)</a></li>
              <li><a href="#use-cases" className="hover:text-zinc-950 transition">Format Video 9:16 Vertikal</a></li>
              <li><Link href="/portal" className="hover:text-zinc-950 transition">Simulasi Grid Feed 3x3</Link></li>
              <li><a href="#pricing" className="hover:text-zinc-950 transition">Skema Retainer Bulanan</a></li>
              <li><a href="#faq" className="hover:text-zinc-950 transition">Panduan Brief Klien</a></li>
            </ul>
          </div>

          {/* Col 4: Dukungan & Hubungi */}
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-xs uppercase tracking-wider font-mono">
              Dukungan
            </h4>
            <ul className="space-y-2 text-zinc-500">
              <li><a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-950 transition">WhatsApp Creative Lead</a></li>
              <li><a href="#brief-section" className="hover:text-zinc-950 transition">Ajukan Brief Baru</a></li>
              <li><Link href="/login" className="hover:text-zinc-950 transition">Login Portal</Link></li>
              <li><a href="#faq" className="hover:text-zinc-950 transition">Pusat Bantuan FAQ</a></li>
              <li><span className="text-emerald-700 font-medium font-mono">• Sistem Normal 100%</span></li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="mt-14 pt-8 border-t border-zinc-200/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-zinc-400">
          <div className="flex gap-6">
            <a href="#faq" className="hover:text-zinc-600 transition">Syarat & Ketentuan</a>
            <a href="#faq" className="hover:text-zinc-600 transition">Kebijakan Privasi</a>
            <a href="#faq" className="hover:text-zinc-600 transition">Keamanan Sistem</a>
          </div>
          <p>© 2026 Cermin Kreatif Media Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
