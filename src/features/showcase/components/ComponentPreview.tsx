import type { ReactNode } from "react";

export type PropDoc = {
	name: string;
	description: string;
};

type ComponentPreviewProps = {
	/** Nombre del componente tal como se importa. */
	name: string;
	/** Qué hace y cuándo usarlo. */
	description: string;
	/** Ruta del archivo desde la raíz del proyecto. */
	path: string;
	/** Props más importantes (no hace falta listarlas todas). */
	props?: PropDoc[];
	/**
	 * Fondo del área de vista previa: `admin`/`client` imitan el fondo de cada
	 * zona para ver el componente en su contexto real.
	 */
	background?: "white" | "admin" | "client";
	/** `code` para hooks y funciones: el nombre se muestra sin `< />`. */
	kind?: "component" | "code";
	/** Render en vivo. Si se omite, la tarjeta solo documenta (útil para hooks). */
	children?: ReactNode;
};

const BACKGROUNDS = {
	white: "bg-white",
	admin: "bg-surface-admin",
	client: "bg-surface-client",
};

/** Ficha de un componente en /dev: descripción, archivo, props y vista previa. */
export const ComponentPreview = ({
	name,
	description,
	path,
	props = [],
	background = "admin",
	kind = "component",
	children,
}: ComponentPreviewProps) => {
	return (
		<article className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
			<header
				className={`flex flex-col gap-1 p-5 ${children ? "border-b border-gray-100" : ""}`}
			>
				<h3 className="font-mono text-base font-bold text-navy">
					{kind === "component" ? `<${name} />` : name}
				</h3>
				<p className="text-sm text-gray-600">{description}</p>
				<code className="w-fit rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
					{path}
				</code>
				{props.length > 0 && (
					<dl className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1 text-xs sm:grid-cols-[auto_1fr]">
						{props.map((prop) => (
							<div key={prop.name} className="contents">
								<dt className="font-mono font-semibold text-teal-strong">
									{prop.name}
								</dt>
								<dd className="text-gray-500">{prop.description}</dd>
							</div>
						))}
					</dl>
				)}
			</header>
			{children && (
				<div className={`overflow-x-auto p-5 ${BACKGROUNDS[background]}`}>
					{children}
				</div>
			)}
		</article>
	);
};
