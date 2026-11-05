import { NextResponse } from "next/server";
import type { IRequestParams } from "@/common/interfaces";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";
import { categorySchema } from "@/features/categories/schema";
import { categoryContainer } from "../categories.container";

export const listCategories = async (request: Request) => {
	try {
		const data = await categoryContainer.listCategory.execute();

		if (!data) return NextResponse.json({ message: locations.errors.notFound });
		return NextResponse.json({ data: data });
	} catch (error) {
		logger({ error: error as Error, module: "listCategories", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const createCategory = async (request: Request) => {
	try {
		const bodyData = await request.json();
		const validation = categorySchema.safeParse(bodyData);

		if (!validation.success) {
			return NextResponse.json({
				status: 400,
				message: locations.errors.invalidData,
			});
		}

		const status = await categoryContainer.createCategory.execute(
			validation.data.name,
		);

		return NextResponse.json({
			response: status
				? locations.messages.created
				: locations.messages.notCreated,
		});
	} catch (error) {
		logger({ error: error as Error, module: "createCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
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

		if (!validation.success) {
			return NextResponse.json({
				status: 400,
				message: locations.errors.invalidData,
			});
		}

		const data = {
			id: Number(id),
			name: validation.data.name,
			slug: validation.data.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
		};

		const status = await categoryContainer.updateCategory.execute(data);

		if (!status)
			return NextResponse.json({ message: locations.errors.notFound });
		return NextResponse.json({ message: locations.messages.updated });
	} catch (error) {
		logger({ error: error as Error, module: "updateCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const getCategoryById = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await categoryContainer.getCategoryById.execute(Number(id));
		if (!data) return NextResponse.json({ message: locations.errors.notFound });
		return NextResponse.json({ data: data });
	} catch (error) {
		logger({ error: error as Error, module: "getCategoryById", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const deleteCategory = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const status = await categoryContainer.deleteCategory.execute(Number(id));
		if (!status)
			return NextResponse.json({ message: locations.errors.notFound });
		return NextResponse.json({ message: locations.messages.deleted });
	} catch (error) {
		logger({ error: error as Error, module: "deleteCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};
