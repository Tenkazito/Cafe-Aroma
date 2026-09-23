import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { RowActions } from "@/common/components/ui/RowActions";
import { StatusBadge } from "@/common/components/ui/StatusBadge";
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
			header: "ID",
			cell: (category) => `#${category.id}`,
			className: "text-gray-400",
		},
		{
			key: "name",
			header: "Nombre",
			cell: (category) => (
				<span className="font-medium text-navy">{category.name}</span>
			),
		},
		{
			key: "status",
			header: "Estado",
			cell: (category) => <StatusBadge isActive={category.isActive} />,
		},
		{
			key: "actions",
			header: "Acciones",
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
			ariaLabel="Categorías"
			columns={columns}
			rows={categories}
			getRowKey={(category) => category.id}
			emptyMessage="No hay categorías que coincidan con la búsqueda."
		/>
	);
};
