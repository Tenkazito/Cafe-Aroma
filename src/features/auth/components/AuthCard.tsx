import type { ReactNode } from "react";
import { BrandLogo } from "@/common/components/layout/BrandLogo";

type AuthCardProps = {
	/**
	 * `admin`: logo grande centrado sobre fondo mint claro.
	 * `client`: logo en línea sobre fondo mint.
	 */
	variant: "admin" | "client";
	subtitle: string;
	title: string;
	description: string;
	/** Texto pequeño debajo de la tarjeta (ej. copyright). */
	footnote?: string;
	children: ReactNode;
};

/** Pantalla de login: fondo, marca y tarjeta blanca con el formulario dentro. */
export const AuthCard = ({
	variant,
	subtitle,
	title,
	description,
	footnote,
	children,
}: AuthCardProps) => {
	const isAdmin = variant === "admin";

	return (
		<div
			className={`flex min-h-screen items-center justify-center p-4 ${isAdmin ? "bg-surface-admin" : "bg-surface-client"}`}
		>
			<div className="flex w-full max-w-md flex-col items-center gap-6">
				<div className="flex flex-col items-center gap-2 text-center">
					{isAdmin ? (
						<>
							<BrandLogo size="lg" iconOnly />
							<p className="text-2xl font-bold text-navy">Café Aroma</p>
						</>
					) : (
						<BrandLogo />
					)}
					<p className="text-sm text-gray-500">{subtitle}</p>
				</div>

				<div className="w-full rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
					<h1 className="text-xl font-bold text-navy">{title}</h1>
					<p className="mb-6 text-sm text-gray-500">{description}</p>
					{children}
				</div>

				{footnote && <p className="text-xs text-gray-400">{footnote}</p>}
			</div>
		</div>
	);
};
