import type { CategoryRepository } from "../domain/Category.repository";

export class DeleteUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(id: number) {
		return this.repo.delete(id);
	}
}
