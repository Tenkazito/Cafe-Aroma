import RenderIcon from "@/common/components/RenderIcon";

interface IUserMenuProps {
	name: string;
	role: string;
	icon?: string;
	onLogout?: () => void;
}

export default function UserMenu({
	name,
	role,
	icon = "user",
	onLogout,
}: IUserMenuProps) {
	return (
		<div className="flex items-center gap-3">
			<span className="w-8 h-8 rounded-full bg-default-100 text-default-600 flex items-center justify-center">
				<RenderIcon icon={icon} />
			</span>
			<div className="text-sm leading-tight">
				<p className="font-medium">{name}</p>
				<p className="text-xs text-default-400">{role}</p>
			</div>
			{onLogout && (
				<button
					type="button"
					onClick={onLogout}
					className="text-xs text-default-400 hover:text-default-600 ml-2"
				>
					Salir
				</button>
			)}
		</div>
	);
}
