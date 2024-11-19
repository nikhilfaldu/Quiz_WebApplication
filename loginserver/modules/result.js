const mongoose = require('mongoose');


const schema = mongoose.Schema({
    name:String,
    language:String,
    total:Number,
    correct:Number,
    
    });

module.exports = mongoose.model("results",schema);