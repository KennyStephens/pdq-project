const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/", require("./routes/index"));

io.on('connection', socket => {
  console.log('a user connected');
  socket.on('update', (data) => {
    console.log(data);
    io.sockets.emit('container', data);
  })
});

const PORT = process.env.PORT || 5000;

http.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});
