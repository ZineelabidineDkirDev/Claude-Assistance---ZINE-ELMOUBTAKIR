import React from 'react';
import { RESOURCES_DATA } from '../data/resourcesData';
import { ArrowLeft, ExternalLink, FolderOpen, ArrowRight } from 'lucide-react';
import { ZaynLogo } from './ZaynLogo';

interface ResourcesPageProps {
  onNavigateHome: () => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigateHome }) => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
      {/* Top Gradient Hero */}
      <div className="border-b border-white/10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900 via-[#0a0a0a] to-[#050505] px-6 py-16 sm:px-16 text-white">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={onNavigateHome}
            className="group mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-[11.5px] font-semibold text-neutral-300 transition-all hover:border-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Plan des 5 jours</span>
          </button>

          <div className="flex items-center gap-2.5 font-mono text-[12.5px] font-medium uppercase tracking-[0.14em] text-orange-400">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#18181b] border border-orange-500/30 p-0.5 shadow-[0_0_8px_rgba(249,115,22,0.4)]">
              <ZaynLogo className="h-full w-full" color="#F97316" />
            </div>
            <span>Zayn4Data · Zine El Abidine Dkir</span>
          </div>

          <h1 className="mt-4 font-display text-[clamp(28px,5vw,44px)] font-bold leading-tight text-white tracking-tight">
            Ressources gratuites & datasets ouverts
          </h1>

          <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-neutral-400">
            Des ressources gratuites et vérifiées — pas de compte requis. Chaque lien pointe vers la source officielle ; la licence indiquée doit être revérifiée sur la page d'origine avant tout usage commercial ou redistribution.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-3xl px-6 py-10 sm:px-16">
        {/* Highlighted Drive Link Card */}
        <a
          href={RESOURCES_DATA.driveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 rounded-[14px] border border-orange-500/40 bg-gradient-to-br from-neutral-900 to-[#1c130c] p-6 transition-all hover:border-orange-500 hover:shadow-[0_8px_28px_-8px_rgba(249,115,22,0.25)]"
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-orange-500 text-white shadow-[0_0_12px_rgba(249,115,22,0.4)]">
              <FolderOpen className="h-5 w-5" />
            </div>

            <div>
              <p className="font-mono text-[10.5px] font-bold uppercase tracking-wide text-orange-400">
                {RESOURCES_DATA.driveBadge}
              </p>
              <h2 className="mt-0.5 text-[16px] font-bold text-white">
                {RESOURCES_DATA.driveTitle}
              </h2>
              <p className="mt-1 text-[13px] leading-relaxed text-neutral-400">
                {RESOURCES_DATA.driveDescription}
              </p>
            </div>
          </div>

          <div className="flex flex-none items-center gap-1.5 rounded-full bg-orange-500 px-4 py-2 text-[12.5px] font-bold text-white transition-colors hover:bg-orange-400 mt-3 sm:mt-0 shadow-sm">
            <span>Cliquer ici</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </a>

        {/* Resource Categories */}
        <div className="space-y-9">
          {RESOURCES_DATA.categories.map((category, catIdx) => (
            <div key={catIdx} className="mb-9">
              <h2 className="mb-3.5 text-[15px] font-bold text-white">
                {category.name}
              </h2>

              <div className="flex flex-col gap-3">
                {category.items.map((item, itemIdx) => (
                  <a
                    key={itemIdx}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-[12px] border border-white/10 bg-[#121212] p-5 transition-all hover:border-orange-500/50 hover:bg-[#181818] hover:shadow-[0_4px_20px_-4px_rgba(249,115,22,0.15)]"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-[14.5px] font-bold text-white group-hover:text-orange-400 transition-colors">
                        {item.title}
                      </h3>
                      <ExternalLink className="h-4 w-4 flex-none text-neutral-400 transition-colors group-hover:text-orange-400" />
                    </div>

                    <p className="mt-1.5 text-[13px] leading-relaxed text-neutral-400">
                      {item.description}
                    </p>

                    <p className="mt-2.5 font-mono text-[10.5px] uppercase tracking-wide text-orange-400/80">
                      {item.license}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="mt-12 border-t border-white/10 pt-6">
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-1.5 font-mono text-[12px] font-medium text-orange-400 hover:text-orange-300 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Retour au plan des 5 jours</span>
          </button>
        </div>
      </div>
    </div>
  );
};
