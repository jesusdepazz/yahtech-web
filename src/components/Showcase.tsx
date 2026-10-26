/* eslint-disable @next/next/no-img-element */
import { ExternalLink } from "./icons";
import { demos, withBase, type Demo } from "@/lib/site";

// Portafolio con el formato de una galería de plantillas: datos del proyecto
// a la izquierda y tres vistas del sitio a la derecha, sobre una retícula fina.
export function Showcase() {
  return (
    <div className="border-y border-white/10 lg:grid lg:grid-cols-[2.5rem_1fr]">
      <div
        aria-hidden
        className="hatch relative hidden border-r border-white/10 lg:block"
      >
        <span className="absolute left-1/2 top-8 -translate-x-1/2 rotate-180 text-xs font-semibold tracking-[0.2em] text-mist [writing-mode:vertical-rl]">
          PORTAFOLIO
        </span>
      </div>

      <ul>
        {demos.map((demo, i) => (
          <li key={demo.id}>
            {i > 0 && <div aria-hidden className="h-12 border-y border-white/10 md:h-16" />}
            <ShowcaseRow demo={demo} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ShowcaseRow({ demo }: { demo: Demo }) {
  const href = withBase(demo.href);
  return (
    <article
      aria-labelledby={`demo-${demo.id}`}
      className="grid lg:grid-cols-[minmax(0,20rem)_1fr]"
    >
      <div className="flex flex-col border-white/10 lg:border-r">
        <div data-reveal className="px-5 pb-6 pt-8 sm:px-8">
          <h3 id={`demo-${demo.id}`} className="text-xl font-semibold tracking-[-0.02em]">
            {demo.name}
          </h3>
          <p className="mt-1 text-sm font-medium text-cyan">{demo.type}</p>
          <p className="mt-4 max-w-[34ch] leading-relaxed text-mist">{demo.description}</p>
        </div>
        <div className="mt-auto border-t border-white/10 px-5 py-6 sm:px-8">
          <a
            href={href}
            target="_blank"
            rel="noopener"
            aria-label={`Ver demo de ${demo.name} en otra pestaña`}
            className="btn min-h-11 px-5 text-[0.9375rem] text-white ring-1 ring-white/25 hover:bg-white/10"
          >
            Ver demo
            <ExternalLink className="size-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 lg:border-t-0 lg:px-6">
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:px-8 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0">
          <Tile
            href={href}
            src={demo.shots.home}
            label={`Inicio del sitio de ${demo.name} en computadora y celular`}
            mobile={demo.shots.mobile}
            delay={0}
          />
          <Tile
            href={href}
            src={demo.shots.section}
            label={`Sección del sitio de ${demo.name}`}
            delay={90}
          />
          <Tile
            href={href}
            src={demo.shots.detail}
            label={`Otra sección del sitio de ${demo.name}`}
            delay={180}
          />
        </div>
      </div>
    </article>
  );
}

type TileProps = {
  href: string;
  src: string;
  label: string;
  mobile?: string;
  delay: number;
};

function Tile({ href, src, label, mobile, delay }: TileProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      tabIndex={-1}
      aria-hidden
      data-reveal="scale"
      style={{ "--d": `${delay}ms` } as React.CSSProperties}
      className="showcase-tile relative block aspect-[4/3] w-[78%] shrink-0 snap-start overflow-hidden rounded-xl bg-navy-2 ring-1 ring-white/10 sm:w-[46%] lg:w-auto"
    >
      <img
        src={withBase(src)}
        alt={label}
        loading="lazy"
        width={960}
        height={615}
        className="tile-shot absolute left-[7%] top-[8%] w-[93%] rounded-tl-lg shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]"
      />
      {mobile && (
        <img
          src={withBase(mobile)}
          alt=""
          loading="lazy"
          width={390}
          height={844}
          className="tile-phone absolute bottom-[-18%] right-[5%] w-[30%] rounded-lg ring-4 ring-navy shadow-[0_20px_40px_-12px_rgba(0,0,0,0.6)]"
        />
      )}
    </a>
  );
}
