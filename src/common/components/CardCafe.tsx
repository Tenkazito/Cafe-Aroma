import { Card } from "@heroui/react";
import RenderIcon from "@/common/components/RenderIcon";

interface ICardCafeProps {
	value: number;
	icon: string;
	description: string;
	backgroundColor?: string;
}

export default function CardCafe({
	value,
	icon,
	description,
	backgroundColor,
}: ICardCafeProps) {
	return (
		<Card className={`w-100 ${backgroundColor}`}>
			{icon && <RenderIcon icon={icon} />}
			<Card.Header>
				<Card.Title>{value}</Card.Title>
				{description && <Card.Description>{description}</Card.Description>}
			</Card.Header>
		</Card>
	);
}
