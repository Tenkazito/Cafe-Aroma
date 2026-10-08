"use client";

import { toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextAreaField } from "@/common/components/form/FormTextAreaField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { ImageUploadField } from "@/common/components/form/ImageUploadField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import { locations } from "@/common/locations";
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
		formState: { errors },
	} = useForm<ProductFormValues>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			categoryName: product?.categoryName ?? "",
			name: product?.name ?? "",
			description: product?.description ?? "",
			price: product?.price,
			stock: product?.stock,
			status: String(product?.isActive ?? true) as "true" | "false",
			imageUrl: product?.imageUrl ?? "",
		},
	});

	const onSubmit = (values: ProductFormValues) => {
		console.log(values);
		toast.success(
			isEditing
				? locations.toasts.productUpdated
				: locations.toasts.productCreated,
		);
		onOpenChange(false);
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
			size="lg"
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label={locations.products.categoryLabel}
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
					step="any"
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
					{...register("status")}
					errorMessage={errors.status?.message}
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
