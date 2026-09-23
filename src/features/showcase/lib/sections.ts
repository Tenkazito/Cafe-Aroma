import type { IconName } from "@/common/components/ui/Icon";

export type ShowcaseSection = {
	/** Parte final de la URL: /dev/<slug>. */
	slug: string;
	label: string;
	description: string;
	icon: IconName;
	/** Carpeta del código que documenta la sección. */
	folder: string;
};

export const SHOWCASE_SECTIONS: ShowcaseSection[] = [
	{
		slug: "common",
		label: "Common",
		description:
			"Layouts, UI base, formularios y modales compartidos por toda la app.",
		icon: "component",
		folder: "src/common/components",
	},
	{
		slug: "auth",
		label: "Auth",
		description: "Pantallas de inicio de sesión del admin y del cliente.",
		icon: "lock",
		folder: "src/features/auth",
	},
	{
		slug: "dashboard",
		label: "Dashboard",
		description: "Widgets del inicio del panel de administración.",
		icon: "home",
		folder: "src/features/dashboard",
	},
	{
		slug: "users",
		label: "Users",
		description: "Gestión del personal: tabla, roles y formulario.",
		icon: "users",
		folder: "src/features/users",
	},
	{
		slug: "categories",
		label: "Categories",
		description: "Categorías del catálogo.",
		icon: "grid",
		folder: "src/features/categories",
	},
	{
		slug: "products",
		label: "Products",
		description: "Productos del catálogo con imagen, precio y stock.",
		icon: "package",
		folder: "src/features/products",
	},
	{
		slug: "orders",
		label: "Orders",
		description: "Pedidos del admin y del cliente: estados, filtros y detalle.",
		icon: "clipboardList",
		folder: "src/features/orders",
	},
	{
		slug: "billing",
		label: "Billing",
		description: "Facturación de los pedidos entregados.",
		icon: "receipt",
		folder: "src/features/billing",
	},
	{
		slug: "catalog",
		label: "Catalog",
		description: "Pantalla Solicitar del cliente: catálogo y carrito.",
		icon: "shoppingBag",
		folder: "src/features/catalog",
	},
	{
		slug: "notifications",
		label: "Notifications",
		description: "Notificaciones del cliente y la campana del header.",
		icon: "bell",
		folder: "src/features/notifications",
	},
];

/** Busca una sección por su slug. Falla si no existe porque sería un error de código, no de datos. */
export const getShowcaseSection = (slug: string): ShowcaseSection => {
	const section = SHOWCASE_SECTIONS.find(
		(candidate) => candidate.slug === slug,
	);
	if (!section) {
		throw new Error(`No existe la sección de showcase "${slug}"`);
	}
	return section;
};
