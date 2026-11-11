import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type {
	ICreate,
	IUpdate,
} from "@/features/products/domain/product.entity";
import type { Product } from "../domain/product.entity";
import type { ProductRepository } from "../domain/product.repository";

const productsTable = () => db.orm.public.productos;

export class PrismaProductRepository implements ProductRepository {
	async list(): Promise<Product[] | boolean> {
		try {
			const query = await productsTable()
				.select(
					"id",
					"titulo",
					"url",
					"descripcion",
					"categoria_id",
					"fecha_creacion",
					"precio_venta",
					"stock",
					"activo",
					"imagen",
				)
				.all();

			return query.map((item) => ({
				...item,
				name: item.titulo,
				slug: item.url,
				description: item.descripcion,
				categoryId: item.categoria_id,
				createdAt: item.fecha_creacion,
				price: item.precio_venta,
				isActive: item.activo,
				imageUrl: item.imagen,
			}));
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaProductRepository:list",
			});
			return [];
		}
	}

	async getById(id: number): Promise<Product | boolean> {
		try {
			const row = await productsTable()
				.select(
					"id",
					"titulo",
					"url",
					"descripcion",
					"categoria_id",
					"fecha_creacion",
					"precio_venta",
					"stock",
					"activo",
					"imagen",
				)
				.where({ id })
				.first();

			if (!row) return false;

			return {
				...row,
				name: row.titulo,
				slug: row.url,
				description: row.descripcion,
				categoryId: row.categoria_id,
				createdAt: row.fecha_creacion,
				price: row.precio_venta,
				isActive: row.activo,
				imageUrl: row.imagen,
			};
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaProductRepository:getById",
			});
			return false;
		}
	}

	async create(data: ICreate): Promise<boolean> {
		try {
			const query = await productsTable().create({
				titulo: data.name,
				url: data.slug,
				descripcion: data.description,
				categoria_id: data.categoryId,
				precio_venta: data.price,
				stock: data.stock,
				activo: data.isActive ?? true,
			});

			return !!query?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaProductRepository:create",
			});
			return false;
		}
	}

	async update(data: IUpdate): Promise<boolean> {
		try {
			const row = await productsTable().where({ id: data.id }).update({
				titulo: data.name,
				url: data.slug,
				descripcion: data.description,
				categoria_id: data.categoryId,
				precio_venta: data.price,
				stock: data.stock,
				activo: data.isActive,
			});

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaProductRepository:update",
			});
			return false;
		}
	}

	async delete(id: number): Promise<boolean> {
		try {
			const row = await productsTable().where({ id }).update({ activo: false });

			return !!row?.id;
		} catch (error) {
			logger({
				error: error as Error,
				module: "PrismaProductRepository:delete",
			});
			return false;
		}
	}
}
