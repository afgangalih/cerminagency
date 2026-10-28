'use client';

import React, { useState } from 'react';
import { ContentItem, PlatformType } from '@/types';
import { useAgency } from '@/context/AgencyContext';
import { 
  Calendar, Grid3X3, Film, ChevronRight, Filter, Play, 
  Heart, Eye, MessageCircle 
} from 'lucide-react';

interface CalendarViewProps {
  onSelectItem: (item: ContentItem) => void;
}

export function CalendarView({ onSelectItem }: CalendarViewProps) {
  const { activeClientContents, selectedClient } = useAgency();

  // View state
  const [viewMode, setViewMode] = useState<'calendar' | 'instagram' | 'tiktok'>('calendar');
  const [platformFilter, setPlatformFilter] = useState<PlatformType | 'all'>('all');
  const [activeDate, setActiveDate] = useState<number>(12);

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Filter content
  const filteredContents = activeClientContents.filter(item => {
    if (platformFilter === 'all') return true;
    return item.platforms.includes(platformFilter);
  });

  return (
    <div className="space-y-6">
      {/* Top Controls: Switcher & Platform Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50 border border-zinc-200 p-4 rounded-2xl">
        {/* View Mode Toggle */}
        <div className="inline-flex rounded-xl p-1 bg-white border border-zinc-200 shadow-sm">
          <button
            onClick={() => setViewMode('calendar')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewMode === 'calendar'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Kalender Distribusi</span>
          </button>
          <button
            onClick={() => setViewMode('instagram')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewMode === 'instagram'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Grid3X3 className="w-3.5 h-3.5" />
            <span>Simulasi Feed IG 3x3</span>
          </button>
          <button
            onClick={() => setViewMode('tiktok')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition ${
              viewMode === 'tiktok'
                ? 'bg-zinc-900 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Simulasi TikTok 9:16</span>
          </button>
        </div>

        {/* Platform Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-zinc-400 font-mono text-[11px] mr-1 hidden sm:inline">Filter Platform:</span>
          {(['all', 'instagram', 'tiktok', 'youtube_shorts'] as const).map(p => (
            <button
              key={p}
              onClick={() => setPlatformFilter(p)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition ${
                platformFilter === p
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {p === 'all' ? 'Semua' : p === 'instagram' ? 'Instagram' : p === 'tiktok' ? 'TikTok' : 'YT Shorts'}
            </button>
          ))}
        </div>
      </div>

      {/* VIEW 1: MONTHLY CALENDAR GRID */}
      {viewMode === 'calendar' && (
        <div className="bg-white border border-zinc-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5 pb-3 border-b border-zinc-100">
            <div>
              <h3 className="font-semibold text-sm text-zinc-900">Jadwal Penayangan {selectedClient.business}</h3>
              <p className="text-xs text-zinc-400 font-light mt-0.5">Bulan Oktober 2026 • Klik tanggal untuk review draf</p>
            </div>
            <div className="flex items-center gap-3 text-[11px] font-mono text-zinc-500">
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Disetujui</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Review</span>
              <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Revisi</span>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-[11px] font-mono text-zinc-400 uppercase">
            <div>Sen</div><div>Sel</div><div>Rab</div><div>Kam</div><div>Jum</div><div>Sab</div><div>Min</div>
          </div>

          <div className="grid grid-cols-7 gap-2">
            <div className="h-24 bg-zinc-50/50 rounded-xl border border-transparent"></div>
            <div className="h-24 bg-zinc-50/50 rounded-xl border border-transparent"></div>
            <div className="h-24 bg-zinc-50/50 rounded-xl border border-transparent"></div>

            {daysInMonth.map((day) => {
              const matchedItem = filteredContents.find(c => c.dayNumber === day);
              const isSelected = activeDate === day;

              return (
                <div
                  key={day}
                  onClick={() => {
                    setActiveDate(day);
                    if (matchedItem) onSelectItem(matchedItem);
                  }}
                  className={`h-24 p-2 rounded-xl border transition cursor-pointer flex flex-col justify-between ${
                    matchedItem
                      ? 'bg-white border-zinc-300 hover:border-zinc-500 hover:shadow-md'
                      : 'bg-zinc-50/70 border-zinc-200/80 hover:border-zinc-300'
                  } ${isSelected ? 'ring-2 ring-zinc-900' : ''}`}
                >
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-mono font-medium ${matchedItem ? 'text-zinc-900 font-semibold' : 'text-zinc-400'}`}>
                      {day}
                    </span>
                    {matchedItem && (
                      <span className={`w-2 h-2 rounded-full ${
                        matchedItem.status === 'Disetujui' ? 'bg-emerald-500' :
                        matchedItem.status === 'Perlu Revisi' ? 'bg-rose-500' :
                        'bg-amber-500'
                      }`} />
                    )}
                  </div>

                  {matchedItem ? (
                    <div>
                      <div className="text-[10px] text-zinc-900 font-medium truncate leading-tight">
                        {matchedItem.title}
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[9px] font-mono text-zinc-500 uppercase truncate">
                          {matchedItem.platforms.join(' • ')}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[9px] text-zinc-300 font-mono">-</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: INSTAGRAM FEED 3x3 SIMULATOR */}
      {viewMode === 'instagram' && (
        <div className="max-w-md mx-auto bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          {/* Mock IG Profile Header */}
          <div className="flex items-center gap-4 pb-5 border-b border-zinc-100">
            <div className="w-16 h-16 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold text-lg shadow-sm">
              {selectedClient.business.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="font-semibold text-sm text-zinc-900">{selectedClient.instagram}</h4>
              <p className="text-xs text-zinc-500 font-light mt-0.5">{selectedClient.business}</p>
              <div className="flex gap-4 mt-2 text-xs text-zinc-700 font-mono">
                <span><strong>{filteredContents.length}</strong> posts</span>
                <span><strong>14.2K</strong> followers</span>
                <span><strong>480</strong> following</span>
              </div>
            </div>
          </div>

          {/* 3x3 Grid */}
          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-3 gap-1.5 mt-5">
              {filteredContents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="aspect-square bg-zinc-100 rounded-lg overflow-hidden relative group cursor-pointer border border-zinc-200"
                >
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-zinc-900/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 text-white text-xs font-mono">
                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 fill-white" /> 1.2K</span>
                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5 fill-white" /> 48</span>
                  </div>
                  <div className="absolute bottom-1 right-1 bg-zinc-900/80 text-white text-[9px] font-mono px-1 rounded">
                    {item.version}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-400 text-xs font-mono">
              Belum ada konten Instagram yang dijadwalkan.
            </div>
          )}
          <p className="text-[11px] text-zinc-400 font-mono text-center mt-4">
            Simulasi Grid Instagram • Klik cover untuk preview & approval
          </p>
        </div>
      )}

      {/* VIEW 3: TIKTOK FEED 9:16 SIMULATOR */}
      {viewMode === 'tiktok' && (
        <div className="max-w-2xl mx-auto bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center pb-4 mb-4 border-b border-zinc-100">
            <span className="text-xs font-mono uppercase text-zinc-400">TikTok Video Showcase</span>
            <h4 className="font-semibold text-sm text-zinc-900 mt-1">Pratinjau Thumbnail & Hook Teks 3 Detik</h4>
          </div>

          {filteredContents.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {filteredContents.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item)}
                  className="aspect-[9/16] bg-zinc-900 rounded-xl overflow-hidden relative group cursor-pointer shadow-sm border border-zinc-200"
                >
                  <img
                    src={item.mediaUrl}
                    alt={item.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent flex flex-col justify-between p-3">
                    <div className="flex justify-between items-center text-[10px] text-white font-mono">
                      <span className="bg-zinc-900/80 px-1.5 py-0.5 rounded">{item.day}</span>
                      <span className="bg-amber-500 text-zinc-950 font-bold px-1.5 py-0.5 rounded">{item.version}</span>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-white line-clamp-2 leading-tight">
                        {item.title}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-zinc-300 font-mono mt-1.5">
                        <Eye className="w-3 h-3" />
                        <span>42.8K views</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-400 text-xs font-mono">
              Belum ada video TikTok yang dijadwalkan.
            </div>
          )}
        </div>
      )}

      {/* Standard Card List under Calendar for Fast Inspection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        {filteredContents.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectItem(item)}
            className="bg-white border border-zinc-200 hover:border-zinc-400 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg flex flex-col"
          >
            <div className="h-44 bg-zinc-100 relative overflow-hidden">
              <img
                src={item.mediaUrl}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-mono text-zinc-800 font-medium shadow-sm">
                {item.day} ({item.weekday})
              </div>
              <div className={`absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-md ${
                item.status === 'Disetujui' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                item.status === 'Perlu Revisi' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {item.status}
              </div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase flex items-center justify-between mb-1">
                  <span>{item.type}</span>
                  <span className="font-bold text-zinc-800">{item.version}</span>
                </div>
                <h4 className="text-sm font-semibold text-zinc-900 line-clamp-1">{item.title}</h4>
                <p className="text-xs text-zinc-500 mt-2 line-clamp-2 font-light">
                  "{item.caption}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span>Klik untuk review / approval</span>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
