"use client";

import type { ReactNode } from "react";
import { SWRConfig } from "swr";
import { MOCK_CATEGORIES } from "@/features/categories/mocks/categories";
import type { Product as ProductEntity } from "@/features/products/domain/product.entity";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";
import { MOCK_USERS } from "@/features/users/mocks/users";

// Los mocks del front tienen `categoryName`; la API devuelve la entidad del dominio
const MOCK_PRODUCT_ENTITIES: ProductEntity[] = MOCK_PRODUCTS.map((product) => ({
	id: product.id,
	name: product.name,
	slug: "",
	description: product.description,
	categoryId: product.categoryId,
	createdAt: "",
	price: product.price,
	stock: product.stock,
	isActive: product.isActive,
	imageUrl: product.imageUrl,
}));

// Las claves son las mismas URLs que usan los Managers en `useSWR`
const MOCK_RESPONSES = {
	"/api/categories": { data: MOCK_CATEGORIES },
	"/api/products": { data: MOCK_PRODUCT_ENTITIES },
	"/api/users": { data: MOCK_USERS },
};

/**
 * En /dev, los Managers leen los mocks en vez de la API: SWR usa `fallback`
 * como datos y, con `revalidateOnMount: false`, no hace la petición al montar.
 */
export const MockApiProvider = ({ children }: { children: ReactNode }) => (
	<SWRConfig
		value={{
			fallback: MOCK_RESPONSES,
			revalidateOnMount: false,
			revalidateIfStale: false,
		}}
	>
		{children}
	</SWRConfig>
);
