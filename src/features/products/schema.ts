import { z } from "zod";
import { locations } from "@/common/locations";

const nonNegativeNumber = z
	.number({ error: locations.errors.invalidNumber })
	.finite(locations.errors.invalidNumber)
	.min(0, locations.errors.negativeNumber);

export const productSchema = z.object({
	categoryName: z.string().trim().min(1, locations.errors.required),
	name: z
		.string()
		.trim()
		.min(1, locations.errors.required)
		.min(3, locations.errors.minCharacters(3)),
	description: z.string().trim().min(1, locations.errors.required),
	price: nonNegativeNumber,
	stock: nonNegativeNumber.int(locations.errors.invalidNumber),
	status: z.enum(["true", "false"]),
	imageUrl: z.union([z.literal(""), z.url()]).catch(""),
});

export type ProductFormValues = z.infer<typeof productSchema>;
