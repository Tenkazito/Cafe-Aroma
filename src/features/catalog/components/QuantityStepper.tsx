"use client";

import { Button } from "@heroui/react";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type QuantityStepperProps = {
	quantity: number;
	/** Nombre del producto, para los aria-label de los botones. */
	itemName: string;
	onIncrement: () => void;
	onDecrement: () => void;
};

/** Control "−  2  +" para cambiar la cantidad de un producto en el carrito. */
export const QuantityStepper = ({
	quantity,
	itemName,
	onIncrement,
	onDecrement,
}: QuantityStepperProps) => {
	return (
		<div className="flex items-center gap-2">
			<Button
				isIconOnly
				size="sm"
				variant="outline"
				className="bg-white"
				onPress={onDecrement}
				aria-label={locations.catalog.removeOne(itemName)}
			>
				<Icon name="minus" size={14} />
			</Button>
			<span
				className="w-6 text-center font-semibold text-navy"
				aria-live="polite"
			>
				{quantity}
			</span>
			<Button
				isIconOnly
				size="sm"
				onPress={onIncrement}
				aria-label={locations.catalog.addOne(itemName)}
			>
				<Icon name="plus" size={14} />
			</Button>
		</div>
	);
};
