"use client";

import { toast } from "@heroui/react";
import type { FormEvent } from "react";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import { USER_ROLE_OPTIONS } from "@/features/users/lib/userRoles";
import type { User } from "@/features/users/types";

type UserFormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	/** Si llega un usuario el modal edita; si no, crea uno nuevo. */
	user?: User;
};

export const UserFormModal = ({
	isOpen,
	onOpenChange,
	user,
}: UserFormModalProps) => {
	const isEditing = Boolean(user);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: conectar React Hook Form + Zod y el Server Action (crear / actualizar usuario)
		toast.success(
			isEditing
				? "Usuario actualizado (simulado)"
				: "Usuario creado (simulado)",
		);
		onOpenChange(false);
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={isEditing ? "Editar Usuario" : "Nuevo Usuario"}
			submitLabel={isEditing ? "Guardar Cambios" : "Crear Usuario"}
			onSubmit={handleSubmit}
		>
			<FormTextField
				label="Nombre completo"
				name="fullName"
				placeholder="Ej: Juan Pérez"
				defaultValue={user?.fullName}
			/>
			<FormTextField
				label="Correo electrónico"
				name="email"
				type="email"
				placeholder="usuario@cafearoma.co"
				defaultValue={user?.email}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label="Rol"
					name="role"
					options={USER_ROLE_OPTIONS}
					defaultValue={user?.role ?? "administrativo"}
				/>
				<FormSelectField
					label="Estado"
					name="status"
					options={STATUS_OPTIONS}
					defaultValue={user && !user.isActive ? "inactivo" : "activo"}
				/>
				<FormPasswordField
					label="Contraseña"
					name="password"
					autoComplete="new-password"
				/>
				<FormPasswordField
					label="Confirmar contraseña"
					name="confirmPassword"
					autoComplete="new-password"
				/>
			</div>
		</FormModal>
	);
};
