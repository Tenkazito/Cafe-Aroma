import { ProgressBar } from "@heroui/react";
import type { DailyGoal } from "@/features/dashboard/types";

type DailyGoalCardProps = {
	goal: DailyGoal;
};

/** Tarjeta navy con el avance de pedidos entregados frente a la meta del día. */
export const DailyGoalCard = ({ goal }: DailyGoalCardProps) => {
	// Se limita a 100 para que la barra no se desborde si se supera la meta
	const percentage = Math.min(
		100,
		Math.round((goal.current / goal.target) * 100),
	);

	return (
		<div className="flex h-full min-h-32 flex-col justify-between rounded-2xl bg-navy p-5 text-white">
			<div className="flex items-center justify-between">
				<p className="text-sm text-gray-300">Meta del día</p>
				<span className="rounded-full bg-white/10 px-2 py-0.5 text-xs font-bold">
					{percentage}%
				</span>
			</div>
			<div>
				<p className="mb-3 flex items-baseline gap-1">
					<span className="text-3xl font-bold">{goal.current}</span>
					<span className="text-sm text-gray-400">/ {goal.target}</span>
				</p>
				<ProgressBar size="sm" value={percentage} aria-label="Meta del día">
					<ProgressBar.Track className="bg-white/15">
						<ProgressBar.Fill className="bg-lemon" />
					</ProgressBar.Track>
				</ProgressBar>
			</div>
		</div>
	);
};
