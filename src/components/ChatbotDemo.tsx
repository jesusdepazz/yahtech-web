"use client";

import { useEffect, useRef, useState } from "react";

type Message = { from: "bot" | "user"; text: string };

type Option = { label: string; reply: string; next?: Option[] };

const start: Message = {
  from: "bot",
  text: "¡Hola! Soy el asistente de Taquería El Comal. ¿En qué te puedo ayudar?",
};

const reservationTimes: Option[] = [
  { label: "2 personas, 19:00", reply: "Listo, tu mesa para 2 a las 19:00 quedó apartada. Te llega la confirmación en este chat." },
  { label: "4 personas, 20:30", reply: "Listo, tu mesa para 4 a las 20:30 quedó apartada. Te llega la confirmación en este chat." },
];

const mainOptions: Option[] = [
  {
    label: "¿Qué horario tienen?",
    reply: "Abrimos de martes a domingo, de 12:00 a 22:00. Los lunes descansamos.",
  },
  {
    label: "Quiero ver el menú",
    reply: "Tacos desde Q55, especiales desde Q32 y bebidas desde Q20. Te comparto el menú completo con fotos.",
  },
  {
    label: "Hacer una reservación",
    reply: "Con gusto. ¿Para cuántas personas y a qué hora?",
    next: reservationTimes,
  },
  {
    label: "Hablar con una persona",
    reply: "Te comunico con alguien del equipo. Te responden en unos minutos.",
  },
];

// Conversación simulada: la persona elige una opción y el asistente responde
// después de un breve "escribiendo…".
export function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([start]);
  const [options, setOptions] = useState<Option[]>(mainOptions);
  const [typing, setTyping] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const log = logRef.current;
    if (log) log.scrollTo({ top: log.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (option: Option) => {
    setMessages((m) => [...m, { from: "user", text: option.label }]);
    setOptions([]);
    setTyping(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timer.current = window.setTimeout(
      () => {
        setTyping(false);
        setMessages((m) => [...m, { from: "bot", text: option.reply }]);
        setOptions(option.next ?? mainOptions.filter((o) => o.label !== option.label));
      },
      reduced ? 0 : 900,
    );
  };

  const restart = () => {
    window.clearTimeout(timer.current);
    setTyping(false);
    setMessages([start]);
    setOptions(mainOptions);
  };

  return (
    <div data-ui className="mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] bg-navy p-2 shadow-[0_40px_80px_-30px_rgba(11,42,74,0.6)]">
      <div className="overflow-hidden rounded-[1.6rem] bg-ground">
        <div className="flex items-center gap-3 bg-navy-2 px-4 py-3 text-white">
          <span aria-hidden className="grid size-9 place-items-center rounded-full bg-cyan font-bold text-navy">
            EC
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Taquería El Comal</p>
            <p className="text-xs text-mist">{typing ? "escribiendo…" : "Asistente automático"}</p>
          </div>
          <button
            type="button"
            onClick={restart}
            className="rounded-full px-3 py-1.5 text-xs font-semibold text-mist transition-colors hover:bg-white/10 hover:text-white"
          >
            Reiniciar
          </button>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Conversación de ejemplo"
          className="flex h-80 flex-col gap-2.5 overflow-y-auto px-4 py-4"
        >
          {messages.map((m, i) => (
            <p
              key={i}
              className={`chat-bubble max-w-[85%] rounded-2xl px-3.5 py-2.5 text-[0.9375rem] leading-snug ${
                m.from === "bot"
                  ? "self-start rounded-bl-md bg-white text-navy"
                  : "self-end rounded-br-md bg-accent-ink text-white"
              }`}
            >
              <span className="sr-only">{m.from === "bot" ? "Asistente: " : "Cliente: "}</span>
              {m.text}
            </p>
          ))}
          {typing && (
            <p className="chat-bubble self-start rounded-2xl rounded-bl-md bg-white px-4 py-3" aria-label="El asistente está escribiendo">
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </p>
          )}
        </div>

        <div className="flex min-h-[7.5rem] flex-wrap content-start gap-2 border-t border-navy/10 bg-white px-4 py-3">
          {options.length > 0 ? (
            options.map((o) => (
              <button
                key={o.label}
                type="button"
                onClick={() => choose(o)}
                className="rounded-full bg-ground-2 px-3.5 py-2 text-sm font-medium text-navy transition-colors hover:bg-cyan/30 active:scale-[0.97]"
              >
                {o.label}
              </button>
            ))
          ) : (
            <p className="py-2 text-sm text-ink-soft">{typing ? "El asistente está respondiendo…" : ""}</p>
          )}
        </div>
      </div>
    </div>
  );
}
