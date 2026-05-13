# Configuracion Vercel

## Estado

Proyecto conectado a Vercel y desplegado en produccion.

## Proyecto

- Nombre: `kathyweb`
- Scope: `katheryne-s-projects`
- Repositorio GitHub conectado: `https://github.com/katysantacruztradu-boop/kathyweb`

## URLs

Produccion:

```text
https://kathyweb.vercel.app
```

Deployment especifico:

```text
https://kathyweb-icwy7ne5f-katheryne-s-projects.vercel.app
```

Inspector:

```text
https://vercel.com/katheryne-s-projects/kathyweb/445SBGtRTk7f56FnWBNs6bsgqjdp
```

## Configuracion

El proyecto usa `vercel.json` para configuracion estatica:

- `cleanUrls`: activo.
- `trailingSlash`: desactivado.
- Headers basicos de seguridad.

## Comandos utiles

Desplegar preview:

```bash
vercel
```

Desplegar produccion:

```bash
vercel --prod
```

Inspeccionar deployment:

```bash
vercel inspect kathyweb.vercel.app
```

## Nota

La carpeta `.vercel` queda ignorada por Git porque contiene configuracion local del enlace con Vercel.
