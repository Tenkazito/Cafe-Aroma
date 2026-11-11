import { hashPassword } from "@/common/utils/password";
import type { ICreate, SaveUserResult } from "../domain/user.entity";
import type { UserRepository } from "../domain/user.repository";

type CreateUserInput = Omit<ICreate, "passwordHash"> & { password: string };

export class CreateUseCase {
	constructor(private repo: UserRepository) {}

	async execute({
		password,
		...data
	}: CreateUserInput): Promise<SaveUserResult> {
		// Se guarda en minúsculas para que "Ana@x.co" y "ana@x.co" cuenten como el mismo correo
		const email = data.email.toLowerCase();
		if (await this.repo.isEmailTaken(email)) return "emailTaken";

		const created = await this.repo.create({
			...data,
			email,
			passwordHash: hashPassword(password),
		});
		return created ? "saved" : "failed";
	}
}
