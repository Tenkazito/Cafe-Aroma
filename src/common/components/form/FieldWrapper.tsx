import type { ReactNode } from "react";

type FieldWrapperProps = {
	label: string;
	/** id del control, para que al hacer clic en el label se enfoque el campo. */
	htmlFor: string;
	errorMessage?: string;
	className?: string;
	children: ReactNode;
};

/** Label + control + mensaje de error: la estructura común de todos los campos. */
export const FieldWrapper = ({
	label,
	htmlFor,
	errorMessage,
	className = "",
	children,
}: FieldWrapperProps) => {
	return (
		<div className={`flex flex-col gap-1.5 ${className}`}>
			<label htmlFor={htmlFor} className="text-sm font-medium text-navy">
				{label}
			</label>
			{children}
			{errorMessage && (
				<p role="alert" className="text-xs text-red-500">
					{errorMessage}
				</p>
			)}
		</div>
	);
};
