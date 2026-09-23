import type { InputHTMLAttributes } from "react";

type FormCheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	label: string;
};

/** Casilla con texto (ej. "Recordarme"). Es un checkbox nativo para usarlo con `register`. */
export const FormCheckbox = ({
	label,
	className = "",
	...inputProps
}: FormCheckboxProps) => {
	return (
		<label
			className={`inline-flex cursor-pointer items-center gap-2 text-sm text-gray-500 ${className}`}
		>
			<input
				type="checkbox"
				className="h-4 w-4 cursor-pointer rounded border-gray-300 accent-navy"
				{...inputProps}
			/>
			{label}
		</label>
	);
};
