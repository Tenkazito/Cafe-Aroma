import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type {
	ICreate,
	IUpdate,
} from "@/features/categories/domain/category.entity";
import type { Category } from "../domain/category.entity";
import type { CategoryRepository } from "../domain/category.repository";

const categoriesTable = () => db.orm.public.categorias;

export class PrismaCategoryRepository implements CategoryRepository {
	async list(): Promise<Category[] | boolean> {
		try {
			const query = await categoriesTable()
				.select("id", "titulo", "url", "fecha_creacion", "activo")
				.all();

			return query.map((item) => ({
				...item,
				name: item.titulo,
				isActive: item.activo ? "Activo" : "Inactivo",
				createdAt: item.fecha_creacion,
			}));
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:list",
			});
			return [];
		}
	}

	async getById(id: number): Promise<Category | boolean> {
		try {
			const row = await categoriesTable()
				.select("id", "titulo", "url", "fecha_creacion", "activo")
				.where({ id })
				.first();

			if (!row) return false;

			return {
				...row,
				name: row.titulo,
				isActive: row.activo ? "Activo" : "Inactivo",
				createdAt: row.fecha_creacion,
			};
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:getById",
			});
			return false;
		}
	}

	async create(data: ICreate): Promise<boolean> {
		try {
			const query = await categoriesTable().create({
				titulo: data.name,
				url: data.url,
			});

			return !!query?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:create",
			});
			return false;
		}
	}

	async update(data: IUpdate): Promise<boolean> {
		try {
			const row = await categoriesTable()
				.where({ id: data.id })
				.update({ titulo: data.name, url: data.url });

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:update",
			});
			return false;
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const row = await categoriesTable()
				.where({ id })
				.update({ activo: false });

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaCategoryRepository:delete",
			});
			return false;
		}
	}
}
