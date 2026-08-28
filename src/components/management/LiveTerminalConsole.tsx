import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal, Play, Copy, Check, Sparkles, RefreshCw, Trash2, Cpu, Shield } from 'lucide-react';
import { playBeep } from '../../utils/soundEffects';

interface LogEntry {
  id: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'cmd';
  text: string;
}

const PRESET_COMMANDS = [
  { cmd: 'nexus status --all', label: '📊 Diagnostic Global' },
  { cmd: 'nexus security --audit-cndp', label: '🛡️ Audit Conformité CNDP & RGPD' },
  { cmd: 'nexus scale --pods=48 --zone=cmn-1', label: '⚡ Auto-Scale Casablanca' },
  { cmd: 'nexus db optimize --vacuum-all', label: '🗄️ Optimiser Base de Données' },
  { cmd: 'nexus cache purge --region=all', label: '🚀 Purge Cache Quantique' },
];

export const LiveTerminalConsole: React.FC = () => {
  const [inputCommand, setInputCommand] = useState('');
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', time: '15:20:00', type: 'info', text: 'ZAYN OS NEXUS CORE v4.8.2 Initialized in cluster CMN-PRIMARY' },
    { id: '2', time: '15:20:02', type: 'success', text: 'mTLS Zero-Trust Gateway: 100% active, 0 expired certs' },
    { id: '3', time: '15:20:05', type: 'info', text: 'Quantum Cache synchronized across 12 edge nodes [P99: 0.9ms]' },
    { id: '4', time: '15:20:12', type: 'success', text: 'PostgreSQL read replicas health check passed: Lag = 0ms' },
  ]);
  const [isCopied, setIsCopied] = useState(false);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [logs]);

  const executeCommand = (cmdToRun: string) => {
    const trimmed = cmdToRun.trim();
    if (!trimmed) return;

    playBeep(1100, 0.04);
    const now = new Date().toLocaleTimeString('fr-FR');

    const newLogs: LogEntry[] = [
      ...logs,
      { id: Math.random().toString(), time: now, type: 'cmd', text: `$ ${trimmed}` },
    ];

    if (trimmed.includes('status')) {
      newLogs.push(
        { id: Math.random().toString(), time: now, type: 'info', text: 'CLUSTER STATUS: ALL 8 NODES HEALTHY' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Memory: 42.1 GB / 128 GB (32.8%) | Load: 0.28 | IOPS: 48,200/s' },
        { id: Math.random().toString(), time: now, type: 'info', text: 'Active Regions: CMN-1 (Casablanca), CDG-1 (Paris), FRA-1 (Frankfurt)' }
      );
    } else if (trimmed.includes('security') || trimmed.includes('cndp')) {
      newLogs.push(
        { id: Math.random().toString(), time: now, type: 'info', text: 'Running automated CNDP (Loi 09-08) & RGPD scanner...' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Anonymisation des tokens: 100% CONFORME' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Registre de traitement & Chiffrement au repos: ACTIF (AES-256-GCM)' }
      );
    } else if (trimmed.includes('scale')) {
      newLogs.push(
        { id: Math.random().toString(), time: now, type: 'info', text: 'Provisioning +32 pods in zone CMN-1 (Casablanca)...' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Target cluster reached 48 pods in 1.4s. Throughput capacity +240%.' }
      );
    } else if (trimmed.includes('db') || trimmed.includes('optimize')) {
      newLogs.push(
        { id: Math.random().toString(), time: now, type: 'info', text: 'Analyzing slow query logs & B-Tree indexes...' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Vacuum completed. 14 indexes compacted. Query speedup: +38%.' }
      );
    } else if (trimmed.includes('cache') || trimmed.includes('purge')) {
      newLogs.push(
        { id: Math.random().toString(), time: now, type: 'warning', text: 'Broadcasting quantum purge invalidation token across edge...' },
        { id: Math.random().toString(), time: now, type: 'success', text: 'Cache flushed in 0.8ms. Warmup scheduled in background.' }
      );
    } else {
      newLogs.push({
        id: Math.random().toString(),
        time: now,
        type: 'info',
        text: `Executing custom microservice task: "${trimmed}" — Status: 200 OK.`,
      });
    }

    setLogs(newLogs);
    setInputCommand('');
  };

  const clearLogs = () => {
    playBeep(600, 0.03);
    setLogs([{ id: 'init', time: new Date().toLocaleTimeString('fr-FR'), type: 'info', text: 'Terminal logs cleared. Ready for input.' }]);
  };

  const copyLogs = () => {
    const text = logs.map((l) => `[${l.time}] ${l.text}`).join('\n');
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="terminal" className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="rounded-3xl p-6 sm:p-8 backdrop-blur-2xl bg-[#08090f]/90 border border-cyan-500/30 shadow-[0_0_40px_-10px_rgba(0,245,255,0.25)] relative overflow-hidden">
        {/* Top Glow Hairline */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {/* Terminal Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 inline-block border border-red-400/40" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 inline-block border border-amber-400/40" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 inline-block border border-emerald-400/40" />
            </div>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10">
              <Terminal className="h-4 w-4 text-cyan-400" />
              <span className="font-mono text-xs font-semibold text-white tracking-wide">
                zayn-cli@nexus-core:~ (zsh)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyLogs}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white border border-white/5 text-xs font-mono flex items-center gap-1.5 transition-all"
            >
              {isCopied ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3 text-neutral-400" />}
              <span>{isCopied ? 'Copié !' : 'Copier Logs'}</span>
            </button>
            <button
              onClick={clearLogs}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-neutral-400 hover:text-red-300 border border-white/5 transition-all"
              title="Effacer les logs"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Preset Quick Actions */}
        <div className="py-3 flex flex-wrap items-center gap-2 border-b border-white/5">
          <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1 mr-1">
            <Sparkles className="h-3 w-3 text-cyan-400" />
            Commandes Rapides :
          </span>
          {PRESET_COMMANDS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => executeCommand(item.cmd)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/15 hover:border-cyan-500/40 text-neutral-300 hover:text-cyan-300 border border-white/5 text-[11px] font-mono transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Terminal Log Screen */}
        <div
          ref={logContainerRef}
          className="h-64 sm:h-72 overflow-y-auto font-mono text-xs p-4 bg-[#05060a] rounded-2xl my-4 space-y-2 border border-white/5 shadow-inner"
        >
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-2.5 leading-relaxed">
              <span className="text-neutral-500 text-[10px] shrink-0 select-none pt-0.5">[{log.time}]</span>
              <span
                className={`flex-1 break-all ${
                  log.type === 'cmd'
                    ? 'text-cyan-400 font-bold'
                    : log.type === 'success'
                    ? 'text-emerald-400'
                    : log.type === 'warning'
                    ? 'text-amber-400'
                    : log.type === 'error'
                    ? 'text-rose-400'
                    : 'text-neutral-300'
                }`}
              >
                {log.text}
              </span>
            </div>
          ))}
        </div>

        {/* Input Prompt */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            executeCommand(inputCommand);
          }}
          className="flex items-center gap-2 bg-[#05060a] border border-cyan-500/30 rounded-2xl p-2 px-3 shadow-[0_0_15px_rgba(0,245,255,0.1)] focus-within:border-cyan-400 focus-within:shadow-[0_0_20px_rgba(0,245,255,0.25)] transition-all"
        >
          <span className="font-mono text-cyan-400 font-bold text-sm select-none">&gt;</span>
          <input
            type="text"
            value={inputCommand}
            onChange={(e) => setInputCommand(e.target.value)}
            placeholder="Tapez une commande (ex: nexus status, nexus optimize, help)..."
            className="flex-1 bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-neutral-600"
          />
          <button
            type="submit"
            className="px-3.5 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-mono text-xs font-bold flex items-center gap-1 shadow-[0_0_10px_rgba(0,245,255,0.5)] transition-all"
          >
            <Play className="h-3 w-3 fill-black" />
            <span>Exécuter</span>
          </button>
        </form>
      </div>
    </section>
  );
};
