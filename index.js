const express=require('express');
const app=express();
const http=require('http'); // http module which is available by default in nodejs.
const server=http.createServer(app); // create server of http which accepts request handler.
const socketio=require('socket.io');
const io=socketio(server); // evolve the http server 
const path=require('path');


app.use('/',express.static(path.join(__dirname,'public')));

const users={}

io.on('connection',(socket)=>{
    socket.on('send-msg',(data)=>{
        io.emit('recieved-msg',{ // so that sbko message jaye jo us time connected h
            msg:data.msg,
            user:users[socket.id]
        })
    });
    socket.on('login',(data)=>{
          users[socket.id]=data.user; // mapping: key is socket.id and user is value
       })
});


const port=process.env.PORT || 3000;
server.listen (port,()=>{
    console.log(`Server running at ${port}`);
})

