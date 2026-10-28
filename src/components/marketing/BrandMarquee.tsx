import React from 'react';

export function BrandMarquee() {
  const brands = [
    'ARCHE APPAREL',
    'MAVEN COFFEE ROASTERS',
    'LUMEN SKIN CLINIC',
    'URBAN LIVING HOME',
    'FINTECH ASIA MEDIA',
    'DAILY ESSENTIALS'
  ];

  return (
    <section className="border-y border-zinc-200/80 py-8 bg-zinc-50/50">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <p className="text-[11px] font-mono uppercase text-zinc-400 mb-5 tracking-widest">
          Telah Memproduksi Lebih dari 1.200+ Konten Komersial Berkualitas Tinggi Untuk Brand:
        </p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-14 opacity-75">
          {brands.map((brand, idx) => (
            <span 
              key={idx} 
              className="font-semibold text-sm md:text-base text-zinc-500 tracking-wider hover:text-zinc-900 transition cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
