import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { CatalogView } from "@/features/catalog/components/CatalogView";
import {
	MOCK_CATALOG_CATEGORIES,
	MOCK_CATALOG_PRODUCTS,
} from "@/features/catalog/mocks/catalog";

export const metadata: Metadata = { title: locations.pageTitles.request };

const OrderRequestPage = () => {
	return (
		<CatalogView
			products={MOCK_CATALOG_PRODUCTS}
			categories={MOCK_CATALOG_CATEGORIES}
		/>
	);
};

export default OrderRequestPage;
