import type { CategoryRepository } from "../domain/Category.repository";
import type { IUpdate } from "../domain/category.entity";

export class UpdateUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(data: IUpdate) {
		return this.repo.update(data);
	}
}
