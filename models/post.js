const mongoose = require('mongoose');

const dblink = "mongodb+srv://Ayush:WYL4JrYUrhcqsSM@cluster0.ts3ep.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //to link the post to the user's data who posted it
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'userModel'
    },
    //to display the comments associated with the post
    comments:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'commentModel'
        }
    ]
},{
    timestamps:true
});
const postModel = mongoose.model('postModel',postSchema);
module.exports = postModel;