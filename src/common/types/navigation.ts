import type { IconName } from "@/common/components/ui/Icon";

/** Un enlace del menú (navbar del admin o sidebar del cliente). */
export type NavItem = {
	label: string;
	href: string;
	icon: IconName;
	/** Número en círculo junto al enlace (ej. notificaciones sin leer). */
	badge?: number;
};

/** Datos mínimos del usuario que muestran los layouts. */
export type SessionUser = {
	name: string;
	role: string;
	avatarUrl?: string;
};
