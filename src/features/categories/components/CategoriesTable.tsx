import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { RowActions } from "@/common/components/ui/RowActions";
import { StatusBadge } from "@/common/components/ui/StatusBadge";
import { locations } from "@/common/locations";
import type { Category } from "@/features/categories/types";

type CategoriesTableProps = {
	categories: Category[];
	onEdit: (category: Category) => void;
	onDelete: (category: Category) => void;
};

export const CategoriesTable = ({
	categories,
	onEdit,
	onDelete,
}: CategoriesTableProps) => {
	const columns: DataTableColumn<Category>[] = [
		{
			key: "id",
			header: locations.table.id,
			cell: (category) => `#${category.id}`,
			className: "text-gray-400",
		},
		{
			key: "name",
			header: locations.table.name,
			cell: (category) => (
				<span className="font-medium text-navy">{category.name}</span>
			),
		},
		{
			key: "status",
			header: locations.table.status,
			cell: (category) => <StatusBadge isActive={category.isActive} />,
		},
		{
			key: "actions",
			header: locations.table.actions,
			align: "right",
			cell: (category) => (
				<RowActions
					itemName={category.name}
					onEdit={() => onEdit(category)}
					onDelete={() => onDelete(category)}
				/>
			),
		},
	];

	return (
		<DataTable
			ariaLabel={locations.categories.tableLabel}
			columns={columns}
			rows={categories}
			getRowKey={(category) => category.id}
			emptyMessage={locations.categories.empty}
		/>
	);
};
