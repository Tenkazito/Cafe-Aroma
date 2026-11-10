import { NextResponse } from "next/server";
import type { IRequestParams } from "@/common/interfaces";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";
import { categorySchema } from "@/features/categories/schema";
import { categoryContainer } from "../categories.container";

// El código HTTP va en el 2º argumento: así `apiFetch` detecta el error (`response.ok`)
const internalError = () =>
	NextResponse.json({ message: locations.errors.internal }, { status: 500 });

const invalidData = () =>
	NextResponse.json({ message: locations.errors.invalidData }, { status: 400 });

const notFound = () =>
	NextResponse.json({ message: locations.errors.notFound }, { status: 404 });

export const listCategories = async (request: Request) => {
	try {
		const data = await categoryContainer.listCategory.execute();

		if (!data) return notFound();
		return NextResponse.json({ data: data });
	} catch (error) {
		logger({ error: error as Error, module: "listCategories", request });
		return internalError();
	}
};

export const createCategory = async (request: Request) => {
	try {
		const bodyData = await request.json();
		const validation = categorySchema.safeParse(bodyData);

		if (!validation.success) return invalidData();

		const status = await categoryContainer.createCategory.execute(
			validation.data.name,
		);

		if (!status) {
			return NextResponse.json(
				{ message: locations.messages.notCreated },
				{ status: 500 },
			);
		}
		return NextResponse.json(
			{ message: locations.messages.created },
			{ status: 201 },
		);
	} catch (error) {
		logger({ error: error as Error, module: "createCategory", request });
		return internalError();
	}
};

export const updateCategory = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const bodyData = await request.json();
		const validation = categorySchema.safeParse(bodyData);

		if (!validation.success) return invalidData();

		// La `url` la genera el caso de uso a partir del nombre
		const data = {
			id: Number(id),
			name: validation.data.name,
			isActive: validation.data.isActive,
		};

		const status = await categoryContainer.updateCategory.execute(data);

		if (!status) return notFound();
		return NextResponse.json({ message: locations.messages.updated });
	} catch (error) {
		logger({ error: error as Error, module: "updateCategory", request });
		return internalError();
	}
};

export const getCategoryById = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await categoryContainer.getCategoryById.execute(Number(id));
		if (!data) return notFound();
		return NextResponse.json({ data: data });
	} catch (error) {
		logger({ error: error as Error, module: "getCategoryById", request });
		return internalError();
	}
};

export const deleteCategory = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const status = await categoryContainer.deleteCategory.execute(Number(id));
		if (!status) return notFound();
		return NextResponse.json({ message: locations.messages.deleted });
	} catch (error) {
		logger({ error: error as Error, module: "deleteCategory", request });
		return internalError();
	}
};
