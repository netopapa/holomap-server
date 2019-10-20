const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

// mongoose.connect('mongodb+srv://Omnistack:omnistack@omnistack-onxol.mongodb.net/Omnistack?retryWrites=true&w=majority', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// });

// app.use(express.json());
// app.use(routes);

// app.listen(3333);

// #!/usr/bin / env node

var CLIENTS=[];
var id;

var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function (request, response) {
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log((new Date()) + ' Server is listening on port 8080');
});

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// wsServer.on('connection', function(ws) {
//     id = Math.random();
//     console.log('connection is established : ' + id);
//     CLIENTS[id] = ws;
//     CLIENTS.push(ws);
// });

// WebSocket server
wsServer.on('request', function (request) {
    var connection = request.accept(null, request.origin);
    CLIENTS.push(connection);
    // console.log(connection);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function (message) {
        // console.log(message.utf8Data);
        // connection.sendUTF('resposta');

        CLIENTS.forEach(function each(conn) {
            conn.sendUTF('resposta');
         });

        // wsServer.send('resposta');
        // console.log(wsServer);
        // wsServer.broadcast(message);
    });

    connection.on('close', function (connection) {
        // Connection closes
        console.log(connection);
    });
});

wsServer.broadcast = function broadcast(msg) {
    console.log(msg);
    wsServer.clients.forEach(function each(client) {
        client.send(msg);
     });
 };