import config from "./config.json";
import util from "util";
import { resolve } from "path";
import { rejects } from "assert";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

export default class SessionClient {

    private client: any;
    private static _instance: SessionClient;

    private constructor() { }

    public static get Instance(): SessionClient {
        if (!this._instance) {
            this._instance = new SessionClient();
        }
        return this._instance;
    }

    private createClientFromDefn(): any {
        const sessionServiceConfig = config["session-service"]
        const packageDefinition = protoLoader.loadSync(
            __dirname + "/definitions/" + sessionServiceConfig["protofile"],
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });
        const sessionPkg = grpc.loadPackageDefinition(packageDefinition).sess;

        return new sessionPkg.Session(sessionServiceConfig["serverIP"] + ":" + sessionServiceConfig["servicePort"], grpc.credentials.createInsecure());
    }

    /**
     * Fetch the session token for the user
     * @param username username 
     */
    public fetchSessionToken(username: string): Promise<string> {

        if(!this.client) {
            this.client = this.createClientFromDefn();
        }

        return new Promise<string>((resolve, reject) => {
            this.client.getToken({username: username}, (err, response) => {
                if(err) {
                    reject(err);
                }
                resolve(response.token);
            });
        });
    }

}