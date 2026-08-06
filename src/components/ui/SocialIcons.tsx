type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M14 8.5h2V5.5h-2c-2.2 0-3.5 1.4-3.5 3.5v2H8.5v3H10.5V21h3v-7h2.2l.5-3H13.5V9.2c0-.5.3-.7.7-.7Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 3.5a8.5 8.5 0 0 0-7.35 12.75L3.5 20.5l4.4-1.15A8.5 8.5 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 8.4c.2-.45.4-.46.6-.46h.5c.16 0 .38 0 .55.42.2.5.68 1.7.74 1.83.06.13.1.28.02.45-.08.17-.13.27-.25.42-.13.16-.27.35-.38.47-.13.13-.26.28-.12.53.15.25.65 1.08 1.4 1.75.96.86 1.77 1.13 2.02 1.25.25.13.4.11.55-.06.15-.17.63-.72.8-.97.16-.25.33-.2.55-.12.23.08 1.44.68 1.68.8.25.13.4.19.47.3.06.11.06.65-.16 1.28-.22.63-1.28 1.2-1.75 1.24-.46.05-.9.23-2.98-.63-2.5-1.06-4.09-3.63-4.21-3.8-.13-.16-1-1.32-1-2.53s.65-1.8.87-2.05Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
