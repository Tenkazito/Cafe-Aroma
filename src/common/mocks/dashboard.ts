import type { LoyalCustomer } from "@/features/dashboard/components/LoyalCustomersWidget";
import type { SalesSummaryItemData } from "@/features/dashboard/components/SalesSummaryWidget";
import type { TopProduct } from "@/features/dashboard/components/TopProductsWidget";

export const MOCK_PRODUCTS: TopProduct[] = [
	{
		id: "1",
		image:
			"https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=150&auto=format&fit=crop",
		name: "Latte Clásico",
		category: "Cafés Calientes",
		sold: 28,
		stock: 40,
		price: "$8.500",
	},
	{
		id: "2",
		image:
			"https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?q=80&w=150&auto=format&fit=crop",
		name: "Frappuccino Caramelo",
		category: "Bebidas Frías",
		sold: 22,
		stock: 25,
		price: "$12.500",
	},
	{
		id: "3",
		image:
			"https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=150&auto=format&fit=crop",
		name: "Cappuccino Italiano",
		category: "Cafés Calientes",
		sold: 19,
		stock: 32,
		price: "$9.000",
	},
	{
		id: "4",
		image:
			"https://images.unsplash.com/photo-1607958996333-41aef7caefaa?q=80&w=150&auto=format&fit=crop",
		name: "Muffin de Arándanos",
		category: "Postres",
		sold: 15,
		stock: 15,
		isLowStock: true,
		price: "$5.500",
	},
	{
		id: "5",
		image:
			"https://images.unsplash.com/photo-1549903072-7e6e0d234247?q=80&w=150&auto=format&fit=crop",
		name: "Croissant de Mantequilla",
		category: "Panadería",
		sold: 12,
		stock: 30,
		price: "$4.500",
	},
];

export const MOCK_SALES_SUMMARY: SalesSummaryItemData[] = [
	{
		id: "s1",
		icon: "shoppingBag",
		value: "42",
		label: "Ventas realizadas",
		iconBgColor: "bg-mint/40",
		iconColor: "text-teal",
	},
	{
		id: "s2",
		icon: "wallet",
		value: "$1,245,000",
		label: "Ganancias totales",
		iconBgColor: "bg-blue-50",
		iconColor: "text-blue-500",
	},
	{
		id: "s3",
		icon: "piggyBank",
		value: "$186,500",
		label: "Ahorro acumulado",
		iconBgColor: "bg-orange-50",
		iconColor: "text-orange-400",
	},
];

export const MOCK_CUSTOMERS: LoyalCustomer[] = [
	{
		id: "c1",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
		name: "Laura Patiño",
		orders: 48,
		score: 48,
	},
	{
		id: "c2",
		avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
		name: "Esteban Ríos",
		orders: 36,
		score: 36,
	},
	{
		id: "c3",
		avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
		name: "Valentina Cruz",
		orders: 29,
		score: 29,
	},
	{
		id: "c4",
		avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
		name: "Camilo Ortega",
		orders: 22,
		score: 22,
	},
	{
		id: "c5",
		avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
		name: "Daniela Mora",
		orders: 18,
		score: 18,
	},
];
