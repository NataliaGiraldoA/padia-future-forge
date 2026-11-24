import { useId, useState } from 'react';
import { Cpu, Eye, GraduationCap, Lightbulb, Target, Users } from 'lucide-react';

interface CnnLayer {
  id: string;
  label: string;
  badge: string;
  opName: string;
  tensorSpec: string;
  detail: string;
  Icon: typeof Cpu;
}

const cnnLayers: CnnLayer[] = [
  {
    id: '01',
    label: 'Tecnología',
    badge: 'De vanguardia',
    opName: 'CONV 3×3',
    tensorSpec: 'TENSOR 64×64×3 · CONV FILTER',
    detail:
      'Exploramos arquitecturas modernas de software, analítica avanzada de datos y modelos de aprendizaje profundo.',
    Icon: Cpu,
  },
  {
    id: '02',
    label: 'Comunidad',
    badge: 'Colaborativa',
    opName: 'CONV2D + ReLU',
    tensorSpec: 'FEATURE MAPS 32×32×16',
    detail:
      'Células de estudio e investigación donde estudiantes de distintos semestres construyen conocimiento en equipo.',
    Icon: Users,
  },
  {
    id: '03',
    label: 'Innovación',
    badge: 'Constante',
    opName: 'MAX POOL',
    tensorSpec: 'TENSOR VOLUME 16×16×32',
    detail:
      'Prototipado rápido y experimentación aplicada para resolver problemas reales desde la investigación universitaria.',
    Icon: Lightbulb,
  },
  {
    id: '04',
    label: 'Formación',
    badge: 'Integral',
    opName: 'DENSE FC',
    tensorSpec: 'VECTOR 1×128 → SOFTMAX',
    detail:
      'Mentoría continua, participación en congresos nacionales e internacionales, hackathons y producción científica.',
    Icon: GraduationCap,
  },
];

const purposes = [
  {
    key: 'mision',
    code: '01 // MISIÓN',
    title: 'Misión',
    Icon: Target,
    text: 'Explorar, promover y desarrollar habilidades sólidas en nuestros miembros mediante la investigación colaborativa, el aprendizaje continuo y la innovación.',
  },
  {
    key: 'vision',
    code: '02 // VISIÓN',
    title: 'Visión',
    Icon: Eye,
    text: 'Ser un referente de excelencia académica donde se impulsan proyectos innovadores, se fortalecen habilidades técnicas y se crean alianzas con el sector tecnológico.',
  },
];

function isoSliceCorners(cx: number, cy: number, dx: number, dy: number, h: number) {
  const halfH = h / 2;
  return {
    tl: [cx - dx, cy - halfH + dy] as const,
    tr: [cx + dx, cy - halfH - dy] as const,
    br: [cx + dx, cy + halfH - dy] as const,
    bl: [cx - dx, cy + halfH + dy] as const,
  };
}

function cornersToPolygon(c: ReturnType<typeof isoSliceCorners>) {
  return `${c.tl[0]},${c.tl[1]} ${c.tr[0]},${c.tr[1]} ${c.br[0]},${c.br[1]} ${c.bl[0]},${c.bl[1]}`;
}

function isoSubPatch(
  c: ReturnType<typeof isoSliceCorners>,
  u0: number,
  u1: number,
  v0: number,
  v1: number,
) {
  const pointAt = (u: number, v: number) => {
    const topX = c.tl[0] + (c.tr[0] - c.tl[0]) * u;
    const topY = c.tl[1] + (c.tr[1] - c.tl[1]) * u;
    const botX = c.bl[0] + (c.br[0] - c.bl[0]) * u;
    const botY = c.bl[1] + (c.br[1] - c.bl[1]) * u;
    return [
      Number((topX + (botX - topX) * v).toFixed(1)),
      Number((topY + (botY - topY) * v).toFixed(1)),
    ] as const;
  };
  return {
    tl: pointAt(u0, v0),
    tr: pointAt(u1, v0),
    br: pointAt(u1, v1),
    bl: pointAt(u0, v1),
    center: pointAt((u0 + u1) / 2, (v0 + v1) / 2),
  };
}

function isoGridLines(c: ReturnType<typeof isoSliceCorners>, divisions: number) {
  const lines: { x1: number; y1: number; x2: number; y2: number }[] = [];
  for (let i = 1; i < divisions; i++) {
    const t = i / divisions;
    lines.push({
      x1: c.tl[0] + (c.tr[0] - c.tl[0]) * t,
      y1: c.tl[1] + (c.tr[1] - c.tl[1]) * t,
      x2: c.bl[0] + (c.br[0] - c.bl[0]) * t,
      y2: c.bl[1] + (c.br[1] - c.bl[1]) * t,
    });
    lines.push({
      x1: c.tl[0] + (c.bl[0] - c.tl[0]) * t,
      y1: c.tl[1] + (c.bl[1] - c.tl[1]) * t,
      x2: c.tr[0] + (c.br[0] - c.tr[0]) * t,
      y2: c.tr[1] + (c.br[1] - c.tr[1]) * t,
    });
  }
  return lines;
}

const L1_SLICES = [0, 1, 2].map((i) => isoSliceCorners(76 + i * 11, 150 + i * 3.5, 36, 23, 186));
const L1_FRONT = L1_SLICES[2];
const L1_KERNEL = isoSubPatch(L1_FRONT, 0.35, 0.78, 0.28, 0.68);

const L2_SLICES = [0, 1, 2, 3].map((i) => isoSliceCorners(214 + i * 10, 150 + i * 3.5, 30, 19, 154));
const L2_FRONT = L2_SLICES[3];
const L2_TARGET = isoSubPatch(L2_SLICES[0], 0.42, 0.66, 0.38, 0.62);
const L2_KERNEL = isoSubPatch(L2_FRONT, 0.3, 0.75, 0.32, 0.72);

const L3_SLICES = [0, 1, 2, 3, 4, 5].map((i) => isoSliceCorners(352 + i * 8, 150 + i * 3, 23, 14, 120));
const L3_FRONT = L3_SLICES[5];
const L3_TARGET = isoSubPatch(L3_SLICES[0], 0.38, 0.68, 0.38, 0.68);
const L3_KERNEL = isoSubPatch(L3_FRONT, 0.25, 0.78, 0.25, 0.78);

const FC_COL1_X = 486;
const FC_COL1_YS = [64, 100, 136, 172, 208, 244];
const FC_COL2_X = 548;
const FC_COL2_YS = [86, 132, 178, 224];

export const AboutSection = () => {
  const [activeLayerIdx, setActiveLayerIdx] = useState<number>(0);
  const [activePurposeIdx, setActivePurposeIdx] = useState<number>(0);
  const gradId = useId();

  const currentLayer = cnnLayers[activeLayerIdx];
  const CurrentLayerIcon = currentLayer.Icon;

  return (
    <section id="about" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="page-container">
        <div className="grid grid-cols-1 items-stretch gap-16 lg:grid-cols-12 lg:gap-16 xl:gap-24">
          {/* ── COLUMNA IZQUIERDA (6 col): Tipografía más grande y mayor espaciado ── */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              {/* Cabecera técnica superior */}
              <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-slate-900/10 pb-4">
                <span className="inline-flex items-center gap-2.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-slate-700">
                  <span className="h-2.5 w-2.5 rounded-full bg-padia-orange" />
                  Universidad San Buenaventura Cali
                </span>
                <span className="font-mono text-xs sm:text-sm font-medium text-orange-600">
                  SEMILLERO · LIDIS
                </span>
              </div>

              {/* Titular y párrafos a mayor escala y respiración vertical */}
              <h2 className="text-5xl tracking-tight sm:text-6xl xl:text-[4.25rem] 2xl:text-7xl leading-[1.06]">
                <span className="font-light text-slate-700 mr-3.5">¿Qué es</span>
                <span className="font-extrabold editorial-gradient-text">PADIA?</span>
              </h2>

              <div className="mt-9 space-y-6">
                <p className="text-xl font-medium leading-[1.55] text-slate-800 sm:text-2xl xl:text-[1.6rem]">
                  <span className="font-extrabold text-padia-orange">PADIA</span> es el semillero multidisciplinario de
                  la <span className="font-bold text-slate-950">Universidad San Buenaventura Cali</span>, donde
                  estudiantes apasionados por la tecnología exploran, aprenden y crean soluciones innovadoras.
                </p>
                <p className="text-lg leading-[1.65] text-slate-600 sm:text-xl xl:text-[1.35rem]">
                  Una comunidad académica enfocada en la{' '}
                  <span className="font-semibold text-slate-900">innovación</span>, la{' '}
                  <span className="font-semibold text-slate-900">investigación</span> y el{' '}
                  <span className="font-semibold text-slate-900">aprendizaje colaborativo</span> para formar a los
                  profesionales del futuro digital.
                </p>
              </div>
            </div>

            {/* ── Misión y Visión (2 tarjetas con letra más grande y mayor espaciado) ── */}
            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7">
              {purposes.map((item, idx) => {
                const isActive = activePurposeIdx === idx;
                const ItemIcon = item.Icon;
                return (
                  <div
                    key={item.key}
                    onMouseEnter={() => setActivePurposeIdx(idx)}
                    onClick={() => setActivePurposeIdx(idx)}
                    className={`group relative flex cursor-pointer flex-col justify-between rounded-2xl border p-7 transition-all duration-300 sm:p-8 xl:p-9 ${
                      isActive
                        ? 'border-orange-500/45 bg-white shadow-[0_14px_34px_-12px_rgba(255,107,0,0.18)]'
                        : 'border-slate-300/80 bg-white/70 hover:border-orange-500/30 hover:bg-white/95'
                    }`}
                  >
                    {/* Filo superior naranja activo */}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 top-0 h-[2.5px] rounded-full transition-opacity duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-padia-orange via-amber-500 to-transparent opacity-100'
                          : 'opacity-0'
                      }`}
                    />

                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-3.5">
                          <span
                            className={`inline-flex h-11 w-11 items-center justify-center rounded-xl transition-colors ${
                              isActive
                                ? 'bg-padia-orange text-white shadow-[0_4px_12px_rgba(255,107,0,0.35)]'
                                : 'bg-orange-500/10 text-padia-orange'
                            }`}
                          >
                            <ItemIcon aria-hidden="true" className="h-5 w-5" strokeWidth={1.9} />
                          </span>
                          <h3 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-[1.65rem]">
                            {item.title}
                          </h3>
                        </div>
                        <span
                          className={`font-mono text-xs font-bold uppercase tracking-wider ${
                            isActive ? 'text-orange-600' : 'text-slate-400'
                          }`}
                        >
                          {item.code}
                        </span>
                      </div>

                      <p className="mt-5 text-base leading-[1.65] text-slate-600 sm:text-lg">
                        {item.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── COLUMNA DERECHA (6 col): Red Neuronal Convolucional (CNN) Interactiva ── */}
          <div className="flex flex-col justify-between lg:col-span-6">
            {/* Lienzo Isométrico de la Red Convolucional con mayor escala vertical */}
            <div className="relative my-auto h-[310px] w-full select-none sm:h-[350px] xl:h-[380px] 2xl:h-[400px]">
              <svg
                aria-hidden="true"
                viewBox="0 0 600 310"
                fill="none"
                className="h-full w-full overflow-visible"
              >
                <defs>
                  <linearGradient id={`${gradId}-frustum`} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.32" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0.08" />
                  </linearGradient>
                  <radialGradient id={`${gradId}-layer-glow`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.24" />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <line
                  x1="30"
                  y1="155"
                  x2="575"
                  y2="155"
                  stroke="#0F172A"
                  strokeOpacity="0.08"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                <circle
                  cx={[90, 232, 374, 516][activeLayerIdx]}
                  cy="155"
                  r="128"
                  fill={`url(#${gradId}-layer-glow)`}
                  className="transition-all duration-500"
                />

                {/* CAPA 01 */}
                <g
                  className="transition-transform duration-300"
                  style={{
                    transform: activeLayerIdx === 0 ? 'translateY(-5px)' : 'translateY(0px)',
                  }}
                >
                  {L1_SLICES.map((slice, sIdx) => {
                    const isFront = sIdx === L1_SLICES.length - 1;
                    const isLayerActive = activeLayerIdx === 0;
                    const isReached = activeLayerIdx >= 0;
                    return (
                      <g key={sIdx}>
                        <polygon
                          points={cornersToPolygon(slice)}
                          fill={isFront ? '#FFFFFF' : '#F8FAFC'}
                          fillOpacity={isFront ? '0.94' : '0.78'}
                          stroke={isLayerActive ? '#FF6B00' : isReached ? '#EA580C' : '#64748B'}
                          strokeOpacity={isLayerActive ? '0.9' : isFront ? '0.45' : '0.28'}
                          strokeWidth={isLayerActive && isFront ? '2' : '1.2'}
                        />
                        {isFront &&
                          isoGridLines(slice, 5).map((ln, lIdx) => (
                            <line
                              key={lIdx}
                              x1={ln.x1}
                              y1={ln.y1}
                              x2={ln.x2}
                              y2={ln.y2}
                              stroke="#0F172A"
                              strokeOpacity="0.09"
                              strokeWidth="0.9"
                            />
                          ))}
                      </g>
                    );
                  })}

                  <polygon
                    points={cornersToPolygon(L1_KERNEL)}
                    fill="#FF6B00"
                    fillOpacity={activeLayerIdx >= 0 ? '0.28' : '0.12'}
                    stroke="#FF6B00"
                    strokeWidth="2"
                  />
                </g>

                {/* PIRÁMIDE 1 → 2 */}
                <g opacity={activeLayerIdx >= 1 ? 1 : 0.35} className="transition-opacity duration-300">
                  <polygon
                    points={`${L1_KERNEL.tl[0]},${L1_KERNEL.tl[1]} ${L2_TARGET.center[0]},${L2_TARGET.center[1]} ${L1_KERNEL.bl[0]},${L1_KERNEL.bl[1]}`}
                    fill={`url(#${gradId}-frustum)`}
                  />
                  {([L1_KERNEL.tl, L1_KERNEL.tr, L1_KERNEL.br, L1_KERNEL.bl] as const).map((pt, i) => (
                    <line
                      key={i}
                      x1={pt[0]}
                      y1={pt[1]}
                      x2={L2_TARGET.center[0]}
                      y2={L2_TARGET.center[1]}
                      stroke="#FF6B00"
                      strokeOpacity={activeLayerIdx >= 1 ? '0.75' : '0.4'}
                      strokeWidth="1.2"
                      strokeDasharray={activeLayerIdx >= 1 ? undefined : '3 3'}
                    />
                  ))}
                </g>

                {/* CAPA 02 */}
                <g
                  className="transition-transform duration-300"
                  style={{
                    transform: activeLayerIdx === 1 ? 'translateY(-5px)' : 'translateY(0px)',
                  }}
                >
                  {L2_SLICES.map((slice, sIdx) => {
                    const isFront = sIdx === L2_SLICES.length - 1;
                    const isLayerActive = activeLayerIdx === 1;
                    const isReached = activeLayerIdx >= 1;
                    return (
                      <g key={sIdx}>
                        <polygon
                          points={cornersToPolygon(slice)}
                          fill={isFront ? '#FFFFFF' : '#FFF7ED'}
                          fillOpacity={isFront ? '0.94' : '0.8'}
                          stroke={isLayerActive ? '#FF6B00' : isReached ? '#EA580C' : '#64748B'}
                          strokeOpacity={isLayerActive ? '0.95' : isReached ? '0.48' : '0.26'}
                          strokeWidth={isLayerActive && isFront ? '2' : '1.2'}
                        />
                        {isFront &&
                          isoGridLines(slice, 4).map((ln, lIdx) => (
                            <line
                              key={lIdx}
                              x1={ln.x1}
                              y1={ln.y1}
                              x2={ln.x2}
                              y2={ln.y2}
                              stroke="#0F172A"
                              strokeOpacity="0.09"
                              strokeWidth="0.9"
                            />
                          ))}
                      </g>
                    );
                  })}

                  <circle
                    cx={L2_TARGET.center[0]}
                    cy={L2_TARGET.center[1]}
                    r="3.2"
                    fill="#FF6B00"
                  />
                  <polygon
                    points={cornersToPolygon(L2_KERNEL)}
                    fill="#FF6B00"
                    fillOpacity={activeLayerIdx >= 1 ? '0.26' : '0.1'}
                    stroke="#FF6B00"
                    strokeOpacity={activeLayerIdx >= 1 ? '0.95' : '0.45'}
                    strokeWidth="1.8"
                  />
                </g>

                {/* PIRÁMIDE 2 → 3 */}
                <g opacity={activeLayerIdx >= 2 ? 1 : 0.3} className="transition-opacity duration-300">
                  <polygon
                    points={`${L2_KERNEL.tl[0]},${L2_KERNEL.tl[1]} ${L3_TARGET.center[0]},${L3_TARGET.center[1]} ${L2_KERNEL.bl[0]},${L2_KERNEL.bl[1]}`}
                    fill={`url(#${gradId}-frustum)`}
                  />
                  {([L2_KERNEL.tl, L2_KERNEL.tr, L2_KERNEL.br, L2_KERNEL.bl] as const).map((pt, i) => (
                    <line
                      key={i}
                      x1={pt[0]}
                      y1={pt[1]}
                      x2={L3_TARGET.center[0]}
                      y2={L3_TARGET.center[1]}
                      stroke="#FF6B00"
                      strokeOpacity={activeLayerIdx >= 2 ? '0.8' : '0.35'}
                      strokeWidth="1.2"
                      strokeDasharray={activeLayerIdx >= 2 ? undefined : '3 3'}
                    />
                  ))}
                </g>

                {/* CAPA 03 */}
                <g
                  className="transition-transform duration-300"
                  style={{
                    transform: activeLayerIdx === 2 ? 'translateY(-5px)' : 'translateY(0px)',
                  }}
                >
                  {L3_SLICES.map((slice, sIdx) => {
                    const isFront = sIdx === L3_SLICES.length - 1;
                    const isLayerActive = activeLayerIdx === 2;
                    const isReached = activeLayerIdx >= 2;
                    return (
                      <g key={sIdx}>
                        <polygon
                          points={cornersToPolygon(slice)}
                          fill={isFront ? '#FFFFFF' : '#FFF4EE'}
                          fillOpacity={isFront ? '0.95' : '0.84'}
                          stroke={isLayerActive ? '#FF6B00' : isReached ? '#EA580C' : '#64748B'}
                          strokeOpacity={isLayerActive ? '0.95' : isReached ? '0.52' : '0.25'}
                          strokeWidth={isLayerActive && isFront ? '2' : '1.15'}
                        />
                        {isFront &&
                          isoGridLines(slice, 3).map((ln, lIdx) => (
                            <line
                              key={lIdx}
                              x1={ln.x1}
                              y1={ln.y1}
                              x2={ln.x2}
                              y2={ln.y2}
                              stroke="#0F172A"
                              strokeOpacity="0.1"
                              strokeWidth="0.9"
                            />
                          ))}
                      </g>
                    );
                  })}

                  <polygon
                    points={cornersToPolygon(L3_KERNEL)}
                    fill="#FF6B00"
                    fillOpacity={activeLayerIdx >= 2 ? '0.3' : '0.1'}
                    stroke="#FF6B00"
                    strokeOpacity={activeLayerIdx >= 2 ? '0.95' : '0.4'}
                    strokeWidth="1.75"
                  />
                </g>

                {/* CONEXIONES 3 → 4 */}
                <g opacity={activeLayerIdx >= 3 ? 0.95 : 0.25} className="transition-opacity duration-300">
                  {FC_COL1_YS.map((ny, i) => {
                    const srcCorner =
                      i < 2 ? L3_KERNEL.tr : i < 4 ? L3_KERNEL.center : L3_KERNEL.br;
                    return (
                      <line
                        key={i}
                        x1={srcCorner[0]}
                        y1={srcCorner[1]}
                        x2={FC_COL1_X}
                        y2={ny}
                        stroke="#FF6B00"
                        strokeOpacity={activeLayerIdx >= 3 ? '0.65' : '0.35'}
                        strokeWidth="1.1"
                        strokeDasharray={activeLayerIdx >= 3 ? undefined : '2 3'}
                      />
                    );
                  })}
                </g>

                {/* CAPA 04 */}
                <g
                  className="transition-transform duration-300"
                  style={{
                    transform: activeLayerIdx === 3 ? 'translateY(-5px)' : 'translateY(0px)',
                  }}
                >
                  {FC_COL1_YS.map((y1, i) =>
                    FC_COL2_YS.map((y2, j) => (
                      <line
                        key={`${i}-${j}`}
                        x1={FC_COL1_X}
                        y1={y1}
                        x2={FC_COL2_X}
                        y2={y2}
                        stroke={activeLayerIdx === 3 ? '#FF6B00' : '#0F172A'}
                        strokeOpacity={activeLayerIdx === 3 ? '0.45' : '0.12'}
                        strokeWidth={activeLayerIdx === 3 ? '1.2' : '0.9'}
                      />
                    )),
                  )}

                  <rect
                    x={FC_COL1_X - 12}
                    y="42"
                    width="24"
                    height="224"
                    rx="12"
                    fill="#FFFFFF"
                    fillOpacity="0.85"
                    stroke={activeLayerIdx === 3 ? '#FF6B00' : '#64748B'}
                    strokeOpacity={activeLayerIdx === 3 ? '0.85' : '0.3'}
                    strokeWidth="1.3"
                  />

                  {FC_COL1_YS.map((ny, i) => (
                    <circle
                      key={i}
                      cx={FC_COL1_X}
                      cy={ny}
                      r="5.5"
                      fill={activeLayerIdx === 3 || i % 2 === 0 ? '#FF6B00' : '#FFF4EE'}
                      fillOpacity={activeLayerIdx === 3 ? '0.9' : '0.5'}
                      stroke="#FF6B00"
                      strokeWidth="1.3"
                    />
                  ))}

                  {FC_COL2_YS.map((ny, j) => {
                    const isHighlightedNode = j === activeLayerIdx || activeLayerIdx === 3;
                    return (
                      <g key={j}>
                        {activeLayerIdx === 3 && (
                          <circle
                            cx={FC_COL2_X}
                            cy={ny}
                            r="11"
                            fill="#FF6B00"
                            fillOpacity="0.18"
                          />
                        )}
                        <circle
                          cx={FC_COL2_X}
                          cy={ny}
                          r="7"
                          fill={isHighlightedNode ? '#FF6B00' : '#FFFFFF'}
                          stroke="#FF6B00"
                          strokeWidth="1.6"
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>

              {/* Zonas interactivas directas sobre las 4 capas del diagrama CNN */}
              <div className="absolute inset-0 grid grid-cols-4">
                {cnnLayers.map((layer, idx) => (
                  <button
                    key={layer.id}
                    type="button"
                    onMouseEnter={() => setActiveLayerIdx(idx)}
                    onFocus={() => setActiveLayerIdx(idx)}
                    onClick={() => setActiveLayerIdx(idx)}
                    aria-label={`Seleccionar capa ${layer.id} ${layer.label}`}
                    aria-pressed={activeLayerIdx === idx}
                    className="h-full w-full cursor-pointer focus:outline-none"
                  />
                ))}
              </div>
            </div>

            {/* Base Derecha: Selector de capas (01 — 04) + Tarjeta de capa CNN activa */}
            <div className="mt-8 border-t border-slate-900/10 pt-7">
              <div className="mb-6 grid grid-cols-4 gap-4">
                {cnnLayers.map((layer, idx) => {
                  const isActive = activeLayerIdx === idx;
                  return (
                    <button
                      key={layer.id}
                      type="button"
                      onClick={() => setActiveLayerIdx(idx)}
                      onMouseEnter={() => setActiveLayerIdx(idx)}
                      className={`flex flex-col items-start border-t-2 pt-3 text-left transition-colors ${
                        isActive
                          ? 'border-padia-orange text-slate-950'
                          : 'border-slate-300 text-slate-500 hover:border-slate-400 hover:text-slate-800'
                      }`}
                    >
                      <span
                        className={`font-mono text-xs font-bold ${
                          isActive ? 'text-padia-orange' : 'text-slate-400'
                        }`}
                      >
                        {layer.id}
                      </span>
                      <span className="mt-1 truncate text-sm font-bold sm:text-base">
                        {layer.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex items-start gap-5 rounded-2xl border border-slate-300/80 bg-white/85 p-7 shadow-[0_12px_28px_-12px_rgba(15,23,42,0.08)] backdrop-blur-md sm:p-8">
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-padia-orange text-white shadow-[0_6px_20px_-4px_rgba(255,107,0,0.5)]">
                  <CurrentLayerIcon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                        {currentLayer.label}
                      </h3>
                      <span className="tech-badge">{currentLayer.badge}</span>
                    </div>
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-400">
                      CAPA {currentLayer.id} / 04
                    </span>
                  </div>
                  <p className="mt-3 text-base leading-[1.65] text-slate-600 sm:text-lg">
                    {currentLayer.detail}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
