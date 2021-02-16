import jsonwebtoken from "jsonwebtoken";
import config from "./config.json";

interface UserDetails {
    username: string;
}

export default class WebTokenManager {
    private static _instance: WebTokenManager;

    private constructor() {

    }

    public static get Instance(): WebTokenManager {
        if (!this._instance) {
            this._instance = new WebTokenManager();
        }
        return this._instance;
    }


    public getToken(username: string): string {

        // read from the environment variable
        const secret = process.env.SECRET || config.secret;

        // read from configuration
        const expiration = config.expiration;
        const issuer = config.issuer;

        return jsonwebtoken.sign({ username: username }, secret, { expiresIn: expiration, issuer: issuer });
    }

    public verifyToken(username: string, token: string): boolean {
        const secret = process.env.SECRET || config.secret;
        const decrypted: UserDetails = jsonwebtoken.verify(token, secret) as UserDetails;
        return decrypted.username == username;
    }
}