var connect = require('connect'),
    http = require('http');

var app = connect()
    .use(connect.logger('tiny'))
    .use(connect.static('app'));

var server = http.createServer(app);

var io = require('socket.io').listen(server);

var message_history = [];

io.sockets.on('connection', function (socket) {
    message_history.forEach(function(msg) {
        socket.emit(msg.type, msg.data)
    });

    socket.on('message', function (data) {
        message_history.push({type: 'message', data:data});
        io.sockets.emit('message', data);
    });

    socket.on('screen', function (data) {
        message_history.push({type: 'screen', data:data});
        io.sockets.emit('screen', data);
    });

    socket.on('delete_messages', function (data) {
        message_history = [];
        io.sockets.emit('delete_messages');
    });
});

server.listen(3000)