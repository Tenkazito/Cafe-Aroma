"use client";

import { toast } from "@heroui/react";
import type { FormEvent } from "react";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { FormModal } from "@/common/components/overlay/FormModal";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
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

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: conectar React Hook Form + Zod y el Server Action (crear / actualizar categoría)
		toast.success(
			isEditing
				? "Categoría actualizada (simulado)"
				: "Categoría creada (simulado)",
		);
		onOpenChange(false);
	};

	return (
		<FormModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={isEditing ? "Editar Categoría" : "Nueva Categoría"}
			submitLabel={isEditing ? "Guardar Cambios" : "Crear Categoría"}
			onSubmit={handleSubmit}
			size="sm"
		>
			<FormTextField
				label="Nombre"
				name="name"
				placeholder="Ej: Cafés Calientes"
				defaultValue={category?.name}
			/>
			<FormSelectField
				label="Estado"
				name="status"
				options={STATUS_OPTIONS}
				defaultValue={category && !category.isActive ? "inactivo" : "activo"}
			/>
		</FormModal>
	);
};
