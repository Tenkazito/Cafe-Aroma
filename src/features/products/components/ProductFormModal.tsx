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
import type { CategorySummary } from "@/features/categories/types";
import {
	type ProductFormValues,
	productSchema,
} from "@/features/products/schema";
import type { Product } from "@/features/products/types";

type ProductFormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	/** Categorías para el select (se usa su id como valor). */
	categories: CategorySummary[];
	/** Si llega un producto el modal edita; si no, crea uno nuevo. */
	product?: Product;
	/** Se llama después de guardar bien, para que el listado se recargue. */
	onSaved?: () => void;
};

export const ProductFormModal = ({
	isOpen,
	onOpenChange,
	categories,
	product,
	onSaved,
}: ProductFormModalProps) => {
	const isEditing = Boolean(product);
	// Las inactivas no se ofrecen, salvo la que ya tiene el producto que se edita
	const categoryOptions = categories
		.filter(
			(category) => category.isActive || category.id === product?.categoryId,
		)
		.map((category) => ({ value: String(category.id), label: category.name }));

	const {
		register,
		handleSubmit,
		control,
		formState: { errors, isSubmitting },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			categoryId: product?.categoryId,
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
			const url = isEditing ? `/api/products/${product?.id}` : "/api/products";

			await apiFetch(url, { method, body: data });

			toast.success(
				isEditing
					? locations.toasts.productUpdated
					: locations.toasts.productCreated,
			);
			onSaved?.();
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
					{...register("categoryId", { valueAsNumber: true })}
					errorMessage={errors.categoryId?.message}
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
