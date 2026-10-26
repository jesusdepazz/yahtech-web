import { WhatsApp } from "./icons";
import { floatingMessage, whatsappLink } from "@/lib/site";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(floatingMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="wa-float fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_-10px_rgba(11,42,74,0.55)] sm:bottom-6 sm:right-6 sm:size-15"
    >
      <WhatsApp className="size-7 sm:size-8" />
    </a>
  );
}
