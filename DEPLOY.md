# Publicar en producción: Vercel + dominio de GoDaddy

Guía completa, de código local a sitio en vivo con HTTPS.

---

## Paso 0 — Antes de subir nada (5 minutos)

No te saltes esto: son los dos errores que más caro salen después.

1. **Revisa tus datos de contacto.** Abre `src/content.json` → `marca` y
   confirma que el correo y el número de WhatsApp sean los correctos: el
   formulario entrega las solicitudes por esos dos canales.
2. **Verifica que compile.**

   ```bash
   npm run build
   npm run preview
   ```

   Abre `http://localhost:4173` y prueba: menú móvil, selector de talleres,
   botón de WhatsApp y envío del formulario. Lo que falle aquí, fallará en
   producción.

---

## Paso 1 — Subir el código a GitHub

Vercel despliega desde un repositorio. Desde la carpeta del proyecto:

```bash
git init
git add .
git commit -m "Landing Impulso Laboral Latino"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/impulso-laboral-latino.git
git push -u origin main
```

Crea antes el repositorio vacío en github.com (sin README, sin .gitignore: el
proyecto ya trae el suyo). `node_modules` y `dist` quedan excluidos.

---

## Paso 2 — Desplegar en Vercel

1. Entra a vercel.com y regístrate con tu cuenta de GitHub.
2. **Add New… → Project** e importa el repositorio.
3. Vercel detecta Vite automáticamente. Confirma que la configuración diga:

   | Campo            | Valor           |
   | ---------------- | --------------- |
   | Framework Preset | Vite            |
   | Build Command    | `npm run build` |
   | Output Directory | `dist`          |
   | Install Command  | `npm install`   |

4. **Deploy**. En un par de minutos tienes el sitio en vivo en una URL tipo
   `impulso-laboral-latino.vercel.app`. Ábrela y revísala: si algo se ve mal,
   arréglalo antes de tocar el dominio.

A partir de aquí, **cada `git push` a `main` redespliega producción solo.**

---

## Paso 3 — Agregar el dominio en Vercel

1. En tu proyecto: **Settings → Domains**.
2. Escribe tu dominio sin `www` (ej. `impulsolaborallatino.com`) y **Add**.
3. Vercel agrega también la versión `www` y pregunta cuál es la principal.
   Recomendación: deja **`www` como principal** y que el dominio raíz redirija
   hacia ella. Así el grueso del tráfico entra por el CNAME, que Vercel puede
   reapuntar sin que tú toques DNS nunca más.
4. Vercel muestra ahora una tarjeta con los valores exactos de DNS.
   **Déjala abierta: son los valores que copiarás en GoDaddy.**

> ⚠️ **Copia la IP de esa tarjeta, no de esta guía.** La IP histórica es
> `76.76.21.21`, pero los proyectos nuevos reciben una dirección de un grupo de
> IPs anycast, por ejemplo `216.198.79.1`. Vercel valida el registro exacto que
> espera tu proyecto: si no coincide, el dominio se queda en "Invalid
> Configuration" aunque el DNS esté bien propagado.

---

## Paso 4 — Configurar DNS en GoDaddy

Entra a godaddy.com → **Mis productos** → tu dominio → **DNS** →
**Administrar zonas de DNS**.

### 4.1 Limpia lo que estorba

GoDaddy crea registros por su cuenta que compiten con Vercel. Elimínalos:

- El registro **A** de tipo `@` que apunta a la página aparcada de GoDaddy
  (IPs tipo `76.223.105.230` o `Parked`).
- Cualquier registro **AAAA** (IPv6). Vercel no soporta IPv6 en dominios con DNS
  externo; dejarlo parte el tráfico entre dos proveedores y puede atorar la
  emisión del certificado SSL.
- El **CNAME `www`** que apunta a `@`, si existe.
- En la pestaña **Reenvío / Forwarding**: desactiva cualquier redirección de
  dominio o subdominio.

**No toques los registros MX ni los TXT de correo.** Si usas correo con ese
dominio, esos registros deben quedarse intactos: solo cambias A y CNAME.

### 4.2 Agrega los dos registros

| Tipo  | Nombre | Valor                                | TTL      |
| ----- | ------ | ------------------------------------ | -------- |
| A     | `@`    | *la IP que muestra tu tarjeta*       | 600 seg  |
| CNAME | `www`  | *el destino que muestra tu tarjeta*  | 600 seg  |

El destino del CNAME suele ser `cname.vercel-dns.com`, pero igual que la IP:
cópialo de la tarjeta.

Un TTL de 600 segundos hace que los cambios propaguen rápido mientras
configuras. Después puedes subirlo a 3600 si quieres.

### 4.3 Por qué A en la raíz y CNAME en www

No es capricho de Vercel. El estándar de DNS prohíbe que un CNAME conviva con
otros registros en el mismo nodo, y la raíz del dominio siempre carga registros
NS y SOA (y normalmente MX de correo). Por eso la raíz va con A y solo los
subdominios como `www` pueden usar CNAME.

---

## Paso 5 — Verificar

1. Vuelve a la pestaña de Vercel y presiona **Refresh**.
2. La propagación suele tardar entre 5 y 15 minutos con TTL bajo, aunque
   formalmente puede llevar hasta 48 horas.
3. Cuando el DNS resuelve, Vercel emite solo el certificado SSL (Let's Encrypt)
   para ambos nombres. Aparece un candado junto a cada uno.
4. Para revisar la propagación desde varios países: whatsmydns.net

**Pruebas finales en el dominio real:**

- `https://tudominio.com` redirige a `https://www.tudominio.com`
- El candado de HTTPS aparece en ambos
- El botón "Enviar por WhatsApp" abre el chat con la solicitud redactada
- El botón "Enviar por correo" abre el programa de correo con el mensaje listo
- El botón flotante de WhatsApp funciona en móvil
- Corre Lighthouse contra la URL de producción, no contra localhost

---

## Paso 6 — Ajustes posteriores al lanzamiento

Ya con el dominio definitivo, en `index.html`:

1. Cambia `<meta property="og:image" content="/logo.png">` por la URL absoluta:
   `https://www.tudominio.com/logo.png`. Las redes sociales no resuelven rutas
   relativas al generar la vista previa del enlace.
2. Agrega el canónico dentro de `<head>`:

   ```html
   <link rel="canonical" href="https://www.tudominio.com/" />
   ```

3. Agrega `<meta property="og:url" content="https://www.tudominio.com/" />`.

Haz `git push` y Vercel redespliega solo.

Después, da de alta el sitio en Google Search Console para que empiece a
indexarse.

---

## Qué hace `vercel.json`

Va incluido en el proyecto y no requiere configuración:

- **Cabeceras de seguridad**: `nosniff`, `X-Frame-Options`, `Referrer-Policy`,
  HSTS y `Permissions-Policy`. Suben la nota de "Best Practices" en Lighthouse y
  evitan que el sitio se pueda incrustar en un iframe ajeno.
- **Caché de assets**: los archivos de `/assets` llevan hash en el nombre, así
  que se cachean un año de forma inmutable. El HTML no se cachea, para que cada
  despliegue se vea de inmediato.

---

## Costos

El plan **Hobby** de Vercel es gratuito y suficiente para esta landing: incluye
HTTPS, despliegue continuo y CDN global. Su licencia es para uso no comercial;
si el sitio es la cara comercial del negocio, lo formal es el plan **Pro**
(20 USD al mes). El dominio lo sigues pagando en GoDaddy aparte.

---

## Si algo falla

| Síntoma                                    | Causa más probable                                                |
| ------------------------------------------ | ----------------------------------------------------------------- |
| "Invalid Configuration" en Vercel           | La IP del registro A no es la de tu tarjeta                       |
| El dominio muestra la página de GoDaddy     | Quedó el registro A aparcado o un reenvío activo                  |
| El SSL no se emite                          | Hay un registro AAAA sobrante, o falta propagar                   |
| `www` funciona y la raíz no (o al revés)    | Falta uno de los dos registros                                    |
| El correo dejó de llegar                    | Se borraron los MX: restáuralos con tu proveedor de correo        |
