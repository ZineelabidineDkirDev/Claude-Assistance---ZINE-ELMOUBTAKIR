import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Cpu,
  Layers,
  Sparkles,
  BarChart3,
  Shield,
  Clock,
  ArrowUpRight,
  RefreshCcw,
  CheckCircle2,
  Terminal,
  Activity,
  Globe,
  Database,
  Lock,
} from 'lucide-react';
import { playBeep } from '../../utils/soundEffects';

export const GlassmorphicBentoGrid: React.FC = () => {
  const [selectedCluster, setSelectedCluster] = useState<'eu-west-1' | 'us-east-1' | 'af-north-1'>('af-north-1');
  const [activeTab, setActiveTab] = useState<'sql' | 'cache' | 'pipeline'>('sql');

  return (
    <section id="features" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-300 text-xs font-mono tracking-widest uppercase mb-3 shadow-[0_0_12px_rgba(176,38,255,0.25)]">
            <Layers className="h-3.5 w-3.5 text-purple-400" />
            <span>Architecture Glassmorphism Ultra-Dense</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Un Écosystème de Gestion <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-orange-400">
              Conçu pour l'Échelle Mondiale
            </span>
          </h2>
        </div>
        <p className="text-sm text-neutral-400 max-w-md leading-relaxed">
          Chaque composant bénéficie d'un flou d'arrière-plan haute définition (backdrop-blur), de bordures néons rétroéclairées et de données rafraîchies à la milliseconde.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-5">
        {/* Card 1: Large Node & Cluster Topology Visualizer (Col-span 7) */}
        <div className="lg:col-span-7 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-gradient-to-br from-[#10121c]/80 via-[#0b0d14]/90 to-[#07080c] border border-cyan-500/30 shadow-[0_0_30px_-8px_rgba(0,245,255,0.2)] flex flex-col justify-between relative overflow-hidden group">
          {/* Top subtle glow line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

          <div>
            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-[0_0_12px_rgba(0,245,255,0.3)]">
                  <Cpu className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    Orchestration de Clusters & Nœuds K8s
                  </h3>
                  <p className="font-mono text-xs text-neutral-400">
                    Maillage distribué multi-cloud avec auto-guérison
                  </p>
                </div>
              </div>

              {/* Cluster selector pills */}
              <div className="flex items-center gap-1 bg-[#06080e] p-1 rounded-xl border border-white/10 text-xs font-mono">
                {(['af-north-1', 'eu-west-1', 'us-east-1'] as const).map((cluster) => (
                  <button
                    key={cluster}
                    onClick={() => {
                      playBeep(900, 0.03);
                      setSelectedCluster(cluster);
                    }}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      selectedCluster === cluster
                        ? 'bg-cyan-500 text-black font-bold shadow-[0_0_10px_rgba(0,245,255,0.5)]'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    {cluster === 'af-north-1' ? 'Casablanca 🇲🇦' : cluster === 'eu-west-1' ? 'Paris 🇪🇺' : 'Virginia 🇺🇸'}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Node Topology Map */}
            <div className="my-5 p-4 rounded-2xl bg-[#06070b]/90 border border-white/5 relative overflow-hidden">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-3">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                  32 NŒUDS ACTIFS · ZERO ANOMALIE
                </span>
                <span>CPU MOYEN: 28.4%</span>
              </div>

              {/* Graphical Nodes Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {Array.from({ length: 16 }).map((_, idx) => {
                  const isHigh = idx === 3 || idx === 11;
                  const load = isHigh ? 78 : Math.floor(20 + ((idx * 17) % 35));
                  return (
                    <motion.div
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      className={`p-2 rounded-xl border transition-all ${
                        isHigh
                          ? 'bg-orange-500/10 border-orange-500/40 text-orange-400 shadow-[0_0_8px_rgba(249,115,22,0.3)]'
                          : 'bg-white/5 border-white/5 hover:border-cyan-400/40 text-neutral-300'
                      }`}
                    >
                      <div className="text-[9px] font-mono text-neutral-400">N-{idx + 1}</div>
                      <div className="text-xs font-mono font-bold mt-0.5">{load}%</div>
                      <div className="w-full bg-white/10 h-1 rounded-full mt-1.5 overflow-hidden">
                        <div
                          className={`h-full ${isHigh ? 'bg-orange-500' : 'bg-cyan-400'}`}
                          style={{ width: `${load}%` }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span className="text-cyan-400 font-semibold">Taux de disponibilité : 99.999% SLA</span>
            <span className="flex items-center gap-1 text-neutral-300">
              Temps de réponse P99 &lt; 2.4ms <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
            </span>
          </div>
        </div>

        {/* Card 2: AI Predictive Threat & Zero-Trust Sentinel (Col-span 5) */}
        <div className="lg:col-span-5 rounded-3xl p-6 sm:p-7 backdrop-blur-2xl bg-gradient-to-br from-[#150f1c]/80 via-[#0d0a14]/90 to-[#07060a] border border-purple-500/30 shadow-[0_0_30px_-8px_rgba(176,38,255,0.2)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400 shadow-[0_0_12px_rgba(176,38,255,0.3)]">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">
                    Sentinelle Cyber IA & Zero-Trust
                  </h3>
                  <p className="font-mono text-xs text-neutral-400">
                    Détection et neutralisation heuristique
                  </p>
                </div>
              </div>
            </div>

            {/* Terminal Live Stream Simulator */}
            <div className="p-3.5 rounded-2xl bg-[#08050e] border border-purple-500/20 font-mono text-[11px] leading-relaxed my-4 text-neutral-300 shadow-inner">
              <div className="flex items-center gap-1.5 pb-2 mb-2 border-b border-white/5 text-[10px] text-purple-400 uppercase tracking-wider">
                <Terminal className="h-3 w-3" />
                <span>Flux d'événements en direct</span>
              </div>
              <div className="space-y-1.5">
                <p className="text-emerald-400">
                  <span className="text-neutral-500">[15:24:02]</span> mTLS Handshake validé: auth.service.corp
                </p>
                <p className="text-purple-300">
                  <span className="text-neutral-500">[15:24:08]</span> Tentative injection SQL détectée & bloquée (IP 194.26.*)
                </p>
                <p className="text-cyan-300">
                  <span className="text-neutral-500">[15:24:14]</span> Clé de chiffrement AES-256 rotatée avec succès
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono">
            <span className="text-purple-400 font-semibold">14 290 Menaces Bloquées / 24h</span>
            <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px]">
              Certifié ISO 27001
            </span>
          </div>
        </div>

        {/* Card 3: Dynamic SQL & BI Engine Stream (Col-span 4) */}
        <div className="lg:col-span-4 rounded-3xl p-6 backdrop-blur-2xl bg-gradient-to-br from-[#1a140d]/80 via-[#100d08]/90 to-[#070605] border border-amber-500/30 shadow-[0_0_30px_-8px_rgba(255,158,0,0.2)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shadow-[0_0_12px_rgba(255,158,0,0.3)]">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  Moteur SQL & Analytique BI
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  PostgreSQL, MySQL, ClickHouse & Power BI
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0a0805] border border-amber-500/20 text-xs font-mono my-3 space-y-2">
              <div className="flex justify-between text-neutral-400">
                <span>Jointure Multi-Table (10M lignes)</span>
                <span className="text-amber-400 font-bold">14.2 ms</span>
              </div>
              <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-amber-400 w-3/4 rounded-full" />
              </div>
              <div className="flex justify-between text-[11px] text-neutral-500 pt-1">
                <span>Indexation IA : Optimisée</span>
                <span className="text-emerald-400">Hit-Ratio : 99.4%</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Requêtes traitées :</span>
            <span className="text-amber-400 font-bold">4.8M / min</span>
          </div>
        </div>

        {/* Card 4: Global Edge Mesh & Latency Radar (Col-span 4) */}
        <div className="lg:col-span-4 rounded-3xl p-6 backdrop-blur-2xl bg-gradient-to-br from-[#0c161d]/80 via-[#070e14]/90 to-[#04070a] border border-blue-500/30 shadow-[0_0_30px_-8px_rgba(0,128,255,0.2)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400 shadow-[0_0_12px_rgba(0,128,255,0.3)]">
                <Globe className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  Réseau Edge Mondial Anycast
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  280+ Points de Présence mondiaux
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3 font-mono text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Casablanca (CMN)</span>
                <span className="text-blue-400 font-bold">1.8 ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Paris (CDG)</span>
                <span className="text-cyan-400 font-bold">3.2 ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">Frankfurt (FRA)</span>
                <span className="text-emerald-400 font-bold">4.1 ms</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                <span className="text-neutral-400 block text-[10px]">New York (JFK)</span>
                <span className="text-purple-400 font-bold">18.6 ms</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Bande passante totale :</span>
            <span className="text-blue-400 font-bold">140 Tbps</span>
          </div>
        </div>

        {/* Card 5: Autonomous FinOps & ROI Engine (Col-span 4) */}
        <div className="lg:col-span-4 rounded-3xl p-6 backdrop-blur-2xl bg-gradient-to-br from-[#0c1811]/80 via-[#07100b]/90 to-[#040806] border border-emerald-500/30 shadow-[0_0_30px_-8px_rgba(57,255,20,0.2)] flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent" />

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_12px_rgba(57,255,20,0.3)]">
                <BarChart3 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">
                  Intelligence FinOps & Coûts
                </h3>
                <p className="font-mono text-xs text-neutral-400">
                  Réduction automatisée des gaspillages
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#050a07] border border-emerald-500/20 my-3">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-neutral-400">Économie Mensuelle Réalisée</span>
                <span className="font-display text-xl font-bold text-emerald-400">-42.5%</span>
              </div>
              <p className="mt-1 text-[11px] text-neutral-400 leading-relaxed font-mono">
                Nœuds sous-utilisés mis en veille automatique et conversion dynamique en instances Spot.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-neutral-400">
            <span>Audit de conformité :</span>
            <span className="text-emerald-400 font-semibold">100% Validé</span>
          </div>
        </div>
      </div>
    </section>
  );
};
