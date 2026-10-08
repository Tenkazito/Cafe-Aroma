"use client";

import { Button } from "@heroui/react";
import { type FormEvent, type ReactNode, useId } from "react";
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
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
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
	size = "md",
	children,
}: FormModalProps) => {
	// El botón de enviar vive en el pie, fuera del <form>; el atributo `form` los enlaza
	const formId = useId();

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
					<Button type="submit" form={formId}>
						{submitLabel}
					</Button>
				</>
			}
		>
			<form id={formId} onSubmit={onSubmit} className="flex flex-col gap-4">
				{children}
			</form>
		</AppModal>
	);
};
