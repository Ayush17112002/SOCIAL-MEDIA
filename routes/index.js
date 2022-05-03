//here we have the root router that would transfer requests to their specific router
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');

router.get('/',homeController.home);
router.use('/users',require('./users.js'));


module.exports = router;