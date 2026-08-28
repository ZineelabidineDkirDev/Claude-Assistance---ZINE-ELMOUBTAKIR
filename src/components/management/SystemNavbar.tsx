import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  VolumeX,
  Clock,
  Search,
  FolderOpen,
  Menu,
  X,
  Sun,
  Moon,
} from 'lucide-react';
import { ZaynLogo } from '../ZaynLogo';
import { toggleSound, isSoundEnabled, playBeep, playSwitchClick } from '../../utils/soundEffects';

interface SystemNavbarProps {
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
  onOpenCommandPalette: () => void;
  onNavigateResources?: () => void;
  onSelectDay?: (dayNumber: number) => void;
  activeDay?: number;
}

export const SystemNavbar: React.FC<SystemNavbarProps> = ({
  theme = 'dark',
  onToggleTheme,
  onOpenCommandPalette,
  onNavigateResources,
  onSelectDay,
  activeDay,
}) => {
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [timeString, setTimeString] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isLight = theme === 'light';

  useEffect(() => {
    setSoundActive(isSoundEnabled());

    const updateClock = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString('fr-FR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          timeZone: 'Africa/Casablanca',
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundActive(next);
    if (next) playBeep(900, 0.05);
  };

  const handleThemeToggle = () => {
    playSwitchClick(!isLight);
    if (onToggleTheme) onToggleTheme();
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-colors">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl backdrop-blur-2xl px-4 sm:px-6 h-16 flex items-center justify-between transition-all duration-300 ${
          isLight
            ? 'bg-white/85 border border-neutral-200/80 shadow-[0_4px_25px_rgba(0,0,0,0.06)]'
            : 'bg-[#08090f]/90 border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
        }`}
      >
        {/* Brand & Logo (Sans badge "5 JOURS") */}
        <a href="/" className="flex items-center gap-3 group">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl p-1.5 transition-all duration-300 ${
              isLight
                ? 'bg-orange-50 border border-orange-200 shadow-sm group-hover:border-orange-400'
                : 'bg-[#0e1017] border border-orange-500/40 shadow-[0_0_15px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/20 group-hover:border-orange-400'
            }`}
          >
            <ZaynLogo className="h-full w-full" color="#F97316" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`font-display font-bold text-base tracking-tight transition-colors ${
                  isLight ? 'text-neutral-900' : 'text-white'
                }`}
              >
                Zayn<span className="text-orange-500">4Data</span>
              </span>
            </div>
            <p
              className={`font-mono text-[10px] transition-colors ${
                isLight ? 'text-neutral-500' : 'text-neutral-400'
              }`}
            >
              Analyse de Données & BI avec Claude
            </p>
          </div>
        </a>

        {/* Desktop Nav Links : UNIQUEMENT J1, J2, J3, J4, J5 et RESSOURCES */}
        <div className="hidden md:flex items-center gap-4 font-mono text-xs">
          {/* Day Badges Group J1-J5 */}
          <div
            className={`flex items-center gap-1 p-1 rounded-xl border transition-colors ${
              isLight
                ? 'bg-neutral-100/80 border-neutral-200'
                : 'bg-white/[0.04] border-white/10'
            }`}
          >
            {[1, 2, 3, 4, 5].map((d) => {
              const isActive = activeDay === d;
              return (
                <button
                  key={d}
                  onClick={() => {
                    playSwitchClick(true);
                    if (onSelectDay) onSelectDay(d);
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-orange-500 text-black shadow-[0_0_12px_rgba(249,115,22,0.4)]'
                      : isLight
                      ? 'text-neutral-700 hover:bg-orange-500/15 hover:text-orange-600'
                      : 'text-neutral-300 hover:bg-orange-500 hover:text-black'
                  }`}
                  title={`Accéder directement au Jour 0${d}`}
                >
                  J{d}
                </button>
              );
            })}
          </div>

          {/* Bouton Ressources */}
          {onNavigateResources && (
            <button
              onClick={onNavigateResources}
              className={`px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 font-medium cursor-pointer ${
                isLight
                  ? 'bg-white hover:bg-orange-50 text-neutral-700 hover:text-orange-600 border-neutral-200 hover:border-orange-300 shadow-sm'
                  : 'bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-amber-400 border-white/10'
              }`}
            >
              <FolderOpen className="h-3.5 w-3.5 text-orange-500" />
              <span>Ressources</span>
            </button>
          )}
        </div>

        {/* Action Controls : Interrupteur (0/I) Sombre/Clair avec Sun/Moon + Horloge + Son + Recherche */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* ========================================================================= */}
          {/* INTERRUPTEUR (0/I) AFFICHAGE SOMBRE / CLAIR AVEC ICÔNES SUN & MOON        */}
          {/* ========================================================================= */}
          <button
            onClick={handleThemeToggle}
            className={`select-none rounded-xl p-1.5 sm:px-3 border-0 transition-all flex items-center gap-2 cursor-pointer ${
              isLight
                ? 'text-amber-900 hover:bg-amber-500/20 '
                : 'text-orange-300 hover:bg-orange-950/40 '
            }`}
            title={isLight ? 'Passer en mode Sombre (0)' : 'Passer en mode Clair (I)'}
          >
            <div className="flex items-center gap-2">
              {isLight ? (
                <Sun className="h-4 w-4 text-amber-500 animate-spin-slow" />
              ) : (
                <Moon className="h-4 w-4 text-orange-400" />
              )}
              
            </div>

            {/* Slider Switch 0 / I */}
            <div
              className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-colors ${
                isLight ? 'bg-amber-200 border border-amber-400' : 'bg-neutral-900 border border-orange-500/40'
              }`}
            >
              <motion.div
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className={`h-4 w-4 rounded-full flex items-center justify-center font-mono text-[8px] font-black ${
                  isLight
                    ? 'bg-amber-500 text-white shadow-sm'
                    : 'bg-orange-400 text-black shadow-[0_0_8px_#F97316]'
                }`}
                style={{ marginLeft: isLight ? 'auto' : '0' }}
              >
                {isLight ? 'I' : '0'}
              </motion.div>
            </div>
          </button>

          {/* Horloge Casablanca */}
          <div
            className={`hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border font-mono text-[11px] transition-colors ${
              isLight
                ? 'bg-neutral-100 text-neutral-700 border-neutral-200'
                : 'bg-white/5 text-neutral-300 border-white/5'
            }`}
          >
            <Clock className="h-3 w-3 text-orange-500" />
            <span>{timeString || 'Casablanca'}</span>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              soundActive
                ? isLight
                  ? 'bg-orange-50 border-orange-200 text-orange-600 hover:bg-orange-100'
                  : 'bg-orange-500/10 border-orange-500/30 text-orange-400 hover:bg-orange-500/20'
                : isLight
                ? 'bg-neutral-100 border-neutral-200 text-neutral-400 hover:text-neutral-600'
                : 'bg-white/5 border-white/5 text-neutral-500 hover:text-neutral-300'
            }`}
            title={soundActive ? 'Effets sonores activés (cliquer pour couper)' : 'Activer les effets sonores'}
          >
            {soundActive ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Command Palette Button */}
          <button
            onClick={onOpenCommandPalette}
            className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isLight
                ? 'bg-neutral-100 hover:bg-neutral-200/70 border-neutral-200 text-neutral-700'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-neutral-300'
            }`}
          >
            <Search className="h-3.5 w-3.5 text-orange-500" />
            <span className={isLight ? 'text-neutral-600' : 'text-neutral-400'}>Rechercher</span>
           
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-xl cursor-pointer ${
              isLight ? 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200' : 'bg-white/5 text-neutral-400 hover:text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown : UNIQUEMENT J1, J2, J3, J4, J5 et RESSOURCES */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden mt-2 p-4 rounded-2xl border space-y-3 font-mono text-xs shadow-2xl transition-all ${
            isLight
              ? 'bg-white/95 border-neutral-200 text-neutral-800'
              : 'bg-[#090a12]/95 border-white/10 text-neutral-200'
          }`}
        >
          <div className="flex items-center justify-between pb-2 border-b border-neutral-200/20">
            <span className="font-bold text-orange-500 uppercase">Accès Direct aux Jours</span>
            <button
              onClick={handleThemeToggle}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-500/10 text-orange-500 font-bold border border-orange-500/20"
            >
              {isLight ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{isLight ? 'Mode Clair' : 'Mode Sombre'}</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-1.5 py-1">
            {[1, 2, 3, 4, 5].map((d) => (
              <button
                key={d}
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onSelectDay) onSelectDay(d);
                }}
                className={`py-2 text-center rounded-xl font-bold transition-all ${
                  activeDay === d
                    ? 'bg-orange-500 text-black shadow-md'
                    : isLight
                    ? 'bg-neutral-100 text-neutral-800 hover:bg-orange-500 hover:text-black'
                    : 'bg-white/5 text-white hover:bg-orange-500 hover:text-black'
                }`}
              >
                Jour 0{d}
              </button>
            ))}
          </div>

          {onNavigateResources && (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigateResources();
              }}
              className="w-full text-left py-2.5 px-3 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-500 font-bold flex items-center gap-2 border border-orange-500/20"
            >
              <FolderOpen className="h-4 w-4" />
              <span>Fichiers & Ressources SQL</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
};
