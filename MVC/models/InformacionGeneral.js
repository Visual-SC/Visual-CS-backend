const { Schema, model } = require('mongoose');

const informacionGeneralSchema = Schema({
    tipo: {
        type: String,
        required: true,
        unique: true,
        enum: ['contacto', 'metodosFiltrado', 'cafeEnCasa', 'catas']
    },
    datos: {
        type: Schema.Types.Mixed,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

module.exports = model("InformacionGeneral", informacionGeneralSchema, "informacionGeneral");
