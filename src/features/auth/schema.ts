import { z } from "zod";
import { emailField } from "@/common/lib/formFields";
import { locations } from "@/common/locations";

/**
 * Login único para administradores y clientes. A dónde entra cada uno lo
 * decide su `rol` en la base, no algo que elija en el formulario.
 */
export const loginSchema = z.object({
	email: emailField,
	// Aquí solo se exige que no esté vacía: el largo mínimo se valida al crear la
	// cuenta, y repetirlo aquí le daría pistas a quien intenta adivinar contraseñas
	password: z.string().min(1, locations.errors.required),
	rememberMe: z.boolean(),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
