import type { User } from "@/features/users/types";

/** "María González": une nombre y apellido para mostrarlos en tablas, avatares y mensajes. */
export const getFullName = (user: Pick<User, "firstName" | "lastName">) =>
	`${user.firstName} ${user.lastName}`;
