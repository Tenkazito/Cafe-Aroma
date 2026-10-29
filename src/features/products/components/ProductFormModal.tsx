"use client";
import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextAreaField } from "@/common/components/form/FormTextAreaField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { ImageUploadField } from "@/common/components/form/ImageUploadField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { booleanSelectOptions, STATUS_OPTIONS } from "@/common/lib/formFields";
import { locations } from "@/common/locations";
import { apiFetch } from "@/common/utils/api";
import { logger } from "@/common/utils/logger";
import {
	type ProductFormValues,
	productSchema,
} from "@/features/products/schema";
import type { Product } from "@/features/products/types";

type ProductFormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	/** Nombres de las categorías disponibles para el select. */
	categoryNames: string[];
	/** Si llega un producto el modal edita; si no, crea uno nuevo. */
	product?: Product;
};

export const ProductFormModal = ({
	isOpen,
	onOpenChange,
	categoryNames,
	product,
}: ProductFormModalProps) => {
	const isEditing = Boolean(product);
	const categoryOptions = categoryNames.map((name) => ({
		value: name,
		label: name,
	}));
	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			categoryName: product?.categoryName ?? "",
			name: product?.name ?? "",
			description: product?.description ?? "",
			price: product?.price,
			stock: product?.stock,
			isActive: product?.isActive ?? true,
			imageUrl: product?.imageUrl ?? "",
		},
	});

	const onSubmit = async (data: ProductFormValues) => {
		try {
			const method = isEditing ? "PUT" : "POST";
			const url = isEditing
				? `/api/products/${product?.id}`
				: "/api/products";

			const res = await apiFetch<{ success: boolean }>(url, {
				method,
				body: data,
			});

			if (res.success) {
				toast.success(
					isEditing
						? locations.toasts.productUpdated
						: locations.toasts.productCreated,
				);
			} else {
				toast.danger(locations.toasts.productError);
			}

			onOpenChange(false);
		} catch (error) {
			logger({
				error: error as Error,
				module: "ProductFormModal:onSubmit",
			});
			toast.danger(locations.toasts.productError);
		}
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={
				isEditing
					? locations.products.editTitle
					: locations.products.createTitle
			}
			submitLabel={
				isEditing ? locations.actions.save : locations.products.createSubmit
			}
			onSubmit={handleSubmit(onSubmit)}
			isSubmitting={isSubmitting}
			size="lg"
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label={locations.products.categoryLabel}
					placeholder={locations.products.categoryPlaceholder}
					options={categoryOptions}
					{...register("categoryName")}
					errorMessage={errors.categoryName?.message}
				/>
				<FormTextField
					label={locations.form.name}
					placeholder={locations.products.namePlaceholder}
					{...register("name")}
					errorMessage={errors.name?.message}
				/>
			</div>
			<FormTextAreaField
				label={locations.products.descriptionLabel}
				placeholder={locations.products.descriptionPlaceholder}
				{...register("description")}
				errorMessage={errors.description?.message}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormTextField
					label={locations.products.priceLabel}
					type="number"
					min={0}
					step="1"
					placeholder={locations.products.pricePlaceholder}
					{...register("price", { valueAsNumber: true })}
					errorMessage={errors.price?.message}
				/>
				<FormTextField
					label={locations.products.stockLabel}
					type="number"
					min={0}
					step="1"
					placeholder={locations.products.stockPlaceholder}
					{...register("stock", { valueAsNumber: true })}
					errorMessage={errors.stock?.message}
				/>
				<FormSelectField
					label={locations.form.status}
					options={STATUS_OPTIONS}
					{...register("isActive", booleanSelectOptions)}
					errorMessage={errors.isActive?.message}
				/>
			</div>
			<Controller
				control={control}
				name="imageUrl"
				render={({ field }) => (
					<ImageUploadField
						label={locations.products.imageLabel}
						name={field.name}
						value={field.value}
						onChange={field.onChange}
						errorMessage={errors.imageUrl?.message}
					/>
				)}
			/>
		</FormModal>
	);
};
