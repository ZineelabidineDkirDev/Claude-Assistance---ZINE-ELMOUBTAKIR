import React from 'react';
import { SlideTone } from '../../types';

interface SlideShellProps {
  tone?: SlideTone;
  children: React.ReactNode;
  className?: string;
  row?: boolean;
}

const TONE_CLASSES: Record<SlideTone, string> = {
  cover: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0a0a0a] to-[#050505] text-white',
  dark: 'bg-[#0a0a0a] text-neutral-100',
  light: 'bg-[#0e0e10] text-neutral-200',
};

export const SlideShell: React.FC<SlideShellProps> = ({
  tone = 'light',
  children,
  className = '',
  row = false,
}) => {
  return (
    <div
      className={`relative flex h-full w-full select-text overflow-y-auto ${
        row ? 'flex-col sm:flex-row sm:items-center sm:gap-10' : 'flex-col'
      } px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12 ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </div>
  );
};
