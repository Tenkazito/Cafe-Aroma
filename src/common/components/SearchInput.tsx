import RenderIcon from "@/common/components/RenderIcon";

interface ISearchInputProps {
	placeholder?: string;
	value: string;
	onChange: (value: string) => void;
}

export default function SearchInput({
	placeholder = "Buscar...",
	value,
	onChange,
}: ISearchInputProps) {
	return (
		<div className="relative w-full">
			<span className="absolute left-3 top-1/2 -translate-y-1/2 text-default-400">
				<RenderIcon icon="search" />
			</span>
			<input
				type="text"
				value={value}
				onChange={(event) => onChange(event.target.value)}
				placeholder={placeholder}
				className="w-full pl-9 pr-3 py-2 rounded-xl border border-default-200 text-sm outline-none focus:border-default-400"
			/>
		</div>
	);
}
