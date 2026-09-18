# AromaCafe

Sistema de pedidos online para una cafetería. Proyecto universitario para aprender y practicar Next.js.

## Tecnologías

- [Next.js](https://nextjs.org/) (App Router)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) v4
- [HeroUI](https://heroui.com/) — librería de componentes
- [Prisma 8](https://www.prisma.io/) sobre [Neon](https://neon.tech/) Postgres
- [Biome](https://biomejs.dev/) — linter y formateador

## Puesta en marcha

Instalar dependencias:

```bash
pnpm install
```

Copiar las variables de entorno y rellenarlas:

```bash
cp .env.example .env
```

Levantar el servidor de desarrollo:

```bash
pnpm dev
```

Abrir [http://localhost:3000](http://localhost:3000).

## Estructura

```
src/
├── app/                    Rutas (App Router)
│   ├── page.tsx            Login
│   └── dashboard/          Panel de administración
├── common/                 Código compartido entre features
│   └── components/
└── features/               Código agrupado por dominio
    └── dashboard/
        ├── components/
        └── mocks/
```

El alias `@/` apunta a `src/`.

## Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Servidor de desarrollo |
| `pnpm build` | Compilación de producción |
| `pnpm start` | Sirve la compilación de producción |
| `pnpm lint` | Biome sobre todo el proyecto |
| `pnpm contract:emit` | Regenera los tipos del contrato de Prisma |

## Documentación

- [docs/prisma.md](docs/prisma.md) — guía de Prisma 8 (contrato, migraciones, consultas)
