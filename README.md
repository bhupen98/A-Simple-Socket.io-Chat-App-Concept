## Real-Time Chat System with Socket.io
Sockets have traditionally been the solution around which most real-time chat systems are architected, providing a bi-directional communication channel between a client and a server.

This means that the server can push messages to clients. Whenever you write a chat message, the idea is that the server will get it and push it to all other connected clients.

### WebSocket Protocol
* allows full-duplex https://en.wikipedia.org/wiki/Duplex_(telecommunications) communication.
* allows persistence connection between client and server.
* a separate protocol from http

#### Getting Started 
*Let's include express and socket.io libraries in our node_modules folder*.
```javascript
npm install --save express socket.io.
```


#### Folder Structure for the App
```bash
├── node_modules
├── package.json
├── public
│   ├── index.html
│   └── js
│       └── chat.js
└── src
    └── index.js
  ```
 
 ##### index.js
 ```javascript
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
});
```

 #### index.html 
 ```html
 <!DOCTYPE html>
<html>

<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <style>
        .container {
            margin: 200px 0px 0px 100px
        }
    </style>
</head>

<body>
    <div class="container">
        <h4>Chat App</h4>
        <div class="row">
            <div class="col-3">
                <button id="increment" class="form-control">+1</button>
            </div>
        </div>
    </div>

    <script src="/socket.io/socket.io.js"></script>
    <script src="/js/chat.js"></script>
</body>

</html>
```

##### chat.js
```javascript
const socket=io();

//listening countUpdated Event
socket.on('countUpdated',(count)=>{
console.log('the count has been updated',count);
});

//on click increment event 
document.querySelector('#increment').addEventListener('click',()=>{
//emiting increment event
  socket.emit('increment');

});
```

#### output
![screenshot from 2019-03-05 22-24-20](https://user-images.githubusercontent.com/47861774/53821324-ae645a00-3f95-11e9-87e9-01ea450507ff.png)

Both windows will get notification on console on change one of them.


   
