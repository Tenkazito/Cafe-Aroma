"use client";

import { Button, toast } from "@heroui/react";
import { useState } from "react";
import useSWR from "swr";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { Icon } from "@/common/components/ui/Icon";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { SearchInput } from "@/common/components/ui/SearchInput";
import { SkeletonTable } from "@/common/components/ui/SkeletonTable";
import { useCrudModals } from "@/common/hooks/useCrudModals";
import { locations } from "@/common/locations";
import { apiFetch } from "@/common/utils/api";
import { logger } from "@/common/utils/logger";
import type { CategorySummary } from "@/features/categories/types";
import { ProductFormModal } from "@/features/products/components/ProductFormModal";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import type { Product as ProductEntity } from "@/features/products/domain/product.entity";
import { filterProducts } from "@/features/products/lib/filterProducts";
import { toProductRows } from "@/features/products/lib/toProductRows";
import type { Product } from "@/features/products/types";

const PRODUCTS_URL = "/api/products";
const CATEGORIES_URL = "/api/categories";
// ID, Categoría, Nombre, Precio, Stock, Estado y Acciones: las columnas de `ProductsTable`
const PRODUCT_COLUMNS = 7;

const swrOptions = { revalidateOnFocus: false, revalidateOnReconnect: false };

/** Pantalla Productos: búsqueda, tabla y modales de crear / editar / eliminar. */
export const ProductsManager = () => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<Product>();

	const products = useSWR(
		PRODUCTS_URL,
		() => apiFetch<{ data: ProductEntity[] }>(PRODUCTS_URL),
		swrOptions,
	);
	// Misma clave que en CategoriesManager: si ya se cargaron allí, SWR reutiliza la caché
	const categories = useSWR(
		CATEGORIES_URL,
		() => apiFetch<{ data: CategorySummary[] }>(CATEGORIES_URL),
		swrOptions,
	);

	const categoryList = categories.data?.data ?? [];
	const rows = toProductRows(products.data?.data ?? [], categoryList);
	const visibleProducts = filterProducts(rows, search);

	const emptyMessage = products.error
		? locations.emptyStates.loadError
		: locations.products.empty;

	const handleDelete = async () => {
		const product = modals.itemToDelete;
		if (!product) return;

		try {
			await apiFetch(`${PRODUCTS_URL}/${product.id}`, { method: "DELETE" });
			toast.success(locations.toasts.productDeleted(product.name));
			await products.mutate();
		} catch (error) {
			logger({
				error: error as Error,
				module: "ProductsManager:handleDelete",
			});
			toast.danger(locations.toasts.productDeleteError);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.products.title}
				description={locations.products.description}
				icon="package"
				action={
					<Button onPress={modals.openCreate}>
						<Icon name="plus" size={18} />
						{locations.products.newButton}
					</Button>
				}
			/>

			<FilterBar title={null} columns={2}>
				<SearchInput
					aria-label={locations.products.searchLabel}
					placeholder={locations.products.searchPlaceholder}
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</FilterBar>

			{products.isLoading || categories.isLoading ? (
				<SkeletonTable columns={PRODUCT_COLUMNS} />
			) : (
				<ProductsTable
					products={visibleProducts}
					emptyMessage={emptyMessage}
					onEdit={modals.openEdit}
					onDelete={modals.openDelete}
				/>
			)}

			<ProductFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				categories={categoryList}
				product={modals.editingItem}
				onSaved={() => products.mutate()}
			/>

			<ConfirmDialog
				isOpen={modals.isDeleteOpen}
				onOpenChange={modals.setDeleteOpen}
				title={locations.products.deleteTitle}
				tone="danger"
				confirmLabel={locations.actions.delete}
				onConfirm={handleDelete}
				message={
					<>
						{locations.products.deleteMessage.before}
						<strong className="text-navy">{modals.itemToDelete?.name}</strong>
						{locations.products.deleteMessage.after}{" "}
						{locations.confirm.irreversible}
					</>
				}
			/>
		</div>
	);
};
