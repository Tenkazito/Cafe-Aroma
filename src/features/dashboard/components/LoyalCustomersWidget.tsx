import { Avatar, Card, Chip } from "@heroui/react";
import { RankBadge } from "@/common/components/RankBadge";
import RenderIcon from "@/common/components/RenderIcon";

export interface LoyalCustomer {
	id: string;
	avatar: string;
	name: string;
	orders: number;
	score: number;
}

interface LoyalCustomersWidgetProps {
	customers: LoyalCustomer[];
}

export const LoyalCustomersWidget = ({
	customers,
}: LoyalCustomersWidgetProps) => {
	return (
		<Card className="shadow-sm border border-gray-100 rounded-2xl w-full h-full bg-white">
			<Card.Content className="p-6">
				<div className="flex items-center gap-2 mb-6">
					<RenderIcon icon="trophy" className="text-teal" size={24} />
					<h2 className="text-xl font-bold text-navy">Clientes fieles</h2>
				</div>

				<div className="flex flex-col gap-5 mt-2">
					{customers.map((customer, index) => (
						<div
							key={customer.id}
							className="flex items-center justify-between group"
						>
							<div className="flex items-center gap-4">
								<RankBadge rank={index + 1} />
								<Avatar size="md" className="shrink-0">
									<Avatar.Image src={customer.avatar} />
									<Avatar.Fallback>
										{customer.name
											.split(" ")
											.map((n) => n[0])
											.join("")}
									</Avatar.Fallback>
								</Avatar>
								<div className="flex flex-col">
									<span className="font-semibold text-sm text-foreground">
										{customer.name}
									</span>
									<span className="text-xs text-gray-400">
										{customer.orders} pedidos en total
									</span>
								</div>
							</div>
							<Chip
								size="sm"
								className="bg-mint/40 text-teal font-bold text-sm px-3"
							>
								{customer.score}
							</Chip>
						</div>
					))}
				</div>
			</Card.Content>
		</Card>
	);
};
