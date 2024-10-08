const express = require("express");
const cors = require('cors');
require("dotenv").config();

// express app
const app = express();
app.use(express.json());
app.use(cors()); // http -> https

// payload size limit
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: false, limit: '100mb' }));

// using params request  
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection 
const { databaseConnection } = require("./config/db.config");
databaseConnection();

// firebase connection ( using as a pushing server )
const { connectToFireBase } = require('./config/fireBase.config');
connectToFireBase();

// server routes
const ApplicationRoutes = require('./routes');
ApplicationRoutes(app);

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

// error handler
const errorManger = require('./helpers/envError');
app.use(express.static('public'));
app.use(errorManger.handler);
app.use(errorManger.notFound);

// server listening
server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and running on port ${process.env.PORT}!`)
});

const { deleteInActiveAccounts } = require('./helpers/JobSchedule');
deleteInActiveAccounts();

module.exports = app;