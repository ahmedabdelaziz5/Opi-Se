const multer = require("multer");

function fileFilter(req,file,cb){
    if(file.mimetype=="image/png" || file.mimetype=="image/jpg") {
        cb(null,true);
    }
    else {
        cb("only .png .jpg files are allowed",false);
    };
}

const storage = multer.diskStorage({});

const upload = multer({ storage , fileFilter });

module.exports = upload;


