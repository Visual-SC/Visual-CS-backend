import { Schema, model, Document } from 'mongoose';
import type { IProduct } from './product';

export type EstadoOrden = 'pendiente' | 'preparando' | 'completada' | 'cancelada';
export type NumeroDeMesa = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'F1' | 'F2' | 'F3' | 'F4'; 
interface ProductItem extends IProduct {
  cantidad: number;
  total: number;
}

type ResumenOrden = {
  subtotal: number;
  total: number;
}

export interface IOrdenCafe {
  numero_orden: string;
  fecha: Date; 
  estado: EstadoOrden;
  items: ProductItem[];
  resumen: ResumenOrden;
  cliente: string;
  numero_mesa: NumeroDeMesa;
}

export interface OrdenCafe extends IOrdenCafe, Document {}

export const OrdenCafeSchema = new Schema<OrdenCafe>({
  numero_orden: { type: String, required: true, unique: true },
  fecha: { type: Date, default: Date.now }, 
  estado: { type: String, enum: ['pendiente', 'preparando', 'completada', 'cancelada'], required: true },
  items: { type: [Object], required: true },
  resumen: { type: Object, required: true },
  cliente: { type: String, required: true },
  numero_mesa: { type: String, required: true },
});

export const OrdenCafe = model<OrdenCafe>('OrdenCafe', OrdenCafeSchema);
