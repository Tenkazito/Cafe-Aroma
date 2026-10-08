import type { User } from "@/features/users/types";

export const MOCK_USERS: User[] = [
	{
		id: 1,
		fullName: "María González",
		email: "maria.gonzalez@cafearoma.co",
		role: "administrador",
		isActive: true,
		avatarUrl: "https://i.pravatar.cc/150?u=maria.gonzalez",
	},
	{
		id: 2,
		fullName: "Carlos Restrepo",
		email: "carlos.restrepo@cafearoma.co",
		role: "administrador",
		isActive: true,
		avatarUrl: "https://i.pravatar.cc/150?u=carlos.restrepo",
	},
	{
		id: 3,
		fullName: "Andrea Torres",
		email: "andrea.torres@cafearoma.co",
		role: "administrador",
		isActive: false,
		avatarUrl: "https://i.pravatar.cc/150?u=andrea.torres",
	},
	{
		id: 4,
		fullName: "Juan Moreno",
		email: "juan.moreno@cafearoma.co",
		role: "cliente",
		isActive: true,
		avatarUrl: "https://i.pravatar.cc/150?u=juan.moreno",
	},
	{
		id: 5,
		fullName: "Sofía Vargas",
		email: "sofia.vargas@cafearoma.co",
		role: "cliente",
		isActive: true,
		avatarUrl: "https://i.pravatar.cc/150?u=sofia.vargas",
	},
	{
		id: 6,
		fullName: "Diego Pineda",
		email: "diego.pineda@cafearoma.co",
		role: "cliente",
		isActive: false,
		avatarUrl: "https://i.pravatar.cc/150?u=diego.pineda",
	},
];
