import { createUrl } from "@/common/utils/helpers";
import type { ICreate } from "../domain/category.entity";
import type { CategoryRepository } from "@/features/categories/domain/Category.repository";

export class CreateUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(name: string) {
		const data: ICreate = {
			name,
			url: createUrl(name),
		};
		return this.repo.create(data);
	}
}
