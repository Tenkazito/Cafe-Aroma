import { z } from "zod";
import { locations } from "@/common/locations";

export const userSchema = (isEditing: boolean) =>
	z
		.object({
			fullName: z
				.string()
				.trim()
				.min(1, locations.errors.required)
				.min(3, locations.errors.minCharacters(3)),
			email: z.email(locations.errors.invalidEmail),
			role: z.enum(["administrador", "cliente"]),
			status: z.enum(["true", "false"]),
			password: isEditing
				? z.string().optional()
				: z.string().min(8, locations.errors.minCharacters(8)),
			confirmPassword: z.string().optional(),
		})
		.refine(
			(values) =>
				(!values.password && !values.confirmPassword) ||
				values.password === values.confirmPassword,
			{
				message: locations.errors.passwordsDontMatch,
				path: ["confirmPassword"],
			},
		);

export type UserFormValues = z.infer<ReturnType<typeof userSchema>>;
