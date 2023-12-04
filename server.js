
const express = require('express')
const app = express();
require('dotenv').config()

const http = require('http').createServer(app)



const PORT =  process.env.PORT;

http.listen(PORT,()=>{
    console.log(`App is listening on ${PORT}`)
})

app.use(express.static(__dirname + '/public'));

app.get("/",(req,res)=>{
    app.sendFile(__dirname + '/index.html')
})

// socket

const arr = [];

const io = require('socket.io')(http)


io.on('connection',(socket)=>{

    arr.push(socket.id);
    socket.emit('total_users_online',arr.length)
   
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);

    })
    

})