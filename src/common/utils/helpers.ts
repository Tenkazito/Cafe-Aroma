export const createUrl = (value: string): string => {
	return value.trim().toLowerCase().replace(/\s+/g, "-");
};
