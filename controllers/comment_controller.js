const commentModel = require('../models/comments');
const postModel = require('../models/post');
const { post } = require('../routes');
module.exports.create = function(req,res){
    //check first if the post is present or not
    postModel.findById(req.body.post,function(err,post){
        if(post){
            commentModel.create(req.body,function(err,comment){
                try{
                    post.comments.push(comment._id);
                    post.save();
                return res.redirect('/users/profile');
                }catch(err){
                    return res.redirect('back');
                }
            });
        }else{
            return res.redirect('back');
        }   
    });
}