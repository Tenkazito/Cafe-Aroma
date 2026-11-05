import { NextResponse } from "next/server";
import { locations } from "@/common/locations";
import { logger } from "@/common/utils/logger";

export const listProduct = async (request: Request) => {
    try {
        return NextResponse.json({ data: [] });
    } catch (error) {
        logger({ error: error as Error, module: "listProduct", request });
        return NextResponse.json({
            status: 500,
            message: locations.errors.internal,
        });
    }
};

export const createProduct = async (request: Request) => {
    try {
        return NextResponse.json({ success: true });
    } catch (error) {
        logger({ error: error as Error, module: "createProduct", request });
        return NextResponse.json({
            status: 500,
            message: locations.errors.internal,
        });
    }
};

export const updateProduct = async (request: Request) => {
    try {
        return NextResponse.json({ success: true });
    } catch (error) {
        logger({ error: error as Error, module: "updateProduct", request });
        return NextResponse.json({
            status: 500,
            message: locations.errors.internal,
        });
    }
};

export const getProductById = async (request: Request) => {
    try {
        return NextResponse.json({ data: [] });
    } catch (error) {
        logger({ error: error as Error, module: "getProductById", request });
        return NextResponse.json({
            status: 500,
            message: locations.errors.internal,
        });
    }
};

export const deleteProduct = async (request: Request) => {
    try {
        return NextResponse.json({ data: [] });
    } catch (error) {
        logger({ error: error as Error, module: "deleteProduct", request });
        return NextResponse.json({
            status: 500,
            message: locations.errors.internal,
        });
    }
};
