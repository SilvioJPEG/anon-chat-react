const mongoose = require('mongoose');
const http = require('http');
const socketio = require('socket.io')
const config = require('./config');
const app = require('./app');
const { Socket } = require('dgram');

const PORT = process.env.PORT || 3001
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    socket.on('chatMessage', (msg, channel) => {
        io.emit('message', msg, channel);
    })
});

async function start() {
    try {
        await mongoose.connect(config.mongoURI).then(() => {console.log('Mongodb connected.')})

        server.listen(PORT, (err) => {
            console.log(`Example app listening at http://localhost:${PORT}`)
        })
    } catch(err) {
        console.log(err)
    }
}

start();