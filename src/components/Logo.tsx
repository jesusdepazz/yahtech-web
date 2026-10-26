type SymbolProps = { className?: string; title?: string };

export function LogoSymbol({ className, title }: SymbolProps) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <rect x="4" y="4" width="112" height="112" rx="30" fill="#0B2A4A" />
      <path
        d="M36 34 L60 60 L84 34 M60 60 L60 90"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="36" cy="34" r="9" fill="#FFFFFF" />
      <circle cx="60" cy="90" r="9" fill="#FFFFFF" />
      <circle cx="84" cy="34" r="11" fill="#22D3EE" />
      <circle cx="84" cy="34" r="4.5" fill="#0B2A4A" />
    </svg>
  );
}

type LogoProps = { size?: "md" | "lg"; className?: string };

export function Logo({ size = "md", className = "" }: LogoProps) {
  const lg = size === "lg";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoSymbol className={lg ? "size-14" : "size-9"} />
      <span
        className={`leading-none tracking-[-0.03em] ${lg ? "text-4xl" : "text-[1.4rem]"}`}
      >
        <span className="font-extrabold text-navy">yah</span>
        <span className="font-medium text-accent">tech</span>
      </span>
      <span
        className={`rounded-md bg-navy font-bold leading-none tracking-wider text-cyan ${
          lg ? "px-2 py-1.5 text-sm" : "px-1.5 py-1 text-[0.625rem]"
        }`}
      >
        GT
      </span>
    </span>
  );
}
