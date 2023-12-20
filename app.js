const express = require("express");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors()); // http -> https

// using params request  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require("dotenv").config();

// database connection 
const { databaseConnection } = require("./config/db.config");
databaseConnection();

// firebase connection ( using as a pushing server )
const { connectToFireBase } = require('./config/fireBase.config');
connectToFireBase();

// server routes
app.use(require("./routes/user.route"));
app.use(require("./routes/match.route"));
app.use(require("./routes/recommendation.route"));
app.use(require("./routes/chat.route"));

// cors options 
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};

// main server
const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, { cors: corsOptions });

// establish socket connections
const { establishSocketConnections } = require("./sockets/baseOfConnections");
establishSocketConnections(io);

// connect to redis server
const { connectRedis } = require('./config/redis.config');
connectRedis();

// test origin route 
const path = require('path');
app.get("/", (req, res) => {
    const photoPath = path.join(__dirname, './jok.jpg');
    res.sendFile(photoPath);
});

// server listening
server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})

module.exports = app;