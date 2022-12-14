
import express from 'express';
import { WebSocketServer } from 'ws';
//let server = new WebSocketServer({port:8083});

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

let sockets = [];

function sendButtonState(state){
    sockets.forEach(s => s.send(msg));
}

let buttonGPIO = new InGPIO(17, sendButtonState);
buttonGPIO.init();

const port = process.env.PORT || 8083;

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (socket) => {
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

server.listen(port, () => {
    console.log("Server running");
});

