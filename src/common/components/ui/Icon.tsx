import {
	ArrowRight,
	BadgeDollarSign,
	Bell,
	Cake,
	Calendar,
	Check,
	ChevronRight,
	CircleCheck,
	CircleX,
	ClipboardList,
	Clock,
	Coffee,
	Component,
	Croissant,
	CupSoda,
	Eye,
	EyeOff,
	FileText,
	Funnel,
	House,
	LayoutGrid,
	Lock,
	LogOut,
	Mail,
	MapPin,
	Menu,
	Minus,
	Package,
	Palette,
	Pencil,
	PiggyBank,
	Plus,
	Printer,
	Receipt,
	RotateCcw,
	Search,
	ShoppingBag,
	Star,
	Trash,
	TrendingUp,
	Trophy,
	Upload,
	User,
	Users,
	Wallet,
	X,
} from "lucide-react";

/**
 * Catálogo de iconos de la app. Los iconos se piden por nombre (string) y no
 * pasando el componente de Lucide, porque un string se puede enviar desde un
 * Server Component a un Client Component y una función no.
 */
const ICONS = {
	arrowRight: ArrowRight,
	bell: Bell,
	cake: Cake,
	calendar: Calendar,
	check: Check,
	checkCircle: CircleCheck,
	chevronRight: ChevronRight,
	clipboardList: ClipboardList,
	clock: Clock,
	coffee: Coffee,
	component: Component,
	croissant: Croissant,
	cupSoda: CupSoda,
	dollar: BadgeDollarSign,
	eye: Eye,
	eyeOff: EyeOff,
	fileText: FileText,
	filter: Funnel,
	grid: LayoutGrid,
	home: House,
	lock: Lock,
	logOut: LogOut,
	mail: Mail,
	mapPin: MapPin,
	menu: Menu,
	minus: Minus,
	package: Package,
	palette: Palette,
	pencil: Pencil,
	piggyBank: PiggyBank,
	plus: Plus,
	printer: Printer,
	receipt: Receipt,
	rotateCcw: RotateCcw,
	search: Search,
	shoppingBag: ShoppingBag,
	star: Star,
	trash: Trash,
	trendingUp: TrendingUp,
	trophy: Trophy,
	upload: Upload,
	user: User,
	users: Users,
	wallet: Wallet,
	x: X,
	xCircle: CircleX,
} as const;

export type IconName = keyof typeof ICONS;

/** Lista de todos los nombres disponibles (la usa la ruta /dev para mostrarlos). */
export const ICON_NAMES = Object.keys(ICONS) as IconName[];

type IconProps = {
	name: IconName;
	/** Tamaño en píxeles. Por defecto 20. */
	size?: number;
	className?: string;
};

export const Icon = ({ name, size = 20, className }: IconProps) => {
	const LucideIcon = ICONS[name];

	// aria-hidden porque los iconos siempre acompañan un texto o un aria-label del botón
	return <LucideIcon size={size} className={className} aria-hidden="true" />;
};
