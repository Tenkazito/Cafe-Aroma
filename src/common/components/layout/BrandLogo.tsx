import { Icon } from "@/common/components/ui/Icon";

type BrandLogoProps = {
	/** `sm` para barras de navegación, `lg` para las pantallas de login. */
	size?: "sm" | "lg";
	/** Oculta el texto "Café Aroma" y deja solo el icono. */
	iconOnly?: boolean;
};

const SIZE_STYLES = {
	sm: { box: "h-9 w-9 rounded-lg", icon: 20, text: "text-lg" },
	lg: { box: "h-16 w-16 rounded-2xl", icon: 32, text: "text-2xl" },
};

/** Taza de café sobre cuadro navy + nombre de la marca. */
export const BrandLogo = ({
	size = "sm",
	iconOnly = false,
}: BrandLogoProps) => {
	const styles = SIZE_STYLES[size];

	return (
		<div className="flex items-center gap-2">
			<div
				className={`flex shrink-0 items-center justify-center bg-navy text-teal ${styles.box}`}
			>
				<Icon name="coffee" size={styles.icon} />
			</div>
			{!iconOnly && (
				<span className={`font-bold text-navy ${styles.text}`}>Café Aroma</span>
			)}
		</div>
	);
};
