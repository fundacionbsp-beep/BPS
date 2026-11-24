# Fundación Buscando Su Presencia (BSP) — sitio web

Sitio estático (HTML + CSS + JS), sin build. Listo para Vercel.

## Publicar en Vercel (sin instalar nada)
1. Sube esta carpeta a un repositorio de GitHub (arrastra los archivos en github.com/new → "uploading an existing file").
2. En vercel.com → **Add New… → Project** → importa el repositorio.
3. Framework Preset: **Other**. Build Command y Output Directory: déjalos vacíos. Pulsa **Deploy**.

## Publicar con la terminal
```
npm i -g vercel
cd bsp-web
vercel --prod
```

## Dónde cambiar cosas
- Teléfono WhatsApp: busca `573238085179` en `index.html` y `script.js`.
- Correo: busca `fundacionbsp@gmail.com` en `index.html`.
- Fotos: carpeta `img/` (mismos nombres de archivo para reemplazarlas).
- Colores: variables al inicio de `styles.css`.
- Datos para donar: por ahora se piden por WhatsApp. Cuando quieras, agrega tu cuenta/Nequi en el paso 2 de la sección Donaciones.
