/**
 * Todos los textos de la interfaz de Café Aroma, agrupados por tema.
 *
 * Si un texto se repite o hay que cambiarlo, se cambia aquí y se actualiza en
 * toda la app. Uso: `locations.errors.manyCharacters(50)`, `locations.users.title`.
 *
 * Reglas:
 * - Un texto que lleva datos (un nombre, un número) es una función.
 * - Un texto con una palabra en negrita se guarda en partes (`before`, `after`)
 *   y el componente pone el `<strong>` en medio.
 * - Los datos de ejemplo (`mocks/`) y los textos de la ruta `/dev` NO van aquí.
 */
export const locations = {
	brand: {
		name: "Café Aroma",
		systemName: "Sistema de Pedidos Online",
		metaDescription: "Sistema de pedidos online",
		copyright: "© 2026 Café Aroma · Todos los derechos reservados",
	},

	/** Títulos de pestaña del navegador (`metadata.title` de cada página). */
	pageTitles: {
		login: "Iniciar sesión · Café Aroma",
		adminLogin: "Administración · Café Aroma",
		adminHome: "Inicio · Admin Café Aroma",
		adminUsers: "Usuarios · Admin Café Aroma",
		adminCategories: "Categorías · Admin Café Aroma",
		adminProducts: "Productos · Admin Café Aroma",
		adminOrders: "Pedidos · Admin Café Aroma",
		adminBilling: "Facturación · Admin Café Aroma",
		customerHome: "Inicio · Café Aroma",
		request: "Solicitar · Café Aroma",
		customerOrders: "Últimos pedidos · Café Aroma",
		notifications: "Notificaciones · Café Aroma",
	},

	/** Enlaces de los menús y textos de la navegación. */
	navigation: {
		admin: {
			home: "Inicio",
			users: "Usuarios",
			categories: "Categorías",
			products: "Productos",
			orders: "Pedidos",
			billing: "Facturación",
		},
		client: {
			home: "Inicio",
			request: "Solicitar",
			orders: "Últimos pedidos",
			notifications: "Notificaciones",
		},
		logout: "Cerrar sesión",
		exit: "Salir",
		openMenu: "Abrir menú",
		closeMenu: "Cerrar menú",
		customerMenuLabel: "Menú del cliente",
	},

	/** Botones y acciones que se repiten en toda la app. */
	actions: {
		cancel: "Cancelar",
		save: "Guardar Cambios",
		close: "Cerrar",
		delete: "Eliminar",
		accept: "Aceptar",
		reject: "Rechazar",
		search: "Buscar",
		add: "Agregar",
		view: "Ver",
		viewDetails: "Ver detalles",
		/** Para lectores de pantalla: "Editar Latte Clásico". */
		editItem: (name: string) => `Editar ${name}`,
		deleteItem: (name: string) => `Eliminar ${name}`,
	},

	status: {
		active: "Activo",
		inactive: "Inactivo",
		all: "Todos",
	},

	roles: {
		administrador: "Administrador",
		cliente: "Cliente",
	},

	orderStatus: {
		solicitado: "Solicitado",
		pendiente: "Pendiente",
		entregado: "Entregado",
		cancelado: "Cancelado",
	},

	/** Encabezados de columna que usan varias tablas. */
	table: {
		id: "ID",
		name: "Nombre",
		email: "Email",
		role: "Rol",
		status: "Estado",
		actions: "Acciones",
		options: "Opciones",
		category: "Categoría",
		price: "Precio",
		stock: "Stock",
		date: "Fecha",
		customer: "Cliente",
		location: "Ubicación",
		value: "Valor",
		order: "Orden",
		orderId: "ID Orden",
		product: "Producto",
		quantity: "Cantidad",
		unitPrice: "Precio unit.",
		subtotal: "Subtotal",
		sold: "Vendidos",
		details: "Detalles",
	},

	/** Etiquetas y ayudas de campos de formulario que se repiten. */
	form: {
		name: "Nombre",
		status: "Estado",
		email: "Correo electrónico",
		emailPlaceholder: "usuario@cafearoma.co",
		password: "Contraseña",
		confirmPassword: "Confirmar contraseña",
		showPassword: "Mostrar contraseña",
		hidePassword: "Ocultar contraseña",
		searchPlaceholder: "Buscar...",
		filtersTitle: "Filtros de búsqueda",
		uploadImage: "Haz clic para subir una imagen",
		imageUrl: "URL de la imagen",
		imagePreviewAlt: "Vista previa del producto",
		removeImage: "Quitar imagen",
	},

	/**
	 * Mensajes de validación. Todavía no se usan: están listos para los schemas
	 * de Zod (ej. `z.string().min(2, locations.errors.minCharacters(2))`).
	 */
	errors: {
		required: "Este campo es obligatorio",
		minCharacters: (min: number) => `Debe tener al menos ${min} caracteres`,
		manyCharacters: (max: number) => `No puede tener más de ${max} caracteres`,
		invalidEmail: "Ingresa un correo válido",
		passwordsDontMatch: "Las contraseñas no coinciden",
		invalidNumber: "Ingresa un número válido",
		negativeNumber: "El valor no puede ser negativo",
		duplicateEmail: "Ya existe una cuenta con ese correo",
		internal: "Error interno del servidor",
	},

	/** Avisos (toasts). El "(simulado)" se quita cuando exista el backend. */
	toasts: {
		loginDone: "Sesión iniciada (simulado)",
		userCreated: "Usuario creado (simulado)",
		userUpdated: "Usuario actualizado (simulado)",
		userDeleted: (name: string) => `${name} eliminado (simulado)`,
		categoryCreated: "Categoría creada (simulado)",
		categoryUpdated: "Categoría actualizada (simulado)",
		categoryDeleted: (name: string) => `${name} eliminada (simulado)`,
		productCreated: "Producto creado (simulado)",
		productUpdated: "Producto actualizado (simulado)",
		productDeleted: (name: string) => `${name} eliminado (simulado)`,
		orderAccepted: (orderId: string) => `Pedido ${orderId} aceptado (simulado)`,
		orderRejected: (orderId: string) =>
			`Pedido ${orderId} rechazado (simulado)`,
		orderSent: (productCount: number) =>
			`Pedido enviado: ${productCount} productos (simulado)`,
		reordering: (code: string) => `Repitiendo la orden ${code} (simulado)`,
		invoiceSent: (invoiceId: string) =>
			`Factura ${invoiceId} enviada por correo (simulado)`,
	},

	confirm: {
		irreversible: "Esta acción no se puede deshacer.",
	},

	emptyStates: {
		noRecords: "No hay registros para mostrar.",
	},

	auth: {
		/** Pantalla de login del cliente. */
		customer: {
			subtitle: "Inicia sesión para realizar y seguir tus pedidos",
			title: "Bienvenido",
			description: "Ingresa tus datos para continuar",
			submit: "Iniciar Sesión",
			noAccount: "¿No tienes cuenta?",
			register: "Regístrate",
			usernameLabel: "Usuario",
			usernamePlaceholder: "tu_usuario",
		},
		/** Pantalla de login del administrador. */
		admin: {
			title: "Iniciar Sesión",
			description: "Ingresa tus credenciales para continuar",
			submit: "Ingresar",
		},
		rememberMe: "Recordarme",
		forgotPassword: "¿Olvidaste tu contraseña?",
	},

	dashboard: {
		dailyTotals: "Totales del día",
		dailyGoal: "Meta del día",
		delivered: "Entregados",
		pending: "Pendientes",
		cancelled: "Cancelados",
		total: "Total",
		topProducts: "Productos más vendidos",
		topProduct: "Producto",
		salesSummary: "Resumen de ventas",
		salesPeriodLabel: "Periodo del resumen",
		periods: { dia: "Día", semana: "Semana", mes: "Mes" },
		salesDone: "Ventas realizadas",
		totalRevenue: "Ganancias totales",
		accumulatedSavings: "Ahorro acumulado",
		loyalCustomers: "Clientes fieles",
		ordersInTotal: (count: number) => `${count} pedidos en total`,
	},

	users: {
		title: "Usuarios",
		description: "Gestión de usuarios del sistema",
		newButton: "Nuevo Usuario",
		editTitle: "Editar Usuario",
		createTitle: "Nuevo Usuario",
		createSubmit: "Crear Usuario",
		searchLabel: "Buscar usuario",
		searchPlaceholder: "Buscar por nombre o correo...",
		fullName: "Nombre completo",
		fullNamePlaceholder: "Ej: Juan Pérez",
		roleLabel: "Rol",
		tableLabel: "Usuarios",
		empty: "No hay usuarios que coincidan con la búsqueda.",
		deleteTitle: "Eliminar Usuario",
		deleteMessage: {
			before: "¿Estás seguro de que deseas eliminar al usuario ",
			after: "?",
		},
	},

	categories: {
		title: "Categorías",
		description: "Organiza los productos por categoría",
		newButton: "Nueva Categoría",
		editTitle: "Editar Categoría",
		createTitle: "Nueva Categoría",
		createSubmit: "Crear Categoría",
		searchLabel: "Buscar categoría",
		searchPlaceholder: "Buscar categoría...",
		namePlaceholder: "Ej: Cafés Calientes",
		tableLabel: "Categorías",
		empty: "No hay categorías que coincidan con la búsqueda.",
		deleteTitle: "Eliminar Categoría",
		deleteMessage: {
			before: "¿Estás seguro de que deseas eliminar la categoría ",
			after: "?",
		},
	},

	products: {
		title: "Productos",
		description: "Catálogo de productos de la cafetería",
		newButton: "Nuevo Producto",
		editTitle: "Editar Producto",
		createTitle: "Nuevo Producto",
		createSubmit: "Crear Producto",
		searchLabel: "Buscar producto",
		searchPlaceholder: "Buscar producto o categoría...",
		categoryLabel: "Categoría",
		namePlaceholder: "Ej: Latte Clásico",
		descriptionLabel: "Descripción",
		descriptionPlaceholder: "Describe el producto...",
		priceLabel: "Precio (COP)",
		pricePlaceholder: "8500",
		stockLabel: "Stock",
		stockPlaceholder: "40",
		imageLabel: "Imagen del producto",
		tableLabel: "Productos",
		empty: "No hay productos que coincidan con la búsqueda.",
		deleteTitle: "Eliminar Producto",
		deleteMessage: {
			before: "¿Estás seguro de que deseas eliminar el producto ",
			after: "?",
		},
	},

	orders: {
		title: "Pedidos",
		description: "Gestión y seguimiento de pedidos del día",
		tableLabel: "Pedidos",
		empty: "No hay pedidos con esos filtros.",
		totalOrders: "Total Pedidos",
		delivered: "Entregados",
		pending: "Pendientes",
		cancelled: "Cancelados",
		/** Para lectores de pantalla: "Ver pedido #1045". */
		viewOrder: (viewLabel: string, orderId: string) =>
			`${viewLabel} pedido ${orderId}`,
		detailTitle: (orderId: string) => `Pedido ${orderId}`,
		customer: "Cliente",
		location: "Ubicación",
		orderProducts: "Productos del pedido",
		orderTotal: "Total del pedido",
		acceptTitle: "Aceptar Pedido",
		acceptMessage: {
			intro: "¿Confirmas que deseas ",
			verb: "aceptar",
			middle: " el pedido ",
			statusIntro: "? El estado cambiará a ",
			end: ".",
		},
		rejectTitle: "Rechazar Pedido",
		rejectMessage: {
			intro: "¿Confirmas que deseas ",
			verb: "rechazar",
			middle: " el pedido ",
			statusIntro: "? El estado cambiará a ",
			end: ".",
		},
		filters: {
			status: "Estado",
			date: "Fecha",
			customer: "Cliente",
			customerPlaceholder: "Nombre del cliente",
			search: "Buscar",
			searchPlaceholder: "ID o cliente",
		},
	},

	/** Pantallas "Panel Principal" y "Últimos pedidos" del cliente. */
	customerOrders: {
		homeTitle: "Panel Principal",
		homeDescription: "Resumen de tu actividad en Café Aroma.",
		totalOrders: "Pedidos totales",
		pending: "Pendientes",
		delivered: "Entregados",
		cancelled: "Cancelados",
		ctaTitle: "¿Listo para pedir?",
		ctaDescription: "Explora nuestro catálogo y realiza tu pedido en minutos.",
		ctaButton: "Solicitar ahora",
		title: "Últimos Pedidos",
		description: "Consulta el historial de tus pedidos y vuelve a realizarlos.",
		tableLabel: "Últimos pedidos",
		empty: "No tienes pedidos con esos filtros.",
		reorder: "Volver a pedir",
	},

	billing: {
		title: "Facturación",
		description: "Órdenes entregadas y facturas generadas",
		invoicesOfDay: "Facturas del día",
		totalBilled: "Total facturado",
		reportDate: "Fecha del reporte",
		invoiceTitle: (invoiceId: string) => `Factura ${invoiceId}`,
		invoiceTableLabel: (invoiceId: string) =>
			`Productos de la factura ${invoiceId}`,
		sendByEmail: "Enviar por correo",
		print: "Imprimir factura",
		deliveryLocation: "Ubicación de entrega",
		productDetail: "Detalle de productos",
		totalToPay: "Total a pagar",
		taxId: "NIT: 900.123.456-7",
		channel: "Pedidos Online",
	},

	catalog: {
		searchLabel: "Buscar productos",
		searchPlaceholder: "Buscar productos...",
		categoriesLabel: "Categorías",
		featured: "Destacados",
		catalog: "Catálogo",
		topBadge: "Top",
		soldOut: "Agotado",
		add: "Agregar",
		addProduct: (name: string) => `Agregar ${name}`,
		noResultsTitle: "No encontramos productos",
		noResultsDescription: "Prueba con otra búsqueda o categoría",
		cartTitle: "Resumen del Pedido",
		cartLabel: "Resumen del pedido",
		cartEmptyTitle: "Tu pedido está vacío",
		cartEmptyDescription: "Agrega productos del catálogo",
		productCount: "Cantidad de productos",
		total: "Total",
		checkout: "Finalizar Pedido",
		unitPrice: (formattedPrice: string) => `${formattedPrice} c/u`,
		removeOne: (name: string) => `Quitar una unidad de ${name}`,
		addOne: (name: string) => `Agregar una unidad de ${name}`,
	},

	notifications: {
		title: "Notificaciones",
		description: "Mantente al tanto del estado de tus pedidos y novedades.",
		empty: "No tienes notificaciones",
		bellLabel: (unreadCount: number) =>
			unreadCount > 0
				? `Notificaciones, ${unreadCount} sin leer`
				: "Notificaciones",
		markAsRead: (title: string) => `Marcar "${title}" como leída`,
	},
} as const;
