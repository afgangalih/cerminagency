import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { AgencyProvider } from "@/context/AgencyContext";
import { SimulationTopbar } from "@/components/shared/SimulationTopbar";
import SupportWidget from "@/components/ui/SupportWidget";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Cermin Kreatif — Social Media & Video Production Agency Platform",
  description: "Platform kolaborasi satu pintu antara brand owner dan tim agensi video & social media. Sistem persetujuan 1-klik, kalender distribusi, dan transparansi produksi studio.",
  keywords: [
    "Cermin Kreatif",
    "Social Media Agency Malang",
    "Video Production House",
    "Reels Commercial Agency",
    "TikTok Video Agency",
    "Content Calendar Portal"
  ],
  authors: [{ name: "Cermin Kreatif Agency" }],
  openGraph: {
    title: "Cermin Kreatif — Social Media & Video Production Agency",
    description: "Bukan sekadar posting konten. Kami merekayasa retensi penonton dan identitas brand Anda.",
    url: "https://cerminkreatif.com",
    siteName: "Cermin Kreatif",
    locale: "id_ID",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} h-full antialiased font-sans`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MarketingAgency",
              "name": "Cermin Kreatif",
              "url": "https://cerminkreatif.com",
              "description": "Agensi produksi video komersial dan strategi social media retainer berbasis retensi penonton.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Malang",
                "addressRegion": "Jawa Timur",
                "addressCountry": "ID"
              },
              "serviceArea": "Indonesia"
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white">
        <AgencyProvider>
          <SimulationTopbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <SupportWidget />
        </AgencyProvider>
      </body>
    </html>
  );
}
