import { OrdenCafe } from "../model/order";

export const orderExample: Partial<OrdenCafe> = {
	numero_orden: "A001",
	fecha: new Date(),
	estado: "pendiente",
	items: [
		{
			nombre: "Americano",
			categoria: "base_de_espresso",
			precio: 6000,
			descripcion: "Espresso suavizado con agua caliente, perfecto para quienes prefieren un café más suave",
			disponible: true,
			imagen: "/images/productos/americano.jpg",
			cantidad: 2,
			total: 12000
		},
		{
			nombre: "Latte",
			categoria: "base_de_espresso",
			precio: 9000,
			descripcion: "Cremosa combinación de espresso con leche vaporizada y suave capa de espuma",
			disponible: true,
			imagen: "/images/productos/latte.jpg",
			cantidad: 1,
			total: 9000
		}
	],
	resumen: {
		subtotal: 21000,
		total: 21000
	}
}