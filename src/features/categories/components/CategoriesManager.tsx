"use client";

import { Button, toast } from "@heroui/react";
import { useState } from "react";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { Icon } from "@/common/components/ui/Icon";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { SearchInput } from "@/common/components/ui/SearchInput";
import { useCrudModals } from "@/common/hooks/useCrudModals";
import { locations } from "@/common/locations";
import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { CategoryFormModal } from "@/features/categories/components/CategoryFormModal";
import { filterCategories } from "@/features/categories/lib/filterCategories";
import type { Category } from "@/features/categories/types";

type CategoriesManagerProps = {
	categories: Category[];
};

/** Pantalla Categorías: búsqueda, tabla y modales de crear / editar / eliminar. */
export const CategoriesManager = ({ categories }: CategoriesManagerProps) => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<Category>();
	const visibleCategories = filterCategories(categories, search);

	const handleDelete = () => {
		// TODO: llamar al Server Action que elimina la categoría
		toast.success(
			locations.toasts.categoryDeleted(modals.itemToDelete?.name ?? ""),
		);
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

			<CategoriesTable
				categories={visibleCategories}
				onEdit={modals.openEdit}
				onDelete={modals.openDelete}
			/>

			<CategoryFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				category={modals.editingItem}
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
