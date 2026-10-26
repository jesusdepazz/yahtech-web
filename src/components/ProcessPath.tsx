"use client";

import { useEffect, useRef, useState } from "react";
import { ChatBubble, PenTool, Rocket, SearchCheck } from "./icons";
import { steps } from "@/lib/site";

const stepIcons = [ChatBubble, PenTool, SearchCheck, Rocket];

type Geometry = {
  horizontal: boolean;
  x: number;
  y: number;
  length: number;
  stops: number[];
};

// Camino que une los centros de los círculos. Cuando la sección aparece en
// pantalla se recorre una vez, tramo por tramo, encendiendo cada paso al llegar.
export function ProcessPath() {
  const listRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const geo = useRef<Geometry | null>(null);
  const done = useRef(false);
  const [track, setTrack] = useState<Geometry | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cancelled = false;

    const scale = (g: Geometry, ratio: number) => (g.horizontal ? `scaleX(${ratio})` : `scaleY(${ratio})`);
    const move = (g: Geometry, px: number) => (g.horizontal ? `translate(${px}px, 0)` : `translate(0, ${px}px)`);

    const measure = () => {
      const box = list.getBoundingClientRect();
      const centers = circleRefs.current.map((c) => {
        const r = c!.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      const horizontal = Math.abs(centers[1].y - centers[0].y) < 4;
      const first = centers[0];
      const stops = centers.map((c) => (horizontal ? c.x - first.x : c.y - first.y));
      const g = { horizontal, x: first.x, y: first.y, length: stops[stops.length - 1], stops };
      geo.current = g;
      setTrack(g);
      if (done.current && fillRef.current) fillRef.current.style.transform = scale(g, 1);
    };

    const finish = () => {
      done.current = true;
      setActive(steps.length);
      if (geo.current && fillRef.current) fillRef.current.style.transform = scale(geo.current, 1);
      if (dotRef.current) dotRef.current.style.opacity = "0";
    };

    const play = async () => {
      const g = geo.current;
      const fill = fillRef.current;
      const dot = dotRef.current;
      if (!g || !fill || !dot) return;
      if (reduced) return finish();
      setActive(1);
      dot.style.opacity = "1";
      await new Promise((r) => setTimeout(r, 350));
      for (let k = 0; k < g.stops.length - 1; k++) {
        if (cancelled) return;
        const from = g.stops[k];
        const to = g.stops[k + 1];
        const timing = { duration: 700, easing: "cubic-bezier(0.65, 0, 0.35, 1)", fill: "forwards" as const };
        fill.animate([{ transform: scale(g, from / g.length) }, { transform: scale(g, to / g.length) }], timing);
        await dot.animate([{ transform: move(g, from) }, { transform: move(g, to) }], timing).finished;
        if (cancelled) return;
        setActive(k + 2);
        await new Promise((r) => setTimeout(r, 220));
      }
      fill.getAnimations().forEach((an) => an.cancel());
      dot.getAnimations().forEach((an) => an.cancel());
      finish();
    };

    measure();
    const resize = new ResizeObserver(measure);
    resize.observe(list);
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen.disconnect();
          play();
        }
      },
      { threshold: 0.6 },
    );
    seen.observe(list);
    return () => {
      cancelled = true;
      resize.disconnect();
      seen.disconnect();
    };
  }, []);

  const trackStyle = track
    ? track.horizontal
      ? { left: track.x, top: track.y - 2, width: track.length, height: 4 }
      : { left: track.x - 2, top: track.y, width: 4, height: track.length }
    : { display: "none" };

  return (
    <div ref={listRef} className="relative mt-14 md:mt-16">
      <div aria-hidden className="pointer-events-none absolute rounded-full bg-navy/10" style={trackStyle}>
        <div
          ref={fillRef}
          className={`path-fill absolute inset-0 rounded-full bg-accent ${
            track?.horizontal ? "origin-left" : "origin-top"
          }`}
          style={{
            transform: `${track?.horizontal ? "scaleX" : "scaleY"}(${active === steps.length ? 1 : 0})`,
          }}
        />
        <div
          ref={dotRef}
          className="path-dot absolute size-3.5 rounded-full bg-cyan ring-4 ring-cyan/30"
          style={{ left: -5, top: -5, opacity: 0 }}
        />
      </div>

      <ol className="flex flex-col gap-10 lg:grid lg:grid-cols-4 lg:gap-8">
        {steps.map((step, i) => {
          const Icon = stepIcons[i];
          const on = i < active;
          return (
            <li
              key={step.title}
              data-on={on}
              className="step-item relative flex gap-5 lg:flex-col lg:gap-6"
            >
              <span
                ref={(el) => {
                  circleRefs.current[i] = el;
                }}
                aria-hidden
                className={`step-circle relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                  on ? "bg-navy text-cyan" : "bg-white text-ink-soft ring-2 ring-navy/15"
                }`}
              >
                {i + 1}
              </span>
              <div className="step-body pt-1 lg:pt-0">
                <h3
                  className={`flex items-center gap-2.5 text-xl font-semibold tracking-[-0.02em] transition-colors duration-500 ${
                    on ? "text-navy" : "text-ink-soft"
                  }`}
                >
                  <Icon className={`size-5.5 transition-colors duration-500 ${on ? "text-accent" : "text-ink-soft/60"}`} />
                  <span>
                    <span className="sr-only">Paso {i + 1}: </span>
                    {step.title}
                  </span>
                </h3>
                <p className="mt-2 max-w-[30ch] leading-relaxed text-ink-soft">{step.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
