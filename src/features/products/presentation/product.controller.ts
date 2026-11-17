import { NextResponse } from "next/server";
import type { IRequestParams } from "@/common/interfaces";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";
import { productSchema } from "@/features/products/schema";
import { productContainer } from "../products.container";

const internalError = () =>
	NextResponse.json({ message: locations.errors.internal }, { status: 500 });

const invalidData = () =>
	NextResponse.json({ message: locations.errors.invalidData }, { status: 400 });

const notFound = () =>
	NextResponse.json({ message: locations.errors.notFound }, { status: 404 });

/**
 * Lee el `multipart/form-data` del formulario y lo valida con `productSchema`.
 * La imagen (si viene) se entrega como `File`; el caso de uso la sube a Vercel Blob.
 */
const parseProductBody = async (request: Request) => {
	const formData = await request.formData();
	const image = formData.get("image");

	// FormData solo trae texto o archivos: se convierten los números y el booleano
	const validation = productSchema.safeParse({
		categoryId: Number(formData.get("categoryId")),
		name: formData.get("name"),
		description: formData.get("description"),
		price: Number(formData.get("price")),
		stock: Number(formData.get("stock")),
		isActive: formData.get("isActive") === "true",
		image: image instanceof File && image.size > 0 ? image : undefined,
	});
	if (!validation.success) return null;

	return validation.data;
};

export const listProduct = async (request: Request) => {
	try {
		const data = await productContainer.listProduct.execute();

		if (!data) return notFound();
		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "listProduct", request });
		return internalError();
	}
};

export const createProduct = async (request: Request) => {
	try {
		const data = await parseProductBody(request);
		if (!data) return invalidData();

		const status = await productContainer.createProduct.execute(data);

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
		logger({ error: error as Error, module: "createProduct", request });
		return internalError();
	}
};

export const updateProduct = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await parseProductBody(request);
		if (!data) return invalidData();

		const status = await productContainer.updateProduct.execute({
			id: Number(id),
			...data,
		});

		if (!status) return notFound();
		return NextResponse.json({ message: locations.messages.updated });
	} catch (error) {
		logger({ error: error as Error, module: "updateProduct", request });
		return internalError();
	}
};

export const getProductById = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await productContainer.getProductById.execute(Number(id));

		if (!data) return notFound();
		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "getProductById", request });
		return internalError();
	}
};

export const deleteProduct = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const status = await productContainer.deleteProduct.execute(Number(id));

		if (!status) return notFound();
		return NextResponse.json({ message: locations.messages.deleted });
	} catch (error) {
		logger({ error: error as Error, module: "deleteProduct", request });
		return internalError();
	}
};
