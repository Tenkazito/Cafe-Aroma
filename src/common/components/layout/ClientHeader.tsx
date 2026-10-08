import type { ReactNode } from "react";
import { BrandLogo } from "@/common/components/layout/BrandLogo";
import { UserBadge } from "@/common/components/layout/UserBadge";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";
import type { SessionUser } from "@/common/types/navigation";

type ClientHeaderProps = {
	user: SessionUser;
	/** Elementos antes del usuario (ej. la campana de notificaciones). */
	actions?: ReactNode;
	onMenuClick: () => void;
};

/** Barra superior de las pantallas del cliente. */
export const ClientHeader = ({
	user,
	actions,
	onMenuClick,
}: ClientHeaderProps) => {
	return (
		<header className="flex h-16 items-center justify-between gap-4 border-b border-navy/10 px-4 sm:px-8">
			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={onMenuClick}
					aria-label={locations.navigation.openMenu}
					className="rounded-lg p-2 text-navy hover:bg-white/50 md:hidden"
				>
					<Icon name="menu" />
				</button>
				<BrandLogo />
			</div>
			<div className="flex items-center gap-3">
				{actions}
				<UserBadge user={user} />
			</div>
		</header>
	);
};
