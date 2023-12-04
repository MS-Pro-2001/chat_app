
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

const io = require('socket.io')(http)


io.on('connection',(socket)=>{
   
    socket.on('message',(msg)=>{
        socket.broadcast.emit('message',msg);

    })
    

})