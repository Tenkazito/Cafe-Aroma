type RankBadgeProps = {
	rank: number;
};

const PODIUM_STYLES: Record<number, string> = {
	1: "bg-lemon/60 text-amber-800",
	2: "bg-gray-200 text-gray-700",
	3: "bg-orange-100 text-orange-700",
};

/** Número de posición en un ranking; los 3 primeros tienen color de podio. */
export const RankBadge = ({ rank }: RankBadgeProps) => {
	const colorClasses = PODIUM_STYLES[rank] ?? "bg-gray-100 text-gray-500";

	return (
		<span
			className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${colorClasses}`}
		>
			{rank}
		</span>
	);
};
