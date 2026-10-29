import type { CategoryRepository } from "../domain/Category.repository";
import type { ICreate } from "../domain/category.entity";

export class CreateUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(name: string) {
		const url = name.trim().toLowerCase().replace(/\s+/g, "-");
		const data: ICreate = {
			name,
			url,
		};
		return this.repo.create(data);
	}
}
