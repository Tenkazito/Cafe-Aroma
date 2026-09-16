import { Card } from "@heroui/react";
import { ReactNode } from "react";
import Title from "@/common/components/Title";

interface ISectionPanelProps {
	title: string;
	icon?: string;
	action?: ReactNode;
	children: ReactNode;
}

export default function SectionPanel({
	title,
	icon,
	action,
	children,
}: ISectionPanelProps) {
	return (
		<Card className="p-5 w-full">
			<div className="flex items-center justify-between mb-4">
				<Title title={title} icon={icon} />
				{action}
			</div>
			{children}
		</Card>
	);
}