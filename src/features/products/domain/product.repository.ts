import type { ICreate, IUpdate, Product } from "./product.entity";

export interface ProductRepository {
	list(): Promise<Product[] | boolean>;
	getById(id: number): Promise<Product | boolean>;
	create(data: ICreate): Promise<boolean>;
	update(data: IUpdate): Promise<boolean>;
	delete(id: number): Promise<boolean>;
}
