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
import { USER_ROLE_OPTIONS } from "@/features/users/lib/userRoles";
import { type UserFormValues, userSchema } from "@/features/users/schema";
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
	const {
		register,
		handleSubmit,
		formState: { errors },
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

	const onSubmit = (values: UserFormValues) => {
		// TODO: llamar al Server Action (createUser / updateUser) con `values`
		console.log(isEditing ? "Editar usuario" : "Crear usuario", {
			id: user?.id,
			...values,
		});
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
			onSubmit={handleSubmit(onSubmit)}
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
