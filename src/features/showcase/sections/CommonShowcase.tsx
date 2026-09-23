"use client";

import { Button, toast } from "@heroui/react";
import { useState } from "react";
import { FormCheckbox } from "@/common/components/form/FormCheckbox";
import { FormPasswordField } from "@/common/components/form/FormPasswordField";
import { FormSelectField } from "@/common/components/form/FormSelectField";
import { FormTextAreaField } from "@/common/components/form/FormTextAreaField";
import { FormTextField } from "@/common/components/form/FormTextField";
import { ImageUploadField } from "@/common/components/form/ImageUploadField";
import { AdminNavbar } from "@/common/components/layout/AdminNavbar";
import { BrandLogo } from "@/common/components/layout/BrandLogo";
import { ClientHeader } from "@/common/components/layout/ClientHeader";
import { ClientSidebar } from "@/common/components/layout/ClientSidebar";
import { UserBadge } from "@/common/components/layout/UserBadge";
import { AppModal } from "@/common/components/overlay/AppModal";
import { ConfirmDialog } from "@/common/components/overlay/ConfirmDialog";
import { FormModal } from "@/common/components/overlay/FormModal";
import { Badge, type BadgeTone } from "@/common/components/ui/Badge";
import { DataTable } from "@/common/components/ui/DataTable";
import { EmptyState } from "@/common/components/ui/EmptyState";
import { FilterBar } from "@/common/components/ui/FilterBar";
import { ICON_NAMES, Icon } from "@/common/components/ui/Icon";
import { LinkButton } from "@/common/components/ui/LinkButton";
import { PageHeader } from "@/common/components/ui/PageHeader";
import { ProductThumbnail } from "@/common/components/ui/ProductThumbnail";
import { RankBadge } from "@/common/components/ui/RankBadge";
import { RowActions } from "@/common/components/ui/RowActions";
import { SearchInput } from "@/common/components/ui/SearchInput";
import { SectionCard } from "@/common/components/ui/SectionCard";
import { StatCard, type StatTone } from "@/common/components/ui/StatCard";
import { StatusBadge } from "@/common/components/ui/StatusBadge";
import { UserAvatar } from "@/common/components/ui/UserAvatar";
import { ADMIN_NAV_ITEMS, CLIENT_NAV_ITEMS } from "@/common/lib/navigation";
import { STATUS_OPTIONS } from "@/common/lib/statusOptions";
import {
	MOCK_ADMIN_USER,
	MOCK_CUSTOMER_USER,
} from "@/features/auth/mocks/currentUser";
import { MOCK_PRODUCTS } from "@/features/products/mocks/products";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";

const BADGE_TONES: BadgeTone[] = [
	"success",
	"info",
	"warning",
	"danger",
	"neutral",
	"navy",
	"teal",
	"lemon",
];
const STAT_TONES: StatTone[] = [
	"navy",
	"success",
	"info",
	"warning",
	"danger",
	"neutral",
];
const sampleProduct = MOCK_PRODUCTS[0];
const notify = (message: string) => () => toast.info(message);

const LayoutGroup = () => (
	<ShowcaseGroup
		title="Layout"
		description="src/common/components/layout — esqueleto de las pantallas."
	>
		<ComponentPreview
			name="BrandLogo"
			description="Taza de café sobre cuadro navy + 'Café Aroma'. Se usa en barras y logins."
			path="src/common/components/layout/BrandLogo.tsx"
			props={[
				{ name: "size", description: '"sm" (barras) | "lg" (login)' },
				{ name: "iconOnly", description: "Oculta el texto" },
			]}
		>
			<div className="flex flex-wrap items-center gap-8">
				<BrandLogo />
				<BrandLogo size="lg" />
				<BrandLogo size="lg" iconOnly />
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="UserBadge"
			description="Avatar + nombre + rol del usuario con sesión (el texto se oculta en móvil)."
			path="src/common/components/layout/UserBadge.tsx"
			props={[
				{ name: "user", description: "SessionUser { name, role, avatarUrl? }" },
			]}
		>
			<div className="flex flex-wrap gap-8">
				<UserBadge user={MOCK_ADMIN_USER} />
				<UserBadge user={MOCK_CUSTOMER_USER} />
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="AdminNavbar"
			description="Barra superior del panel admin. Marca el enlace activo según la URL y en pantallas chicas pasa a menú hamburguesa."
			path="src/common/components/layout/AdminNavbar.tsx"
			props={[
				{
					name: "items",
					description: "NavItem[] (ver src/common/lib/navigation.ts)",
				},
				{ name: "user", description: "Usuario con sesión" },
				{ name: "logoutHref", description: "Destino del botón Salir" },
			]}
		>
			<AdminNavbar
				items={ADMIN_NAV_ITEMS}
				user={MOCK_ADMIN_USER}
				logoutHref="/admin/login"
			/>
		</ComponentPreview>

		<ComponentPreview
			name="ClientHeader"
			description="Barra superior del cliente. Tiene un espacio (actions) para meter la campana de notificaciones."
			path="src/common/components/layout/ClientHeader.tsx"
			background="client"
			props={[
				{ name: "actions", description: "ReactNode antes del usuario" },
				{ name: "onMenuClick", description: "Abre el sidebar en móvil" },
			]}
		>
			<ClientHeader
				user={MOCK_CUSTOMER_USER}
				onMenuClick={notify("Abrir menú")}
			/>
		</ComponentPreview>

		<ComponentPreview
			name="ClientSidebar"
			description="Menú lateral del cliente. Muestra un contador en los enlaces que tengan badge."
			path="src/common/components/layout/ClientSidebar.tsx"
			background="client"
			props={[{ name: "items", description: "NavItem[] con badge opcional" }]}
		>
			<div className="w-64">
				<ClientSidebar
					items={CLIENT_NAV_ITEMS.map((item) =>
						item.href === "/notificaciones" ? { ...item, badge: 2 } : item,
					)}
					logoutHref="/login"
				/>
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="ClientShell"
			description="Une ClientHeader + ClientSidebar + contenido y maneja el menú móvil. Ocupa toda la pantalla, por eso se ve en /inicio."
			path="src/common/components/layout/ClientShell.tsx"
		>
			<LinkButton href="/inicio">Ver en /inicio</LinkButton>
		</ComponentPreview>
	</ShowcaseGroup>
);

const UiGroup = () => {
	const [search, setSearch] = useState("");

	return (
		<ShowcaseGroup
			title="UI"
			description="src/common/components/ui — piezas visuales reutilizables."
		>
			<ComponentPreview
				name="Icon"
				description="Icono de Lucide pedido por nombre (string tipado). Para agregar uno nuevo, añádelo al mapa ICONS."
				path="src/common/components/ui/Icon.tsx"
				background="white"
				props={[
					{ name: "name", description: "IconName" },
					{ name: "size", description: "Píxeles (20 por defecto)" },
				]}
			>
				<div className="grid grid-cols-3 gap-3 sm:grid-cols-6 lg:grid-cols-8">
					{ICON_NAMES.map((iconName) => (
						<div
							key={iconName}
							className="flex flex-col items-center gap-1 rounded-lg p-2 text-navy hover:bg-gray-50"
						>
							<Icon name={iconName} />
							<span className="font-mono text-[10px] text-gray-400">
								{iconName}
							</span>
						</div>
					))}
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="Badge"
				description="Etiqueta de color. Base de todos los estados: las features solo eligen el tono."
				path="src/common/components/ui/Badge.tsx"
				background="white"
				props={[
					{ name: "tone", description: BADGE_TONES.join(" | ") },
					{ name: "withDot", description: "Punto de color antes del texto" },
				]}
			>
				<div className="flex flex-wrap gap-2">
					{BADGE_TONES.map((tone) => (
						<Badge key={tone} tone={tone}>
							{tone}
						</Badge>
					))}
					{BADGE_TONES.map((tone) => (
						<Badge key={`${tone}-dot`} tone={tone} withDot>
							{tone}
						</Badge>
					))}
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="StatusBadge"
				description="Activo / Inactivo de usuarios, categorías y productos."
				path="src/common/components/ui/StatusBadge.tsx"
				background="white"
				props={[{ name: "isActive", description: "boolean" }]}
			>
				<div className="flex gap-2">
					<StatusBadge isActive />
					<StatusBadge isActive={false} />
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="StatCard"
				description="Número grande con icono y etiqueta. Tres variantes según la pantalla."
				path="src/common/components/ui/StatCard.tsx"
				props={[
					{
						name: "variant",
						description:
							'"tinted" (dashboard) | "outlined" (pedidos) | "solid" (cliente)',
					},
					{ name: "tone", description: STAT_TONES.join(" | ") },
				]}
			>
				<div className="flex flex-col gap-4">
					{(["tinted", "outlined", "solid"] as const).map((variant) => (
						<div key={variant}>
							<p className="mb-2 font-mono text-xs text-gray-500">
								variant="{variant}"
							</p>
							<div className="grid grid-cols-2 gap-3 lg:grid-cols-6">
								{STAT_TONES.map((tone) => (
									<StatCard
										key={tone}
										variant={variant}
										tone={tone}
										label={tone}
										value={42}
										icon="shoppingBag"
									/>
								))}
							</div>
						</div>
					))}
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="DataTable"
				description="Tabla genérica: recibe columnas (header + cómo pintar la celda) y filas. Hace scroll horizontal en móvil y muestra un mensaje si no hay filas."
				path="src/common/components/ui/DataTable.tsx"
				props={[
					{
						name: "columns",
						description: "DataTableColumn<T>[] { key, header, cell, align? }",
					},
					{
						name: "rows / getRowKey",
						description: "Datos y cómo sacar la key de cada fila",
					},
					{
						name: "variant",
						description: '"card" (con tarjeta) | "plain" (dentro de otra)',
					},
				]}
			>
				<div className="flex flex-col gap-4">
					<DataTable
						ariaLabel="Ejemplo"
						rows={MOCK_PRODUCTS.slice(0, 3)}
						getRowKey={(product) => product.id}
						columns={[
							{
								key: "name",
								header: "Nombre",
								cell: (product) => product.name,
							},
							{
								key: "category",
								header: "Categoría",
								cell: (product) => product.categoryName,
							},
							{
								key: "stock",
								header: "Stock",
								align: "right",
								cell: (product) => product.stock,
							},
						]}
					/>
					<DataTable
						ariaLabel="Ejemplo vacío"
						rows={[]}
						getRowKey={() => 0}
						columns={[{ key: "name", header: "Sin filas", cell: () => null }]}
					/>
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="PageHeader"
				description="Título de cada pantalla con icono, descripción y acción opcional a la derecha."
				path="src/common/components/ui/PageHeader.tsx"
				props={[
					{
						name: "icon",
						description: "Si se omite, no hay cuadro de icono (estilo cliente)",
					},
					{ name: "action", description: "ReactNode (ej. botón Nuevo)" },
				]}
			>
				<div className="flex flex-col gap-6">
					<PageHeader
						title="Productos"
						description="Catálogo de productos de la cafetería"
						icon="package"
						action={
							<Button onPress={notify("Nuevo")}>
								<Icon name="plus" size={18} />
								Nuevo Producto
							</Button>
						}
					/>
					<PageHeader
						title="Panel Principal"
						description="Sin icono, como en el cliente."
					/>
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="SectionCard"
				description="Tarjeta blanca con título opcional: el contenedor de cada sección."
				path="src/common/components/ui/SectionCard.tsx"
				props={[
					{
						name: "title / icon / iconClassName",
						description: "Encabezado opcional",
					},
					{ name: "action", description: "Contenido a la derecha del título" },
				]}
			>
				<SectionCard
					title="Productos más vendidos"
					icon="trophy"
					iconClassName="text-orange-400"
					action={<Badge tone="teal">acción</Badge>}
				>
					<p className="text-sm text-gray-500">Contenido de la sección.</p>
				</SectionCard>
			</ComponentPreview>

			<ComponentPreview
				name="RankBadge"
				description="Posición en un ranking; del 1 al 3 con color de podio."
				path="src/common/components/ui/RankBadge.tsx"
				background="white"
			>
				<div className="flex gap-2">
					{[1, 2, 3, 4, 5].map((rank) => (
						<RankBadge key={rank} rank={rank} />
					))}
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="RowActions"
				description="Botones de editar y eliminar de la columna Acciones."
				path="src/common/components/ui/RowActions.tsx"
				background="white"
				props={[
					{
						name: "itemName",
						description: "Para el aria-label ('Editar Latte Clásico')",
					},
				]}
			>
				<div className="w-24">
					<RowActions
						itemName="Latte Clásico"
						onEdit={notify("Editar")}
						onDelete={notify("Eliminar")}
					/>
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="SearchInput"
				description="Input con lupa. Acepta todos los atributos de un <input>."
				path="src/common/components/ui/SearchInput.tsx"
				props={[
					{
						name: "variant",
						description: '"default" | "soft" (fondo mint del cliente)',
					},
				]}
			>
				<div className="grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
					<SearchInput
						aria-label="Buscar"
						placeholder="default"
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>
					<SearchInput aria-label="Buscar" placeholder="soft" variant="soft" />
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="FilterBar"
				description="Tarjeta 'Filtros de búsqueda' que acomoda los campos en una grilla."
				path="src/common/components/ui/FilterBar.tsx"
				props={[
					{ name: "columns", description: "2 | 3 | 4 en escritorio" },
					{ name: "title", description: "null para ocultar el título" },
				]}
			>
				<FilterBar columns={3}>
					<FormSelectField label="Estado" options={STATUS_OPTIONS} />
					<FormTextField label="Fecha" type="date" />
					<FormTextField
						label="Buscar"
						icon="search"
						placeholder="ID o cliente"
					/>
				</FilterBar>
			</ComponentPreview>

			<ComponentPreview
				name="EmptyState"
				description="Mensaje centrado para listas vacías."
				path="src/common/components/ui/EmptyState.tsx"
				background="white"
			>
				<EmptyState
					icon="coffee"
					title="Tu pedido está vacío"
					description="Agrega productos del catálogo"
				/>
			</ComponentPreview>

			<ComponentPreview
				name="UserAvatar / ProductThumbnail"
				description="Foto de usuario (con iniciales si no hay foto) y miniatura cuadrada de producto."
				path="src/common/components/ui/UserAvatar.tsx · ProductThumbnail.tsx"
				background="white"
			>
				<div className="flex items-center gap-4">
					<UserAvatar
						name={MOCK_ADMIN_USER.name}
						imageUrl={MOCK_ADMIN_USER.avatarUrl}
						size="lg"
					/>
					<UserAvatar name={MOCK_CUSTOMER_USER.name} size="lg" />
					<ProductThumbnail
						name={sampleProduct.name}
						imageUrl={sampleProduct.imageUrl}
						size={56}
					/>
				</div>
			</ComponentPreview>

			<ComponentPreview
				name="LinkButton"
				description="Enlace de Next.js con apariencia de botón. Para navegar; para acciones usa el Button de HeroUI."
				path="src/common/components/ui/LinkButton.tsx"
				props={[
					{
						name: "variant",
						description: '"primary" (navy) | "accent" (teal)',
					},
				]}
			>
				<div className="flex gap-3">
					<LinkButton href="/dev">primary</LinkButton>
					<LinkButton href="/dev" variant="accent">
						accent
					</LinkButton>
				</div>
			</ComponentPreview>
		</ShowcaseGroup>
	);
};

const FormGroup = () => (
	<ShowcaseGroup
		title="Formularios"
		description="src/common/components/form — campos presentacionales. Aceptan los atributos nativos y `errorMessage`, listos para `{...register('campo')}` de React Hook Form."
	>
		<ComponentPreview
			name="FormTextField"
			description="Campo de texto con label, icono opcional y mensaje de error."
			path="src/common/components/form/FormTextField.tsx"
			props={[
				{ name: "icon", description: "IconName a la izquierda" },
				{ name: "errorMessage", description: "Texto rojo bajo el campo" },
				{ name: "variant", description: '"default" | "soft"' },
			]}
		>
			<div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
				<FormTextField
					label="Correo electrónico"
					icon="mail"
					placeholder="usuario@cafearoma.co"
				/>
				<FormTextField
					label="Con error"
					defaultValue="correo-malo"
					errorMessage="Ingresa un correo válido"
				/>
				<FormTextField
					label="Soft (cliente)"
					icon="user"
					placeholder="tu_usuario"
					variant="soft"
				/>
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="FormPasswordField"
			description="Contraseña con botón de ojo para mostrarla u ocultarla."
			path="src/common/components/form/FormPasswordField.tsx"
			props={[
				{
					name: "withLockIcon",
					description: "Candado a la izquierda (logins)",
				},
			]}
		>
			<div className="grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
				<FormPasswordField label="Contraseña" withLockIcon />
				<FormPasswordField label="Confirmar contraseña" />
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="FormSelectField / FormTextAreaField / FormCheckbox"
			description="Select nativo, texto largo y casilla, con el mismo estilo que el resto de campos."
			path="src/common/components/form/"
			props={[
				{
					name: "options",
					description: "SelectOption[] { value, label } (solo el select)",
				},
			]}
		>
			<div className="grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-2">
				<FormSelectField label="Estado" options={STATUS_OPTIONS} />
				<FormTextAreaField
					label="Descripción"
					placeholder="Describe el producto..."
				/>
				<FormCheckbox label="Recordarme" />
			</div>
		</ComponentPreview>

		<ComponentPreview
			name="ImageUploadField"
			description="Vista previa + zona para subir archivo + URL. El archivo solo se previsualiza en el navegador."
			path="src/common/components/form/ImageUploadField.tsx"
			background="white"
			props={[
				{
					name: "name",
					description: "Nombre del campo de la URL al enviar el formulario",
				},
			]}
		>
			<div className="max-w-xl">
				<ImageUploadField
					label="Imagen del producto"
					name="imageUrl"
					defaultImageUrl={sampleProduct.imageUrl}
				/>
			</div>
		</ComponentPreview>
	</ShowcaseGroup>
);

const OverlayGroup = () => (
	<ShowcaseGroup
		title="Modales"
		description="src/common/components/overlay — todos comparten la misma estructura (AppModal)."
	>
		<ComponentPreview
			name="AppModal"
			description="Estructura base: título + X, contenido, y pie gris opcional con botones."
			path="src/common/components/overlay/AppModal.tsx"
			props={[
				{
					name: "isOpen / onOpenChange",
					description: "Estado controlado desde afuera",
				},
				{ name: "size", description: '"xs" | "sm" | "md" | "lg"' },
				{ name: "footer", description: "Botones del pie" },
			]}
		>
			<ModalPreview
				label="Abrir AppModal"
				renderModal={(isOpen, onOpenChange) => (
					<AppModal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						title="Título del modal"
						footer={<Button onPress={() => onOpenChange(false)}>Cerrar</Button>}
					>
						<p className="text-sm text-gray-500">
							Cualquier contenido va aquí.
						</p>
					</AppModal>
				)}
			/>
		</ComponentPreview>

		<ComponentPreview
			name="FormModal"
			description="Modal con <form>: los campos van como children y el pie trae Cancelar + botón principal."
			path="src/common/components/overlay/FormModal.tsx"
			props={[
				{ name: "submitLabel", description: "Texto del botón principal" },
				{
					name: "onSubmit",
					description: "Recibe el evento; compatible con handleSubmit() de RHF",
				},
			]}
		>
			<ModalPreview
				label="Abrir FormModal"
				renderModal={(isOpen, onOpenChange) => (
					<FormModal
						isOpen={isOpen}
						onOpenChange={onOpenChange}
						title="Nueva Categoría"
						submitLabel="Crear Categoría"
						size="sm"
						onSubmit={(event) => {
							event.preventDefault();
							onOpenChange(false);
							toast.success("Enviado");
						}}
					>
						<FormTextField label="Nombre" placeholder="Ej: Cafés Calientes" />
						<FormSelectField label="Estado" options={STATUS_OPTIONS} />
					</FormModal>
				)}
			/>
		</ComponentPreview>

		<ComponentPreview
			name="ConfirmDialog"
			description="Pregunta de confirmación con tono primario (aceptar) o danger (eliminar, rechazar)."
			path="src/common/components/overlay/ConfirmDialog.tsx"
			props={[
				{
					name: "message",
					description: "ReactNode (admite negritas y colores)",
				},
				{ name: "tone", description: '"primary" | "danger"' },
				{
					name: "onConfirm",
					description: "Se llama y luego se cierra el modal",
				},
			]}
		>
			<div className="flex flex-wrap gap-3">
				<ModalPreview
					label="Tono primary"
					renderModal={(isOpen, onOpenChange) => (
						<ConfirmDialog
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							title="Aceptar Pedido"
							confirmLabel="Aceptar"
							onConfirm={notify("Confirmado")}
							message="¿Confirmas que deseas aceptar el pedido #1045?"
						/>
					)}
				/>
				<ModalPreview
					label="Tono danger"
					renderModal={(isOpen, onOpenChange) => (
						<ConfirmDialog
							isOpen={isOpen}
							onOpenChange={onOpenChange}
							title="Eliminar Producto"
							tone="danger"
							confirmLabel="Eliminar"
							onConfirm={notify("Eliminado")}
							message="¿Estás seguro? Esta acción no se puede deshacer."
						/>
					)}
				/>
			</div>
		</ComponentPreview>
	</ShowcaseGroup>
);

const HooksGroup = () => (
	<ShowcaseGroup
		title="Hooks y utilidades"
		description="Lógica compartida sin interfaz propia."
	>
		<ComponentPreview
			name="useCrudModals"
			kind="code"
			description="Estado de los modales crear / editar / eliminar de las pantallas de listado. Lo usan UsersManager, CategoriesManager y ProductsManager."
			path="src/common/hooks/useCrudModals.ts"
		/>
		<ComponentPreview
			name="formatCurrency / getInitials"
			kind="code"
			description="8500 → '$8.500' (COP) y 'Laura Patiño' → 'LP'."
			path="src/common/utils/format.ts"
		/>
		<ComponentPreview
			name="ADMIN_NAV_ITEMS / CLIENT_NAV_ITEMS"
			kind="code"
			description="Enlaces de los menús. Para agregar una pantalla al menú, se agrega aquí."
			path="src/common/lib/navigation.ts"
		/>
	</ShowcaseGroup>
);

export const CommonShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("common")}>
			<LayoutGroup />
			<UiGroup />
			<FormGroup />
			<OverlayGroup />
			<HooksGroup />
		</ShowcasePage>
	);
};
