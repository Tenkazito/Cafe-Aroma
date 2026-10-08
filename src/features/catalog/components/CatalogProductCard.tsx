"use client";

import { Button } from "@heroui/react";
import Image from "next/image";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";
import { formatCurrency } from "@/common/utils/format";
import type { CatalogProduct } from "@/features/catalog/types";

type CatalogProductCardProps = {
	product: CatalogProduct;
	onAdd: (product: CatalogProduct) => void;
	/**
	 * `full`: tarjeta del catálogo con descripción y botón "Agregar".
	 * `compact`: tarjeta pequeña de "Destacados" con botón "+".
	 */
	variant?: "full" | "compact";
};

/** Tarjeta de producto del catálogo del cliente. */
export const CatalogProductCard = ({
	product,
	onAdd,
	variant = "full",
}: CatalogProductCardProps) => {
	const isCompact = variant === "compact";

	return (
		<article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm">
			<div className="relative aspect-4/3">
				<Image
					src={product.imageUrl}
					alt={product.name}
					fill
					sizes="(max-width: 768px) 50vw, 240px"
					className={`object-cover ${product.isSoldOut ? "opacity-60 grayscale" : ""}`}
				/>
				{!isCompact && product.isFeatured && (
					<span className="absolute top-2 left-2 flex items-center gap-1 rounded-md bg-lemon px-2 py-0.5 text-xs font-bold text-navy">
						<Icon name="star" size={12} />
						{locations.catalog.topBadge}
					</span>
				)}
				{product.isSoldOut && (
					<span className="absolute top-2 right-2 rounded-md bg-navy px-2 py-0.5 text-xs font-bold text-white">
						{locations.catalog.soldOut}
					</span>
				)}
			</div>

			<div className="flex flex-1 flex-col gap-1 p-3">
				<h3 className="text-sm font-bold text-navy">{product.name}</h3>
				{!isCompact && (
					<p className="line-clamp-1 text-xs text-gray-400">
						{product.description}
					</p>
				)}
				<div className="mt-auto flex items-center justify-between gap-2 pt-2">
					<span className="text-sm font-bold text-teal-strong">
						{formatCurrency(product.price)}
					</span>
					{isCompact ? (
						<Button
							isIconOnly
							size="sm"
							isDisabled={product.isSoldOut}
							onPress={() => onAdd(product)}
							aria-label={locations.catalog.addProduct(product.name)}
						>
							<Icon name="plus" size={16} />
						</Button>
					) : (
						<Button
							size="sm"
							isDisabled={product.isSoldOut}
							onPress={() => onAdd(product)}
							aria-label={locations.catalog.addProduct(product.name)}
						>
							<Icon name="plus" size={14} />
							{locations.actions.add}
						</Button>
					)}
				</div>
			</div>
		</article>
	);
};
