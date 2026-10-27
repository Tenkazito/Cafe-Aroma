import { NextResponse } from "next/server";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";

export const listCategories = async (request: Request) => {
	try {
		return NextResponse.json({ data: [] });
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
		return NextResponse.json({ success: true });
	} catch (error) {
		logger({ error: error as Error, module: "createCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const updateCategory = async (request: Request) => {
	try {
		return NextResponse.json({ data: [] });
	} catch (error) {
		logger({ error: error as Error, module: "updateCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const getCategoryById = async (request: Request) => {
	try {
		return NextResponse.json({ data: [] });
	} catch (error) {
		logger({ error: error as Error, module: "getCategoryById", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};

export const deleteCategory = async (request: Request) => {
	try {
		return NextResponse.json({ data: [] });
	} catch (error) {
		logger({ error: error as Error, module: "deleteCategory", request });
		return NextResponse.json({
			status: 500,
			message: locations.errors.internal,
		});
	}
};
