"use client";

import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { booleanSelectOptions, STATUS_OPTIONS } from "@/common/lib/formFields";
import { locations } from "@/common/locations";
import { apiFetch } from "@/common/utils/api";
import { logger } from "@/common/utils/logger";
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
		formState: { errors, isSubmitting },
	} = useForm<CategoryFormValues>({
		resolver: zodResolver(categorySchema),
		// Se leen una sola vez al montar; el Manager remonta el modal con key={formKey}
		defaultValues: {
			name: category?.name ?? "",
			isActive: category?.isActive ?? true,
		},
	});

	// Solo se llama si Zod validó todo bien
	const onSubmit = async (data: CategoryFormValues) => {
		try {
			const method = isEditing ? "PUT" : "POST";
			const url = isEditing
				? `/api/categories/${category?.id}`
				: "/api/categories";

			const res = await apiFetch<{ success: boolean }>(url, {
				method,
				body: data,
			});

			if (res.success) {
				toast.success(
					isEditing
						? locations.toasts.categoryUpdated
						: locations.toasts.categoryCreated,
				);
			} else {
				toast.danger(locations.toasts.categoryError);
			}

			onOpenChange(false);
		} catch (error) {
			logger({
				error: error as Error,
				module: "CategoryFormModal:onSubmit",
			});
			toast.danger(locations.toasts.categoryError);
		}
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
			isSubmitting={isSubmitting}
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
				{...register("isActive", booleanSelectOptions)}
				errorMessage={errors.isActive?.message}
			/>
		</FormModal>
	);
};
