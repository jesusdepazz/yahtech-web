# yahtech — sitio web

Sitio de yahtech (Instagram [@yahtechgt](https://www.instagram.com/yahtechgt/)): diseño y desarrollo de páginas web modernas para negocios en Guatemala.

Hecho con Next.js 16 (exportación estática), React 19, Tailwind CSS 4 y la fuente Sora.

## Dónde cambiar cosas

| Qué | Archivo |
| --- | --- |
| Número de WhatsApp, Instagram, URL del sitio | `src/lib/site.ts` (`whatsapp: "502XXXXXXXX"`) |
| Precios, descripciones y lo que incluye cada servicio | `src/lib/site.ts` (lista `services`) |
| Mensajes predefinidos de WhatsApp | `src/lib/site.ts` (`generalMessage` y `message` de cada servicio) |
| Preguntas frecuentes, pasos de "Cómo trabajamos", demos del portafolio | `src/lib/site.ts` (`faqs`, `steps`, `demos`) |
| Mensaje del botón flotante de WhatsApp | `src/lib/site.ts` (`floatingMessage`) |
| Páginas demo y sus fotos | `public/demos/` (fotos y créditos en `public/demos/img/<demo>/`; capturas en `public/demos/previews/`) |
| Textos del inicio y del pie de página | `src/app/page.tsx` |
| Colores y animaciones | `src/app/globals.css` |
| Logo | `assets/logo.svg` (completo) y `assets/symbol.svg` (solo el símbolo) |
| Favicon / ícono de Apple / imagen para redes | `src/app/icon.svg`, `src/app/apple-icon.png`, `src/app/opengraph-image.png` |

## Verlo en tu computadora

Necesitás [Node.js](https://nodejs.org) 20 o más reciente.

```bash
npm install
npm run dev
```

Abrí http://localhost:3000 en tu navegador. Los cambios que guardes se ven al instante.

Para generar la versión final (carpeta `out/`):

```bash
npm run build
```

## Publicar gratis en GitHub Pages

El archivo `.github/workflows/deploy.yml` publica el sitio solo cada vez que subís cambios a la rama `main`.

1. Creá un repositorio en GitHub (por ejemplo `yahtech-web`, o `yahtechgt.github.io` si querés que quede en la raíz).
2. Subí el proyecto:
   ```bash
   git add .
   git commit -m "Sitio de yahtech"
   git branch -M main
   git remote add origin https://github.com/yahtechgt/yahtech-web.git
   git push -u origin main
   ```
3. En GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. Revisá la pestaña **Actions**; cuando termine, el sitio queda en:
   - `https://yahtechgt.github.io/yahtech-web/` (repo `yahtech-web`)
   - `https://yahtechgt.github.io/` (repo `yahtechgt.github.io`)

La ruta del repositorio se configura sola durante la publicación; no hay que tocar nada.

### Dominio propio

La página ya está lista para usar un dominio propio (por ejemplo `yahtech.com.gt`). No hay que cambiar código: al publicar, GitHub le pasa al sitio la dirección del dominio y quita la subcarpeta `/yahtech-web/`. Con eso también se actualizan solos la dirección canónica, la imagen para redes, `sitemap.xml` y `robots.txt`.

1. **Verificá el dominio en GitHub** (recomendado, evita que alguien más lo use en otra página): en tu perfil, **Settings → Pages → Add a domain**, y seguí las instrucciones para agregar el registro TXT que te dan.
2. **Configurá el DNS** donde compraste el dominio:

   | Tipo | Nombre | Valor |
   | --- | --- | --- |
   | A | @ | 185.199.108.153 |
   | A | @ | 185.199.109.153 |
   | A | @ | 185.199.110.153 |
   | A | @ | 185.199.111.153 |
   | AAAA | @ | 2606:50c0:8000::153 |
   | AAAA | @ | 2606:50c0:8001::153 |
   | AAAA | @ | 2606:50c0:8002::153 |
   | AAAA | @ | 2606:50c0:8003::153 |
   | CNAME | www | yahtechgt.github.io |

   Los registros AAAA son opcionales; los A sí son necesarios.
3. **Conectá el dominio al repositorio**: en el repositorio, **Settings → Pages → Custom domain**, escribí el dominio sin `www` (por ejemplo `yahtech.com.gt`) y guardá. GitHub revisa el DNS; puede tardar desde minutos hasta 24 horas.
4. **Activá HTTPS**: cuando aparezca la opción, marcá **Enforce HTTPS** en esa misma pantalla.
5. **Volvé a publicar**: en la pestaña **Actions**, abrí "Publicar en GitHub Pages" y usá **Run workflow** (o subí cualquier cambio a `main`). Así el sitio se compila con la dirección nueva.

No hace falta un archivo `CNAME`: con la publicación por GitHub Actions el dominio se guarda en la configuración del repositorio.
