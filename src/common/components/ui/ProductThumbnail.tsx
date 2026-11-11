import Image from "next/image";
import { Icon } from "@/common/components/ui/Icon";

type ProductThumbnailProps = {
	name: string;
	imageUrl: string;
	/** Lado del cuadro en píxeles. */
	size?: number;
};

/** Miniatura cuadrada de producto que se usa en tablas y en el carrito. */
export const ProductThumbnail = ({
	name,
	imageUrl,
	size = 40,
}: ProductThumbnailProps) => {
	// La columna `imagen` es opcional: sin imagen se muestra un ícono en vez de una imagen rota
	if (!imageUrl) {
		return (
			<div
				role="img"
				aria-label={name}
				className="flex shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400"
				style={{ width: size, height: size }}
			>
				<Icon name="coffee" size={size / 2} />
			</div>
		);
	}

	return (
		<Image
			src={imageUrl}
			alt={name}
			width={size}
			height={size}
			className="shrink-0 rounded-lg bg-gray-100 object-cover"
			style={{ width: size, height: size }}
		/>
	);
};
