import type {
	DailyGoal,
	LoyalCustomer,
	SalesPeriod,
	SalesSummary,
	TopProduct,
} from "@/features/dashboard/types";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";

/** Unidades vendidas por id de producto (el resto de datos sale del mock de productos). */
const UNITS_SOLD_BY_PRODUCT_ID: Record<number, number> = {
	1: 28,
	5: 22,
	2: 19,
	7: 15,
	10: 12,
};

export const MOCK_TOP_PRODUCTS: TopProduct[] = Object.entries(
	UNITS_SOLD_BY_PRODUCT_ID,
)
	.map(([productId, unitsSold]) => {
		const product = MOCK_PRODUCTS.find(
			(candidate) => candidate.id === Number(productId),
		);
		if (!product) return null;

		return {
			id: product.id,
			name: product.name,
			categoryName: product.categoryName,
			imageUrl: product.imageUrl,
			unitsSold,
			stock: product.stock,
			price: product.price,
		};
	})
	.filter((product): product is TopProduct => product !== null)
	.sort((first, second) => second.unitsSold - first.unitsSold);

export const MOCK_SALES_SUMMARY: Record<SalesPeriod, SalesSummary> = {
	dia: { salesCount: 42, revenue: 1245000, savings: 186500 },
	semana: { salesCount: 268, revenue: 7980000, savings: 1150000 },
	mes: { salesCount: 1104, revenue: 33450000, savings: 4870000 },
};

export const MOCK_LOYAL_CUSTOMERS: LoyalCustomer[] = [
	{
		id: 1,
		name: "Laura Patiño",
		avatarUrl: "https://i.pravatar.cc/150?u=laura.patino",
		orderCount: 48,
	},
	{
		id: 2,
		name: "Esteban Ríos",
		avatarUrl: "https://i.pravatar.cc/150?u=esteban.rios",
		orderCount: 36,
	},
	{
		id: 3,
		name: "Valentina Cruz",
		avatarUrl: "https://i.pravatar.cc/150?u=valentina.cruz",
		orderCount: 29,
	},
	{
		id: 4,
		name: "Camilo Ortega",
		avatarUrl: "https://i.pravatar.cc/150?u=camilo.ortega",
		orderCount: 22,
	},
	{
		id: 5,
		name: "Daniela Mora",
		avatarUrl: "https://i.pravatar.cc/150?u=daniela.mora",
		orderCount: 18,
	},
];

export const MOCK_DAILY_GOAL: DailyGoal = { current: 2, target: 50 };
