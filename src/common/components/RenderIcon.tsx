import { ArrowUp, Trophy } from "lucide-react";

interface IIconsProps {
	icon: string;
}

export default function RenderIcon({ icon }: IIconsProps) {
	// Añadir el icon de Lucide-React para cada icono a usar.
	switch (icon) {
		case "trophy":
			return <Trophy />;
		case "arrowUp":
			return <ArrowUp />;
		default:
			return null;
	}
}
