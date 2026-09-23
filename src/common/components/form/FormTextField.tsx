import { type InputHTMLAttributes, useId } from "react";
import { FieldWrapper } from "@/common/components/form/FieldWrapper";
import {
	type FieldVariant,
	getFieldClasses,
} from "@/common/components/form/fieldStyles";
import { Icon, type IconName } from "@/common/components/ui/Icon";

export type FormTextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	label: string;
	/** Icono a la izquierda dentro del campo (ej. sobre para el correo). */
	icon?: IconName;
	/** Mensaje de validación. Pensado para recibir `errors.campo?.message` de React Hook Form. */
	errorMessage?: string;
	variant?: FieldVariant;
};

/**
 * Campo de texto con label. Acepta todos los atributos de un <input>, así que
 * más adelante se puede conectar con `{...register("email")}` sin cambiarlo.
 */
export const FormTextField = ({
	label,
	icon,
	errorMessage,
	variant = "default",
	id,
	className = "",
	...inputProps
}: FormTextFieldProps) => {
	const generatedId = useId();
	const inputId = id ?? generatedId;

	return (
		<FieldWrapper
			label={label}
			htmlFor={inputId}
			errorMessage={errorMessage}
			className={className}
		>
			<div className="relative">
				{icon && (
					<Icon
						name={icon}
						size={18}
						className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
					/>
				)}
				<input
					id={inputId}
					aria-invalid={Boolean(errorMessage)}
					className={`h-11 ${getFieldClasses(variant, Boolean(errorMessage))} ${icon ? "pl-10" : ""}`}
					{...inputProps}
				/>
			</div>
		</FieldWrapper>
	);
};
