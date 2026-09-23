import { UserAvatar } from "@/common/components/ui/UserAvatar";
import type { SessionUser } from "@/common/types/navigation";

type UserBadgeProps = {
	user: SessionUser;
};

/** Avatar + nombre + rol del usuario con sesión, en la esquina de los layouts. */
export const UserBadge = ({ user }: UserBadgeProps) => {
	return (
		<div className="flex items-center gap-3">
			<UserAvatar name={user.name} imageUrl={user.avatarUrl} size="sm" />
			<div className="hidden flex-col leading-tight md:flex">
				<span className="text-sm font-semibold text-navy">{user.name}</span>
				<span className="text-xs text-gray-400">{user.role}</span>
			</div>
		</div>
	);
};
