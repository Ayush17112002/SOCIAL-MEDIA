const express = require('express');
const routes = require('./routes/index.js');
const app = express();
const port = 3000;
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session'); //express-session checks for the cookie corresponding to the sessionID stored in db
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true})); //extended is used for parsing nested objects which by default is false
app.set('view engine','ejs');
app.set('views', path.join(__dirname,"views"));
app.use(function(req,res,next){
    console.log(req.session,req.sessionID); next();
});
app.use(session({
    name:"codeial",
    secret:"blahsomething", //secret key used to generate hash of this session 
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(60*10*1000)
    }
}));
app.use(function(req,res,next){
    console.log(req.session,req.sessionID,req.user); next();
});
app.use(passport.initialize());
app.use(passport.session());
app.use('/',routes);
app.use(function(req,res,next){
    console.log(req.session,req.sessionID); next();
});
app.listen(port,function(err){
    if(err) console.log(`Error in running the the Server: ${err}`);
    else{
        console.log(`Server is running at port: ${port}`);
    }
});