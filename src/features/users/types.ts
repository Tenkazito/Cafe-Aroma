import type { UserRole as DomainUserRole } from "@/features/users/domain/user.entity";

// Los roles los define el dominio (enum `rol_usuario`); aquí solo se reutilizan
export type UserRole = DomainUserRole;

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
