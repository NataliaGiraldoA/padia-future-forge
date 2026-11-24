import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  titleLight?: string;
  titleHighlight: ReactNode;
  description?: string;
}

/**
 * Encabezado editorial compacto: conecta el titular y la descripción mediante
 * una línea arquitectónica continua para eliminar el vacío central en pantallas anchas.
 */
export const SectionHeading = ({
  eyebrow,
  titleLight,
  titleHighlight,
  description,
}: SectionHeadingProps) => (
  <div className="mb-8 lg:mb-10">
    {eyebrow && (
      <div className="mb-3">
        <span className="tech-badge">
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500" />
          {eyebrow}
        </span>
      </div>
    )}

    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8">
      <h2 className="shrink-0 text-3xl sm:text-4xl xl:text-5xl tracking-tight leading-[1.08]">
        {titleLight && (
          <span className="font-light text-slate-700 mr-2.5">{titleLight}</span>
        )}
        <span className="font-extrabold editorial-gradient-text">
          {titleHighlight}
        </span>
      </h2>

      {/* Línea estructural que une el título con la descripción sin dejar hueco muerto */}
      <span
        aria-hidden="true"
        className="hidden lg:block h-px flex-1 bg-gradient-to-r from-orange-500/40 via-slate-300 to-slate-200/40"
      />

      {description && (
        <p className="max-w-xl text-sm sm:text-base leading-relaxed text-slate-600 lg:shrink-0">
          {description}
        </p>
      )}
    </div>
  </div>
);
