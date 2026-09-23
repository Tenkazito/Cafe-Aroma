/** A partir de estas unidades (o menos) el stock se pinta en naranja como alerta. */
export const LOW_STOCK_THRESHOLD = 15;

export const isLowStock = (stock: number): boolean =>
	stock <= LOW_STOCK_THRESHOLD;
