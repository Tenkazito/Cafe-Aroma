import type { NavItem } from "@/common/types/navigation";

export const ADMIN_NAV_ITEMS: NavItem[] = [
	{ label: "Inicio", href: "/admin", icon: "home" },
	{ label: "Usuarios", href: "/admin/usuarios", icon: "users" },
	{ label: "Categorías", href: "/admin/categorias", icon: "grid" },
	{ label: "Productos", href: "/admin/productos", icon: "package" },
	{ label: "Pedidos", href: "/admin/pedidos", icon: "clipboardList" },
	{ label: "Facturación", href: "/admin/facturacion", icon: "receipt" },
];

export const CLIENT_NAV_ITEMS: NavItem[] = [
	{ label: "Inicio", href: "/inicio", icon: "grid" },
	{ label: "Solicitar", href: "/solicitar", icon: "shoppingBag" },
	{ label: "Últimos pedidos", href: "/mis-pedidos", icon: "clipboardList" },
	{ label: "Notificaciones", href: "/notificaciones", icon: "bell" },
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
