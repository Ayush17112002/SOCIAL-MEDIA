const mongoose = require('mongoose');
const dblink = "mongodb+srv://Ayush:WYL4JrYUrhcqsSM@cluster0.ts3ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
mongoose.connect(dblink);
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
},{
    timestamps:true
});
const userModel = new mongoose.model('userModel',userSchema);
module.exports = userModel;