const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers.js');
router
.get('/profile',usersController.profile)
.get('/signin',usersController.signin)
.get('/signup',usersController.signup)
.post('/signup',usersController.create)
.post('/signin',usersController.createSession)
.get('/signout',usersController.signout);

module.exports = router;