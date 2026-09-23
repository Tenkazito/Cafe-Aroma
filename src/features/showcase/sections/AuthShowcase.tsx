"use client";

import Link from "next/link";
import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

export const AuthShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("auth")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="LoginForm"
					description="Formulario de inicio de sesión configurable. Por ahora no valida: muestra un toast y redirige. Aquí se conectará React Hook Form + Zod."
					path="src/features/auth/components/LoginForm.tsx"
					background="white"
					props={[
						{
							name: "identifier",
							description: '"email" (admin) | "username" (cliente)',
						},
						{
							name: "redirectTo",
							description: "Ruta a la que va después de enviar",
						},
						{ name: "fieldVariant", description: '"default" | "soft"' },
						{ name: "footer", description: "Contenido bajo el botón" },
					]}
				>
					<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
						<LoginForm
							identifier="email"
							submitLabel="Ingresar"
							redirectTo="/dev/auth"
						/>
						<LoginForm
							identifier="username"
							submitLabel="Iniciar Sesión"
							showSubmitIcon
							fieldVariant="soft"
							redirectTo="/dev/auth"
							footer={
								<p className="text-center text-sm text-gray-500">
									¿No tienes cuenta?{" "}
									<Link href="#" className="font-semibold text-teal-strong">
										Regístrate
									</Link>
								</p>
							}
						/>
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="AuthCard"
					description="Fondo + marca + tarjeta blanca de las pantallas de login. Ocupa toda la pantalla; aquí se ve recortada."
					path="src/features/auth/components/AuthCard.tsx"
					props={[
						{
							name: "variant",
							description: '"admin" (logo grande) | "client" (logo en línea)',
						},
					]}
				>
					<div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
						{(["admin", "client"] as const).map((variant) => (
							<div
								key={variant}
								className="h-[520px] overflow-hidden rounded-xl border border-gray-200"
							>
								<AuthCard
									variant={variant}
									subtitle="Subtítulo"
									title="Iniciar Sesión"
									description="Ingresa tus credenciales para continuar"
								>
									<p className="text-sm text-gray-400">(formulario)</p>
								</AuthCard>
							</div>
						))}
					</div>
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Datos de ejemplo">
				<ComponentPreview
					kind="code"
					name="MOCK_ADMIN_USER / MOCK_CUSTOMER_USER"
					description="Usuario 'con sesión' que muestran los layouts mientras no exista login real."
					path="src/features/auth/mocks/currentUser.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
