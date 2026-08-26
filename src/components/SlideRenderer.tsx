import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Slide } from '../types';
import { CoverSlide } from './slides/CoverSlide';
import { SpeakerIntroSlide } from './slides/SpeakerIntroSlide';
import { DayMapSlide } from './slides/DayMapSlide';
import { EcosystemGridSlide } from './slides/EcosystemGridSlide';
import { ComparisonSlide } from './slides/ComparisonSlide';
import { BeforeAfterSlide } from './slides/BeforeAfterSlide';
import { DecisionTableSlide } from './slides/DecisionTableSlide';
import { StepListSlide } from './slides/StepListSlide';
import { PrincipleListSlide } from './slides/PrincipleListSlide';
import { CodeCardSlide } from './slides/CodeCardSlide';
import { DataTableSlide } from './slides/DataTableSlide';
import { WorkflowFlowSlide } from './slides/WorkflowFlowSlide';
import { AgentBoxesSlide } from './slides/AgentBoxesSlide';
import { QuoteStatSlide } from './slides/QuoteStatSlide';
import { DeliverableChecklistSlide } from './slides/DeliverableChecklistSlide';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface SlideRendererProps {
  slide: Slide;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  slideId: string;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class SlideErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public override state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Slide Render Error in slide', this.props.slideId, error, errorInfo);
  }

  public override componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (prevProps.slideId !== this.props.slideId && this.state.hasError) {
      this.setState({ hasError: false, error: undefined });
    }
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-8 bg-[#0d0d0f] text-white">
          <div className="flex max-w-md flex-col items-center text-center rounded-[12px] border border-orange-500/30 bg-[#161210] p-6 shadow-xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/20 text-orange-400 mb-3">
              <AlertTriangle className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Slide : {this.props.slideId}</h2>
            <p className="mt-2 text-xs text-neutral-400">
              {this.state.error?.message || "Une erreur est survenue lors de l'affichage de cette slide."}
            </p>
            <button
              onClick={() => this.setState({ hasError: false })}
              className="mt-4 flex items-center gap-2 rounded-[8px] bg-orange-500 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-orange-600 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Réessayer</span>
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export const SlideRenderer: React.FC<SlideRendererProps> = ({ slide }) => {
  const renderContent = () => {
    switch (slide.type) {
      case 'cover':
        return <CoverSlide slide={slide as any} />;
      case 'speaker-intro':
        return <SpeakerIntroSlide slide={slide as any} />;
      case 'day-map':
        return <DayMapSlide slide={slide as any} />;
      case 'ecosystem-grid':
        return <EcosystemGridSlide slide={slide as any} />;
      case 'comparison':
        return <ComparisonSlide slide={slide as any} />;
      case 'before-after':
        return <BeforeAfterSlide slide={slide as any} />;
      case 'decision-table':
        return <DecisionTableSlide slide={slide as any} />;
      case 'step-list':
        return <StepListSlide slide={slide as any} />;
      case 'principle-list':
        return <PrincipleListSlide slide={slide as any} />;
      case 'code-card':
        return <CodeCardSlide slide={slide as any} />;
      case 'data-table':
        return <DataTableSlide slide={slide as any} />;
      case 'workflow-flow':
        return <WorkflowFlowSlide slide={slide as any} />;
      case 'agent-boxes':
        return <AgentBoxesSlide slide={slide as any} />;
      case 'quote-stat':
        return <QuoteStatSlide slide={slide as any} />;
      case 'deliverable-checklist':
        return <DeliverableChecklistSlide slide={slide as any} />;
      default:
        return (
          <div className="flex h-full w-full items-center justify-center p-8 bg-[#0d0d0f] text-white">
            <div className="text-center max-w-md">
              <h2 className="text-xl font-bold">{slide.id || 'Slide'}</h2>
              <p className="mt-2 text-sm text-neutral-400">Type : {slide.type}</p>
            </div>
          </div>
        );
    }
  };

  return (
    <SlideErrorBoundary slideId={slide?.id || 'unknown'}>
      {renderContent()}
    </SlideErrorBoundary>
  );
};
