export type UserRole = "administrador" | "cliente";

// Nunca incluye la contraseña: el repositorio no la lee al listar
export type User = {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	createdAt: string;
};

export interface ICreate {
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	// Ya hasheada por el caso de uso
	passwordHash: string;
}

export interface IUpdate {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	// Sin valor = no se cambia la contraseña
	passwordHash?: string;
}

// Resultado de crear/editar: el controller lo traduce a 201/200, 409 o 404/500
export type SaveUserResult = "saved" | "emailTaken" | "failed";
