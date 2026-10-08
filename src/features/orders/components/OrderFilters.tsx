import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import type { FieldVariant } from "@/common/components/form/fieldStyles";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { locations } from "@/common/locations";
import { ORDER_STATUS_FILTER_OPTIONS } from "@/features/orders/lib/orderStatuses";
import type { OrderFiltersValue } from "@/features/orders/types";

type OrderFilterField = keyof OrderFiltersValue;

type OrderFiltersProps = {
	value: OrderFiltersValue;
	onChange: (value: OrderFiltersValue) => void;
	/**
	 * Campos a mostrar y en qué orden. Así la misma barra sirve para
	 * Pedidos (todos), Facturación (sin estado) y el cliente (estado y fecha).
	 */
	fields?: OrderFilterField[];
	variant?: FieldVariant;
	title?: string | null;
};

export const OrderFilters = ({
	value,
	onChange,
	fields = ["status", "date", "customer", "search"],
	variant = "default",
	title,
}: OrderFiltersProps) => {
	const updateField = (field: OrderFilterField, fieldValue: string) =>
		onChange({ ...value, [field]: fieldValue });

	const renderField = (field: OrderFilterField) => {
		switch (field) {
			case "status":
				return (
					<FormSelectField
						key={field}
						label={locations.orders.filters.status}
						options={ORDER_STATUS_FILTER_OPTIONS}
						variant={variant}
						value={value.status}
						onChange={(event) => updateField("status", event.target.value)}
					/>
				);
			case "date":
				return (
					<FormTextField
						key={field}
						label={locations.orders.filters.date}
						type="date"
						variant={variant}
						value={value.date}
						onChange={(event) => updateField("date", event.target.value)}
					/>
				);
			case "customer":
				return (
					<FormTextField
						key={field}
						label={locations.orders.filters.customer}
						placeholder={locations.orders.filters.customerPlaceholder}
						variant={variant}
						value={value.customer}
						onChange={(event) => updateField("customer", event.target.value)}
					/>
				);
			case "search":
				return (
					<FormTextField
						key={field}
						label={locations.orders.filters.search}
						icon="search"
						placeholder={locations.orders.filters.searchPlaceholder}
						variant={variant}
						value={value.search}
						onChange={(event) => updateField("search", event.target.value)}
					/>
				);
		}
	};

	// Tailwind necesita las clases completas, por eso se limita a 2, 3 o 4 columnas
	const columns = Math.min(Math.max(fields.length, 2), 4) as 2 | 3 | 4;

	return (
		<FilterBar title={title} columns={columns}>
			{fields.map(renderField)}
		</FilterBar>
	);
};
