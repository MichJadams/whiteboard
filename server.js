const path = require('path');
const socketio = require('socket.io');
const express = require('express');
const app = express();

// app.listen() returns an http.Server object
// http://expressjs.com/en/4x/api.html#app.listen
const server = app.listen(1337, function () {
    console.log(`Listening on http://localhost:${server.address().port}`);
});

const io = socketio(server);

io.on('connection', function (socket) {
    /* This function receives the newly connected socket.
       This function will be called for EACH browser that connects to our server. */
    console.log('A new client has connected!');
    console.log(socket.id);

    socket.on('drawing', function(start, end, color){
        // console.log(start, end, color)
        socket.broadcast.emit('message', start, end, color)
    })

    socket.on('disconnect', function () {
        console.log('Bye ):')
        console.log(socket.id)
    })
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});
