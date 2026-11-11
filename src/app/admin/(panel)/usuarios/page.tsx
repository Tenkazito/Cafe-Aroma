import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { UsersManager } from "@/features/users/components/UsersManager";

export const metadata: Metadata = { title: locations.pageTitles.adminUsers };

const UsersPage = () => {
	return <UsersManager />;
};

export default UsersPage;
