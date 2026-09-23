import type { Metadata } from "next";
import { UsersManager } from "@/features/users/components/UsersManager";
import { MOCK_USERS } from "@/features/users/mocks/users";

export const metadata: Metadata = { title: "Usuarios · Admin Café Aroma" };

const UsersPage = () => {
	return <UsersManager users={MOCK_USERS} />;
};

export default UsersPage;
