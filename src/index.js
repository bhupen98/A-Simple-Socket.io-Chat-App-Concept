const path = require('path');
const express=require('express')//loading express library
const socketio=require('socket.io');//loading socket.io library


const app=express();

//loading http library and creating a server passing our app that holds a express()
const http=require('http').createServer(app);
const io=socketio(http);//configuring server to work with our http server


//generating port 
const port = process.env.PORT || 3000;

//joining the /public directory to the current directory   
const publicDirectoryPath=path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));


//SERVER SIDE SOCKET
let count=0;
//listening connection events
io.on('connection',(socket)=>{
  console.log('new web socket connection ');

  //emiting countUpdate event
  socket.emit('countUpdated',count);//this will inform to only the client who is in communication.

  //listening increment event
  socket.on('increment',()=>{
      count ++;
      // socket.emit('countUpdated',count)
      io.emit('countUpdated',count); //this will inform to all other client about the changes.
  })

});

//listening the port 
http.listen(port,()=>{
    console.log(`server is running on por ${port}`);
})
