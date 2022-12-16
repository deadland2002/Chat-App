const express = require('express');
const app = express();
const http = require('http');
const https = require('https');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
  socket.on('disconnect', (user) => {
    io.emit('disconnect user',user);
    // console.log(socket);
  });

  socket.on('chat message',(msg)=>{ 
    var string = msg.message;

    var substring = ["fuck","chod","mader","jhatu","gandu","maader","lund"];
    
    var find;

    for (i in substring){
      find = string.toLowerCase().includes(substring[i].toLowerCase());
      if(find==true)
        break;
    }

    if(find==true)
      msg.message = "message cannot be displayed";
    
    io.emit("chat message", msg ) 
    
  });

  socket.on('user connected',(name)=>{ io.emit('user connected', name ) });

  socket.on('leave user',(name)=>{ 
    io.emit('leave user', name ); 
    console.log('user disconnected : ',name)
  });

});




app.listen(4000 , ()=>{
  console.log('localhost listening on port : 4000');
});

server.listen(3000,'10.8.9.115',() => {
  console.log('http listening on ip :3000');
});