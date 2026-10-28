'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
  className = ''
}: EmptyStateProps) {
  return (
    <div className={`p-8 sm:p-12 text-center rounded-2xl border border-dashed border-zinc-200 bg-white/60 flex flex-col items-center justify-center max-w-lg mx-auto ${className}`}>
      <div className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200/80 flex items-center justify-center text-zinc-600 mb-4 shadow-2xs">
        <Icon className="w-5 h-5 stroke-[1.75]" />
      </div>
      
      <h3 className="text-base font-semibold text-zinc-900 tracking-tight mb-1.5">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed max-w-sm mb-6">
        {description}
      </p>

      {(actionLabel || secondaryLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium transition shadow-xs inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{actionLabel}</span>
            </button>
          )}

          {secondaryLabel && onSecondaryAction && (
            <button
              onClick={onSecondaryAction}
              className="px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/80 text-zinc-700 text-xs font-medium transition inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{secondaryLabel}</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
