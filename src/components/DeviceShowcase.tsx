"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { demos, withBase, type Demo } from "@/lib/site";

type DeviceId = "celular" | "tablet" | "computadora";

const devices: {
  id: DeviceId;
  name: string;
  text: string;
  shot: keyof Demo["shots"];
  icon: ReactNode;
}[] = [
  {
    id: "celular",
    name: "Celular",
    text: "La mayoría de tus clientes te va a encontrar desde el teléfono. Diseñamos primero para una pantalla pequeña y un pulgar.",
    shot: "mobile",
    icon: <path d="M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" />,
  },
  {
    id: "tablet",
    name: "Tablet",
    text: "Los textos, las fotos y los botones se reacomodan para aprovechar el espacio sin verse estirados.",
    shot: "tablet",
    icon: <path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM11 18h2" />,
  },
  {
    id: "computadora",
    name: "Computadora",
    text: "En pantallas grandes tu marca luce completa, con espacio para tus fotos, tu menú o tu catálogo.",
    shot: "home",
    icon: <path d="M4 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v10H4zM2 19h20M9 15l-1 4M15 15l1 4" />,
  },
];

// Selector de dispositivo a la izquierda y el dispositivo a la derecha. Dentro
// de la pantalla las demos se van turnando: la nueva sube desde abajo y la
// anterior se aleja con un leve desenfoque.
export function DeviceShowcase() {
  const [device, setDevice] = useState<DeviceId>("celular");
  const [screen, setScreen] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setScreen((s) => s + 1);
    }, 3200);
    return () => window.clearInterval(timer);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % devices.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + devices.length) % devices.length;
    else return;
    e.preventDefault();
    setDevice(devices[next].id);
    tabRefs.current[next]?.focus();
  };

  const current = devices.find((d) => d.id === device)!;
  const active = screen % demos.length;
  const previous = (screen - 1 + demos.length) % demos.length;

  return (
    <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-16">
      <div
        role="tablist"
        aria-label="Tipo de pantalla"
        aria-orientation="vertical"
        className="flex gap-2 overflow-x-auto lg:flex-col lg:gap-3 lg:overflow-visible"
      >
        {devices.map((d, i) => {
          const selected = d.id === device;
          return (
            <button
              key={d.id}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`dispositivo-${d.id}`}
              aria-selected={selected}
              aria-controls="pantalla-dispositivo"
              tabIndex={selected ? 0 : -1}
              onClick={() => setDevice(d.id)}
              onKeyDown={(e) => onKeyDown(e, i)}
              className={`device-tab flex shrink-0 items-center gap-3 rounded-2xl px-4 py-3 text-left transition-colors duration-200 lg:items-start lg:gap-4 lg:p-6 ${
                selected ? "bg-navy text-white" : "text-navy hover:bg-ground-2"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className={`size-6 shrink-0 ${selected ? "text-cyan" : "text-accent"}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                {d.icon}
              </svg>
              <span>
                <span className="block font-semibold lg:text-lg">{d.name}</span>
                <span
                  className={`mt-1.5 hidden text-[0.9375rem] leading-relaxed lg:block ${
                    selected ? "text-mist" : "text-ink-soft"
                  }`}
                >
                  {d.text}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div
        id="pantalla-dispositivo"
        role="tabpanel"
        aria-labelledby={`dispositivo-${device}`}
        className="relative flex min-h-[30rem] items-center justify-center overflow-hidden rounded-3xl bg-navy px-4 py-12 sm:min-h-[36rem]"
      >
        <Rings />
        <p className="sr-only">
          {current.name}: {current.text} Se muestran las demos {demos.map((d) => d.name).join(", ")}.
        </p>

        <div aria-hidden className="relative z-10 w-full">
          <Frame device={device}>
            {demos.map((demo, i) => (
              <img
                key={demo.id}
                src={withBase(demo.shots[current.shot])}
                alt=""
                data-state={i === active ? "active" : i === previous ? "previous" : "next"}
                className="device-screen absolute inset-0 size-full object-cover object-top"
              />
            ))}
          </Frame>
        </div>

        <p className="absolute bottom-4 left-0 right-0 z-10 text-center text-xs text-mist">
          {demos[active].name} · demo básica
        </p>
      </div>

      <p className="-mt-6 text-[0.9375rem] leading-relaxed text-ink-soft lg:hidden">{current.text}</p>
    </div>
  );
}

// Marco de cada dispositivo dibujado con CSS: no depende de imágenes.
function Frame({ device, children }: { device: DeviceId; children: ReactNode }) {
  if (device === "celular") {
    return (
      <div key="celular" className="device-in mx-auto w-[min(15rem,62vw)] rounded-[2.6rem] bg-[#0a1a2c] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
        <div className="relative aspect-[390/844] overflow-hidden rounded-[2.1rem] bg-white">
          {children}
          <span className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0a1a2c]" />
        </div>
      </div>
    );
  }
  if (device === "tablet") {
    return (
      <div key="tablet" className="device-in mx-auto w-[min(24rem,80vw)] rounded-[2rem] bg-[#0a1a2c] p-3 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-1 ring-white/15">
        <div className="relative aspect-[768/1024] overflow-hidden rounded-[1.25rem] bg-white">{children}</div>
      </div>
    );
  }
  return (
    <div key="computadora" className="device-in mx-auto w-full max-w-[40rem]">
      <div className="rounded-t-2xl bg-[#0a1a2c] p-2.5 pb-3 ring-1 ring-white/15">
        <div className="relative aspect-[1280/820] overflow-hidden rounded-md bg-white">{children}</div>
      </div>
      <div className="relative mx-[-6%] h-4 rounded-b-xl bg-[#1d3a5c] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)]">
        <span className="absolute left-1/2 top-0 h-1.5 w-24 -translate-x-1/2 rounded-b-lg bg-[#0a1a2c]" />
      </div>
    </div>
  );
}

// Anillos concéntricos que giran despacio detrás del dispositivo.
function Rings() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 600 600"
      className="rings pointer-events-none absolute left-1/2 top-1/2 w-[46rem] max-w-none -translate-x-1/2 -translate-y-1/2"
    >
      {[90, 150, 210, 270].map((r, i) => (
        <circle
          key={r}
          cx="300"
          cy="300"
          r={r}
          fill="none"
          stroke="#22D3EE"
          strokeOpacity={0.22 - i * 0.04}
          strokeWidth="1"
          strokeDasharray={i % 2 ? "2 10" : undefined}
        />
      ))}
      <circle cx="300" cy="30" r="5" fill="#22D3EE" />
      <circle cx="300" cy="510" r="3" fill="#22D3EE" fillOpacity="0.6" />
    </svg>
  );
}
