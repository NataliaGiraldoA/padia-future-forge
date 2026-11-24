import isotipo from '../icon.png';
import { SpotlightCard } from './SpotlightCard';

export const CTASection = () => (
  <section className="w-full pt-8">
    <SpotlightCard
      as="div"
      className="relative w-full overflow-hidden border-y border-padia-orange/25 bg-gradient-to-b from-white via-[#FFF9F5] to-[#F3F3F1] px-6 py-16 text-center shadow-[0_20px_50px_-15px_rgba(255,107,0,0.1)] backdrop-blur-xl sm:px-12 sm:py-20 lg:px-20 lg:py-24"
    >
      {/* Filo de luz superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-padia-orange/70 to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-56 w-2/3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-padia-orange/12 blur-3xl"
      />

      <div className="page-container relative">
        <img
          src={isotipo}
          alt=""
          aria-hidden="true"
          className="relative mx-auto mb-6 h-12 w-12 select-none"
        />

        <div className="relative mb-5">
          <span className="tech-badge">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-orange-500 animate-pulse" />
            Semillero PADIA · USB Cali
          </span>
        </div>

        <h2 className="relative mx-auto w-full pb-2 text-4xl tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.06]">
          <span className="font-light text-slate-700">Construyamos el </span>
          <span className="font-extrabold editorial-gradient-text">futuro juntos</span>
        </h2>

        <p className="relative mx-auto mt-5 max-w-4xl text-lg leading-relaxed text-slate-600 sm:text-xl">
          Únete a nuestra comunidad de innovadores y forma parte del semillero que está transformando la tecnología
          en la Universidad San Buenaventura Cali.
        </p>
      </div>
    </SpotlightCard>
  </section>
);
