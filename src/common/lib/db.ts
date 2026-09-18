import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../../../prisma/contract.d";
import contractJson from "../../../prisma/contract.json" with { type: "json" };
import { databaseUrl } from "./env";

export const db = postgres<Contract>({
	contractJson,
	url: databaseUrl(),
});
