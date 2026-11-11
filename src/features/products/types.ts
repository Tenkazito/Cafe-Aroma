export type Product = {
	id: number;
	categoryId: number;
	// La API solo manda `categoryId`; el nombre lo pone `toProductRows` con las categorías
	categoryName: string;
	name: string;
	description: string;
	/** Precio de venta en COP. */
	price: number;
	stock: number;
	isActive: boolean;
	imageUrl: string;
};
