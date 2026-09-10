import { Avatar, Card } from "@heroui/react";
import { Trophy } from "lucide-react";
import { RankBadge } from "@/common/components/RankBadge";

export interface TopProduct {
	id: string;
	image: string;
	name: string;
	category: string;
	sold: number;
	stock: number;
	isLowStock?: boolean;
	price: string;
}

interface TopProductsWidgetProps {
	products: TopProduct[];
}

export const TopProductsWidget = ({ products }: TopProductsWidgetProps) => {
	return (
		<Card className="shadow-sm border border-gray-100 rounded-2xl w-full bg-white">
			<div className="p-6">
				<div className="flex items-center gap-2 mb-6">
					<Trophy className="text-orange-400" size={24} />
					<h2 className="text-xl font-bold text-navy">
						Productos más vendidos
					</h2>
				</div>

				<div className="overflow-x-auto">
					<table className="w-full min-w-150 text-left">
						<thead>
							<tr className="text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100">
								<th className="pb-4 font-medium">Producto</th>
								<th className="pb-4 font-medium">Nombre</th>
								<th className="pb-4 font-medium text-center">Vendidos</th>
								<th className="pb-4 font-medium text-center">Stock</th>
								<th className="pb-4 font-medium text-right">Precio</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-gray-50">
							{products.map((product, index) => (
								<tr
									key={product.id}
									className="hover:bg-gray-50/50 transition-colors group"
								>
									<td className="py-3">
										<div className="flex items-center gap-3">
											<RankBadge rank={index + 1} />
											<Avatar
												size="md"
												className="bg-gray-100 rounded-md"
											>
												<Avatar.Image src={product.image} />
											</Avatar>
										</div>
									</td>
									<td className="py-3">
										<div className="flex flex-col">
											<span className="font-semibold text-sm text-foreground">
												{product.name}
											</span>
											<span className="text-xs text-gray-400">
												{product.category}
											</span>
										</div>
									</td>
									<td className="py-3 text-center text-sm font-semibold text-foreground">
										{product.sold}
									</td>
									<td className="py-3 text-center text-sm font-semibold">
										<span
											className={
												product.isLowStock
													? "text-orange-500"
													: "text-foreground"
											}
										>
											{product.stock}
										</span>
									</td>
									<td className="py-3 text-right text-sm font-semibold text-foreground">
										{product.price}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</Card>
	);
};
