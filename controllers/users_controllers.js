const userModel = require('../models/user');


//to check first if user has logged in using cookies then display his profle
module.exports.profile = function(req,res){
    if(!req.cookies.user_id){
        res.redirect('/users/signin');
    }
    userModel.findById(req.cookies.user_id,function(err,user){
        if(user){
            return res.render('user_profile',{
                name:user.name,
                email:user.email
            });
        }
        res.redirect('/users/signin');
    })
}

//display sign up page
module.exports.signup = function(req,res){
    //return res.sendFile('./views/signup.html',{root:'.'});   
    return res.render('user-sign-up');
}

//to display sign in page to user
module.exports.signin = function(req,res){
    return res.render('user-sign-in');
}

//cater to the post request to create a new user if not exist earlier
module.exports.create = function(req,res){
    let pwd = req.body.password;
    let cnfrmpwd = req.body.confirm_password;
    if(pwd === cnfrmpwd){
        //check if user already present
        userModel.findOne({email:req.body.email},function(err,user){
            if(err){
                console.log('error in signing up the user');
                return res.send('error in signing up the user');
            }else{
                if(user){
                    return res.redirect('/create/sign-in');
                }else{
                    //singup the user
                    userModel.create(req.body,function(err,user){
                        if(err){
                            console.log('error in signing in the user'); return res.send('Error in signing in the user');
                        }
                        return res.redirect('/users/signin');
                    })
                }
            }
        });
    }else{
        res.redirect('back');
    }
}

//to sign in the user if credentials matches and display his profile
module.exports.createSession = function(req,res){

    userModel.findOne({email:req.body.email},function(err,user){
        if(err){
            res.send('error in finding the user');
        }
        if(user){
            if(user.password == req.body.password){
                console.log(user);
                res.cookie('user_id',user['_id']);
                return res.redirect('/users/profile');
            }else{
                res.redirect('back');
            }
        }else{
            return res.redirect('back');
        }
    });
}

//clearing cookies and sending user back to home page
module.exports.signout = function(req,res){
    if(req.cookies.user_id){
        res.clearCookie('user_id');
        return res.redirect('/');
    }else{
        res.redirect('/');
    }
}