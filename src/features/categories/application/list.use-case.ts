import type { CategoryRepository } from "../domain/Category.repository";

export class ListUseCase {
	constructor(private repo: CategoryRepository) {}

	execute() {
		return this.repo.list();
	}
}
