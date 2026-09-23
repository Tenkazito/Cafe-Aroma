import type { Metadata } from "next";
import Link from "next/link";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";

export const metadata: Metadata = { title: "Iniciar sesión · Café Aroma" };

const CustomerLoginPage = () => {
	return (
		<AuthCard
			variant="client"
			subtitle="Inicia sesión para realizar y seguir tus pedidos"
			title="Bienvenido"
			description="Ingresa tus datos para continuar"
		>
			<LoginForm
				identifier="username"
				submitLabel="Iniciar Sesión"
				showSubmitIcon
				redirectTo="/inicio"
				fieldVariant="soft"
				footer={
					<p className="text-center text-sm text-gray-500">
						¿No tienes cuenta?{" "}
						{/* TODO: crear la pantalla /registro (no está en las diapositivas) */}
						<Link
							href="#"
							className="font-semibold text-teal-strong hover:underline"
						>
							Regístrate
						</Link>
					</p>
				}
			/>
		</AuthCard>
	);
};

export default CustomerLoginPage;
