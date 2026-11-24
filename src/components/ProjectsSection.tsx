import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Cpu, Github, Layers, Terminal } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { SectionHeading } from './SectionHeading';

/** Configuración visual de estado con punto de pulso luminoso */
const statusConfig: Record<
  string,
  { badge: string; dot: string; ping: string; domain: string }
> = {
  'En desarrollo': {
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-500',
    domain: 'I+D ACTIVO // LAB',
  },
  Tesis: {
    badge: 'border-sky-500/30 bg-sky-500/10 text-sky-700',
    dot: 'bg-sky-500',
    ping: 'bg-sky-500',
    domain: 'INVESTIGACIÓN DE GRADO',
  },
  Hackaton: {
    badge: 'border-orange-500/30 bg-orange-500/15 text-orange-700',
    dot: 'bg-orange-500',
    ping: 'bg-orange-500',
    domain: 'COMPETICIÓN & PROTOTIPADO',
  },
  Actividad: {
    badge: 'border-amber-500/30 bg-amber-500/10 text-amber-700',
    dot: 'bg-amber-500',
    ping: 'bg-amber-500',
    domain: 'FORMACIÓN & ALGORITMIA',
  },
  Taller: {
    badge: 'border-purple-500/30 bg-purple-500/10 text-purple-700',
    dot: 'bg-purple-500',
    ping: 'bg-purple-500',
    domain: 'DIVULGACIÓN & TALLER',
  },
  'Verano científico': {
    badge: 'border-teal-500/30 bg-teal-500/10 text-teal-700',
    dot: 'bg-teal-500',
    ping: 'bg-teal-500',
    domain: 'ESTANCIA DE INVESTIGACIÓN',
  },
  Completado: {
    badge: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700',
    dot: 'bg-emerald-500',
    ping: 'bg-emerald-500',
    domain: 'PRODUCCIÓN // DEPLOY',
  },
  Investigación: {
    badge: 'border-sky-500/30 bg-sky-500/10 text-sky-700',
    dot: 'bg-sky-500',
    ping: 'bg-sky-500',
    domain: 'INVESTIGACIÓN CIENTÍFICA',
  },
};

const defaultStatus = {
  badge: 'border-orange-500/25 bg-orange-500/10 text-orange-700',
  dot: 'bg-orange-500',
  ping: 'bg-orange-500',
  domain: 'PROYECTO PADIA',
};

export const ProjectsSection = () => {
  const { projects } = useAdmin();
  const visibleProjects = useMemo(
    () => projects.filter((p) => p.title.trim()),
    [projects],
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Categorías dinámicas con conteo
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    visibleProjects.forEach((p) => {
      const st = p.status?.trim();
      if (!st) return;
      counts.set(st, (counts.get(st) ?? 0) + 1);
    });
    return [
      { label: 'Todos', count: visibleProjects.length },
      ...Array.from(counts.entries()).map(([label, count]) => ({ label, count })),
    ];
  }, [visibleProjects]);

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'Todos') return visibleProjects;
    return visibleProjects.filter(
      (p) => p.status?.trim() === selectedCategory,
    );
  }, [visibleProjects, selectedCategory]);

  // Proyecto activo (si el seleccionado no está en el filtro actual, toma el primero de la lista filtrada)
  const activeIndex = useMemo(() => {
    if (filteredProjects.length === 0) return -1;
    const foundIdx = filteredProjects.findIndex((p) => p.id === selectedId);
    return foundIdx >= 0 ? foundIdx : 0;
  }, [filteredProjects, selectedId]);

  const activeProject = activeIndex >= 0 ? filteredProjects[activeIndex] : null;

  const handleStep = (delta: number) => {
    if (filteredProjects.length === 0) return;
    const nextIdx =
      (activeIndex + delta + filteredProjects.length) % filteredProjects.length;
    setSelectedId(filteredProjects[nextIdx].id);
  };

  return (
    <section id="projects" className="scroll-mt-24 py-12 sm:py-16">
      <div className="page-container">
        <SectionHeading
          eyebrow="Nuestro trabajo"
          titleLight="Proyectos"
          titleHighlight="Destacados"
          description="Exploramos, creamos e innovamos a través de proyectos que aplican programación, analítica de datos e inteligencia artificial."
        />

        {visibleProjects.length === 0 ? (
          <p className="text-center text-slate-500">No hay proyectos destacados.</p>
        ) : (
          <>
            {/* ── Barra Superior de Filtros por Categoría + Contador ── */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-slate-900/10 pb-4">
              <div
                role="tablist"
                aria-label="Filtrar proyectos por categoría"
                className="flex flex-wrap items-center gap-2"
              >
                {categories.map(({ label, count }) => {
                  const isSelected = selectedCategory === label;
                  return (
                    <button
                      key={label}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      onClick={() => {
                        setSelectedCategory(label);
                        setSelectedId(null);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-all duration-200 ${
                        isSelected
                          ? 'border-padia-orange bg-padia-orange text-white shadow-[0_4px_14px_rgba(255,107,0,0.35)]'
                          : 'border-slate-300/80 bg-white/60 text-slate-600 hover:border-orange-500/40 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      <span>{label}</span>
                      <span
                        className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-900/[0.06] text-slate-500'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="hidden items-center gap-2 font-mono text-xs text-slate-500 sm:flex">
                <Terminal aria-hidden="true" className="h-3.5 w-3.5 text-padia-orange" />
                <span>
                  MOSTRANDO {String(activeIndex + 1).padStart(2, '0')} /{' '}
                  {String(filteredProjects.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            {/* ── Explorador Master-Detail: Índice a la izquierda (5 col) + Visor Técnico a la derecha (7 col) ── */}
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12 lg:gap-10">
              {/* Columna Izquierda (5 col): Índice Arquitectónico de Proyectos sobre #F3F3F1 */}
              <div className="flex flex-col justify-between lg:col-span-5">
                <ul
                  aria-label="Índice de proyectos"
                  className="max-h-[460px] divide-y divide-slate-900/10 overflow-y-auto border-y border-slate-900/12 pr-1"
                >
                  {filteredProjects.map((project, idx) => {
                    const isActive = activeProject?.id === project.id;
                    const st = statusConfig[project.status] ?? defaultStatus;
                    const projectUrl = project.moreLink?.trim() || project.githubLink?.trim();

                    return (
                      <li key={project.id}>
                        <div
                          role="button"
                          tabIndex={0}
                          onMouseEnter={() => setSelectedId(project.id)}
                          onFocus={() => setSelectedId(project.id)}
                          onClick={() => setSelectedId(project.id)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setSelectedId(project.id);
                            }
                          }}
                          aria-current={isActive ? 'true' : undefined}
                          className={`group relative flex w-full cursor-pointer items-center justify-between gap-3 py-3 pl-4 pr-2.5 text-left transition-all duration-200 ${
                            isActive
                              ? 'bg-gradient-to-r from-orange-500/[0.11] via-orange-500/[0.03] to-transparent'
                              : 'hover:bg-white/50'
                          }`}
                        >
                          {/* Indicador lateral naranja activo */}
                          <span
                            aria-hidden="true"
                            className={`absolute inset-y-0 left-0 w-[3px] transition-all duration-200 ${
                              isActive
                                ? 'bg-padia-orange'
                                : 'bg-transparent group-hover:bg-orange-500/30'
                            }`}
                          />

                          <div className="flex min-w-0 items-baseline gap-3.5">
                            <span
                              className={`font-mono text-xs font-bold transition-colors ${
                                isActive
                                  ? 'text-padia-orange'
                                  : 'text-slate-400 group-hover:text-slate-600'
                              }`}
                            >
                              {String(idx + 1).padStart(2, '0')}
                            </span>
                            <span
                              className={`truncate text-base font-bold tracking-tight transition-colors sm:text-lg ${
                                isActive
                                  ? 'text-slate-950'
                                  : 'text-slate-700 group-hover:text-slate-900'
                              }`}
                            >
                              {project.title}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {project.status && (
                              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] font-medium uppercase tracking-wider text-slate-500">
                                <span
                                  aria-hidden="true"
                                  className={`h-1.5 w-1.5 rounded-full ${st.dot}`}
                                />
                                <span className="hidden sm:inline">{project.status}</span>
                              </span>
                            )}
                            {projectUrl ? (
                              <a
                                href={projectUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                aria-label={`Abrir proyecto ${project.title}`}
                                title={`Ir a ${project.title}`}
                                className={`inline-flex h-7 w-7 items-center justify-center rounded-full transition-all duration-200 ${
                                  isActive
                                    ? 'text-padia-orange hover:bg-padia-orange hover:text-white'
                                    : 'text-slate-400 hover:bg-orange-500/15 hover:text-padia-orange group-hover:text-slate-600'
                                }`}
                              >
                                <ArrowRight className="h-4 w-4 transition-transform duration-200 hover:translate-x-0.5" />
                              </a>
                            ) : (
                              <span className="inline-flex h-7 w-7 items-center justify-center">
                                <ArrowRight
                                  aria-hidden="true"
                                  className={`h-4 w-4 transition-all duration-200 ${
                                    isActive
                                      ? 'translate-x-0.5 text-padia-orange'
                                      : 'text-slate-300 group-hover:text-slate-500'
                                  }`}
                                />
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                {/* Pie de índice con controles de navegación secuencial */}
                <div className="mt-4 flex items-center justify-between pt-1">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-slate-500">
                    Selecciona o recorre el catálogo
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => handleStep(-1)}
                      aria-label="Proyecto anterior"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300/80 bg-white/80 text-slate-700 transition-colors hover:border-padia-orange hover:text-padia-orange"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStep(1)}
                      aria-label="Siguiente proyecto"
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300/80 bg-white/80 text-slate-700 transition-colors hover:border-padia-orange hover:text-padia-orange"
                    >
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Columna Derecha (7 col): Visor Técnico Ampliado del Proyecto Activo */}
              {activeProject && (
                <article
                  aria-live="polite"
                  className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-300/80 bg-white/90 p-7 shadow-[0_18px_45px_-15px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-9 xl:p-10 lg:col-span-7"
                >
                  {/* Filo superior iluminado en naranja PADIA */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-padia-orange via-amber-500 to-transparent"
                  />

                  {/* Marca de agua tipográfica con el número de expediente */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 right-6 select-none font-mono text-[8rem] font-extrabold leading-none tracking-tighter text-slate-900/[0.035] sm:text-[10rem]"
                  >
                    {String(activeIndex + 1).padStart(2, '0')}
                  </span>

                  {/* Cabecera técnica del expediente */}
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-900/10 pb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10 font-mono text-xs font-bold text-padia-orange">
                          //{String(activeIndex + 1).padStart(2, '0')}
                        </span>
                        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                          {(statusConfig[activeProject.status] ?? defaultStatus).domain}
                        </span>
                      </div>

                      {activeProject.status && (
                        <span
                          className={`inline-flex items-center gap-2 rounded-md border px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wider ${
                            (statusConfig[activeProject.status] ?? defaultStatus).badge
                          }`}
                        >
                          <span aria-hidden="true" className="relative flex h-2 w-2">
                            <span
                              className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${
                                (statusConfig[activeProject.status] ?? defaultStatus).ping
                              }`}
                            />
                            <span
                              className={`relative inline-flex h-2 w-2 rounded-full ${
                                (statusConfig[activeProject.status] ?? defaultStatus).dot
                              }`}
                            />
                          </span>
                          {activeProject.status}
                        </span>
                      )}
                    </div>

                    {/* Título monumental y descripción del proyecto */}
                    <h3 className="mt-6 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl xl:text-5xl">
                      {activeProject.title}
                    </h3>

                    {activeProject.description && (
                      <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg xl:text-xl">
                        {activeProject.description}
                      </p>
                    )}
                  </div>

                  {/* Diagrama visual del Pipeline / Stack Tecnológico del Proyecto */}
                  <div className="relative my-8 rounded-2xl border border-slate-200/90 bg-[#F3F3F1]/75 p-5">
                    <div className="mb-3.5 flex items-center justify-between">
                      <span className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-600">
                        <Layers aria-hidden="true" className="h-3.5 w-3.5 text-padia-orange" />
                        Arquitectura & Stack Tecnológico
                      </span>
                      <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-orange-600">
                        {activeProject.technologies.length} MÓDULOS
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Nodo inicial de entrada */}
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white/80 px-2.5 py-1.5 font-mono text-[11px] font-medium text-slate-500">
                        <Cpu aria-hidden="true" className="h-3 w-3 text-padia-orange" />
                        INPUT
                      </span>

                      {activeProject.technologies.map((tech, tIdx) => (
                        <div key={tech} className="flex items-center gap-2">
                          <span
                            aria-hidden="true"
                            className="h-px w-3 bg-gradient-to-r from-slate-300 to-orange-500/60 sm:w-5"
                          />
                          <span className="inline-flex items-center gap-2 rounded-lg border border-orange-500/30 bg-white px-3.5 py-1.5 font-mono text-xs font-semibold text-slate-900 shadow-sm">
                            <span className="font-mono text-[10px] font-bold text-padia-orange">
                              0{tIdx + 1}
                            </span>
                            {tech}
                          </span>
                        </div>
                      ))}

                      <span
                        aria-hidden="true"
                        className="h-px w-3 bg-gradient-to-r from-orange-500/60 to-emerald-500/60 sm:w-5"
                      />
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1.5 font-mono text-[11px] font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        OUTPUT
                      </span>
                    </div>
                  </div>

                  {/* Barra inferior de enlaces y acciones del proyecto */}
                  <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-slate-900/10 pt-5">
                    <div className="flex flex-wrap items-center gap-3">
                      {(activeProject.moreLink || activeProject.githubLink) ? (
                        <>
                          {activeProject.moreLink && (
                            <a
                              href={activeProject.moreLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="group inline-flex items-center gap-2 rounded-full bg-padia-orange px-6 py-2.5 text-sm font-semibold text-white shadow-[0_6px_20px_-4px_rgba(255,107,0,0.5)] transition-all duration-200 hover:bg-[#ff7a1a]"
                            >
                              Explorar Proyecto
                              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                            </a>
                          )}
                          {activeProject.githubLink && (
                            <a
                              href={activeProject.githubLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors ${
                                activeProject.moreLink
                                  ? 'border-slate-300 bg-white text-slate-800 hover:border-orange-500/40 hover:text-slate-950'
                                  : 'border-padia-orange bg-padia-orange text-white shadow-[0_6px_20px_-4px_rgba(255,107,0,0.5)] hover:bg-[#ff7a1a]'
                              }`}
                            >
                              <Github className="h-4 w-4" />
                              Repositorio
                            </a>
                          )}
                        </>
                      ) : (
                        <span className="font-mono text-xs text-slate-500">
                          PROYECTO INTERNO DE LABORATORIO · SEMILLERO PADIA
                        </span>
                      )}
                    </div>

                    <span className="font-mono text-xs font-medium text-slate-400">
                      USB CALI · LIDIS
                    </span>
                  </div>
                </article>
              )}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
