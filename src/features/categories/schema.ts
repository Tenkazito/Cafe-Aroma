import { z } from "zod";
import { isActiveField, requiredText } from "@/common/lib/formFields";

/**
 * Formulario de categoría → tabla `categorias`.
 * La `url` no se pide: el backend la genera a partir del nombre.
 */
export const categorySchema = z.object({
	// `titulo String`: obligatorio. 50 alcanza para nombres de menú como "Bebidas Calientes"
	name: requiredText(3, 50),
	// `activo Boolean`
	isActive: isActiveField,
});

// El tipo del formulario sale del schema: así no se escribe dos veces
export type CategoryFormValues = z.infer<typeof categorySchema>;
