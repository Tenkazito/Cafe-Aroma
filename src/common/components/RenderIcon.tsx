import {
	ArrowUp,
	Calendar,
	CheckCircle2,
	ChevronRight,
	ClipboardList,
	Clock,
	Coffee,
	Grid,
	Home,
	LogOut,
	MoveUpRight,
	Package,
	PiggyBank,
	Receipt,
	ShoppingBag,
	Trophy,
	Users,
	Wallet,
	XCircle,
} from "lucide-react";

interface IIconsProps {
	icon: string;
	/** Tamaño del icono en píxeles (por defecto varía según el icono de Lucide). */
	size?: number;
	/** Clases CSS para personalizar el icono (color, etc.). Ejemplo: className="text-red-500" */
	className?: string;
}

export default function RenderIcon({ icon, size, className }: IIconsProps) {
	const props = { size, className };

	// Añadir el icon de Lucide-React para cada icono a usar.
	switch (icon) {
		case "trophy":
			return <Trophy {...props} />;
		case "arrowUp":
			return <ArrowUp {...props} />;
		case "moveUpRight":
			return <MoveUpRight {...props} />;
		case "coffee":
			return <Coffee {...props} />;
		case "logOut":
			return <LogOut {...props} />;
		case "home":
			return <Home {...props} />;
		case "users":
			return <Users {...props} />;
		case "grid":
			return <Grid {...props} />;
		case "package":
			return <Package {...props} />;
		case "clipboardList":
			return <ClipboardList {...props} />;
		case "receipt":
			return <Receipt {...props} />;
		case "checkCircle2":
			return <CheckCircle2 {...props} />;
		case "clock":
			return <Clock {...props} />;
		case "xCircle":
			return <XCircle {...props} />;
		case "calendar":
			return <Calendar {...props} />;
		case "shoppingBag":
			return <ShoppingBag {...props} />;
		case "wallet":
			return <Wallet {...props} />;
		case "piggyBank":
			return <PiggyBank {...props} />;
		case "chevronRight":
			return <ChevronRight {...props} />;
		default:
			return null;
	}
}
