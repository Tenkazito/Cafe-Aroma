import type { Notification } from "@/features/notifications/types";

export const MOCK_NOTIFICATIONS: Notification[] = [
	{
		id: 1,
		title: "Pedido entregado",
		message: "Tu orden ORD-1042 ha sido entregada.",
		timeAgo: "Hace 10 min",
		isRead: false,
	},
	{
		id: 2,
		title: "Pedido en preparación",
		message: "Tu orden ORD-1041 está siendo preparada.",
		timeAgo: "Hace 1 h",
		isRead: false,
	},
	{
		id: 3,
		title: "Promoción disponible",
		message: "2x1 en Frappuccinos este viernes.",
		timeAgo: "Hace 3 h",
		isRead: true,
	},
	{
		id: 4,
		title: "Stock actualizado",
		message: "Latte de Avellana disponible nuevamente.",
		timeAgo: "Ayer",
		isRead: true,
	},
];
