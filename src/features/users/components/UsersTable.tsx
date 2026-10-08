import {
	DataTable,
	type DataTableColumn,
} from "@/common/components/ui/DataTable";
import { RowActions } from "@/common/components/ui/RowActions";
import { StatusBadge } from "@/common/components/ui/StatusBadge";
import { UserAvatar } from "@/common/components/ui/UserAvatar";
import { locations } from "@/common/locations";
import { RoleBadge } from "@/features/users/components/RoleBadge";
import type { User } from "@/features/users/types";

type UsersTableProps = {
	users: User[];
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
};

export const UsersTable = ({ users, onEdit, onDelete }: UsersTableProps) => {
	const columns: DataTableColumn<User>[] = [
		{
			key: "id",
			header: locations.table.id,
			cell: (user) => `#${user.id}`,
			className: "text-gray-400",
		},
		{
			key: "name",
			header: locations.table.name,
			cell: (user) => (
				<div className="flex items-center gap-3">
					<UserAvatar
						name={user.fullName}
						imageUrl={user.avatarUrl}
						size="sm"
					/>
					<span className="font-semibold text-navy">{user.fullName}</span>
				</div>
			),
		},
		{
			key: "email",
			header: locations.table.email,
			cell: (user) => user.email,
			className: "text-gray-500",
		},
		{
			key: "role",
			header: locations.table.role,
			cell: (user) => <RoleBadge userRole={user.role} />,
		},
		{
			key: "status",
			header: locations.table.status,
			cell: (user) => <StatusBadge isActive={user.isActive} />,
		},
		{
			key: "actions",
			header: locations.table.actions,
			align: "right",
			cell: (user) => (
				<RowActions
					itemName={user.fullName}
					onEdit={() => onEdit(user)}
					onDelete={() => onDelete(user)}
				/>
			),
		},
	];

	return (
		<DataTable
			ariaLabel={locations.users.tableLabel}
			columns={columns}
			rows={users}
			getRowKey={(user) => user.id}
			emptyMessage={locations.users.empty}
		/>
	);
};
