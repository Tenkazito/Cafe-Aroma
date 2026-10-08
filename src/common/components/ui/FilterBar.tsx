import type { ReactNode } from "react";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type FilterBarProps = {
	/** Título de la tarjeta. Pasa `null` para ocultarlo. */
	title?: string | null;
	/** Número de columnas en escritorio (en móvil siempre es 1). */
	columns?: 2 | 3 | 4;
	children: ReactNode;
};

// Clases escritas completas porque Tailwind no detecta clases armadas con variables
const GRID_COLUMNS = {
	2: "md:grid-cols-2",
	3: "md:grid-cols-3",
	4: "md:grid-cols-2 lg:grid-cols-4",
};

/** Tarjeta "Filtros de búsqueda" que acomoda los campos en una grilla. */
export const FilterBar = ({
	title = locations.form.filtersTitle,
	columns = 4,
	children,
}: FilterBarProps) => {
	return (
		<div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
			{title && (
				<p className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy">
					<Icon name="filter" size={16} className="text-gray-400" />
					{title}
				</p>
			)}
			<div className={`grid grid-cols-1 gap-3 ${GRID_COLUMNS[columns]}`}>
				{children}
			</div>
		</div>
	);
};
