import React from 'react';

interface EyebrowLabelProps {
  children: React.ReactNode;
  tone?: 'slate' | 'signal';
}

export const EyebrowLabel: React.FC<EyebrowLabelProps> = ({
  children,
  tone = 'slate',
}) => {
  const isSignal = tone === 'signal';
  return (
    <div
      className={`font-mono-label flex items-center gap-2 text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase ${
        isSignal ? 'text-orange-400' : 'text-neutral-400'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 flex-none rounded-full ${
          isSignal ? 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'bg-neutral-500'
        }`}
      />
      <span>{children}</span>
    </div>
  );
};
