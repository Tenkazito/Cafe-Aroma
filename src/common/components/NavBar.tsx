import { ReactNode } from "react";
import RenderIcon from "@/common/components/RenderIcon";

interface INavItem {
	label: string;
	icon?: string;
	active?: boolean;
	onClick?: () => void;
}

interface INavBarProps {
	items: INavItem[];
	userSlot: ReactNode;
}

export default function NavBar({ items, userSlot }: INavBarProps) {
	return (
		<header className="flex items-center justify-between px-6 py-3 bg-white border-b border-default-100">
			<nav className="flex items-center gap-2">
				{items.map((item) => (
					<button
						key={item.label}
						type="button"
						onClick={item.onClick}
						className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
							item.active
								? "bg-neutral-900 text-white"
								: "text-default-500 hover:bg-default-100"
						}`}
					>
						{item.icon && <RenderIcon icon={item.icon} />}
						{item.label}
					</button>
				))}
			</nav>
			{userSlot}
		</header>
	);
}
