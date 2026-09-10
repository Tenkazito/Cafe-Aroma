"use client";

import { Avatar, Button } from "@heroui/react";
import {
	ClipboardList,
	Coffee,
	Grid,
	Home,
	LogOut,
	Package,
	Receipt,
	Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
	{ name: "Inicio", href: "/dashboard", icon: Home },
	{ name: "Usuarios", href: "/dashboard/usuarios", icon: Users },
	{ name: "Categorías", href: "/dashboard/categorias", icon: Grid },
	{ name: "Productos", href: "/dashboard/productos", icon: Package },
	{ name: "Pedidos", href: "/dashboard/pedidos", icon: ClipboardList },
	{ name: "Facturación", href: "/dashboard/facturacion", icon: Receipt },
];

export const TopNavbar = () => {
	const pathname = usePathname();

	return (
		<nav className="w-full bg-background shadow-sm border-b border-gray-100">
			<div className="flex items-center justify-between px-6 h-16 max-w-full">
				{/* Brand */}
				<div className="flex items-center gap-2">
					<div className="flex h-8 w-8 items-center justify-center rounded-md bg-navy text-white">
						<Coffee size={18} />
					</div>
					<p className="font-bold text-navy text-xl">Café Aroma</p>
				</div>

				{/* Nav links */}
				<ul className="hidden sm:flex items-center gap-1">
					{NAV_LINKS.map((link) => {
						const isActive = pathname === link.href;
						const Icon = link.icon;
						return (
							<li key={link.href}>
								<Link
									href={link.href}
									className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-colors text-sm font-medium ${
										isActive
											? "bg-navy text-white"
											: "text-gray-500 hover:text-navy hover:bg-gray-50"
									}`}
								>
									<Icon size={16} />
									{link.name}
								</Link>
							</li>
						);
					})}
				</ul>

				{/* Right side */}
				<div className="flex items-center gap-3">
					<div className="flex items-center gap-3">
						<Avatar size="sm" className="ring-2 ring-gray-200 rounded-full">
							<Avatar.Image
								src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
								alt="María González"
							/>
							<Avatar.Fallback>MG</Avatar.Fallback>
						</Avatar>
						<div className="hidden md:flex flex-col text-sm">
							<span className="font-semibold text-foreground">
								María González
							</span>
							<span className="text-xs text-gray-400">Administrador</span>
						</div>
					</div>
					<div className="w-px h-8 bg-gray-200 mx-2 hidden md:block"></div>
					<Button
						variant="ghost"
						className="text-red-500 font-medium hidden md:flex"
						onPress={() => {
							// lógica de logout aquí
						}}
					>
						<LogOut size={16} />
						Salir
					</Button>
				</div>
			</div>
		</nav>
	);
};
