/**
 * Formatea un número como precio en pesos colombianos: 8500 → "$8.500".
 *
 * Toda la app usa COP (en la diapositiva del cliente aparecían precios en
 * dólares, pero se unificó la moneda).
 */
export const formatCurrency = (value: number): string => {
	return (
		new Intl.NumberFormat("es-CO", {
			style: "currency",
			currency: "COP",
			maximumFractionDigits: 0,
		})
			.format(value)
			// Intl mete un espacio duro entre "$" y el número; las diapositivas lo muestran pegado
			.replace(/\s/g, "")
	);
};

/**
 * Extrae las iniciales de un nombre completo para el fallback de un Avatar.
 *
 * "Laura Patiño" → "LP"
 */
export const getInitials = (name: string, max = 2): string => {
	return name
		.trim()
		.split(/\s+/)
		.slice(0, max)
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase();
};
