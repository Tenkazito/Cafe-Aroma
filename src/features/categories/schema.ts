import { z } from "zod";
import { locations } from "@/common/locations";

export const categorySchema = z.object({
	name: z.string().trim().min(3, locations.errors.minCharacters(3)),
	isActive: z.boolean(),
});

// El tipo del formulario sale del schema: así no se escribe dos veces
export type CategoryFormValues = z.infer<typeof categorySchema>;
