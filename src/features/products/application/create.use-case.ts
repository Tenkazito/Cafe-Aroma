import { createUrl, uploadImage } from "@/common/utils/helpers";
import type { ICreate } from "../domain/product.entity";
import type { ProductRepository } from "../domain/product.repository";

export class CreateUseCase {
	constructor(private repo: ProductRepository) {}

	async execute({ image, ...data }: Omit<ICreate, "slug" | "imageUrl">) {
		let imageUrl: string | undefined;

		// Si viene una foto se sube a Vercel Blob; si falla no se guarda el producto sin ella
		if (image instanceof File && image.size > 0) {
			const url = await uploadImage("products", image);
			if (!url) throw new Error("No se pudo subir la imagen a Vercel Blob");
			imageUrl = url;
		}

		return this.repo.create({
			...data,
			name: data.name.trim(),
			description: data.description.trim(),
			slug: createUrl(data.name),
			imageUrl,
		});
	}
}
