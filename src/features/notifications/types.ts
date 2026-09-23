export type Notification = {
	id: number;
	title: string;
	message: string;
	/** Tiempo relativo ya formateado ("Hace 10 min", "Ayer"). */
	timeAgo: string;
	isRead: boolean;
};
