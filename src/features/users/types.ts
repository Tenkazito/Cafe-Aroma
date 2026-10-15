export type UserRole = "administrador" | "cliente";

export type User = {
	id: number;
	// Separados como en la base (`nombre`, `apellido`); para mostrarlos juntos usa `getFullName`
	firstName: string;
	lastName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	avatarUrl?: string;
};
