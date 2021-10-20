const socketio = require('socket.io');

const createSocket = (server) => {
    const io = socketio(server);

    io.on("connection", (socket) => {
        
        socket.on('MESSAGE:SEND', (channel, msg) => {
            socket.emit('message', channel, msg);
        });
        socket.on("MESSAGE:TYPING", (currentChannelId, username) => {
            socket.broadcast.emit('typing', currentChannelId, username);
        });
        socket.on("MESSAGE:NOT_TYPING",(currentChannelId, username) => {
            socket.broadcast.emit('notTyping', currentChannelId, username);
        });
    });
    return io;
}
module.exports = createSocket;