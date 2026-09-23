import type { IconName } from "@/common/components/ui/Icon";

// La base de datos no guarda iconos, así que se asignan aquí por nombre de categoría
const CATEGORY_ICONS: Record<string, IconName> = {
	"Cafés Calientes": "coffee",
	"Bebidas Frías": "cupSoda",
	Postres: "cake",
	Panadería: "croissant",
};

export const getCategoryIcon = (categoryName: string): IconName =>
	CATEGORY_ICONS[categoryName] ?? "coffee";
