import { ReactNode } from "react";

interface IFormProps {
	onSubmit: () => void;
	submitLabel?: string;
	children: ReactNode;
}

export default function Form({
	onSubmit,
	submitLabel = "Guardar",
	children,
}: IFormProps) {
	return (
		<form
			onSubmit={(event) => {
				event.preventDefault();
				onSubmit();
			}}
			className="flex flex-col gap-4"
		>
			{children}
			<button
				type="submit"
				className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-lg self-start"
			>
				{submitLabel}
			</button>
		</form>
	);
}
