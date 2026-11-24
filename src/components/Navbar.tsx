import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logoPadia from '../logopadia.png';
import { adminLink, navLinks } from '@/lib/site';

/** Secciones observadas (de abajo hacia arriba) y el enlace que activan. */
const sectionToLink = [
  { id: 'projects', href: '#projects' },
  { id: 'members', href: '#about' },
  { id: 'activities', href: '#activities' },
  { id: 'about', href: '#about' },
];

/** Logo con isotipo naranja original y texto PADIA contrastado sobre #F4F7FA. */
const NavLogo = () => (
  <span className="relative block h-8 overflow-hidden">
    <img
      src={logoPadia}
      alt="Logo PADIA"
      className="-my-4 -ml-1.5 h-16 w-auto max-w-none [clip-path:inset(0_66%_0_0)]"
    />
    <img
      src={logoPadia}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -my-4 -ml-1.5 h-16 w-auto max-w-none brightness-0 opacity-90 [clip-path:inset(0_0_0_34%)]"
    />
  </span>
);

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState('#');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
      const current = sectionToLink.find(({ id }) => {
        const el = document.getElementById(id);
        return el ? el.getBoundingClientRect().top <= 140 : false;
      });
      setActiveHref(current ? current.href : '#');
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 z-50">
      <div className="page-container">
        <div
          className={`flex w-full items-center justify-between gap-4 rounded-full border px-5 py-3 backdrop-blur-md transition-all duration-300 sm:px-8 ${
            isScrolled
              ? 'border-slate-200/90 bg-white/90 shadow-[0_10px_40px_-10px_rgba(15,23,42,0.1)]'
              : 'border-slate-200/70 bg-white/65'
          }`}
        >
        <a href="#" aria-label="Inicio" className="shrink-0 rounded-md">
          <NavLogo />
        </a>

        {/* Enlaces centrales */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                aria-current={isActive ? 'location' : undefined}
                className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'bg-slate-900/[0.06] text-slate-900' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={`absolute bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-padia-orange transition-opacity duration-200 ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Admin */}
        <Link
          to={adminLink.href}
          className="hidden md:inline-flex rounded-full bg-slate-900/[0.05] px-4 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-900/[0.09] hover:text-slate-900"
        >
          {adminLink.label}
        </Link>

        {/* Botón móvil */}
        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((open) => !open)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/[0.05] text-slate-800 transition-colors hover:bg-slate-900/10"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
        </div>

        {/* Panel móvil */}
        {isMobileMenuOpen && (
          <nav
            aria-label="Navegación móvil"
            className="surface mt-3 w-full rounded-2xl p-2 shadow-[0_20px_50px_-10px_rgba(15,23,42,0.15)] md:hidden"
          >
          {navLinks.map((link) => {
            const isActive = activeHref === link.href;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive ? 'bg-slate-900/[0.06] text-slate-900' : 'text-slate-600 hover:bg-slate-900/[0.04] hover:text-slate-900'
                }`}
              >
                {link.label}
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-padia-orange" />}
              </a>
            );
          })}
          <div className="my-2 h-px bg-slate-200/80" />
          <Link
            to={adminLink.href}
            onClick={closeMenu}
            className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-900/[0.04] hover:text-slate-900"
          >
            {adminLink.label}
          </Link>
        </nav>
      )}
      </div>
    </header>
  );
};
