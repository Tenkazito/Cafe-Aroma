/**
 * Formatea un número como precio.
 *
 * Los mocks traen los precios ya formateados ("$8.500"), pero el contrato
 * define `precio_venta` y `total` como Float, así que en cuanto los datos
 * vengan de la base habrá que formatearlos aquí.
 */
export function formatCurrency(value: number): string {
	return new Intl.NumberFormat("es-CO", {
		style: "currency",
		currency: "COP",
		maximumFractionDigits: 0,
	}).format(value);
}

/**
 * Extrae las iniciales de un nombre completo para el fallback de un Avatar.
 *
 * "Laura Patiño" → "LP"
 */
export function getInitials(name: string, max = 2): string {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, max)
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase();
}
