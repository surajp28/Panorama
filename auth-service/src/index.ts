import LoginHandler from "./LoginHandler";
import config from "./config.json";
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');

const packageDefn = protoLoader.loadSync(
    __dirname + "/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const userProto: any = grpc.loadPackageDefinition(packageDefn).auth;

async function basic(input, callback) {
    callback(null, { success: await LoginHandler.Instance.verifyBasicAuth(input.request.username, input.request.password) });
}

function main() {
    var server = new grpc.Server();
    server.addService(userProto.Auth.service, { basic: basic });
    server.bindAsync(config.serverIP + ':' + config.servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log("auth service started");
        server.start();
    });
}
main();