import { NextResponse } from "next/server";
import type { IRequestParams } from "@/common/interfaces";
import { db } from "@/common/lib/db";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";
import { productSchema } from "@/features/products/schema";
import { productContainer } from "../products.container";

const findCategoryIdByName = async (categoryName: string) => {
	const matches = await db.orm.public.categorias
		.select("id")
		.where({ titulo: categoryName, activo: true })
		.all();

	// No elegir arbitrariamente si hay categorías activas con el mismo título.
	return matches.length === 1 ? matches[0].id : null;
};

export const listProduct = async (request: Request) => {
	try {
		const data = await productContainer.listProduct.execute();
		if (!data) {
			return NextResponse.json({ message: locations.errors.notFound });
		}

		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "listProduct", request });
		return NextResponse.json(
			{ message: locations.errors.internal },
			{ status: 500 },
		);
	}
};

export const createProduct = async (request: Request) => {
	try {
		const bodyData = await request.json();
		const validation = productSchema.safeParse(bodyData);

		if (!validation.success) {
			return NextResponse.json(
				{ message: locations.errors.invalidData },
				{ status: 400 },
			);
		}

		const categoryId = await findCategoryIdByName(validation.data.categoryName);
		if (categoryId === null) {
			return NextResponse.json(
				{ message: locations.errors.invalidData },
				{ status: 400 },
			);
		}

		const { categoryName: _categoryName, imageUrl: _imageUrl, ...data } =
			validation.data;
		const success = await productContainer.createProduct.execute({
			...data,
			categoryId,
		});

		return NextResponse.json({
			success,
			response: success
				? locations.messages.created
				: locations.messages.notCreated,
		});
	} catch (error) {
		logger({ error: error as Error, module: "createProduct", request });
		return NextResponse.json(
			{ message: locations.errors.internal },
			{ status: 500 },
		);
	}
};

export const updateProduct = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const bodyData = await request.json();
		const validation = productSchema.safeParse(bodyData);

		if (!validation.success) {
			return NextResponse.json(
				{ message: locations.errors.invalidData },
				{ status: 400 },
			);
		}

		const categoryId = await findCategoryIdByName(validation.data.categoryName);
		if (categoryId === null) {
			return NextResponse.json(
				{ message: locations.errors.invalidData },
				{ status: 400 },
			);
		}

		const { categoryName: _categoryName, imageUrl: _imageUrl, ...data } =
			validation.data;
		const success = await productContainer.updateProduct.execute({
			id: Number(id),
			...data,
			categoryId,
		});

		if (!success) {
			return NextResponse.json(
				{ message: locations.errors.notFound },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			message: locations.messages.updated,
		});
	} catch (error) {
		logger({ error: error as Error, module: "updateProduct", request });
		return NextResponse.json(
			{ message: locations.errors.internal },
			{ status: 500 },
		);
	}
};

export const getProductById = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await productContainer.getProductById.execute(Number(id));

		if (!data) {
			return NextResponse.json(
				{ message: locations.errors.notFound },
				{ status: 404 },
			);
		}

		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "getProductById", request });
		return NextResponse.json(
			{ message: locations.errors.internal },
			{ status: 500 },
		);
	}
};

export const deleteProduct = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const success = await productContainer.deleteProduct.execute(Number(id));

		if (!success) {
			return NextResponse.json(
				{ message: locations.errors.notFound },
				{ status: 404 },
			);
		}

		return NextResponse.json({
			success: true,
			message: locations.messages.deleted,
		});
	} catch (error) {
		logger({ error: error as Error, module: "deleteProduct", request });
		return NextResponse.json(
			{ message: locations.errors.internal },
			{ status: 500 },
		);
	}
};
