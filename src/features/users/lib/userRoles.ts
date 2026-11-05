import type { BadgeTone } from "@/common/components/ui/Badge";
import { locations } from "@/common/locations";
import type { UserRole } from "@/features/users/types";

/** Texto y color de cada rol. Se usa en la tabla (badge) y en el formulario (select). */
export const USER_ROLES: Record<UserRole, { label: string; tone: BadgeTone }> =
	{
		administrador: { label: locations.roles.administrador, tone: "navy" },
		cliente: { label: locations.roles.cliente, tone: "teal" },
	};

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLES).map(
	([value, { label }]) => ({ value, label }),
);
