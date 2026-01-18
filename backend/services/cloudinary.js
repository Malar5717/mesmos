const cloudinary =  require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CNAME,
    api_key: process.env.CKEY,
    api_secret: process.env.CSECRET
});

module.exports = cloudinary;