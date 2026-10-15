import { getFullName } from "@/features/users/lib/getFullName";
import type { User } from "@/features/users/types";

/** Filtra usuarios cuyo nombre o correo contenga el texto buscado (sin importar mayúsculas). */
export const filterUsers = (users: User[], search: string): User[] => {
	const normalizedSearch = search.trim().toLowerCase();
	if (!normalizedSearch) return users;

	return users.filter(
		(user) =>
			getFullName(user).toLowerCase().includes(normalizedSearch) ||
			user.email.toLowerCase().includes(normalizedSearch),
	);
};
