import type { Metadata } from "next";
import { BillingManager } from "@/features/billing/components/BillingManager";
import { MOCK_ORDERS } from "@/features/orders/mocks/orders";

export const metadata: Metadata = { title: "Facturación · Admin Café Aroma" };

// Fecha de los datos de ejemplo; con backend sería la fecha consultada
const REPORT_DATE = "2026-08-26";

const BillingPage = () => {
	return <BillingManager orders={MOCK_ORDERS} reportDate={REPORT_DATE} />;
};

export default BillingPage;
