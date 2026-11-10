import { createUrl } from "@/common/utils/helpers";
import type { ICreate } from "../domain/product.entity";
import type { ProductRepository } from "../domain/product.repository";

export class CreateUseCase {
	constructor(private repo: ProductRepository) {}

	execute(data: Omit<ICreate, "slug">) {
		return this.repo.create({
			...data,
			name: data.name.trim(),
			description: data.description.trim(),
			slug: createUrl(data.name),
		});
	}
}
