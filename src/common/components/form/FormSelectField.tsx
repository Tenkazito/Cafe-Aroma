import { type SelectHTMLAttributes, useId } from "react";
import { FieldWrapper } from "@/common/components/form/FieldWrapper";
import {
	type FieldVariant,
	getFieldClasses,
} from "@/common/components/form/fieldStyles";

export type SelectOption = {
	value: string;
	label: string;
};

type FormSelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
	label: string;
	options: SelectOption[];
	errorMessage?: string;
	/** Primera opción vacía (ej. "Selecciona una categoría"); no se puede volver a elegir. */
	placeholder?: string;
	variant?: FieldVariant;
};

/**
 * Lista desplegable con label. Es un <select> nativo a propósito: funciona
 * directo con `{...register("rol")}` de React Hook Form.
 */
export const FormSelectField = ({
	label,
	options,
	errorMessage,
	placeholder,
	variant = "default",
	id,
	className = "",
	...selectProps
}: FormSelectFieldProps) => {
	const generatedId = useId();
	const selectId = id ?? generatedId;

	return (
		<FieldWrapper
			label={label}
			htmlFor={selectId}
			errorMessage={errorMessage}
			className={className}
		>
			<select
				id={selectId}
				aria-invalid={Boolean(errorMessage)}
				className={`h-11 cursor-pointer ${getFieldClasses(variant, Boolean(errorMessage))}`}
				{...selectProps}
			>
				{placeholder && (
					<option value="" disabled>
						{placeholder}
					</option>
				)}
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
		</FieldWrapper>
	);
};
