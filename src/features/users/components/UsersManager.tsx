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
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { UsersTable } from "@/features/users/components/UsersTable";
import { filterUsers } from "@/features/users/lib/filterUsers";
import { getFullName } from "@/features/users/lib/getFullName";
import type { User } from "@/features/users/types";

const USERS_URL = "/api/users";
// ID, Nombre, Email, Rol, Estado y Acciones: las columnas de `UsersTable`
const USER_COLUMNS = 6;

/** Pantalla Usuarios: búsqueda, tabla y modales de crear / editar / eliminar. */
export const UsersManager = () => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<User>();

	const { data, error, isLoading, mutate } = useSWR(
		USERS_URL,
		() => apiFetch<{ data: User[] }>(USERS_URL),
		{
			revalidateOnFocus: false,
			revalidateOnReconnect: false,
		},
	);

	const users = data?.data ?? [];
	const visibleUsers = filterUsers(users, search);

	const emptyMessage = error
		? locations.emptyStates.loadError
		: locations.users.empty;

	const handleDelete = async () => {
		const user = modals.itemToDelete;
		if (!user) return;

		try {
			await apiFetch(`${USERS_URL}/${user.id}`, { method: "DELETE" });
			toast.success(locations.toasts.userDeleted(getFullName(user)));
			await mutate();
		} catch (error) {
			logger({
				error: error as Error,
				module: "UsersManager:handleDelete",
			});
			toast.danger(locations.toasts.userDeleteError);
		}
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title={locations.users.title}
				description={locations.users.description}
				icon="users"
				action={
					<Button onPress={modals.openCreate}>
						<Icon name="plus" size={18} />
						{locations.users.newButton}
					</Button>
				}
			/>

			<FilterBar title={null} columns={2}>
				<SearchInput
					aria-label={locations.users.searchLabel}
					placeholder={locations.users.searchPlaceholder}
					value={search}
					onChange={(event) => setSearch(event.target.value)}
				/>
			</FilterBar>

			{isLoading ? (
				<SkeletonTable columns={USER_COLUMNS} />
			) : (
				<UsersTable
					users={visibleUsers}
					emptyMessage={emptyMessage}
					onEdit={modals.openEdit}
					onDelete={modals.openDelete}
				/>
			)}

			<UserFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				user={modals.editingItem}
				onSaved={() => mutate()}
			/>

			<ConfirmDialog
				isOpen={modals.isDeleteOpen}
				onOpenChange={modals.setDeleteOpen}
				title={locations.users.deleteTitle}
				tone="danger"
				confirmLabel={locations.actions.delete}
				onConfirm={handleDelete}
				message={
					<>
						{locations.users.deleteMessage.before}
						<strong className="text-navy">
							{modals.itemToDelete && getFullName(modals.itemToDelete)}
						</strong>
						{locations.users.deleteMessage.after}{" "}
						{locations.confirm.irreversible}
					</>
				}
			/>
		</div>
	);
};
