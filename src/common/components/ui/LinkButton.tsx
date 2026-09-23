import Link from "next/link";
import type { ComponentProps } from "react";

type LinkButtonProps = ComponentProps<typeof Link> & {
	/** `primary` = navy, `accent` = teal (llamadas a la acción del cliente). */
	variant?: "primary" | "accent";
	size?: "sm" | "md";
};

const VARIANT_CLASSES = {
	primary: "bg-navy text-white hover:bg-navy/90",
	accent: "bg-teal text-navy hover:bg-teal/85",
};

const SIZE_CLASSES = {
	sm: "h-8 px-3 text-xs",
	md: "h-11 px-5 text-sm",
};

/** Enlace de Next.js con apariencia de botón (para navegar, no para acciones). */
export const LinkButton = ({
	variant = "primary",
	size = "md",
	className = "",
	...linkProps
}: LinkButtonProps) => {
	return (
		<Link
			className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-colors ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
			{...linkProps}
		/>
	);
};
