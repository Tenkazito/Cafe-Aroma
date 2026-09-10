import { Card, ProgressBar } from "@heroui/react";

interface DailyGoalCardProps {
	title: string;
	percentage: number;
	current: number;
	target: number;
}

export const DailyGoalCard = ({
	title,
	percentage,
	current,
	target,
}: DailyGoalCardProps) => {
	return (
		<Card className="bg-navy text-white shadow-none border-none rounded-2xl h-full">
			<Card.Content className="p-6 flex flex-col justify-between">
				<div className="flex justify-between items-center mb-4">
					<p className="text-sm text-gray-300 font-medium">{title}</p>
					<span className="text-sm font-bold text-white">{percentage}%</span>
				</div>

				<div>
					<div className="flex items-baseline gap-1 mb-3">
						<span className="text-4xl font-bold text-white">{current}</span>
						<span className="text-sm text-gray-400 font-medium">
							/ {target}
						</span>
					</div>
					<ProgressBar
						size="sm"
						value={percentage}
						className="max-w-md track indicator: bg-lemon"
					/>
				</div>
			</Card.Content>
		</Card>
	);
};
