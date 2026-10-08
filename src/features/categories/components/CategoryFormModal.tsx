"use client";

import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import { locations } from "@/common/locations";
import {
	type CategoryFormValues,
	categorySchema,
} from "@/features/categories/schema";
import type { Category } from "@/features/categories/types";

type CategoryFormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	/** Si llega una categoría el modal edita; si no, crea una nueva. */
	category?: Category;
};

export const CategoryFormModal = ({
	isOpen,
	onOpenChange,
	category,
}: CategoryFormModalProps) => {
	const isEditing = Boolean(category);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		// Se leen una sola vez al montar; el Manager remonta el modal con key={formKey}
		defaultValues: {
			name: category?.name ?? "",
			isActive: category?.isActive ?? true,
		},
	});

	// Solo se llama si Zod validó todo bien
	const onSubmit = (values: CategoryFormValues) => {
		// TODO: llamar al Server Action (createCategory / updateCategory) con `values`
		console.log(values);
		toast.success(
			isEditing
				? locations.toasts.categoryUpdated
				: locations.toasts.categoryCreated,
		);
		onOpenChange(false);
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={
				isEditing
					? locations.categories.editTitle
					: locations.categories.createTitle
			}
			submitLabel={
				isEditing ? locations.actions.save : locations.categories.createSubmit
			}
			onSubmit={handleSubmit(onSubmit)}
			size="sm"
		>
			<FormTextField
				label={locations.form.name}
				placeholder={locations.categories.namePlaceholder}
				{...register("name")}
				errorMessage={errors.name?.message}
			/>
			<FormSelectField
				label={locations.form.status}
				options={STATUS_OPTIONS}
				// El <select> entrega texto ("true"/"false"), pero RHF también pasa por aquí el
				// valor inicial, que ya es booleano. String() cubre los dos casos.
				{...register("isActive", {
					setValueAs: (value: string | boolean) => String(value) === "true",
				})}
				errorMessage={errors.isActive?.message}
			/>
		</FormModal>
	);
};
