# Instalación

## Requisitos
- Node.js 20 o superior
- Git
- Acceso al repositorio en GitHub (el profe te invita)

## Pasos

```bash
git clone <url-del-repo>
cd ecommerce
npm install                 # también genera el cliente de Prisma
cp .env.example .env        # pega aquí el DATABASE_URL que te pasa el profe
npm run dev                 # abre http://localhost:3000
```

Si ves "El proyecto está corriendo", ya quedó.

> Usamos `.env` (no `.env.local`) porque Prisma solo lee `.env`. Next.js también lo lee.
> `.env` está en `.gitignore`: **nunca** lo subas.

## Comandos útiles

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run lint` | Revisa el código con ESLint |
| `npm test` | Tests unitarios y de componentes (Jest) |
| `npm run test:e2e` | Tests E2E (Playwright). La primera vez: `npx playwright install chromium` |
| `npx prisma generate` | Regenera el cliente de Prisma tras cambiar el schema |
| `npm run db:studio` | Explorar la base de datos en el navegador |

Solo el profe ejecuta `npm run db:migrate` y `npm run db:seed` (tocan la base compartida).

## Problemas comunes

- **`Can't reach database server`**: la conexión directa de Supabase (`db.xxx.supabase.co:5432`) es solo IPv6.
  Si tu red no tiene IPv6, usa la URL del *Session pooler* (Supabase → Connect → Session pooler).
- **`@prisma/client did not initialize yet`**: corre `npx prisma generate`.
