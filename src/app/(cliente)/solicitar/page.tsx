import type { Metadata } from "next";
import { CatalogView } from "@/features/catalog/components/CatalogView";
import {
	MOCK_CATALOG_CATEGORIES,
	MOCK_CATALOG_PRODUCTS,
} from "@/features/catalog/mocks/catalog";

export const metadata: Metadata = { title: "Solicitar · Café Aroma" };

const OrderRequestPage = () => {
	return (
		<CatalogView
			products={MOCK_CATALOG_PRODUCTS}
			categories={MOCK_CATALOG_CATEGORIES}
		/>
	);
};

export default OrderRequestPage;
