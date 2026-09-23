type Swatch = {
	name: string;
	/** Clase de Tailwind que usa el token (ej. "bg-navy"). */
	className: string;
	hex: string;
	usage: string;
};

const BRAND_COLORS: Swatch[] = [
	{
		name: "navy",
		className: "bg-navy",
		hex: "#16123f",
		usage: "Texto principal, botón primario, elemento activo del menú",
	},
	{
		name: "teal",
		className: "bg-teal",
		hex: "#75c9b7",
		usage: "Acentos, botón de llamada a la acción del cliente, badges",
	},
	{
		name: "teal-strong",
		className: "bg-teal-strong",
		hex: "#2a7f6f",
		usage: "Texto y enlaces teal (contraste suficiente sobre blanco)",
	},
	{
		name: "lime",
		className: "bg-lime",
		hex: "#abd699",
		usage: "Acento secundario",
	},
	{
		name: "lemon",
		className: "bg-lemon",
		hex: "#ffe26a",
		usage: "Meta del día, etiqueta Top, rol Mensajero",
	},
	{
		name: "mint",
		className: "bg-mint",
		hex: "#c7ddcc",
		usage: "Fondo de las pantallas del cliente",
	},
];

const SURFACE_COLORS: Swatch[] = [
	{
		name: "surface-admin",
		className: "bg-surface-admin",
		hex: "#eef4f1",
		usage: "Fondo del panel de administración",
	},
	{
		name: "surface-client",
		className: "bg-surface-client",
		hex: "#c7ddcc",
		usage: "Fondo de las pantallas del cliente",
	},
	{
		name: "surface-field",
		className: "bg-surface-field",
		hex: "#e6f0e9",
		usage: "Campos y filas resaltadas del cliente",
	},
];

const TYPE_SCALE = [
	{
		className: "text-2xl font-bold",
		label: "Título de página · text-2xl bold",
	},
	{ className: "text-lg font-bold", label: "Título de sección · text-lg bold" },
	{ className: "text-sm", label: "Texto normal · text-sm" },
	{
		className: "text-xs text-gray-500",
		label: "Texto secundario · text-xs gray-500",
	},
	{
		className: "text-xs font-semibold tracking-wide text-gray-500 uppercase",
		label: "Encabezado de tabla · text-xs uppercase",
	},
];

const SwatchGrid = ({ swatches }: { swatches: Swatch[] }) => (
	<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
		{swatches.map((swatch) => (
			<div
				key={swatch.name}
				className="overflow-hidden rounded-xl border border-gray-200 bg-white"
			>
				<div className={`h-16 ${swatch.className}`} />
				<div className="p-3">
					<p className="font-mono text-sm font-semibold text-navy">
						{swatch.name}
					</p>
					<p className="font-mono text-xs text-gray-400">{swatch.hex}</p>
					<p className="mt-1 text-xs text-gray-500">{swatch.usage}</p>
				</div>
			</div>
		))}
	</div>
);

/** Paleta, superficies y escala tipográfica de DESIGN.md. */
export const TokenSwatches = () => {
	return (
		<div className="flex flex-col gap-8">
			<section className="flex flex-col gap-3">
				<h2 className="text-lg font-bold text-navy">Paleta de la marca</h2>
				<SwatchGrid swatches={BRAND_COLORS} />
			</section>
			<section className="flex flex-col gap-3">
				<h2 className="text-lg font-bold text-navy">Superficies</h2>
				<SwatchGrid swatches={SURFACE_COLORS} />
			</section>
			<section className="flex flex-col gap-3">
				<h2 className="text-lg font-bold text-navy">
					Tipografía · Plus Jakarta Sans
				</h2>
				<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-5 text-navy">
					{TYPE_SCALE.map((type) => (
						<p key={type.label} className={type.className}>
							{type.label}
						</p>
					))}
				</div>
			</section>
		</div>
	);
};
