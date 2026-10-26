"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { demos, withBase, type Demo } from "@/lib/site";

type DemoId = Demo["id"];

// Vista de las demos: captura de escritorio en una ventana con la versión
// de celular encima. Rota sola hasta que la persona elige una pestaña.
export function HeroPreview() {
  const [active, setActive] = useState<DemoId>(demos[0].id);
  const [auto, setAuto] = useState(true);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!auto) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setActive((current) => {
        const i = demos.findIndex((d) => d.id === current);
        return demos[(i + 1) % demos.length].id;
      });
    }, 4500);
    return () => window.clearInterval(timer);
  }, [auto]);

  const select = (id: DemoId) => {
    setAuto(false);
    setActive(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % demos.length;
    else if (e.key === "ArrowLeft") next = (index - 1 + demos.length) % demos.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = demos.length - 1;
    else return;
    e.preventDefault();
    select(demos[next].id);
    tabRefs.current[next]?.focus();
  };

  const current = demos.find((d) => d.id === active)!;

  return (
    <div data-ui className="w-full">
      <div
        role="tablist"
        aria-label="Demos de páginas web"
        className="mb-4 inline-flex rounded-full bg-ground-2 p-1"
      >
        {demos.map((demo, i) => {
          const selected = demo.id === active;
          return (
            <button
              key={demo.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${demo.id}`}
              aria-selected={selected}
              aria-controls="vista-previa"
              tabIndex={selected ? 0 : -1}
              onClick={() => select(demo.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                selected ? "bg-navy text-white" : "text-ink-soft hover:text-navy"
              }`}
            >
              {demo.tab}
            </button>
          );
        })}
      </div>

      <div id="vista-previa" role="tabpanel" aria-labelledby={`tab-${active}`} className="relative pb-[9%] pr-[7%]">
        <a
          href={withBase(current.href)}
          target="_blank"
          rel="noopener"
          aria-label={`Abrir la demo de ${current.name} en otra pestaña`}
          className="hero-window group block overflow-hidden rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(11,42,74,0.45),0_12px_24px_-16px_rgba(11,42,74,0.2)]"
        >
          <div className="flex items-center gap-3 bg-navy px-4 py-3">
            <div className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-white/25" />
              <span className="size-2.5 rounded-full bg-cyan" />
            </div>
            <div className="flex-1 truncate rounded-full bg-white/10 px-3 py-1 text-xs text-mist">
              {current.domain}
            </div>
            <svg viewBox="0 0 24 24" className="size-4 text-mist transition-colors group-hover:text-white" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
            </svg>
          </div>
          <div className="relative grid aspect-[1280/820] bg-ground-2">
            {demos.map((demo) => (
              <img
                key={demo.id}
                src={withBase(demo.shots.home)}
                alt={demo.id === active ? `Inicio del sitio de ${demo.name}` : ""}
                aria-hidden={demo.id !== active}
                data-active={demo.id === active}
                width={960}
                height={615}
                className="preview-pane col-start-1 row-start-1 size-full object-cover object-top"
              />
            ))}
          </div>
        </a>

        <div
          aria-hidden
          className="absolute bottom-0 right-0 grid w-[27%] overflow-hidden rounded-[1.1rem] bg-navy p-1.5 shadow-[0_24px_48px_-16px_rgba(11,42,74,0.55)]"
        >
          {demos.map((demo) => (
            <img
              key={demo.id}
              src={withBase(demo.shots.mobile)}
              alt=""
              data-active={demo.id === active}
              width={390}
              height={844}
              className="preview-pane col-start-1 row-start-1 aspect-[390/700] w-full rounded-xl object-cover object-top"
            />
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-soft">
        {current.type}. Demo básica con un negocio ficticio.
      </p>
    </div>
  );
}
