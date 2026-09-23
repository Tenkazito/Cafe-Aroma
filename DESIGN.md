# DESIGN.md — Sistema de diseño de Café Aroma

Guía visual y de estructura del frontend. Complementa a `CLAUDE.md` (reglas de código).
Para ver cada componente en vivo, corre `pnpm dev` y abre **http://localhost:3000/dev**.

---

## 1. Propósito y alcance

- Plataforma web que unifica el flujo de pedidos de Café Aroma: el **cliente** solicita,
  el **admin** gestiona catálogo, pedidos y facturación.
- Alcance actual: **maquetación** fiel a las diapositivas, con **datos de ejemplo estáticos**
  (`src/features/*/mocks/`). Los formularios y acciones solo muestran un toast "(simulado)".
- Pendiente (lo construye el equipo): backend (`queries/` y `actions/` con Prisma),
  validación con Zod + React Hook Form y pruebas con Vitest. Cada punto a conectar está
  marcado en el código con un comentario `// TODO:`.
- Solo existe **tema claro** (las diapositivas no definen modo oscuro).

---

## 2. Tokens de color

Definidos en `src/app/globals.css` (`:root` + `@theme`), usables como clases de Tailwind
(`bg-navy`, `text-teal-strong`, `bg-surface-admin`, ...).

### Paleta de la marca

| Token | Hex | Uso |
|---|---|---|
| `navy` | `#16123f` | Texto principal, botón primario, elemento activo del menú, tarjetas destacadas |
| `teal` | `#75c9b7` | Acentos, llamada a la acción del cliente ("Solicitar ahora", "Finalizar Pedido"), badges |
| `teal-strong` | `#2a7f6f` | **Texto** y enlaces teal. El teal original sobre blanco no llega al contraste mínimo (≈1.9:1) |
| `lime` | `#abd699` | Acento secundario (poco uso) |
| `lemon` | `#ffe26a` | Barra de meta del día, etiqueta "Top", rol Mensajero |
| `mint` | `#c7ddcc` | Fondo de las pantallas del cliente |

### Superficies

| Token | Hex | Uso |
|---|---|---|
| `surface-admin` | `#eef4f1` | Fondo del panel de administración y del login admin |
| `surface-client` | `#c7ddcc` | Fondo de las pantallas del cliente |
| `surface-field` | `#e6f0e9` | Campos, filas del carrito y notificaciones no leídas del cliente |
| blanco | `#ffffff` | Tarjetas, tablas y modales |

### Colores semánticos

Un solo mapeo para toda la app (admin, cliente y facturación usan los mismos colores
para el mismo estado, aunque en las diapositivas variaban un poco).

| Concepto | Valor | Tono (`Badge`) |
|---|---|---|
| Pedido **Solicitado** | recién creado por el cliente | `warning` (amarillo) |
| Pedido **Pendiente** | aceptado, en preparación | `info` (azul) |
| Pedido **Entregado** | finalizado y facturable | `success` (verde) |
| Pedido **Cancelado** | rechazado | `danger` (rojo) |
| Rol **Administrador** | | `navy` (lavanda) |
| Rol **Administrativo** | | `teal` |
| Rol **Mensajero** | | `lemon` |
| **Activo / Inactivo** | usuarios, categorías, productos | `success` / `neutral`, con punto |
| **Stock bajo** | stock ≤ 15 (`LOW_STOCK_THRESHOLD`) | texto `orange-500` |

Los mapeos viven en `features/orders/lib/orderStatuses.ts` y `features/users/lib/userRoles.ts`.

### HeroUI

En `globals.css` se sobrescriben variables de HeroUI: `--accent` = navy (botón primario y
foco), `--focus` = teal, campos con borde gris de 1px, y los botones pasan de píldora
(`rounded-3xl`) a `rounded-xl` como en las diapositivas.

---

## 3. Tipografía

- Fuente: **Plus Jakarta Sans** (`next/font/google`, variable `--font-jakarta`).
- Escala:

| Elemento | Clases |
|---|---|
| Título de página | `text-2xl font-bold text-navy` |
| Título de sección / modal | `text-lg font-bold text-navy` |
| Número de tarjeta de estadística | `text-2xl`–`text-3xl font-bold` |
| Texto normal | `text-sm` |
| Texto secundario | `text-xs text-gray-500` / `text-gray-400` |
| Encabezado de tabla | `text-xs font-semibold uppercase tracking-wide text-gray-500` |

---

## 4. Forma, espacio e iconos

- Radios: inputs y botones `rounded-xl`; tarjetas, tablas y modales `rounded-2xl`; badges `rounded-full`.
- Sombra: `shadow-sm` en tarjetas; bordes `border-gray-100`.
- Espaciado entre bloques de una página: `gap-6`. Padding de tarjeta: `p-5` / `sm:p-6`.
- Iconos: [Lucide](https://lucide.dev) a través de `<Icon name="..." />`
  (`src/common/components/ui/Icon.tsx`). Tamaños: 14–16 en botones, 20 por defecto, 22–24 en cuadros de icono.
  Se piden por nombre (string tipado) porque un string se puede pasar de un Server
  Component a un Client Component; una función no.

---

## 5. Layouts

| Zona | Estructura | Componente |
|---|---|---|
| **Auth** | Fondo mint + logo + tarjeta blanca centrada | `features/auth/components/AuthCard.tsx` |
| **Admin** | Barra superior con logo, 6 enlaces, usuario y "Salir"; contenido `max-w-7xl` | `common/components/layout/AdminNavbar.tsx` |
| **Cliente** | Header (logo, campana, usuario) + sidebar izquierdo + contenido | `common/components/layout/ClientShell.tsx` |

Los enlaces de ambos menús están en `src/common/lib/navigation.ts`.

---

## 6. Mapa de rutas

```text
src/app/
├── page.tsx                         /                  → redirige a /login
├── (auth)/login/page.tsx            /login             Login del cliente (usuario)
├── admin/
│   ├── login/page.tsx               /admin/login       Login del admin (correo)
│   └── (panel)/                     (grupo con AdminNavbar)
│       ├── layout.tsx
│       ├── page.tsx                 /admin             Dashboard
│       ├── usuarios/page.tsx        /admin/usuarios
│       ├── categorias/page.tsx      /admin/categorias
│       ├── productos/page.tsx       /admin/productos
│       ├── pedidos/page.tsx         /admin/pedidos
│       └── facturacion/page.tsx     /admin/facturacion
├── (cliente)/                       (grupo con ClientShell)
│   ├── layout.tsx
│   ├── inicio/page.tsx              /inicio            Panel principal
│   ├── solicitar/page.tsx           /solicitar         Catálogo + resumen del pedido
│   ├── mis-pedidos/page.tsx         /mis-pedidos       Últimos pedidos
│   └── notificaciones/page.tsx      /notificaciones
└── dev/                             /dev               Catálogo de componentes (solo desarrollo)
    ├── layout.tsx                   404 en producción
    ├── page.tsx                     /dev               Índice + tokens
    └── <seccion>/page.tsx           /dev/common, /dev/auth, /dev/users, ...
```

- Los paréntesis `(auth)`, `(panel)`, `(cliente)` son **route groups**: agrupan rutas que
  comparten layout sin aparecer en la URL.
- Los **modales no son rutas**: los abre el componente "Manager" de cada pantalla con estado local.
- Pendiente: `/registro` (el enlace "Regístrate" existe, pero la pantalla no está en las diapositivas).

---

## 7. Inventario de componentes

### Compartidos — `src/common/components/`

| Carpeta | Componentes |
|---|---|
| `layout/` | `BrandLogo`, `UserBadge`, `AdminNavbar`, `ClientHeader`, `ClientSidebar`, `ClientShell` |
| `ui/` | `Icon`, `Badge`, `StatusBadge`, `StatCard` (tinted/outlined/solid), `DataTable`, `PageHeader`, `SectionCard`, `RankBadge`, `RowActions`, `SearchInput`, `FilterBar`, `EmptyState`, `UserAvatar`, `ProductThumbnail`, `LinkButton` |
| `form/` | `FormTextField`, `FormPasswordField`, `FormSelectField`, `FormTextAreaField`, `FormCheckbox`, `ImageUploadField` (+ `FieldWrapper`, `fieldStyles`) |
| `overlay/` | `AppModal` (base), `FormModal`, `ConfirmDialog` |

Hooks y utilidades: `common/hooks/useCrudModals.ts`, `common/utils/format.ts`,
`common/lib/navigation.ts`, `common/lib/statusOptions.ts`, `common/lib/env.ts`.

### Por feature — `src/features/<feature>/`

| Feature | Componentes | Lógica (`lib/`, `hooks/`) |
|---|---|---|
| `auth` | `AuthCard`, `LoginForm` | — |
| `dashboard` | `DailyTotalsPanel`, `DailyGoalCard`, `TopProductsWidget`, `SalesSummaryWidget`, `LoyalCustomersWidget` | — |
| `users` | `RoleBadge`, `UsersTable`, `UserFormModal`, `UsersManager` | `filterUsers`, `userRoles` |
| `categories` | `CategoriesTable`, `CategoryFormModal`, `CategoriesManager` | `filterCategories` |
| `products` | `ProductsTable`, `ProductFormModal`, `ProductsManager` | `filterProducts`, `isLowStock` |
| `orders` | `OrderStatusBadge`, `OrderStatsRow`, `OrderFilters`, `OrdersTable`, `OrderDetailModal`, `OrdersManager`, `CustomerStatsGrid`, `OrderCtaCard`, `CustomerOrdersTable`, `CustomerOrdersManager` | `filterOrders`, `filterCustomerOrders`, `countOrdersByStatus`, `orderTotals`, `orderStatuses` |
| `billing` | `BillingStats`, `InvoiceModal`, `BillingManager` | `invoices` |
| `catalog` | `CatalogSearchBar`, `CategoryTabs`, `CatalogProductCard` (full/compact), `QuantityStepper`, `CartItemRow`, `CartSummary`, `CatalogView` | `useCart`, `filterCatalog`, `cartTotals`, `categoryIcons` |
| `notifications` | `NotificationBell`, `NotificationItem`, `NotificationList` | `countUnread` |
| `showcase` | Componentes de la ruta `/dev` | `sections` |

**Dependencias entre features** (siempre en un solo sentido, sin ciclos):
`billing → orders`, `dashboard → orders, products`, `catalog → products, categories`.

---

## 8. Patrones

### Pantalla de listado (usuarios, categorías, productos, pedidos, facturación)

```text
page.tsx (Server Component)          importa el mock y se lo pasa al Manager
└── XxxManager ("use client")        estado: búsqueda/filtros + qué modal está abierto
    ├── PageHeader                   título + botón "Nuevo ..."
    ├── FilterBar / SearchInput
    ├── XxxTable                     solo pinta; avisa con onEdit / onDelete / onView
    ├── XxxFormModal                 crear / editar
    └── ConfirmDialog                eliminar, aceptar, rechazar
```

Solo el Manager es Client Component con estado; las tablas y badges solo pintan (CLAUDE.md §5).

### Modales

Todos usan `AppModal`: título + X arriba, contenido, pie gris con botones a la derecha
(Cancelar = `outline`, principal = `primary` navy, destructivo = `danger` rojo).

### Formularios

- Campos presentacionales de `common/components/form/`: aceptan todos los atributos
  nativos + `errorMessage`, así que se conectan a React Hook Form sin cambiarlos:

  ```tsx
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(userSchema),
  });

  <FormModal onSubmit={handleSubmit(onValid)} ...>
    <FormTextField label="Correo" {...register("email")} errorMessage={errors.email?.message} />
  </FormModal>
  ```

- El schema de Zod irá en `features/<feature>/schema.ts` y el envío en un Server Action
  de `features/<feature>/actions/`.

### Feedback

- Toasts de HeroUI (`toast.success`, `toast.info`, `toast.danger`), abajo a la derecha.
- Listas vacías: `EmptyState`. Tablas vacías: `emptyMessage` de `DataTable`.

---

## 9. Datos de ejemplo

- Cada feature guarda sus datos en `mocks/` y la página los importa directo
  (ej. `import { MOCK_USERS } from "@/features/users/mocks/users"`).
- El catálogo del cliente se **deriva** de los productos del admin (solo activos, stock 0 = agotado),
  y los totales de pedidos siempre se **calculan** desde sus productos (`getOrderTotal`).
- Moneda: **COP** en toda la app (`formatCurrency`), aunque la diapositiva del cliente mostraba dólares.
- Cuando exista el backend, se reemplaza el import del mock por una función de `queries/`.

---

## 10. Responsive y accesibilidad

- Admin: en pantallas `< lg` los enlaces del navbar pasan a un menú hamburguesa.
- Cliente: en `< md` el sidebar se oculta y se abre como panel lateral desde el header.
- Tablas: scroll horizontal dentro de su tarjeta en vez de romper el layout.
- Catálogo: 2 columnas en móvil, 3 en escritorio; el resumen del pedido baja debajo del catálogo en `< xl`.
- Botones de solo icono llevan `aria-label` ("Editar Latte Clásico"); los iconos son `aria-hidden`.
- Los labels están asociados a sus campos (`htmlFor` + `useId`); los errores usan `role="alert"`.
- Texto teal sobre blanco usa `teal-strong` por contraste.

---

## 11. Convenciones de nombres

- Código, carpetas y features en **inglés** (`features/orders`, `OrdersTable`).
- Textos de la interfaz y **URLs en español** (`/admin/pedidos`, `/mis-pedidos`).
- Admin con prefijo `/admin`; cliente sin prefijo.

---

## 12. Ruta `/dev`

Catálogo interno de componentes: `/dev` muestra los tokens y un índice; `/dev/common` los
compartidos y `/dev/<feature>` los de cada feature. Cada ficha (`ComponentPreview`) indica
qué hace el componente, su archivo, sus props principales y una vista previa en vivo
(los modales se abren con un botón).

Solo existe en desarrollo: `src/app/dev/layout.tsx` llama a `notFound()` cuando
`isDevelopment` (de `src/common/lib/env.ts`) es `false`, es decir, al correr `pnpm build` + `pnpm start`.

Para documentar un componente nuevo: agrégalo en `src/features/showcase/sections/<Feature>Showcase.tsx`.
