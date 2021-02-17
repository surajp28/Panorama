import LoginHandler from "./LoginHandler";
import config from "./config.json";
import IBasicResponse from "./IBasicResponse";
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const packageDefn = protoLoader.loadSync(
    __dirname + "/definitions/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefn).auth;

async function basic(input, callback) {
    const basicAuthResponse: IBasicResponse = await LoginHandler.Instance.verifyBasicAuth(input.request.username, input.request.password);
    if (!basicAuthResponse.token) {
        basicAuthResponse.token = "";
    }
    basicAuthResponse["success"] = basicAuthResponse["authenticated"]
    delete basicAuthResponse["authenticated"];
    callback(null, basicAuthResponse);
}

function main() {
    var server = new grpc.Server();
    server.addService(userProto.Auth.service, { basic: basic });
    server.bindAsync(config.serverIP + ':' + config.servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log(`Auth service started on IP ${config.serverIP} Port ${config.servicePort}`);
        server.start();
    });
}

main();