"use client";

import { Button, toast } from "@heroui/react";
import { useState } from "react";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { Icon } from "@/common/components/ui/Icon";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { SearchInput } from "@/common/components/ui/SearchInput";
import { useCrudModals } from "@/common/hooks/useCrudModals";
import { ProductFormModal } from "@/features/products/components/ProductFormModal";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import { filterProducts } from "@/features/products/lib/filterProducts";
import type { Product } from "@/features/products/types";

type ProductsManagerProps = {
	products: Product[];
	categoryNames: string[];
};

/** Pantalla Productos: búsqueda, tabla y modales de crear / editar / eliminar. */
export const ProductsManager = ({
	products,
	categoryNames,
}: ProductsManagerProps) => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<Product>();
	const visibleProducts = filterProducts(products, search);

	const handleDelete = () => {
		// TODO: llamar al Server Action que elimina el producto
		toast.success(`${modals.itemToDelete?.name} eliminado (simulado)`);
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Productos"
				description="Catálogo de productos de la cafetería"
				icon="package"
				action={
					<Button onPress={modals.openCreate}>
						<Icon name="plus" size={18} />
						Nuevo Producto
					</Button>
				}
			/>

			<FilterBar title={null} columns={2}>
				<SearchInput
					aria-label="Buscar producto"
					placeholder="Buscar producto o categoría..."
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</FilterBar>

			<ProductsTable
				products={visibleProducts}
				onEdit={modals.openEdit}
				onDelete={modals.openDelete}
			/>

			<ProductFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				categoryNames={categoryNames}
				product={modals.editingItem}
			/>

			<ConfirmDialog
				isOpen={modals.isDeleteOpen}
				onOpenChange={modals.setDeleteOpen}
				title="Eliminar Producto"
				tone="danger"
				confirmLabel="Eliminar"
				onConfirm={handleDelete}
				message={
					<>
						¿Estás seguro de que deseas eliminar el producto{" "}
						<strong className="text-navy">{modals.itemToDelete?.name}</strong>?
						Esta acción no se puede deshacer.
					</>
				}
			/>
		</div>
	);
};
