const multer = require("multer");

// allowed mime types for media files
const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
];

// allowed mime types for documents
const allowedFileTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    'application/msword', // DOC
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
    'application/pdf'  // PDF
];

// maximum file size for media files -> 2MB
const fileSize = 2000000;

// file filter option 
function fileFilter(req, file, cb) {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Only [${allowedMimeTypes}] files are allowed`), false);
    }
};
function documentFilter(req, file, cb) {
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Only [${allowedFileTypes}] files are allowed`), false);
    }
};

// multer storage options
const storage = multer.diskStorage({});

// upload middlewares
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: fileSize,
        files: 1
    }
});
const uploadDocuments = multer({
    storage,
    documentFilter,
    limits: {
        fileSize: fileSize,
        files: 5
    }
});

module.exports = {
    upload,
    uploadDocuments
};