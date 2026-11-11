import type { ICreate, IUpdate, User } from "./user.entity";

export interface UserRepository {
	list(): Promise<User[] | boolean>;
	getById(id: number): Promise<User | boolean>;
	create(data: ICreate): Promise<boolean>;
	update(data: IUpdate): Promise<boolean>;
	delete(id: number): Promise<boolean>;
	// `exceptId` deja editar un usuario sin que su propio correo cuente como repetido
	isEmailTaken(email: string, exceptId?: number): Promise<boolean>;
}
