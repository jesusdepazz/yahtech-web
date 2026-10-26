"use client";

import { useState } from "react";
import { faqs } from "@/lib/site";

// Acordeón con una sola respuesta abierta a la vez.
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="rounded-2xl bg-white">
            <h3>
              <button
                type="button"
                id={`faq-boton-${i}`}
                aria-expanded={isOpen}
                aria-controls={`faq-respuesta-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-5 text-left text-lg font-semibold tracking-[-0.01em] text-navy sm:px-7"
              >
                {item.q}
                <svg
                  viewBox="0 0 24 24"
                  className="faq-icon size-5 shrink-0 text-accent"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  aria-hidden
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </h3>
            <div
              id={`faq-respuesta-${i}`}
              role="region"
              aria-labelledby={`faq-boton-${i}`}
              data-open={isOpen}
              inert={!isOpen}
              className="faq-panel"
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 leading-relaxed text-ink-soft sm:px-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
