import type { Metadata } from "next";
import Link from "next/link";
import { locations } from "@/common/locations";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = { title: locations.pageTitles.login };

const CustomerLoginPage = () => {
	return (
		<AuthCard
			variant="client"
			subtitle={locations.auth.customer.subtitle}
			title={locations.auth.customer.title}
			description={locations.auth.customer.description}
		>
			<LoginForm
				identifier="username"
				submitLabel={locations.auth.customer.submit}
				showSubmitIcon
				redirectTo="/inicio"
				fieldVariant="soft"
				footer={
					<p className="text-center text-sm text-gray-500">
						{locations.auth.customer.noAccount}{" "}
						{/* TODO: crear la pantalla /registro (no está en las diapositivas) */}
						<Link
							href="#"
							className="font-semibold text-teal-strong hover:underline"
						>
							{locations.auth.customer.register}
						</Link>
					</p>
				}
			/>
		</AuthCard>
	);
};

export default CustomerLoginPage;
