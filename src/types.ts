export interface DayMeta {
  day: number;
  title: string;
  subtitle?: string;
  date: string;
  objective?: string;
  deliverables?: string[];
}

export type SlideTone = 'light' | 'dark' | 'cover';

export interface BaseSlide {
  id: string;
  type: string;
  eyebrow?: string;
  presenterNotes?: string;
}

export interface CoverSlideData extends BaseSlide {
  type: 'cover';
  title: string[] | string;
  highlight?: string;
  subtitle?: string;
  meta?: string;
  metaHighlight?: string;
}

export interface SpeakerIntroSlideData extends BaseSlide {
  type: 'speaker-intro';
  name: string;
  bio: string;
  photo?: string;
  photoPlaceholder?: string;
  stats?: Array<{ label: string; value: string }>;
}

export interface DayMapDay {
  num: string;
  title: string;
  subtitle: string;
}

export interface DayMapSlideData extends BaseSlide {
  type: 'day-map';
  title: string;
  activeDay: number;
  days: DayMapDay[];
}

export interface EcosystemItem {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

export interface EcosystemGridSlideData extends BaseSlide {
  type: 'ecosystem-grid';
  title: string;
  items: EcosystemItem[];
}

export interface ComparisonColumn {
  label: string;
  title: string;
  points: string[];
  highlight?: boolean;
}

export interface ComparisonSlideData extends BaseSlide {
  type: 'comparison';
  title: string;
  columns: ComparisonColumn[];
}

export interface BeforeAfterSide {
  label: string;
  rows: string[];
}

export interface BeforeAfterSlideData extends BaseSlide {
  type: 'before-after';
  title: string;
  before: BeforeAfterSide;
  after: BeforeAfterSide;
}

export interface DecisionRow {
  want: string;
  use: string;
  badge?: string;
  why: string;
}

export interface DecisionTableSlideData extends BaseSlide {
  type: 'decision-table';
  title: string;
  lead?: string;
  rows: DecisionRow[];
}

export interface StepItem {
  num?: string | number;
  title: string;
  description: string;
}

export interface StepListSlideData extends BaseSlide {
  type: 'step-list';
  title: string;
  steps: StepItem[];
}

export interface PrincipleItem {
  num?: string | number;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface PrincipleListSlideData extends BaseSlide {
  type: 'principle-list';
  title: string;
  lead?: string;
  items: PrincipleItem[];
}

export interface CodeCardSlideData extends BaseSlide {
  type: 'code-card';
  title: string;
  filename?: string;
  code: string;
  previewLabel?: string;
}

export interface DataTableSlideData extends BaseSlide {
  type: 'data-table';
  title: string;
  lead?: string;
  columns: string[];
  rows: string[][];
}

export interface WorkflowNode {
  icon: string;
  title: string;
  detail?: string;
  highlight?: boolean;
}

export interface WorkflowFlowSlideData extends BaseSlide {
  type: 'workflow-flow';
  title: string;
  nodes: WorkflowNode[];
}

export interface AgentBox {
  badge: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface AgentBoxesSlideData extends BaseSlide {
  type: 'agent-boxes';
  title: string;
  boxes: AgentBox[];
}

export interface QuoteStatSlideData extends BaseSlide {
  type: 'quote-stat';
  value: number;
  suffix?: string;
  label: string;
  context?: string;
}

export interface DeliverableItem {
  title: string;
  description?: string;
}

export interface DeliverableChecklistSlideData extends BaseSlide {
  type: 'deliverable-checklist';
  title: string;
  items: Array<{ title: string; description?: string } | string>;
}

export type Slide =
  | CoverSlideData
  | SpeakerIntroSlideData
  | DayMapSlideData
  | EcosystemGridSlideData
  | ComparisonSlideData
  | BeforeAfterSlideData
  | DecisionTableSlideData
  | StepListSlideData
  | PrincipleListSlideData
  | CodeCardSlideData
  | DataTableSlideData
  | WorkflowFlowSlideData
  | AgentBoxesSlideData
  | QuoteStatSlideData
  | DeliverableChecklistSlideData
  | (BaseSlide & Record<string, any>);

export interface Day {
  day: number;
  title: string;
  subtitle?: string;
  date: string;
  objective?: string;
  deliverables?: string[];
  chapters?: Array<{ title: string; slideIndex?: number } | any>;
  slides: Slide[];
  [key: string]: any;
}
