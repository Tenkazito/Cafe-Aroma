"use client";

import { toast } from "@heroui/react";
import { CategoriesManager } from "@/features/categories/components/CategoriesManager";
import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { CategoryFormModal } from "@/features/categories/components/CategoryFormModal";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

export const CategoriesShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("categories")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="CategoriesTable"
					description="Tabla de categorías con estado y acciones."
					path="src/features/categories/components/CategoriesTable.tsx"
				>
					<CategoriesTable
						categories={MOCK_CATEGORIES}
						onEdit={(category) => toast.info(`Editar ${category.name}`)}
						onDelete={(category) => toast.info(`Eliminar ${category.name}`)}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="CategoryFormModal"
					description="Modal para crear o editar una categoría (nombre y estado)."
					path="src/features/categories/components/CategoryFormModal.tsx"
				>
					<div className="flex gap-3">
						<ModalPreview
							label="Nueva categoría"
							renderModal={(isOpen, onOpenChange) => (
								<CategoryFormModal
									isOpen={isOpen}
									onOpenChange={onOpenChange}
								/>
							)}
						/>
						<ModalPreview
							label="Editar categoría"
							renderModal={(isOpen, onOpenChange) => (
								<CategoryFormModal
									isOpen={isOpen}
									onOpenChange={onOpenChange}
									category={MOCK_CATEGORIES[4]}
								/>
							)}
						/>
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="CategoriesManager"
					description="Pantalla completa de /admin/categorias."
					path="src/features/categories/components/CategoriesManager.tsx"
				>
					<CategoriesManager categories={MOCK_CATEGORIES} />
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="filterCategories(categories, search)"
					description="Devuelve las categorías cuyo nombre contiene el texto."
					path="src/features/categories/lib/filterCategories.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
