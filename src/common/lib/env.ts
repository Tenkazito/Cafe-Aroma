/**
 * Lee DATABASE_URL y falla con un mensaje claro si no está definida,
 * en lugar de dejar que el error aparezca dentro del driver.
 */
export const databaseUrl = (): string => {
	const url = process.env.DATABASE_URL;

	if (!url) {
		throw new Error(
			"Falta la variable DATABASE_URL. Copia .env.example a .env y rellénala.",
		);
	}

	return url;
};

/**
 * `true` cuando la app corre con `pnpm dev`. Next.js fija NODE_ENV en
 * "production" al hacer `pnpm build` / `pnpm start`, así que las herramientas
 * internas (como la ruta /dev) pueden ocultarse en producción usando esto.
 */
export const isDevelopment = process.env.NODE_ENV !== "production";
