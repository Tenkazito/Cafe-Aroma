export type Category = {
	id: number;
	name: string;
	slug: string;
	createdAt: Date;
};

export interface ICreate {
	titulo: string;
	url: string;
}

export interface IUpdate {
	id: number;
	titulo: string;
	url: string;
}
