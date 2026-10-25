import { db } from "@/common/lib/db";
import { logger } from "@/common/utils/logger";
import type { ICreate, IUpdate } from "../domain/product.entity";

const product = () => db.orm.public.productos

export class PrismaProductRepository{
   async list(){
        try {
            const query = await product()
				.select("id", "titulo", "categoria_id", "url", "fecha_creacion", "precio_venta", "stock", "activo")
				.all();

			return query.map((item) => ({
				...item,
				active: item.activo ? "Activo" : "Inactivo",
			}));
            
        } catch (error) {
            logger({
				error: error as Error,
				module: "PrismaProductRepository:list",
			});
			return [];
        }
    }
    async getById(id: number){
         try {
            return await product()
				.select("id", "titulo", "url", "categoria_id", "precio_venta", "fecha_creacion", "stock", "activo")
				.where({ id })
				.first();
        } catch (error) {
             logger({
				error: error as Error,
				module: "PrismaProductRepository:getById",
			});
			return null;
        }
    }
    async create(data: ICreate){
         try {
            await product().create({
                titulo: data.titulo,
				url: data.url,
                categoria_id: data.categoryId,
                precio_venta: data.precio_venta,
                stock: data.stock
            });
            return true;
        } catch (error) {
            logger({
				error: error as Error,
				module: "PrismaProductRepository:create",
			});
			return false; 
        }
    }
   async update(data: IUpdate){
         try {
            await product()
				.where({ id: data.id })
				.update({ titulo: data.titulo, url: data.url,categoria_id: data.categoryId, precio_venta: data.precio_venta, stock: data.stock });

			return true;
        } catch (error) {
             logger({
				error: error as Error,
				module: "PrismaProductRepository:update",
			});
			return false;
        }
    }
    async delete(id: number){
         try {
            await product().where({ id }).update({ activo: false });
			return true;
        } catch (error) {
             logger({
				error: error as Error,
				module: "PrismaProductRepository:delete",
			});
			return false;
        }
    }
}