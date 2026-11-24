import type { ComponentType } from 'react';
import { ArrowRight } from 'lucide-react';
import gatoPadia from '../gato.png';
import logoNaranja from '../logonaranja.png';
import { CodeGlyph, HeroSigmoidBackdrop, NeuralNet, ScatterWave } from './Illustrations';
import { SpotlightCard } from './SpotlightCard';

const pillars: {
  title: string;
  description: string;
  Illustration: ComponentType<{ className?: string }>;
}[] = [
  {
    title: 'Programación',
    description: 'Desarrollo de software y algoritmos',
    Illustration: CodeGlyph,
  },
  {
    title: 'Analítica de Datos',
    description: 'Exploración y visualización de datos',
    Illustration: ScatterWave,
  },
  {
    title: 'Inteligencia Artificial',
    description: 'Modelos de aprendizaje automático',
    Illustration: NeuralNet,
  },
];

export const HeroSection = () => {
  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative flex items-center overflow-hidden pb-12 pt-28 sm:pt-32">
      {/* Trazado arquitectónico de fondo: Función Sigmoide σ(x) y geometría de 5 rombos del isotipo PADIA */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <HeroSigmoidBackdrop className="h-full w-full" />
      </div>

      <div className="page-container relative z-10 grid min-h-[78vh] grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-12 xl:gap-16">
        {/* ── Columna Izquierda: Contenido Editorial ── */}
        <div className="lg:col-span-7">
          <div className="mb-7">
            <span className="tech-badge">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
              Universidad de San Buenaventura Cali
            </span>
          </div>

          <h1 className="text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl 2xl:text-[5.25rem]">
            <span className="block font-light text-slate-700">Semillero de</span>
            <span className="block font-extrabold editorial-gradient-text pb-1">
              Investigación
            </span>
            <img
              src={logoNaranja}
              alt="PADIA"
              className="-ml-2 mt-3 block h-20 w-auto select-none sm:h-24 lg:h-28 2xl:h-32 drop-shadow-[0_10px_30px_rgba(255,107,0,0.2)]"
            />
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 sm:text-xl 2xl:text-2xl">
            Estamos construyendo el futuro, un dato a la vez
          </p>

          {/* Las 3 Tarjetas del Hero: Cristal Esmerilado + Indicador lateral naranja 3px */}
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
            {pillars.map(({ title, description, Illustration }, idx) => (
              <SpotlightCard
                as="li"
                key={title}
                className="group rounded-2xl border border-slate-200/80 bg-white/85 p-5 pl-6 shadow-[0_12px_32px_-12px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 xl:p-7 xl:pl-7"
              >
                {/* Indicador lateral izquierdo naranja sólido de 3px */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-3 left-0 w-[3px] rounded-r-full bg-orange-500/45 transition-all duration-300 group-hover:inset-y-2 group-hover:bg-orange-500 group-hover:shadow-[0_0_14px_#FF6B00]"
                />

                <Illustration className="pointer-events-none absolute -bottom-2 -right-3 w-28 opacity-25 transition-opacity duration-300 group-hover:opacity-50 xl:w-32" />

                <span className="relative font-mono text-xs font-semibold text-orange-600">
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <p className="relative mt-3.5 text-base font-bold text-slate-900 xl:text-lg">
                  {title}
                </p>
                <p className="relative mt-1.5 pr-4 text-xs leading-relaxed text-slate-600 xl:text-sm">
                  {description}
                </p>
              </SpotlightCard>
            ))}
          </ul>

          {/* Acciones */}
          <div className="mt-10 flex flex-col gap-3.5 sm:flex-row">
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FF6B00] px-7 py-3.5 text-sm font-semibold text-white shadow-inner shadow-white/25 transition-all duration-200 hover:bg-[#ff7a1a] hover:shadow-[0_0_28px_-4px_rgba(255,107,0,0.65)]"
            >
              Explorar Proyectos
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={scrollToAbout}
              className="inline-flex items-center justify-center rounded-full border border-slate-200/90 bg-white/85 px-7 py-3.5 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-xl transition-colors hover:border-orange-500/40 hover:bg-white"
            >
              Conocer el Semillero
            </button>
          </div>
        </div>

        {/* ── Columna Derecha: Plataforma de Luz / Podio Cilíndrico Virtual + Mascota ── */}
        <div className="flex items-center justify-center lg:col-span-5 lg:justify-center lg:-ml-6 xl:-ml-12 2xl:-ml-16">
          <div className="relative aspect-[4/5] w-[340px] sm:w-[450px] lg:w-full lg:max-w-[560px] xl:max-w-[650px] 2xl:max-w-[720px]">
            {/* Atmósfera volumétrica trasera */}
            <div
              aria-hidden="true"
              className="absolute left-[12%] top-[12%] h-[58%] w-[72%] rounded-full bg-[#FF6B00]/20 blur-[115px]"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[10%] right-[6%] h-[42%] w-[56%] rounded-full bg-[#FFB800]/15 blur-[105px]"
            />

            {/* Cilindro de luz ascendente desde el podio */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-[10%] left-1/2 h-[58%] w-[68%] -translate-x-1/2 bg-gradient-to-t from-orange-500/20 via-orange-500/[0.04] to-transparent blur-2xl [clip-path:polygon(12%_0%,88%_0%,100%_100%,0%_100%)]"
            />

            {/* Podio Cilíndrico Virtual en el suelo */}
            <div
              aria-hidden="true"
              className="absolute bottom-[4%] left-1/2 h-[17%] w-[88%] -translate-x-1/2 rounded-[50%] bg-gradient-to-t from-orange-500/25 via-orange-500/5 to-transparent blur-2xl"
            />
            <div
              aria-hidden="true"
              className="absolute bottom-[7%] left-1/2 h-[13%] w-[84%] -translate-x-1/2 rounded-[50%] border border-orange-500/30 bg-[radial-gradient(ellipse_at_center,rgba(255,107,0,0.22)_0%,rgba(255,255,255,0.92)_70%)] shadow-[0_18px_50px_rgba(255,107,0,0.18),inset_0_2px_12px_rgba(255,180,80,0.25)] backdrop-blur-md"
            >
              <div className="absolute inset-2.5 rounded-[50%] border border-dashed border-orange-400/35" />
            </div>

            {/* Mascota Oficial de PADIA */}
            <div className="absolute inset-x-0 bottom-[11.5%] top-0 z-10 flex items-end justify-center">
              <img
                src={gatoPadia}
                alt="Mascota de PADIA"
                className="w-[85%] sm:w-[87%] animate-float select-none drop-shadow-[0_14px_34px_rgba(255,107,0,0.28)]"
              />
            </div>

            {/* Micro-elemento flotante 1: Mini tarjeta de código con sintaxis */}
            <div
              aria-hidden="true"
              style={{ animationDelay: '0s' }}
              className="absolute -left-2 top-[11%] z-20 animate-float rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 shadow-xl backdrop-blur-xl sm:-left-6 xl:-left-10"
            >
              <div className="mb-1.5 flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-orange-500/80" />
                <span className="h-2 w-2 rounded-full bg-amber-400/80" />
                <span className="h-2 w-2 rounded-full bg-slate-300" />
                <span className="ml-1.5 font-mono text-[10px] text-slate-500">padia.py</span>
              </div>
              <pre className="font-mono text-[11px] leading-snug text-slate-700">
                <span className="text-orange-600">import</span> tensorflow{'\n'}
                <span className="text-slate-500">model.fit(</span>
                <span className="text-amber-600">X, y</span>
                <span className="text-slate-500">)</span>
              </pre>
            </div>

            {/* Micro-elemento flotante 2: Módulo de Analítica de Datos */}
            <div
              aria-hidden="true"
              style={{ animationDelay: '-2.2s' }}
              className="absolute -right-2 top-[34%] z-20 flex animate-float items-center gap-3 rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2.5 shadow-xl backdrop-blur-xl sm:-right-4 xl:-right-8"
            >
              <svg viewBox="0 0 28 18" className="h-4 w-7" fill="none">
                {[4, 9, 6, 13, 10, 16].map((h, i) => (
                  <rect
                    key={i}
                    x={i * 5}
                    y={18 - h}
                    width="3"
                    height={h}
                    rx="1"
                    fill={i >= 4 ? '#FF6B00' : 'rgba(15,23,42,0.22)'}
                  />
                ))}
              </svg>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-orange-600">
                  Datos
                </p>
                <p className="text-xs font-semibold text-slate-900">Analítica</p>
              </div>
            </div>

            {/* Micro-elemento flotante 3: Nodo de Red Neuronal / IA */}
            <div
              aria-hidden="true"
              style={{ animationDelay: '-4.1s' }}
              className="absolute bottom-[23%] left-0 z-20 flex animate-float items-center gap-2.5 rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-2 shadow-xl backdrop-blur-xl sm:-left-3 xl:-left-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <NeuralNet className="h-4 w-6" />
              <span className="font-mono text-xs font-medium text-slate-800">IA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
