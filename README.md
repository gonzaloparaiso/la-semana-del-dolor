# La semana del dolor — Landing de CAPTACIÓN

Landing de **captación** del lanzamiento "La semana del dolor" de Alba Estrada (Training Norte / Improving Methods). Su único objetivo es **conseguir inscripciones a las 3 clases gratuitas** (24, 27 y 28 de junio).

> Habrá una segunda landing de **venta** (con los 3 productos: 197 / 397 / 597 €). La versión con la sección de productos quedó guardada en el historial de git (commit anterior a "landing de captación") por si se reutiliza.

## Cómo funciona la captación

- Todos los CTA abren una **modal de inscripción** (`src/components/SignupModal.tsx`) con: nombre, correo, teléfono (formato internacional con validación) y checkbox de condiciones. Todos obligatorios y validados.
- Al enviar, captura los **UTMs** de la URL y hace `POST` (JSON) al **webhook de Make**: `https://hook.eu2.make.com/...`.
- Payload: `nombre`, `email`, `telefono` (E.164), `acepta_condiciones`, `pagina`, `enviado_en` (ISO) y los `utm_*` presentes en la URL.

## Stack

- **Vite 6** + **React 18** + **TypeScript**
- **Tailwind CSS v4** (vía `@tailwindcss/vite`) + design system propio en `src/index.css` ("Tactical Dark")
- **wouter** para el routing
- **react-phone-number-input** para el teléfono internacional
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
  components/
    SignupModal.tsx # modal de inscripción + validación + envío al webhook
  pages/
    Home.tsx        # landing (hero, clases, pilares, testimonios, sobre Alba, FAQ...)
    NotFound.tsx    # 404
```

## Notas

- Las imágenes están alojadas en `public/` (`hero.jpg`, `lateral.jpg`, `alba.jpg`, `logo-tn.png`). Ya no dependen de URLs externas.
- El webhook de Make está en `src/components/SignupModal.tsx` (`WEBHOOK_URL`); el checkbox enlaza a la política de privacidad de trainingnorte.com.
- Incluye el **Meta Pixel** (`578854531744241`) en `index.html`.
- Botón flotante de WhatsApp a `+34 628 436 530`.

## Pendiente / opcional

- [ ] (Opcional) Hora de las clases — ahora solo se muestra "online en directo".
- [ ] (Opcional) Logo apaisado para la navbar.
- [ ] (Opcional) Imágenes de Open Graph (`og:image`) — siguen en URLs de manuscdn que caducarán.
- [ ] Landing de **venta** (separada) con los 3 productos.
