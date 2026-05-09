import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Connection {
	private uri: string;

	constructor(uri: string) {
		this.uri = uri;
	}

	async connect(): Promise<typeof mongoose> {
		try {
            console.log("Conectado a la base de datos 🛢️");
			return await mongoose.connect(this.uri);

		} catch (error) {
			console.error("No se conecta a la base de datos:", error);
			throw error;
		}
	}
}

const defaultUri = "mongodb://localhost:27017/rodson-coffee";
const mongoUri = process.env.DATABASE_URL || process.env.MONGO_URI || defaultUri;

export const connection = new Connection(mongoUri);


