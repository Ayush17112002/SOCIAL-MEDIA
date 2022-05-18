const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModel = require('../models/user');

//this method is called when passport.authenticate() is called
passport.use(new LocalStrategy({
        usernameField:'email'
    },
    function verify(email,password,cb){
    userModel.findOne({email:email},function(err,user){
        if(err){console.log('Error in finding the user in db'); return cb(err);}
        if(!user || user.password != password){console.log('user not matched'); return cb(null,false);}
        return cb(null,user);
    });
}));

//When you use sessions with Passport, as soon as a user gets appropriately authenticated, a new session begins. When this transpires, we serialize the user data to the session and the user ID is stored in req.session.passport.user.
passport.serializeUser(function(user,cb){
    console.log('inside serial');
    return cb(null,user['_id']);
});


//To access the user data it is deserialized, using the user ID as its key. The user data is queried and attached to req.user.
passport.deserializeUser(function(id,cb){
    console.log('inside deserialize');
    userModel.findById(id,function(err,user){
        if(err){console.log('Error in finding the user'); return cb(err);}
        return cb(null,user);
    })
})

passport.checkAuthentication = function(req,res,next){
    console.log('inside checkauth');
    console.log('check',req.isAuthenticated());
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}
passport.setAuthenticatedUser = function(req,res,next){
     //session, on getting the request, identifies whose session is thi, and attaches the details of that entity in req.user that can be used while req is on the server
    if(req.isAuthenticated()){
        res.locals.user = req.user;    
    }
    next();
}

module.exports = passport;