import { locations } from "@/common/locations";

type SkeletonTableProps = {
	/** Cantidad de columnas; conviene que coincida con la tabla real. */
	columns: number;
	/** Cantidad de filas de relleno. */
	rows?: number;
	/** Mismas variantes que `DataTable`, para que no salte el layout al cargar. */
	variant?: "card" | "plain";
};

// Anchos distintos por columna para que no se vea como una cuadrícula perfecta
const CELL_WIDTHS = ["w-10", "w-40", "w-20", "w-24", "w-32", "w-16"];

/**
 * Tabla falsa que parpadea mientras llegan los datos de la API.
 * Copia el contenedor y el espaciado de `DataTable` para que el cambio no salte.
 */
export const SkeletonTable = ({
	columns,
	rows = 5,
	variant = "card",
}: SkeletonTableProps) => {
	const wrapperClasses =
		variant === "card"
			? "overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm"
			: "overflow-hidden rounded-xl border border-gray-100";

	const columnIndexes = Array.from({ length: columns }, (_, index) => index);
	const rowIndexes = Array.from({ length: rows }, (_, index) => index);

	return (
		<div className={wrapperClasses} aria-busy="true">
			{/* Los lectores de pantalla oyen "Cargando..." en vez de cajas vacías */}
			<span className="sr-only" role="status">
				{locations.emptyStates.loading}
			</span>
			<div className="overflow-x-auto" aria-hidden="true">
				<table className="w-full min-w-max text-sm">
					<thead className="bg-gray-50/80">
						<tr>
							{columnIndexes.map((column) => (
								<th key={column} className="px-5 py-3">
									<div className="h-3 w-16 animate-pulse rounded bg-gray-200" />
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{rowIndexes.map((row) => (
							<tr key={row} className="border-t border-gray-100">
								{columnIndexes.map((column) => (
									<td key={column} className="px-5 py-4">
										<div
											className={`h-4 animate-pulse rounded bg-gray-100 ${CELL_WIDTHS[column % CELL_WIDTHS.length]}`}
										/>
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
