# Soluciones de Mongoose para Modelos con Elementos en Común

Basado en la documentación oficial de Mongoose, existen **3 soluciones principales** cuando múltiples modelos comparten campos o estructuras:

---

## 🎯 Solución 1: DISCRIMINATORS (Herencia de Schemas) - RECOMENDADA

### ¿Qué son?
Los **Discriminators** son un mecanismo de herencia de schemas en Mongoose. Permiten tener múltiples modelos con schemas superpuestos sobre la **misma colección de MongoDB**.

### ¿Cuándo usarlos?
- Cuando tienes entidades que comparten campos base pero algunas tienen campos adicionales específicos
- Cuando quieres almacenar diferentes tipos de documentos en una sola colección
- Cuando existe una relación "es un" (is-a) clara entre tus entidades

### Ejemplo Práctico: Menú de Rodson Coffee

```javascript
const { Schema, model } = require('mongoose');

// 1. SCHEMA BASE: Campos comunes a TODOS los items del menú
const baseOptions = {
    discriminatorKey: 'categoria', // Campo que identifica el tipo
    collection: 'menuItems'         // Todos en la misma colección
};

const menuItemSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
    destacado: { type: Boolean, default: false }
}, baseOptions);

// 2. MODELO BASE
const MenuItem = model('MenuItem', menuItemSchema);

// 3. DISCRIMINATORS: Modelos especializados que heredan del base
// Bebidas base de espresso (sin campos adicionales)
const BaseEspresso = MenuItem.discriminator('BaseEspresso', 
    new Schema({})
);

// Métodos de filtrado (con campos adicionales)
const MetodoFiltrado = MenuItem.discriminator('MetodoFiltrado',
    new Schema({
        metodos: [String],
        precios: {
            unaTaza: Number,
            dosTazas: Number
        },
        adicionales: Schema.Types.Mixed
    })
);

// Bebidas con alcohol (con campo de graduación alcohólica)
const Alicorado = MenuItem.discriminator('Alicorado',
    new Schema({
        gradoAlcoholico: Number,
        ingredientesLicor: [String]
    })
);

// Pastelería (con información nutricional)
const Pasteleria = MenuItem.discriminator('Pasteleria',
    new Schema({
        calorias: Number,
        alergenos: [String],
        vegetariano: Boolean
    })
);
```

### Cómo funciona internamente

Mongoose agrega automáticamente un campo `discriminatorKey` (en este caso `categoria`) a cada documento:

```javascript
// Al crear documentos:
const espresso = new BaseEspresso({
    nombre: "Espresso",
    descripcion: "Shot concentrado",
    precio: 5500
});
// Se guarda como: { categoria: "BaseEspresso", nombre: "Espresso", ... }

const carajillo = new Alicorado({
    nombre: "Carajillo",
    descripcion: "Café + Whisky",
    precio: 13000,
    gradoAlcoholico: 40
});
// Se guarda como: { categoria: "Alicorado", nombre: "Carajillo", gradoAlcoholico: 40, ... }
```

### Ventajas de Discriminators

✅ **DRY (Don't Repeat Yourself)**: No repites los campos comunes
✅ **Una sola colección**: Todos los documentos en `menuItems`
✅ **Validaciones específicas**: Cada discriminator puede tener sus propias validaciones
✅ **Herencia real**: Los discriminators heredan métodos, statics y virtuals del schema base
✅ **Queries simples**: Puedes consultar todos los items o filtrar por tipo

### Ejemplos de uso

```javascript
// Obtener TODOS los items del menú
const todosLosItems = await MenuItem.find();

// Obtener solo bebidas base de espresso
const espressos = await BaseEspresso.find();

// Obtener solo items disponibles de cualquier tipo
const disponibles = await MenuItem.find({ disponible: true });

// Obtener items por categoría específica
const alicorados = await MenuItem.find({ categoria: 'Alicorado' });

// Crear un nuevo item
const nuevoEspresso = new BaseEspresso({
    nombre: "Americano",
    descripcion: "Espresso con agua",
    precio: 6000
});
await nuevoEspresso.save();
```

---

## 🎯 Solución 2: SCHEMA BASE + Referencias (Sin Discriminators)

Si no quieres usar discriminators pero aún quieres compartir lógica:

```javascript
// Schema base compartido
const baseMenuItemFields = {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    disponible: { type: Boolean, default: true }
};

// Usar el spread operator para reutilizar campos
const espressoSchema = new Schema({
    ...baseMenuItemFields,
    intensidad: Number
});

const pasteleriaSchema = new Schema({
    ...baseMenuItemFields,
    calorias: Number,
    alergenos: [String]
});

const Espresso = model('Espresso', espressoSchema);
const Pasteleria = model('Pasteleria', pasteleriaSchema);
```

### ⚠️ Desventajas de este enfoque
- Múltiples colecciones (espressos, pastelerias, etc.)
- No hay herencia real de métodos
- Queries más complejas para obtener "todo el menú"
- Más difícil mantener consistencia

---

## 🎯 Solución 3: PLUGINS (Para lógica compartida)

Cuando quieres compartir **comportamiento** (no solo campos) entre múltiples schemas:

```javascript
// Plugin que agrega timestamps y métodos comunes
function menuItemPlugin(schema) {
    // Agregar campos
    schema.add({
        disponible: { type: Boolean, default: true },
        destacado: { type: Boolean, default: false }
    });
    
    // Agregar métodos de instancia
    schema.methods.marcarComoAgotado = function() {
        this.disponible = false;
        return this.save();
    };
    
    // Agregar métodos estáticos
    schema.statics.buscarDisponibles = function() {
        return this.find({ disponible: true });
    };
}

// Aplicar el plugin a varios schemas
const espressoSchema = new Schema({ nombre: String, precio: Number });
espressoSchema.plugin(menuItemPlugin);

const pasteleriaSchema = new Schema({ nombre: String, calorias: Number });
pasteleriaSchema.plugin(menuItemPlugin);
```

---

## 📊 Comparación de Soluciones

| Característica | Discriminators | Schema Base + Spread | Plugins |
|---------------|----------------|---------------------|---------|
| **Campos compartidos** | ✅ Heredados | ⚠️ Copiados | ✅ Agregados |
| **Una colección** | ✅ Sí | ❌ No | ❌ No |
| **Métodos heredados** | ✅ Sí | ❌ No | ✅ Sí |
| **Validaciones específicas** | ✅ Sí | ✅ Sí | ✅ Sí |
| **Queries simples** | ✅ Muy simple | ❌ Complejo | ⚠️ Medio |
| **Mantenimiento** | ✅ Fácil | ⚠️ Medio | ✅ Fácil |
| **Ideal para** | Jerarquías | Schemas independientes | Comportamiento común |

---

## 🎯 Recomendación para tu Menú de Rodson Coffee

**Usa DISCRIMINATORS** porque:

1. ✅ Todos tus items comparten: nombre, descripcion, precio
2. ✅ Algunos tienen campos extra (métodos de filtrado, alicorados)
3. ✅ Quieres mantener todo en una colección
4. ✅ Existe una relación clara: "Todo es un MenuItem, pero algunos son Alicorados"
5. ✅ Facilita queries como "dame todo el menú disponible"

---

## 💻 Implementación Práctica para Rodson Coffee

### Estructura de archivos:

```
MVC/models/
├── MenuItem.js           # Schema base
├── discriminators/
│   ├── BaseEspresso.js   # Discriminator
│   ├── Alicorado.js      # Discriminator
│   ├── Pasteleria.js     # Discriminator
│   └── MetodoFiltrado.js # Discriminator
└── InformacionGeneral.js # Para contacto, catas, etc.
```

### MenuItem.js (Base)
```javascript
const { Schema, model } = require('mongoose');

const menuItemSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    disponible: { type: Boolean, default: true },
    destacado: { type: Boolean, default: false },
    imagen: String,
    etiquetas: [String]
}, {
    discriminatorKey: 'categoria',
    collection: 'menuItems',
    timestamps: true
});

// Métodos compartidos por TODOS los items
menuItemSchema.methods.marcarAgotado = function() {
    this.disponible = false;
    return this.save();
};

menuItemSchema.statics.buscarDestacados = function() {
    return this.find({ destacado: true, disponible: true });
};

module.exports = model('MenuItem', menuItemSchema);
```

### discriminators/BaseEspresso.js
```javascript
const MenuItem = require('../MenuItem');
const { Schema } = require('mongoose');

const baseEspressoSchema = new Schema({
    intensidad: {
        type: Number,
        min: 1,
        max: 5
    },
    conLeche: {
        type: Boolean,
        default: false
    }
});

module.exports = MenuItem.discriminator('BaseEspresso', baseEspressoSchema);
```

### discriminators/Alicorado.js
```javascript
const MenuItem = require('../MenuItem');
const { Schema } = require('mongoose');

const alicoradoSchema = new Schema({
    gradoAlcoholico: {
        type: Number,
        required: true
    },
    tipoLicor: {
        type: String,
        enum: ['whisky', 'amaretto', 'aguardiente', 'vino']
    }
});

// Validación específica para alicorados
alicoradoSchema.path('precio').validate(function(precio) {
    return precio >= 13000; // Los alicorados tienen precio mínimo
}, 'Los alicorados deben costar al menos $13,000');

module.exports = MenuItem.discriminator('Alicorado', alicoradoSchema);
```

### Uso en controladores:
```javascript
const MenuItem = require('../models/MenuItem');
const BaseEspresso = require('../models/discriminators/BaseEspresso');
const Alicorado = require('../models/discriminators/Alicorado');

// Obtener TODO el menú (de todos los tipos)
async function obtenerMenuCompleto(req, res) {
    const menu = await MenuItem.find({ disponible: true })
        .sort({ categoria: 1, nombre: 1 });
    res.json(menu);
}

// Obtener solo espressos
async function obtenerEspressos(req, res) {
    const espressos = await BaseEspresso.find({ disponible: true });
    res.json(espressos);
}

// Crear un nuevo espresso
async function crearEspresso(req, res) {
    const espresso = new BaseEspresso({
        nombre: "Flat White",
        descripcion: "Espresso con microespuma",
        precio: 9000,
        intensidad: 3,
        conLeche: true
    });
    await espresso.save();
    res.json(espresso);
}
```

---

## 🚨 Errores Comunes a Evitar

1. **No llames discriminator() múltiples veces con el mismo nombre**
```javascript
// ❌ MAL
MenuItem.discriminator('Espresso', schema1);
MenuItem.discriminator('Espresso', schema2); // Error!

// ✅ BIEN
MenuItem.discriminator('Espresso', schema1);
MenuItem.discriminator('Latte', schema2);
```

2. **Define hooks ANTES de crear discriminators**
```javascript
// ✅ BIEN
menuItemSchema.pre('save', function() { /* ... */ });
const MenuItem = model('MenuItem', menuItemSchema);
MenuItem.discriminator('Espresso', espressoSchema);

// ❌ MAL
const MenuItem = model('MenuItem', menuItemSchema);
MenuItem.discriminator('Espresso', espressoSchema);
menuItemSchema.pre('save', function() { /* ... */ }); // No funcionará en discriminators
```

3. **No intentes actualizar el discriminatorKey**
```javascript
// ❌ MAL - Lanzará error
const item = await BaseEspresso.findById(id);
item.categoria = 'Alicorado'; // ❌ No puedes cambiar el tipo
await item.save();

// ✅ BIEN - Si realmente necesitas cambiar el tipo
await BaseEspresso.findByIdAndUpdate(
    id,
    { categoria: 'Alicorado' },
    { overwriteDiscriminatorKey: true } // Opción especial
);
```

---

## 📚 Recursos Adicionales

- [Documentación oficial de Mongoose Discriminators](https://mongoosejs.com/docs/discriminators.html)
- [Schema Inheritance Patterns](https://mongoosejs.com/docs/guide.html#es6-classes)
- [Plugins Documentation](https://mongoosejs.com/docs/plugins.html)

---

## ✨ Conclusión

Para tu caso del **menú de Rodson Coffee**, la solución óptima es:

**DISCRIMINATORS** porque:
- ✅ Elimina la redundancia de 11 modelos casi idénticos
- ✅ Mantiene todo en una colección `menuItems`
- ✅ Permite validaciones y campos específicos por categoría
- ✅ Facilita las queries y el mantenimiento
- ✅ Es la solución recomendada por Mongoose para este tipo de casos

La estructura actual con 11 modelos separados funciona, pero **no es la mejor práctica** según la documentación oficial de Mongoose. Los discriminators fueron diseñados específicamente para resolver este problema.