/** Producto como lo ve el cliente en la pantalla Solicitar. */
export type CatalogProduct = {
	id: number;
	name: string;
	description: string;
	categoryName: string;
	price: number;
	imageUrl: string;
	/** Aparece en "Destacados" y con la etiqueta "Top". */
	isFeatured: boolean;
	isSoldOut: boolean;
};

export type CartItem = {
	productId: number;
	name: string;
	unitPrice: number;
	imageUrl: string;
	quantity: number;
};

/** "todos" o el nombre de una categoría. */
export type CatalogCategoryFilter = string;
