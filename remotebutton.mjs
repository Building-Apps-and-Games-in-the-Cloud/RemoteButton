import express from 'express';
import WebSocket from 'ws';
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

let buttonGPIO = new InGPIO(17, (state)=>console.log(state));
buttonGPIO.init();

const port = process.env.PORT || 8083;

const server = http.createServer(app);
const wss = new WebSocket.server({server});
wss.on('connection',(ws)=>{
    ws.on('message',(message)=>{
        console.log(`Received ${message}`);
    })
})

server.listen(port, () => {
    console.log("Server running");
});


