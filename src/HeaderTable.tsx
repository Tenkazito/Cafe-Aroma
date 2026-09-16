import { ReactNode } from "react";
import Title from "@/common/components/Title";

interface IPageHeaderProps {
	title: string;
	description?: string;
	icon?: string;
	action?: ReactNode;
}

export default function Header({
	title,
	description,
	icon,
	action,
}: IPageHeaderProps) {
	return (
		<div className="flex items-center justify-between">
			<div>
				<Title title={title} icon={icon} />
				{description && (
					<p className="text-default-400 text-sm mt-1">{description}</p>
				)}
			</div>
			{action}
		</div>
	);
}
