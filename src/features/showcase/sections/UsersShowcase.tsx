"use client";

import { toast } from "@heroui/react";
import { ComponentPreview } from "@/features/showcase/components/ComponentPreview";
import { ModalPreview } from "@/features/showcase/components/ModalPreview";
import { ShowcaseGroup } from "@/features/showcase/components/ShowcaseGroup";
import { ShowcasePage } from "@/features/showcase/components/ShowcasePage";
import { getShowcaseSection } from "@/features/showcase/lib/sections";
import { RoleBadge } from "@/features/users/components/RoleBadge";
import { UserFormModal } from "@/features/users/components/UserFormModal";
import { UsersManager } from "@/features/users/components/UsersManager";
import { UsersTable } from "@/features/users/components/UsersTable";
import { MOCK_USERS } from "@/features/users/mocks/users";

export const UsersShowcase = () => {
	return (
		<ShowcasePage section={getShowcaseSection("users")}>
			<ShowcaseGroup title="Componentes">
				<ComponentPreview
					name="RoleBadge"
					description="Badge con el color de cada rol (definidos en lib/userRoles.ts)."
					path="src/features/users/components/RoleBadge.tsx"
					background="white"
				>
					<div className="flex gap-2">
						<RoleBadge userRole="administrador" />
						<RoleBadge userRole="cliente" />
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="UsersTable"
					description="Tabla de usuarios con avatar, rol, estado y acciones."
					path="src/features/users/components/UsersTable.tsx"
					props={[
						{
							name: "onEdit / onDelete",
							description: "Reciben el usuario de la fila",
						},
					]}
				>
					<UsersTable
						users={MOCK_USERS.slice(0, 3)}
						onEdit={(user) => toast.info(`Editar ${user.fullName}`)}
						onDelete={(user) => toast.info(`Eliminar ${user.fullName}`)}
					/>
				</ComponentPreview>

				<ComponentPreview
					name="UserFormModal"
					description="Modal para crear o editar un usuario. Si recibe `user` entra en modo edición."
					path="src/features/users/components/UserFormModal.tsx"
				>
					<div className="flex gap-3">
						<ModalPreview
							label="Nuevo usuario"
							renderModal={(isOpen, onOpenChange) => (
								<UserFormModal isOpen={isOpen} onOpenChange={onOpenChange} />
							)}
						/>
						<ModalPreview
							label="Editar usuario"
							renderModal={(isOpen, onOpenChange) => (
								<UserFormModal
									isOpen={isOpen}
									onOpenChange={onOpenChange}
									user={MOCK_USERS[1]}
								/>
							)}
						/>
					</div>
				</ComponentPreview>

				<ComponentPreview
					name="UsersManager"
					description="Pantalla completa de /admin/usuarios: encabezado, búsqueda, tabla y modales. Es el único componente cliente con estado; los demás solo pintan."
					path="src/features/users/components/UsersManager.tsx"
				>
					<UsersManager users={MOCK_USERS} />
				</ComponentPreview>
			</ShowcaseGroup>

			<ShowcaseGroup title="Lógica">
				<ComponentPreview
					kind="code"
					name="filterUsers(users, search)"
					description="Devuelve los usuarios cuyo nombre o correo contiene el texto."
					path="src/features/users/lib/filterUsers.ts"
				/>
				<ComponentPreview
					kind="code"
					name="USER_ROLES / USER_ROLE_OPTIONS"
					description="Texto y color de cada rol; opciones para el select del formulario."
					path="src/features/users/lib/userRoles.ts"
				/>
			</ShowcaseGroup>
		</ShowcasePage>
	);
};
