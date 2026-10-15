"use client";

import { Button, toast } from "@heroui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { FormCheckbox } from "@/common/components/form/FormCheckbox";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormTextField } from "@/common/components/form/FormTextField";
import type { FieldVariant } from "@/common/components/form/fieldStyles";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";
import { findMockLoginUser } from "@/features/auth/lib/findMockLoginUser";
import { getHomePathForRole } from "@/features/auth/lib/getHomePathForRole";
import { type LoginFormValues, loginSchema } from "@/features/auth/schema";

type LoginFormProps = {
	submitLabel: string;
	/** Muestra la taza de café dentro del botón (diseño del cliente). */
	showSubmitIcon?: boolean;
	fieldVariant?: FieldVariant;
	/** Contenido bajo el botón (ej. "¿No tienes cuenta? Regístrate"). */
	footer?: ReactNode;
};

/**
 * Login único: administradores y clientes entran por aquí, y el rol del
 * usuario decide a qué pantalla va (ver `getHomePathForRole`).
 */
export const LoginForm = ({
	submitLabel,
	showSubmitIcon = false,
	fieldVariant = "default",
	footer,
}: LoginFormProps) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: "", password: "", rememberMe: false },
	});

	const onSubmit = (values: LoginFormValues) => {
		console.log("Iniciar sesión", values);
		const result = findMockLoginUser(values.email);

		if (result.status === "invalidCredentials") {
			toast.danger(locations.auth.invalidCredentials);
			return;
		}
		if (result.status === "inactive") {
			toast.danger(locations.auth.inactiveAccount);
			return;
		}

		toast.success(locations.toasts.loginDone);
		router.push(getHomePathForRole(result.user.role));
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<FormTextField
				label={locations.form.email}
				type="email"
				placeholder={locations.form.emailPlaceholder}
				icon="mail"
				variant={fieldVariant}
				autoComplete="email"
				{...register("email")}
				errorMessage={errors.email?.message}
			/>
			<FormPasswordField
				label={locations.form.password}
				variant={fieldVariant}
				withLockIcon
				autoComplete="current-password"
				{...register("password")}
				errorMessage={errors.password?.message}
			/>

			<div className="flex flex-wrap items-center justify-between gap-2">
				<FormCheckbox
					label={locations.auth.rememberMe}
					{...register("rememberMe")}
				/>
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
