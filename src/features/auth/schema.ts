import { z } from "zod";
import { locations } from "@/common/locations";

export const loginSchema = (identifier: "email" | "username") =>
	z.object({
		identifier:
			identifier === "email"
				? z.email(locations.errors.invalidEmail)
				: z.string().trim().min(1, locations.errors.required),
		password: z.string().min(1, locations.errors.required),
		rememberMe: z.boolean(),
	});

export type LoginFormValues = z.infer<ReturnType<typeof loginSchema>>;
