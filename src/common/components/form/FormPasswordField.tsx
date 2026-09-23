"use client";

import { type InputHTMLAttributes, useId, useState } from "react";
import { FieldWrapper } from "@/common/components/form/FieldWrapper";
import {
	type FieldVariant,
	getFieldClasses,
} from "@/common/components/form/fieldStyles";
import { Icon } from "@/common/components/ui/Icon";

type FormPasswordFieldProps = Omit<
	InputHTMLAttributes<HTMLInputElement>,
	"type"
> & {
	label: string;
	errorMessage?: string;
	variant?: FieldVariant;
	/** Muestra el candado a la izquierda (pantallas de login). */
	withLockIcon?: boolean;
};

/** Campo de contraseña con botón de ojo para mostrar u ocultar el texto. */
export const FormPasswordField = ({
	label,
	errorMessage,
	variant = "default",
	withLockIcon = false,
	id,
	className = "",
	placeholder = "••••••••",
	...inputProps
}: FormPasswordFieldProps) => {
	const [isVisible, setIsVisible] = useState(false);
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
				{withLockIcon && (
					<Icon
						name="lock"
						size={18}
						className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
					/>
				)}
				<input
					id={inputId}
					type={isVisible ? "text" : "password"}
					placeholder={placeholder}
					aria-invalid={Boolean(errorMessage)}
					className={`h-11 pr-10 ${getFieldClasses(variant, Boolean(errorMessage))} ${withLockIcon ? "pl-10" : ""}`}
					{...inputProps}
				/>
				<button
					type="button"
					onClick={() => setIsVisible((current) => !current)}
					aria-label={isVisible ? "Ocultar contraseña" : "Mostrar contraseña"}
					className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-navy"
				>
					<Icon name={isVisible ? "eyeOff" : "eye"} size={18} />
				</button>
			</div>
		</FieldWrapper>
	);
};
