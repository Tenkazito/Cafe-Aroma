import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { UsersManager } from "@/features/users/components/UsersManager";
import { MOCK_USERS } from "@/features/users/mocks/users";

export const metadata: Metadata = { title: locations.pageTitles.adminUsers };

const UsersPage = () => {
	return <UsersManager users={MOCK_USERS} />;
};

export default UsersPage;
