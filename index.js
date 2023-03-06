const express = require("express");
const ejs = require("ejs");
const cors = require("cors")
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const router = require("./router");

// Socket.io and server configuration.
const http = require('http');
const {Socket, Server} = require("socket.io")
const server = http.createServer(app);
const io = new Server(server, {
      cors:{
            origin: "*",
      }
});
let users = [];
io.on('connection', (socket) => {
      socket.on("join_socket", (_id) =>{
            const exist = users.find((each) => each._id == _id)
            if(exist){
                  users = users.map((each) => (each._id == _id? {socketId: socket.id, ...each}: each));
            }else{
                  user.push({_id, socket_id:socket._id});
            }
      })
      console.log("User connected" + socket.id);
      socket.on("user_active", (message) =>{
            // socket.emit()
            console.log(message);
      })
      socket.on("send_message", (message) =>{
            socket.broadcast.emit('message_sent', message)
      })
      socket.on("join_grou[", (group) => {
            socket.join(group);
      })
      socket.on("send_msg_to_group[", ({group, mssg}) => {
            socket.to(group).emit("msg_sent_to_group", mssg);
            console.log(mssg, group);
      })
})



const mongoose = require("mongoose");
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/asset'))
const PORT = process.env.PORT || 5000;
app.set("view engine", "ejs");
app.use(cors());
app.use("/", router)
app.use(express.json());
mongoose.set("strictQuery", false);
// let allArrData = [];
const URI = process.env.URI;
mongoose.connect(URI).then(res =>{
      console.log("db connected");
}).then(err =>{
      console.log(err);
})

// mongoose.connect(URI, {}, (err) => {
//       err? console.log("Mongoose connection failed"): console.log("Mongoose connected!");
// });

server.listen(PORT, () => {
      console.log(`Server has started at port ${PORT}`);
});