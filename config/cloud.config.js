const cloudinary = require('cloudinary');

// cloudinary cloud configuration object 
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

module.exports = cloudinary; 