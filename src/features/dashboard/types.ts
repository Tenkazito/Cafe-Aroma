export type TopProduct = {
	id: number;
	name: string;
	categoryName: string;
	imageUrl: string;
	unitsSold: number;
	stock: number;
	price: number;
};

export type LoyalCustomer = {
	id: number;
	name: string;
	avatarUrl?: string;
	orderCount: number;
};

export type SalesPeriod = "dia" | "semana" | "mes";

export type SalesSummary = {
	salesCount: number;
	revenue: number;
	savings: number;
};

export type DailyGoal = {
	current: number;
	target: number;
};
