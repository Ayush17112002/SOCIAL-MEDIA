const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers.js');
router
.get('/profile',usersController.profile)
.get('/login',usersController.login)
.get('/signup',usersController.signup);

module.exports = router;