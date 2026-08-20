# Impulso Laboral Latino — Landing de servicios y Talleres Insignia

Landing page en React + Vite para la consultoría: portafolio de servicios de RH,
los tres talleres insignia y el ciclo trimestral.

## Requisitos

- Node.js 18 o superior (recomendado 20+). Verifícalo con `node -v`.
- npm (viene incluido con Node).

## Cómo levantarlo en local

```bash
cd talleres-insignia
npm install     # solo la primera vez
npm run dev
```

Se abre solo en `http://localhost:5173`.

### Otros comandos

```bash
npm run build     # versión de producción en /dist
npm run preview   # sirve /dist en http://localhost:4173
```

### Auditar con Lighthouse

Lighthouse debe correrse siempre sobre el build, nunca sobre `npm run dev`
(el servidor de desarrollo no minifica y baja artificialmente la nota):

```bash
npm run build
npm run preview
# en otra terminal:
npx lighthouse http://localhost:4173 --view --preset=desktop
npx lighthouse http://localhost:4173 --view   # perfil móvil
```

## Todo el contenido vive en un solo archivo

`src/content.json` es la única fuente de contenido del sitio. Textos, servicios,
talleres, paquetes, correo y WhatsApp se editan ahí; los componentes solo lo
recorren y lo pintan. No hay copy dentro del código.

```
src/
├── content.json         ← TODO el contenido editable
├── App.jsx              ← arma las secciones a partir del JSON
├── components/
│   ├── Navbar.jsx       ← logo, menú móvil
│   ├── Hero.jsx
│   ├── Nosotros.jsx     ← Quiénes somos
│   ├── CardsSection.jsx ← una sola implementación para las 4 secciones de cards
│   ├── Talleres.jsx     ← selector + detalle del taller
│   ├── Incluye.jsx      ← entregables
│   ├── Ciclo.jsx        ← ruta trimestral
│   ├── Contacto.jsx     ← formulario con validación
│   ├── Footer.jsx
│   ├── WhatsAppFab.jsx  ← botón flotante de WhatsApp
│   └── ui/              ← íconos SVG y encabezado de sección
├── lib/
│   └── contacto.js      ← enlaces de WhatsApp y correo con la solicitud
└── styles/
    ├── tokens.css       ← colores de marca, tipografía, espaciado
    └── global.css       ← reset y utilidades
```

### Ejemplos de edición

| Quieres cambiar…                     | Abre                                  |
| ------------------------------------ | ------------------------------------- |
| Correo o número de WhatsApp          | `content.json` → `marca`              |
| Asunto del correo de solicitudes     | `content.json` → `contacto`           |
| Un temario, precio o texto cualquiera| `content.json`                        |
| Agregar una línea de servicio        | `content.json` → `secciones[0].items` |
| Colores de marca                     | `src/styles/tokens.css`               |

Para vincular una línea de servicio con un taller, agrega al item:

```json
"talleres": [{ "id": "liderazgo-que-conecta", "label": "Liderazgo que Conecta" }]
```

El `id` debe coincidir con uno de `content.json → talleres`. La landing genera
sola el botón que abre ese taller. Si un servicio no tiene taller equivalente,
simplemente omite la propiedad y queda como contenido informativo.

## Cómo funciona el formulario

La landing no tiene backend ni servicios de terceros. El formulario captura los
datos, valida lo obligatorio y **redacta la solicitud**; el visitante elige por
dónde entregarla:

- **Enviar por WhatsApp** — abre tu chat con el resumen ya escrito.
- **Enviar por correo** — abre el programa de correo del visitante con el
  mensaje listo para `quezadasmarce@outlook.com`.

Ambos canales mandan el mismo resumen, con el servicio de interés y el tamaño
del grupo incluidos: el lead llega precalificado para cotizar.

No hay estado de "enviado" falso. Nada finge un envío que no ocurrió: los
botones son enlaces reales y el aviso posterior solo confirma que se abrió el
canal, no que el mensaje se envió.

La lógica vive en `src/lib/contacto.js`. El asunto del correo se edita en
`content.json` → `contacto.asuntoCorreo`.

### Limitación que conviene conocer

El envío por correo usa `mailto:`, que depende de que el visitante tenga un
programa de correo configurado. En celular casi siempre funciona; en escritorio,
quien usa Gmail desde el navegador sin configurarlo como predeterminado puede no
ver nada al dar clic. Por eso WhatsApp es el botón principal y el correo el
secundario. Si más adelante quieres que las solicitudes lleguen solas a tu
bandeja sin depender del visitante, hace falta un servicio de formularios o un
backend propio.

## Decisiones técnicas

- **Mobile first**: todos los estilos parten del layout de móvil y crecen con
  `@media (min-width: …)`. No hay `max-width` en el CSS.
- **CSS Modules**: estilos con alcance por componente, sin colisiones de clases.
- **Cero dependencias de UI**: los íconos son SVG propios; el bundle queda en
  ~59 KB gzip.
- **Rendimiento**: fuentes cargadas sin bloquear el render, logo comprimido a
  16 KB con `width`/`height` declarados para evitar saltos de layout (CLS).
- **Accesibilidad**: contrastes verificados contra WCAG AA (mínimo 4.5:1 en texto
  normal), selector de talleres con patrón `tablist` de WAI-ARIA navegable por
  teclado, foco visible, `prefers-reduced-motion` respetado y enlace para saltar
  al contenido.
- **SEO**: title y meta description descriptivos, Open Graph y datos
  estructurados `ProfessionalService` en `index.html`.

## Publicar en producción

Ver `DEPLOY.md`: despliegue en Vercel y conexión con un dominio de GoDaddy,
paso a paso. El archivo `vercel.json` ya trae cabeceras de seguridad y política
de caché; no hay que configurarlo.

## Assets

`public/logo.png` y `public/favicon.png` se generaron a partir del logotipo
original: recorte de márgenes, fondo transparente y compresión de paleta.
