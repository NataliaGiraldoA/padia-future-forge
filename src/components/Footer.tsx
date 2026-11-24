import { Instagram } from 'lucide-react';
import logoPadia from '../logopadia.png';
import { instagramUrl } from '@/lib/site';

export const Footer = () => (
  <footer className="relative z-10 border-t border-slate-300/70 bg-[#EAEAE6] py-10 sm:py-12">
    <div className="mx-auto w-[90%] max-w-5xl">
      {/* Fila superior: Identidad a la izquierda + Botón cuadrado de Instagram a la derecha */}
      <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <div>
          <span className="relative block h-12 overflow-hidden sm:h-14">
            <img
              src={logoPadia}
              alt="Logo PADIA"
              className="-my-6 -ml-2.5 h-24 w-auto max-w-none [clip-path:inset(0_66%_0_0)] sm:-my-7 sm:h-28"
            />
            <img
              src={logoPadia}
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -my-6 -ml-2.5 h-24 w-auto max-w-none brightness-0 opacity-90 [clip-path:inset(0_0_0_34%)] sm:-my-7 sm:h-28"
            />
          </span>
          <p className="mt-2.5 text-base font-medium leading-snug text-slate-700 sm:text-lg">
            Semillero de Programación, Analítica de Datos e IA
            <br />
            Universidad de San Buenaventura Cali
          </p>
        </div>

        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram de PADIA"
          className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-slate-300/80 bg-white/90 text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-padia-orange/50 hover:text-padia-orange"
        >
          <Instagram className="h-6 w-6" />
        </a>
      </div>

      {/* Línea divisoria inferior + Copyright y By PADIA */}
      <div className="mt-7 flex flex-col items-start justify-between gap-3 border-t border-slate-300/70 pt-5 text-sm sm:flex-row sm:items-center sm:text-base">
        <p className="text-slate-600">
          © {new Date().getFullYear()} Semillero PADIA. Universidad de San Buenaventura Cali.
        </p>
        <p className="font-bold text-padia-orange">By PADIA</p>
      </div>
    </div>
  </footer>
);
