export type UserRole = "administrador" | "administrativo" | "mensajero";

export type User = {
	id: number;
	fullName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	avatarUrl?: string;
};
