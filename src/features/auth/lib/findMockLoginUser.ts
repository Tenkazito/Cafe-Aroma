import { MOCK_USERS } from "@/features/users/mocks/users";
import type { User } from "@/features/users/types";

type MockLoginResult =
	| { status: "success"; user: User }
	| { status: "invalidCredentials" }
	| { status: "inactive" };

/**
 * Simula el login buscando el correo en los usuarios de ejemplo.
 * TODO: reemplazar por el Server Action de login, que además debe comparar la
 * contraseña con el hash guardado en `usuarios.contrasena` (los mocks no tienen contraseña).
 */
export const findMockLoginUser = (email: string): MockLoginResult => {
	const normalizedEmail = email.toLowerCase();
	const user = MOCK_USERS.find(
		(mockUser) => mockUser.email.toLowerCase() === normalizedEmail,
	);

	if (!user) return { status: "invalidCredentials" };
	if (!user.isActive) return { status: "inactive" };
	return { status: "success", user };
};
