//node server which will handle socket io connections
const io=require('socket.io')(8080, {
    cors: {
      origin: '*',
    }
  });;

const users={};

io.on('connection',socket=>{
    //If any new user joins,broadcast it to other members.
    socket.on('new-user-joined',myname=>{
        users[socket.id]=myname;
        socket.broadcast.emit('user-joined',myname);
    });

    //If someone sends a message,broadcast it to other members.
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name: users[socket.id]})
    });

    //If someone leaves the chat,broadcast it to other members.
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})
