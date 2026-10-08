import type { ReactNode } from "react";
import { locations } from "@/common/locations";

export type DataTableColumn<T> = {
	/** Identificador único de la columna (se usa como key de React). */
	key: string;
	header: string;
	cell: (row: T) => ReactNode;
	align?: "left" | "center" | "right";
	className?: string;
};

type DataTableProps<T> = {
	columns: DataTableColumn<T>[];
	rows: T[];
	getRowKey: (row: T) => string | number;
	/** Texto cuando no hay filas (ej. la búsqueda no encontró nada). */
	emptyMessage?: string;
	/**
	 * `card`: la tabla va en su propia tarjeta blanca (listados de admin).
	 * `plain`: sin tarjeta, para meterla dentro de otra (widgets, factura).
	 */
	variant?: "card" | "plain";
	ariaLabel: string;
};

const ALIGN_CLASSES = {
	left: "text-left",
	center: "text-center",
	right: "text-right",
};

export const DataTable = <T,>({
	columns,
	rows,
	getRowKey,
	emptyMessage = locations.emptyStates.noRecords,
	variant = "card",
	ariaLabel,
}: DataTableProps<T>) => {
	const wrapperClasses =
		variant === "card"
			? "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
			: "overflow-hidden rounded-xl border border-gray-100";

	return (
		<div className={wrapperClasses}>
			{/* overflow-x-auto para que en móvil la tabla se desplace en vez de romper el layout */}
			<div className="overflow-x-auto">
				<table className="w-full min-w-max text-sm" aria-label={ariaLabel}>
					<thead className="bg-gray-50/80">
						<tr>
							{columns.map((column) => (
								<th
									key={column.key}
									scope="col"
									className={`px-5 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase ${ALIGN_CLASSES[column.align ?? "left"]}`}
								>
									{column.header}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rows.length === 0 && (
							<tr>
								<td
									colSpan={columns.length}
									className="px-5 py-10 text-center text-gray-400"
								>
									{emptyMessage}
								</td>
							</tr>
						)}
						{rows.map((row) => (
							<tr
								key={getRowKey(row)}
								className="border-t border-gray-100 transition-colors hover:bg-gray-50/60"
							>
								{columns.map((column) => (
									<td
										key={column.key}
										className={`px-5 py-4 text-gray-700 ${ALIGN_CLASSES[column.align ?? "left"]} ${column.className ?? ""}`}
									>
										{column.cell(row)}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};
