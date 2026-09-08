import RenderIcon from "@/common/components/RenderIcon";

interface ITitleProps {
	title: string;
	icon?: string;
}

export default function Title({ title, icon }: ITitleProps) {
	return (
		<h3 className="text-2xl font-bold flex items-center gap-2">
			{icon && <RenderIcon icon={icon} />}
			{title}
		</h3>
	);
}
