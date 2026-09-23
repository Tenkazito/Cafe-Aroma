import type { BadgeTone } from "@/common/components/ui/Badge";
import type { UserRole } from "@/features/users/types";

/** Texto y color de cada rol. Se usa en la tabla (badge) y en el formulario (select). */
export const USER_ROLES: Record<UserRole, { label: string; tone: BadgeTone }> =
	{
		administrador: { label: "Administrador", tone: "navy" },
		administrativo: { label: "Administrativo", tone: "teal" },
		mensajero: { label: "Mensajero", tone: "lemon" },
	};

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLES).map(
	([value, { label }]) => ({ value, label }),
);
