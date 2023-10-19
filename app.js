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

app.use(require("./routes/user.route"));

const http = require("http");
const server = http.createServer(app);

const path = require('path');

app.get("/", (req, res) => {
    const photoPath = path.join(__dirname, './jok.jpg');
    res.sendFile(photoPath);
});
server.listen(process.env.PORT || 3000, process.env.LOCAL_HOST || "0.0.0.0", () => {
    console.log(`Server is up and runing on port ${process.env.PORT}!`)
})

 