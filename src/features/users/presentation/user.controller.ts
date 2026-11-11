import { NextResponse } from "next/server";
import type { IRequestParams } from "@/common/interfaces";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";
import { userSchema } from "@/features/users/schema";
import { userContainer } from "../users.container";

const internalError = () =>
	NextResponse.json({ message: locations.errors.internal }, { status: 500 });

const invalidData = () =>
	NextResponse.json({ message: locations.errors.invalidData }, { status: 400 });

const notFound = () =>
	NextResponse.json({ message: locations.errors.notFound }, { status: 404 });

const emailTaken = () =>
	NextResponse.json(
		{ message: locations.errors.duplicateEmail },
		{ status: 409 },
	);

/** Valida el body; `confirmPassword` solo sirve para validar, no se guarda. */
const parseUserBody = async (request: Request, isEditing: boolean) => {
	const validation = userSchema(isEditing).safeParse(await request.json());
	if (!validation.success) return null;

	const { confirmPassword: _confirmPassword, ...data } = validation.data;
	return data;
};

export const listUsers = async (request: Request) => {
	try {
		const data = await userContainer.listUser.execute();

		if (!data) return notFound();
		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "listUsers", request });
		return internalError();
	}
};

export const createUser = async (request: Request) => {
	try {
		const data = await parseUserBody(request, false);
		if (!data) return invalidData();

		const result = await userContainer.createUser.execute(data);

		if (result === "emailTaken") return emailTaken();
		if (result === "failed") {
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
		logger({ error: error as Error, module: "createUser", request });
		return internalError();
	}
};

export const updateUser = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await parseUserBody(request, true);
		if (!data) return invalidData();

		const result = await userContainer.updateUser.execute({
			id: Number(id),
			...data,
		});

		if (result === "emailTaken") return emailTaken();
		if (result === "failed") return notFound();
		return NextResponse.json({ message: locations.messages.updated });
	} catch (error) {
		logger({ error: error as Error, module: "updateUser", request });
		return internalError();
	}
};

export const getUserById = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const data = await userContainer.getUserById.execute(Number(id));

		if (!data) return notFound();
		return NextResponse.json({ data });
	} catch (error) {
		logger({ error: error as Error, module: "getUserById", request });
		return internalError();
	}
};

export const deleteUser = async (
	request: Request,
	{ params }: IRequestParams,
) => {
	try {
		const { id } = await params;
		const status = await userContainer.deleteUser.execute(Number(id));

		if (!status) return notFound();
		return NextResponse.json({ message: locations.messages.deleted });
	} catch (error) {
		logger({ error: error as Error, module: "deleteUser", request });
		return internalError();
	}
};
