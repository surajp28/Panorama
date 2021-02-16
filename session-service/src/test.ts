
var grpc = require('@grpc/grpc-js');
var protoLoader = require('@grpc/proto-loader');
var packageDefinition = protoLoader.loadSync(
    __dirname + "/session.proto",
    {keepCase: true,
     longs: String,
     enums: String,
     defaults: true,
     oneofs: true
    });
var auth = grpc.loadPackageDefinition(packageDefinition).sess;

let client = new auth.Session("0.0.0.0:50052", grpc.credentials.createInsecure());

client.getToken({username: "vishesh"}, (err, respons)=> {
    console.log("Mesage:" + respons.token);
    client.verifyToken({username: "vishesh", token: respons.token}, ( err, resp) =>{
        console.log(resp.verified);
        console.log(err)
    });
})

client.getToken({username: "vishesh"}, (err, respons)=> {
    console.log("Mesage:" + respons.token);
    client.verifyToken({username: "vishes", token: respons.token}, ( err, resp) =>{
        console.log(resp.verified);
    });
})