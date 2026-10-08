"use client";

import { toast } from "@heroui/react";
import type { FormEvent } from "react";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextAreaField } from "@/common/components/form/FormTextAreaField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { ImageUploadField } from "@/common/components/form/ImageUploadField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import { locations } from "@/common/locations";
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: conectar React Hook Form + Zod y el Server Action (crear / actualizar producto)
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
			onSubmit={handleSubmit}
			size="lg"
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label={locations.products.categoryLabel}
					name="categoryName"
					options={categoryOptions}
					defaultValue={product?.categoryName}
				/>
				<FormTextField
					label={locations.form.name}
					name="name"
					placeholder={locations.products.namePlaceholder}
					defaultValue={product?.name}
				/>
			</div>
			<FormTextAreaField
				label={locations.products.descriptionLabel}
				name="description"
				placeholder={locations.products.descriptionPlaceholder}
				defaultValue={product?.description}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormTextField
					label={locations.products.priceLabel}
					name="price"
					type="number"
					min={0}
					placeholder={locations.products.pricePlaceholder}
					defaultValue={product?.price}
				/>
				<FormTextField
					label={locations.products.stockLabel}
					name="stock"
					type="number"
					min={0}
					placeholder={locations.products.stockPlaceholder}
					defaultValue={product?.stock}
				/>
				<FormSelectField
					label={locations.form.status}
					name="status"
					options={STATUS_OPTIONS}
					defaultValue={String(product?.isActive ?? true)}
				/>
			</div>
			<ImageUploadField
				label={locations.products.imageLabel}
				name="imageUrl"
				defaultImageUrl={product?.imageUrl}
			/>
		</FormModal>
	);
};
