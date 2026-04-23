import dotenv from "dotenv";

dotenv.config();

export class GetPort {
    private _port: number;
    private static instance: GetPort | null = null;
    private constructor(route: number) {
        this._port = route;
    }

    get route() {
        return this._port;
    }

    static getRoute(route: number) {
        if (!GetPort.instance) {
            GetPort.instance = new GetPort(route);
        }


        return GetPort.instance;
    }
}

const envPort = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
export const port = GetPort.getRoute(envPort).route;
