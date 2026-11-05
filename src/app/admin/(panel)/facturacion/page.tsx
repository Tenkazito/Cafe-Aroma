import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { BillingManager } from "@/features/billing/components/BillingManager";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: locations.pageTitles.adminBilling };

// Fecha de los datos de ejemplo; con backend sería la fecha consultada
const REPORT_DATE = "2026-08-26";

const BillingPage = () => {
	return <BillingManager orders={MOCK_ORDERS} reportDate={REPORT_DATE} />;
};

export default BillingPage;
