import { Schema, model, Document } from 'mongoose';

export interface Product extends Document {
	nombre: string;
	categoria: 'bebida_caliente' | 'bebida_fria' | 'comida' | string;
	precio: number;
	descripcion: string;
	disponible: boolean;
	imagen: string;
	ingredientes?: string[];
}

export const ProductSchema = new Schema<Product>({
	nombre: { type: String, required: true },
	categoria: { type: String, required: true },
	precio: { type: Number, required: true },
	descripcion: { type: String, required: true },
	disponible: { type: Boolean, required: true, default: true },
	imagen: { type: String, required: true },
	ingredientes: { type: [String] },
});

export const Product = model<Product>('Product', ProductSchema);
