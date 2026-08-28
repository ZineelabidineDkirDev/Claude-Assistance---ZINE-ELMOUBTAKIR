import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Cpu,
  Zap,
  Network,
  Lock,
  Database,
  ShieldCheck,
  Coins,
  Activity,
  SlidersHorizontal,
  Flame,
  Leaf,
  RefreshCw,
  Sparkles,
  Server,
  Radio,
} from 'lucide-react';
import { NeonSwitch, NeonColor } from './NeonSwitch';
import { playNeonPowerUp } from '../../utils/soundEffects';

interface SystemModule {
  id: string;
  label: string;
  category: string;
  description: string;
  color: NeonColor;
  metric: string;
  powerDrawKw: number;
  icon: React.ReactNode;
  defaultOn: boolean;
}

const SYSTEM_MODULES: SystemModule[] = [
  {
    id: 'ai_sentinel',
    label: 'Sentinelle IA Autonome',
    category: 'Cyber-Défense',
    description: 'Analyse comportementale en temps réel et neutralisation prédictive des anomalies L7.',
    color: 'violet',
    metric: '99.98% Précision',
    powerDrawKw: 1.4,
    icon: <ShieldAlert className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'quantum_cache',
    label: 'Cache Quantique Edge',
    category: 'Performance',
    description: 'Rétention distribuée multi-région en RAM non volatile avec invalidation <2ms.',
    color: 'cyan',
    metric: '0.8ms P99',
    powerDrawKw: 2.1,
    icon: <Cpu className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'auto_scaler',
    label: 'Auto-Scaling Prédictif',
    category: 'Infrastructure',
    description: 'Élasticité instantanée des pods Kubernetes en prévision des pics de charge.',
    color: 'emerald',
    metric: '12 500 RPS Max',
    powerDrawKw: 3.2,
    icon: <Zap className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'turbo_mesh',
    label: 'Routage Turbo Mesh',
    category: 'Réseau',
    description: 'Bypass BGP intelligent via liaisons directes haute vitesse inter-datacenters.',
    color: 'azure',
    metric: '40 Gbps Débit',
    powerDrawKw: 1.8,
    icon: <Network className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'zero_trust',
    label: 'Passerelle Zero-Trust',
    category: 'Accès & Identité',
    description: 'Authentification continue par empreinte cryptographique mTLS & token éphémère.',
    color: 'rose',
    metric: '100% Chiffré',
    powerDrawKw: 0.9,
    icon: <Lock className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'autonomous_db',
    label: 'Pipeline DB Auto-Index',
    category: 'Données & BI',
    description: 'Optimisation automatique des plans d’exécution SQL, partitionnement et vacuum.',
    color: 'amber',
    metric: '4.2x Plus Rapide',
    powerDrawKw: 2.5,
    icon: <Database className="h-4 w-4" />,
    defaultOn: false,
  },
  {
    id: 'ddos_shield',
    label: 'Bouclier Hyper-Shield L7',
    category: 'Résilience',
    description: 'Absorption téra-échelle contre attaques volumétriques syn-flood et botnets.',
    color: 'cyan',
    metric: '3.2 Tbps Absorbés',
    powerDrawKw: 2.8,
    icon: <ShieldCheck className="h-4 w-4" />,
    defaultOn: true,
  },
  {
    id: 'finops_engine',
    label: 'Optimiseur FinOps IA',
    category: 'Coûts & Climat',
    description: 'Extinction dynamique des nœuds orphelins et arbitrage spot/réservé en continu.',
    color: 'emerald',
    metric: '-38% Facture Cloud',
    powerDrawKw: 0.6,
    icon: <Coins className="h-4 w-4" />,
    defaultOn: false,
  },
];

export const SwitchboardMatrix: React.FC = () => {
  const [switchesState, setSwitchesState] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    SYSTEM_MODULES.forEach((m) => {
      initial[m.id] = m.defaultOn;
    });
    return initial;
  });

  const [activePreset, setActivePreset] = useState<string>('custom');

  const handleToggle = (id: string, val: boolean) => {
    setSwitchesState((prev) => ({
      ...prev,
      [id]: val,
    }));
    setActivePreset('custom');
  };

  const applyPreset = (presetName: 'max' | 'security' | 'eco' | 'off') => {
    playNeonPowerUp();
    setActivePreset(presetName);
    const updated: Record<string, boolean> = {};

    if (presetName === 'max') {
      SYSTEM_MODULES.forEach((m) => (updated[m.id] = true));
    } else if (presetName === 'security') {
      SYSTEM_MODULES.forEach((m) => {
        updated[m.id] = ['ai_sentinel', 'zero_trust', 'ddos_shield', 'autonomous_db'].includes(m.id);
      });
    } else if (presetName === 'eco') {
      SYSTEM_MODULES.forEach((m) => {
        updated[m.id] = ['finops_engine', 'quantum_cache', 'zero_trust'].includes(m.id);
      });
    } else if (presetName === 'off') {
      SYSTEM_MODULES.forEach((m) => (updated[m.id] = false));
    }

    setSwitchesState(updated);
  };

  // Computed live telemetry based on active switches
  const activeCount = Object.values(switchesState).filter(Boolean).length;
  const totalModules = SYSTEM_MODULES.length;
  const healthPercent = Math.round((activeCount / totalModules) * 100);

  // Dynamic calculated metrics
  const calculatedLatency = switchesState.turbo_mesh && switchesState.quantum_cache ? '1.2ms' : switchesState.quantum_cache ? '4.8ms' : '18.4ms';
  const calculatedRps = switchesState.auto_scaler ? '184.2k req/s' : '42.1k req/s';
  const securityScore = (switchesState.ai_sentinel ? 35 : 0) + (switchesState.zero_trust ? 35 : 0) + (switchesState.ddos_shield ? 30 : 0);
  const totalPowerKw = SYSTEM_MODULES.reduce((acc, m) => acc + (switchesState[m.id] ? m.powerDrawKw : 0.2), 0).toFixed(1);

  return (
    <section id="switchboard" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* Background Neon Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-amber-500/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header with Title & Badge */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,245,255,0.2)]">
          <Radio className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
          <span>Matrice de Contrôle Décisionnelle · Relais 0 / I</span>
        </div>

        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
          Panneau d'Interrupteurs <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-orange-400">0 / I Tactile</span>
        </h2>
        <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-2xl mx-auto">
          Prenez les commandes de l'infrastructure en temps réel. Activez ou désactivez les relais énergétiques et observez la réactivité instantanée des télémétries et des circuits lumineux.
        </p>
      </div>

      {/* Live System Reactor HUD Bar */}
      <div className="mt-10 rounded-2xl bg-[#090b10]/80 border border-white/10 backdrop-blur-2xl p-4 sm:p-6 shadow-2xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/5">
          {/* Reactor Health */}
          <div className="px-3 py-2 flex flex-col justify-between">
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="h-3.5 w-3.5 text-cyan-400" />
              État Global Système
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {healthPercent}%
              </span>
              <span className="font-mono text-xs text-cyan-400">
                {activeCount}/{totalModules} Actifs
              </span>
            </div>
            <div className="mt-2.5 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-emerald-400"
                style={{ width: `${healthPercent}%` }}
                animate={{ width: `${healthPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>

          {/* Latency Engine */}
          <div className="px-3 py-2 flex flex-col justify-between pt-4 sm:pt-2">
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Server className="h-3.5 w-3.5 text-purple-400" />
              Latence P99
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {calculatedLatency}
              </span>
              <span className="font-mono text-xs text-emerald-400">Ultra-Fast</span>
            </div>
            <p className="mt-2.5 text-[11px] text-neutral-400 font-mono">
              Mesh Routing: {switchesState.turbo_mesh ? 'Actif (I)' : 'Bypass (0)'}
            </p>
          </div>

          {/* Throughput */}
          <div className="px-3 py-2 flex flex-col justify-between pt-4 sm:pt-2">
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-emerald-400" />
              Débit de Traitement
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {calculatedRps}
              </span>
            </div>
            <p className="mt-2.5 text-[11px] text-neutral-400 font-mono">
              Auto-Scale: {switchesState.auto_scaler ? 'Dynamique (I)' : 'Fixe (0)'}
            </p>
          </div>

          {/* Security Shield Level */}
          <div className="px-3 py-2 flex flex-col justify-between pt-4 sm:pt-2">
            <span className="font-mono text-[11px] text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
              <Lock className="h-3.5 w-3.5 text-rose-400" />
              Indice Cyber-Bouclier
            </span>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {securityScore}/100
              </span>
              <span className="font-mono text-[10px] text-neutral-400 font-bold">
                {totalPowerKw} kW Consommés
              </span>
            </div>
            <div className="mt-2.5 w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-purple-500"
                style={{ width: `${securityScore}%` }}
                animate={{ width: `${securityScore}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Master Preset Buttons */}
        <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <SlidersHorizontal className="h-3.5 w-3.5 text-orange-400" />
            <span>Profils Prédéfinis :</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => applyPreset('max')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePreset === 'max'
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,245,255,0.6)] font-bold'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Flame className="h-3.5 w-3.5 text-cyan-300" />
              Mode Turbo Max
            </button>

            <button
              onClick={() => applyPreset('security')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePreset === 'security'
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(176,38,255,0.6)] font-bold'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5 text-purple-300" />
              Sécurité Renforcée
            </button>

            <button
              onClick={() => applyPreset('eco')}
              className={`px-3 py-1.5 rounded-xl font-mono text-xs font-semibold flex items-center gap-1.5 transition-all ${
                activePreset === 'eco'
                  ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(57,255,20,0.6)] font-bold'
                  : 'bg-white/5 text-neutral-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              <Leaf className="h-3.5 w-3.5 text-emerald-300" />
              Mode Éco / FinOps
            </button>

            <button
              onClick={() => applyPreset('off')}
              className="px-3 py-1.5 rounded-xl font-mono text-xs text-neutral-400 hover:text-white bg-white/5 hover:bg-red-500/20 border border-white/5 transition-all"
            >
              <RefreshCw className="h-3 w-3 inline mr-1" />
              Standby (0)
            </button>
          </div>
        </div>
      </div>

      {/* Grid of 0/I Interactive Switches */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {SYSTEM_MODULES.map((module) => (
          <NeonSwitch
            key={module.id}
            id={module.id}
            label={module.label}
            category={module.category}
            description={module.description}
            checked={!!switchesState[module.id]}
            onChange={(val) => handleToggle(module.id, val)}
            color={module.color}
            metric={module.metric}
            icon={module.icon}
          />
        ))}
      </div>
    </section>
  );
};
