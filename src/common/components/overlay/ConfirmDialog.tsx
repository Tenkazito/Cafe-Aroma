"use client";

import { Button } from "@heroui/react";
import type { ReactNode } from "react";
import { AppModal } from "@/common/components/overlay/AppModal";

type ConfirmDialogProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	title: string;
	/** Texto de la pregunta. Puede traer negritas o colores (ReactNode). */
	message: ReactNode;
	confirmLabel: string;
	/** `danger` pinta el botón en rojo (eliminar, rechazar). */
	tone?: "primary" | "danger";
	onConfirm: () => void;
};

/** Confirmación de una acción: "¿Estás seguro...?" con Cancelar y el botón de confirmar. */
export const ConfirmDialog = ({
	isOpen,
	onOpenChange,
	title,
	message,
	confirmLabel,
	tone = "primary",
	onConfirm,
}: ConfirmDialogProps) => {
	const handleConfirm = () => {
		onConfirm();
		onOpenChange(false);
	};

	return (
		<AppModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={title}
			size="sm"
			footer={
				<>
					<Button variant="outline" onPress={() => onOpenChange(false)}>
						Cancelar
					</Button>
					<Button
						variant={tone === "danger" ? "danger" : "primary"}
						onPress={handleConfirm}
					>
						{confirmLabel}
					</Button>
				</>
			}
		>
			<p className="text-base leading-relaxed text-gray-500">{message}</p>
		</AppModal>
	);
};
