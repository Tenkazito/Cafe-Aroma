import { randomBytes, scryptSync } from "node:crypto";

/**
 * Hashea una contraseña con scrypt (incluido en Node, sin dependencias).
 * Formato: "scrypt$<salt>$<hash>". El login tendrá que verificar con el mismo formato.
 */
export const hashPassword = (password: string): string => {
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(password, salt, 64).toString("hex");
	return `scrypt$${salt}$${hash}`;
};
