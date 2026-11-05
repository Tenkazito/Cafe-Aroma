import { z } from "zod";
import {
	emailField,
	isActiveField,
	requiredText,
} from "@/common/lib/formFields";
import { locations } from "@/common/locations";
import type { UserRole } from "@/features/users/types";

// Valores del enum `rol_usuario` de la base
const USER_ROLE_VALUES = [
	"administrador",
	"cliente",
] as const satisfies readonly UserRole[];

// La base guarda el hash (`contrasena String`), no la contraseña; 8 es el mínimo razonable.
// No usa `requiredText` porque ese hace `trim()`, y un espacio en una contraseña es válido
const password = z
	.string()
	.min(1, locations.errors.required)
	.min(8, locations.errors.minCharacters(8))
	.max(64, locations.errors.manyCharacters(64));

/**
 * Formulario de usuario → tabla `usuarios`.
 * Al editar, la contraseña puede quedar vacía ("no cambiarla"); si se escribe
 * algo, debe cumplir las mismas reglas que al crear.
 * Que el correo no esté repetido (`email @unique`) lo valida la base al guardar,
 * no Zod: el Server Action traduce ese error (P2002) a `locations.errors.duplicateEmail`.
 */
export const userSchema = (isEditing: boolean) =>
	z
		.object({
			// `nombre String` y `apellido String`
			firstName: requiredText(2, 50),
			lastName: requiredText(2, 50),
			// `email String @unique`
			email: emailField,
			// `rol rol_usuario`
			role: z.enum(USER_ROLE_VALUES),
			// `activo Boolean`
			isActive: isActiveField,
			password: isEditing ? password.or(z.literal("")) : password,
			confirmPassword: z.string(),
		})
		.refine((values) => values.password === values.confirmPassword, {
			message: locations.errors.passwordsDontMatch,
			path: ["confirmPassword"],
		});

export type UserFormValues = z.infer<ReturnType<typeof userSchema>>;
