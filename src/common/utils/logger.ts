interface IloggerProps {
	error: Error | string;
	module?: string;
	request?: Request;
}

/**
 * Registra un error en la terminal del servidor. Usa `console.error` (no
 * `console.log`) para que en producción quede marcado como error y se pueda filtrar.
 */
export const logger = ({ error, module, request }: IloggerProps) => {
	console.error("🐛");
	console.error(`[${module}]`, error);
	// Solo método y URL: el objeto Request completo es enorme y tapa el error
	if (request) console.error(`${request.method} ${request.url}`);
	console.error("🐛");
};
