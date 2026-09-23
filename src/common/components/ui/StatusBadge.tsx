import { Badge } from "@/common/components/ui/Badge";

type StatusBadgeProps = {
	isActive: boolean;
};

/** Estado Activo / Inactivo que comparten usuarios, categorías y productos. */
export const StatusBadge = ({ isActive }: StatusBadgeProps) => {
	return (
		<Badge tone={isActive ? "success" : "neutral"} withDot>
			{isActive ? "Activo" : "Inactivo"}
		</Badge>
	);
};
