import { Avatar, Card, Table } from "@heroui/react";
import RenderIcon from "@/common/components/RenderIcon";
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

const columns = [
	{ id: "producto", name: "Producto" },
	{ id: "nombre", name: "Nombre" },
	{ id: "vendidos", name: "Vendidos" },
	{ id: "stock", name: "Stock" },
	{ id: "precio", name: "Precio" },
];

export const TopProductsWidget = ({ products }: TopProductsWidgetProps) => {
	return (
		<Card className="shadow-sm border border-gray-100 rounded-2xl w-full bg-white">
			<Card.Content className="p-6">
				<div className="flex items-center gap-2 mb-6">
					<RenderIcon
						icon="trophy"
						className="text-orange-400"
						size={24}
					/>
					<h2 className="text-xl font-bold text-navy">
						Productos más vendidos
					</h2>
				</div>

				<Table aria-label="Productos más vendidos">
					<Table.Content>
						<Table.Header>
							{columns.map((col) => (
								<Table.Column
									key={col.id}
									id={col.id}
									isRowHeader={col.id === "nombre"}
								>
									{col.name}
								</Table.Column>
							))}
						</Table.Header>
						<Table.Body>
							{products.map((product, index) => (
								<Table.Row key={product.id} id={product.id}>
									<Table.Cell>
										<div className="flex items-center gap-3">
											<RankBadge rank={index + 1} />
											<Avatar size="md" className="bg-gray-100 rounded-md">
												<Avatar.Image src={product.image} />
												<Avatar.Fallback>
													{product.name.charAt(0)}
												</Avatar.Fallback>
											</Avatar>
										</div>
									</Table.Cell>
									<Table.Cell>
										<div className="flex flex-col">
											<span className="font-semibold text-sm text-foreground">
												{product.name}
											</span>
											<span className="text-xs text-gray-400">
												{product.category}
											</span>
										</div>
									</Table.Cell>
									<Table.Cell className="text-center text-sm font-semibold text-foreground">
										{product.sold}
									</Table.Cell>
									<Table.Cell className="text-center text-sm font-semibold">
										<span
											className={
												product.isLowStock
													? "text-orange-500"
													: "text-foreground"
											}
										>
											{product.stock}
										</span>
									</Table.Cell>
									<Table.Cell className="text-right text-sm font-semibold text-foreground">
										{product.price}
									</Table.Cell>
								</Table.Row>
							))}
						</Table.Body>
					</Table.Content>
				</Table>
			</Card.Content>
		</Card>
	);
};
