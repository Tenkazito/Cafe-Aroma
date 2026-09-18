import { ReactNode } from "react";

interface IFilterField {
	label: string;
	control: ReactNode;
}

interface IFilterBarProps {
	fields: IFilterField[];
}

export default function FilterBar({ fields }: IFilterBarProps) {
	return (
		<div className="flex items-end gap-4 bg-white rounded-2xl p-4 border border-default-100">
			{fields.map((field) => (
				<div key={field.label} className="flex flex-col gap-1 flex-1">
					<span className="text-xs text-default-400">{field.label}</span>
					{field.control}
				</div>
			))}
		</div>
	);
}
