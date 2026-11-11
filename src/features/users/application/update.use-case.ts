import { hashPassword } from "@/common/utils/password";
import type { IUpdate, SaveUserResult } from "../domain/user.entity";
import type { UserRepository } from "../domain/user.repository";

type UpdateUserInput = Omit<IUpdate, "passwordHash"> & { password: string };

export class UpdateUseCase {
	constructor(private repo: UserRepository) {}

	async execute({
		password,
		...data
	}: UpdateUserInput): Promise<SaveUserResult> {
		const email = data.email.toLowerCase();
		if (await this.repo.isEmailTaken(email, data.id)) return "emailTaken";

		const updated = await this.repo.update({
			...data,
			email,
			// Contraseña vacía al editar = mantener la actual
			passwordHash: password ? hashPassword(password) : undefined,
		});
		return updated ? "saved" : "failed";
	}
}
