import type { InputHTMLAttributes } from "react";
import { Icon } from "@/common/components/ui/Icon";

type SearchInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type"> & {
	/** `soft`: fondo mint, para las pantallas del cliente. */
	variant?: "default" | "soft";
};

/** Input de búsqueda con lupa. Acepta todos los atributos de un <input>. */
export const SearchInput = ({
	variant = "default",
	className = "",
	placeholder = "Buscar...",
	...inputProps
}: SearchInputProps) => {
	const variantClasses =
		variant === "soft"
			? "bg-surface-field border-transparent"
			: "bg-white border-gray-200";

	return (
		<div className={`relative w-full ${className}`}>
			<Icon
				name="search"
				size={18}
				className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
			/>
			<input
				type="search"
				placeholder={placeholder}
				className={`h-11 w-full rounded-xl border pr-3 pl-10 text-sm text-navy outline-none transition-colors placeholder:text-gray-400 focus:border-teal ${variantClasses}`}
				{...inputProps}
			/>
		</div>
	);
};
