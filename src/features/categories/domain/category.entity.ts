// Nombres del código; el repositorio los traduce a las columnas de `categorias`
export type Category = {
	id: number;
	name: string;
	slug: string;
	isActive: boolean;
	createdAt: string;
};

export interface ICreate {
	name: string;
	url: string;
}

export interface IUpdate {
	id: number;
	name: string;
	slug: string;
}
