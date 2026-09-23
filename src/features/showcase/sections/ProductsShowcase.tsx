"use client";

import { toast } from "@heroui/react";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";
import { ProductFormModal } from "@/features/products/components/ProductFormModal";
import { ProductsManager } from "@/features/products/components/ProductsManager";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

const CATEGORY_NAMES = MOCK_CATEGORIES.map((category) => category.name);

export const ProductsShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("products")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="ProductsTable"
					description="Tabla de productos con miniatura, precio en COP, stock (naranja si es bajo) y estado."
					path="src/features/products/components/ProductsTable.tsx"
				>
					<ProductsTable
						products={MOCK_PRODUCTS.slice(5, 9)}
						onEdit={(product) => toast.info(`Editar ${product.name}`)}
						onDelete={(product) => toast.info(`Eliminar ${product.name}`)}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="ProductFormModal"
					description="Modal para crear o editar un producto, con subida de imagen."
					path="src/features/products/components/ProductFormModal.tsx"
					props={[
						{
							name: "categoryNames",
							description: "Opciones del select Categoría",
						},
					]}
				>
					<div className="flex gap-3">
						<ModalPreview
							label="Nuevo producto"
							renderModal={(isOpen, onOpenChange) => (
								<ProductFormModal
									isOpen={isOpen}
									onOpenChange={onOpenChange}
									categoryNames={CATEGORY_NAMES}
								/>
							)}
						/>
						<ModalPreview
							label="Editar producto"
							renderModal={(isOpen, onOpenChange) => (
								<ProductFormModal
									isOpen={isOpen}
									onOpenChange={onOpenChange}
									categoryNames={CATEGORY_NAMES}
									product={MOCK_PRODUCTS[0]}
								/>
							)}
						/>
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="ProductsManager"
					description="Pantalla completa de /admin/productos (incluye la confirmación 'Eliminar Producto')."
					path="src/features/products/components/ProductsManager.tsx"
				>
					<ProductsManager
						products={MOCK_PRODUCTS}
						categoryNames={CATEGORY_NAMES}
					/>
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="filterProducts(products, search)"
					description="Busca por nombre o categoría."
					path="src/features/products/lib/filterProducts.ts"
				/>
				<ComponentPreview
					kind="code"
					name="isLowStock(stock)"
					description="true si el stock es ≤ LOW_STOCK_THRESHOLD (15). Lo usan la tabla de productos y el dashboard."
					path="src/features/products/lib/isLowStock.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
