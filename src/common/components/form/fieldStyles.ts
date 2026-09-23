/**
 * `default`: campo blanco con borde (panel admin).
 * `soft`: campo con fondo mint y sin borde visible (pantallas del cliente).
 */
export type FieldVariant = "default" | "soft";

const VARIANT_CLASSES: Record<FieldVariant, string> = {
	default: "bg-white border-gray-200",
	soft: "bg-surface-field border-transparent",
};

/** Clases compartidas por input, select y textarea para que todos se vean iguales. */
export const getFieldClasses = (
	variant: FieldVariant,
	hasError: boolean,
): string => {
	const borderClasses = hasError
		? "border-red-400 focus:border-red-500"
		: "focus:border-teal";

	return `w-full rounded-xl border px-3 text-sm text-navy outline-none transition-colors placeholder:text-gray-400 disabled:opacity-60 ${VARIANT_CLASSES[variant]} ${borderClasses}`;
};
