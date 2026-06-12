# La semana del dolor — LOW BACK ARMOUR

Landing del **lanzamiento "La semana del dolor"** de Alba Estrada (Training Norte / Improving Methods). Migrada desde Manus a un proyecto Vite + React + TypeScript para poder trabajarla en local.

## El lanzamiento

- **Semana gratuita** con 3 clases online en directo con Alba: **24, 27 y 28 de junio**. El objetivo principal de la landing es la **inscripción gratuita** a esas clases.
- Al terminar la semana se abre la **oferta de lanzamiento** con 3 productos:
  | Producto | Precio | Incluye |
  |---|---|---|
  | Low Back Armour | **197€** | Programa de 3 meses en vídeo, sin seguimiento |
  | LBA + Seguimiento *(destacado)* | **397€** | Programa + directos mes 1 + grupo privado + correcciones cada 15 días |
  | LBA Premium *(10 plazas)* | **597€** | Todo lo anterior + WhatsApp directo con Alba |

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`) + design system propio en `src/index.css` ("Tactical Dark")
- **wouter** para el routing
- **lucide-react** para iconos

## Desarrollo

```bash
npm install
npm run dev      # servidor local
npm run build    # build de producción
npm run preview  # previsualizar el build
```

## Estructura

```
src/
  main.tsx          # entry point
  App.tsx           # router (/ -> Home, * -> NotFound)
  index.css         # design system "Tactical Dark"
  pages/
    Home.tsx        # landing completa (hero, pilares, testimonios, precio, FAQ...)
    NotFound.tsx    # 404
```

## Notas

- Las imágenes están alojadas en `public/` (`hero.jpg`, `lateral.jpg`, `alba.jpg`, `logo-tn.png`). Ya no dependen de URLs externas.
- Los CTA principales apuntan a la **inscripción gratuita** (`REGISTRATION_URL`) y los de la oferta a los checkouts de cada producto. Las constantes están al principio de `src/pages/Home.tsx`.
- La propagación de parámetros UTM sigue activa para los enlaces `*finalizar-compra*`.
- Incluye el **Meta Pixel** (`578854531744241`) en `index.html`.
- Botón flotante de WhatsApp a `+34 628 436 530`.

## Pendiente / placeholders por rellenar

- [ ] **`REGISTRATION_URL`** — URL real de inscripción a las clases gratuitas (ahora `#REEMPLAZAR-inscripcion-clases`).
- [x] Checkouts de los 3 productos (`trainingnorte.com/finalizar-compra/?add-to-cart=31914 / 31916 / 31917`).
- [ ] (Opcional) Hora de las clases — ahora solo se muestra "online en directo".
- [ ] (Opcional) Logo apaisado para la navbar.
