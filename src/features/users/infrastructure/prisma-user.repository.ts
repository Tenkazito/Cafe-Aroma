import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type {
	ICreate,
	IUpdate,
	User,
} from "@/features/users/domain/user.entity";
import type { UserRepository } from "../domain/user.repository";

const usersTable = () => db.orm.public.usuarios;

export class PrismaUserRepository implements UserRepository {
	async list(): Promise<User[] | boolean> {
		try {
			const query = await usersTable()
				.select(
					"id",
					"nombre",
					"apellido",
					"email",
					"rol",
					"activo",
					"fecha_creacion",
				)
				.all();

			return query.map((item) => ({
				...item,
				firstName: item.nombre,
				lastName: item.apellido,
				role: item.rol,
				isActive: item.activo,
				createdAt: item.fecha_creacion,
			}));
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaUserRepository:list",
			});
			return [];
		}
	}

	async getById(id: number): Promise<User | boolean> {
		try {
			const row = await usersTable()
				.select(
					"id",
					"nombre",
					"apellido",
					"email",
					"rol",
					"activo",
					"fecha_creacion",
				)
				.where({ id })
				.first();

			if (!row) return false;

			return {
				...row,
				firstName: row.nombre,
				lastName: row.apellido,
				role: row.rol,
				isActive: row.activo,
				createdAt: row.fecha_creacion,
			};
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaUserRepository:getById",
			});
			return false;
		}
	}

	async create(data: ICreate): Promise<boolean> {
		try {
			const query = await usersTable().create({
				nombre: data.firstName,
				apellido: data.lastName,
				email: data.email,
				rol: data.role,
				activo: data.isActive,
				contrasena: data.passwordHash,
			});

			return !!query?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaUserRepository:create",
			});
			return false;
		}
	}

	async update(data: IUpdate): Promise<boolean> {
		try {
			const row = await usersTable()
				.where({ id: data.id })
				.update({
					nombre: data.firstName,
					apellido: data.lastName,
					email: data.email,
					rol: data.role,
					activo: data.isActive,
					// Solo se incluye la columna si hay contraseña nueva
					...(data.passwordHash && { contrasena: data.passwordHash }),
				});

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaUserRepository:update",
			});
			return false;
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const row = await usersTable().where({ id }).update({ activo: false });

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaUserRepository:delete",
			});
			return false;
		}
	}

	async isEmailTaken(email: string, exceptId?: number): Promise<boolean> {
		const row = await usersTable().select("id").where({ email }).first();
		return !!row && row.id !== exceptId;
	}
}
