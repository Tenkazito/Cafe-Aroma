export type Product = {
	id: number;
	categoryName: string;
	name: string;
	description: string;
	/** Precio de venta en COP. */
	price: number;
	stock: number;
	isActive: boolean;
	imageUrl: string;
};
