/**
 * Íconos SVG propios: cero dependencias externas y bundle mínimo.
 * Todos heredan el color con `currentColor` y reciben el tamaño por props.
 */
const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

export const Check = (props) => (
  <svg {...base} {...props}>
    <path d="m20 6-11 11-5-5" />
  </svg>
);

export const ArrowRight = (props) => (
  <svg {...base} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Clock = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Users = (props) => (
  <svg {...base} {...props}>
    <path d="M16 19v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 17.5V19" />
    <circle cx="10" cy="8" r="3.2" />
    <path d="M20 19v-1.5a3.5 3.5 0 0 0-2.6-3.4M15.4 5.2a3.2 3.2 0 0 1 0 5.6" />
  </svg>
);

export const Screen = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="4" width="18" height="12.5" rx="2" />
    <path d="M9 20h6M12 16.5V20" />
  </svg>
);

export const Target = (props) => (
  <svg {...base} {...props}>
    <circle cx="12" cy="12" r="8.5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="12" cy="12" r="1" fill="currentColor" />
  </svg>
);

export const Spark = (props) => (
  <svg {...base} {...props}>
    <path d="M12 3.5 13.9 9l5.6 1.9-5.6 1.9L12 18.4l-1.9-5.6L4.5 10.9 10.1 9 12 3.5Z" />
  </svg>
);

export const Clipboard = (props) => (
  <svg {...base} {...props}>
    <rect x="5" y="4.5" width="14" height="16" rx="2.2" />
    <path d="M9 4.5V3.8A1.3 1.3 0 0 1 10.3 2.5h3.4A1.3 1.3 0 0 1 15 3.8v.7M9 11h6M9 15h4" />
  </svg>
);

export const FileText = (props) => (
  <svg {...base} {...props}>
    <path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z" />
    <path d="M13.5 3v5.5H19M9 13h6M9 16.5h4" />
  </svg>
);

export const Chart = (props) => (
  <svg {...base} {...props}>
    <path d="M4 20h16M7.5 20v-6M12 20V7M16.5 20v-9" />
  </svg>
);

export const Menu = (props) => (
  <svg {...base} {...props}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const Close = (props) => (
  <svg {...base} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const Building = (props) => (
  <svg {...base} {...props}>
    <rect x="4" y="3.5" width="16" height="17" rx="2" />
    <path d="M8.5 8h2M13.5 8h2M8.5 12h2M13.5 12h2M10 20.5v-4h4v4" />
  </svg>
);

export const Search = (props) => (
  <svg {...base} {...props}>
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m20 20-4.6-4.6" />
  </svg>
);

export const Cap = (props) => (
  <svg {...base} {...props}>
    <path d="M12 4 2.5 8.8 12 13.6l9.5-4.8L12 4Z" />
    <path d="M6.6 11v4.6c0 1.6 2.4 2.9 5.4 2.9s5.4-1.3 5.4-2.9V11M21.5 8.8v5.4" />
  </svg>
);

export const Pulse = (props) => (
  <svg {...base} {...props}>
    <path d="M3 12.5h3.4l2-5 3.2 10 2.4-7 1.8 4h5.2" />
  </svg>
);

export const Trend = (props) => (
  <svg {...base} {...props}>
    <path d="M4 16.5 9.5 11l3.5 3.4L20 7.5" />
    <path d="M15 7.5h5v5" />
  </svg>
);

export const WhatsApp = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.41a8.19 8.19 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.16 0-.43.06-.65.31-.23.24-.86.84-.86 2.05s.88 2.38 1 2.54c.13.17 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.29Z" />
  </svg>
);

export const Instagram = (props) => (
  <svg {...base} {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </svg>
);

/** Mapa consultado por las secciones que reciben el nombre del ícono desde el JSON. */
export const iconMap = {
  clipboard: Clipboard,
  users: Users,
  file: FileText,
  chart: Chart,
  search: Search,
  cap: Cap,
  pulse: Pulse,
  building: Building,
  trend: Trend,
  target: Target,
};
