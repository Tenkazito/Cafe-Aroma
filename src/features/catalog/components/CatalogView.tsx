"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { EmptyState } from "@/common/components/ui/EmptyState";
import { Icon } from "@/common/components/ui/Icon";
import { CartSummary } from "@/features/catalog/components/CartSummary";
import { CatalogProductCard } from "@/features/catalog/components/CatalogProductCard";
import { CatalogSearchBar } from "@/features/catalog/components/CatalogSearchBar";
import { CategoryTabs } from "@/features/catalog/components/CategoryTabs";
import { useCart } from "@/features/catalog/hooks/useCart";
import {
	ALL_CATEGORIES,
	filterCatalog,
} from "@/features/catalog/lib/filterCatalog";
import type { CatalogProduct } from "@/features/catalog/types";

type CatalogViewProps = {
	products: CatalogProduct[];
	categories: string[];
};

/** Pantalla Solicitar: buscador, categorías, destacados, catálogo y resumen del pedido. */
export const CatalogView = ({ products, categories }: CatalogViewProps) => {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState(ALL_CATEGORIES);
	const cart = useCart();

	const featuredProducts = products.filter((product) => product.isFeatured);
	const visibleProducts = filterCatalog(products, category, search);

	const handleCheckout = () => {
		// TODO: llamar al Server Action que crea el pedido con los productos del carrito
		toast.success(`Pedido enviado: ${cart.itemCount} productos (simulado)`);
		cart.clear();
	};

	return (
		<div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_320px]">
			<div className="flex min-w-0 flex-col gap-5">
				<CatalogSearchBar value={search} onChange={setSearch} />
				<CategoryTabs
					categories={categories}
					selected={category}
					onSelect={setCategory}
				/>

				<section className="flex flex-col gap-3">
					<h2 className="flex items-center gap-1.5 text-sm font-bold text-navy">
						<Icon name="star" size={16} className="text-amber-400" />
						Destacados
					</h2>
					{/* Fila con scroll horizontal para no ocupar más de una línea */}
					<div className="flex gap-3 overflow-x-auto pb-2">
						{featuredProducts.map((product) => (
							<div key={product.id} className="w-40 shrink-0">
								<CatalogProductCard
									product={product}
									onAdd={cart.addProduct}
									variant="compact"
								/>
							</div>
						))}
					</div>
				</section>

				<section className="flex flex-col gap-3">
					<h2 className="text-sm font-bold text-navy">Catálogo</h2>
					{visibleProducts.length === 0 ? (
						<div className="rounded-2xl bg-white">
							<EmptyState
								icon="search"
								title="No encontramos productos"
								description="Prueba con otra búsqueda o categoría"
							/>
						</div>
					) : (
						<div className="grid grid-cols-2 gap-3 md:grid-cols-3">
							{visibleProducts.map((product) => (
								<CatalogProductCard
									key={product.id}
									product={product}
									onAdd={cart.addProduct}
								/>
							))}
						</div>
					)}
				</section>
			</div>

			<div className="xl:sticky xl:top-6 xl:self-start">
				<CartSummary
					items={cart.items}
					itemCount={cart.itemCount}
					total={cart.total}
					onIncrement={cart.increment}
					onDecrement={cart.decrement}
					onCheckout={handleCheckout}
				/>
			</div>
		</div>
	);
};
