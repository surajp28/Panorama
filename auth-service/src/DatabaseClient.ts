import * as mongoDb from "mongodb";
import config from "./config.json";

export default class DatabaseClient {

    private static _instance: DatabaseClient = undefined;
    private client: mongoDb.MongoClient;

    private constructor() {
        this.client = new mongoDb.MongoClient(config.mongoUri + config.mongoDatabase, { useUnifiedTopology: true, useNewUrlParser: true });
    }

    public static get Instance(): DatabaseClient {
        if (!this._instance) {
            this._instance = new DatabaseClient();
        }
        return this._instance;
    }

    public async executeQuery(collectionName: string, query: object): Promise<object> {
        try {
            if(!this.client.isConnected()){
                await this.client.connect();
            }
        } catch (err) {
            console.log("Error while connecting to the DB\n" + err);
            return undefined;
        }

        const database = this.client.db(config.mongoDatabase);
        const collection = database.collection(collectionName)
        try {
            const result = await collection.findOne(query);
            return result as object;
        } catch (err) {
            console.log("Error while executing query on collections\n" + err);
            return undefined;
        }        
    }
}
