interface RankBadgeProps {
	rank: number;
	className?: string;
}

export const RankBadge = ({ rank, className = "" }: RankBadgeProps) => {
	let bgClass = "bg-gray-100 text-gray-600";

	if (rank === 1) bgClass = "bg-lemon/40 text-yellow-700";
	else if (rank === 2) bgClass = "bg-gray-200 text-gray-700";
	else if (rank === 3) bgClass = "bg-orange-100 text-orange-700";

	return (
		<div
			className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${bgClass} ${className}`}
		>
			{rank}
		</div>
	);
};
