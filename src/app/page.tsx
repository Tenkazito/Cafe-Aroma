import { redirect } from "next/navigation";

// La raíz no tiene contenido propio: el punto de entrada es el login del cliente
const HomePage = () => {
	redirect("/login");
};

export default HomePage;
