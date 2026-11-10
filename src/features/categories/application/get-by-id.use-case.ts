import type { CategoryRepository } from "../domain/Category.repository";

export class GetByIdUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(id: number) {
		return this.repo.getById(id);
	}
}
