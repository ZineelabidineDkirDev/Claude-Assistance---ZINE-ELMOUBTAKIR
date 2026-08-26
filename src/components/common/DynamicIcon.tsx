import React from 'react';
import {
  MessageSquare,
  Code2,
  Cpu,
  Layers,
  Terminal,
  FolderKanban,
  Users,
  Monitor,
  Database,
  FileSpreadsheet,
  BarChart3,
  Sparkles,
  Bot,
  Globe,
  Settings,
  Workflow,
  Search,
  CheckCircle2,
  FileText,
  UploadCloud,
  FileCode,
  Sliders,
  ShieldCheck,
  Zap,
  TrendingUp,
  BrainCircuit,
  Eye,
  Flame,
  Binary,
} from 'lucide-react';

interface DynamicIconProps {
  name: string;
  className?: string;
  strokeWidth?: number;
}

const ICON_MAP: Record<string, React.ElementType> = {
  chat: MessageSquare,
  message: MessageSquare,
  code: Code2,
  'claude-code': Terminal,
  artifact: Cpu,
  artifacts: Cpu,
  mcp: Layers,
  api: BrainCircuit,
  projects: FolderKanban,
  coworkers: Users,
  desktop: Monitor,
  database: Database,
  sql: Database,
  excel: FileSpreadsheet,
  spreadsheet: FileSpreadsheet,
  powerbi: BarChart3,
  barchart: BarChart3,
  sparkles: Sparkles,
  bot: Bot,
  globe: Globe,
  settings: Sliders,
  workflow: Workflow,
  search: Search,
  check: CheckCircle2,
  file: FileText,
  upload: UploadCloud,
  filecode: FileCode,
  shield: ShieldCheck,
  zap: Zap,
  trending: TrendingUp,
  eye: Eye,
  flame: Flame,
  binary: Binary,
};

export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  className = 'h-5 w-5',
  strokeWidth = 2,
}) => {
  const normalizedKey = (name || '').toLowerCase().replace(/[^a-z0-9_-]/g, '');
  const IconComponent = ICON_MAP[normalizedKey] || Sparkles;

  return <IconComponent className={className} strokeWidth={strokeWidth} />;
};
