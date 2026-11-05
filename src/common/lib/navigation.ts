import { locations } from "@/common/locations";
import type { NavItem } from "@/common/types/navigation";

export const ADMIN_NAV_ITEMS: NavItem[] = [
	{ label: locations.navigation.admin.home, href: "/admin", icon: "home" },
	{
		label: locations.navigation.admin.users,
		href: "/admin/usuarios",
		icon: "users",
	},
	{
		label: locations.navigation.admin.categories,
		href: "/admin/categorias",
		icon: "grid",
	},
	{
		label: locations.navigation.admin.products,
		href: "/admin/productos",
		icon: "package",
	},
	{
		label: locations.navigation.admin.orders,
		href: "/admin/pedidos",
		icon: "clipboardList",
	},
	{
		label: locations.navigation.admin.billing,
		href: "/admin/facturacion",
		icon: "receipt",
	},
];

export const CLIENT_NAV_ITEMS: NavItem[] = [
	{ label: locations.navigation.client.home, href: "/inicio", icon: "grid" },
	{
		label: locations.navigation.client.request,
		href: "/solicitar",
		icon: "shoppingBag",
	},
	{
		label: locations.navigation.client.orders,
		href: "/mis-pedidos",
		icon: "clipboardList",
	},
	{
		label: locations.navigation.client.notifications,
		href: "/notificaciones",
		icon: "bell",
	},
];

/**
 * Indica si un enlace del menú corresponde a la ruta actual.
 * Las rutas raíz de cada zona ("/admin") solo se marcan si coinciden exacto,
 * si no "Inicio" quedaría activo en todas las pantallas del admin.
 */
export const isNavItemActive = (
	pathname: string,
	href: string,
	rootHref: string,
): boolean => {
	if (href === rootHref) return pathname === href;
	return pathname === href || pathname.startsWith(`${href}/`);
};
