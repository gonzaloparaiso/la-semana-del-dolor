# La semana del dolor — LOW BACK ARMOUR

Landing de venta del programa **LOW BACK ARMOUR** de Alba Estrada (Training Norte / Improving Methods). Migrada desde Manus a un proyecto Vite + React + TypeScript para poder trabajarla en local.

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

- Las imágenes (`HERO_BG`, `LATERAL_IMG`, `ALBA_IMG`, `LOGO_URL`) apuntan a URLs de `manuscdn.com` con firma temporal (`Expires`). **Caducarán** y habrá que migrarlas a un hosting propio (p. ej. `public/`).
- El CTA apunta a `https://improvingmethods.com/finalizar-compra/?add-to-cart=6781` y propaga los parámetros UTM de la URL.
- Incluye el **Meta Pixel** (`578854531744241`) en `index.html`.
- Botón flotante de WhatsApp a `+34 628 436 530`.

## Pendiente / ideas

- [ ] Alojar las imágenes en local (`public/`) en vez de manuscdn.
- [ ] Añadir `favicon.png` en `public/`.
- [ ] Páginas legales (términos, privacidad, aviso legal) — ahora apuntan a `#`.
- [ ] Revisar copy ("Compómetete" -> "Comprométete").
