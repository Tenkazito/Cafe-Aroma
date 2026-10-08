import { Badge } from "@/common/components/ui/Badge";
import { locations } from "@/common/locations";

type StatusBadgeProps = {
	isActive: boolean;
};

/** Estado Activo / Inactivo que comparten usuarios, categorías y productos. */
export const StatusBadge = ({ isActive }: StatusBadgeProps) => {
	return (
		<Badge tone={isActive ? "success" : "neutral"} withDot>
			{isActive ? locations.status.active : locations.status.inactive}
		</Badge>
	);
};
