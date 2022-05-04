const path = require('path');

module.exports.profile = function(req,res){
    res.write('<h1>Profile is Ready!</h1>');
    res.end();
    return;
}

module.exports.signup = function(req,res){
    //return res.sendFile('./views/signup.html',{root:'.'});   
    return res.render('signup',{
        title:"Signup"
    });
}

module.exports.login = function(req,res){
    return res.render('login',{
        title:"login"
    });
}