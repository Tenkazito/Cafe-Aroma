"use client";

import { Modal } from "@heroui/react";
import type { ReactNode } from "react";

export type AppModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	title: string;
	/** Ancho del modal. `md` para formularios, `sm` para confirmaciones, `lg` para detalles. */
	size?: "xs" | "sm" | "md" | "lg";
	/** Botones del pie (fondo gris). Si se omite, el modal no tiene pie. */
	footer?: ReactNode;
	children: ReactNode;
};

/**
 * Estructura común de todos los modales de las diapositivas:
 * título + X arriba, contenido, y pie gris con los botones alineados a la derecha.
 */
export const AppModal = ({
	isOpen,
	onOpenChange,
	title,
	size = "md",
	footer,
	children,
}: AppModalProps) => {
	return (
		<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
			<Modal.Backdrop>
				<Modal.Container size={size} scroll="outside">
					<Modal.Dialog className="overflow-hidden rounded-2xl p-0">
						<Modal.CloseTrigger aria-label="Cerrar" />
						<Modal.Header className="border-b border-gray-100 px-6 py-4">
							<Modal.Heading className="pr-8 text-lg font-bold text-navy">
								{title}
							</Modal.Heading>
						</Modal.Header>
						<Modal.Body className="m-0 px-6 py-5 text-navy">
							{children}
						</Modal.Body>
						{footer && (
							<Modal.Footer className="m-0 flex-wrap border-t border-gray-100 bg-gray-50 px-6 py-4">
								{footer}
							</Modal.Footer>
						)}
					</Modal.Dialog>
				</Modal.Container>
			</Modal.Backdrop>
		</Modal>
	);
};
