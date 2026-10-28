import { Film, Sparkles } from 'lucide-react';

export function ShowreelGrid() {
  const showcases = [
    {
      title: 'Cinematic Fashion Campaign',
      brand: 'Arche Studio Apparel',
      tag: 'Produksi Video',
      ratio: '9:16 Vertical Reels',
      platform: 'TikTok & IG Reels',
      img: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80',
      hook: '"Material waterproof outdoor diuji ekstrem di lereng Bromo"'
    },
    {
      title: 'Coffee Bean Macro Shots & ASMR',
      brand: 'Maven Coffee Roasters',
      tag: 'Social Media Retainer',
      ratio: 'Feed Carousel & Video',
      platform: 'Omnichannel',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      hook: '"Perjalanan roasting specialty beans dari petani lokal hingga cangkir"'
    },
    {
      title: 'Clinical Laser Explanation Series',
      brand: 'Lumen Skin Clinic',
      tag: 'Branding & Edukasi Dokter',
      ratio: '9:16 Studio Session',
      platform: 'TikTok & Reels',
      img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      hook: '"Mitos vs Fakta laser wajah: apa yang wajib dihindari sebelum perawatan"'
    }
  ];

  return (
    <section id="showcase" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4 pb-6 border-b border-zinc-200">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400">Standar Produksi</span>
          <h2 className="text-2xl md:text-3xl font-semibold text-zinc-900 mt-1">Katalog Karya & Rekayasa Retensi</h2>
          <p className="text-sm text-zinc-500 mt-1.5 font-light">
            Gaya sinematik studio, hook tajam 3 detik pertama, dan color grading standar komersial.
          </p>
        </div>
        <div className="text-xs font-mono text-zinc-500 bg-zinc-50 border border-zinc-200 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-zinc-800" />
          <span>Studio Malang Core</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {showcases.map((item, idx) => (
          <div 
            key={idx} 
            className="group border border-zinc-200 rounded-2xl overflow-hidden bg-white hover:border-zinc-300 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            <div className="h-64 sm:h-72 overflow-hidden bg-zinc-100 relative">
              <img 
                src={item.img} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-zinc-800 font-mono font-medium shadow-sm">
                {item.ratio}
              </div>
              <div className="absolute top-3 right-3 bg-zinc-900/85 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] text-white font-mono">
                {item.platform}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wide block mb-1">
                  {item.tag} • {item.brand}
                </span>
                <h3 className="text-base font-semibold text-zinc-900 group-hover:text-zinc-700 transition">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 mt-2.5 font-light italic leading-relaxed">
                  {item.hook}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Riset Naskah + Shoot Studio</span>
                <span className="text-zinc-900 font-medium">Resolusi 4K</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
