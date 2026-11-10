// Nombres del código; el repositorio los traduce a las columnas de `categorias`
export type Category = {
	id: number;
	name: string;
	url: string;
	isActive: boolean;
	createdAt: string;
};

// Al crear no se pide el estado: la columna `activo` tiene `@default(true)`
export interface ICreate {
	name: string;
	url: string;
}

export interface IUpdate {
	id: number;
	name: string;
	url?: string;
	isActive: boolean;
}
