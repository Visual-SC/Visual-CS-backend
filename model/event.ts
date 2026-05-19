import { Schema, model, Document } from 'mongoose';

export interface Event {
    date: Date;
    title: string;
    description: string[] | string;  
    price: number;
    schedule: string;
    whastsapp: string;
    image: string;
}

export interface EventDocument extends Event, Document {}

export const EventSchema = new Schema<EventDocument>({
    date: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: [String], required: true },
    price: { type: Number, required: true },
    schedule: { type: String, required: true },
    whastsapp: { type: String, required: true },
    image: { type: String, required: true }
});

export const Event = model<EventDocument>('Event', EventSchema);
