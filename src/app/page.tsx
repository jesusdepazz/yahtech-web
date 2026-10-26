import { HeroPreview } from "@/components/HeroPreview";
import { Logo, LogoSymbol } from "@/components/Logo";
import { Navbar } from "@/components/Navbar";
import { RevealObserver } from "@/components/RevealObserver";
import { SectionLinks } from "@/components/SectionLinks";
import { Showcase } from "@/components/Showcase";
import { ProcessPath } from "@/components/ProcessPath";
import { DeviceShowcase } from "@/components/DeviceShowcase";
import { ChatbotDemo } from "@/components/ChatbotDemo";
import { Faq } from "@/components/Faq";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import {
  ArrowRight,
  ChatBubble,
  Check,
  Instagram,
  MapPin,
  WhatsApp,
} from "@/components/icons";
import {
  about,
  chatbot,
  generalMessage,
  services,
  site,
  sectionLink,
  whatsappLink,
  withBase,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      <a
        {...sectionLink("contenido")}
        className="sr-only z-[60] rounded-full bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <Services />
        <Chatbots />
        <Process />
        <Portfolio />
        <Adaptable />
        <About />
        <Questions />
        <Closing />
      </main>
      <Footer />
      <WhatsAppFloat />
      <RevealObserver />
      <SectionLinks />
    </>
  );
}

const highlights = [
  "A la medida de tu marca",
  "Impecables en cualquier pantalla",
  "Listas para aparecer en Google",
];

function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-inicio"
      className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-28 sm:px-6 md:pt-36 lg:min-h-[100svh] lg:grid-cols-[1.15fr_1fr] lg:gap-14 lg:px-8 lg:pb-24 lg:pt-28"
    >
      <div>
        <h1
          id="titulo-inicio"
          data-rise
          className="max-w-[14ch] text-[clamp(2.6rem,4.6vw+1rem,4.25rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
        >
          Páginas web modernas para tu negocio
        </h1>
        <p
          data-rise
          style={{ "--d": "90ms" } as React.CSSProperties}
          className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Diseño y desarrollo de sitios elegantes, funcionales y a la medida de tu
          marca.
        </p>
        <div
          data-rise
          style={{ "--d": "180ms" } as React.CSSProperties}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <WhatsApp className="size-5" />
            Cotizá tu página
          </a>
          <a {...sectionLink("servicios")} className="btn btn-secondary">
            Ver servicios
            <ArrowRight className="btn-arrow size-4.5" />
          </a>
        </div>
        <ul
          data-rise
          style={{ "--d": "270ms" } as React.CSSProperties}
          className="mt-10 flex flex-col gap-3 text-[0.9375rem] font-medium text-navy sm:flex-row sm:flex-wrap sm:gap-x-6"
        >
          {highlights.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <Check className="size-4 shrink-0 text-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div
        data-rise
        style={{ "--d": "200ms" } as React.CSSProperties}
        className="w-full max-w-xl lg:max-w-none"
      >
        <HeroPreview />
      </div>
    </section>
  );
}

function Services() {
  return (
    <section
      id="servicios"
      aria-labelledby="titulo-servicios"
      // El menú fijo tapa el relleno superior: así la sección completa entra en pantalla.
      style={{ scrollMarginTop: "-5rem" }}
      className="on-dark bg-navy py-20 text-white md:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
          <h2
            id="titulo-servicios"
            data-reveal
            className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em]"
          >
            Servicios
          </h2>
          <p
            data-reveal
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="max-w-[54ch] text-lg leading-relaxed text-mist"
          >
            Tres formas de llevar tu negocio a internet, todas con un chatbot básico
            incluido. Cada sitio se diseña desde cero con tus colores, tus textos y lo que
            tus clientes necesitan encontrar.
          </p>
        </div>

        <ul className="mt-10 grid gap-5 md:mt-12 lg:grid-cols-3">
          {services.map((service, i) => (
            <li
              key={service.id}
              data-reveal
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <article
                aria-labelledby={`servicio-${service.id}`}
                className="service-card flex h-full flex-col rounded-2xl bg-navy-2 p-6 sm:p-7"
              >
                <h3
                  id={`servicio-${service.id}`}
                  className="text-[1.375rem] font-semibold tracking-[-0.02em]"
                >
                  {service.name}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-mist">{service.description}</p>

                <p className="mt-5 text-sm font-semibold text-cyan">Incluye</p>
                <ul className="mt-2.5 flex flex-col gap-2">
                  {service.includes.map((item) => (
                    <li key={item} className="flex gap-2.5 text-sm leading-snug">
                      <Check className="mt-0.5 size-4 shrink-0 text-cyan" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <div className="rounded-xl bg-white/5 p-3.5 ring-1 ring-cyan/25 lg:min-h-[6.25rem]">
                    <p className="flex items-center gap-2 text-sm font-semibold text-cyan">
                      <ChatBubble className="size-4" />
                      Chatbot básico incluido
                    </p>
                    <p className="mt-1 text-[0.8125rem] leading-snug text-mist">{service.chatbot}</p>
                  </div>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className="text-sm text-mist">Desde</span>
                    <span className="text-[1.75rem] font-bold tracking-[-0.02em]">
                      {service.price}
                    </span>
                  </p>
                  <p className="mt-1 text-[0.8125rem] leading-snug text-mist lg:min-h-[2.75em]">
                    {service.hostingNote}
                  </p>
                  <a
                    href={whatsappLink(service.message)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Cotizar ${service.name} por WhatsApp`}
                    className="btn btn-cyan mt-4 w-full"
                  >
                    <WhatsApp className="size-5" />
                    Cotizar por WhatsApp
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p
          data-reveal
          className="mt-10 text-center text-[0.9375rem] leading-relaxed text-mist"
        >
          Precios en quetzales. El costo de hosting y dominio depende del tipo de
          sitio que contratés y se cotiza por separado.
          <br />
          ¿No sabés cuál elegir?{" "}
          <a
            href={whatsappLink(
              "Hola yahtech, quiero una página web pero no sé qué tipo me conviene. ¿Me ayudan a decidir?",
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-cyan underline decoration-cyan/40 underline-offset-4 transition-colors hover:decoration-cyan"
          >
            Escribinos y te ayudamos a decidir
          </a>
        </p>
      </div>
    </section>
  );
}

function Chatbots() {
  return (
    <section id="chatbots" aria-labelledby="titulo-chatbots" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:px-8">
        <div>
          <h2
            id="titulo-chatbots"
            data-reveal
            className="max-w-[18ch] text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
          >
            Chatbot avanzado para tus redes
          </h2>
          <p
            data-reveal
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="mt-6 max-w-[48ch] text-lg leading-relaxed text-ink-soft"
          >
            Todos nuestros paquetes ya incluyen un chatbot básico. La versión avanzada contesta
            al mismo tiempo en WhatsApp, Instagram y Messenger, toma pedidos o citas dentro del
            chat y te pasa la conversación cuando hace falta una persona.
          </p>

          <ul
            data-reveal
            style={{ "--d": "150ms" } as React.CSSProperties}
            className="mt-7 flex flex-wrap gap-2"
            aria-label="Canales disponibles"
          >
            {chatbot.channels.map((c) => (
              <li key={c} className="rounded-full bg-ground-2 px-3.5 py-1.5 text-sm font-semibold text-navy">
                {c}
              </li>
            ))}
          </ul>

          <ul className="mt-8 flex flex-col gap-3">
            {chatbot.includes.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={{ "--d": `${200 + i * 50}ms` } as React.CSSProperties}
                className="flex gap-3 leading-snug text-navy"
              >
                <Check className="mt-0.5 size-4.5 shrink-0 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div data-reveal className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:gap-10">
            <div>
              <p className="flex items-baseline gap-2">
                <span className="text-sm text-ink-soft">Desde</span>
                <span className="text-3xl font-bold tracking-[-0.02em] text-navy">{chatbot.price}</span>
              </p>
              <p className="mt-2 max-w-[34ch] text-sm leading-snug text-ink-soft">{chatbot.priceNote}</p>
            </div>
            <a
              href={whatsappLink(chatbot.message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary w-full sm:w-auto"
            >
              <WhatsApp className="size-5" />
              Cotizar chatbot avanzado
            </a>
          </div>
        </div>

        <div data-reveal="scale" style={{ "--d": "120ms" } as React.CSSProperties}>
          <ChatbotDemo />
          <p className="mt-4 text-center text-sm text-ink-soft">
            Conversación de ejemplo. Tocá una opción para probarla.
          </p>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section
      id="proceso"
      aria-labelledby="titulo-proceso"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
        <h2
          id="titulo-proceso"
          data-reveal
          className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
        >
          Cómo trabajamos
        </h2>
        <p
          data-reveal
          style={{ "--d": "90ms" } as React.CSSProperties}
          className="max-w-[46ch] text-lg leading-relaxed text-ink-soft"
        >
          Un proceso claro de principio a fin. Sabés en qué paso va tu página y qué
          sigue en cada momento.
        </p>
      </div>

      <ProcessPath />
    </section>
  );
}

function Portfolio() {
  return (
    <section
      id="portafolio"
      aria-labelledby="titulo-portafolio"
      className="on-dark bg-navy py-24 text-white md:py-32"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
          <h2
            id="titulo-portafolio"
            data-reveal
            className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em]"
          >
            Portafolio
          </h2>
          <p
            data-reveal
            style={{ "--d": "90ms" } as React.CSSProperties}
            className="max-w-[46ch] text-lg leading-relaxed text-mist"
          >
            Tres demos de ejemplo para negocios de distintos giros, cada una con su
            propia paleta y personalidad. Abrilas y navegalas como lo haría un cliente.
          </p>
        </div>

      </div>

      <div className="mx-auto mt-14 max-w-7xl md:mt-16 lg:px-8">
        <Showcase />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div
          data-reveal
          className="mt-10 flex max-w-3xl gap-4 rounded-2xl bg-navy-2 p-5 sm:p-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="mt-0.5 size-5 shrink-0 text-cyan"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 11v5M12 8h.01" />
          </svg>
          <div>
            <p className="font-semibold">Estas son demos básicas, no proyectos de clientes.</p>
            <p className="mt-1.5 leading-relaxed text-mist">
              Las hicimos con negocios ficticios para mostrar estilos y funciones. Tu página
              se diseña desde cero con tu marca, tu contenido y lo que tu negocio necesite.
            </p>
            <p className="mt-3 text-sm text-mist/80">
              Fotografías de Wikimedia Commons con licencia libre, acreditadas en cada demo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Adaptable() {
  return (
    <section
      id="adaptable"
      aria-labelledby="titulo-adaptable"
      className="mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="grid gap-6 lg:grid-cols-2 lg:items-end lg:gap-14">
        <h2
          id="titulo-adaptable"
          data-reveal
          className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
        >
          Nos adaptamos a todo
        </h2>
        <p
          data-reveal
          style={{ "--d": "90ms" } as React.CSSProperties}
          className="max-w-[46ch] text-lg leading-relaxed text-ink-soft"
        >
          Tu página se ve y funciona bien en celular, tablet y computadora. Elegí un dispositivo y
          mirá cómo se acomodan nuestras demos.
        </p>
      </div>
      <div data-reveal style={{ "--d": "150ms" } as React.CSSProperties} className="mt-14 md:mt-16">
        <DeviceShowcase />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="nosotros" aria-labelledby="titulo-nosotros" className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-8">
        <div data-reveal="scale" className="relative">
          {about.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBase(about.photo)}
              alt={about.photoAlt}
              className="aspect-[4/5] w-full rounded-3xl object-cover"
            />
          ) : (
            <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
              <svg aria-hidden viewBox="0 0 120 120" className="about-mark absolute -right-16 -top-10 w-[85%] opacity-90">
                <path
                  d="M36 34 L60 60 L84 34 M60 60 L60 90"
                  fill="none"
                  stroke="#22D3EE"
                  strokeOpacity="0.22"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="36" cy="34" r="6" fill="#22D3EE" fillOpacity="0.22" />
                <circle cx="60" cy="90" r="6" fill="#22D3EE" fillOpacity="0.22" />
                <circle cx="84" cy="34" r="8" fill="#22D3EE" />
                <circle cx="84" cy="34" r="3.2" fill="#0B2A4A" />
              </svg>
              <LogoSymbol className="relative size-16" />
              <p className="relative max-w-[16ch] text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                Diseño y código hechos en Guatemala
              </p>
            </div>
          )}
        </div>

        <div>
          <h2
            id="titulo-nosotros"
            data-reveal
            className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
          >
            Sobre yahtech
          </h2>
          {about.paragraphs.map((text, i) => (
            <p
              key={i}
              data-reveal
              style={{ "--d": `${90 + i * 60}ms` } as React.CSSProperties}
              className="mt-6 max-w-[52ch] text-lg leading-relaxed text-ink-soft"
            >
              {text}
            </p>
          ))}
          <ul className="mt-10 grid gap-6 sm:grid-cols-3 sm:gap-5">
            {about.principles.map((item, i) => (
              <li
                key={item.title}
                data-reveal
                style={{ "--d": `${200 + i * 80}ms` } as React.CSSProperties}
              >
                <Check className="size-5 text-accent" />
                <h3 className="mt-3 font-semibold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-ink-soft">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section
      id="preguntas"
      aria-labelledby="titulo-preguntas"
      className="py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div data-reveal>
          <h2
            id="titulo-preguntas"
            className="text-[clamp(2.4rem,4vw+1rem,4rem)] font-bold leading-[1.02] tracking-[-0.035em] text-navy"
          >
            Preguntas frecuentes
          </h2>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-ink-soft">
            ¿Tenés otra duda?{" "}
            <a
              href={whatsappLink(generalMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Escribinos por WhatsApp
            </a>
          </p>
        </div>
        <div data-reveal style={{ "--d": "90ms" } as React.CSSProperties}>
          <Faq />
        </div>
      </div>
    </section>
  );
}

function Closing() {
  return (
    <section aria-labelledby="titulo-cierre" className="on-dark relative overflow-hidden bg-navy text-white">
      <svg
        aria-hidden
        viewBox="0 0 120 120"
        className="closing-mark pointer-events-none absolute -bottom-24 -right-20 w-[28rem] max-w-none sm:w-[36rem]"
      >
        <path
          d="M36 34 L60 60 L84 34 M60 60 L60 90"
          fill="none"
          stroke="#22D3EE"
          strokeOpacity="0.16"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="36" cy="34" r="5" fill="#22D3EE" fillOpacity="0.16" />
        <circle cx="60" cy="90" r="5" fill="#22D3EE" fillOpacity="0.16" />
        <circle cx="84" cy="34" r="7" fill="#22D3EE" fillOpacity="0.5" />
      </svg>
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <h2
          id="titulo-cierre"
          data-reveal
          className="max-w-[14ch] text-[clamp(2.6rem,5vw+1rem,5rem)] font-bold leading-[1.02] tracking-[-0.035em]"
        >
          ¿Listo para tener tu página?
        </h2>
        <p
          data-reveal
          style={{ "--d": "90ms" } as React.CSSProperties}
          className="mt-6 max-w-[44ch] text-lg leading-relaxed text-mist"
        >
          Contanos de tu negocio por WhatsApp y te enviamos una propuesta sin compromiso.
        </p>
        <div
          data-reveal
          style={{ "--d": "180ms" } as React.CSSProperties}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-cyan"
          >
            <WhatsApp className="size-5" />
            Cotizá tu página
          </a>
          <a {...sectionLink("portafolio")} className="btn text-white ring-1 ring-white/30 hover:bg-white/10">
            Ver portafolio
            <ArrowRight className="btn-arrow size-4.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ground">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-28 pt-16 sm:px-6 md:pb-20 md:flex-row md:items-end md:justify-between md:py-20 lg:px-8">
        <div>
          <Logo size="lg" />
          <p className="mt-5 max-w-[36ch] leading-relaxed text-ink-soft">
            Diseño y desarrollo de páginas web modernas para negocios.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-navy md:items-end">
          <a
            href={`https://www.instagram.com/${site.instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link inline-flex items-center gap-2.5 font-semibold"
          >
            <Instagram className="size-5 text-accent" />
            <span>
              <span className="sr-only">Instagram </span>@{site.instagram}
            </span>
          </a>
          <p className="inline-flex items-center gap-2.5 font-medium">
            <MapPin className="size-5 text-accent" />
            {site.location}
          </p>
          <p className="text-sm text-ink-soft">© {year} yahtech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
