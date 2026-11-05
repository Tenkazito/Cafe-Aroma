import { createUrl } from "@/common/utils/helpers";
import type { IUpdate } from "../domain/category.entity";
import type { CategoryRepository } from "../domain/category.repository";

export class UpdateUseCase {
	constructor(private repo: CategoryRepository) {}

	execute(data: IUpdate) {
		const dataToUpdate: IUpdate = {
			id: data.id,
			name: data.name,
			url: createUrl(data.name),
		};
		return this.repo.update(dataToUpdate);
	}
}
