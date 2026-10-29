import { CreateUseCase } from "./application/create.use-case";
import { DeleteUseCase } from "./application/delete.use-case";
import { GetByIdUseCase } from "./application/get-by-id.use-case";
import { ListUseCase } from "./application/list.use-case";
import { UpdateUseCase } from "./application/update.use-case";
import { PrismaCategoryRepository } from "./infrastructure/prisma-category.repository";

const repo = new PrismaCategoryRepository();

export const categoryContainer = {
	createCategory: new CreateUseCase(repo),
	deleteCategory: new DeleteUseCase(repo),
	getByIdCategory: new GetByIdUseCase(repo),
	listCategory: new ListUseCase(repo),
	updateCategory: new UpdateUseCase(repo),
};
