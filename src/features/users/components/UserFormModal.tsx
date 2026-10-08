"use client";

import { toast } from "@heroui/react";
import type { FormEvent } from "react";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import { locations } from "@/common/locations";
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
			isEditing ? locations.toasts.userUpdated : locations.toasts.userCreated,
		);
		onOpenChange(false);
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={
				isEditing ? locations.users.editTitle : locations.users.createTitle
			}
			submitLabel={
				isEditing ? locations.actions.save : locations.users.createSubmit
			}
			onSubmit={handleSubmit}
		>
			<FormTextField
				label={locations.users.fullName}
				name="fullName"
				placeholder={locations.users.fullNamePlaceholder}
				defaultValue={user?.fullName}
			/>
			<FormTextField
				label={locations.form.email}
				name="email"
				type="email"
				placeholder={locations.form.emailPlaceholder}
				defaultValue={user?.email}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label={locations.users.roleLabel}
					name="role"
					options={USER_ROLE_OPTIONS}
					defaultValue={user?.role ?? "cliente"}
				/>
				<FormSelectField
					label={locations.form.status}
					name="status"
					options={STATUS_OPTIONS}
					defaultValue={String(user?.isActive ?? true)}
				/>
				<FormPasswordField
					label={locations.form.password}
					name="password"
					autoComplete="new-password"
				/>
				<FormPasswordField
					label={locations.form.confirmPassword}
					name="confirmPassword"
					autoComplete="new-password"
				/>
			</div>
		</FormModal>
	);
};
