export type UserRole = "administrador" | "cliente";

export type User = {
	id: number;
	fullName: string;
	email: string;
	role: UserRole;
	isActive: boolean;
	avatarUrl?: string;
};
