const http = require('http');
const socketio = require('socket.io');
const server = http.createServer((req, res) => {
    res.end('hey!');
});
server.listen(3000);

const io = socketio.listen(server);

let messages = [];

io.on('connection', (socket) => {

    /*
    console.log(socket.id) ;

    socket.join('room 1');
    socket.join('room 2');
    socket.join('room 3', () => {
        const rooms = Object.keys(socket.rooms);
        console.log(rooms);
    });
    */

    let old_data;

    socket.on('joinRoom', (data) => {
       old_data = data;
       socket.join(data.room_name, () => {
           io.to(data.room_name).emit('new join', { count: getOnlineCount(io, data) });
           socket.emit('log', { message: 'Odaya girdiniz.' });
           socket.emit('messages', { data: getMessagesRoom(data) });
       }); 
    });

    socket.on('leaveRoom', () => {
        socket.leave(old_data.room_name, () => {
            io.to(old_data.room_name).emit('leavedRoom', { count: getOnlineCount(io, old_data) });
            socket.emit('socket.leaved', { message: 'Odadan ayrıldınız.' });
        });
    });

    socket.on('sendMessage', (data) => {
        sendMessageRoom(io, data, old_data);
        io.to(old_data.room_name).emit('messages', { data: getMessagesRoom(old_data) });
    });

    /*socket.on('disconnect', () => {
        io.to(old_data.room_name).emit('leavedRoom', { count: getOnlineCount(io, old_data) });
        socket.emit('socket.leaved', { message: 'Odadan ayrıldınız.' });
    });*/

});

const getOnlineCount = (io, data) => {
    const room = io.sockets.adapter.rooms[data.room_name];
    return room ? room.length : 0;
};

const getMessagesRoom = (data) => {
    return messages[data.room_name];
};

const sendMessageRoom = (io, data, old_data) => {
    if (old_data.room_name in messages){
        messages[old_data.room_name].push({'user_name': old_data.user_name, 'message': data.message});
    }else{
        messages[old_data.room_name] = [{'user_name': old_data.user_name, 'message': data.message}];
    }
    console.log(messages);
};
