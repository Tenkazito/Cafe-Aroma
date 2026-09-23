"use client";

import { toast } from "@heroui/react";
import { useState } from "react";
import { CartSummary } from "@/features/catalog/components/CartSummary";
import { CatalogProductCard } from "@/features/catalog/components/CatalogProductCard";
import { CatalogSearchBar } from "@/features/catalog/components/CatalogSearchBar";
import { CatalogView } from "@/features/catalog/components/CatalogView";
import { CategoryTabs } from "@/features/catalog/components/CategoryTabs";
import { QuantityStepper } from "@/features/catalog/components/QuantityStepper";
import { getCartTotals } from "@/features/catalog/lib/cartTotals";
import { ALL_CATEGORIES } from "@/features/catalog/lib/filterCatalog";
import {
	MOCK_CATALOG_CATEGORIES,
	MOCK_CATALOG_PRODUCTS,
} from "@/features/catalog/mocks/catalog";
import type { CartItem } from "@/features/catalog/types";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

const featuredProduct = MOCK_CATALOG_PRODUCTS.find(
	(product) => product.isFeatured,
);
const regularProduct = MOCK_CATALOG_PRODUCTS.find(
	(product) => !product.isFeatured && !product.isSoldOut,
);
const soldOutProduct = MOCK_CATALOG_PRODUCTS.find(
	(product) => product.isSoldOut,
);
const cardExamples = [featuredProduct, regularProduct, soldOutProduct].filter(
	(product) => product !== undefined,
);

const SAMPLE_CART: CartItem[] = MOCK_CATALOG_PRODUCTS.slice(0, 2).map(
	(product, index) => ({
		productId: product.id,
		name: product.name,
		unitPrice: product.price,
		imageUrl: product.imageUrl,
		quantity: index + 1,
	}),
);

const notify = (message: string) => () => toast.info(message);

export const CatalogShowcase = () => {
	const [search, setSearch] = useState("");
	const [category, setCategory] = useState(ALL_CATEGORIES);
	const [quantity, setQuantity] = useState(2);
	const sampleTotals = getCartTotals(SAMPLE_CART);

	return (
		<ShowcasePage section={getShowcaseSection("catalog")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="CatalogSearchBar"
					description="Buscador del catálogo (filtra mientras se escribe)."
					path="src/features/catalog/components/CatalogSearchBar.tsx"
					background="client"
				>
					<CatalogSearchBar value={search} onChange={setSearch} />
				</ComponentPreview>

				<ComponentPreview
					name="CategoryTabs"
					description="Pastillas 'Todos' + una por categoría activa, con icono."
					path="src/features/catalog/components/CategoryTabs.tsx"
					background="client"
				>
					<CategoryTabs
						categories={MOCK_CATALOG_CATEGORIES}
						selected={category}
						onSelect={setCategory}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="CatalogProductCard"
					description="Tarjeta de producto. Muestra 'Top' si es destacado y 'Agotado' (botón deshabilitado) si no hay stock."
					path="src/features/catalog/components/CatalogProductCard.tsx"
					background="client"
					props={[
						{
							name: "variant",
							description: '"full" (catálogo) | "compact" (Destacados)',
						},
					]}
				>
					<div className="flex flex-wrap items-start gap-4">
						{cardExamples.map((product) => (
							<div key={product.id} className="w-52">
								<CatalogProductCard
									product={product}
									onAdd={notify(`Agregar ${product.name}`)}
								/>
							</div>
						))}
						{featuredProduct && (
							<div className="w-40">
								<CatalogProductCard
									product={featuredProduct}
									onAdd={notify("Agregar")}
									variant="compact"
								/>
							</div>
						)}
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="QuantityStepper"
					description="Control − cantidad + del carrito."
					path="src/features/catalog/components/QuantityStepper.tsx"
					background="white"
				>
					<QuantityStepper
						quantity={quantity}
						itemName="Latte Clásico"
						onIncrement={() => setQuantity((current) => current + 1)}
						onDecrement={() =>
							setQuantity((current) => Math.max(0, current - 1))
						}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="CartSummary"
					description="'Resumen del Pedido': vacío o con productos. El botón se deshabilita si no hay nada."
					path="src/features/catalog/components/CartSummary.tsx"
					background="client"
				>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<CartSummary
							items={[]}
							itemCount={0}
							total={0}
							onIncrement={notify("+")}
							onDecrement={notify("-")}
							onCheckout={notify("Finalizar")}
						/>
						<CartSummary
							items={SAMPLE_CART}
							itemCount={sampleTotals.itemCount}
							total={sampleTotals.total}
							onIncrement={notify("+")}
							onDecrement={notify("-")}
							onCheckout={notify("Finalizar")}
						/>
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="CatalogView"
					description="Pantalla completa de /solicitar: une todo lo anterior con el hook useCart."
					path="src/features/catalog/components/CatalogView.tsx"
					background="client"
				>
					<CatalogView
						products={MOCK_CATALOG_PRODUCTS}
						categories={MOCK_CATALOG_CATEGORIES}
					/>
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="useCart()"
					description="Estado del carrito en memoria: items, itemCount, total, addProduct, increment, decrement, clear. Al bajar a 0 unidades el producto sale del carrito."
					path="src/features/catalog/hooks/useCart.ts"
				/>
				<ComponentPreview
					kind="code"
					name="filterCatalog / getCartTotals / getCategoryIcon"
					description="Filtro por categoría y texto, totales del carrito e icono de cada categoría."
					path="src/features/catalog/lib/"
				/>
				<ComponentPreview
					kind="code"
					name="MOCK_CATALOG_PRODUCTS"
					description="Se construye a partir de los productos del admin (solo activos; stock 0 = agotado)."
					path="src/features/catalog/mocks/catalog.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
