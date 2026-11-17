import { createUrl, uploadImage } from "@/common/utils/helpers";
import type { IUpdate } from "../domain/product.entity";
import type { ProductRepository } from "../domain/product.repository";

export class UpdateUseCase {
	constructor(private repo: ProductRepository) {}

	async execute({ image, ...data }: Omit<IUpdate, "slug" | "imageUrl">) {
		// Sin foto nueva `imageUrl` queda `undefined` y el repositorio no toca la imagen actual
		let imageUrl: string | undefined;

		if (image instanceof File && image.size > 0) {
			const url = await uploadImage("products", image);
			if (!url) throw new Error("No se pudo subir la imagen a Vercel Blob");
			imageUrl = url;
		}

		return this.repo.update({
			...data,
			name: data.name.trim(),
			description: data.description.trim(),
			slug: createUrl(data.name),
			imageUrl,
		});
	}
}
