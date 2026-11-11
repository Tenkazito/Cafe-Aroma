export type Product = {
	id: number;
	name: string;
	slug: string;
	description: string;
	categoryId: number;
	createdAt: string;
	price: number;
	stock: number;
	isActive: boolean;
	// Columna `imagen String?`: puede no tener imagen
	imageUrl: string | null;
};

export interface ICreate {
	name: string;
	slug: string;
	description: string;
	categoryId: number;
	price: number;
	stock: number;
	isActive?: boolean;
}

export interface IUpdate {
	id: number;
	name: string;
	slug: string;
	description: string;
	categoryId: number;
	price: number;
	stock: number;
	isActive: boolean;
}
