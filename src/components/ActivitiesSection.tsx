import { useState } from 'react';
import { ArrowUpRight, Camera, ChevronLeft, ChevronRight, HeartHandshake, Rocket, Trophy, Users } from 'lucide-react';
import { resolveAssetUrl } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { CardPattern } from './Illustrations';

export interface ActivityPhoto {
  src: string;
  caption: string;
}

export interface ActivityItem {
  id: string;
  code: string;
  title: string;
  Icon: typeof Trophy;
  description: string;
  tags: string[];
  metric: string;
  photos: ActivityPhoto[];
}

const activities: ActivityItem[] = [
  {
    id: '01',
    code: 'EJE.01 // COMPETICIÓN',
    title: 'Competencias',
    Icon: Trophy,
    description:
      'Participamos en hackathons, datathons y competencias de programación a nivel nacional e internacional.',
    tags: ['Hackathons', 'Datathons', 'Algoritmia & ICPC'],
    metric: 'Nacional & Internacional',
    photos: [
      {
        src: '/activities/competencias-smartcity.jpg',
        caption: '1.º LUGAR // HACKATON SMARTCITY EXPO CALI',
      },
    ],
  },
  {
    id: '02',
    code: 'EJE.02 // DIVULGACIÓN',
    title: 'Congresos',
    Icon: Users,
    description:
      'Asistimos y presentamos en congresos académicos de tecnología, IA y ciencia de datos.',
    tags: ['Ponencias', 'Encuentros de Semilleros', 'Artículos & Pósters'],
    metric: 'Producción Académica',
    photos: [
      {
        src: '/activities/congresos.jpg',
        caption: 'CONGRESOS // IEEE COMPUTER SOCIETY',
      },
    ],
  },
  {
    id: '03',
    code: 'EJE.03 // I+D APLICADO',
    title: 'Proyectos Innovadores',
    Icon: Rocket,
    description:
      'Desarrollamos soluciones tecnológicas que impactan positivamente en la comunidad.',
    tags: ['Visión por Computador', 'NLP & LLMs', 'Analítica Predictiva'],
    metric: 'Prototipos Reales',
    photos: [
      {
        src: '/activities/proyectos.jpg',
        caption: 'PROYECTOS // SENTINELAS · IA & DATOS',
      },
    ],
  },
  {
    id: '04',
    code: 'EJE.04 // MENTORÍA',
    title: 'Red de Apoyo',
    Icon: HeartHandshake,
    description:
      'Construimos una comunidad de estudiantes que se apoyan mutuamente en su crecimiento profesional.',
    tags: ['Células de Estudio', 'Mentoría entre Pares', 'Seminarios Técnicos'],
    metric: 'Aprendizaje Colaborativo',
    photos: [
      {
        src: '/activities/red-apoyo.jpg',
        caption: 'COMUNIDAD // RED DE APOYO PADIA',
      },
    ],
  },
];

export const ActivitiesSection = () => {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [photoIdxByActivity, setPhotoIdxByActivity] = useState<Record<string, number>>({});

  const stepPhoto = (activityId: string, total: number, delta: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotoIdxByActivity((prev) => {
      const current = prev[activityId] ?? 0;
      return {
        ...prev,
        [activityId]: (current + delta + total) % total,
      };
    });
  };

  return (
    <section id="activities" className="scroll-mt-24 py-12 sm:py-16">
      <div className="page-container">
        <SectionHeading
          eyebrow="Nuestras actividades"
          titleLight="¿Qué"
          titleHighlight="hacemos?"
          description="Nos dedicamos a formar profesionales integrales a través de diversas actividades académicas y tecnológicas."
        />

        {/* ── Acordeón Horizontal Cinético con Ventana Fotográfica Editorial en el Panel Activo ── */}
        <ul
          aria-label="Actividades del semillero PADIA"
          className="flex flex-col divide-y divide-slate-900/12 border-y border-slate-900/12 lg:h-[400px] lg:flex-row lg:divide-x lg:divide-y-0 xl:h-[420px]"
        >
          {activities.map(({ id, code, title, Icon, description, tags, metric, photos }, idx) => {
            const isActive = activeIdx === idx;
            const currentPhotoIdx = (photoIdxByActivity[id] ?? 0) % Math.max(photos.length, 1);
            const activePhoto = photos[currentPhotoIdx];

            return (
              <li
                key={title}
                onMouseEnter={() => setActiveIdx(idx)}
                onFocus={() => setActiveIdx(idx)}
                onClick={() => setActiveIdx(idx)}
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
                }}
                className={`group relative cursor-pointer overflow-hidden transition-[flex,background-color] duration-500 ${
                  isActive
                    ? 'bg-gradient-to-br from-white/95 via-white/85 to-orange-500/[0.07] lg:flex-[3.2]'
                    : 'bg-transparent hover:bg-white/40 lg:flex-1'
                }`}
              >
                {/* Barra superior iluminada en el panel expandido */}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-padia-orange via-amber-500 to-transparent transition-opacity duration-300 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Ilustración vectorial de fondo */}
                <CardPattern
                  variant={idx}
                  className={`pointer-events-none absolute inset-0 h-full w-full transition-all duration-500 ${
                    isActive ? 'scale-100 opacity-20' : 'scale-110 opacity-[0.08]'
                  }`}
                />

                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isActive}
                  onClick={() => setActiveIdx(idx)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIdx(idx);
                    }
                  }}
                  className="relative z-10 flex h-full w-full flex-col justify-between p-6 text-left focus:outline-none sm:p-7 xl:p-8"
                >
                  <div
                    className={`flex h-full w-full flex-col justify-between gap-6 ${
                      isActive ? 'md:flex-row md:items-stretch md:gap-7' : ''
                    }`}
                  >
                    {/* ── Lado Izquierdo del Panel: Numeración, Título, Descripción y Tags ── */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between">
                      <div className="flex w-full items-start justify-between gap-3">
                        <div className="flex items-baseline gap-3">
                          <span
                            className={`font-mono font-extrabold leading-none tracking-tighter transition-all duration-300 ${
                              isActive
                                ? 'text-4xl text-padia-orange sm:text-5xl'
                                : 'text-2xl text-slate-400 group-hover:text-slate-600'
                            }`}
                          >
                            {id}
                          </span>
                          <span
                            className={`font-mono text-[10px] font-semibold uppercase tracking-widest transition-opacity duration-300 ${
                              isActive
                                ? 'text-slate-500 opacity-100'
                                : 'hidden opacity-0'
                            }`}
                          >
                            {code}
                          </span>
                        </div>

                        <span
                          className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-300 ${
                            isActive
                              ? 'border-padia-orange bg-padia-orange text-white shadow-[0_8px_22px_-4px_rgba(255,107,0,0.5)] md:hidden'
                              : 'border-slate-300/90 bg-white/70 text-slate-600 group-hover:border-orange-500/40 group-hover:text-padia-orange'
                          }`}
                        >
                          <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.8} />
                        </span>
                      </div>

                      <div className="mt-6 lg:mt-auto">
                        {isActive && (
                          <div className="mb-2 flex items-center gap-2">
                            <span className="h-1.5 w-1.5 rounded-full bg-padia-orange" />
                            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-orange-600">
                              {metric}
                            </span>
                          </div>
                        )}

                        <div className="flex items-end justify-between gap-3">
                          <h3
                            className={`font-extrabold tracking-tight transition-all duration-300 ${
                              isActive
                                ? 'text-2xl text-slate-950 sm:text-3xl xl:text-4xl'
                                : 'text-lg text-slate-800 group-hover:text-slate-950 xl:text-xl'
                            }`}
                          >
                            {title}
                          </h3>

                          {!isActive && (
                            <span
                              aria-hidden="true"
                              className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300/80 text-slate-400 transition-colors group-hover:border-padia-orange/50 group-hover:text-padia-orange"
                            >
                              <ArrowUpRight className="h-3.5 w-3.5" />
                            </span>
                          )}
                        </div>

                        {isActive && (
                          <div className="mt-3">
                            <p className="max-w-md text-sm leading-relaxed text-slate-600 sm:text-base">
                              {description}
                            </p>

                            <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-900/10 pt-4">
                              {tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="rounded-md border border-orange-500/25 bg-orange-500/10 px-2.5 py-1 font-mono text-[11px] font-medium text-orange-700"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── Lado Derecho del Panel Expandido: Ventana Fotográfica Editorial ── */}
                    {isActive && (
                      <div className="relative flex w-full shrink-0 flex-col justify-between overflow-hidden rounded-2xl border border-slate-300/80 bg-[#F3F3F1] md:w-[44%] xl:w-[46%]">
                        {/* Esquinas técnicas de mirilla (viewfinder brackets) */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute left-2.5 top-2.5 z-20 h-3 w-3 border-l-2 border-t-2 border-padia-orange"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute right-2.5 top-2.5 z-20 h-3 w-3 border-r-2 border-t-2 border-padia-orange"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-2.5 left-2.5 z-20 h-3 w-3 border-b-2 border-l-2 border-padia-orange"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute bottom-2.5 right-2.5 z-20 h-3 w-3 border-b-2 border-r-2 border-padia-orange"
                        />

                        {activePhoto ? (
                          <div className="relative h-52 w-full overflow-hidden md:h-full">
                            <img
                              key={activePhoto.src}
                              src={resolveAssetUrl(activePhoto.src)}
                              alt={`${title} - ${activePhoto.caption}`}
                              className="h-full w-full object-cover object-center contrast-[1.03] saturate-[0.9] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                            />
                            {/* Velo cálido editorial y etiqueta inferior */}
                            <div
                              aria-hidden="true"
                              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-orange-500/[0.06]"
                            />

                            {/* Controles de galería si la actividad tiene múltiples fotos */}
                            {photos.length > 1 && (
                              <div className="absolute right-3.5 top-3 z-20 flex items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={(e) => stepPhoto(id, photos.length, -1, e)}
                                  aria-label="Foto anterior"
                                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/65 text-white backdrop-blur-md transition-colors hover:bg-padia-orange"
                                >
                                  <ChevronLeft className="h-3.5 w-3.5" />
                                </button>
                                <span className="rounded-full bg-slate-950/65 px-2 py-0.5 font-mono text-[10px] font-semibold text-white backdrop-blur-md">
                                  {currentPhotoIdx + 1}/{photos.length}
                                </span>
                                <button
                                  type="button"
                                  onClick={(e) => stepPhoto(id, photos.length, 1, e)}
                                  aria-label="Siguiente foto"
                                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-slate-950/65 text-white backdrop-blur-md transition-colors hover:bg-padia-orange"
                                >
                                  <ChevronRight className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            )}

                            <div className="absolute inset-x-3.5 bottom-3 z-10 flex items-center justify-between gap-2">
                              <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-white/95">
                                {activePhoto.caption}
                              </span>
                              <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-padia-orange text-white shadow-sm">
                                <Icon aria-hidden="true" className="h-3.5 w-3.5" />
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative flex h-44 w-full flex-col items-center justify-center gap-2 p-6 text-center md:h-full">
                            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/30 bg-orange-500/10 text-padia-orange">
                              <Camera aria-hidden="true" className="h-5 w-5" strokeWidth={1.7} />
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
