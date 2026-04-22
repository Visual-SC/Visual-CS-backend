import mongoose from "mongoose";

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

export const connection = new Connection("mongodb://localhost:27017/rodson-coffee");
