import { Product } from '../model/product';

export const productsList: Partial<Product>[] = [
    	// BASE DE ESPRESSO
	{ 
		nombre: 'Espresso', 
		categoria: 'base_de_espresso', 
		precio: 5500, 
		descripcion: 'Café espresso italiano clásico, intenso y aromático preparado con granos seleccionados', 
		disponible: true, 
		imagen: '/images/productos/espresso.jpg' 
	},
	{ 
		nombre: 'Americano', 
		categoria: 'base_de_espresso', 
		precio: 6000, 
		descripcion: 'Espresso suavizado con agua caliente, perfecto para quienes prefieren un café más suave', 
		disponible: true, 
		imagen: '/images/productos/americano.jpg' 
	},
	{ 
		nombre: 'Campesino', 
		categoria: 'base_de_espresso', 
		precio: 6500, 
		descripcion: 'Tradicional café colombiano con toque de canela y panela, dulce y reconfortante', 
		disponible: true, 
		imagen: '/images/productos/campesino.jpg' 
	},
	{ 
		nombre: 'Café Especial', 
		categoria: 'base_de_espresso', 
		precio: 6500, 
		descripcion: 'Café aromático con mezcla especial de anís, clavos, canela y cardamomo', 
		disponible: true, 
		imagen: '/images/productos/cafe-especial.jpg' 
	},
	{ 
		nombre: 'Café Bom Bom', 
		categoria: 'base_de_espresso', 
		precio: 7000, 
		descripcion: 'Espresso servido sobre leche condensada creando capas visuales y sabor dulce intenso', 
		disponible: true, 
		imagen: '/images/productos/cafe-bom-bom.jpg' 
	},
	{ 
		nombre: 'Macchiato 4oz', 
		categoria: 'base_de_espresso', 
		precio: 6500, 
		descripcion: 'Espresso intenso con un toque de leche espumada, la proporción perfecta 90/10', 
		disponible: true, 
		imagen: '/images/productos/macchiato.jpg' 
	},
	{ 
		nombre: 'Latte', 
		categoria: 'base_de_espresso', 
		precio: 9000, 
		descripcion: 'Cremosa combinación de espresso con leche vaporizada y suave capa de espuma', 
		disponible: true, 
		imagen: '/images/productos/latte.jpg' 
	},
	{ 
		nombre: 'Capuccino', 
		categoria: 'base_de_espresso', 
		precio: 9000, 
		descripcion: 'Clásico italiano con partes iguales de espresso, leche y espuma cremosa', 
		disponible: true, 
		imagen: '/images/productos/capuccino.jpg' 
	},
	{ 
		nombre: 'Capuccino Chai', 
		categoria: 'base_de_espresso', 
		precio: 11000, 
		descripcion: 'Fusión exótica de espresso doble con leche y especias chai aromáticas', 
		disponible: true, 
		imagen: '/images/productos/capuccino-chai.jpg' 
	},
	{ 
		nombre: 'Capuccino Vienés', 
		categoria: 'base_de_espresso', 
		precio: 11000, 
		descripcion: 'Elegante capuccino coronado con generosa crema chantilly', 
		disponible: true, 
		imagen: '/images/productos/capuccino-vienes.jpg' 
	},
	{ 
		nombre: 'Flat White', 
		categoria: 'base_de_espresso', 
		precio: 9000, 
		descripcion: 'Especialidad australiana con doble ristretto y microespuma de leche aterciopelada', 
		disponible: true, 
		imagen: '/images/productos/flat-white.jpg' 
	},
	{ 
		nombre: 'Mocaccino', 
		categoria: 'base_de_espresso', 
		precio: 9500, 
		descripcion: 'Deliciosa mezcla de espresso, leche vaporizada y chocolate, el favorito de los amantes del dulce', 
		disponible: true, 
		imagen: '/images/productos/mocaccino.jpg' 
	},
	{ 
		nombre: 'Affogato', 
		categoria: 'base_de_espresso', 
		precio: 9500, 
		descripcion: 'Postre italiano con helado de vainilla artesanal bañado en espresso caliente', 
		disponible: true, 
		imagen: '/images/productos/affogato.jpg' 
	},
	{ 
		nombre: 'Frappe de Café', 
		categoria: 'base_de_espresso', 
		precio: 9500, 
		descripcion: 'Refrescante café helado batido con hielo, perfecto para días calurosos', 
		disponible: true, 
		imagen: '/images/productos/frappe-cafe.jpg' 
	},
	{ 
		nombre: 'Shakerato', 
		categoria: 'base_de_espresso', 
		precio: 9000, 
		descripcion: 'Espresso agitado con hielo y toque cítrico de limón, energizante y refrescante', 
		disponible: true, 
		imagen: '/images/productos/shakerato.jpg' 
	},
	{ 
		nombre: 'Orange Coffee', 
		categoria: 'base_de_espresso', 
		precio: 14000, 
		descripcion: 'Innovadora combinación de espresso con jugo de naranja fresca, sorprendente y revitalizante', 
		disponible: true, 
		imagen: '/images/productos/orange-coffee.jpg' 
	},
 
	// BEBIDAS FRIAS
	{ 
		nombre: 'Malteada de Café', 
		categoria: 'bebida_fria', 
		precio: 15000, 
		descripcion: 'Cremosa malteada con helado y café, batida hasta lograr textura perfecta', 
		disponible: true, 
		imagen: '/images/productos/malteada-cafe.jpg' 
	},
	{ 
		nombre: 'Malteada de Milo', 
		categoria: 'bebida_fria', 
		precio: 16000, 
		descripcion: 'Clásica malteada colombiana con el sabor inconfundible de Milo y helado', 
		disponible: true, 
		imagen: '/images/productos/malteada-milo.jpg' 
	},
	{ 
		nombre: 'Malteada de Vainilla', 
		categoria: 'bebida_fria', 
		precio: 15000, 
		descripcion: 'Suave y dulce malteada de helado de vainilla natural', 
		disponible: true, 
		imagen: '/images/productos/malteada-vainilla.jpg' 
	},
	{ 
		nombre: 'Malteada de Chocolate', 
		categoria: 'bebida_fria', 
		precio: 15000, 
		descripcion: 'Irresistible malteada de chocolate belga con helado premium', 
		disponible: true, 
		imagen: '/images/productos/malteada-chocolate.jpg' 
	},
	{ 
		nombre: 'Limonada de Coco', 
		categoria: 'bebida_fria', 
		precio: 15000, 
		descripcion: 'Exótica combinación tropical de limón fresco con crema de coco', 
		disponible: true, 
		imagen: '/images/productos/limonada-coco.jpg' 
	},
	{ 
		nombre: 'Limonada de Yerbabuena', 
		categoria: 'bebida_fria', 
		precio: 9000, 
		descripcion: 'Refrescante limonada natural con hojas frescas de yerbabuena', 
		disponible: true, 
		imagen: '/images/productos/limonada-yerbabuena.jpg' 
	},
	{ 
		nombre: 'Limonada Natural', 
		categoria: 'bebida_fria', 
		precio: 7500, 
		descripcion: 'Limonada clásica preparada con limones frescos recién exprimidos', 
		disponible: true, 
		imagen: '/images/productos/limonada-natural.jpg' 
	},
	{ 
		nombre: 'Salads', 
		categoria: 'bebida_fria', 
		precio: 9500, 
		descripcion: 'Mezcla refrescante de jugos naturales de maracuyá, lulo y mora', 
		disponible: true, 
		imagen: '/images/productos/salads.jpg' 
	},
	{ 
		nombre: 'Milo Frio', 
		categoria: 'bebida_fria', 
		precio: 9500, 
		descripcion: 'Bebida fría energizante con Milo y leche, perfecta para cualquier momento', 
		disponible: true, 
		imagen: '/images/productos/milo-frio.jpg' 
	},
	{ 
		nombre: 'Chai Frio', 
		categoria: 'bebida_fria', 
		precio: 9500, 
		descripcion: 'Té chai especiado servido frío con leche, aromático y refrescante', 
		disponible: true, 
		imagen: '/images/productos/chai-frio.jpg' 
	},
	{ 
		nombre: 'Jugo en Agua', 
		categoria: 'bebida_fria', 
		precio: 8500, 
		descripcion: 'Jugo natural de frutas frescas preparado en agua, ligero y saludable', 
		disponible: true, 
		imagen: '/images/productos/jugo-agua.jpg' 
	},
	{ 
		nombre: 'Jugo en Leche', 
		categoria: 'bebida_fria', 
		precio: 9500, 
		descripcion: 'Nutritivo jugo de frutas naturales batido con leche fresca', 
		disponible: true, 
		imagen: '/images/productos/jugo-leche.jpg' 
	},
	{ 
		nombre: 'Cerveza Club Colombia', 
		categoria: 'bebida_fria', 
		precio: 8000, 
		descripcion: 'Cerveza premium colombiana bien fría, ideal para acompañar', 
		disponible: true, 
		imagen: '/images/productos/cerveza-club-colombia.jpg' 
	},
	{ 
		nombre: 'Cerveza Terracruzz', 
		categoria: 'bebida_fria', 
		precio: 7500, 
		descripcion: 'Cerveza artesanal colombiana con carácter y sabor único', 
		disponible: true, 
		imagen: '/images/productos/cerveza-terracruzz.jpg' 
	},
	{ 
		nombre: 'Bretaña en Botella', 
		categoria: 'bebida_fria', 
		precio: 6500, 
		descripcion: 'Gaseosa Bretaña en botella de vidrio, refrescante y nostálgica', 
		disponible: true, 
		imagen: '/images/productos/bretana-botella.jpg' 
	},
	{ 
		nombre: 'Agua en Botella', 
		categoria: 'bebida_fria', 
		precio: 5500, 
		descripcion: 'Agua mineral embotellada, pura y refrescante', 
		disponible: true, 
		imagen: '/images/productos/agua-botella.jpg' 
	},
 
	// BEBIDAS CALIENTES SIN CAFÉ
	{ 
		nombre: 'Té Negro', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 6500, 
		descripcion: 'Selección de tés premium: negro clásico, herbal aromático o frutal dulce', 
		disponible: true, 
		imagen: '/images/productos/te-negro.jpg' 
	},
	{ 
		nombre: 'Infusión Aromática', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 8500, 
		descripcion: 'Infusión de hierbas naturales con propiedades relajantes y digestivas', 
		disponible: true, 
		imagen: '/images/productos/infusion-aromatica.jpg' 
	},
	{ 
		nombre: 'Milo Caliente', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 9000, 
		descripcion: 'Reconfortante bebida caliente de Milo con leche, energizante y deliciosa', 
		disponible: true, 
		imagen: '/images/productos/milo-caliente.jpg' 
	},
	{ 
		nombre: 'Chocolate en Agua', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 8000, 
		descripcion: 'Chocolate tradicional colombiano preparado en agua, puro y aromático', 
		disponible: true, 
		imagen: '/images/productos/chocolate-agua.jpg' 
	},
	{ 
		nombre: 'Chocolate en Leche', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 9500, 
		descripcion: 'Cremoso chocolate caliente preparado con leche fresca y cacao de calidad', 
		disponible: true, 
		imagen: '/images/productos/chocolate-leche.jpg' 
	},
	{ 
		nombre: 'Chocolate + Masmelos', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 9500, 
		descripcion: 'Chocolate caliente coronado con esponjosos malvaviscos, una delicia reconfortante', 
		disponible: true, 
		imagen: '/images/productos/chocolate-masmelos.jpg' 
	},
	{ 
		nombre: 'Té Chai en Agua', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 7500, 
		descripcion: 'Té chai con especias tradicionales indias preparado en agua', 
		disponible: true, 
		imagen: '/images/productos/chai-agua.jpg' 
	},
	{ 
		nombre: 'Té Chai en Leche', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 9500, 
		descripcion: 'Aromático chai latte con especias y leche vaporizada al estilo tradicional', 
		disponible: true, 
		imagen: '/images/productos/chai-leche.jpg' 
	},
	{ 
		nombre: 'Agua de Panela', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 8500, 
		descripcion: 'Tradicional bebida colombiana de panela disuelta en agua caliente con limón', 
		disponible: true, 
		imagen: '/images/productos/agua-panela.jpg' 
	},
	{ 
		nombre: 'Agua de Panela con Queso', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 9500, 
		descripcion: 'Clásico paisa: agua de panela caliente acompañada con queso campesino', 
		disponible: true, 
		imagen: '/images/productos/agua-panela-queso.jpg' 
	},
	{ 
		nombre: 'Leche caliente con Canela', 
		categoria: 'bebida_caliente_sin_cafe', 
		precio: 6500, 
		descripcion: 'Reconfortante leche caliente aromatizada con canela en rama', 
		disponible: true, 
		imagen: '/images/productos/leche-canela.jpg' 
	},
 
	// PASTELERÍA DE SAL
	{ 
		nombre: 'Empanadas Horneadas', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Empanadas artesanales horneadas con relleno de carne o pollo jugoso', 
		disponible: true, 
		imagen: '/images/productos/empanadas-horneadas.jpg' 
	},
	{ 
		nombre: 'Pastel de Pollo', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Hojaldre crujiente relleno de pollo desmenuzado en salsa cremosa', 
		disponible: true, 
		imagen: '/images/productos/pastel-pollo.jpg' 
	},
	{ 
		nombre: 'Croissant Queso Paipa', 
		categoria: 'comida', 
		precio: 8000, 
		descripcion: 'Croissant francés mantecoso relleno de auténtico queso Paipa', 
		disponible: true, 
		imagen: '/images/productos/croissant-queso-paipa.jpg' 
	},
	{ 
		nombre: 'Palito de Queso', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Masa hojaldre enrollada con queso derretido, crujiente y dorado', 
		disponible: true, 
		imagen: '/images/productos/palito-queso.jpg' 
	},
	{ 
		nombre: 'Empanada/Pastel Veggie', 
		categoria: 'comida', 
		precio: 8000, 
		descripcion: 'Opción vegetariana horneada con relleno de verduras frescas y especias', 
		disponible: true, 
		imagen: '/images/productos/empanada-veggie.jpg' 
	},
	{ 
		nombre: 'Croissant de Almendras', 
		categoria: 'comida', 
		precio: 12500, 
		descripcion: 'Croissant artesanal relleno de crema de almendras y cubierto con almendras laminadas', 
		disponible: true, 
		imagen: '/images/productos/croissant-almendras.jpg' 
	},
 
	// PASTELERÍA DULCE
	{ 
		nombre: 'Torta Red Velvet', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Torta aterciopelada de cacao con frosting de queso crema, un clásico americano', 
		disponible: true, 
		imagen: '/images/productos/torta-red-velvet.jpg' 
	},
	{ 
		nombre: 'Torta de Chocolate Ferrero', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Decadente torta de chocolate decorada con Ferrero Rocher y ganache', 
		disponible: true, 
		imagen: '/images/productos/torta-chocolate-ferrero.jpg' 
	},
	{ 
		nombre: 'Cheese Cake de Frutos Rojos', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Suave cheesecake estilo Nueva York coronado con salsa de frutos rojos frescos', 
		disponible: true, 
		imagen: '/images/productos/cheesecake-frutos-rojos.jpg' 
	},
	{ 
		nombre: 'Torta de Arándanos', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Esponjosa torta con arándanos frescos y glaseado de limón', 
		disponible: true, 
		imagen: '/images/productos/torta-arandanos.jpg' 
	},
	{ 
		nombre: 'Torta de Almojábana', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Torta tradicional colombiana con queso y almidón de yuca, húmeda y deliciosa', 
		disponible: true, 
		imagen: '/images/productos/torta-almojabana.jpg' 
	},
	{ 
		nombre: 'Torta de Chocolate sin azúcar', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Torta de chocolate premium endulzada con edulcorantes naturales, apta para diabéticos', 
		disponible: true, 
		imagen: '/images/productos/torta-chocolate-sin-azucar.jpg' 
	},
	{ 
		nombre: 'Torta de Zanahoria sin azúcar', 
		categoria: 'comida', 
		precio: 12000, 
		descripcion: 'Saludable torta de zanahoria especiada sin azúcar añadida, con frosting ligero', 
		disponible: true, 
		imagen: '/images/productos/torta-zanahoria-sin-azucar.jpg' 
	},
	{ 
		nombre: 'Rollo de Canela', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Esponjoso rollo de masa dulce con canela y glaseado cremoso', 
		disponible: true, 
		imagen: '/images/productos/rollo-canela.jpg' 
	},
	{ 
		nombre: 'Eclair', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Clásico pastel francés de masa choux relleno de crema pastelera y cubierto de chocolate', 
		disponible: true, 
		imagen: '/images/productos/eclair.jpg' 
	},
	{ 
		nombre: 'Mini Pie de Chocolate', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Pequeña tarta con base crocante y relleno de chocolate intenso', 
		disponible: true, 
		imagen: '/images/productos/mini-pie-chocolate.jpg' 
	},
	{ 
		nombre: 'Alfajor', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Delicado sándwich de galletas relleno de dulce de leche y coco rallado', 
		disponible: true, 
		imagen: '/images/productos/alfajor.jpg' 
	},
	{ 
		nombre: 'Golden Brownie', 
		categoria: 'comida', 
		precio: 7000, 
		descripcion: 'Brownie rubio con trozos de chocolate blanco y nueces, denso y dulce', 
		disponible: true, 
		imagen: '/images/productos/golden-brownie.jpg' 
	},
	{ 
		nombre: 'Galletas', 
		categoria: 'comida', 
		precio: 6000, 
		descripcion: 'Surtido de galletas artesanales recién horneadas con diferentes sabores', 
		disponible: true, 
		imagen: '/images/productos/galletas.jpg' 
	},
]