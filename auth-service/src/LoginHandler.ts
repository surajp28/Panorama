import { Session } from "inspector";
import DatabaseClient from "./DatabaseClient";
import IBasicRequest from "./IBasicRequest";
import IBasicResponse from "./IBasicResponse";
import SessionClient from "./SessionClient";


export default class LoginHandler {
    private static _instance: LoginHandler;
    private constructor() {
    }

    public static get Instance(): LoginHandler {
        if (!this._instance) {
            this._instance = new LoginHandler();
        }
        return this._instance;
    }

    public async verifyBasicAuth(username: string, password: string): Promise<IBasicResponse> {
        const credentials: IBasicRequest = { username: username, password: password }
        const queryResult = await DatabaseClient.Instance.executeQuery("user", credentials);

        // if authenticated with the database, call the session service to get Token
        if (queryResult == null) {
            // call session service and get the token
            console.log(`user ${username} not found`);
            return { authenticated: false }
        }

        console.log("user found");

        try {
            const token = await SessionClient.Instance.fetchSessionToken(username);
            return { authenticated: true, token: token };
        } catch (err) {
            console.log("Unable to fetch token from session service\n" + err);
            return { authenticated: false }
        }
    }

    public verifyGoogleAuth(): boolean {
        return false;
    }

    public verifyGitHubAuth(): boolean {
        return false;
    }

    public verifyIUAuth(): boolean {
        return false;
    }

}