import { type TextareaHTMLAttributes, useId } from "react";
import { FieldWrapper } from "@/common/components/form/FieldWrapper";
import {
	type FieldVariant,
	getFieldClasses,
} from "@/common/components/form/fieldStyles";

type FormTextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	label: string;
	errorMessage?: string;
	variant?: FieldVariant;
};

/** Texto largo con label (ej. descripción del producto). */
export const FormTextAreaField = ({
	label,
	errorMessage,
	variant = "default",
	id,
	className = "",
	rows = 3,
	...textAreaProps
}: FormTextAreaFieldProps) => {
	const generatedId = useId();
	const textAreaId = id ?? generatedId;

	return (
		<FieldWrapper
			label={label}
			htmlFor={textAreaId}
			errorMessage={errorMessage}
			className={className}
		>
			<textarea
				id={textAreaId}
				rows={rows}
				aria-invalid={Boolean(errorMessage)}
				className={`resize-none py-2.5 ${getFieldClasses(variant, Boolean(errorMessage))}`}
				{...textAreaProps}
			/>
		</FieldWrapper>
	);
};
