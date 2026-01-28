const { Schema, model } = require('mongoose');

const menuItemSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    // Campos opcionales para casos especiales
    imagen: {
        type: String,
        required: false
    },
    disponible: {
        type: Boolean,
        default: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    etiquetas: {
        type: [String],
        default: []
    },
    // Para items especiales como métodos de filtrado
    metadatos: {
        type: Schema.Types.Mixed,
        required: false
    }
}, {
    timestamps: true
});

// Índices para mejorar búsquedas
menuItemSchema.index({ categoria: 1, disponible: 1 });
menuItemSchema.index({ nombre: 'text', descripcion: 'text' });

module.exports = model("MenuItem", menuItemSchema, "menuItems");
