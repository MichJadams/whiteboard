// Import from the module './whiteboard':
//   The default export, naming it draw,
//   An export named `events`, calling it `whiteboard`.
import whiteboard, {draw} from './whiteboard'

// Example: Draw a single stroke.
// draw([0, 0], [250, 250], 'red', true)


var socket = io(window.location.origin)

socket.on('connect', function () {
  console.log('I have made a persistent two-way connection to the server')
})

// 'draw' is a keyword like 'click'
// 'drawing' is just what we want to name it -> then the server listens for it in server.js
whiteboard.on('draw', function(start, end, color){
  socket.emit('drawing', start, end, color)
})

socket.on('message', function(start, end, color){
  draw(start, end, color)
})



// whiteboard.on('draw', (event) => {

// })


// note, io(<port>) will create a http server for you
// var io = require('socket.io')(80);

// io.on('connection', function (socket) {
//   io.emit('this', { will: 'be received by everyone' });

//   socket.on('private message', function (from, msg) {
//     console.log('I received a private message by ', from, ' saying ', msg);
//   });

//   socket.on('disconnect', function () {
//     io.emit('user disconnected');
//   });
// });
