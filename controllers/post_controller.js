const commentModel = require('../models/comments');
const postModel = require('../models/post');

//Create new post
//insert into db
module.exports.create = function(req,res){
    let postData = req.body['new-user-post'];
    //save it into db
    let userid = req.session.passport.user;
    postModel.create({
        content:postData,
        user:userid
    }, function(err,post){
        return res.redirect('back');
    });
}

//delete the post and associated comments
module.exports.destroy = function(req,res){
    postModel.findOne({'_id':req.params.id}, function(err, post){
        if(err){
            console.log("err");
            return res.redirect('back');
        }
        if(post.user == req.user.id){
            post.remove();
            commentModel.deleteMany({'post':req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            console.log('user not matched');
            return res.redirect('back');
        }
    })
}