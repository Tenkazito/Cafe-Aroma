import { createUrl } from "@/common/utils/helpers";
import type { IUpdate } from "../domain/product.entity";
import type { ProductRepository } from "../domain/product.repository";

export class UpdateUseCase {
	constructor(private repo: ProductRepository) {}

	execute(data: Omit<IUpdate, "slug">) {
		return this.repo.update({
			...data,
			name: data.name.trim(),
			description: data.description.trim(),
			slug: createUrl(data.name),
		});
	}
}
