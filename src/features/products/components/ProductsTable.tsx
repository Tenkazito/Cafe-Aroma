import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { ProductThumbnail } from "@/common/components/ui/ProductThumbnail";
import { RowActions } from "@/common/components/ui/RowActions";
import { StatusBadge } from "@/common/components/ui/StatusBadge";
import { locations } from "@/common/locations";
import { formatCurrency } from "@/common/utils/format";
import { isLowStock } from "@/features/products/lib/isLowStock";
import type { Product } from "@/features/products/types";

type ProductsTableProps = {
	products: Product[];
	onEdit: (product: Product) => void;
	onDelete: (product: Product) => void;
};

export const ProductsTable = ({
	products,
	onEdit,
	onDelete,
}: ProductsTableProps) => {
	const columns: DataTableColumn<Product>[] = [
		{
			key: "id",
			header: locations.table.id,
			cell: (product) => `#${product.id}`,
			className: "text-gray-400",
		},
		{
			key: "category",
			header: locations.table.category,
			cell: (product) => product.categoryName,
			className: "text-gray-500",
		},
		{
			key: "name",
			header: locations.table.name,
			cell: (product) => (
				<div className="flex items-center gap-3">
					<ProductThumbnail name={product.name} imageUrl={product.imageUrl} />
					<span className="font-semibold text-navy">{product.name}</span>
				</div>
			),
		},
		{
			key: "price",
			header: locations.table.price,
			align: "right",
			cell: (product) => (
				<span className="font-semibold text-navy">
					{formatCurrency(product.price)}
				</span>
			),
		},
		{
			key: "stock",
			header: locations.table.stock,
			align: "right",
			cell: (product) => (
				<span
					className={
						isLowStock(product.stock) ? "font-semibold text-orange-500" : ""
					}
				>
					{product.stock}
				</span>
			),
		},
		{
			key: "status",
			header: locations.table.status,
			cell: (product) => <StatusBadge isActive={product.isActive} />,
		},
		{
			key: "actions",
			header: locations.table.actions,
			align: "right",
			cell: (product) => (
				<RowActions
					itemName={product.name}
					onEdit={() => onEdit(product)}
					onDelete={() => onDelete(product)}
				/>
			),
		},
	];

	return (
		<DataTable
			ariaLabel={locations.products.tableLabel}
			columns={columns}
			rows={products}
			getRowKey={(product) => product.id}
			emptyMessage={locations.products.empty}
		/>
	);
};
