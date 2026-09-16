# Tarea 3 - Sistemas Distribuidos

**Nombre:** Nazareth Gómez  
**Sitio publicado:** https://nazagomez.github.io/tarea-3-sistemas/

Aplicación de microservicios del Tutorial 6, con un shell de mini-sitios y un cuarto servicio de reseñas.

## Mini-sitios publicados

| Mini-sitio | Técnica de front-end | Dirección |
| --- | --- | --- |
| Shell | HTML + iframe | https://nazagomez.github.io/tarea-3-sistemas/ |
| Books | Vue 3 + vue-router | https://nazagomez.github.io/tarea-3-sistemas/books/ |
| Authors | React | https://nazagomez.github.io/tarea-3-sistemas/authors/ |
| Publishers | JavaScript vanilla | https://nazagomez.github.io/tarea-3-sistemas/publishers/ |
| Reviews | Vue 3 + vue-router | https://nazagomez.github.io/tarea-3-sistemas/reviews/ |

## Backends (Tutorial 6)

| Servicio | FaaS | Base de datos | API |
| --- | --- | --- | --- |
| Books | Netlify Functions | Neon (PostgreSQL) | `/api/books` y `/api/books/:id` |
| Authors | Cloudflare Workers | Cloudflare D1 | https://tarea3-authors-microservice.nazareth-gomez-504430491.workers.dev/api/authors |
| Publishers | Vercel Functions | Turso (libSQL) | `/api/publishers` y `/api/publishers/:id` |
| Reviews | Cloudflare Workers | Cloudflare D1 | https://tarea3-reviews-microservice.nazareth-gomez-504430491.workers.dev/api/reviews |

Cada backend incluye encabezados CORS y los datos de ejemplo del tutorial. Si no hay variables de entorno de base de datos, responde con el seed de lectura.

## Cómo ejecutar en local

```bash
# Mini-sitios
cd books-frontend && npm install && npm run dev
cd authors-frontend && npm install && npm run dev
cd publishers-frontend   # abrir index.html o un servidor estático
cd reviews-frontend && npm install && npm run dev

# Backends
cd books-backend && npm install && npm run dev
cd authors-backend && npm install && npm run dev
cd publishers-backend && npm install && npm run dev
cd reviews-backend && npm install && npm run dev
```

El shell se abre sirviendo la carpeta `shell` (o `dist` después del build).

```bash
chmod +x scripts/build-static.sh
./scripts/build-static.sh
```

## Bases de datos

Pegar `schema.sql` de cada backend en el SQL editor del proveedor:

- Books: Neon SQL Editor
- Authors y Reviews: `npx wrangler d1 execute <db> --file=schema.sql --remote`
- Publishers: cliente SQL de Turso

Variables de entorno:

- Books / Netlify: `DATABASE_URL`
- Publishers / Vercel: `TURSO_DATABASE_URL` y `TURSO_AUTH_TOKEN`
