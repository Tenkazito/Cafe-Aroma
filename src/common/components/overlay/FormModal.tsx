"use client";

import { Button } from "@heroui/react";
import { type FormEvent, type ReactNode, useId, useRef } from "react";
import { AppModal } from "@/common/components/overlay/AppModal";
import { locations } from "@/common/locations";

type FormModalProps = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	title: string;
	/** Texto del botón principal (ej. "Crear Usuario", "Guardar Cambios"). */
	submitLabel: string;
	/**
	 * Se llama al enviar el formulario. Recibe el evento tal cual para que luego
	 * se pueda pasar `handleSubmit(onValid)` de React Hook Form directamente.
	 */
	onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
	/** Mientras sea `true`, el botón muestra que está cargando. */
	isSubmitting?: boolean;
	size?: "sm" | "md" | "lg";
	children: ReactNode;
};

/** Modal con formulario: los campos van en `children` y el pie trae Cancelar + botón principal. */
export const FormModal = ({
	isOpen,
	onOpenChange,
	title,
	submitLabel,
	onSubmit,
	isSubmitting = false,
	size = "md",
	children,
}: FormModalProps) => {
	// El botón de enviar vive en el pie, fuera del <form>; el atributo `form` los enlaza
	const formId = useId();

	// Candado contra doble envío. Es un ref y no estado porque el estado (`isSubmitting`)
	// solo cambia en el siguiente render: un doble clic llega antes y lo vería en `false`
	const isSendingRef = useRef(false);

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		// `!isOpen`: el modal ya se cerró pero sigue visible durante la animación de salida
		if (isSendingRef.current || !isOpen) {
			event.preventDefault();
			return;
		}

		isSendingRef.current = true;
		try {
			// Con `handleSubmit(onValid)` de React Hook Form esto espera validación y envío
			await onSubmit(event);
		} finally {
			isSendingRef.current = false;
		}
	};

	return (
		<AppModal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			title={title}
			size={size}
			footer={
				<>
					<Button variant="outline" onPress={() => onOpenChange(false)}>
						{locations.actions.cancel}
					</Button>
					<Button type="submit" form={formId} isPending={isSubmitting}>
						{submitLabel}
					</Button>
				</>
			}
		>
			<form id={formId} onSubmit={handleSubmit} className="flex flex-col gap-4">
				{children}
			</form>
		</AppModal>
	);
};
