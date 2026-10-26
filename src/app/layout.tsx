import type { Metadata, Viewport } from "next";
import { Sora } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const home = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/`;

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.title,
  description: site.description,
  keywords: [
    "páginas web Guatemala",
    "diseño web Guatemala",
    "desarrollo web",
    "landing page",
    "tienda en línea",
    "yahtech",
  ],
  authors: [{ name: "yahtech" }],
  alternates: { canonical: home },
  openGraph: {
    type: "website",
    locale: "es_GT",
    url: home,
    siteName: "yahtech",
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0B2A4A",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={sora.variable} suppressHydrationWarning>
      <head>
        {/* Activa las animaciones de entrada solo cuando hay JavaScript. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
      </head>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
