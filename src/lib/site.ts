export interface NavItem {
  label: string;
  href: string;
}

/** Enlaces de navegación compartidos por Navbar y Footer. */
export const navLinks: NavItem[] = [
  { label: 'Inicio', href: '#' },
  { label: 'Nosotros', href: '#about' },
  { label: 'Actividades', href: '#activities' },
  { label: 'Proyectos', href: '#projects' },
];

export const adminLink: NavItem = { label: 'Admin', href: '/admin' };

export const instagramUrl = 'https://www.instagram.com/padiausb/';

/** Iniciales a partir de las dos primeras palabras del nombre (p. ej. "Mariana Cruz" → "MC"). */
export const getInitials = (name: string): string =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');