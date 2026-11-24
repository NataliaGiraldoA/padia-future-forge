import { Linkedin } from 'lucide-react';
import { useAdmin, type Member } from '@/contexts/AdminContext';
import { getInitials, resolveAssetUrl } from '@/lib/site';
import { SectionHeading } from './SectionHeading';
import { SpotlightCard } from './SpotlightCard';

const LeaderCard = ({ member, index }: { member: Member; index: number }) => (
  <SpotlightCard
    as="li"
    className="surface group relative flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 sm:h-[224px] sm:flex-row sm:items-stretch"
  >
    {/* Borde superior iluminado con gradiente de naranja a transparente */}
    <div
      aria-hidden="true"
      className="absolute inset-x-0 top-0 z-20 h-[2.5px] bg-gradient-to-r from-orange-500 via-amber-400/60 to-transparent"
    />

    {/* ── Columna Izquierda: Marco de Retrato Cuadrado con Tamaño Fijo Idéntico en las 4 Tarjetas ── */}
    <div className="relative flex w-full shrink-0 items-center justify-center border-b border-slate-200/80 bg-[#ECEBE6]/75 p-4 sm:h-full sm:w-[210px] sm:border-b-0 sm:border-r">
      <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-xl border border-slate-200/90 bg-white shadow-[0_6px_18px_-6px_rgba(15,23,42,0.12)]">
        {member.photo ? (
          <img
            src={resolveAssetUrl(member.photo)}
            alt={member.name}
            className="block h-44 w-44 max-h-44 max-w-44 bg-white object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 bg-white p-4">
            <span className="inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-orange-500/30 bg-[#FFF4EE] font-display text-2xl font-extrabold tracking-tight text-slate-900 shadow-[0_10px_25px_-6px_rgba(255,107,0,0.28)]">
              {getInitials(member.name)}
            </span>
            <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-orange-600/80">
              LÍDER · 0{index + 1}
            </span>
          </div>
        )}
      </div>
    </div>

    {/* ── Columna Derecha: Cargo, Nombre, Breve Descripción y LinkedIn ── */}
    <div className="relative flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
      <div>
        <div className="flex items-center justify-between gap-3">
          <span className="tech-badge">{member.role}</span>

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`LinkedIn de ${member.name}`}
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-[#F3F3F1] text-slate-600 transition-all duration-200 hover:border-padia-orange hover:bg-padia-orange hover:text-white"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          )}
        </div>

        <h3 className="mt-2.5 truncate text-xl font-extrabold leading-snug tracking-tight text-slate-950 sm:text-2xl">
          {member.name}
        </h3>

        {member.description && (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">
            {member.description}
          </p>
        )}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-900/10 pt-2.5">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          DIRECCIÓN & LIDERAZGO · PADIA
        </span>
        <span className="font-mono text-[11px] font-bold text-padia-orange">
          // 0{index + 1}
        </span>
      </div>
    </div>
  </SpotlightCard>
);

const ResearcherRow = ({ member }: { member: Member }) => {
  const initials = getInitials(member.name);

  const content = (
    <>
      {/* Avatar circular compacto en la fila (44x44px) */}
      <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-slate-200/90 bg-[#F3F3F1] ring-2 ring-transparent transition-all duration-200 group-hover:border-padia-orange group-hover:ring-orange-500/25 group-hover:shadow-[0_0_16px_rgba(255,107,0,0.3)]">
        {member.photo ? (
          <img
            src={resolveAssetUrl(member.photo)}
            alt={member.name}
            className="h-full w-full bg-white object-cover object-top"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-mono text-xs font-bold text-slate-700 transition-colors duration-200 group-hover:bg-padia-orange group-hover:text-white"
          >
            {initials}
          </span>
        )}
      </span>

      <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-slate-800 transition-colors group-hover:text-slate-950">
        {member.name}
      </span>

      {member.linkedin && (
        <Linkedin
          aria-hidden="true"
          className="h-4 w-4 shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-padia-orange"
        />
      )}
    </>
  );

  const base =
    'flex items-center gap-3.5 rounded-xl border border-slate-200/80 bg-white/85 px-3.5 py-3 2xl:px-5 2xl:py-3.5 shadow-sm backdrop-blur-md transition-all duration-200 group-hover:border-orange-500/45 group-hover:bg-white group-hover:shadow-md';

  return (
    <li className="group relative">
      {/* ── Tarjeta Flotante de Retrato Ampliado al Pasar el Cursor (0px de espacio extra en la página) ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-3 w-56 -translate-x-1/2 translate-y-2 scale-95 opacity-0 transition-all duration-200 ease-out group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        <div className="relative overflow-hidden rounded-2xl border border-orange-500/35 bg-white p-3 shadow-[0_22px_50px_-12px_rgba(15,23,42,0.28)]">
          {/* Filo superior naranja */}
          <span className="absolute inset-x-0 top-0 h-[2.5px] bg-gradient-to-r from-padia-orange via-amber-500 to-transparent" />

          {/* Retrato grande 1:1 */}
          <div className="relative h-44 w-full overflow-hidden rounded-xl border border-slate-200/80 bg-[#F3F3F1]">
            {member.photo ? (
              <img
                src={resolveAssetUrl(member.photo)}
                alt=""
                className="h-full w-full bg-white object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-[#FFF4EE] via-white to-orange-500/10">
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-orange-500/30 bg-white font-display text-2xl font-extrabold text-slate-900 shadow-sm">
                  {initials}
                </span>
              </div>
            )}
          </div>

          {/* Nombre en la tarjeta flotante */}
          <div className="mt-2.5 flex items-center justify-between gap-2 px-0.5">
            <p className="line-clamp-2 text-xs font-extrabold leading-snug text-slate-950">
              {member.name}
            </p>
            {member.linkedin && (
              <Linkedin className="h-3.5 w-3.5 shrink-0 text-padia-orange" />
            )}
          </div>
        </div>

        {/* Puntero inferior de la tarjeta flotante */}
        <span className="mx-auto -mt-1.5 block h-3 w-3 rotate-45 border-b border-r border-orange-500/35 bg-white" />
      </div>

      {member.linkedin ? (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${member.name}`}
          className={base}
        >
          {content}
        </a>
      ) : (
        <div tabIndex={0} className={base}>
          {content}
        </div>
      )}
    </li>
  );
};

export const MembersSection = () => {
  const { members } = useAdmin();
  const leaders = members.filter((m) => m.role?.trim());
  const researchers = members.filter((m) => !m.role?.trim() && m.name.trim());

  return (
    <section id="members" className="scroll-mt-24 py-12 sm:py-16">
      <div className="page-container">
        <SectionHeading
          eyebrow="Equipo de investigación"
          titleLight="Nuestros"
          titleHighlight="Integrantes"
        />

        {leaders.length > 0 && (
          <ul className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {leaders.map((member, idx) => (
              <LeaderCard key={member.id} member={member} index={idx} />
            ))}
          </ul>
        )}

        {researchers.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center gap-4">
              <span className="tech-badge">
                Investigadores del Semillero · {researchers.length}
              </span>
              <span
                aria-hidden="true"
                className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"
              />
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 2xl:gap-4">
              {researchers.map((member) => (
                <ResearcherRow key={member.id} member={member} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
