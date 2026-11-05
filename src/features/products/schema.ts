import { z } from "zod";
import { isActiveField, requiredText } from "@/common/lib/formFields";
import { locations } from "@/common/locations";

/**
 * Número entero mayor o igual a `min`. Los precios y el stock son `Int` en la
 * base (pesos sin centavos), por eso no se aceptan decimales.
 * `error` cubre el caso del input vacío: `valueAsNumber` lo entrega como `NaN`.
 */
const wholeNumber = (min: number) =>
	z
		.number({ error: locations.errors.invalidNumber })
		.int(locations.errors.wholeNumber)
		.min(min, locations.errors.minValue(min));

/**
 * Formulario de producto → tabla `productos`.
 * La `url` no se pide: el backend la genera a partir del nombre.
 */
export const productSchema = z.object({
	// Relación obligatoria con `categorias` (`categoria_id`)
	categoryName: z.string().min(1, locations.errors.required),
	// `titulo String`
	name: requiredText(3, 80),
	// `descripcion String`: obligatoria; 300 caracteres caben bien en la tarjeta del catálogo
	description: requiredText(10, 300),
	// `precio_venta Int`: un producto gratis no tiene sentido, por eso el mínimo es 1
	price: wholeNumber(1),
	// `stock Int`: 0 es válido (producto agotado)
	stock: wholeNumber(0),
	// `activo Boolean`
	isActive: isActiveField,
	// `imagen String?`: opcional, así que se acepta vacío o una URL válida
	imageUrl: z.union([z.literal(""), z.url(locations.errors.invalidUrl)]),
});

export type ProductFormValues = z.infer<typeof productSchema>;
