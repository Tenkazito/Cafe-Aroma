import { ArrowUp, Trophy, User } from "lucide-react";

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
		case "user":
			return <User />;
		default:
			return null;
	}
}
