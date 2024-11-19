const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    phone:Number,
    email:String,
    password:String,
    });

module.exports = mongoose.model("studentlogindatas",schema);