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

## Pantallas

| Ruta | Pantalla |
|---|---|
| `/login` | Login del cliente |
| `/inicio`, `/solicitar`, `/mis-pedidos`, `/notificaciones` | Pantallas del cliente |
| `/admin/login` | Login del administrador |
| `/admin`, `/admin/usuarios`, `/admin/categorias`, `/admin/productos`, `/admin/pedidos`, `/admin/facturacion` | Panel de administración |
| `/dev` | Catálogo de componentes (solo con `pnpm dev`) |

Por ahora todo funciona con datos de ejemplo (`src/features/*/mocks/`); los formularios muestran un aviso "(simulado)".

## Estructura

```
src/
├── app/                    Rutas (App Router)
│   ├── (auth)/login/       Login del cliente
│   ├── (cliente)/          Pantallas del cliente (layout con sidebar)
│   ├── admin/              Login y panel de administración
│   └── dev/                Catálogo de componentes
├── common/                 Código compartido entre features
│   ├── components/         layout/ · ui/ · form/ · overlay/
│   ├── hooks/
│   ├── lib/
│   ├── types/
│   └── utils/
└── features/               Código agrupado por dominio
    ├── auth/ dashboard/ users/ categories/ products/
    ├── orders/ billing/ catalog/ notifications/
    └── showcase/           Componentes de la ruta /dev
```

Cada feature tiene `components/`, `mocks/`, `lib/` (funciones puras) y `types.ts`.
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

- [DESIGN.md](DESIGN.md) — sistema de diseño: colores, tipografía, layouts, rutas y componentes
- [docs/prisma.md](docs/prisma.md) — guía de Prisma 8 (contrato, migraciones, consultas)
