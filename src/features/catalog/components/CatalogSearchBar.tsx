"use client";

import { Button } from "@heroui/react";
import { Icon } from "@/common/components/ui/Icon";
import { SearchInput } from "@/common/components/ui/SearchInput";

type CatalogSearchBarProps = {
	value: string;
	onChange: (value: string) => void;
};

/**
 * Buscador del catálogo. El filtro se aplica mientras se escribe; el botón
 * "Buscar" existe por el diseño y para quien prefiera confirmar con Enter o clic.
 */
export const CatalogSearchBar = ({
	value,
	onChange,
}: CatalogSearchBarProps) => {
	return (
		<search>
			<form onSubmit={(event) => event.preventDefault()} className="flex gap-2">
				<SearchInput
					aria-label="Buscar productos"
					placeholder="Buscar productos..."
					value={value}
					onChange={(event) => onChange(event.target.value)}
				/>
				<Button type="submit" className="h-11">
					<Icon name="search" size={16} />
					Buscar
				</Button>
			</form>
		</search>
	);
};
