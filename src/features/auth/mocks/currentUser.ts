import type { SessionUser } from "@/common/types/navigation";

/** Usuario con sesión en el panel de administración (mientras no exista login real). */
export const MOCK_ADMIN_USER: SessionUser = {
	name: "María González",
	role: "Administrador",
	avatarUrl: "https://i.pravatar.cc/150?u=maria.gonzalez",
};

/** Cliente con sesión en las pantallas de pedidos. Sin foto: se muestran las iniciales. */
export const MOCK_CUSTOMER_USER: SessionUser = {
	name: "María Anderson",
	role: "Cliente",
};
