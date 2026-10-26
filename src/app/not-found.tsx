import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { ArrowRight, WhatsApp } from "@/components/icons";
import { generalMessage, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Página no encontrada | yahtech",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <header className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 md:h-20 lg:px-8">
        <Link href="/" aria-label="yahtech, ir al inicio" className="rounded-lg">
          <Logo />
        </Link>
      </header>

      <main className="mx-auto grid min-h-[calc(100svh-5rem)] max-w-6xl items-center gap-12 px-4 pb-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        <div>
          <h1
            data-rise
            className="max-w-[13ch] text-[clamp(2.6rem,5vw+1rem,4.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
          >
            Esta página se perdió en el camino
          </h1>
          <p
            data-rise
            style={{ "--d": "160ms" } as React.CSSProperties}
            className="mt-6 max-w-[40ch] text-lg leading-relaxed text-ink-soft"
          >
            Error 404: el enlace que seguiste no existe o cambió de lugar. Volvé al inicio o escribinos si
            buscabas algo en particular.
          </p>
          <div
            data-rise
            style={{ "--d": "240ms" } as React.CSSProperties}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/" className="btn btn-primary">
              Volver al inicio
              <ArrowRight className="btn-arrow size-4.5" />
            </Link>
            <a
              href={whatsappLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              <WhatsApp className="size-5" />
              Escribinos
            </a>
          </div>
        </div>

        {/* El símbolo con su nodo celeste suelto: la Y "sin conexión". */}
        <div data-rise style={{ "--d": "200ms" } as React.CSSProperties} aria-hidden className="mx-auto w-full max-w-sm">
          <svg viewBox="0 0 120 120" className="w-full">
            <rect x="4" y="4" width="112" height="112" rx="30" fill="#0B2A4A" />
            <path
              d="M36 34 L60 60 M60 60 L60 90 M60 60 L70 49"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="10"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="36" cy="34" r="9" fill="#FFFFFF" />
            <circle cx="60" cy="90" r="9" fill="#FFFFFF" />
            <g className="lost-node">
              <circle cx="92" cy="26" r="11" fill="#22D3EE" />
              <circle cx="92" cy="26" r="4.5" fill="#0B2A4A" />
            </g>
          </svg>
        </div>
      </main>

      <WhatsAppFloat />
    </>
  );
}
