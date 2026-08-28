import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Zap, ArrowRight, CheckCircle, TrendingDown, Sparkles } from 'lucide-react';
import { playBeep } from '../../utils/soundEffects';

export const InfrastructureCalculator: React.FC = () => {
  const [nodesCount, setNodesCount] = useState<number>(45);
  const [requestsMillions, setRequestsMillions] = useState<number>(25);
  const [hasMultiRegion, setHasMultiRegion] = useState<boolean>(true);

  // Compute estimated ROI
  const traditionalCost = Math.round(nodesCount * 85 + requestsMillions * 32);
  const optimizedCost = Math.round(traditionalCost * 0.58);
  const monthlySavings = traditionalCost - optimizedCost;
  const latencyReduction = hasMultiRegion ? '72%' : '48%';
  const carbonReducedKg = Math.round(nodesCount * 14.5);

  return (
    <section id="roi-calculator" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="rounded-3xl p-6 sm:p-10 backdrop-blur-2xl bg-gradient-to-br from-[#120f1c]/90 via-[#0a0812]/95 to-[#050408] border border-purple-500/30 shadow-[0_0_40px_-10px_rgba(176,38,255,0.25)] relative overflow-hidden">
        {/* Top Glow Hairline */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Sliders */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase">
              <Calculator className="h-3.5 w-3.5 text-purple-400" />
              <span>Simulateur d'Impact & Économies FinOps</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Estimez Vos Gains de Performance & Réduction de Coûts
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed">
              Ajustez l'envergure de votre flotte de serveurs et le volume mensuel de requêtes pour visualiser instantanément l'impact de l'auto-scaling et du cache quantique.
            </p>

            {/* Slider 1: Nodes */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#06050b] border border-white/5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300">Nombre de nœuds / conteneurs :</span>
                <span className="text-cyan-400 font-bold text-sm">{nodesCount} Nœuds</span>
              </div>
              <input
                type="range"
                min="5"
                max="250"
                step="5"
                value={nodesCount}
                onChange={(e) => {
                  setNodesCount(Number(e.target.value));
                  playBeep(700, 0.015);
                }}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>5 nœuds (Startup)</span>
                <span>100 nœuds (Scale-up)</span>
                <span>250+ (Enterprise)</span>
              </div>
            </div>

            {/* Slider 2: Requests */}
            <div className="space-y-2 p-4 rounded-2xl bg-[#06050b] border border-white/5">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-neutral-300">Volume de requêtes mensuelles :</span>
                <span className="text-purple-400 font-bold text-sm">{requestsMillions}M Req/mois</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                step="1"
                value={requestsMillions}
                onChange={(e) => {
                  setRequestsMillions(Number(e.target.value));
                  playBeep(850, 0.015);
                }}
                className="w-full h-2 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-purple-400"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>1M req</span>
                <span>50M req</span>
                <span>100M+ req</span>
              </div>
            </div>

            {/* Multi-region switch */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#06050b] border border-white/5">
              <div>
                <span className="font-display text-sm font-semibold text-white block">
                  Déploiement Edge Multi-Régions
                </span>
                <span className="text-xs text-neutral-400 font-mono">
                  Casablanca, Paris, Francfort & New York
                </span>
              </div>
              <button
                onClick={() => setHasMultiRegion(!hasMultiRegion)}
                className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                  hasMultiRegion
                    ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(57,255,20,0.5)]'
                    : 'bg-white/10 text-neutral-400'
                }`}
              >
                {hasMultiRegion ? 'ACTIF (I)' : 'STANDBY (0)'}
              </button>
            </div>
          </div>

          {/* Right Column: Dynamic Estimated Gains Card */}
          <div className="lg:col-span-5 rounded-3xl p-6 sm:p-7 bg-[#07060d] border border-purple-500/40 shadow-[0_0_30px_-5px_rgba(176,38,255,0.3)] space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="font-mono text-xs text-purple-300 uppercase tracking-wider font-semibold">
                Bilan Prévisionnel Mensuel
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-mono font-bold flex items-center gap-1">
                <TrendingDown className="h-3 w-3" />
                -42% de Coûts
              </span>
            </div>

            {/* Primary Big Metric: Savings */}
            <div>
              <span className="text-xs font-mono text-neutral-400 block mb-1">Économies Directes Estimées :</span>
              <div className="flex items-baseline gap-2">
                <span className="font-display text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-purple-400">
                  {monthlySavings.toLocaleString()} $
                </span>
                <span className="text-xs font-mono text-neutral-400">/ mois</span>
              </div>
              <p className="text-[11px] font-mono text-neutral-400 mt-1">
                Soit approx. {(monthlySavings * 10).toLocaleString()} MAD / mois
              </p>
            </div>

            {/* Grid of Micro-Gains */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Réduction de Latence</span>
                <span className="text-cyan-400 font-display text-xl font-bold">-{latencyReduction}</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-[10px] font-mono text-neutral-400 block">Empreinte Carbone</span>
                <span className="text-emerald-400 font-display text-xl font-bold">-{carbonReducedKg} kg CO₂</span>
              </div>
            </div>

            {/* CTA inside calculator */}
            <a
              href="#switchboard"
              className="mt-4 w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 hover:from-cyan-400 hover:to-orange-400 text-black font-display font-bold text-sm tracking-tight flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,245,255,0.4)] transition-all transform hover:scale-[1.02]"
            >
              <span>Tester la Matrice de Contrôle</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
