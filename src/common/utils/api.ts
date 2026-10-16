import type { HttpMethod } from "@/common/types/httpMethod";

type ApiFetchOptions = {
	method?: HttpMethod;
	/** Se convierte a JSON antes de enviarse. */
	body?: unknown;
	headers?: HeadersInit;
};

/**
 * Llama a un endpoint de `src/app/api/` y devuelve la respuesta como JSON.
 * Recibe la URL (ej. "/api/categories") y las opciones (método, body, headers).
 * Si el servidor responde con un error, lanza un `Error` con el `message` que
 * envió la API, para atraparlo con `try/catch` y mostrarlo en un toast.
 */
export const apiFetch = async <T>(
	url: string,
	options: ApiFetchOptions = {},
): Promise<T> => {
	const { method = "GET", body, headers } = options;

	const response = await fetch(url, {
		method,
		headers: {
			"Content-Type": "application/json",
			...headers,
		},
		body: body !== undefined ? JSON.stringify(body) : undefined,
		// Siempre datos frescos: después de crear o editar, la siguiente lectura debe verlos
		cache: "no-store",
	});

	if (!response.ok) {
		// Si la respuesta de error no trae JSON, se usa un objeto vacío y el mensaje genérico
		const error = await response.json().catch(() => ({}));
		throw new Error(error.message || `Error HTTP ${response.status}`);
	}

	return response.json();
};
