// Datos del sitio en un solo lugar: cambiá aquí el número de WhatsApp,
// los precios y los textos de cada servicio.

export const site = {
  name: "yahtech",
  // Al publicar, GitHub Actions pasa aquí la dirección real (tu dominio propio
  // cuando lo configurés en Settings → Pages). Este valor solo se usa en local.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://yahtechgt.github.io",
  title: "yahtech | Páginas web modernas para negocios en Guatemala",
  description:
    "Diseño y desarrollo de sitios elegantes, funcionales y a la medida de tu marca. Páginas informativas, landing pages y tiendas en línea para negocios en Guatemala.",
  whatsapp: "50242700729",
  instagram: "yahtechgt",
  location: "Guatemala",
};

export function whatsappLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const generalMessage =
  "Hola yahtech, me interesa cotizar una página web para mi negocio.";

export type Service = {
  id: "informativa" | "landing" | "tienda";
  name: string;
  description: string;
  includes: string[];
  // Nivel de chatbot básico que trae el paquete (sin mensualidad).
  chatbot: string;
  price: string;
  hostingNote: string;
  message: string;
};

export const services: Service[] = [
  {
    id: "informativa",
    name: "Página informativa",
    description:
      "Tu negocio presentado con claridad: quiénes son, qué ofrecen y cómo encontrarlos.",
    includes: [
      "Hasta 5 secciones a la medida",
      "Diseño adaptado a celular, tablet y computadora",
      "Botón directo a WhatsApp y redes sociales",
      "Mapa de ubicación y horarios",
      "SEO básico para aparecer en Google",
    ],
    chatbot:
      "Respuestas automáticas en WhatsApp Business y un asistente en tu página para horarios, precios y preguntas frecuentes.",
    price: "Q3,000",
    hostingNote: "Hosting y dominio se cotizan aparte.",
    message:
      "Hola yahtech, quiero cotizar una Página informativa para mi negocio.",
  },
  {
    id: "landing",
    name: "Landing page",
    description:
      "Una sola página enfocada en vender un producto, un servicio o una promoción.",
    includes: [
      "Estructura pensada para convertir visitas en clientes",
      "Textos ordenados en torno a una sola acción",
      "Formulario o enlace directo a WhatsApp",
      "Carga rápida y diseño adaptado a celular",
      "Lista para campañas en redes sociales",
    ],
    chatbot:
      "Respuestas automáticas en WhatsApp Business: bienvenida, fuera de horario y respuestas rápidas.",
    price: "Q1,800",
    hostingNote: "Hosting y dominio se cotizan aparte.",
    message: "Hola yahtech, quiero cotizar una Landing page para mi negocio.",
  },
  {
    id: "tienda",
    name: "Tienda en línea",
    description:
      "Tu catálogo disponible las 24 horas para que tus clientes compren desde el celular.",
    includes: [
      "Catálogo de productos con fotos, precios y categorías",
      "Carrito de compras y pedidos por WhatsApp",
      "Panel sencillo para actualizar productos",
      "Diseño adaptado a celular",
      "Capacitación para administrar tu tienda",
    ],
    chatbot:
      "Respuestas automáticas en WhatsApp Business y un asistente que ayuda a encontrar productos y hacer el pedido.",
    price: "Q5,500",
    hostingNote: "Hosting y dominio aparte. Requiere hosting para tienda en línea.",
    message: "Hola yahtech, quiero cotizar una Tienda en línea para mi negocio.",
  },
];

// Archivos dentro de public/ necesitan la ruta base cuando el sitio vive
// en una subcarpeta (por ejemplo en GitHub Pages).
export function withBase(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}

// Enlace a una sección de esta página sin "#": la dirección queda limpia y el
// destino viaja en data-scroll (lo maneja SectionLinks).
export function sectionLink(id: string) {
  return { href: withBase("/"), "data-scroll": id };
}

export const floatingMessage = "Hola, quiero información sobre una página web";

export type Demo = {
  id: "restaurante" | "autos" | "tienda";
  tab: string;
  name: string;
  type: string;
  domain: string;
  description: string;
  href: string;
  // Capturas en public/demos/previews: inicio, dos secciones, tablet y celular.
  shots: { home: string; section: string; detail: string; tablet: string; mobile: string };
};

const shots = (id: string) => ({
  home: `/demos/previews/${id}-1.webp`,
  section: `/demos/previews/${id}-2.webp`,
  detail: `/demos/previews/${id}-3.webp`,
  tablet: `/demos/previews/${id}-t.webp`,
  mobile: `/demos/previews/${id}-m.webp`,
});

export const demos: Demo[] = [
  {
    id: "restaurante",
    tab: "Restaurante",
    name: "TIZNE",
    type: "Taquería · Sitio con reservaciones",
    domain: "tizne.gt",
    description:
      "Video que avanza con el scroll, menú por categorías con fotos y filtros, galería, horarios en vivo y reservaciones.",
    href: "/demos/restaurante.html",
    shots: shots("restaurante"),
  },
  {
    id: "autos",
    tab: "Autos",
    name: "Volcán Motors",
    type: "Importadora de vehículos · Landing page",
    domain: "volcanmotors.gt",
    description:
      "Inventario filtrable con ficha de cada vehículo, calculadora de financiamiento y formulario de pedido a la medida.",
    href: "/demos/autos.html",
    shots: shots("autos"),
  },
  {
    id: "tienda",
    tab: "Tienda",
    name: "STRIDE",
    type: "Sneakers y streetwear · Tienda en línea",
    domain: "stride.gt",
    description:
      "Escena de producto con scroll, catálogo con filtros y búsqueda, tallas y colores, carrito con cupones y pago.",
    href: "/demos/tienda.html",
    shots: shots("tienda"),
  },
];

export const steps = [
  {
    title: "Cotización",
    text: "Platicamos sobre tu negocio y lo que necesitás.",
  },
  {
    title: "Diseño",
    text: "Creamos una propuesta visual a la medida de tu marca.",
  },
  {
    title: "Revisión",
    text: "Ajustamos los detalles hasta que quede como querés.",
  },
  {
    title: "Publicación",
    text: "Tu página en línea, lista para recibir clientes.",
  },
];

export const faqs = [
  {
    q: "¿Cuánto tiempo tarda en estar lista mi página?",
    a:
      "Depende del tipo de página: una landing page está lista en 5 a 7 días hábiles, una página informativa en 1 a 2 semanas y una tienda en línea en 3 a 4 semanas. El tiempo empieza a contar cuando tenemos tus textos, fotos y logo.",
  },
  {
    q: "¿El precio incluye dominio y hosting?",
    a:
      "No. El precio cubre el diseño y el desarrollo. El dominio y el hosting se cotizan aparte porque dependen del tipo de sitio: una página informativa o una landing page funcionan con un plan económico, y una tienda en línea necesita uno con más capacidad. Te ayudamos a elegirlos y los dejamos configurados.",
  },
  {
    q: "¿Puedo hacer cambios después de publicada?",
    a:
      "Sí. Cada proyecto incluye una ronda de ajustes durante los primeros 15 días después de publicar. Después podés pedirnos cambios puntuales o contratar un plan de mantenimiento mensual para actualizar textos, fotos y precios.",
  },
  {
    q: "¿Mi página se verá bien en celular?",
    a: "Sí, todas nuestras páginas se adaptan a celular, tablet y computadora.",
  },
  {
    q: "¿Qué es un chatbot y para qué me sirve?",
    a:
      "Es un asistente que responde solo a tus clientes a cualquier hora. Todos nuestros paquetes incluyen uno básico, sin mensualidad: respuestas automáticas en WhatsApp Business y, en la página informativa y la tienda, un asistente dentro de tu sitio. Si querés que también conteste en Instagram y Messenger o que tome pedidos y citas dentro del chat, está el chatbot avanzado, con una mensualidad según la plataforma.",
  },
  {
    q: "¿Cuáles son las formas de pago?",
    a:
      "Transferencia o depósito bancario. Trabajamos con 50% de anticipo para empezar y el 50% restante al entregarte la página publicada.",
  },
  {
    q: "¿Qué necesito para empezar?",
    a:
      "Tu logo, fotos de tu negocio o tus productos y los datos básicos: qué ofrecés, horarios, ubicación y cómo te contactan. Si te falta algo, lo resolvemos juntos en la primera conversación.",
  },
];

// Sección "Sobre yahtech". Texto provisional: ajustalo con tu historia.
// Para mostrar tu foto, guardala en public/ (por ejemplo public/sobre.jpg)
// y escribí aquí su ruta: photo: "/sobre.jpg".
export const about = {
  photo: "" as string,
  photoAlt: "Fundador de yahtech",
  paragraphs: [
    "yahtech nace en Guatemala con una idea sencilla: que cualquier negocio, grande o pequeño, pueda tener una página web que se vea profesional y que de verdad le traiga clientes.",
    "Diseñamos y programamos cada sitio desde cero. Escuchamos cómo funciona tu negocio y qué buscan tus clientes, y lo convertimos en una página clara, rápida y fácil de usar desde el celular.",
  ],
  principles: [
    {
      title: "Trato directo",
      text: "Hablás con quien diseña y programa tu página, sin intermediarios.",
    },
    {
      title: "Hecho a tu medida",
      text: "Tus colores, tus fotos y tus textos, pensados para tus clientes.",
    },
    {
      title: "Te acompañamos después",
      text: "Te explicamos cómo usar tu página y seguimos disponibles cuando la necesités.",
    },
  ],
};

// Chatbot avanzado: servicio adicional a los paquetes, que ya traen uno básico.
export const chatbot = {
  price: "Q2,000",
  priceNote: "Pago único de configuración. La mensualidad depende de la plataforma y del volumen de mensajes.",
  channels: ["WhatsApp Business", "Instagram", "Facebook Messenger", "Tu página web"],
  includes: [
    "Respuestas automáticas a las preguntas más frecuentes",
    "Menú de opciones: horarios, precios, ubicación y catálogo",
    "Toma de pedidos, citas o reservaciones",
    "Paso a una persona cuando el cliente lo pide",
    "Ajustes del primer mes según las conversaciones reales",
  ],
  message: "Hola yahtech, quiero cotizar un chatbot avanzado para mi negocio.",
};
