import type { UserRole } from "@/features/users/types";

/** A qué pantalla entra cada rol después de iniciar sesión. */
const HOME_PATH_BY_ROLE: Record<UserRole, string> = {
	administrador: "/admin",
	cliente: "/inicio",
};

/** Ruta de inicio según el rol del usuario (`administrador` → `/admin`, `cliente` → `/inicio`). */
export const getHomePathForRole = (role: UserRole): string =>
	HOME_PATH_BY_ROLE[role];
