import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { ProductThumbnail } from "@/common/components/ui/ProductThumbnail";
import { RankBadge } from "@/common/components/ui/RankBadge";
import { SectionCard } from "@/common/components/ui/SectionCard";
import { formatCurrency } from "@/common/utils/format";
import type { TopProduct } from "@/features/dashboard/types";
import { isLowStock } from "@/features/products/lib/isLowStock";

type TopProductsWidgetProps = {
	/** Productos ya ordenados de más a menos vendido. */
	products: TopProduct[];
};

export const TopProductsWidget = ({ products }: TopProductsWidgetProps) => {
	const columns: DataTableColumn<TopProduct>[] = [
		{
			key: "product",
			header: "Producto",
			cell: (product) => (
				<div className="flex items-center gap-3">
					<RankBadge rank={products.indexOf(product) + 1} />
					<ProductThumbnail name={product.name} imageUrl={product.imageUrl} />
				</div>
			),
		},
		{
			key: "name",
			header: "Nombre",
			cell: (product) => (
				<div className="flex flex-col">
					<span className="font-semibold text-navy">{product.name}</span>
					<span className="text-xs text-gray-400">{product.categoryName}</span>
				</div>
			),
		},
		{
			key: "sold",
			header: "Vendidos",
			align: "right",
			cell: (product) => product.unitsSold,
		},
		{
			key: "stock",
			header: "Stock",
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
			key: "price",
			header: "Precio",
			align: "right",
			cell: (product) => (
				<span className="font-semibold text-navy">
					{formatCurrency(product.price)}
				</span>
			),
		},
	];

	return (
		<SectionCard
			title="Productos más vendidos"
			icon="trophy"
			iconClassName="text-orange-400"
		>
			<DataTable
				ariaLabel="Productos más vendidos"
				variant="plain"
				columns={columns}
				rows={products}
				getRowKey={(product) => product.id}
			/>
		</SectionCard>
	);
};
