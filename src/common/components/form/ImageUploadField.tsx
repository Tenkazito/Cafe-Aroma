"use client";

import Image from "next/image";
import { type ChangeEvent, useId, useState } from "react";
import { getFieldClasses } from "@/common/components/form/fieldStyles";
import { Icon } from "@/common/components/ui/Icon";
import { locations } from "@/common/locations";

type ImageUploadFieldProps = {
	label: string;
	/** Nombre del campo de la URL cuando se envíe el formulario. */
	name: string;
	defaultImageUrl?: string;
	value?: string;
	onChange?: (value: string) => void;
	errorMessage?: string;
};

/**
 * Imagen del producto: vista previa, zona para subir un archivo y campo con la URL.
 * El archivo solo se previsualiza en el navegador; subirlo a un storage será
 * parte del backend.
 */
export const ImageUploadField = ({
	label,
	name,
	defaultImageUrl = "",
	value,
	onChange,
	errorMessage,
}: ImageUploadFieldProps) => {
	const [internalImageUrl, setInternalImageUrl] = useState(defaultImageUrl);
	const imageUrl = value ?? internalImageUrl;
	const updateImageUrl = (nextValue: string) => {
		if (onChange) onChange(nextValue);
		else setInternalImageUrl(nextValue);
	};
	const fileInputId = useId();
	const urlInputId = useId();

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (!file) return;

		// URL temporal que solo existe en este navegador, suficiente para la vista previa
		updateImageUrl(URL.createObjectURL(file));
	};

	return (
		<div className="flex flex-col gap-2">
			<span className="text-sm font-medium text-navy">{label}</span>

			<div className="flex gap-3">
				{imageUrl && (
					<div className="relative shrink-0">
						<Image
							src={imageUrl}
							alt={locations.form.imagePreviewAlt}
							width={88}
							height={88}
							unoptimized
							className="h-22 w-22 rounded-xl object-cover"
						/>
						<button
							type="button"
							onClick={() => updateImageUrl("")}
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
						type="file"
						accept="image/*"
						className="sr-only"
						onChange={handleFileChange}
					/>
				</label>
			</div>

			<label htmlFor={urlInputId} className="sr-only">
				{locations.form.imageUrl}
			</label>
			<input
				id={urlInputId}
				name={name}
				type="url"
				value={imageUrl}
				onChange={(event) => updateImageUrl(event.target.value)}
				aria-invalid={Boolean(errorMessage)}
				placeholder="https://..."
				className={`h-10 text-xs ${getFieldClasses("default", false)}`}
			/>
			{errorMessage && (
				<span className="text-xs text-red-600">{errorMessage}</span>
			)}
		</div>
	);
};
