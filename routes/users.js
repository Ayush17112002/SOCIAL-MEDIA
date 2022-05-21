const express = require('express');
const passport = require('passport');
const passportLocal = require('../config/passport-local-strategy')
const router = express.Router();
const usersController = require('../controllers/users_controllers.js');
router
.get('/profile',passportLocal.checkAuthentication,usersController.profile)
.get('/signin',usersController.signin)
.get('/signup',usersController.signup)
.post('/signup',usersController.create)
.post('/signin',passport.authenticate('local',{failureRedirect:'/users/signin'}),usersController.createSession)
.get('/signout',usersController.signout);


module.exports = router; 