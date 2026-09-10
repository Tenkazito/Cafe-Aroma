import { ReactNode } from "react";
import RenderIcon from "@/common/components/RenderIcon";

interface INavItem {
	label: string;
	icon?: string;
	active?: boolean;
	badge?: number;
	onClick?: () => void;
}

interface ISidebarProps {
	items: INavItem[];
	footer?: ReactNode;
}

export default function Sidebar({ items, footer }: ISidebarProps) {
	return (
		<aside className="w-56 h-full flex flex-col justify-between bg-white border-r border-default-100 p-4">
			<div className="flex flex-col gap-1">
				<div className="mb-4">
				</div>
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
						{typeof item.badge === "number" && item.badge > 0 && (
							<span className="ml-auto bg-success-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
								{item.badge}
							</span>
						)}
					</button>
				))}
			</div>
			{footer}
		</aside>
	);
}
