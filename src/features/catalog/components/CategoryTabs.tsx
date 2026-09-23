import { Icon, type IconName } from "@/common/components/ui/Icon";
import { getCategoryIcon } from "@/features/catalog/lib/categoryIcons";
import { ALL_CATEGORIES } from "@/features/catalog/lib/filterCatalog";
import type { CatalogCategoryFilter } from "@/features/catalog/types";

type CategoryTabsProps = {
	categories: string[];
	selected: CatalogCategoryFilter;
	onSelect: (category: CatalogCategoryFilter) => void;
};

type TabOption = {
	value: CatalogCategoryFilter;
	label: string;
	icon: IconName;
};

/** Pastillas para filtrar el catálogo por categoría ("Todos" + cada categoría). */
export const CategoryTabs = ({
	categories,
	selected,
	onSelect,
}: CategoryTabsProps) => {
	const options: TabOption[] = [
		{ value: ALL_CATEGORIES, label: "Todos", icon: "coffee" },
		...categories.map((category) => ({
			value: category,
			label: category,
			icon: getCategoryIcon(category),
		})),
	];

	return (
		<div
			role="toolbar"
			aria-label="Categorías"
			className="flex flex-wrap gap-2"
		>
			{options.map((option) => {
				const isSelected = option.value === selected;

				return (
					<button
						key={option.value}
						type="button"
						aria-pressed={isSelected}
						onClick={() => onSelect(option.value)}
						className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
							isSelected
								? "border-teal bg-teal text-navy"
								: "border-white bg-white text-gray-500 hover:text-navy"
						}`}
					>
						<Icon name={option.icon} size={14} />
						{option.label}
					</button>
				);
			})}
		</div>
	);
};
