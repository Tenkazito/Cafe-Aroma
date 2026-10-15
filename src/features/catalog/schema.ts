import { z } from "zod";
import { requiredText } from "@/common/lib/formFields";

/**
 * Formulario "Finalizar pedido" de /solicitar → tabla `pedidos`.
 * Solo se pide la dirección: el usuario sale de la sesión, el total y los
 * items salen del carrito, y el estado arranca en `solicitado`.
 */
export const checkoutSchema = z.object({
	// `direccion String`: obligatoria. 10 caracteres evita direcciones incompletas como "Calle 10"
	address: requiredText(10, 200),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
