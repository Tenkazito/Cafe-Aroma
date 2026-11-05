# Contexto y Reglas de Desarrollo (AI Instructions)

Eres un desarrollador Full-Stack experto en Next.js y el ecosistema moderno de React. Tu objetivo es generar código limpio, escalable, **fácil de leer y modificar por un humano**, y que cumpla estrictamente con las convenciones de este proyecto y los principios de ingeniería de software.

## 1. Stack Tecnológico
- **Framework:** Next.js 16.3+ (App Router).
- **Lenguaje:** TypeScript estricto.
- **Gestor de Paquetes:** pnpm (NUNCA uses npm o yarn).
- **Estilos y UI:** Tailwind CSS y HeroUI.
- **Base de Datos y ORM:** PostgreSQL (NeonDB) + Prisma.
- **Formularios:** React Hook Form + Zod.
- **Validación de entorno:** Zod (`src/common/lib/env.ts`).
- **Testing:** Vitest.
- **Linter/Formatter:** Biome.

## 2. Principios de Diseño (SOLID)
El código generado debe adherirse a los principios SOLID aplicados a React y TypeScript:
- **Single Responsibility (SRP):** Cada componente, hook o función debe hacer una sola cosa. Separa la lógica de negocio de la UI.
- **Open/Closed (OCP):** Crea componentes extensibles mediante `props` (ej. usando `children` o polimorfismo) sin tener que modificar su código interno.
- **Liskov Substitution (LSP):** Extiende interfaces estándar de HTML cuando crees componentes base de UI (ej. un botón custom debe aceptar todos los atributos de un `<button>` nativo).
- **Interface Segregation (ISP):** Crea interfaces de TypeScript pequeñas y específicas. No le pases a un componente un objeto `Usuario` completo si solo necesita el `avatar` y el `nombre`.
- **Dependency Inversion (DIP):** Abstrae la lógica externa (como llamadas a APIs de terceros) en servicios aislados. El backend se organiza en una **arquitectura por capas dentro de cada feature** (`domain`, `application`, `infrastructure`, `presentation`; ver sección 3), de modo que cada capa dependa solo de la siguiente y el dominio no dependa de la base de datos.

## 3. Arquitectura de Archivos (Modular y Escalable)
Sigue estrictamente esta estructura. Se divide en lógica compartida (`common`), módulos de negocio aislados (`features`), base de datos (`prisma`) y pruebas (`tests`):

```text
📦 Raíz del proyecto
┣ 📂 prisma/                 # 🗄️ BASE DE DATOS
┃ ┣ 📂 migrations/           # Autogeneradas por Prisma. NUNCA editar a mano.
┃ ┣ 📄 schema.prisma         # Único archivo con todos los modelos (ver sección 7).
┃ ┗ 📄 seed.ts               # Datos de prueba. Se ejecuta con `pnpm db:seed`.
┣ 📂 src/
┃ ┣ 📂 app/                  # RUTAS (page.tsx, layout.tsx). Actúan como orquestadores.
┃ ┃ ┗ 📂 api/                # 🔌 Puerta de entrada de la API REST: solo los route.ts, que llaman al controller
┃ ┃   ┣ 📂 categories/
┃ ┃   ┃ ┣ 📄 route.ts        # /api/categories      → GET (listar), POST (crear)
┃ ┃   ┃ ┗ 📂 [id]/
┃ ┃   ┃   ┗ 📄 route.ts      # /api/categories/:id  → GET, PUT/PATCH, DELETE
┃ ┃   ┗ 📂 ...               # users, products, orders, notifications, auth, billing, dashboard, catalog
┃ ┣ 📄 middleware.ts         # Protección de rutas. Delgado: delega lógica a features/auth/lib
┃ ┣ 📂 common/               # 🌍 RECURSOS COMPARTIDOS (Se usan en toda la app)
┃ ┃ ┣ 📂 components/         # UI global (Componentes base de HeroUI, Layouts genéricos)
┃ ┃ ┣ 📂 hooks/              # Custom hooks globales (ej. useMediaQuery, useAuth)
┃ ┃ ┣ 📂 lib/                # Configuración de librerías y utilidades
┃ ┃ ┃ ┣ 📄 prisma.ts         # Cliente Prisma en singleton (evita múltiples conexiones)
┃ ┃ ┃ ┗ 📄 env.ts            # Validación de variables de entorno con Zod (ver sección 8)
┃ ┃ ┣ 📂 services/           # Servicios externos (Stripe, AWS, Mailer)
┃ ┃ ┣ 📂 types/              # Tipados globales e interfaces compartidas (ej. HttpMethod)
┃ ┃ ┗ 📂 utils/              # Utilidades puras (ej. api.ts → apiFetch, el cliente de la API)
┃ ┃
┃ ┗ 📂 features/             # 🧩 DOMINIOS DE NEGOCIO (Lógica modular e independiente)
┃   ┣ 📂 auth/               # Ejemplo: Dominio de autenticación
┃   ┃ ┣ 📂 components/
┃   ┃ ┣ 📂 lib/              # Lógica reutilizable del dominio (ej. checkSession(), usada por middleware.ts)
┃   ┃ ┣ 📂 hooks/            # Hooks exclusivos del dominio (ej. useCart en catalog)
┃   ┃ ┣ 📂 mocks/            # Datos de ejemplo estáticos mientras no existe el backend
┃   ┃ ┣ 📄 types.ts          # Tipos del dominio
┃   ┃ ┗ 📄 schema.ts         # Validaciones Zod del dominio (las usan el formulario y la API)
┃   ┗ 📂 categories/         # Ejemplo: feature con su backend por capas
┃     ┣ 📂 components/       # UI (frontend)
┃     ┣ 📂 domain/           # 🧱 category.entity.ts → la entidad con nombres del código (name, no titulo)
┃     ┣ 📂 application/      # ⚙️ Lógica de negocio / casos de uso (se define en clase)
┃     ┣ 📂 infrastructure/   # 🗄️ prisma-category.repository.ts → único que habla con Prisma y traduce columnas ↔ entidad
┃     ┣ 📂 presentation/     # 📨 category.controller.ts → recibe la petición HTTP y devuelve la respuesta
┃     ┗ 📄 schema.ts
┣ 📂 tests/                  # 🧪 PRUEBAS (Vitest). Espeja la jerarquía de src/
┃ ┣ 📂 common/
┃ ┗ 📂 features/
┃   ┣ 📂 auth/
┃   ┗ 📂 products/
┣ 📄 DESIGN.md               # Sistema de diseño: tokens, layouts, rutas e inventario de componentes
┣ 📄 .env.example            # Plantilla de variables de entorno (sin valores reales, sí se commitea)
┣ 📄 biome.json              # Reglas de formateo
┗ 📄 package.json
```

**Notas sobre la estructura:**
- **El backend es una API REST** (decisión del curso). Las URLs viven en `src/app/api/` y la lógica, por capas, dentro de cada feature. El frontend no habla con Prisma, solo llama a la API.
  - **Un recurso por carpeta en `src/app/api/`**, en plural y en inglés (`categories`, `products`), con dos niveles: la colección (`route.ts` → listar y crear) y el elemento (`[id]/route.ts` → ver, editar y eliminar). Los recursos de solo lectura (`dashboard`, `billing`, `catalog`) solo exportan `GET`.
  - **`route.ts` se mantiene delgado:** solo exporta `GET`, `POST`, etc. y llama a la función correspondiente del controller. No lleva lógica de negocio ni consultas a Prisma.
- **Arquitectura por capas (vista en clase)**, dentro de cada feature. Una petición recorre las capas en este orden:

  ```text
  src/app/api/<recurso>/route.ts  →  presentation  →  application  →  infrastructure  →  Prisma
                                        (controller)     (negocio)       (repository)
  ```

  | Capa | Archivo | Responsabilidad |
  |---|---|---|
  | `domain/` | `<recurso>.entity.ts` | Tipo de la entidad con los nombres del código en inglés y camelCase (`name`, `createdAt`), no los de la base (`titulo`, `fecha_creacion`). No importa nada de las otras capas ni de Prisma. |
  | `application/` | (se define en clase) | Lógica de negocio. Hasta que se vea en clase, no crees archivos aquí: pregunta. |
  | `infrastructure/` | `prisma-<recurso>.repository.ts` | **Único lugar que usa Prisma.** Hace las consultas y traduce las columnas de la base a la entidad del dominio (y al revés). |
  | `presentation/` | `<recurso>.controller.ts` | Recibe el `Request`, valida el body con el schema de Zod, llama a las capas de abajo y arma el `NextResponse`. |

  - **Nombres de archivo:** las capas usan el formato `<recurso>.<tipo>.ts` en singular (`category.entity.ts`, `prisma-category.repository.ts`, `category.controller.ts`). Es una excepción a propósito a los nombres en camelCase del resto del proyecto, para ver de un vistazo a qué capa pertenece cada archivo.
  - **Features sin tabla propia** (`auth`, `billing`, `dashboard`, `catalog`) tienen las 4 carpetas pero, por ahora, solo el controller: leen datos de otras features.
  - Las carpetas vacías llevan un `.gitkeep` para que git las suba al repo.
  - Los errores del backend se registran con `logger` (`src/common/utils/logger.ts`), que usa `console.error`.
- **El frontend llama a la API con `apiFetch`** (`src/common/utils/api.ts`), nunca con `fetch` suelto: así todas las peticiones comparten headers, formato JSON y manejo de errores (ver sección 6).
- `prisma/` vive en la raíz (no dentro de `src/`) porque es donde la CLI de Prisma lo espera por defecto.
- Las rutas viven en `src/app/` (el alias `@/` apunta a `src/`). Next.js exige que el middleware esté al mismo nivel que la carpeta `app/`, por eso va en `src/middleware.ts` (en Next 16 este archivo se renombró a `proxy.ts`; usa el nombre que pida la versión instalada). Debe quedarse delgado (solo lectura de cookies/headers y redirects); toda la lógica de verificación vive en `src/features/auth/lib/`, para poder testearla sin depender del runtime de Next.js.
- `tests/` está separado de `src/` y replica su jerarquía de carpetas: un archivo en `src/features/categories/infrastructure/prisma-category.repository.ts` tiene su prueba en `tests/features/categories/infrastructure/prisma-category.repository.test.ts`.

## 4. Convenciones de Código
- **Variables y Lógica:** Usa camelCase para variables genéricas, estados y funciones lógicas o de utilidad (ej. `const getUserData = () => {}`).
- **Componentes y Tipos:** Usa PascalCase EXCLUSIVAMENTE para Componentes de React, tipos e interfaces (ej. `const UserCard = () => {}`).
- **Funciones:** Usa SIEMPRE arrow functions para definir tanto componentes como funciones.
- **Tipado estricto:** Prohibido usar `any`. Infiere tipos cuando sea posible, pero tipa explícitamente los retornos de funciones complejas.
- **Importaciones (Paths):** Usa SIEMPRE Path Aliases (`@/`) para las importaciones absolutas. Evita el uso del patrón de barriles (`index.ts`); importa directamente desde el archivo específico para no comprometer el rendimiento del empaquetador web.

### 4.1 Legibilidad (para que puedas leer y modificar el código tú mismo)
- **Comenta el "por qué", no el "qué":** evita `// suma 1 al contador`; usa comentarios que expliquen decisiones no obvias (ej. `// se resta 1 porque el índice del array empieza en 0 pero el usuario lo ve empezando en 1`).
- **JSDoc obligatorio en el backend (los `route.ts` de `src/app/api/` y las capas `application/`, `infrastructure/` y `presentation/` de cada feature), en `common/services/` y en `common/utils/`:** toda función exportada ahí (incluidos los `GET`, `POST`, etc. de cada `route.ts`) debe llevar un comentario JSDoc corto explicando qué hace, qué recibe y qué retorna.
- **Funciones cortas:** si una función supera ~40-50 líneas, divídela en funciones auxiliares con nombres descriptivos en vez de dejar un bloque largo.
- **Textos en `src/common/locations.ts`:** todo texto visible de la interfaz (títulos, botones, placeholders, `aria-label`, mensajes de error y toasts) se escribe en el objeto `locations`, agrupado por temas (`locations.errors.manyCharacters(50)`, `locations.users.title`), y los componentes lo importan. No se escriben textos a mano en los componentes. Los datos de `mocks/` y los textos de `/dev` quedan fuera.
- **Nombres explícitos:** prohibidas las abreviaciones crípticas (`usr`, `prd`, `tmp`); usa `user`, `product`, `temporaryValue`.
- **Evita anidamiento profundo:** prefiere *early returns* a `if/else` anidados varios niveles.

## 5. Server Components vs Client Components
- **Server Components por defecto:** Asume que todo componente es de servidor. Los datos se obtienen de la API (sección 3); cómo los pide cada página se define junto con las capas del backend.
- **Client Components limitados:** Usa la directiva `"use client"` EXCLUSIVAMENTE en el nodo más pequeño posible que requiera interactividad real (`useState`, `useEffect`, `onClick`). Pasa los datos desde el servidor como *props*.

## 6. Manejo de Formularios y Errores
- **Formularios:** Construirlos siempre usando `react-hook-form` con validación de esquemas vía `@hookform/resolvers/zod`.
- **Validación en los dos lados:** el formulario valida con el schema de `features/<feature>/schema.ts`, y la API vuelve a validar el body con el **mismo schema** antes de tocar la base: cualquiera puede llamar a la API sin pasar por el formulario.
- **Respuestas de la API:** todo `route.ts` responde JSON con un formato estándar, `{ success: boolean, message: string, data?: T }`, y el código HTTP que corresponda: `200`/`201` si salió bien, `400` si los datos no pasan Zod, `404` si el recurso no existe, `409` si choca con una restricción única y `500` para errores inesperados.
- **Errores Esperados (Usuario):** en el frontend, las llamadas a la API van dentro de `try/catch`. `apiFetch` lanza un `Error` con el `message` que envió la API cuando la respuesta no es exitosa; el `catch` lo muestra con `toast.danger(error.message)` (Toasts de HeroUI). Nunca dejes un `catch` vacío.
- **Errores de Prisma:** Captura los códigos conocidos de Prisma (`PrismaClientKnownRequestError`) para dar mensajes claros al usuario. El caso más común es `P2002` (violación de restricción única, ej. email duplicado): tradúcelo a un mensaje entendible (`"Ya existe una cuenta con ese correo"`) en vez de mostrar el error crudo.
- **Errores Inesperados (Sistema):** Los errores graves de infraestructura, caídas de BD o fallos de código deben registrarse SIEMPRE en el servidor usando `console.error(error)` para su revisión en la terminal, retornando al cliente únicamente un mensaje genérico ("Error interno del servidor").

## 7. Base de Datos: Prisma + NeonDB
- **Un solo `schema.prisma`:** todos los modelos viven en `prisma/schema.prisma`. No se usa el schema multi-archivo; es innecesario para el tamaño de estos proyectos y mantiene todo el modelo de datos visible en un solo lugar.
- **Nombrado de modelos:** PascalCase singular (`model User`, `model Product`), campos en camelCase, igual que el resto del código TypeScript.
- **Acceso a datos:** el cliente de la base de datos solo se usa en la capa `infrastructure/` de cada feature (los repositorios, ver sección 3). Ningún componente, controller ni otra capa lo importa.
- **Cliente en singleton:** `src/common/lib/prisma.ts` exporta una única instancia de `PrismaClient`, reutilizada en toda la app para evitar agotar las conexiones de NeonDB en desarrollo (hot-reload) y en entornos serverless.
- **Dos URLs de conexión (importante en NeonDB):**
  - `DATABASE_URL`: la conexión *pooled* de Neon (con `-pooler` en el host). Se usa en runtime, para las queries normales de la app.
  - `DIRECT_URL`: la conexión directa de Neon (sin pooler). Se usa solo para migraciones (`prisma migrate`), que no funcionan bien a través del pooler.
  - Ambas se declaran en el bloque `datasource db` de `schema.prisma` (`url = env("DATABASE_URL")`, `directUrl = env("DIRECT_URL")`).
- **Migraciones:**
  - Desarrollo: `pnpm prisma migrate dev --name <descripcion-del-cambio>`.
  - Producción: `pnpm prisma migrate deploy`.
  - La carpeta `prisma/migrations/` es generada automáticamente; nunca se edita a mano.
- **Seed de datos de prueba:**
  - `prisma/seed.ts` contiene los datos iniciales/de prueba.
  - En `package.json` se configura: `"prisma": { "seed": "tsx prisma/seed.ts" }`.
  - Se ejecuta con `pnpm db:seed` (o automáticamente después de `migrate reset`).

## 8. Variables de Entorno
- **Validación con Zod:** `src/common/lib/env.ts` define un schema de Zod con todas las variables de entorno esperadas (`DATABASE_URL`, `DIRECT_URL`, etc.) y las valida al importarse por primera vez. Si falta o está mal una variable, la app debe fallar inmediatamente al arrancar (*fail-fast*), no en medio de una request.
- **Un solo punto de acceso:** ningún otro archivo del proyecto debe leer `process.env` directamente; siempre se importa el objeto ya validado desde `env.ts`. Esto da autocompletado y evita typos en nombres de variables.
- **`.env.example`:** plantilla con todas las variables necesarias (sin valores reales) que sí se commitea al repo, para que cualquiera pueda copiarla a `.env` y saber qué necesita configurar. El `.env` real nunca se commitea.

## 9. Middleware y Autenticación
- `src/middleware.ts` (junto a `src/app/`) debe mantenerse delgado: solo lee cookies/headers, decide si redirige, y nada más.
- Toda la lógica real de verificación de sesión (validar token, consultar rol, etc.) vive en `src/features/auth/lib/`, como funciones puras o casi puras que `middleware.ts` importa y usa. Así esa lógica se puede testear de forma aislada sin depender del runtime especial de Next.js Middleware (Edge Runtime).

## 10. Testing (Vitest)
- Las pruebas viven en `tests/` en la raíz, replicando la misma jerarquía de carpetas que `src/` (ej. `src/features/categories/presentation/category.controller.ts` → `tests/features/categories/presentation/category.controller.test.ts`).
- **Prioridad de qué testear:** primero lógica de negocio (las capas `application/`, `infrastructure/` y `presentation/` de cada feature, `services/` y `lib/`), que es donde vive el riesgo real. Los componentes de UI puramente visuales son de menor prioridad.
- Comando estándar: `pnpm test`.
