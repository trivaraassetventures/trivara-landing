# Trivara — Capital in Motion

Landing page premium 3D para un fondo cuantitativo. **Three.js + React Three Fiber**, con una esfera de datos formada por miles de partículas GPU que reaccionan al ratón y al scroll.

## Stack

- **Vite + React 18**
- **three / @react-three/fiber / @react-three/drei**
- **@react-three/postprocessing** — Bloom + Vignette cinematográficos
- **framer-motion** — reveals y microinteracciones
- **lenis** — scroll suave
- **GLSL** — shaders custom (simplex noise) para la esfera

## Arrancar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build de producción
npm run preview  # previsualizar el build
```

## Arquitectura

```
src/
├─ App.jsx                       # composición + scroll suave
├─ components/
│  ├─ three/
│  │  ├─ Scene.jsx               # <Canvas>, postprocessing, dpr adaptativo
│  │  ├─ DataSphere.jsx          # geometría de partículas + uniforms + frame loop
│  │  └─ sphereShader.js         # vertex/fragment GLSL (noise, mouse, assemble)
│  ├─ Preloader.jsx              # cortina de marca al cargar
│  ├─ StaticBackdrop.jsx         # fallback CSS sin WebGL
│  ├─ CanvasErrorBoundary.jsx    # captura fallos del 3D -> fallback
│  ├─ Cursor.jsx                 # cursor magnético
│  ├─ MagneticButton.jsx         # botón magnético
│  ├─ Reveal.jsx / CountUp.jsx   # microinteracciones
│  ├─ Nav.jsx
│  └─ sections/                  # Hero, Metrics, Strategy, Process, Performance,
│                                  EquityChart, Philosophy, Access, Footer
├─ hooks/
│  ├─ useSmoothScroll.js         # Lenis + progreso de scroll compartido con la escena
│  └─ useWebGLSupport.js         # detección de WebGL
└─ styles/global.css             # paleta "Institutional Noir"
```

## Robustez

- **Sin WebGL / driver caído** → `CanvasErrorBoundary` + `StaticBackdrop` muestran una "esfera" CSS animada en vez de un canvas roto.
- **Sin JavaScript** → `<noscript>` con marca y contacto.
- **Preloader** con cap de 2.6 s: nunca atrapa al usuario tras la cortina.

## Formulario de acceso

La sección **Acceso** captura leads reales (`AccessForm.jsx`) con validación, estado de envío, pantalla de éxito y honeypot anti-spam.

1. Crea un formulario gratis en [Formspree](https://formspree.io) (o Basin/Resend).
2. Copia `.env.example` a `.env` y pega tu endpoint en `VITE_FORM_ENDPOINT`.

## Marca y compartir (favicon + OG)

- `public/favicon.svg` — favicon vectorial (esfera de datos).
- `public/apple-touch-icon.png` — 180×180 para iOS.
- `public/og-image.png` — imagen 1200×630 para previews al compartir el enlace.

La imagen OG se genera desde `public/og.html`. Para regenerarla tras un cambio de copy/diseño (con Edge/Chrome instalado):

```powershell
& "$env:ProgramFiles (x86)\Microsoft\Edge\Application\msedge.exe" `
  --headless=new --window-size=1200,630 `
  --screenshot="public/og-image.png" "file:///ruta/al/public/og.html"
```

> Recuerda actualizar las URLs absolutas (`https://trivara.com/…`) de los meta OG/Twitter en `index.html` con tu dominio real.

## Deploy

Listo para **Vercel** (`vercel.json`) o **Netlify** (`netlify.toml`): build `npm run build` → carpeta `dist`, con cache inmutable para `/assets` y fallback SPA. Sube el repo y conecta; sin configuración extra.

## Rendimiento

- Todo el movimiento de partículas vive en el **vertex shader** → ~0 CPU por frame.
- `dpr={[1,2]}` + `AdaptiveDpr` bajan resolución bajo carga.
- Menos partículas en móvil (7k vs 18k) detectando el `userAgent`.
- `prefers-reduced-motion` desactiva el scroll suave y el marquee.

## Personalización rápida

- **Colores:** variables CSS en `:root` (`global.css`) y uniforms `uColorCool/uColorWarm` en `DataSphere.jsx`.
- **Densidad de la esfera:** prop `count` en `Scene.jsx`.
- **Intensidad del bloom:** `<Bloom intensity={...} />` en `Scene.jsx`.
- **Textos / KPIs:** cada archivo de `sections/`.

> Datos y métricas son ilustrativos para la demo.
