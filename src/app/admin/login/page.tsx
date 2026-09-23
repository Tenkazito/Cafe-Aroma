import type { Metadata } from "next";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = { title: "Administración · Café Aroma" };

const AdminLoginPage = () => {
	return (
		<AuthCard
			variant="admin"
			subtitle="Sistema de Pedidos Online"
			title="Iniciar Sesión"
			description="Ingresa tus credenciales para continuar"
			footnote="© 2026 Café Aroma · Todos los derechos reservados"
		>
			<LoginForm
				identifier="email"
				submitLabel="Ingresar"
				redirectTo="/admin"
			/>
		</AuthCard>
	);
};

export default AdminLoginPage;
