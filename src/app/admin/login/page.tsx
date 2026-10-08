import type { Metadata } from "next";
import { locations } from "@/common/locations";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = { title: locations.pageTitles.adminLogin };

const AdminLoginPage = () => {
	return (
		<AuthCard
			variant="admin"
			subtitle={locations.brand.systemName}
			title={locations.auth.admin.title}
			description={locations.auth.admin.description}
			footnote={locations.brand.copyright}
		>
			<LoginForm
				identifier="email"
				submitLabel={locations.auth.admin.submit}
				redirectTo="/admin"
			/>
		</AuthCard>
	);
};

export default AdminLoginPage;
