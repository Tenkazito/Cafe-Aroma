import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type {
	ICreate,
	IUpdate,
} from "@/features/categories/domain/category.entity";

const categoriesTable = () => db.orm.public.categorias;

export class PrismaCategoryRepository {
	async list() {
		try {
			const query = await categoriesTable()
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
			return await categoriesTable()
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
			await categoriesTable().create({
				titulo: data.name,
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
			await categoriesTable()
				.where({ id: data.id })
				.update({ titulo: data.name, url: data.slug });

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
			await categoriesTable().where({ id }).update({ activo: false });

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
