const postModel = require('../models/post');

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