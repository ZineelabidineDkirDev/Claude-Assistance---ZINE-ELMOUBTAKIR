import React from 'react';
import { DataTableSlideData } from '../../types';
import { SlideShell } from '../common/SlideShell';
import { EyebrowLabel } from '../common/EyebrowLabel';
import { Reveal } from '../common/Reveal';

interface DataTableSlideProps {
  slide: DataTableSlideData;
}

export const DataTableSlide: React.FC<DataTableSlideProps> = ({ slide }) => {
  const columns = slide.columns || [];
  const rawRows: any[] = slide.rows || [];

  return (
    <SlideShell tone="light">
      {slide.eyebrow && (
        <Reveal>
          <EyebrowLabel>{slide.eyebrow}</EyebrowLabel>
        </Reveal>
      )}

      <Reveal delay={0.08}>
        <h2 className="mt-3 font-display text-[26px] sm:text-[30px] font-bold text-white tracking-tight">
          {slide.title}
        </h2>
      </Reveal>

      {slide.lead && (
        <Reveal delay={0.14} className="mt-2 max-w-2xl text-[13.5px] leading-relaxed text-neutral-400">
          <p>{slide.lead}</p>
        </Reveal>
      )}

      <Reveal delay={0.2} className="mt-5 overflow-hidden rounded-[12px] border border-white/10 bg-[#141414] shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-[13px]">
            <thead>
              <tr className="border-b border-white/10 bg-[#1a1a1a]">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-3 font-mono text-[11px] font-bold uppercase tracking-wider text-orange-400 whitespace-nowrap"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rawRows.map((rowItem: any, rIdx: number) => {
                // Check if rowItem is { cells: string[], critical?: boolean } or an array
                const cells: string[] = Array.isArray(rowItem)
                  ? rowItem
                  : Array.isArray(rowItem?.cells)
                  ? rowItem.cells
                  : typeof rowItem === 'object' && rowItem !== null
                  ? Object.values(rowItem).filter(v => typeof v === 'string' || typeof v === 'number') as string[]
                  : [String(rowItem)];

                const isCritical = rowItem?.critical === true;

                return (
                  <tr
                    key={rIdx}
                    className={`transition-colors ${
                      isCritical
                        ? 'bg-red-950/20 hover:bg-red-950/30'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {cells.map((cell: any, cIdx: number) => {
                      const cellStr = typeof cell === 'object' ? JSON.stringify(cell) : String(cell ?? '');
                      return (
                        <td
                          key={cIdx}
                          className={`px-4 py-3 ${
                            isCritical
                              ? 'text-red-300 font-medium'
                              : cIdx === 0
                              ? 'font-medium text-neutral-200'
                              : 'text-neutral-400'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {isCritical && cIdx === 0 && (
                              <span className="inline-block h-2 w-2 rounded-full bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                            )}
                            <span>{cellStr}</span>
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
    </SlideShell>
  );
};
