const express = require("express");
var http = require("http");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);

var io = require("socket.io")(server);

app.use(express.json());

app.use(cors());
var clients = {};
io.on("connection", (socket) => {
  console.log("Connected");
  console.log(socket.id, "Joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    // console.log(clients);
  });
  socket.on("message",(msg)=>{
    console.log(msg);
    let targetId =msg.targetId
  if(clients[targetId])  clients[targetId].emit("message",msg)
  })
});

app.route('/check').get((req,res)=>{
  return res.json("Your app is working time");
})

server.listen(port, () => {
  console.log("server is started", port);
});
