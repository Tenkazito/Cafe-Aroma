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
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { UsersTable } from "@/features/users/components/UsersTable";
import { filterUsers } from "@/features/users/lib/filterUsers";
import type { User } from "@/features/users/types";

type UsersManagerProps = {
	users: User[];
};

/** Pantalla Usuarios: búsqueda, tabla y modales de crear / editar / eliminar. */
export const UsersManager = ({ users }: UsersManagerProps) => {
	const [search, setSearch] = useState("");
	const modals = useCrudModals<User>();
	const visibleUsers = filterUsers(users, search);

	const handleDelete = () => {
		// TODO: llamar al Server Action que elimina el usuario
		toast.success(
			locations.toasts.userDeleted(modals.itemToDelete?.fullName ?? ""),
		);
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

			<UsersTable
				users={visibleUsers}
				onEdit={modals.openEdit}
				onDelete={modals.openDelete}
			/>

			<UserFormModal
				key={modals.formKey}
				isOpen={modals.isFormOpen}
				onOpenChange={modals.setFormOpen}
				user={modals.editingItem}
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
							{modals.itemToDelete?.fullName}
						</strong>
						{locations.users.deleteMessage.after}{" "}
						{locations.confirm.irreversible}
					</>
				}
			/>
		</div>
	);
};
