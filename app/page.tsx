"use client";
import {
	Button,
	Checkbox,
	FieldError,
	Form,
	Input,
	Label,
	TextField,
} from "@heroui/react";
import { Check, Coffee, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
	const [isVisible, setIsVisible] = useState(false);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data: Record<string, string> = {};
		// Convert FormData to plain object
		formData.forEach((value, key) => {
			data[key] = value.toString();
		});
		alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
	};
	return (
		<div className="flex min-h-screen items-center justify-center p-5">
			<div className="flex flex-col items-center border rounded-3xl p-8 shadow-sm bg-[#c7ddcc]">
				<Coffee
					size={70}
					className="border rounded-2xl mb-4 p-2 bg-[#16123f] text-white"
				/>
				<h1 className="text-2xl font-bold">Café Aroma</h1>
				<h2 className="text-sm text-neutral-500 mb-6">
					Sistema de pedidos online
				</h2>

				<div className="border rounded-2xl p-8 shadow-sm bg-white">
					<h2 className="text-xl font-bold">Iniciar Sesión</h2>
					<h3 className="text-sm text-neutral-500 mb-6">
						Ingresa tus credenciales para continuar
					</h3>

					<Form className="flex w-96 flex-col gap-4" onSubmit={onSubmit}>
						<TextField
							isRequired
							name="email"
							type="email"
							validate={(value) => {
								if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
									return "Please enter a valid email address";
								}
								return null;
							}}
						>
							<Label>Correo electronico</Label>
							<div className="relative flex items-center w-full">
								<Mail size={18} className="absolute left-3 text-neutral-400" />
								<Input
									placeholder="john@ejemplo.com"
									className="w-full pl-10"
								/>
							</div>

							<FieldError />
						</TextField>
						<TextField
							isRequired
							minLength={8}
							name="password"
							type={isVisible ? "text" : "password"}
							validate={(value) => {
								if (value.length < 8) {
									return "Password must be at least 8 characters";
								}
								if (!/[A-Z]/.test(value)) {
									return "Password must contain at least one uppercase letter";
								}
								if (!/[0-9]/.test(value)) {
									return "Password must contain at least one number";
								}
								return null;
							}}
						>
							<Label>Contraseña</Label>
							<div className="relative flex items-center w-full">
								<Lock size={18} className="absolute left-3 text-neutral-400" />
								<Input
									placeholder="Ingresa tu contraseña"
									className="w-full pl-10 pr-10"
								/>
								<button
									type="button"
									onClick={() => setIsVisible(!isVisible)}
									className="absolute right-3 text-neutral-400 hover:text-neutral-600 focus:outline-none"
									aria-label="Toggle password visibility"
								>
									{isVisible ? <EyeOff size={18} /> : <Eye size={18} />}
								</button>
							</div>
							{/* <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description> */}
							<FieldError />
						</TextField>
						<div className="flex items-center justify-between">
							<Checkbox name="basic-terms">
								<Checkbox.Content>
									<Checkbox.Control>
										<Checkbox.Indicator />
									</Checkbox.Control>
									Recuerdame
								</Checkbox.Content>
							</Checkbox>
							<Link href="#" className="text-xs justify-end text-[#75c9b7]">
								¿Olvidaste tu contraseña?
							</Link>
						</div>
						<Button type="submit" className="w-full mt-4 bg-[#16123f]">
							<Check />
							Ingresar
						</Button>
					</Form>
				</div>
				<h6 className="mt-6 text-neutral-400 text-xs">
					© 2026 Cafe Aroma - Todos los derechos reservados
				</h6>
			</div>
		</div>
	);
}
