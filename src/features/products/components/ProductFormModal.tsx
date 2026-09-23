"use client";

import { toast } from "@heroui/react";
import type { FormEvent } from "react";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextAreaField } from "@/common/components/form/FormTextAreaField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { ImageUploadField } from "@/common/components/form/ImageUploadField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
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
				? "Producto actualizado (simulado)"
				: "Producto creado (simulado)",
		);
		onOpenChange(false);
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={isEditing ? "Editar Producto" : "Nuevo Producto"}
			submitLabel={isEditing ? "Guardar Cambios" : "Crear Producto"}
			onSubmit={handleSubmit}
			size="lg"
		>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField
					label="Categoría"
					name="categoryName"
					options={categoryOptions}
					defaultValue={product?.categoryName}
				/>
				<FormTextField
					label="Nombre"
					name="name"
					placeholder="Ej: Latte Clásico"
					defaultValue={product?.name}
				/>
			</div>
			<FormTextAreaField
				label="Descripción"
				name="description"
				placeholder="Describe el producto..."
				defaultValue={product?.description}
			/>
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
				<FormTextField
					label="Precio (COP)"
					name="price"
					type="number"
					min={0}
					placeholder="8500"
					defaultValue={product?.price}
				/>
				<FormTextField
					label="Stock"
					name="stock"
					type="number"
					min={0}
					placeholder="40"
					defaultValue={product?.stock}
				/>
				<FormSelectField
					label="Estado"
					name="status"
					options={STATUS_OPTIONS}
					defaultValue={product && !product.isActive ? "inactivo" : "activo"}
				/>
			</div>
			<ImageUploadField
				label="Imagen del producto"
				name="imageUrl"
				defaultImageUrl={product?.imageUrl}
			/>
		</FormModal>
	);
};
