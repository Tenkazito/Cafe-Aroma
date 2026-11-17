import "dotenv/config";
import postgres from "@prisma/orm-postgres/runtime";
import type { Contract } from "../../../prisma/contract.d";
import contractJson from "../../../prisma/contract.json" with { type: "json" };
import { databaseUrl } from "./env";

export const db = postgres<Contract>({
	contractJson,
	url: databaseUrl(),
	// Neon suspende la base tras unos minutos sin uso; despertarla puede
	// tardar 15-20 s y el timeout por defecto del driver es de 20 s.
	poolOptions: { connectionTimeoutMillis: 60_000 },
});
