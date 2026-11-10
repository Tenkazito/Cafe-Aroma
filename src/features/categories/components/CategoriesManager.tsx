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
import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { CategoryFormModal } from "@/features/categories/components/CategoryFormModal";
import { filterCategories } from "@/features/categories/lib/filterCategories";
import type { CategorySummary } from "@/features/categories/types";

const CATEGORIES_URL = "/api/categories";
// ID, Nombre, Estado y Acciones: las mismas columnas que `CategoriesTable`
const CATEGORY_COLUMNS = 4;

/** Pantalla Categorías: búsqueda, tabla y modales de crear / editar / eliminar. */
export const CategoriesManager = () => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<CategorySummary>();

	// SWR guarda la lista en caché con la URL como clave; `mutate()` la vuelve a pedir
	const { data, error, isLoading, mutate } = useSWR(
		CATEGORIES_URL,
		() => apiFetch<{ data: CategorySummary[] }>(CATEGORIES_URL),
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const categories = data?.data ?? [];
	const visibleCategories = filterCategories(categories, search);

	const emptyMessage = error
		? locations.emptyStates.loadError
		: locations.categories.empty;

	const handleDelete = async () => {
		const category = modals.itemToDelete;
		if (!category) return;

		try {
			await apiFetch(`${CATEGORIES_URL}/${category.id}`, { method: "DELETE" });
			toast.success(locations.toasts.categoryDeleted(category.name));
			await mutate();
		} catch (error) {
			logger({
				error: error as Error,
				module: "CategoriesManager:handleDelete",
			});
			toast.danger(locations.toasts.categoryDeleteError);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.categories.title}
				description={locations.categories.description}
				icon="grid"
				action={
					<Button onPress={modals.openCreate}>
						<Icon name="plus" size={18} />
						{locations.categories.newButton}
					</Button>
				}
			/>

			<FilterBar title={null} columns={2}>
				<SearchInput
					aria-label={locations.categories.searchLabel}
					placeholder={locations.categories.searchPlaceholder}
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</FilterBar>

			{/* `isLoading` solo es true en la 1ª carga; al recargar con mutate() la tabla sigue visible */}
			{isLoading ? (
				<SkeletonTable columns={CATEGORY_COLUMNS} />
			) : (
				<CategoriesTable
					categories={visibleCategories}
					emptyMessage={emptyMessage}
					onEdit={modals.openEdit}
					onDelete={modals.openDelete}
				/>
			)}

			<CategoryFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				category={modals.editingItem}
				onSaved={() => mutate()}
			/>

			<ConfirmDialog
				isOpen={modals.isDeleteOpen}
				onOpenChange={modals.setDeleteOpen}
				title={locations.categories.deleteTitle}
				tone="danger"
				confirmLabel={locations.actions.delete}
				onConfirm={handleDelete}
				message={
					<>
						{locations.categories.deleteMessage.before}
						<strong className="text-navy">{modals.itemToDelete?.name}</strong>
						{locations.categories.deleteMessage.after}{" "}
						{locations.confirm.irreversible}
					</>
				}
			/>
		</div>
	);
};
