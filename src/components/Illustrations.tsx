import { useId } from 'react';

/**
 * Micro-ilustraciones vectoriales de línea fina (naranja → pizarra).
 * Son decorativas: siempre aria-hidden.
 */

interface IllustrationProps {
  className?: string;
}

const StrokeGradient = ({ id }: { id: string }) => (
  <defs>
    <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#FF6B00" />
      <stop offset="100%" stopColor="#64748B" />
    </linearGradient>
  </defs>
);

/** Programación: llaves de código con nodos de estructura. */
export const CodeGlyph = ({ className }: IllustrationProps) => {
  const id = useId();
  return (
    <svg aria-hidden="true" viewBox="0 0 120 80" fill="none" className={className}>
      <StrokeGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M28 10c-8 0-10 4-10 10v8c0 6-3 9-8 12 5 3 8 6 8 12v8c0 6 2 10 10 10" />
        <path d="M92 10c8 0 10 4 10 10v8c0 6 3 9 8 12-5 3-8 6-8 12v8c0 6-2 10-10 10" />
        <path d="M44 28h18M50 40h26M44 52h14" />
        <circle cx="68" cy="28" r="3" />
        <circle cx="82" cy="40" r="3" />
        <circle cx="64" cy="52" r="3" />
        <path d="M71 29.5l8 9M79 41.5l-12 9" strokeDasharray="2 3" />
      </g>
    </svg>
  );
};

/** Analítica de datos: dispersión con curva de tendencia. */
export const ScatterWave = ({ className }: IllustrationProps) => {
  const id = useId();
  const points = [
    [14, 60], [24, 52], [32, 58], [42, 44], [52, 46], [60, 34], [70, 38], [80, 26], [90, 28], [102, 16],
  ];
  return (
    <svg aria-hidden="true" viewBox="0 0 120 80" fill="none" className={className}>
      <StrokeGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.5" strokeLinecap="round">
        <path d="M8 72h106M8 72V8" strokeOpacity="0.5" />
        <path d="M10 64C30 60 40 50 56 42s34-18 52-28" />
        {points.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />
        ))}
      </g>
    </svg>
  );
};

/** Inteligencia artificial: red neuronal de tres capas. */
export const NeuralNet = ({ className }: IllustrationProps) => {
  const id = useId();
  const layers = [
    [16, 40, 64],
    [12, 30, 50, 68],
    [28, 52],
  ];
  const xs = [16, 60, 104];
  const edges: string[] = [];
  layers.slice(0, -1).forEach((layer, li) =>
    layer.forEach((y1) =>
      layers[li + 1].forEach((y2) => edges.push(`M${xs[li]} ${y1}L${xs[li + 1]} ${y2}`)),
    ),
  );
  return (
    <svg aria-hidden="true" viewBox="0 0 120 80" fill="none" className={className}>
      <StrokeGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1.2">
        <path d={edges.join(' ')} strokeOpacity="0.55" />
        {layers.map((layer, li) =>
          layer.map((y) => <circle key={`${li}-${y}`} cx={xs[li]} cy={y} r="4" fill="#F3F3F1" strokeWidth="1.5" />),
        )}
      </g>
    </svg>
  );
};

/**
 * Fondo arquitectónico de la Función Sigmoide σ(x) = 1 / (1 + e^-x)
 * integrado al lienzo del Hero junto con la geometría generatriz de los 5 rombos de PADIA.
 */
export const HeroSigmoidBackdrop = ({ className }: IllustrationProps) => {
  const id = useId();

  // Genera una curva sigmoide en viewBox 1600x900 con centro de inflexión en (x0, y0)
  const buildSigmoidPath = (x0: number, yMin: number, yMax: number, scaleX: number) => {
    const pts: string[] = [];
    const steps = 80;
    for (let i = 0; i <= steps; i++) {
      const x = (i / steps) * 1600;
      const t = (x - x0) / scaleX;
      const sigma = 1 / (1 + Math.exp(-t));
      const y = yMax - sigma * (yMax - yMin);
      pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  };

  // Curva principal con inflexión en (780, 410), justo en el espacio abierto entre el título y la mascota
  const mainCurve = buildSigmoidPath(780, 140, 680, 145);
  const mainArea = `${mainCurve} L1600 680 L0 680 Z`;

  // Curvas armónicas secundarias (desplazamiento de fase / envolvente de activación)
  const harmonicOffsets = [-110, -55, 55, 110];

  // Los 5 rombos del isotipo PADIA trazados como geometría constructiva en la pendiente central
  // Lado = 46, diagonal = 46 * sqrt(2) ≈ 65, paso entre centros = 36px en X y 36px en Y
  const step = 36;
  const baseCx = 710;
  const baseCy = 446;
  const padiaDiamonds = [
    { cx: baseCx - step, cy: baseCy + step, opacity: 0.08 },
    { cx: baseCx, cy: baseCy, opacity: 0.11 },
    { cx: baseCx + step, cy: baseCy + step, opacity: 0.13 },
    { cx: baseCx + step * 2, cy: baseCy, opacity: 0.16 },
    { cx: baseCx + step * 3, cy: baseCy - step, opacity: 0.2 },
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1600 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id={`${id}-main-stroke`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
          <stop offset="18%" stopColor="#FF6B00" stopOpacity="0.22" />
          <stop offset="48%" stopColor="#FF6B00" stopOpacity="0.55" />
          <stop offset="72%" stopColor="#FF6B00" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-harmonic`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0" />
          <stop offset="30%" stopColor="#FF6B00" stopOpacity="0.12" />
          <stop offset="70%" stopColor="#FF6B00" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </linearGradient>

        <linearGradient id={`${id}-area`} x1="780" y1="140" x2="780" y2="680" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.075" />
          <stop offset="65%" stopColor="#FF6B00" stopOpacity="0.025" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </linearGradient>

        <radialGradient id={`${id}-inflection-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FF6B00" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Halo suave en la zona de inflexión de la sigmoide */}
      <circle cx="780" cy="410" r="260" fill={`url(#${id}-inflection-glow)`} />

      {/* Asíntotas arquitectónicas (σ = 1, σ = 0.5, σ = 0) y eje vertical de inflexión x = 0 */}
      <g stroke="#0F172A" strokeOpacity="0.07" strokeWidth="1">
        {/* Asíntota superior y = 1 */}
        <line x1="220" y1="140" x2="1440" y2="140" strokeDasharray="6 6" />
        {/* Eje de simetría y = 0.5 */}
        <line x1="340" y1="410" x2="1220" y2="410" strokeDasharray="3 7" />
        {/* Asíntota inferior y = 0 */}
        <line x1="120" y1="680" x2="1340" y2="680" strokeDasharray="6 6" />
        {/* Eje vertical en x = 0 */}
        <line x1="780" y1="95" x2="780" y2="730" strokeDasharray="4 6" />
      </g>

      {/* Tangente constructiva en el punto de inflexión (pendiente máxima σ'(0) = 0.25) */}
      <line
        x1="540"
        y1="633"
        x2="1020"
        y2="187"
        stroke="#FF6B00"
        strokeOpacity="0.16"
        strokeWidth="1"
        strokeDasharray="4 4"
      />

      {/* Sombreado bajo la curva sigmoide */}
      <path d={mainArea} fill={`url(#${id}-area)`} />

      {/* Familia de curvas sigmoides armónicas de fondo */}
      {harmonicOffsets.map((dx, i) => (
        <path
          key={dx}
          d={buildSigmoidPath(780 + dx, 140, 680, 145 + (i % 2) * 18)}
          stroke={`url(#${id}-harmonic)`}
          strokeWidth="1.2"
          strokeDasharray={i % 2 === 0 ? undefined : '5 5'}
        />
      ))}

      {/* Geometría constructiva del isotipo PADIA (los 5 rombos emergiendo de la pendiente sigmoide) */}
      <g>
        {/* Líneas guía diagonales prolongadas del isotipo */}
        <line
          x1="590"
          y1="566"
          x2="920"
          y2="236"
          stroke="#FF6B00"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <line
          x1="626"
          y1="602"
          x2="956"
          y2="272"
          stroke="#FF6B00"
          strokeOpacity="0.12"
          strokeWidth="1"
          strokeDasharray="2 4"
        />

        {padiaDiamonds.map(({ cx, cy, opacity }, idx) => (
          <g key={idx} transform={`rotate(45 ${cx} ${cy})`}>
            <rect
              x={cx - 22}
              y={cy - 22}
              width="44"
              height="44"
              rx="3"
              fill="#FF6B00"
              fillOpacity={opacity}
              stroke="#FF6B00"
              strokeOpacity="0.32"
              strokeWidth="1.2"
            />
            {/* Marco interno técnico de cada rombo */}
            <rect
              x={cx - 14}
              y={cy - 14}
              width="28"
              height="28"
              rx="1.5"
              stroke="#FF6B00"
              strokeOpacity="0.16"
              strokeWidth="0.8"
              strokeDasharray="2 2"
            />
          </g>
        ))}
      </g>

      {/* Curva Sigmoide Principal σ(x) = 1 / (1 + e^-x) */}
      <path
        d={mainCurve}
        stroke={`url(#${id}-main-stroke)`}
        strokeWidth="2.75"
        strokeLinecap="round"
      />

      {/* Nodos matemáticos sobre la curva sigmoide */}
      {[
        { x: 490, y: 616, label: 'σ(-2) ≈ 0.12' },
        { x: 635, y: 535, label: '' },
        { x: 780, y: 410, label: 'σ(0) = 0.50' },
        { x: 925, y: 285, label: '' },
        { x: 1070, y: 204, label: 'σ(+2) ≈ 0.88' },
      ].map(({ x, y, label }, idx) => (
        <g key={idx}>
          {idx === 2 && (
            <>
              <circle cx={x} cy={y} r="16" stroke="#FF6B00" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="2 2" />
              <circle cx={x} cy={y} r="8" fill="#FF6B00" fillOpacity="0.18" />
            </>
          )}
          <circle
            cx={x}
            cy={y}
            r={idx === 2 ? '4' : '3'}
            fill={idx === 2 ? '#FF6B00' : '#F3F3F1'}
            stroke="#FF6B00"
            strokeOpacity={idx === 2 ? '0.9' : '0.5'}
            strokeWidth="1.5"
          />
          {label && (
            <text
              x={x + 12}
              y={y + 16}
              fill="#0F172A"
              fillOpacity="0.32"
              fontFamily="JetBrains Mono, monospace"
              fontSize="10"
              fontWeight="500"
            >
              {label}
            </text>
          )}
        </g>
      ))}

      {/* Notación matemática sutil grabada en el plano arquitectónico de fondo */}
      <g
        fill="#0F172A"
        fillOpacity="0.28"
        fontFamily="JetBrains Mono, monospace"
        fontSize="10.5"
        fontWeight="500"
      >
        <text x="792" y="132">y = 1.0 · ASÍNTOTA SUPERIOR</text>
        <text x="640" y="325" fill="#EA580C" fillOpacity="0.48">
          σ(x) = 1 / (1 + e⁻ˣ)
        </text>
        <text x="792" y="672">y = 0.0 · ASÍNTOTA INFERIOR</text>
      </g>
    </svg>
  );
};

/** Patrones de fondo para cabeceras de tarjetas. */
export const CardPattern = ({ variant, className }: IllustrationProps & { variant: number }) => {
  const id = useId();
  return (
    <svg aria-hidden="true" viewBox="0 0 240 160" fill="none" preserveAspectRatio="xMidYMid slice" className={className}>
      <StrokeGradient id={id} />
      <g stroke={`url(#${id})`} strokeWidth="1">
        {variant === 0 &&
          // Curvas de nivel
          [0, 1, 2, 3, 4, 5].map((i) => (
            <ellipse key={i} cx="200" cy="10" rx={30 + i * 26} ry={20 + i * 18} strokeOpacity={0.9 - i * 0.13} />
          ))}
        {variant === 1 &&
          // Retícula isométrica
          Array.from({ length: 12 }, (_, i) => (
            <g key={i} strokeOpacity="0.5">
              <path d={`M${-80 + i * 30} 160L${i * 30 + 12} 0`} />
              <path d={`M${i * 30 - 12} 0L${i * 30 + 80} 160`} />
            </g>
          ))}
        {variant === 2 &&
          // Trayectoria ascendente con nodos
          [0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M-10 ${150 - i * 18}C70 ${140 - i * 18} 130 ${90 - i * 16} 250 ${20 - i * 10}`}
              strokeOpacity={0.85 - i * 0.18}
            />
          ))}
        {variant === 3 &&
          // Red de nodos conectados
          (
            <g strokeOpacity="0.6">
              <path d="M30 120L90 70L150 100L210 40M90 70L120 20M150 100L200 130M90 70L40 40" />
              {[[30, 120], [90, 70], [150, 100], [210, 40], [120, 20], [200, 130], [40, 40]].map(([x, y]) => (
                <circle key={`${x}-${y}`} cx={x} cy={y} r="4" />
              ))}
            </g>
          )}
      </g>
    </svg>
  );
};
