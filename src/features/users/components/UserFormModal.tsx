"use client";

import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { booleanSelectOptions, STATUS_OPTIONS } from "@/common/lib/formFields";
import { locations } from "@/common/locations";
import { apiFetch } from "@/common/utils/api";
import { logger } from "@/common/utils/logger";
import { USER_ROLE_OPTIONS } from "@/features/users/lib/userRoles";
import { type UserFormValues, userSchema } from "@/features/users/schema";
import type { User } from "@/features/users/types";

type UserFormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	/** Si llega un usuario el modal edita; si no, crea uno nuevo. */
	user?: User;
	/** Se llama después de guardar bien, para que el listado se recargue. */
	onSaved?: () => void;
};

export const UserFormModal = ({
	isOpen,
	onOpenChange,
	user,
	onSaved,
}: UserFormModalProps) => {
	const isEditing = Boolean(user);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<UserFormValues>({
		resolver: zodResolver(userSchema(isEditing)),
		defaultValues: {
			firstName: user?.firstName ?? "",
			lastName: user?.lastName ?? "",
			email: user?.email ?? "",
			role: user?.role ?? "cliente",
			isActive: user?.isActive ?? true,
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: UserFormValues) => {
		try {
			const method = isEditing ? "PUT" : "POST";
			const url = isEditing ? `/api/users/${user?.id}` : "/api/users";

			await apiFetch(url, { method, body: data });

			toast.success(
				isEditing ? locations.toasts.userUpdated : locations.toasts.userCreated,
			);
			onSaved?.();
			onOpenChange(false);
		} catch (error) {
			logger({
				error: error as Error,
				module: "UserFormModal:onSubmit",
			});
			// Se muestra el mensaje de la API para que se vea "Ya existe una cuenta con ese correo" (409)
			toast.danger(
				error instanceof Error ? error.message : locations.toasts.userError,
			);
		}
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
			onSubmit={handleSubmit(onSubmit)}
			isSubmitting={isSubmitting}
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormTextField
					label={locations.users.firstName}
					placeholder={locations.users.firstNamePlaceholder}
					{...register("firstName")}
					errorMessage={errors.firstName?.message}
				/>
				<FormTextField
					label={locations.users.lastName}
					placeholder={locations.users.lastNamePlaceholder}
					{...register("lastName")}
					errorMessage={errors.lastName?.message}
				/>
			</div>
			<FormTextField
				label={locations.form.email}
				type="email"
				placeholder={locations.form.emailPlaceholder}
				{...register("email")}
				errorMessage={errors.email?.message}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label={locations.users.roleLabel}
					options={USER_ROLE_OPTIONS}
					{...register("role")}
					errorMessage={errors.role?.message}
				/>
				<FormSelectField
					label={locations.form.status}
					options={STATUS_OPTIONS}
					{...register("isActive", booleanSelectOptions)}
					errorMessage={errors.isActive?.message}
				/>
				<FormPasswordField
					label={locations.form.password}
					autoComplete="new-password"
					placeholder={
						isEditing ? locations.users.passwordEditPlaceholder : undefined
					}
					{...register("password")}
					errorMessage={errors.password?.message}
				/>
				<FormPasswordField
					label={locations.form.confirmPassword}
					autoComplete="new-password"
					{...register("confirmPassword")}
					errorMessage={errors.confirmPassword?.message}
				/>
			</div>
		</FormModal>
	);
};
