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

const { databaseConnection } = require("./config/db.config");
databaseConnection();

const { connectToFireBase } = require('./config/fireBase.config');
connectToFireBase();

app.use(require("./routes/user.route"));
app.use(require("./routes/match.route"));
app.use(require("./routes/recommendation.route"));


// cors options 
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Authorization', 'Content-Type'],
};


const http = require("http");
const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, { cors: corsOptions });

const { establishSocketConnections } = require("./sockets/baseOfConnections");
establishSocketConnections(io);

const path = require('path');
app.get("/", (req, res) => {
    const photoPath = path.join(__dirname, './jok.jpg');
    res.sendFile(photoPath);
});

server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})

module.exports = app;

