import React from 'react';
import { Slide } from '../types';
import { X, Clock, HelpCircle, MessageSquareQuote } from 'lucide-react';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: Slide;
  slideNumber: number;
  totalSlides: number;
  dayNumber: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  slide,
  slideNumber,
  totalSlides,
  dayNumber,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[16px] border border-white/15 bg-[#111111] text-neutral-200 shadow-2xl transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#161616] px-5 py-4">
          <div className="flex items-center gap-2">
            <MessageSquareQuote className="h-5 w-5 text-orange-400" />
            <h3 className="text-[15px] font-bold text-white">
              Notes du formateur
            </h3>
            <span className="rounded-full bg-orange-500/15 border border-orange-500/30 px-2 py-0.5 font-mono text-[10px] font-bold text-orange-400">
              J{dayNumber} · Slide {slideNumber}/{totalSlides}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-neutral-400 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {/* Notes Content */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {slide.presenterNotes ? (
            <div className="space-y-4">
              <div className="rounded-[10px] bg-[#181818] border border-orange-500/25 p-3.5 text-[13.5px] leading-relaxed text-neutral-200 whitespace-pre-wrap">
                {slide.presenterNotes}
              </div>

              <div className="rounded-[10px] bg-white/5 border border-white/5 p-3 text-[12px] text-neutral-400">
                <p className="font-semibold text-white">💡 Conseils d'animation :</p>
                <ul className="mt-1 list-disc pl-4 space-y-1">
                  <li>Laissez 10-15 secondes aux participants pour lire l'écran.</li>
                  <li>Posez une question ouverte avant de donner la réponse.</li>
                  <li>Proposez aux participants d'expérimenter en direct dans Claude.</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-neutral-400">
              <HelpCircle className="mx-auto h-8 w-8 text-neutral-600 mb-2" />
              <p className="text-[14px] font-medium text-neutral-300">Aucune note spécifique pour cette slide.</p>
              <p className="text-[12px] mt-1 text-neutral-500">
                Passez en revue les points clés affichés et favorisez l'échange avec le groupe.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 bg-[#161616] px-5 py-3 text-[11px] font-mono text-neutral-400">
          <span>Raccourci : touche <kbd className="font-bold text-white">P</kbd> pour basculer</span>
          <button
            onClick={onClose}
            className="rounded-full bg-orange-500 px-4 py-1.5 text-xs font-bold text-white transition-colors hover:bg-orange-400 cursor-pointer shadow-xs"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
