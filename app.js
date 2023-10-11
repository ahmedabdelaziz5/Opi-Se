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

const {databaseConnection} = require("./config/db.config");
databaseConnection();


const http = require("http");
const server = http.createServer(app);

app.get("/", (req, res) => {
    res.send("WE ARE LIVE HERE !");
})

server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})




