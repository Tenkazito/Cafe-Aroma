import { StatCard } from "@/common/components/ui/StatCard";
import { locations } from "@/common/locations";
import { formatCurrency } from "@/common/utils/format";

type BillingStatsProps = {
	invoiceCount: number;
	billedTotal: number;
	/** Fecha "AAAA-MM-DD" del reporte. */
	reportDate: string;
};

export const BillingStats = ({
	invoiceCount,
	billedTotal,
	reportDate,
}: BillingStatsProps) => {
	return (
		<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
			<StatCard
				variant="outlined"
				label={locations.billing.invoicesOfDay}
				value={invoiceCount}
				icon="fileText"
				tone="success"
			/>
			<StatCard
				variant="outlined"
				label={locations.billing.totalBilled}
				value={formatCurrency(billedTotal)}
				icon="dollar"
				tone="success"
			/>
			<StatCard
				variant="outlined"
				label={locations.billing.reportDate}
				value={reportDate}
				icon="calendar"
				tone="warning"
			/>
		</div>
	);
};
