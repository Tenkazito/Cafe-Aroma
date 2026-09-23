"use client";

import { Button, toast } from "@heroui/react";
import { useState } from "react";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { Icon } from "@/common/components/ui/Icon";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { SearchInput } from "@/common/components/ui/SearchInput";
import { useCrudModals } from "@/common/hooks/useCrudModals";
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
		toast.success(`${modals.itemToDelete?.fullName} eliminado (simulado)`);
	};

	return (
		<div className="flex flex-col gap-6">
			<PageHeader
				title="Usuarios"
				description="Gestión del personal del sistema"
				icon="users"
				action={
					<Button onPress={modals.openCreate}>
						<Icon name="plus" size={18} />
						Nuevo Usuario
					</Button>
				}
			/>

			<FilterBar title={null} columns={2}>
				<SearchInput
					aria-label="Buscar usuario"
					placeholder="Buscar por nombre o correo..."
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
				title="Eliminar Usuario"
				tone="danger"
				confirmLabel="Eliminar"
				onConfirm={handleDelete}
				message={
					<>
						¿Estás seguro de que deseas eliminar al usuario{" "}
						<strong className="text-navy">
							{modals.itemToDelete?.fullName}
						</strong>
						? Esta acción no se puede deshacer.
					</>
				}
			/>
		</div>
	);
};
