import { z } from "zod";
import { locations } from "@/common/locations";

/**
 * Piezas de formulario que comparten varias features: reglas de Zod que se
 * repetían en los schemas y el manejo del select "Estado".
 */

/**
 * Texto obligatorio (columnas `String` sin `?` en la base) con un mínimo y un
 * máximo de caracteres. El `min(1)` va primero para que un campo vacío diga
 * "obligatorio" y no "debe tener al menos N caracteres".
 */
export const requiredText = (min: number, max: number) =>
	z
		.string()
		.trim()
		.min(1, locations.errors.required)
		.min(min, locations.errors.minCharacters(min))
		.max(max, locations.errors.manyCharacters(max));

/** Correo (`usuarios.email`). 254 es el largo máximo que permite el estándar de correos. */
export const emailField = z
	.string()
	.trim()
	.min(1, locations.errors.required)
	.max(254, locations.errors.manyCharacters(254))
	.pipe(z.email(locations.errors.invalidEmail));

/** Columna `activo Boolean` que tienen usuarios, categorías y productos. */
export const isActiveField = z.boolean();

/** Opciones del select "Estado" que comparten usuarios, categorías y productos. */
export const STATUS_OPTIONS = [
	{ value: "true", label: locations.status.active },
	{ value: "false", label: locations.status.inactive },
];

/**
 * Opciones de `register` para el select "Estado": `register("isActive", booleanSelectOptions)`.
 * El <select> entrega texto ("true"/"false"), pero React Hook Form también pasa
 * por aquí el valor inicial, que ya es booleano. `String()` cubre los dos casos.
 */
export const booleanSelectOptions = {
	setValueAs: (value: string | boolean) => String(value) === "true",
};
