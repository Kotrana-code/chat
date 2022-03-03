
const { Server } = require("socket.io");

var app = require("./app");

var moment = require("moment");

var message = require("./controller/message");

var db = require("./config/config");



// set port, listen for requests
const PORT = process.env.PORT || 3000;
const IP = process.env.IP || "localhost";

// then start listening
const server = app.listen(PORT, function (error) {
    if (error) {
        console.error("Unable to listen for connections", error);
        process.exit(10);
    }
    console.info(
        "Server is listening on http://" +
        IP +
        ":" +
        PORT
    );
});


// Ici le code pour le socket 
const io = require('socket.io')(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["my-custom-header"],
        credentials: true
    },
    allowEIO3: true, // tweaking it may help
});

var clients = [];

//Whenever someone connects this gets executed
io.on('connection', function (socket) {

    socket.on('storeClientInfo', function (data) {
        var clientInfo = new Object();
        clientInfo.customId = data.customId;
        clientInfo.clientId = socket.id;
        clients.push(clientInfo);

    });

    console.log("Un utilisateur connected");
    //Whenever someone disconnects this piece of code executed
    socket.on('disconnect', function (reason) {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];
            if (c.clientId == socket.id) {
                clients.splice(i, 1);
                break;
            }
        }
    });

    socket.on('sendMessage', async function (data) {
        for (var i = 0, len = clients.length; i < len; ++i) {
            var c = clients[i];
            // console.log("i = " + i + "customId " + c.customId + "==" + data.customId + " " + c.clientId)
            console.log(data.socketId + " " + data.recepteurId + " " + data.message + " " + moment().format());
            if (c.customId == data.recepteurId) {
                await db.collection('messages').add({ participant: [data.customId, data.recepteurId.toString()], message: data.message, createdAt: moment().format() });
                io.to(c.clientId).emit("receiveMesssage", data);
                break;
            }
        }
    })
})