"use client";

import Image from "next/image";
import { type ChangeEvent, useEffect, useId, useState } from "react";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type ImageUploadFieldProps = {
	label: string;
	/** Nombre del campo del archivo cuando se envíe el formulario. */
	name: string;
	/** Imagen que ya tiene guardada (ej. al editar un producto). */
	defaultImageUrl?: string;
	/** Archivo nuevo elegido por el usuario. */
	value?: File;
	onChange?: (file: File | undefined) => void;
	errorMessage?: string;
};

/**
 * Imagen del producto: vista previa y zona para subir un archivo.
 * Entrega el `File` elegido; la subida a un storage la hace el backend.
 */
export const ImageUploadField = ({
	label,
	name,
	defaultImageUrl = "",
	value,
	onChange,
	errorMessage,
}: ImageUploadFieldProps) => {
	const fileInputId = useId();
	const [savedImageUrl, setSavedImageUrl] = useState(defaultImageUrl);
	const [filePreviewUrl, setFilePreviewUrl] = useState("");

	// URL temporal del archivo elegido; se libera al cambiarlo para no dejar memoria colgada
	useEffect(() => {
		if (!value) {
			setFilePreviewUrl("");
			return;
		}
		const objectUrl = URL.createObjectURL(value);
		setFilePreviewUrl(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [value]);

	const previewUrl = filePreviewUrl || savedImageUrl;

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;
		onChange?.(file);
		// Sin `onChange` (uso sin formulario) la vista previa sale de aquí
		if (!onChange) setFilePreviewUrl(URL.createObjectURL(file));
	};

	const handleRemove = () => {
		setSavedImageUrl("");
		setFilePreviewUrl("");
		onChange?.(undefined);
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium text-navy">{label}</span>

			<div className="flex gap-3">
				{previewUrl && (
					<div className="relative shrink-0">
						<Image
							src={previewUrl}
							alt={locations.form.imagePreviewAlt}
							width={88}
							height={88}
							unoptimized
							className="h-22 w-22 rounded-xl object-cover"
						/>
						<button
							type="button"
							onClick={handleRemove}
							aria-label={locations.form.removeImage}
							className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white"
						>
							<Icon name="x" size={12} />
						</button>
					</div>
				)}

				<label
					htmlFor={fileInputId}
					className="flex min-h-22 flex-1 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-gray-200 text-sm text-gray-400 transition-colors hover:border-teal hover:text-teal-strong"
				>
					<Icon name="upload" size={20} />
					{locations.form.uploadImage}
					<input
						id={fileInputId}
						name={name}
						type="file"
						accept="image/*"
						aria-invalid={Boolean(errorMessage)}
						className="sr-only"
						onChange={handleFileChange}
					/>
				</label>
			</div>

			{errorMessage && (
				<span className="text-xs text-red-600">{errorMessage}</span>
			)}
		</div>
	);
};
