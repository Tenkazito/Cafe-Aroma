import { Avatar } from "@heroui/react";
import { getInitials } from "@/common/utils/format";

type UserAvatarProps = {
	name: string;
	/** Si no hay foto se muestran las iniciales sobre fondo navy. */
	imageUrl?: string;
	size?: "sm" | "md" | "lg";
};

export const UserAvatar = ({
	name,
	imageUrl,
	size = "md",
}: UserAvatarProps) => {
	return (
		<Avatar size={size} className="shrink-0">
			{imageUrl && <Avatar.Image src={imageUrl} alt={name} />}
			<Avatar.Fallback className="bg-navy font-semibold text-teal">
				{getInitials(name)}
			</Avatar.Fallback>
		</Avatar>
	);
};
