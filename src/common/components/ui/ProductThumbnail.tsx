import Image from "next/image";

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
