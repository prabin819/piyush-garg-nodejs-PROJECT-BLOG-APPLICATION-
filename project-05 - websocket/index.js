const http = require('http');
const express = require('express');
const { join } = require('node:path');

const { Server } = require('socket.io');



const app = express();
const server = http.createServer(app);

const io = new Server(server);


app.use(express.static(join(__dirname, 'public')));//app.use(express.static('./public'));


//socket.io
io.on('connection', (socket) => {//--------------------------------------------------
    console.log('a new user is connected', socket.id);

    socket.on('user-message', (message) =>{//----------------------------------------------------------------
        console.log('a new user message:', message);
        io.emit('messy', message)//send this message to all other clients(sockets)//-------------------------------------
    })
})


//normal http requests handle
app.get('/', (req, res) => {
    res.sendFile('index.html');
  });

server.listen(9000, ()=>{console.log(`server started at PORT: 9000`)});