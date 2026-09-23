import { RankBadge } from "@/common/components/ui/RankBadge";
import { SectionCard } from "@/common/components/ui/SectionCard";
import { UserAvatar } from "@/common/components/ui/UserAvatar";
import type { LoyalCustomer } from "@/features/dashboard/types";

type LoyalCustomersWidgetProps = {
	/** Clientes ya ordenados de más a menos pedidos. */
	customers: LoyalCustomer[];
};

export const LoyalCustomersWidget = ({
	customers,
}: LoyalCustomersWidgetProps) => {
	return (
		<SectionCard title="Clientes fieles" icon="trophy" className="h-full">
			<ol className="flex flex-col gap-4">
				{customers.map((customer, index) => (
					<li
						key={customer.id}
						className="flex items-center justify-between gap-3"
					>
						<div className="flex items-center gap-3">
							<RankBadge rank={index + 1} />
							<UserAvatar
								name={customer.name}
								imageUrl={customer.avatarUrl}
								size="sm"
							/>
							<div className="flex flex-col">
								<span className="text-sm font-semibold text-navy">
									{customer.name}
								</span>
								<span className="text-xs text-gray-400">
									{customer.orderCount} pedidos en total
								</span>
							</div>
						</div>
						<span className="rounded-full bg-mint/60 px-2.5 py-0.5 text-xs font-bold text-teal-strong">
							{customer.orderCount}
						</span>
					</li>
				))}
			</ol>
		</SectionCard>
	);
};
