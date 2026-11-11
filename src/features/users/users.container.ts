import { CreateUseCase } from "./application/create.use-case";
import { DeleteUseCase } from "./application/delete.use-case";
import { GetByIdUseCase } from "./application/get-by-id.use-case";
import { ListUseCase } from "./application/list.use-case";
import { UpdateUseCase } from "./application/update.use-case";
import { PrismaUserRepository } from "./infrastructure/prisma-user.repository";

const repo = new PrismaUserRepository();

export const userContainer = {
	createUser: new CreateUseCase(repo),
	deleteUser: new DeleteUseCase(repo),
	getUserById: new GetByIdUseCase(repo),
	listUser: new ListUseCase(repo),
	updateUser: new UpdateUseCase(repo),
};
