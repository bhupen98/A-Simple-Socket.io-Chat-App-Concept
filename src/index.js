const path = require('path');
const express=require('express')//loading express library
const socketio=require('socket.io');


const app=express();
const http=require('http').createServer(app);
const io=socketio(http);




const port = process.env.PORT || 3000;


/*
joining the /public directory to the current directory   
##------------------------------------------------------
*/
const publicDirectoryPath=path.join(__dirname,'../public');
app.use(express.static(publicDirectoryPath));





let count=0;

io.on('connection',(socket)=>{
  console.log('new web socket connection ');

  socket.emit('countUpdated',count);

  socket.on('increment',()=>{
      count ++;
      socket.emit('countUpdated',count)
  })

});







http.listen(port,()=>{
    console.log(`server is running on por ${port}`);
})
