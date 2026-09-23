import { ProductThumbnail } from "@/common/components/ui/ProductThumbnail";
import { formatCurrency } from "@/common/utils/format";
import { QuantityStepper } from "@/features/catalog/components/QuantityStepper";
import type { CartItem } from "@/features/catalog/types";

type CartItemRowProps = {
	item: CartItem;
	onIncrement: () => void;
	onDecrement: () => void;
};

/** Un producto dentro del "Resumen del pedido". */
export const CartItemRow = ({
	item,
	onIncrement,
	onDecrement,
}: CartItemRowProps) => {
	return (
		<li className="flex items-center gap-3 rounded-xl bg-surface-field p-3">
			<ProductThumbnail name={item.name} imageUrl={item.imageUrl} size={48} />
			<div className="min-w-0 flex-1">
				<p className="line-clamp-2 text-sm font-semibold text-navy">
					{item.name}
				</p>
				<p className="text-xs text-gray-500">
					{formatCurrency(item.unitPrice)} c/u
				</p>
			</div>
			<QuantityStepper
				quantity={item.quantity}
				itemName={item.name}
				onIncrement={onIncrement}
				onDecrement={onDecrement}
			/>
		</li>
	);
};
