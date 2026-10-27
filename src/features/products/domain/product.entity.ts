export type Product = {
	id: number;
	name: string;
	slug: string;
	categoryId: number;
	createdAt: Date;
	precioVenta: number;
	stock: number;
};

export interface ICreate {
	titulo: string;
	url: string;
	descripcion: string;
	categoryId: number;
	precio_venta: number;
	stock: number;
}

export interface IUpdate {
	id: number;
	titulo: string;
	url: string;
	descripcion: string;
	categoryId: number;
	precio_venta: number;
	stock: number;
}
