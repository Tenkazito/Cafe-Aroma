"use client";

import { Button, toast } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { FormEvent, ReactNode } from "react";
import { FormCheckbox } from "@/common/components/form/FormCheckbox";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormTextField } from "@/common/components/form/FormTextField";
import type { FieldVariant } from "@/common/components/form/fieldStyles";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type LoginFormProps = {
	/** `email` para el admin, `username` para el cliente. */
	identifier: "email" | "username";
	submitLabel: string;
	/** Muestra la taza de café dentro del botón (diseño del cliente). */
	showSubmitIcon?: boolean;
	/** A dónde ir después de "iniciar sesión" (por ahora no se valida nada). */
	redirectTo: string;
	fieldVariant?: FieldVariant;
	/** Contenido bajo el botón (ej. "¿No tienes cuenta? Regístrate"). */
	footer?: ReactNode;
};

const IDENTIFIER_FIELDS = {
	email: {
		name: "email",
		label: locations.form.email,
		type: "email",
		placeholder: locations.form.emailPlaceholder,
		icon: "mail",
	},
	username: {
		name: "username",
		label: locations.auth.customer.usernameLabel,
		type: "text",
		placeholder: locations.auth.customer.usernamePlaceholder,
		icon: "user",
	},
} as const;

export const LoginForm = ({
	identifier,
	submitLabel,
	showSubmitIcon = false,
	redirectTo,
	fieldVariant = "default",
	footer,
}: LoginFormProps) => {
	const router = useRouter();
	const identifierField = IDENTIFIER_FIELDS[identifier];

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// TODO: conectar React Hook Form + Zod y el Server Action de inicio de sesión
		toast.success(locations.toasts.loginDone);
		router.push(redirectTo);
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-4">
			<FormTextField
				label={identifierField.label}
				name={identifierField.name}
				type={identifierField.type}
				placeholder={identifierField.placeholder}
				icon={identifierField.icon}
				variant={fieldVariant}
				autoComplete={identifier}
			/>
			<FormPasswordField
				label={locations.form.password}
				name="password"
				variant={fieldVariant}
				withLockIcon
				autoComplete="current-password"
			/>

			<div className="flex flex-wrap items-center justify-between gap-2">
				<FormCheckbox label={locations.auth.rememberMe} name="rememberMe" />
				<Link
					href="#"
					className="text-sm font-medium text-teal-strong hover:underline"
				>
					{locations.auth.forgotPassword}
				</Link>
			</div>

			<Button type="submit" fullWidth size="lg" className="mt-2">
				{showSubmitIcon && <Icon name="coffee" size={18} />}
				{submitLabel}
			</Button>

			{footer}
		</form>
	);
};
