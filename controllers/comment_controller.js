const commentModel = require('../models/comments');
const postModel = require('../models/post');
module.exports.create = function(req,res){
    //check first if the post is present or not
    postModel.findById(req.body.post,function(err,post){
        if(post){
            commentModel.create(req.body,function(err,comment){
                try{
                    post.comments.push(comment._id);
                    //save() function is used when u make some changes into the db's data and then u are required to save it 
                    //otherwise this would have been achieved by-> first remove the data from db.. update it and then recreate it into db
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
module.exports.destroy = function(req,res){
    commentModel.findById(req.params.id, function(err,comment){
        if(comment.user == req.user.id){
            let postid = comment.post;
            comment.remove();
            postModel.find(postid, {$pull:{comments:req.params.id}},function(err, post){
                return res.redirect('back');
            })
        }else{
            return res.redirect('back');
        }
    })
}