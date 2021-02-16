import config from "./config.json";
import WebTokenManager from "./WebTokenManager";
var grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");

const packageDefn = protoLoader.loadSync(
    __dirname + "/" + config.protofile, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});


const sessProto: any = grpc.loadPackageDefinition(packageDefn).sess;

async function getToken(input, callback) {
    callback(null, { token: WebTokenManager.Instance.getToken(input.request.username) });
}

async function verifyToken(input, callback) {
    callback(null, { verified: WebTokenManager.Instance.verifyToken(input.request.username, input.request.token) });
}

function main() {
    var server = new grpc.Server();
    server.addService(sessProto.Session.service, { getToken: getToken, verifyToken: verifyToken });
    server.bindAsync(config.serverIP + ':' + config.servicePort, grpc.ServerCredentials.createInsecure(), () => {
        console.log("Session service started");
        server.start();
    });
}
main();