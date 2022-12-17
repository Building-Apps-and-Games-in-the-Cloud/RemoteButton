
import express from 'express';
import { WebSocketServer } from 'ws';

import * as http from 'http';
import { index } from './routes/index.mjs';
import { InGPIO } from './helpers/InGPIO.mjs';

// Create the express application
const app = express();

// Select the middleware to decode incoming posts
app.use(express.urlencoded({ extended: false }));

// Select ejs middleware
app.set('view-engine', 'ejs');

// Connect the route handlers to the routes
app.use('/index.html', index);


function sendButtonState(state) {
    sockets.forEach(s => s.send(state));
}

let buttonGPIO = new InGPIO(17, sendButtonState);
buttonGPIO.init();

const port = process.env.PORT || 8080;

const httpServer = http.createServer(app);
const webSocketServer = new WebSocketServer({ server: httpServer });

let sockets = [];
webSocketServer.on('connection', (socket) => {
    console.log("connected");
    sockets.push(socket);
    socket.on('message', (message) => {
        console.log(`Received ${message}`);
    });
    // When a socket closes, or disconnects, remove it from the array.
    socket.on('close', function () {
        sockets = sockets.filter(s => s !== socket);
    });
});

httpServer.listen(port, () => {
    console.log("Server running");
});

