const mongoose = require("mongoose");

exports.databaseConnection = ()=>{
    mongoose.set("strictQuery", false);
    return mongoose.connect(
        process.env.CONNECTION_STRING,
        {
            useNewUrlParser:true ,
            useUnifiedTopology:true
        })
        .then(()=>{console.log("DB config is done ...")})
}
