import React from "react";

type P = React.SVGProps<SVGSVGElement>;

const base = (props: P): P => ({
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  ...props,
});

const paths: Record<string, React.ReactNode> = {
  brain: <><path d="M12 5a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V17a2 2 0 0 0 4 0" /><path d="M12 5a3 3 0 0 1 3 3 3 3 0 0 1 1 5.8V17a2 2 0 0 1-4 0" /><path d="M12 5V19" /></>,
  stethoscope: <><path d="M6 3v5a4 4 0 0 0 8 0V3" /><path d="M6 3H4M14 3h2" /><path d="M10 16v1a4 4 0 0 0 8 0v-2" /><circle cx="19" cy="13" r="2" /></>,
  scope: <><circle cx="11" cy="11" r="6" /><path d="M11 8v6M8 11h6" opacity="0.5" /><path d="M16 16l4 4" /></>,
  waveform: <><path d="M3 12h2l2-6 3 13 3-16 3 12 2-3h3" /></>,
  target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="1" fill="currentColor" /></>,
  ct: <><circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" opacity="0.4" /><circle cx="12" cy="12" r="3.5" /></>,
  layers: <><path d="M12 3l9 5-9 5-9-5 9-5Z" /><path d="M3 13l9 5 9-5" /></>,
  chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M21 21l-4-4" /></>,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  chat: <><path d="M4 5h16v11H8l-4 4V5Z" /><path d="M8 10h8M8 13h5" opacity="0.6" /></>,
  support: <><circle cx="12" cy="12" r="9" /><path d="M9 12a3 3 0 1 1 4 2.8c-.7.3-1 .8-1 1.7M12 18h.01" /></>,
  mobile: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></>,
  shield: <><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3Z" /><path d="M9.5 12l2 2 3.5-4" opacity="0.7" /></>,
  flask: <><path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 2 3h10a2 2 0 0 0 2-3l-5-9V3" /><path d="M7.5 15h9" opacity="0.6" /></>,
  chess: <><path d="M9 21h6M8 21l1-4h6l1 4M10 17c-1-2-1-4 0-6M14 17c1-2 1-4 0-6" /><circle cx="12" cy="6" r="2.5" /></>,
  football: <><circle cx="12" cy="12" r="9" /><path d="M12 7l4 3-1.5 5h-5L8 10l4-3Z" /></>,
  travel: <><path d="M3 16l7-2 4-9 2 1-2 7 5-1 1 2-16 5-1-2 1-3-3 1-1-1Z" /></>,
  camera: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7l1.5-3h5L16 7" /><circle cx="12" cy="13" r="3.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18" opacity="0.6" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></>,
  building: <><rect x="4" y="3" width="16" height="18" rx="1.5" /><path d="M9 7h.01M15 7h.01M9 11h.01M15 11h.01M9 15h.01M15 15h.01M10 21v-3h4v3" opacity="0.8" /></>,
  pin: <><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Z" /><circle cx="12" cy="10" r="2.5" /></>,
  scholar: <><path d="M12 4 2 9l10 5 10-5-10-5Z" /><path d="M6 11v4c0 1.5 2.7 3 6 3s6-1.5 6-3v-4" /></>,
  external: <><path d="M14 4h6v6M20 4l-9 9M19 13v6H5V5h6" /></>,
  download: <><path d="M12 3v12M7 11l5 5 5-5M5 21h14" /></>,
  github: <><path d="M9 19c-4 1.4-4-2.2-6-2.8M15 21v-3.4c0-1 .2-1.4-.5-2 2.6-.3 5.3-1.3 5.3-5.8a4.5 4.5 0 0 0-1.2-3.1 4.2 4.2 0 0 0-.1-3.2s-1-.3-3.3 1.2a11.4 11.4 0 0 0-6 0C6.9 1.4 5.9 1.7 5.9 1.7a4.2 4.2 0 0 0-.1 3.2A4.5 4.5 0 0 0 4.6 8c0 4.5 2.7 5.5 5.3 5.8-.4.4-.6.9-.6 1.6V21" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" /></>,
  orcid: <><circle cx="12" cy="12" r="9" /><path d="M9 8v8M9 6v.01M13 8v8M13 8h2a4 4 0 0 1 0 8h-2" opacity="0.9" /></>,
  award: <><circle cx="12" cy="9" r="5" /><path d="M9 13l-1.5 8L12 18l4.5 3L15 13" /></>,
};

export function Icon({ name, ...props }: { name: string } & P) {
  const content = paths[name] ?? paths.target;
  return <svg {...base(props)}>{content}</svg>;
}
