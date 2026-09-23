import { Badge } from "@/common/components/ui/Badge";
import { USER_ROLES } from "@/features/users/lib/userRoles";
import type { UserRole } from "@/features/users/types";

type RoleBadgeProps = {
	userRole: UserRole;
};

export const RoleBadge = ({ userRole }: RoleBadgeProps) => {
	const { label, tone } = USER_ROLES[userRole];
	return <Badge tone={tone}>{label}</Badge>;
};
