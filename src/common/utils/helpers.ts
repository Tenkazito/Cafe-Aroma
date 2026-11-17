import { put } from "@vercel/blob";
import { logger } from "./logger";

export const createUrl = (value: string): string => {
	return value.trim().toLowerCase().replace(/\s+/g, "-");
};

export async function uploadImage(
	path: string,
	file: File,
): Promise<string | null> {
	try {
		// Espacios, tildes, etc. en el nombre ensucian la URL: se dejan solo caracteres seguros
		const safeName = file.name.replace(/[^\w.-]+/g, "-");
		const blob = await put(`${path}/${Date.now()}-${safeName}`, file, {
			access: "public",
		});
		return blob.url;
	} catch (error) {
		logger({ error: error as Error, module: "uploadImage" });
		return null;
	}
}
