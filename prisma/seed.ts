/**
 * Datos de prueba de Café Aroma (los mismos de las diapositivas).
 *
 * Uso: `pnpm db:seed`
 *
 * ⚠️ BORRA todos los datos de las tablas antes de insertar, para que se pueda
 * correr las veces que se quiera sin duplicar. No lo corras contra una base
 * con datos reales.
 */
import { randomBytes, scryptSync } from "node:crypto";
import { db } from "../src/common/lib/db";

// Contraseña de todos los usuarios de prueba
const SEED_PASSWORD = "CafeAroma123";

/**
 * Hashea una contraseña con scrypt (incluido en Node, sin dependencias).
 * Formato: "scrypt$<salt>$<hash>". El login tendrá que verificar con el mismo formato.
 */
const hashPassword = (password: string): string => {
	const salt = randomBytes(16).toString("hex");
	const hash = scryptSync(password, salt, 64).toString("hex");
	return `scrypt$${salt}$${hash}`;
};

/** "Cafés Calientes" → "cafes-calientes" (para las columnas `url`). */
const slugify = (text: string): string =>
	text
		.normalize("NFD")
		// NFD separa la tilde de la letra; aquí se eliminan las tildes sueltas
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)/g, "");

type RolUsuario = "administrador" | "cliente";

type SeedUser = {
	nombre: string;
	apellido: string;
	email: string;
	usuario?: string;
	rol: RolUsuario;
	activo?: boolean;
};

const ADMINS: SeedUser[] = [
	{
		nombre: "María",
		apellido: "González",
		email: "maria.gonzalez@cafearoma.co",
		rol: "administrador",
	},
	{
		nombre: "Carlos",
		apellido: "Restrepo",
		email: "carlos.restrepo@cafearoma.co",
		rol: "administrador",
	},
	{
		nombre: "Andrea",
		apellido: "Torres",
		email: "andrea.torres@cafearoma.co",
		rol: "administrador",
		activo: false,
	},
];

const CUSTOMERS: SeedUser[] = [
	{
		nombre: "Juan",
		apellido: "Moreno",
		email: "juan.moreno@correo.co",
		usuario: "juan_moreno",
		rol: "cliente",
	},
	{
		nombre: "Sofía",
		apellido: "Vargas",
		email: "sofia.vargas@correo.co",
		usuario: "sofia_vargas",
		rol: "cliente",
	},
	{
		nombre: "Diego",
		apellido: "Pineda",
		email: "diego.pineda@correo.co",
		usuario: "diego_pineda",
		rol: "cliente",
		activo: false,
	},
	{
		nombre: "María",
		apellido: "Anderson",
		email: "maria.anderson@correo.co",
		usuario: "maria_anderson",
		rol: "cliente",
	},
	{
		nombre: "Laura",
		apellido: "Patiño",
		email: "laura.patino@correo.co",
		usuario: "laura_patino",
		rol: "cliente",
	},
	{
		nombre: "Esteban",
		apellido: "Ríos",
		email: "esteban.rios@correo.co",
		usuario: "esteban_rios",
		rol: "cliente",
	},
	{
		nombre: "Valentina",
		apellido: "Cruz",
		email: "valentina.cruz@correo.co",
		usuario: "valentina_cruz",
		rol: "cliente",
	},
	{
		nombre: "Camilo",
		apellido: "Ortega",
		email: "camilo.ortega@correo.co",
		usuario: "camilo_ortega",
		rol: "cliente",
	},
	{
		nombre: "Daniela",
		apellido: "Mora",
		email: "daniela.mora@correo.co",
		usuario: "daniela_mora",
		rol: "cliente",
	},
	{
		nombre: "Felipe",
		apellido: "Castaño",
		email: "felipe.castano@correo.co",
		usuario: "felipe_castano",
		rol: "cliente",
	},
	{
		nombre: "Isabella",
		apellido: "Gómez",
		email: "isabella.gomez@correo.co",
		usuario: "isabella_gomez",
		rol: "cliente",
	},
];

const CATEGORIES = [
	{ titulo: "Cafés Calientes", activo: true },
	{ titulo: "Bebidas Frías", activo: true },
	{ titulo: "Postres", activo: true },
	{ titulo: "Panadería", activo: true },
	{ titulo: "Snacks", activo: false },
];

const unsplash = (photoId: string) =>
	`https://images.unsplash.com/photo-${photoId}?w=400&q=80&auto=format&fit=crop`;

const PRODUCTS = [
	{
		categoria: "Cafés Calientes",
		titulo: "Latte Clásico",
		descripcion: "Espresso suave con leche vaporizada y arte en la espuma.",
		precio_venta: 8500,
		stock: 40,
		imagen: unsplash("1541167760496-1628856ab772"),
	},
	{
		categoria: "Cafés Calientes",
		titulo: "Cappuccino Italiano",
		descripcion: "Equilibrio perfecto entre espresso, leche y espuma.",
		precio_venta: 9000,
		stock: 32,
		imagen: unsplash("1572442388796-11668a67e53d"),
	},
	{
		categoria: "Cafés Calientes",
		titulo: "Espresso Doble",
		descripcion: "Dos shots de espresso intenso y aromático.",
		precio_venta: 6000,
		stock: 60,
		imagen: unsplash("1510591509098-f4fdc6d0ff04"),
	},
	{
		categoria: "Cafés Calientes",
		titulo: "Matcha Latte",
		descripcion: "Té verde matcha con leche cremosa.",
		precio_venta: 11000,
		stock: 18,
		imagen: unsplash("1515823064-d6e0c04616a7"),
	},
	{
		categoria: "Bebidas Frías",
		titulo: "Frappuccino Caramelo",
		descripcion: "Café frío batido con hielo, caramelo y crema.",
		precio_venta: 12500,
		stock: 25,
		imagen: unsplash("1461023058943-07fcbe16d735"),
	},
	{
		categoria: "Bebidas Frías",
		titulo: "Cold Brew Vainilla",
		descripcion: "Café infusionado en frío por 18 horas con vainilla.",
		precio_venta: 10500,
		stock: 22,
		imagen: unsplash("1517701604599-bb29b565090c"),
	},
	{
		categoria: "Postres",
		titulo: "Muffin de Arándanos",
		descripcion: "Muffin esponjoso con arándanos frescos.",
		precio_venta: 5500,
		stock: 15,
		imagen: unsplash("1607958996333-41aef7caefaa"),
	},
	{
		categoria: "Postres",
		titulo: "Cheesecake de Frutos Rojos",
		descripcion: "Cheesecake cremoso con salsa de frutos rojos.",
		precio_venta: 9500,
		stock: 8,
		imagen: unsplash("1533134242443-d4fd215305ad"),
	},
	{
		categoria: "Postres",
		titulo: "Brownie de Chocolate",
		descripcion: "Brownie húmedo de chocolate semiamargo.",
		precio_venta: 6500,
		stock: 12,
		imagen: unsplash("1606313564200-e75d5e30476c"),
	},
	{
		categoria: "Panadería",
		titulo: "Croissant de Mantequilla",
		descripcion: "Croissant hojaldrado horneado cada mañana.",
		precio_venta: 4500,
		stock: 30,
		imagen: unsplash("1555507036-ab1f4038808a"),
	},
	{
		categoria: "Snacks",
		titulo: "Cookies de Chocolate",
		descripcion: "Galletas crocantes con chips de chocolate.",
		precio_venta: 3500,
		stock: 50,
		imagen: unsplash("1499636136210-6f4ee915583e"),
	},
	{
		categoria: "Snacks",
		titulo: "Donuts Glaseadas",
		descripcion: "Donas suaves con glaseado de colores.",
		precio_venta: 4000,
		stock: 28,
		imagen: unsplash("1551024601-bec78aea704b"),
		activo: false,
	},
	// Sin stock a propósito: así el catálogo del cliente muestra "Agotado"
	{
		categoria: "Postres",
		titulo: "Cupcake de Caramelo",
		descripcion: "Cupcake con buttercream de caramelo salado.",
		precio_venta: 5000,
		stock: 0,
		imagen: unsplash("1576618148400-f54bed99fcfd"),
	},
];

type EstadoPedido = "solicitado" | "pendiente" | "entregado" | "cancelado";

const ORDERS: {
	clienteEmail: string;
	direccion: string;
	estado: EstadoPedido;
	items: { producto: string; cantidad: number }[];
}[] = [
	{
		clienteEmail: "laura.patino@correo.co",
		direccion: "Calle 72 # 11-30, Chapinero",
		estado: "solicitado",
		items: [
			{ producto: "Latte Clásico", cantidad: 2 },
			{ producto: "Muffin de Arándanos", cantidad: 1 },
		],
	},
	{
		clienteEmail: "esteban.rios@correo.co",
		direccion: "Av. Caracas # 14-45, Centro",
		estado: "solicitado",
		items: [{ producto: "Frappuccino Caramelo", cantidad: 1 }],
	},
	{
		clienteEmail: "valentina.cruz@correo.co",
		direccion: "Calle 100 # 45-20, Usaquén",
		estado: "pendiente",
		items: [
			{ producto: "Cappuccino Italiano", cantidad: 2 },
			{ producto: "Frappuccino Caramelo", cantidad: 1 },
		],
	},
	{
		clienteEmail: "camilo.ortega@correo.co",
		direccion: "Cra 7 # 115-30, Norte",
		estado: "pendiente",
		items: [
			{ producto: "Matcha Latte", cantidad: 1 },
			{ producto: "Cheesecake de Frutos Rojos", cantidad: 1 },
		],
	},
	{
		clienteEmail: "daniela.mora@correo.co",
		direccion: "Calle 85 # 12-50, Chapinero",
		estado: "entregado",
		items: [
			{ producto: "Espresso Doble", cantidad: 2 },
			{ producto: "Brownie de Chocolate", cantidad: 1 },
		],
	},
	{
		clienteEmail: "felipe.castano@correo.co",
		direccion: "Cra 11 # 93-77, Chicó",
		estado: "entregado",
		items: [
			{ producto: "Latte Clásico", cantidad: 1 },
			{ producto: "Brownie de Chocolate", cantidad: 1 },
		],
	},
	{
		clienteEmail: "isabella.gomez@correo.co",
		direccion: "Calle 127 # 20-15, Suba",
		estado: "cancelado",
		items: [{ producto: "Cheesecake de Frutos Rojos", cantidad: 1 }],
	},
	{
		clienteEmail: "maria.anderson@correo.co",
		direccion: "Calle 93 # 14-20, Chicó",
		estado: "entregado",
		items: [
			{ producto: "Frappuccino Caramelo", cantidad: 1 },
			{ producto: "Muffin de Arándanos", cantidad: 1 },
		],
	},
	{
		clienteEmail: "maria.anderson@correo.co",
		direccion: "Calle 93 # 14-20, Chicó",
		estado: "pendiente",
		items: [
			{ producto: "Cappuccino Italiano", cantidad: 1 },
			{ producto: "Croissant de Mantequilla", cantidad: 1 },
		],
	},
];

const NOTIFICATIONS = [
	{
		titulo: "Pedido entregado",
		mensaje: "Tu pedido ha sido entregado.",
		leida: false,
	},
	{
		titulo: "Pedido en preparación",
		mensaje: "Tu pedido está siendo preparado.",
		leida: false,
	},
	{
		titulo: "Promoción disponible",
		mensaje: "2x1 en Frappuccinos este viernes.",
		leida: true,
	},
	{
		titulo: "Stock actualizado",
		mensaje: "Latte de Avellana disponible nuevamente.",
		leida: true,
	},
];

type Tx = Parameters<Parameters<typeof db.transaction>[0]>[0];

/** Borra todo en orden inverso a las relaciones (primero los hijos, luego los padres). */
const clearTables = async (tx: Tx) => {
	await tx.orm.public.pedido_items.where((row) => row.id.gt(0)).delete();
	await tx.orm.public.notificaciones.where((row) => row.id.gt(0)).delete();
	await tx.orm.public.pedidos.where((row) => row.id.gt(0)).delete();
	await tx.orm.public.productos.where((row) => row.id.gt(0)).delete();
	await tx.orm.public.categorias.where((row) => row.id.gt(0)).delete();
	await tx.orm.public.usuarios.where((row) => row.id.gt(0)).delete();
};

/** Crea personal y clientes. Devuelve un mapa email → id. */
const seedUsers = async (tx: Tx): Promise<Map<string, number>> => {
	const idsByEmail = new Map<string, number>();

	for (const user of [...ADMINS, ...CUSTOMERS]) {
		const created = await tx.orm.public.usuarios.create({
			nombre: user.nombre,
			apellido: user.apellido,
			email: user.email,
			usuario: user.usuario ?? null,
			contrasena: hashPassword(SEED_PASSWORD),
			rol: user.rol,
			activo: user.activo ?? true,
		});
		idsByEmail.set(user.email, created.id);
	}

	return idsByEmail;
};

/** Crea categorías. Devuelve un mapa título → id. */
const seedCategories = async (
	tx: Tx,
	adminId: number,
): Promise<Map<string, number>> => {
	const idsByTitle = new Map<string, number>();

	for (const category of CATEGORIES) {
		const created = await tx.orm.public.categorias.create({
			titulo: category.titulo,
			url: slugify(category.titulo),
			activo: category.activo,
			creado_por_id: adminId,
		});
		idsByTitle.set(category.titulo, created.id);
	}

	return idsByTitle;
};

/** Crea productos. Devuelve un mapa título → { id, precio }. */
const seedProducts = async (
	tx: Tx,
	adminId: number,
	categoryIds: Map<string, number>,
): Promise<Map<string, { id: number; precio: number }>> => {
	const productsByTitle = new Map<string, { id: number; precio: number }>();

	for (const product of PRODUCTS) {
		const categoryId = categoryIds.get(product.categoria);
		if (!categoryId)
			throw new Error(`Categoría inexistente: ${product.categoria}`);

		const created = await tx.orm.public.productos.create({
			categoria_id: categoryId,
			titulo: product.titulo,
			descripcion: product.descripcion,
			url: slugify(product.titulo),
			// Costo aproximado del 40% del precio de venta
			precio_compra: Math.round(product.precio_venta * 0.4),
			precio_venta: product.precio_venta,
			stock: product.stock,
			imagen: product.imagen,
			activo: product.activo ?? true,
			creado_por_id: adminId,
		});
		productsByTitle.set(product.titulo, {
			id: created.id,
			precio: product.precio_venta,
		});
	}

	return productsByTitle;
};

/** Crea los pedidos con sus items. El total se calcula desde los items. */
const seedOrders = async (
	tx: Tx,
	userIds: Map<string, number>,
	products: Map<string, { id: number; precio: number }>,
) => {
	for (const order of ORDERS) {
		const customerId = userIds.get(order.clienteEmail);
		if (!customerId)
			throw new Error(`Cliente inexistente: ${order.clienteEmail}`);

		const items = order.items.map((item) => {
			const product = products.get(item.producto);
			if (!product) throw new Error(`Producto inexistente: ${item.producto}`);
			return {
				producto_id: product.id,
				cantidad: item.cantidad,
				precio_unitario: product.precio,
			};
		});
		const total = items.reduce(
			(sum, item) => sum + item.cantidad * item.precio_unitario,
			0,
		);

		const created = await tx.orm.public.pedidos.create({
			usuario_id: customerId,
			direccion: order.direccion,
			estado: order.estado,
			total,
			creado_por_id: customerId,
		});

		for (const item of items) {
			await tx.orm.public.pedido_items.create({
				pedido_id: created.id,
				...item,
			});
		}
	}
};

/** Notificaciones de ejemplo para la clienta María Anderson. */
const seedNotifications = async (tx: Tx, customerId: number) => {
	for (const notification of NOTIFICATIONS) {
		await tx.orm.public.notificaciones.create({
			usuario_id: customerId,
			...notification,
		});
	}
};

const main = async () => {
	// Todo en una transacción: si algo falla, la base queda como estaba
	await db.transaction(async (tx) => {
		await clearTables(tx);

		const userIds = await seedUsers(tx);
		const adminId = userIds.get("maria.gonzalez@cafearoma.co");
		const customerId = userIds.get("maria.anderson@correo.co");
		if (!adminId || !customerId)
			throw new Error("Faltan los usuarios base del seed");

		const categoryIds = await seedCategories(tx, adminId);
		const products = await seedProducts(tx, adminId, categoryIds);
		await seedOrders(tx, userIds, products);
		await seedNotifications(tx, customerId);
	});

	console.log(
		`Seed listo: ${ADMINS.length + CUSTOMERS.length} usuarios, ${CATEGORIES.length} categorías, ` +
			`${PRODUCTS.length} productos, ${ORDERS.length} pedidos, ${NOTIFICATIONS.length} notificaciones.`,
	);
	console.log(`Contraseña de todos los usuarios: ${SEED_PASSWORD}`);
};

main()
	.catch((error) => {
		console.error(error);
		process.exitCode = 1;
	})
	// Cerrar el pool de conexiones para que el script termine
	.finally(() => db.close());
