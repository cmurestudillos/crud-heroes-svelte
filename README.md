<p align="center">
  <a href="https://www.buymeacoffee.com/cmur"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=cmur&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff"></a>
</p>

# Svelte - Crud
Ejemplo de CRUD de héroes realizado en Svelte 5, consumiendo la API REST de [`crud-heroes-backend`](../crud-heroes-backend) (Node/Express/Mongoose).

## Instalar dependencias
Este proyecto usa **pnpm** como único gestor de paquetes. Ejecutar en terminal: `pnpm install`.

## Variables de entorno
- `.env` — `VITE_API_URL=http://localhost:6000/api` (desarrollo, puerto real de `crud-heroes-backend`)
- `.env.production` — `VITE_API_URL=https://crud-heroes-service.vercel.app/api`

## Iniciar proyecto
Ejecutar en terminal el comando `pnpm dev` e introducir en el navegador `http://localhost:5173/`.

## Compilar para producción
`pnpm run build` (salida en `dist/`).

## Lint y formato
- `pnpm run lint` — ESLint (flat config, `eslint-plugin-svelte`)
- `pnpm run format` — comprueba el formato con Prettier (`prettier-plugin-svelte`)

## Ayuda
Este proyecto se ha generado con [Svelte](https://svelte.dev).

Este proyecto fue migrado a Svelte 5 + pnpm en 2026-07-08.
