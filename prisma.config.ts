import "dotenv/config";
import { definePrismaConfig } from "@prisma/cli-engine";
import { defineConfig as ormConfig } from "@prisma/orm-postgres/config";
import { databaseUrl } from "./src/common/lib/env";

export default definePrismaConfig({
	// Solo Claude Code: evita que `prisma skills sync` duplique las skills
	// en .agents/, .cursor/ y .devin/ (por defecto escribe en todos).
	skills: { agents: ["claude"] },
	orm: ormConfig({
		contract: "./prisma/contract.prisma",
		db: {
			connection: databaseUrl(),
		},
	}),
});
