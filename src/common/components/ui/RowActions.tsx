"use client";

import { Button } from "@heroui/react";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type RowActionsProps = {
	/** Nombre del registro, para que los lectores de pantalla digan "Editar Latte Clásico". */
	itemName: string;
	onEdit: () => void;
	onDelete: () => void;
};

/** Botones de editar y eliminar de la columna "Acciones" de las tablas. */
export const RowActions = ({ itemName, onEdit, onDelete }: RowActionsProps) => {
	return (
		<div className="flex items-center justify-end gap-1">
			<Button
				isIconOnly
				size="sm"
				variant="ghost"
				aria-label={locations.actions.editItem(itemName)}
				onPress={onEdit}
				className="text-gray-400 hover:text-navy"
			>
				<Icon name="pencil" size={16} />
			</Button>
			<Button
				isIconOnly
				size="sm"
				variant="ghost"
				aria-label={locations.actions.deleteItem(itemName)}
				onPress={onDelete}
				className="text-gray-400 hover:text-red-500"
			>
				<Icon name="trash" size={16} />
			</Button>
		</div>
	);
};
