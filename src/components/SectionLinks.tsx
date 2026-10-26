"use client";

import { useEffect } from "react";

// Los enlaces internos apuntan a la página sin "#" (así no aparece al pasar el
// mouse ni en la barra de direcciones) y guardan su destino en data-scroll.
// Este componente hace el desplazamiento y mueve el foco a la sección.
export function SectionLinks() {
  useEffect(() => {
    const goTo = (id: string, instant = false) => {
      const target = document.getElementById(id);
      if (!target) return;
      target.scrollIntoView({ block: "start", behavior: instant ? "instant" : "auto" });
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    };

    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element).closest<HTMLElement>("[data-scroll]");
      if (!link) return;
      e.preventDefault();
      goTo(link.dataset.scroll!);
    };

    // Enlaces viejos con "#seccion": se respeta el destino y se limpia la dirección.
    if (location.hash) {
      const id = decodeURIComponent(location.hash.slice(1));
      history.replaceState(null, "", location.pathname + location.search);
      // Al cargar se salta directo: no hace falta animar el recorrido.
      window.setTimeout(() => goTo(id, true), 60);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}

