/**
 * Lee DATABASE_URL y falla con un mensaje claro si no está definida,
 * en lugar de dejar que el error aparezca dentro del driver.
 */
export function databaseUrl(): string {
	const url = process.env.DATABASE_URL;

	if (!url) {
		throw new Error(
			"Falta la variable DATABASE_URL. Copia .env.example a .env y rellénala.",
		);
	}

	return url;
}
