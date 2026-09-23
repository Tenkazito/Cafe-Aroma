"use client";

import { Button } from "@heroui/react";
import { type ReactNode, useState } from "react";

type ModalPreviewProps = {
	/** Texto del botón que abre el modal. */
	label: string;
	/** Recibe el estado del modal y devuelve el modal a mostrar. */
	renderModal: (
		isOpen: boolean,
		onOpenChange: (isOpen: boolean) => void,
	) => ReactNode;
};

/** Botón para abrir un modal real dentro de /dev (los modales no se pueden mostrar "en línea"). */
export const ModalPreview = ({ label, renderModal }: ModalPreviewProps) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<Button variant="outline" onPress={() => setIsOpen(true)}>
				{label}
			</Button>
			{renderModal(isOpen, setIsOpen)}
		</>
	);
};
