"use client";

import { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { WhatsApp } from "./icons";
import { generalMessage, sectionLink, whatsappLink } from "@/lib/site";

const links = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "chatbots", label: "Chatbots" },
  { id: "proceso", label: "Cómo trabajamos" },
  { id: "portafolio", label: "Portafolio" },
  { id: "preguntas", label: "Preguntas" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const onResize = () => desktop.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ground transition-shadow duration-300 ${
        scrolled || open ? "shadow-[0_6px_24px_-12px_rgba(11,42,74,0.25)]" : ""
      }`}
    >
      <nav
        aria-label="Principal"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 md:h-20 lg:px-8"
      >
        <a {...sectionLink("inicio")} aria-label="yahtech, ir al inicio" className="rounded-lg">
          <Logo />
        </a>

        <div className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {links.map((link) => (
            <a key={link.id} {...sectionLink(link.id)} className="nav-link text-navy">
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink(generalMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary min-h-11 px-5 text-[0.9375rem]"
          >
            <WhatsApp className="size-4.5" />
            Cotizá tu página
          </a>
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="-mr-2 flex size-11 flex-col items-center justify-center gap-[5px] rounded-full xl:hidden"
          aria-expanded={open}
          aria-controls="menu-movil"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="burger-line block h-0.5 w-5.5 rounded-full bg-navy" />
          <span className="burger-line block h-0.5 w-5.5 rounded-full bg-navy" />
          <span className="burger-line block h-0.5 w-5.5 rounded-full bg-navy" />
        </button>
      </nav>

      <div
        id="menu-movil"
        data-open={open}
        className="mobile-menu absolute inset-x-0 top-full bg-ground px-4 pb-6 shadow-[0_18px_30px_-18px_rgba(11,42,74,0.3)] sm:px-6 xl:hidden"
        inert={!open}
      >
        <ul className="flex flex-col">
          {links.map((link) => (
            <li key={link.id}>
              <a
                {...sectionLink(link.id)}
                className="block py-3.5 text-2xl font-semibold tracking-[-0.02em] text-navy"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={whatsappLink(generalMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary mt-4 w-full"
          onClick={() => setOpen(false)}
        >
          <WhatsApp className="size-5" />
          Cotizá tu página
        </a>
      </div>
    </header>
  );
}
