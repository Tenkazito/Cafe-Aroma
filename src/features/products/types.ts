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
	/** URL de la imagen que devuelve la API (`imagen String?`); vacío si no tiene. */
	imageUrl: string;
};
