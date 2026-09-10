import { Chip } from "@heroui/react";

interface RankBadgeProps {
	rank: number;
	className?: string;
}

export const RankBadge = ({ rank, className = "" }: RankBadgeProps) => {
	let colorClasses = "bg-gray-100 text-gray-600";

	if (rank === 1) colorClasses = "bg-lemon/40 text-yellow-700";
	else if (rank === 2) colorClasses = "bg-gray-200 text-gray-700";
	else if (rank === 3) colorClasses = "bg-orange-100 text-orange-700";

	return (
		<Chip
			size="sm"
			className={`h-6 w-6 min-w-6 rounded-full text-xs font-bold justify-center ${colorClasses} ${className}`}
		>
			{rank}
		</Chip>
	);
};
