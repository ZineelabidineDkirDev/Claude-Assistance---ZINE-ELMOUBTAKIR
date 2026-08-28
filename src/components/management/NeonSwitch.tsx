import React from 'react';
import { motion } from 'motion/react';
import { playSwitchClick } from '../../utils/soundEffects';

export type NeonColor = 'cyan' | 'violet' | 'emerald' | 'amber' | 'rose' | 'azure';

interface NeonSwitchProps {
  id: string;
  label: string;
  description?: string;
  category?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  color?: NeonColor;
  metric?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

const COLOR_MAP: Record<
  NeonColor,
  {
    glow: string;
    border: string;
    text: string;
    bgPill: string;
    accentHex: string;
    circuitGlow: string;
  }
> = {
  cyan: {
    glow: 'rgba(0, 245, 255, 0.55)',
    border: 'border-cyan-400/60',
    text: 'text-cyan-400',
    bgPill: 'bg-cyan-500',
    accentHex: '#00F5FF',
    circuitGlow: 'from-cyan-500/50 to-transparent',
  },
  violet: {
    glow: 'rgba(176, 38, 255, 0.55)',
    border: 'border-purple-400/60',
    text: 'text-purple-400',
    bgPill: 'bg-purple-500',
    accentHex: '#B026FF',
    circuitGlow: 'from-purple-500/50 to-transparent',
  },
  emerald: {
    glow: 'rgba(57, 255, 20, 0.55)',
    border: 'border-emerald-400/60',
    text: 'text-emerald-400',
    bgPill: 'bg-emerald-500',
    accentHex: '#39FF14',
    circuitGlow: 'from-emerald-500/50 to-transparent',
  },
  amber: {
    glow: 'rgba(255, 158, 0, 0.55)',
    border: 'border-amber-400/60',
    text: 'text-amber-400',
    bgPill: 'bg-amber-500',
    accentHex: '#FF9E00',
    circuitGlow: 'from-amber-500/50 to-transparent',
  },
  rose: {
    glow: 'rgba(255, 0, 127, 0.55)',
    border: 'border-rose-400/60',
    text: 'text-rose-400',
    bgPill: 'bg-rose-500',
    accentHex: '#FF007F',
    circuitGlow: 'from-rose-500/50 to-transparent',
  },
  azure: {
    glow: 'rgba(0, 128, 255, 0.55)',
    border: 'border-blue-400/60',
    text: 'text-blue-400',
    bgPill: 'bg-blue-500',
    accentHex: '#0080FF',
    circuitGlow: 'from-blue-500/50 to-transparent',
  },
};

export const NeonSwitch: React.FC<NeonSwitchProps> = ({
  id,
  label,
  description,
  category,
  checked,
  onChange,
  color = 'cyan',
  metric,
  icon,
  disabled = false,
}) => {
  const theme = COLOR_MAP[color];

  const handleToggle = () => {
    if (disabled) return;
    const nextState = !checked;
    playSwitchClick(nextState);
    onChange(nextState);
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
      onClick={handleToggle}
      className={`relative group cursor-pointer select-none rounded-2xl p-4 sm:p-5 transition-all duration-300
        backdrop-blur-xl border 
        ${
          checked
            ? `bg-gradient-to-b from-[#12141c]/90 via-[#0d0f17]/95 to-[#07080d] ${theme.border} shadow-[0_0_24px_-4px_${theme.glow}]`
            : 'bg-[#0c0d12]/75 border-white/5 hover:border-white/15 hover:bg-[#10121a]/80 shadow-lg'
        }
      `}
      role="switch"
      aria-checked={checked}
      id={`switch-${id}`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      {/* Top illuminated circuit highlight bar */}
      <div
        className={`absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r ${
          checked ? theme.circuitGlow : 'from-transparent to-transparent'
        } transition-all duration-500`}
      />

      {/* Header Row: Icon + Category + 0/I Switch */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          {icon && (
            <div
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                checked
                  ? `bg-[#0a0c14] border ${theme.border} ${theme.text} shadow-[0_0_12px_${theme.glow}]`
                  : 'bg-white/5 border border-white/10 text-neutral-400'
              }`}
            >
              {icon}
            </div>
          )}
          <div className="min-w-0">
            {category && (
              <span className="block font-mono text-[9px] uppercase tracking-widest text-neutral-400 font-semibold truncate">
                {category}
              </span>
            )}
            <h4
              className={`font-display text-sm font-semibold tracking-tight truncate transition-colors duration-200 ${
                checked ? 'text-white' : 'text-neutral-300 group-hover:text-white'
              }`}
            >
              {label}
            </h4>
          </div>
        </div>

        {/* Tactile "0 / I" Rocker Switch Unit */}
        <div className="relative shrink-0 flex items-center gap-1.5 bg-[#07080b] p-1 rounded-full border border-white/10 shadow-inner">
          {/* Engraved "0" (OFF) Indicator */}
          <span
            className={`font-mono text-[10px] font-bold px-1.5 transition-colors duration-200 ${
              !checked ? 'text-neutral-300' : 'text-neutral-600'
            }`}
          >
            0
          </span>

          {/* Sliding Neon Capsule Pill */}
          <div
            className={`relative w-12 h-6 rounded-full p-0.5 flex items-center transition-colors duration-300 ${
              checked ? 'bg-[#0a0d16] border border-white/20' : 'bg-[#12131a] border border-white/5'
            }`}
          >
            <motion.div
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={`h-5 w-5 rounded-full flex items-center justify-center font-mono text-[9px] font-black shadow-md transition-all duration-300 ${
                checked
                  ? `${theme.bgPill} text-[#050608] shadow-[0_0_14px_${theme.glow}]`
                  : 'bg-neutral-600 text-neutral-300 translate-x-0'
              }`}
              style={{
                marginLeft: checked ? 'auto' : '0',
              }}
            >
              {checked ? 'I' : '0'}
            </motion.div>
          </div>

          {/* Engraved "I" (ON) Indicator */}
          <span
            className={`font-mono text-[10px] font-bold px-1.5 transition-colors duration-200 ${
              checked ? `${theme.text} drop-shadow-[0_0_6px_${theme.glow}]` : 'text-neutral-600'
            }`}
          >
            I
          </span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p className="mt-2.5 text-xs text-neutral-400 leading-relaxed line-clamp-2">
          {description}
        </p>
      )}

      {/* Footer Info / Live Metric */}
      <div className="mt-3.5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
        <div className="flex items-center gap-1.5">
          <span
            className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
              checked ? `${theme.bgPill} shadow-[0_0_8px_${theme.glow}] animate-pulse` : 'bg-neutral-600'
            }`}
          />
          <span className={checked ? theme.text : 'text-neutral-500'}>
            {checked ? 'STATUS: ACTIVE (I)' : 'STATUS: STANDBY (0)'}
          </span>
        </div>

        {metric && (
          <span
            className={`px-2 py-0.5 rounded-md text-[10px] font-semibold transition-all duration-300 ${
              checked
                ? `bg-[#0a0c16] border ${theme.border} ${theme.text}`
                : 'bg-white/5 text-neutral-400'
            }`}
          >
            {metric}
          </span>
        )}
      </div>
    </motion.div>
  );
};
