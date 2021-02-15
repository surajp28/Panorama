import DatabaseClient from "./DatabaseClient";
import IBasic from "./IBasic";

export default class LoginHandler {
    private static _instance: LoginHandler;
    private constructor() {
    }

    public static get Instance() : LoginHandler {
        if(!this._instance){
            this._instance = new LoginHandler();
        }
        return this._instance; 
    }

    public async verifyBasicAuth(username: string, password: string): Promise<boolean> {
        const credentials: IBasic = { username: username, password: password}
        const queryResult = await DatabaseClient.Instance.executeQuery("user", credentials);
        return queryResult != null;
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