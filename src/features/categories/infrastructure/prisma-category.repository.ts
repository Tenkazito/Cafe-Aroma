import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type { ICreate, IUpdate } from "../domain/category.entity";

const categorias = () => db.orm.public.categorias;

export class PrismaCategoryRepository {
	async list() {
		try {
			const query = await categorias()
				.select("id", "titulo", "url", "fecha_creacion", "activo")
				.all();

			return query.map((item) => ({
				...item,
				active: item.activo ? "Activo" : "Inactivo",
			}));
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:list",
			});
			return [];
		}
	}

	async getById(id: number) {
		try {
			return await categorias()
				.select("id", "titulo", "url", "fecha_creacion", "activo")
				.where({ id })
				.first();
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:getById",
			});
			return null;
		}
	}

	async create(data: ICreate) {
		try {
			await categorias().create({
				titulo: data.titulo,
				url: data.url,
			});

			return true;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:create",
			});
			return false;
		}
	}

	async update(data: IUpdate) {
		try {
			await categorias()
				.where({ id: data.id })
				.update({ titulo: data.titulo, url: data.url });

			return true;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:update",
			});
			return false;
		}
	}

	async delete(id: number) {
		try {
			await categorias().where({ id }).update({ activo: false });

			return true;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:delete",
			});
			return false;
		}
	}
}
